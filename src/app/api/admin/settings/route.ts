import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { getMergedSiteConfig, saveRuntimeConfig } from "@/lib/runtimeConfig";
import { isRequestAuthorized } from "@/lib/auth";

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(request: Request) {
  try {
    const config = getMergedSiteConfig();
    const isAuth = isRequestAuthorized(request);

    // If request is from an unauthenticated public visitor, redact sensitive credentials!
    if (!isAuth) {
      const sanitized = JSON.parse(JSON.stringify(config));
      if (sanitized.adminAuth) {
        sanitized.adminAuth.password = "";
      }
      if (sanitized.smtp) {
        sanitized.smtp.pass = "";
      }
      return NextResponse.json(sanitized, {
        headers: noCacheHeaders,
      });
    }

    // Authenticated admin gets full config
    return NextResponse.json(config, {
      headers: noCacheHeaders,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verify admin authorization
    const isAuth = isRequestAuthorized(request);
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in as administrator to save configuration" },
        { status: 401, headers: noCacheHeaders }
      );
    }

    const updatedConfig = await request.json();
    if (!updatedConfig || typeof updatedConfig !== "object") {
      return NextResponse.json(
        { error: "Invalid configuration payload" },
        { status: 400, headers: noCacheHeaders }
      );
    }

    // Preserve existing SMTP password if not sent or empty
    const currentConfig = getMergedSiteConfig();
    if (
      (!updatedConfig.smtp?.pass || updatedConfig.smtp?.pass.trim() === "") &&
      currentConfig.smtp?.pass
    ) {
      if (!updatedConfig.smtp) updatedConfig.smtp = {};
      updatedConfig.smtp.pass = currentConfig.smtp.pass;
    }

    // Preserve existing admin password if not changed
    if (
      (!updatedConfig.adminAuth?.password || updatedConfig.adminAuth?.password.trim() === "") &&
      (currentConfig as any).adminAuth?.password
    ) {
      if (!updatedConfig.adminAuth) updatedConfig.adminAuth = {};
      updatedConfig.adminAuth.password = (currentConfig as any).adminAuth.password;
    }

    // 1. Save to persistent runtime config (siteConfig.runtime.json)
    // This file is in .gitignore, so Git Pull will NEVER overwrite or touch live user data!
    const runtimeSaved = saveRuntimeConfig(updatedConfig);
    if (!runtimeSaved) {
      console.warn("Could not save to runtime config file, continuing...");
    }

    // 2. Also try updating base siteConfig.json if writable (scrubbing sensitive password for git safety)
    try {
      const sanitizedForGit = JSON.parse(JSON.stringify(updatedConfig));
      if (sanitizedForGit.smtp) {
        sanitizedForGit.smtp.pass = "";
      }
      const candidates = [
        path.join(process.cwd(), "src", "data", "siteConfig.json"),
        path.join(process.cwd(), "bhuiyangroup-bd", "src", "data", "siteConfig.json"),
      ];
      for (const targetFile of candidates) {
        if (fs.existsSync(path.dirname(targetFile))) {
          try {
            fs.writeFileSync(targetFile, JSON.stringify(sanitizedForGit, null, 2), "utf-8");
          } catch {}
        }
      }
    } catch (e) {
      console.warn("Base siteConfig.json sync skipped (runtime config took precedence):", e);
    }

    // 3. If favicon is configured, sync it to root favicon locations
    try {
      if (updatedConfig?.branding?.favicon) {
        const cleanPath = updatedConfig.branding.favicon.split("?")[0];
        const relPath = cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath;
        const absFavicon = path.join(process.cwd(), "public", relPath);
        if (fs.existsSync(absFavicon)) {
          fs.copyFileSync(absFavicon, path.join(process.cwd(), "src", "app", "favicon.ico"));
          fs.copyFileSync(absFavicon, path.join(process.cwd(), "public", "favicon.ico"));
        }
      }
    } catch (e) {
      console.warn("Favicon sync warning:", e);
    }

    // 4. Purge server-side route cache so changes are immediately live
    try {
      revalidatePath("/", "layout");
    } catch (e) {
      console.warn("revalidatePath warning:", e);
    }

    return NextResponse.json(
      { success: true, config: updatedConfig },
      { headers: noCacheHeaders }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? `${err.name}: ${err.message}` : "Failed to save configuration";
    console.error("[SETTINGS SAVE ERROR]", err);
    return NextResponse.json(
      { error: message },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
