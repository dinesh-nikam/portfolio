"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import { GitBranch, GitCommit, Flame, Zap, CheckCircle2 } from "lucide-react";

export function GithubActivity() {
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
    const [activeTooltip, setActiveTooltip] = useState<{ week: number; day: number; count: number; date: string } | null>(null);

    // Generate contribution levels for 53 weeks x 7 days matrix
    const gridData = useMemo(() => {
        const data = [];
        const today = new Date();

        for (let w = 0; w < 53; w++) {
            const week = [];
            for (let d = 0; d < 7; d++) {
                // Generate deterministic but organic looking contribution counts
                const rawSeed = Math.sin(w * 0.15 + d * 0.45) * 45 + Math.cos(w * 0.5 - d * 0.2) * 50;
                let count = 0;

                // Add some high peaks & zero zones
                if (rawSeed > 55) count = Math.floor(rawSeed / 6);
                else if (rawSeed > 20) count = Math.floor(rawSeed / 12);
                else if (rawSeed > -15) count = Math.floor(Math.max(0, rawSeed / 20));

                // Generate a retro date string corresponding to week/day
                const targetDate = new Date(today);
                targetDate.setDate(today.getDate() - ((52 - w) * 7 + (6 - d)));
                const dateStr = targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

                week.push({ count, date: dateStr });
            }
            data.push(week);
        }
        return data;
    }, []);

    // Color mapper based on count (primary ink scale)
    const getCellColor = (count: number) => {
        if (count === 0) return "bg-border/40";
        if (count < 3) return "bg-primary/10";
        if (count < 6) return "bg-primary/25";
        if (count < 9) return "bg-primary/50";
        return "bg-primary";
    };

    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-primary" />
                            <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-semibold">
                                Version Control
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-none">
                            Git Activity Ecosystem
                        </h2>
                    </div>

                    {/* Sync Status Banner */}
                    <div className="flex items-center gap-3 px-4 py-2 rounded-md bg-muted/30 border border-border self-start">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                        <span className="font-mono text-[10px] tracking-wider font-semibold text-muted-foreground uppercase">
                            Real-time Sync Active
                        </span>
                    </div>
                </div>

                {/* Dashboard Metrics grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Yearly Commits", val: "1,842", desc: "Across 24 repositories", icon: <GitCommit className="w-4 h-4 text-primary" /> },
                        { label: "Active Streak", val: "42 Days", desc: "Continuous daily code", icon: <Flame className="w-4 h-4 text-primary" /> },
                        { label: "Max Daily Peak", val: "18 Commits", desc: "Refactoring migrations", icon: <Zap className="w-4 h-4 text-primary" /> },
                        { label: "PR Acceptance", val: "99.2%", desc: "Clean deployment rates", icon: <CheckCircle2 className="w-4 h-4 text-primary" /> }
                    ].map((m, idx) => (
                        <div key={idx} className="p-5 rounded-md bg-card border border-border hover:border-primary/40 transition-colors duration-300">
                            <div className="flex items-center justify-between w-full mb-3 text-muted-foreground">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{m.label}</span>
                                {m.icon}
                            </div>
                            <div className="text-2xl font-extrabold text-foreground tracking-tight">{m.val}</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5 font-light">{m.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Main Heatmap Container */}
                <div className="relative w-full p-6 md:p-8 rounded-md bg-card border border-border overflow-x-auto scrollbar-none">

                    {/* Matrix Area */}
                    {mounted && (
                        <div className="flex flex-col gap-2 min-w-[760px]">
                            {/* Days Label Header */}
                            <div className="flex gap-[4px] pl-8 text-[9px] font-mono text-muted-foreground font-bold uppercase mb-2">
                                <span className="w-12">Mon</span>
                                <span className="w-12">Wed</span>
                                <span className="w-12">Fri</span>
                            </div>

                            {/* 7 Rows corresponding to Days of Week */}
                            <div className="flex flex-col gap-[4px]">
                                {Array.from({ length: 7 }).map((_, dIdx) => (
                                    <div key={dIdx} className="flex gap-[4px] items-center">
                                        {/* Day label (Desktop only spacer/labels) */}
                                        <span className="w-8 text-[9px] font-mono text-muted-foreground font-bold shrink-0">
                                            {dIdx === 1 && "Tue"}
                                            {dIdx === 3 && "Thu"}
                                            {dIdx === 5 && "Sat"}
                                        </span>

                                        {/* Render cells for each of the 53 weeks */}
                                        {gridData.map((week, wIdx) => {
                                            const cell = week[dIdx];
                                            return (
                                                <div
                                                    key={wIdx}
                                                    onMouseEnter={() => setActiveTooltip({ week: wIdx, day: dIdx, count: cell.count, date: cell.date })}
                                                    onMouseLeave={() => setActiveTooltip(null)}
                                                    className={`relative w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-[3px] transition-all duration-300 hover:scale-130 hover:z-30 cursor-pointer ${getCellColor(cell.count)}`}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Popover Floating Tooltip */}
                    <div className="h-6 mt-6 flex items-center justify-between font-mono text-[10px] text-muted-foreground border-t border-border pt-4">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded-[2px] bg-border/40" /> Less
                            </span>
                            <span className="flex gap-[2px]">
                                <span className="w-2.5 h-2.5 rounded-[2px] bg-primary/10" />
                                <span className="w-2.5 h-2.5 rounded-[2px] bg-primary/25" />
                                <span className="w-2.5 h-2.5 rounded-[2px] bg-primary/50" />
                                <span className="w-2.5 h-2.5 rounded-[2px] bg-primary" />
                            </span>
                            <span>More</span>
                        </div>

                        {/* Current hovered cell details */}
                        <div className="font-bold text-foreground transition-all duration-300">
                            {activeTooltip ? (
                                <span className="flex items-center gap-1 text-primary">
                                    {activeTooltip.count === 0 ? "No contributions" : `${activeTooltip.count} contributions`}{" "}
                                    on {activeTooltip.date}
                                </span>
                            ) : (
                                "Hover a cell to inspect commits"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}