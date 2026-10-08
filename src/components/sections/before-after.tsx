"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, Zap, Bug, Gauge, ShieldAlert } from "lucide-react";

interface MetricRow {
    id: string;
    label: string;
    before: string;
    after: string;
    delta: string;
    unit?: string;
    note: string;
    icon: typeof Gauge;
}

const metrics: MetricRow[] = [
    {
        id: "coverage",
        label: "TEST SUITE COVERAGE",
        before: "14%",
        after: "94%",
        delta: "+80%",
        note: "Automated unit, integration & Playwright E2E coverage across mission-critical paths.",
        icon: ShieldAlert,
    },
    {
        id: "cadence",
        label: "RELEASE FREQUENCY",
        before: "1x / mo",
        after: "8x / mo",
        delta: "8x faster",
        note: "Automated CI/CD pipelines replace nerve-wracking weekend manual releases.",
        icon: Zap,
    },
    {
        id: "bugs",
        label: "PRODUCTION DEFECTS",
        before: "48 / mo",
        after: "2 / mo",
        delta: "-95%",
        note: "Strict TypeScript invariants, input Zod schemas, and runtime error boundary traps.",
        icon: Bug,
    },
    {
        id: "speed",
        label: "PAGE LOAD TIME (FCP)",
        before: "4.8s",
        after: "0.6s",
        delta: "-87%",
        note: "Edge server-rendering, aggressive asset optimization, and Google Lighthouse 99.",
        icon: Gauge,
    },
];

export function BeforeAfterSection() {
    const [activeTab, setActiveTab] = useState<"after" | "before">("after");

    return (
        <section id="before-after" className="relative w-full border-t border-border bg-background py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Header */}
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            ENGINEERING VALUE & IMPACT
                        </span>
                        <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            BEFORE <span className="font-mono text-2xl text-muted-foreground font-light">&</span> AFTER<span className="text-primary">.</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            REAL-WORLD METRICS ACROSS RECENT CLIENT PROJECTS
                        </span>
                        <span className="font-mono text-[11px] text-primary font-medium">
                            FIRST 90 DAYS OF ENGAGEMENT
                        </span>
                    </div>
                </div>

                {/* Side-by-Side Context Banner (Video 2 Style) */}
                <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Before Box */}
                    <div className="flex flex-col justify-between rounded-sm border border-border/70 bg-card/40 p-6 md:p-8">
                        <div>
                            <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                BEFORE: THE INHERITED STATE
                            </div>
                            <h3 className="font-display text-xl font-medium text-foreground sm:text-2xl">
                                Brittle code, sluggish builds, and fear of deploying on Friday.
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Untyped APIs, slow waterfalls, high bounce rates, unmonitored production exceptions, and slow feature velocity.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2 border-t border-border/40 pt-4 font-mono text-[11px] text-muted-foreground">
                            <span className="rounded bg-muted px-2 py-0.5">High Tech Debt</span>
                            <span className="rounded bg-muted px-2 py-0.5">Slow TTI</span>
                            <span className="rounded bg-muted px-2 py-0.5">Frequent Regressions</span>
                        </div>
                    </div>

                    {/* After Box (Highlighted) */}
                    <div className="relative flex flex-col justify-between overflow-hidden rounded-sm border border-primary/40 bg-card p-6 md:p-8 shadow-md">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                        <div>
                            <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                AFTER: ENGINEERED BY DINESH
                            </div>
                            <h3 className="font-display text-xl font-medium text-foreground sm:text-2xl">
                                Type-safe Next.js edge platform with automated CI & sub-second loads.
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Confident daily shipping, zero unhandled errors, responsive fluid UI micro-interactions, and 99+ Lighthouse metrics.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2 border-t border-border/40 pt-4 font-mono text-[11px] text-primary">
                            <span className="rounded bg-primary/10 px-2 py-0.5 font-medium">99+ Lighthouse</span>
                            <span className="rounded bg-primary/10 px-2 py-0.5 font-medium">Sub-second FCP</span>
                            <span className="rounded bg-primary/10 px-2 py-0.5 font-medium">Full Type Safety</span>
                        </div>
                    </div>
                </div>

                {/* Metrics Table / Rows (Directly inspired by Video 2) */}
                <div className="flex flex-col border border-border bg-card">
                    {metrics.map((m, idx) => (
                        <div
                            key={m.id}
                            className={`group relative flex flex-col justify-between gap-4 border-b border-border p-6 transition-colors duration-300 last:border-b-0 hover:bg-muted/40 md:flex-row md:items-center md:p-8`}
                        >
                            {/* Metric Label & Note */}
                            <div className="flex max-w-lg flex-col gap-1.5">
                                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                                    <m.icon className="h-3.5 w-3.5 text-primary" />
                                    <span>{m.label}</span>
                                </div>
                                <p className="text-sm text-foreground/90 font-medium">
                                    {m.note}
                                </p>
                            </div>

                            {/* Comparison Numbers */}
                            <div className="flex items-center gap-4 sm:gap-8">
                                {/* Before Number */}
                                <div className="flex flex-col items-end">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                        Before
                                    </span>
                                    <span className="font-mono text-xl font-medium text-muted-foreground/70 line-through sm:text-2xl">
                                        {m.before}
                                    </span>
                                </div>

                                <ArrowRight className="h-5 w-5 text-muted-foreground/50" />

                                {/* After Number (Highlight Block Video 2 style) */}
                                <div className="flex flex-col items-start">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium">
                                        After
                                    </span>
                                    <div className="flex items-center gap-2 rounded-sm border border-primary/30 bg-primary/15 px-3 py-1 text-primary sm:px-4 sm:py-1.5">
                                        <span className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                            {m.after}
                                        </span>
                                        <span className="font-mono text-xs font-semibold text-primary">
                                            ({m.delta})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
