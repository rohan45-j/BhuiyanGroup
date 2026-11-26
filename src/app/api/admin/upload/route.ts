import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isRequestAuthorized } from "@/lib/auth";

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".mp4",
  ".webm",
  ".pdf",
  ".mov",
]);

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 Megabytes

export async function POST(request: Request) {
  try {
    // 1. Verify administrator authentication
    const isAuth = isRequestAuthorized(request);
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in as administrator to upload files" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const rawCategory = (formData.get("category") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 2. Enforce File Size Limit
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds maximum allowed limit (100MB)" },
        { status: 400 }
      );
    }

    // 3. Strict File Extension Whitelisting
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type "${ext}" is not permitted for security reasons.` },
        { status: 400 }
      );
    }

    // 4. Sanitize category and filename against path traversal
    const safeCategory = rawCategory.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 50); // limit length

    const uniqueFileName = `${safeCategory}-${baseName}-${Date.now()}${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Resolve upload directories (handles standard development, standalone, and cPanel Passenger cwd paths)
    const uploadDirs = [
      path.join(process.cwd(), "public", "uploads"),
      path.join(process.cwd(), "bhuiyangroup-bd", "public", "uploads"),
      path.resolve(process.cwd(), "public/uploads"),
      "/home/bhuiyang/bhuiyangroup-bd/public/uploads",
      "/home/bhuiyang/public/uploads",
      "/home/bhuiyang/public_html/uploads",
    ];

    // Write to all resolved candidate upload directories where parent exists or can be created
    let writtenCount = 0;
    for (const dir of uploadDirs) {
      try {
        const parentDir = path.dirname(dir);
        if (fs.existsSync(parentDir) || dir.startsWith(process.cwd())) {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(path.join(dir, uniqueFileName), buffer);
          writtenCount++;
        }
      } catch (writeErr) {
        console.warn(`Could not write upload to ${dir}:`, writeErr);
      }
    }

    const publicUrl = `/uploads/${uniqueFileName}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      savedCopies: writtenCount,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to upload file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
