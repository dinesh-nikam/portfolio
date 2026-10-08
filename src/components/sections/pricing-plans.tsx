"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

interface PlanItem {
    id: string;
    badge: string;
    name: string;
    price: string;
    period: string;
    deliveryTime: string;
    revisions: string;
    stack: string;
    description: string;
    features: string[];
    isPopular?: boolean;
}

const projectPlans: PlanItem[] = [
    {
        id: "starter-sprint",
        badge: "STARTER / LANDING",
        name: "HIGH-CONVERTING WEB EXPERIENCE",
        price: "$1,800",
        period: "/ Project",
        deliveryTime: "1-2 Weeks",
        revisions: "Unlimited during sprint",
        stack: "Next.js 16, Tailwind, Framer",
        description:
            "A bespoke, editorial marketing site or product showcase built with fluid motion, 99+ Lighthouse score, and SEO schema.",
        features: [
            "Up to 4 custom responsive pages / sections",
            "Bespoke typography & Framer Motion micro-interactions",
            "99+ Google Lighthouse performance guarantee",
            "Structured JSON-LD SEO metadata & OpenGraph cards",
            "Contact form integration & lead capture webhook",
            "14 days post-launch support & bug warranty",
        ],
    },
    {
        id: "full-mvp",
        badge: "COMPLETE MVP PACKAGE",
        name: "FULL-STACK WEB APPLICATION",
        price: "$3,600",
        period: "/ Project",
        deliveryTime: "3-4 Weeks",
        revisions: "Continuous feedback",
        stack: "Next.js, PostgreSQL, Auth, Stripe",
        description:
            "From data models and auth to interactive client dashboards and payment billing. Production-grade and ready to onboard users.",
        features: [
            "Complete Next.js App Router full-stack architecture",
            "PostgreSQL database schema & Prisma ORM migrations",
            "Authentication (OAuth, email magic links, session tokens)",
            "Stripe or LemonSqueezy subscription / checkout flow",
            "Automated Playwright E2E & unit test coverage",
            "Automated GitHub Actions CI/CD to Vercel/AWS",
            "30 days post-launch warranty & direct Slack support",
        ],
        isPopular: true,
    },
];

const monthlyPlans: PlanItem[] = [
    {
        id: "advisory-retainer",
        badge: "PART-TIME RETAINER",
        name: "SENIOR ARCHITECT ON DEMAND",
        price: "$2,400",
        period: "/ Month",
        deliveryTime: "Ongoing (15 hrs/wk)",
        revisions: "Continuous iterations",
        stack: "Code Reviews & Architecture",
        description:
            "Fractional senior engineering leadership. Codebase audits, PR reviews, performance tuning, and unblocking your dev team.",
        features: [
            "15 hours dedicated engineering time per week",
            "Weekly architecture sync & backlog prioritization",
            "In-depth code reviews & refactor implementation",
            "Performance profiling & database query optimization",
            "Direct Slack/Discord channel for async questions",
            "Pause or cancel anytime with 14-day notice",
        ],
    },
    {
        id: "dedicated-sprint",
        badge: "DEDICATED FULL-STACK",
        name: "EMBEDDED SENIOR ENGINEER",
        price: "$4,800",
        period: "/ Month",
        deliveryTime: "Full-Time Focus",
        revisions: "Agile sprints",
        stack: "Next.js, Node, Cloud, DevOps",
        description:
            "Full engineering velocity dedicated to shipping your roadmap. High-volume PRs, features, and production deployments.",
        features: [
            "Full dedicated feature development & shipping",
            "Daily asynchronous standups & fast PR turnaround",
            "Full-stack frontend, backend, and cloud DevOps",
            "Comprehensive test suites with every release",
            "Priority Slack/Discord availability during business hours",
            "Weekly staging demos every Friday",
        ],
        isPopular: true,
    },
];

export function PricingPlansSection() {
    const [billingType, setBillingType] = useState<"project" | "monthly">("project");
    const plans = billingType === "project" ? projectPlans : monthlyPlans;

    return (
        <section id="pricing" className="relative w-full border-t border-border bg-background py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Header with Switcher (Video 1 Style) */}
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            ENGAGEMENT MODELS
                        </span>
                        <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            SIMPLE PLANS <span className="font-light text-muted-foreground">FOR EVERY NEED.</span>
                        </h2>
                    </div>

                    {/* Pill Switcher */}
                    <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
                        <button
                            onClick={() => setBillingType("project")}
                            className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                billingType === "project"
                                    ? "bg-foreground text-background font-semibold shadow"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Project Based
                        </button>
                        <button
                            onClick={() => setBillingType("monthly")}
                            className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                billingType === "monthly"
                                    ? "bg-foreground text-background font-semibold shadow"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Monthly Retainer
                        </button>
                    </div>
                </div>

                {/* Plan Cards Grid (Video 1 Style) */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <AnimatePresence initial={false}>
                        {plans.map((plan) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.3 }}
                                className={`relative flex flex-col justify-between overflow-hidden rounded-sm border p-8 md:p-10 transition-all duration-300 ${
                                    plan.isPopular
                                        ? "border-primary/50 bg-card shadow-xl ring-1 ring-primary/30"
                                        : "border-border bg-card/60 hover:border-primary/30"
                                }`}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 right-0 rounded-bl-sm bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                                        Most Popular
                                    </div>
                                )}

                                <div>
                                    {/* Badge & Name */}
                                    <div className="mb-4">
                                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                                            {plan.badge}
                                        </span>
                                        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                            {plan.name}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                            {plan.description}
                                        </p>
                                    </div>

                                    {/* Price Box */}
                                    <div className="my-6 border-y border-border py-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                                {plan.price}
                                            </span>
                                            <span className="font-mono text-sm uppercase text-muted-foreground">
                                                {plan.period}
                                            </span>
                                        </div>

                                        {/* Meta specs */}
                                        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/40 pt-4 font-mono text-[11px] text-muted-foreground">
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/70">
                                                    Timeline
                                                </span>
                                                <span className="font-medium text-foreground">{plan.deliveryTime}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/70">
                                                    Revisions
                                                </span>
                                                <span className="font-medium text-foreground">{plan.revisions}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/70">
                                                    Core Stack
                                                </span>
                                                <span className="font-medium text-foreground truncate block">{plan.stack}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feature Checklist */}
                                    <div className="mb-8">
                                        <span className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                                            WHAT&apos;S INCLUDED:
                                        </span>
                                        <ul className="flex flex-col gap-3">
                                            {plan.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-3 text-sm text-foreground/90">
                                                    <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Satisfaction Guarantee & CTA (Video 1 style) */}
                                <div className="flex flex-col gap-4 border-t border-border pt-6">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                                        <span>
                                            <strong className="text-foreground font-medium">Satisfaction Guarantee:</strong> 30-day post-launch bug warranty & zero vendor lock-in.
                                        </span>
                                    </div>

                                    <Link
                                        href="/contactme"
                                        className="group flex w-full items-center justify-between rounded-sm border border-primary bg-primary px-6 py-4 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-primary/90 shadow-md"
                                    >
                                        <span>GET STARTED WITH DINESH</span>
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
