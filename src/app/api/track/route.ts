import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import prisma from "@/lib/prisma"; // our singleton
import { z } from "zod";

const trackSchema = z.object({
    type: z.enum(["heartbeat", "pageview", "event"]),
    visitorId: z.string().uuid(),
    pathname: z.string().max(500).optional(),
    referer: z.string().max(1000).optional().nullable(),
    eventName: z.string().max(100).optional(),
    eventData: z.any().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parseResult = trackSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
        }

        const { type, visitorId, pathname, referer, eventName, eventData } = parseResult.data;

        const headersList = await headers();

        // Attempt tracking
        if (type === "heartbeat") {
            // Create or update visitor
            const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown";
            const country = headersList.get("x-vercel-ip-country") || "Unknown";
            const city = headersList.get("x-vercel-ip-city") || "Unknown";

            const userAgent = headersList.get("user-agent") || "";
            const parser = new UAParser(userAgent);
            const browser = parser.getBrowser().name || "Unknown";
            const os = parser.getOS().name || "Unknown";
            const deviceType = parser.getDevice().type || "desktop";

            // Upsert visitor
            const visitor = await prisma.visitor.upsert({
                where: { id: visitorId },
                update: {
                    lastVisitAt: new Date(),
                    totalTimeSpent: { increment: 15 }, // 15 seconds increment per heartbeat pulse
                    country: country !== "Unknown" ? country : undefined,
                    city: city !== "Unknown" ? city : undefined,
                },
                create: {
                    id: visitorId,
                    browser,
                    os,
                    deviceType,
                    country,
                    city,
                    ipAddress,
                    totalSessions: 1, // initialize with 1 session
                },
            });

            // Simple session handling - creating a dummy session if we want,
            // but typically we'd look up an active session or create one.
            // For now, we just update visitor time stat.

            return NextResponse.json({ success: true, visitor });
        }

        if (type === "pageview") {
            // Find active session or create one
            let session = await prisma.session.findFirst({
                where: { visitorId },
                orderBy: { startedAt: "desc" },
            });

            if (!session || (new Date().getTime() - session.startedAt.getTime() > 1000 * 60 * 30)) { // 30 min expiration
                session = await prisma.session.create({
                    data: { visitorId, referer },
                });

                // Also increment totalSessions
                await prisma.visitor.update({
                    where: { id: visitorId },
                    data: { totalSessions: { increment: 1 } },
                });
            } else {
                // Update session duration roughly based on latest pageview
                await prisma.session.update({
                    where: { id: session.id },
                    data: { duration: Math.floor((new Date().getTime() - session.startedAt.getTime()) / 1000) },
                });
            }

            const pageView = await prisma.pageView.create({
                data: {
                    sessionId: session.id,
                    visitorId,
                    pathname: pathname ?? "/",
                },
            });

            return NextResponse.json({ success: true, pageView });
        }

        if (type === "event") {
            let session = await prisma.session.findFirst({
                where: { visitorId },
                orderBy: { startedAt: "desc" },
            });

            if (!session) {
                session = await prisma.session.create({
                    data: { visitorId, referer },
                });
            }

            const event = await prisma.event.create({
                data: {
                    sessionId: session.id,
                    visitorId,
                    eventName: eventName ?? "unknown",
                    eventData: eventData ?? undefined,
                },
            });

            return NextResponse.json({ success: true, event });
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 });

    } catch (error) {
        console.error("Tracking API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
