import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".bmp": "image/bmp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
};

function resolveUploadFilePath(filePathSegments: string[]): string | null {
  const relativeSubpath = filePathSegments.join(path.sep);

  const candidateDirs = [
    path.join(process.cwd(), "public", "uploads"),
    path.join(process.cwd(), "bhuiyangroup-bd", "public", "uploads"),
    path.resolve(process.cwd(), "public/uploads"),
    "/home/bhuiyang/bhuiyangroup-bd/public/uploads",
    "/home/bhuiyang/public/uploads",
    "/home/bhuiyang/public_html/uploads",
  ];

  for (const dir of candidateDirs) {
    try {
      const candidatePath = path.join(dir, relativeSubpath);
      if (fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile()) {
        return candidatePath;
      }
    } catch {
      // Ignore permission or missing path errors and continue
    }
  }

  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams.path || [];

    if (!pathSegments.length) {
      return NextResponse.json({ error: "File not specified" }, { status: 400 });
    }

    // Prevent directory traversal attacks
    for (const segment of pathSegments) {
      if (segment.includes("..") || segment.includes("/") || segment.includes("\\")) {
        return NextResponse.json({ error: "Invalid path" }, { status: 400 });
      }
    }

    const fullFilePath = resolveUploadFilePath(pathSegments);

    if (!fullFilePath) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const ext = path.extname(fullFilePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(fullFilePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: unknown) {
    console.error("Error serving uploaded file:", error);
    return NextResponse.json(
      { error: "Failed to serve file" },
      { status: 500 }
    );
  }
}
