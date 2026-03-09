"use client";

import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart as RechartsBarChart,
    Bar,
} from "recharts";

interface ChartProps {
    data: any[];
    categories: string[];
    index: string;
    colors?: string[];
    valueFormatter?: (value: number) => string;
    height?: number;
}

const defaultColors = ["#6366f1", "#a855f7", "#ec4899", "#14b8a6"];

export function AreaChart({
    data,
    categories,
    index,
    colors = defaultColors,
    valueFormatter,
    height = 300,
}: ChartProps) {
    return (
        <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        {categories.map((cat, i) => (
                            <linearGradient key={cat} id={`color${cat}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey={index}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                        tickFormatter={valueFormatter}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
                        itemStyle={{ color: "white" }}
                    />
                    {categories.map((cat, i) => (
                        <Area
                            key={cat}
                            type="monotone"
                            dataKey={cat}
                            stroke={colors[i % colors.length]}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill={`url(#color${cat})`}
                        />
                    ))}
                </RechartsAreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export function BarChart({
    data,
    categories,
    index,
    colors = defaultColors,
    valueFormatter,
    height = 300,
}: ChartProps) {
    return (
        <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey={index}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                        tickFormatter={valueFormatter}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />
                    {categories.map((cat, i) => (
                        <Bar
                            key={cat}
                            dataKey={cat}
                            fill={colors[i % colors.length]}
                            radius={[4, 4, 0, 0]}
                        />
                    ))}
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
}
