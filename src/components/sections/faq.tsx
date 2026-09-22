"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { JsonLdScript, buildFAQSchema } from "@/components/seo/json-ld";

export interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export const FAQ_DATA: FAQItem[] = [
    {
        category: "Services & Regional Brand",
        question: "What digital engineering and web development services does Dinesh Nikam provide in Pune and globally?",
        answer: "Dinesh Nikam is Pune's leading full-stack digital architect specializing in enterprise Next.js and React applications, bespoke UI/UX digital design systems, immersive WebGL/Three.js 3D web experiences, resilient cloud infrastructure on AWS, and automated AI/LLM systems. We serve clients across Pune's major technology corridors (Hinjawadi IT Park, Baner, Koregaon Park, Kharadi, Viman Nagar) as well as high-growth startups and enterprises in the US, UK, and Europe.",
    },
    {
        category: "Advantage & Quality",
        question: "Why choose Dinesh Nikam over traditional software agencies in Pune?",
        answer: "Traditional digital agencies frequently assign projects to junior developers, resulting in communication overhead, bloat, and fragile codebases. When you work with Dinesh Nikam, you get direct, senior architectural leadership. Every project is engineered with sub-50ms edge response times, strict TypeScript type safety, bespoke typography, zero unnecessary dependencies, and a proven 99+ Google Lighthouse score.",
    },
    {
        category: "Performance & SEO",
        question: "How do you guarantee 99+ Google PageSpeed scores and top SEO rankings?",
        answer: "We apply a strict performance-first doctrine: next-generation image formats (AVIF/WebP) reducing asset weight by up to 97%, incremental static regeneration (ISR) with edge caching, zero layout shifts (CLS < 0.01), sub-second Largest Contentful Paint (LCP < 1.0s), and comprehensive JSON-LD structured schemas (LocalBusiness, Organization, Service, and FAQPage) that enable Google to grant rich snippet accordions and top regional rankings.",
    },
    {
        category: "AI & Automation",
        question: "How does the automated AI and tech blog publishing system work?",
        answer: "Our automated architecture couples free LLM inference (Google Gemini Flash & Groq) with an autonomous deterministic engine. The system continuously researches, composes, formats, and publishes in-depth technical articles with full MDX syntax, code snippets, architectural diagrams, reading times, and meta tags directly into the database on automated schedules or on-demand via the admin dashboard.",
    },
    {
        category: "Process & Timelines",
        question: "What is your typical project timeline, engagement model, and tech stack?",
        answer: "Enterprise web platforms and bespoke digital portfolios are typically delivered within 2 to 4 weeks across structured milestones. We provide both fixed-price sprint engagements and dedicated architectural advisory. Our core technology stack is Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Prisma, PostgreSQL / Supabase, Three.js, and AWS Cloud.",
    },
    {
        category: "Consultation & Hiring",
        question: "How can businesses in Pune or international clients initiate a project or hire you?",
        answer: "You can submit an inquiry through our Contact section or email directly at nikamdinesh362@gmail.com. We schedule a technical discovery call within 24 hours to review your architecture requirements, business goals, and timeline, followed by an actionable delivery proposal.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="relative w-full border-t border-border px-6 py-28 md:px-12 lg:px-20 xl:px-24 bg-background"
        >
            {/* Embedded FAQPage Structured Data for Google Rich Snippets */}
            <JsonLdScript data={buildFAQSchema(FAQ_DATA)} />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
                {/* Section Index & Eyebrow */}
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            07 / INQUIRIES & FAQ
                        </span>
                        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            Frequently Asked Questions.
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        Clear architectural answers regarding web services in Pune, performance standards, automated AI, and engagement models.
                    </p>
                </div>

                {/* FAQ Accordion List */}
                <div className="flex flex-col divide-y divide-border border-y border-border">
                    {FAQ_DATA.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="group transition-colors duration-200 hover:bg-muted/20"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-start justify-between gap-6 py-7 text-left transition-all"
                                >
                                    <div className="flex items-start gap-5">
                                        <span className="font-mono text-xs uppercase tracking-widest text-primary pt-1">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                                {faq.category}
                                            </span>
                                            <h3 className="font-display text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                                                {faq.question}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-transform duration-300 group-hover:border-primary">
                                        {isOpen ? (
                                            <Minus className="h-4 w-4 text-primary" />
                                        ) : (
                                            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                                        )}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-8 pl-12 pr-6 md:pl-16 md:pr-12">
                                                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA Banner */}
                <div className="flex flex-col items-start justify-between gap-6 rounded-sm border border-border bg-card p-8 md:flex-row md:items-center md:p-10">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                            <HelpCircle className="h-4 w-4" />
                            <span>Have a specific architectural challenge?</span>
                        </div>
                        <p className="text-base text-muted-foreground">
                            Let&apos;s build an extraordinary digital product together. Direct senior consultation in Pune or worldwide.
                        </p>
                    </div>

                    <Link
                        href="/contactme"
                        className="group inline-flex items-center gap-2.5 border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-all duration-300 hover:border-primary hover:bg-primary"
                    >
                        <span>Start Conversation</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
