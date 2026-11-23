import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

function resolveConfigFilePath(): string {
  const candidates = [
    path.join(process.cwd(), "src", "data", "siteConfig.json"),
    path.join(process.cwd(), "bhuiyangroup-bd", "src", "data", "siteConfig.json"),
    path.resolve(process.cwd(), "src/data/siteConfig.json"),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

export async function GET() {
  try {
    const configFilePath = resolveConfigFilePath();
    if (fs.existsSync(configFilePath)) {
      const fileData = fs.readFileSync(configFilePath, "utf-8");
      return NextResponse.json(JSON.parse(fileData), {
        headers: noCacheHeaders,
      });
    }
    return NextResponse.json(
      { error: "Config file not found" },
      { status: 404, headers: noCacheHeaders }
    );
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
    const updatedConfig = await request.json();
    if (!updatedConfig || typeof updatedConfig !== "object") {
      return NextResponse.json(
        { error: "Invalid configuration payload" },
        { status: 400, headers: noCacheHeaders }
      );
    }

    const targetFile = resolveConfigFilePath();
    const targetDir = path.dirname(targetFile);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Try setting write permission if file exists
    if (fs.existsSync(targetFile)) {
      try {
        fs.chmodSync(targetFile, 0o666);
      } catch (e) {
        // ignore chmod warnings
      }
    }

    fs.writeFileSync(targetFile, JSON.stringify(updatedConfig, null, 2), "utf-8");

    // If favicon is configured, sync it to root favicon.ico locations
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

    // Purge server-side route cache so changes are immediately live
    try {
      revalidatePath("/", "layout");
      revalidatePath("/admin", "layout");
      revalidatePath("/sister-concerns/[slug]", "page");
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
