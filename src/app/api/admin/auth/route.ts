import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_secret_key_for_dev_only");

/**
 * In-memory brute-force protection for the login endpoint.
 * NOTE: on serverless (Vercel) this is per-instance/per-region — a real WAF
 * or Vercel Firewall rule should complement it in production.
 */
const attempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = attempts.get(ip);
    if (!entry || now - entry.firstAttempt > WINDOW_MS) {
        attempts.set(ip, { count: 1, firstAttempt: now });
        return false;
    }
    entry.count += 1;
    return entry.count > MAX_ATTEMPTS;
}

function clearAttempts(ip: string) {
    attempts.delete(ip);
}

export async function POST(req: Request) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many attempts. Try again in 10 minutes." },
                { status: 429 }
            );
        }

        const { password } = await req.json();

        // In production, use env var. "admin" fallback for dev.
        const adminPassword = process.env.ADMIN_PASSWORD || "admin";
        if (process.env.NODE_ENV === "production" && !process.env.ADMIN_PASSWORD) {
            console.warn("SECURITY WARNING: ADMIN_PASSWORD is not set — the dev fallback password is active!");
        }

        if (password === adminPassword) {
            clearAttempts(ip);

            // Create JWT
            const token = await new SignJWT({ admin: true })
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("24h")
                .sign(secretKey);

            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24, // 24 hours
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return NextResponse.json({ success: true });
}
