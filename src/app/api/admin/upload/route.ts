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

    // Resolve upload directories (handles both standard development & cPanel Passenger cwd mismatches)
    const uploadDirs = [
      path.join(process.cwd(), "public", "uploads"),
    ];

    const cpanelSubdir = path.join(process.cwd(), "bhuiyangroup-bd", "public", "uploads");
    if (fs.existsSync(path.join(process.cwd(), "bhuiyangroup-bd"))) {
      uploadDirs.push(cpanelSubdir);
    }

    // Clean filename
    const ext = path.extname(file.name) || ".png";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-");
    const uniqueFileName = `${category}-${baseName}-${Date.now()}${ext}`;

    // Write to all resolved candidate upload directories
    for (const dir of uploadDirs) {
      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch (mkdirErr) {
          console.warn(`Could not create directory ${dir}:`, mkdirErr);
        }
      }
      try {
        fs.writeFileSync(path.join(dir, uniqueFileName), buffer);
      } catch (writeErr) {
        console.warn(`Could not write to ${dir}:`, writeErr);
      }
    }

    const publicUrl = `/uploads/${uniqueFileName}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to upload file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
