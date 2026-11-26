import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Resolve upload directories (handles standard development, standalone, and cPanel Passenger cwd paths)
    const uploadDirs = [
      path.join(process.cwd(), "public", "uploads"),
      path.join(process.cwd(), "bhuiyangroup-bd", "public", "uploads"),
      path.resolve(process.cwd(), "public/uploads"),
      "/home/bhuiyang/bhuiyangroup-bd/public/uploads",
      "/home/bhuiyang/public/uploads",
      "/home/bhuiyang/public_html/uploads",
    ];

    // Clean filename
    const ext = path.extname(file.name) || ".png";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-");
    const uniqueFileName = `${category}-${baseName}-${Date.now()}${ext}`;

    // Write to all resolved candidate upload directories where parent exists or can be created
    let writtenCount = 0;
    for (const dir of uploadDirs) {
      try {
        const parentDir = path.dirname(dir);
        // Only attempt creation if parent dir exists or is in cwd
        if (fs.existsSync(parentDir) || dir.startsWith(process.cwd())) {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(path.join(dir, uniqueFileName), buffer);
          writtenCount++;
        }
      } catch (writeErr) {
        // Continue to other candidate directories
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
