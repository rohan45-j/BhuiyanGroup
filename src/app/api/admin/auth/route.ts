import { NextResponse } from "next/server";
import {
  createAdminToken,
  verifyAdminCredentials,
  isRequestAuthorized,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    const isValid = verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = createAdminToken(username);

    const response = NextResponse.json({
      success: true,
      token,
      message: "Authentication successful",
    });

    // Set secure HttpOnly session cookie
    response.cookies.set("bg_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Internal authentication error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const authorized = isRequestAuthorized(request);
  return NextResponse.json({ authenticated: authorized });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.set("bg_admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
