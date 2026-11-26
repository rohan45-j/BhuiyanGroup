import crypto from "crypto";
import { getMergedSiteConfig } from "@/lib/runtimeConfig";

// Secret key for HMAC signing (persists per server lifecycle or fallback)
const AUTH_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  process.env.ADMIN_SESSION_SECRET ||
  "bhuiyan_group_secure_admin_salt_2026_988";

export function createAdminToken(username: string): string {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifyAdminToken(token: string): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 3) return false;

    const [username, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Token expiration: 7 days
    if (Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    const payload = `${username}:${timestamp}`;
    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(payload)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  try {
    const config = getMergedSiteConfig() as any;
    const expectedUser = (config?.adminAuth?.username || "admin").trim();
    const expectedPass = (config?.adminAuth?.password || "password123").trim();

    return username.trim() === expectedUser && password === expectedPass;
  } catch {
    return false;
  }
}

export function isRequestAuthorized(request: Request): boolean {
  try {
    // 1. Check Authorization Bearer header
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7).trim();
      if (verifyAdminToken(token)) return true;
    }

    // 2. Check X-Admin-Token header
    const customHeader = request.headers.get("x-admin-token");
    if (customHeader && verifyAdminToken(customHeader.trim())) {
      return true;
    }

    // 3. Check Cookie
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k, v.join("=")];
      })
    );

    const sessionCookie = cookies["bg_admin_session"];
    if (sessionCookie && verifyAdminToken(sessionCookie)) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
