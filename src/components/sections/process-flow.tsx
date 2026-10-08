"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, ShieldCheck, FileCode, Search, Layers, Rocket } from "lucide-react";

interface ProcessStep {
    num: string;
    title: string;
    subtitle: string;
    description: string;
    icon: typeof Search;
    timeframe: string;
    deliverables: string[];
}

const steps: ProcessStep[] = [
    {
        num: "01",
        title: "AUDIT & DISCOVERY",
        subtitle: "Honest analysis before writing a line of code",
        description:
            "I dive deep into your existing codebase, bundle size, latency bottlenecks, and business requirements. You receive an honest technical assessment of risks, opportunities, and architecture decisions.",
        icon: Search,
        timeframe: "Week 01",
        deliverables: [
            "Lighthouse & Core Web Vitals audit",
            "Database schema & API bottleneck analysis",
            "Technical debt roadmap & refactor priorities",
        ],
    },
    {
        num: "02",
        title: "SYSTEM ARCHITECTURE",
        subtitle: "The blueprint that guarantees scale",
        description:
            "Designing relational schemas, edge API routes, state management paradigms, and a component design system. We lock in the data contracts and type safety before implementation begins.",
        icon: Layers,
        timeframe: "Week 01 - 02",
        deliverables: [
            "Next.js App Router / Edge route blueprint",
            "Prisma / SQL database schema with migration plan",
            "Design tokens & accessible UI component library",
        ],
    },
    {
        num: "03",
        title: "AGILE DEVELOPMENT",
        subtitle: "One-week sprints & working demos every Friday",
        description:
            "High-velocity execution in tightly scoped sprints. You don't wait weeks to see progress — you get interactive preview URLs on Vercel for every feature branch, plus direct Slack/Discord access.",
        icon: FileCode,
        timeframe: "Weeks 02 - 06",
        deliverables: [
            "Weekly staging releases with live Vercel previews",
            "Type-safe API routes & fluid 60fps micro-animations",
            "Async video walkthroughs & transparent PR reviews",
        ],
    },
    {
        num: "04",
        title: "TESTING & ZERO-DOWNTIME SHIP",
        subtitle: "Green CI means you sleep peacefully",
        description:
            "Before launch, the entire application is subjected to automated Playwright E2E suites, unit tests, and load testing. Deployed to edge CDN with 30-day post-launch warranty.",
        icon: Rocket,
        timeframe: "Launch & Beyond",
        deliverables: [
            "90%+ test coverage harness (Jest & Playwright)",
            "Automated GitHub Actions CI/CD pipeline",
            "30-day bug warranty & post-launch performance monitoring",
        ],
    },
];

export function ProcessFlowSection() {
    const [activeIdx, setActiveIdx] = useState(0);
    const activeStep = steps[activeIdx];

    return (
        <section id="process" className="relative w-full border-t border-border bg-background py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Header */}
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            METHODOLOGY & EXECUTION
                        </span>
                        <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            HOW THE WORK GOES<span className="text-primary">.</span>
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-wider text-muted-foreground md:text-right">
                        {"4 DISCIPLINED STEPS · NO GUESSWORK · RADICAL TRANSPARENCY"}
                    </p>
                </div>

                {/* 4 Step Numbered Circles (Video 2 Style) */}
                <div className="relative mb-12">
                    {/* Connecting line */}
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-border hidden md:block" />

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                        {steps.map((step, idx) => {
                            const isActive = activeIdx === idx;
                            return (
                                <button
                                    key={step.num}
                                    onClick={() => setActiveIdx(idx)}
                                    className={`group relative flex flex-col items-center rounded-sm border p-6 text-center transition-all duration-300 cursor-pointer ${
                                        isActive
                                            ? "border-primary bg-card shadow-lg ring-1 ring-primary/40 -translate-y-1"
                                            : "border-border bg-card/40 hover:border-primary/40 hover:bg-card"
                                    }`}
                                >
                                    {/* Number Circle */}
                                    <div
                                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full font-mono text-xl font-bold transition-all duration-300 ${
                                            isActive
                                                ? "bg-primary text-primary-foreground scale-110 shadow-md"
                                                : "border border-border bg-background text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
                                        }`}
                                    >
                                        {step.num}
                                    </div>

                                    <h3 className="font-display text-base font-bold uppercase tracking-tight text-foreground sm:text-lg">
                                        {step.title}
                                    </h3>
                                    <span className="mt-1 font-mono text-[11px] text-muted-foreground">
                                        {step.timeframe}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active Step Details Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIdx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-sm border border-border bg-card p-6 sm:p-8 md:p-10"
                    >
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                            {/* Left: Overview (Col 1-7) */}
                            <div className="flex flex-col gap-4 lg:col-span-7">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                                        STAGE {activeStep.num} OF 04
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-border" />
                                    <span className="font-mono text-xs text-muted-foreground">
                                        {activeStep.timeframe}
                                    </span>
                                </div>

                                <h4 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                                    {activeStep.subtitle}
                                </h4>

                                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    {activeStep.description}
                                </p>
                            </div>

                            {/* Right: Key Deliverables (Col 8-12) */}
                            <div className="flex flex-col justify-between gap-6 rounded-sm border border-border/80 bg-background/60 p-6 lg:col-span-5">
                                <div>
                                    <h5 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-4">
                                        KEY DELIVERABLES
                                    </h5>
                                    <ul className="flex flex-col gap-3">
                                        {activeStep.deliverables.map((item, dIdx) => (
                                            <li key={dIdx} className="flex items-start gap-3 text-sm text-foreground/90">
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t border-border pt-4 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                                    <span>Weekly Friday live demos</span>
                                    <span className="text-primary font-medium">Async Slack access</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
