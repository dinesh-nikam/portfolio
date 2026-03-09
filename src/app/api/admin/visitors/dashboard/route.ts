import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const interval = searchParams.get("interval") || "30d"; // 24h, 30d, 12w

        // --- 1. Date Ranges ---
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        // Calculate chart start date based on interval
        const chartStartDate = new Date();
        if (interval === "24h") {
            chartStartDate.setHours(now.getHours() - 24);
        } else if (interval === "12w") {
            chartStartDate.setDate(now.getDate() - (12 * 7));
        } else {
            // default 30d
            chartStartDate.setDate(now.getDate() - 30);
        }

        // --- 2. Overview Metrics ---
        const [
            totalVisitorsToday,
            totalUniqueVisitors,
            contactMessagesCount,
            allSessions,
        ] = await Promise.all([
            prisma.visitor.count({ where: { lastVisitAt: { gte: startOfToday } } }),
            prisma.visitor.count(),
            prisma.contactMessage.count(),
            prisma.session.findMany({ select: { duration: true, visitorId: true }, where: { duration: { gt: 0 } } })
        ]);

        const avgSessionDuration = allSessions.length > 0
            ? Math.floor(allSessions.reduce((acc, curr) => acc + curr.duration, 0) / allSessions.length)
            : 0;

        // Simplify returning visitors: visitors with > 1 session
        const visitorsMap = new Map();
        allSessions.forEach(s => {
            visitorsMap.set(s.visitorId, (visitorsMap.get(s.visitorId) || 0) + 1);
        });
        const returningVisitors = Array.from(visitorsMap.values()).filter(count => count > 1).length;

        // Bounce rate (sessions with 0 duration or 1 page view)
        const bouncedSessions = await prisma.session.count({
            where: {
                OR: [
                    { duration: 0 },
                    { pageViews: { none: {} } } // Simplification: we might not track count exactly here, so we check if there are any pageViews. Actually Prisma `none` relation filter means 0 page views. Let's just use duration < 10 for bounce
                ]
            }
        });
        const totalSessionsCount = await prisma.session.count();
        const bounceRate = totalSessionsCount > 0 ? Math.round((bouncedSessions / totalSessionsCount) * 100) : 0;

        const overview = {
            totalVisitorsToday,
            totalUniqueVisitors,
            returningVisitors,
            avgSessionDuration,
            bounceRate,
            contactConversions: contactMessagesCount
        };

        // --- 3. Traffic Chart Data ---
        // Fetch page views
        const pageViews = await prisma.pageView.findMany({
            where: { createdAt: { gte: chartStartDate } },
            select: { createdAt: true }
        });

        const chartData: { date: string; views: number; ts?: number }[] = [];
        if (interval === "24h") {
            for (let i = 24; i >= 0; i--) {
                const d = new Date(now.getTime() - i * 60 * 60 * 1000);
                const hourStr = `${d.getHours().toString().padStart(2, '0')}:00`;
                chartData.push({ date: hourStr, views: 0, ts: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()).getTime() });
            }
            pageViews.forEach(pv => {
                const pvTs = new Date(pv.createdAt.getFullYear(), pv.createdAt.getMonth(), pv.createdAt.getDate(), pv.createdAt.getHours()).getTime();
                const point = chartData.find(d => d.ts === pvTs);
                if (point) point.views++;
            });
        } else if (interval === "12w") {
            for (let i = 12; i >= 0; i--) {
                const d = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
                // Get week string e.g., "Week 14"
                const getWeek = (date: Date) => {
                    const start = new Date(date.getFullYear(), 0, 1);
                    return Math.ceil((((date.getTime() - start.getTime()) / 86400000) + start.getDay() + 1) / 7);
                };
                chartData.push({ date: `W${getWeek(d)}`, views: 0, ts: d.getTime() });
            }
            // Group by week - rough approximation
            pageViews.forEach(pv => {
                const getWeek = (date: Date) => {
                    const start = new Date(date.getFullYear(), 0, 1);
                    return Math.ceil((((date.getTime() - start.getTime()) / 86400000) + start.getDay() + 1) / 7);
                };
                const weekStr = `W${getWeek(pv.createdAt)}`;
                const point = chartData.find(d => d.date === weekStr);
                if (point) point.views++;
            });
        } else {
            // 30d default
            for (let i = 29; i >= 0; i--) {
                const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                const dateStr = d.toISOString().split("T")[0];
                chartData.push({ date: dateStr, views: 0 });
            }
            pageViews.forEach(pv => {
                const dateStr = pv.createdAt.toISOString().split("T")[0];
                const point = chartData.find(d => d.date === dateStr);
                if (point) point.views++;
            });
        }

        // --- 4. Geographic Data & Device/Platform Breakdown ---
        const allVisitors = await prisma.visitor.findMany({
            select: { country: true, deviceType: true, os: true, browser: true }
        });

        const geoMap: Record<string, number> = {};
        const deviceMap: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0, Other: 0 };
        const osMap: Record<string, number> = { Windows: 0, MacOS: 0, iOS: 0, Android: 0, Linux: 0, Other: 0 };
        const browserMap: Record<string, number> = { Chrome: 0, Firefox: 0, Safari: 0, Edge: 0, Other: 0 };

        allVisitors.forEach(v => {
            // Geo
            if (v.country && v.country !== "Unknown") {
                geoMap[v.country] = (geoMap[v.country] || 0) + 1;
            }
            // Device
            if (v.deviceType) {
                const type = v.deviceType.toLowerCase();
                if (type.includes("mobile")) deviceMap.Mobile++;
                else if (type.includes("tablet")) deviceMap.Tablet++;
                else if (type.includes("desktop")) deviceMap.Desktop++;
                else deviceMap.Other++;
            } else {
                deviceMap.Other++;
            }
            // OS
            if (v.os) {
                const os = v.os.toLowerCase();
                if (os.includes("windows")) osMap.Windows++;
                else if (os.includes("mac")) osMap.MacOS++;
                else if (os.includes("ios")) osMap.iOS++;
                else if (os.includes("android")) osMap.Android++;
                else if (os.includes("linux")) osMap.Linux++;
                else osMap.Other++;
            } else {
                osMap.Other++;
            }
            // Browser
            if (v.browser) {
                const browser = v.browser.toLowerCase();
                if (browser.includes("chrome")) browserMap.Chrome++;
                else if (browser.includes("firefox")) browserMap.Firefox++;
                else if (browser.includes("safari")) browserMap.Safari++;
                else if (browser.includes("edge")) browserMap.Edge++;
                else browserMap.Other++;
            } else {
                browserMap.Other++;
            }
        });

        const formatMap = (map: Record<string, number>) => Object.entries(map).map(([name, value]) => ({ name, value })).filter(i => i.value > 0);

        const geographic = Object.entries(geoMap).map(([country, visits]) => ({ country, visits }));
        const devices = {
            types: formatMap(deviceMap),
            os: formatMap(osMap),
            browsers: formatMap(browserMap)
        };

        // --- 5. Visitor Profiles & Potential Clients ---
        const pageViewSelect = {
            createdAt: true,
            pathname: true,
            timeSpent: true
        };

        const profilesData = await prisma.visitor.findMany({
            orderBy: { lastVisitAt: "desc" },
            take: 100,
            include: {
                pageViews: {
                    select: pageViewSelect,
                    orderBy: { createdAt: "asc" }
                }
            }
        });

        const profiles = profilesData.map(v => {
            let score = 0;
            if (v.totalSessions > 3) score += 50;
            if (v.totalTimeSpent > 300) score += 50; // 5 mins

            const viewsContact = v.pageViews.some(pv => pv.pathname.includes("/contact"));
            const viewsProjects = new Set(v.pageViews.filter(pv => pv.pathname.includes("/project/")).map(pv => pv.pathname)).size;

            if (viewsContact) score += 100;
            if (viewsProjects >= 2) score += 50;

            const isPotentialClient = score >= 100;
            const flags = [];
            if (viewsContact) flags.push("Visited Contact Page");
            if (v.totalTimeSpent > 300) flags.push("High Time on Site");
            if (viewsProjects >= 2) flags.push("Viewed Multiple Projects");
            if (v.totalSessions > 3) flags.push("Returning Frequently");

            return {
                id: v.id,
                country: v.country || "Unknown",
                city: v.city || "Unknown",
                os: v.os || "Unknown",
                browser: v.browser || "Unknown",
                deviceType: v.deviceType || "Unknown",
                sessions: v.totalSessions,
                timeSpent: v.totalTimeSpent, // seconds
                lastVisit: v.lastVisitAt,
                pagesViewed: v.pageViews.length,
                score,
                isPotentialClient,
                flags,
                journey: v.pageViews.map(pv => ({
                    time: pv.createdAt,
                    path: pv.pathname,
                    duration: pv.timeSpent
                }))
            };
        });

        const potentialClients = profiles.filter(p => p.isPotentialClient);

        // --- 6. Live Visitors Monitor ---
        const fiveMinsAgo = new Date(now.getTime() - 5 * 60 * 1000);
        // Find recent page views that likely indicate an active user
        const livePageViews = await prisma.pageView.findMany({
            where: { createdAt: { gte: fiveMinsAgo } },
            orderBy: { createdAt: "desc" },
            include: {
                visitor: {
                    select: { country: true, browser: true, deviceType: true }
                }
            }
        });

        // Deduplicate to get unique live visitors
        const liveMap = new Map();
        livePageViews.forEach(pv => {
            if (!liveMap.has(pv.visitorId)) {
                liveMap.set(pv.visitorId, {
                    visitorId: pv.visitorId,
                    country: pv.visitor.country || "Unknown",
                    browser: pv.visitor.browser || "Unknown",
                    device: pv.visitor.deviceType || "Unknown",
                    currentPage: pv.pathname,
                    lastActive: pv.createdAt
                });
            }
        });
        const liveVisitors = Array.from(liveMap.values());


        // Combine all data into the response payload
        return NextResponse.json({
            overview,
            chartData,
            geographic,
            devices,
            profiles,
            potentialClients,
            liveVisitors
        });

    } catch (error) {
        console.error("Dashboard API Error", error);
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
}
