import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_secret_key_for_dev_only");

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── API guard ─────────────────────────────────────────────
    // Every admin API route and the AI article generator require a valid
    // admin session cookie. Previously these endpoints were completely
    // open — anyone could create/delete articles (SEO spam vector).
    if (
        (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth")) ||
        pathname.startsWith("/api/articles/generate")
    ) {
        const token = request.cookies.get("admin_token")?.value;

        try {
            const { payload } = await jwtVerify(token ?? "", secretKey);
            if (payload.admin !== true) {
                return NextResponse.json(
                    { success: false, error: "Unauthorized" },
                    { status: 401 }
                );
            }
            return NextResponse.next();
        } catch {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }
    }

    // ── Page guard ────────────────────────────────────────────
    // Protect /admin routes, but allow /admin/login
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            await jwtVerify(token, secretKey);
            return NextResponse.next();
        } catch {
            // Invalid token
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*", "/api/articles/generate"],
};

