import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const totalVisitors = await prisma.visitor.count();

        // Calculate unique visitors in the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentVisitors = await prisma.visitor.count({
            where: {
                lastVisitAt: {
                    gte: thirtyDaysAgo,
                }
            }
        });

        const totalViews = await prisma.pageView.count();
        const contactMessagesCount = await prisma.contactMessage.count();

        // Average session duration
        const sessions = await prisma.session.findMany({
            select: { duration: true },
            where: { duration: { gt: 0 } }, // only real sessions
        });

        const avgSessionDuration = sessions.length > 0
            ? Math.floor(sessions.reduce((acc: number, curr: any) => acc + curr.duration, 0) / sessions.length)
            : 0;

        return NextResponse.json({
            totalVisitors,
            recentVisitors,
            totalViews,
            contactMessagesCount,
            avgSessionDuration,
        });
    } catch (error) {
        console.error("Overview API Error", error);
        return NextResponse.json({ error: "Failed to fetch overview stats" }, { status: 500 });
    }
}
