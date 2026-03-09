import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Determine hot leads
        // A hot lead: > 3 sessions, OR > 5 mins spent, OR visited contact page
        const visitors = await prisma.visitor.findMany({
            orderBy: { lastVisitAt: "desc" },
            take: 100,
            include: {
                pageViews: {
                    select: { pathname: true }
                }
            }
        });

        const profiles = visitors.map((v: any) => {
            let score = 0;
            if (v.totalSessions > 3) score += 50;
            if (v.totalTimeSpent > 300) score += 50; // 5 mins

            const viewsContact = v.pageViews.some((pv: any) => pv.pathname.includes("/contact"));
            const viewsResume = v.pageViews.some((pv: any) => pv.pathname.includes("/resume"));

            if (viewsContact) score += 100;
            if (viewsResume) score += 50;

            let category = "Casual visitor";
            if (score >= 100) category = "Hot Lead 🔥";
            else if (score >= 50) category = "High interest";
            else if (v.totalSessions > 1) category = "Returning visitor";

            return {
                id: v.id,
                country: v.country,
                city: v.city,
                os: v.os,
                browser: v.browser,
                sessions: v.totalSessions,
                timeSpent: v.totalTimeSpent, // seconds
                lastVisit: v.lastVisitAt,
                category,
                score,
            };
        });

        // Sort by score desc
        profiles.sort((a: any, b: any) => b.score - a.score);

        return NextResponse.json({ profiles });
    } catch (error) {
        console.error("Profiles API Error", error);
        return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
    }
}
