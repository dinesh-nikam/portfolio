"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Cpu, Database, ShieldCheck } from "lucide-react";

interface TechPill {
    name: string;
    level?: string;
}

interface StackPillar {
    num: string;
    title: string;
    category: string;
    tagline: string;
    description: string;
    icon: typeof Cpu;
    pills: string[];
    metrics: { label: string; value: string }[];
}

const stackPillars: StackPillar[] = [
    {
        num: "01",
        title: "FRONTEND ARCHITECTURE",
        category: "UI & CLIENT-SIDE",
        tagline: "Interfaces that don't lag and don't fall apart.",
        description:
            "Edge SSR, component architecture, accessible design tokens, 60fps micro-interactions, and 99+ Lighthouse performance scores.",
        icon: Cpu,
        pills: ["TypeScript", "Next.js 16", "React 19", "Tailwind CSS", "Framer Motion", "Three.js", "Vite", "GSAP"],
        metrics: [
            { label: "Lighthouse Score", value: "99/100" },
            { label: "Frame Rate", value: "60 FPS" },
        ],
    },
    {
        num: "02",
        title: "BACKEND & DISTRIBUTED SYSTEMS",
        category: "APIs & INFRASTRUCTURE",
        tagline: "High-throughput APIs, resilient schemas, and zero unneeded overhead.",
        description:
            "From relational schemas and Redis caching layers to Docker containerization and AWS edge routing.",
        icon: Database,
        pills: ["Node.js", "Python", "Go", "PostgreSQL", "Prisma ORM", "Redis", "Docker", "AWS Cloud"],
        metrics: [
            { label: "API Latency (p95)", value: "< 45ms" },
            { label: "Uptime SLA", value: "99.98%" },
        ],
    },
    {
        num: "03",
        title: "TESTING & RELIABILITY",
        category: "QA & RESILIENCE",
        tagline: "Tests written before a bug reaches staging, never after.",
        description:
            "Unit, integration, automated E2E user journeys, and load stress testing under heavy concurrent traffic.",
        icon: ShieldCheck,
        pills: ["Jest", "Playwright", "Cypress", "k6 Load Testing", "CI/CD Actions", "Storybook", "Turborepo"],
        metrics: [
            { label: "Test Coverage", value: "94%" },
            { label: "Zero-Downtime", value: "100%" },
        ],
    },
];

export function TechStackShowcase() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

    return (
        <section id="stack-showcase" className="relative w-full border-t border-border bg-background py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Header */}
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            STACK & CAPABILITIES
                        </span>
                        <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            WHAT I WORK WITH<span className="text-primary">.</span>
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-wider text-muted-foreground md:text-right">
                        {"3 CORE DISCIPLINES · PRODUCTION HARDENED · 2026 STANDARDS"}
                    </p>
                </div>

                {/* Stack Rows */}
                <div className="flex flex-col border-t border-border">
                    {stackPillars.map((pillar, idx) => {
                        const isHovered = hoveredIdx === idx;

                        return (
                            <motion.div
                                key={pillar.num}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                className={`group relative flex flex-col border-b border-border transition-all duration-300 ${
                                    isHovered
                                        ? "bg-card shadow-sm"
                                        : "bg-transparent hover:bg-card/40"
                                }`}
                            >
                                {/* Left indicator line on active */}
                                <div
                                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${
                                        isHovered ? "bg-primary" : "bg-transparent"
                                    }`}
                                />

                                <div className="flex flex-col gap-6 p-6 sm:p-8 md:p-10">
                                    {/* Main Row Info */}
                                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:items-center">
                                        {/* Number & Icon (Col 1-2) */}
                                        <div className="flex items-center gap-4 lg:col-span-2">
                                            <span
                                                className={`font-mono text-3xl font-bold tracking-tight transition-colors duration-300 ${
                                                    isHovered ? "text-primary" : "text-muted-foreground/60"
                                                }`}
                                            >
                                                {pillar.num}
                                            </span>
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-sm border transition-colors duration-300 ${
                                                    isHovered
                                                        ? "border-primary/40 bg-primary/10 text-primary"
                                                        : "border-border bg-background text-muted-foreground"
                                                }`}
                                            >
                                                <pillar.icon className="h-5 w-5" />
                                            </div>
                                        </div>

                                        {/* Title & Tagline (Col 3-7) */}
                                        <div className="flex flex-col gap-1 lg:col-span-5">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                                    {pillar.title}
                                                </h3>
                                            </div>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                {pillar.tagline}
                                            </p>
                                        </div>

                                        {/* Metrics snippet (Col 8-10) */}
                                        <div className="flex items-center gap-6 lg:col-span-4">
                                            {pillar.metrics.map((m, mIdx) => (
                                                <div key={mIdx} className="flex flex-col">
                                                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                                        {m.label}
                                                    </span>
                                                    <span className="font-mono text-lg font-bold text-foreground">
                                                        {m.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Arrow Action (Col 11-12) */}
                                        <div className="hidden justify-end lg:col-span-1 lg:flex">
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-sm border transition-all duration-300 ${
                                                    isHovered
                                                        ? "border-primary bg-primary text-primary-foreground translate-x-1 -translate-y-1"
                                                        : "border-border bg-card text-muted-foreground"
                                                }`}
                                            >
                                                <ArrowUpRight className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description & Pills */}
                                    <div className="flex flex-col gap-4 pt-2 lg:pl-[calc(16.666%+1rem)]">
                                        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                            {pillar.description}
                                        </p>

                                        {/* Pills Strip */}
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {pillar.pills.map((pill) => (
                                                <span
                                                    key={pill}
                                                    className={`inline-flex items-center rounded-full border px-3.5 py-1 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                                                        isHovered
                                                            ? "border-foreground/30 bg-foreground text-background font-medium hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                                            : "border-border bg-background/80 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                                                    }`}
                                                >
                                                    {pill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
