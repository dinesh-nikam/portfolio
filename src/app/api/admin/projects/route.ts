import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Project engagement logic
        // We look for pageviews starting with "/projects/" OR events named "View Project"
        const projectViews = await prisma.pageView.groupBy({
            by: ["pathname"],
            where: {
                pathname: {
                    startsWith: "/projects/",
                }
            },
            _count: {
                pathname: true,
            },
            _avg: {
                timeSpent: true,
            },
            orderBy: {
                _count: { pathname: "desc" },
            },
            take: 10,
        });

        const engagement = projectViews.map((pv: any) => ({
            path: pv.pathname,
            views: pv._count.pathname,
            avgTime: pv._avg.timeSpent ? Math.floor(pv._avg.timeSpent) : 0,
        }));

        return NextResponse.json({ engagement });
    } catch (error) {
        console.error("Projects API Error", error);
        return NextResponse.json({ error: "Failed to fetch project engagement" }, { status: 500 });
    }
}
