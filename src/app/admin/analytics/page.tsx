"use client";

import { useEffect, useState } from "react";
import { AreaChart, BarChart } from "@/components/admin/charts";

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/visitors?range=30d")
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 rounded-full border-t-2 border-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold font-mono tracking-tight text-white mb-2">Traffic Analytics</h1>
                <p className="text-gray-400">Visitor trends and geographic distribution.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <h3 className="text-lg font-medium text-white mb-6">30-Day View Traffic</h3>
                    <AreaChart
                        data={data?.chartData || []}
                        index="date"
                        categories={["views"]}
                        colors={["#6366f1"]}
                    />
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <h3 className="text-lg font-medium text-white mb-6">Top Locations</h3>
                    <div className="space-y-4">
                        {data?.mapData?.slice(0, 5).map((l: any) => (
                            <div key={l.country} className="flex items-center justify-between">
                                <span className="text-gray-300">{l.country}</span>
                                <span className="text-white font-mono font-medium">{l.count} views</span>
                            </div>
                        ))}
                        {(!data?.mapData || data.mapData.length === 0) && (
                            <p className="text-gray-500 text-sm">No geographic data available yet.</p>
                        )}
                    </div>
                    <div className="mt-8 relative h-40 w-full rounded-xl overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
                        {/* Minimal abstract dot map placeholder */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
                        <p className="text-sm text-gray-500 font-mono z-10">Geo-Heatmap Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
