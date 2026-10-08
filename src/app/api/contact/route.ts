import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import prisma from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Invalid email").max(100),
    message: z.string().min(1, "Message is required").max(5000),
    project: z.string().max(200).optional(),
    _gotcha: z.string().optional(),
    visitorId: z.string().uuid().optional().nullable(),
    referer: z.string().max(1000).optional().nullable(),
    utmSource: z.string().max(100).optional().nullable(),
    utmCampaign: z.string().max(100).optional().nullable(),
    utmMedium: z.string().max(100).optional().nullable(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parseResult = contactSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: "Invalid payload format", details: parseResult.error.format() }, { status: 400 });
        }

        const { name, email, message, project, _gotcha, visitorId, referer, utmSource, utmCampaign, utmMedium } = parseResult.data;

        // Bot honeypot trap: if _gotcha is populated, return silent success without processing
        if (_gotcha && _gotcha.trim().length > 0) {
            console.warn("Contact Form Bot Trapped via honeypot:", { email, name });
            return NextResponse.json({ success: true, message: "Thank you for reaching out!" });
        }

        // Extract Device Intelligence
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "";
        const parser = new UAParser(userAgent);
        const browser = parser.getBrowser().name || "Unknown";
        const os = parser.getOS().name || "Unknown";
        const deviceType = parser.getDevice().type || "desktop";

        // Extract and Geolocate IP
        const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown";
        let country = headersList.get("x-vercel-ip-country") || "Unknown";
        let city = headersList.get("x-vercel-ip-city") || "Unknown";
        let region = "Unknown";
        let latitude = null;
        let longitude = null;

        if (ipAddress !== "Unknown" && ipAddress !== "::1" && ipAddress !== "127.0.0.1") {
            try {
                // Fetch from ipapi.co
                const geoResponse = await fetch(`https://ipapi.co/${ipAddress.split(',')[0].trim()}/json/`);
                if (geoResponse.ok) {
                    const geoData = await geoResponse.json();
                    if (!geoData.error) {
                        country = geoData.country_name || country;
                        city = geoData.city || city;
                        region = geoData.region || region;
                        latitude = geoData.latitude || null;
                        longitude = geoData.longitude || null;
                    }
                }
            } catch (geoErr) {
                console.error("Geolocation Error:", geoErr);
            }
        }

        // Save visitor intelligence to the upgraded Prisma schema with resilient fallback
        let savedMessage = null;
        try {
            savedMessage = await prisma.contactMessage.create({
                data: {
                    name,
                    email,
                    message: project ? `[Project: ${project}]\n\n${message}` : message,
                    visitorId: visitorId || undefined,
                    ipAddress,
                    country: country !== "Unknown" ? country : undefined,
                    city: city !== "Unknown" ? city : undefined,
                    region: region !== "Unknown" ? region : undefined,
                    latitude,
                    longitude,
                    browser,
                    os,
                    deviceType,
                    referer: referer || undefined,
                    utmSource: utmSource || undefined,
                    utmCampaign: utmCampaign || undefined,
                    utmMedium: utmMedium || undefined,
                },
            });
        } catch (dbErr) {
            console.warn("Contact route: Database write failed (service offline or unreachable), logging lead to server:", {
                timestamp: new Date().toISOString(),
                name,
                email,
                project,
                message,
                ipAddress,
                error: dbErr instanceof Error ? dbErr.message : String(dbErr),
            });
            // Graceful continuation so potential client receives success confirmation
        }

        return NextResponse.json({
            success: true,
            message: "Thank you for reaching out! Your message has been received.",
            data: savedMessage ? { id: savedMessage.id } : undefined,
        });
    } catch (error) {
        console.error("Contact Form Error", error);
        return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
    }
}
