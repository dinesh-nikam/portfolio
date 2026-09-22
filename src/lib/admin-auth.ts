/**
 * Admin session verification — shared by middleware (edge) and route handlers.
 * The admin JWT is issued by /api/admin/auth (jose, HS256, httpOnly cookie).
 */
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "fallback_secret_key_for_dev_only"
);

/** Verify a raw JWT string. Edge-safe (no node APIs). */
export async function isAdminToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.admin === true;
  } catch {
    return false;
  }
}

/** Verify the admin session from the request cookies (server components / route handlers). */
export async function isAdminSession(): Promise<boolean> {
  const store = await cookies();
  return isAdminToken(store.get("admin_token")?.value);
}
