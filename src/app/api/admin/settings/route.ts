import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const configFilePath = path.join(process.cwd(), "src", "data", "siteConfig.json");

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(request: Request) {
  try {
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
    fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2), "utf-8");

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
    const message = err instanceof Error ? err.message : "Failed to save configuration";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
