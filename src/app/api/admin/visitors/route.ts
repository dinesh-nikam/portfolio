import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const range = searchParams.get("range") || "30d"; // 7d, 30d, 90d

        const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Get page views for the chart
        const pageViews = await prisma.pageView.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                },
            },
            select: { createdAt: true }
        });

        // Group by day
        const chartData = Array.from({ length: days }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (days - 1) + i);
            return {
                date: d.toISOString().split("T")[0],
                views: 0,
                visitors: 0, // This is simplified. Proper unique visitors per day requires more complex querying or grouping.
            };
        });

        pageViews.forEach((pv: any) => {
            const dateStr = pv.createdAt.toISOString().split("T")[0];
            const dataPoint = chartData.find(d => d.date === dateStr);
            if (dataPoint) dataPoint.views++;
        });

        // Get Geo Location Data
        const visitorsWithLocation = await prisma.visitor.findMany({
            where: { country: { not: null } },
            select: { country: true }
        });

        const geoData: Record<string, number> = {};
        visitorsWithLocation.forEach((v: any) => {
            if (v.country && v.country !== "Unknown") {
                geoData[v.country] = (geoData[v.country] || 0) + 1;
            }
        });

        const mapData = Object.entries(geoData).map(([country, count]) => ({ country, count }));

        return NextResponse.json({
            chartData,
            mapData,
        });
    } catch (error) {
        console.error("Visitors Analytics Error", error);
        return NextResponse.json({ error: "Failed to fetch visitor analytics" }, { status: 500 });
    }
}
