"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyModal, type CaseStudyData } from "./case-study-modal";

const caseStudies: CaseStudyData[] = [
    {
        id: "cybersherlock",
        num: "01",
        title: "Cybersherlock",
        tagline: "IP intelligence visualization and predictive cybersecurity modeling platform.",
        role: "Frontend Architecture & WebGL",
        year: "2025",
        client: "Cybersecurity Enterprise",
        image: "/cybersherlock.webp",
        tech: ["Next.js", "React", "D3.js", "WebGL", "Tailwind CSS", "MongoDB"],
        liveUrl: "#",
        overview:
            "Cybersherlock transforms massive global IP streams and threat telemetry into low-latency, interactive visual topologies. Built to serve network security architects requiring instant situational awareness.",
        problem:
            "Threat analysts previously combated thousands of unindexed tabular logs with 4+ second query response times, causing delayed vulnerability detection during active scans.",
        approach:
            "Engineered a high-density canvas & WebGL data visualizer with client-side indexing and predictive edge querying, reducing rendering overhead by 70%.",
        design: {
            description:
                "Clean dark-field editorial dashboard with custom monospace telemetrics and high-contrast IP nodes designed for 24/7 security operation centers.",
            highlights: [
                "Dynamic WebGL node graph with fluid camera zoom",
                "Sub-frame micro-interactions for instant threat inspection",
                "Editorial telemetric typographic hierarchy",
            ],
        },
        engineering: {
            architecture:
                "Hybrid Next.js architecture running WebGL shader clusters coupled with edge-cached aggregation pipelines.",
            decisions: [
                "Migrated DOM-heavy SVG graphs to GPU-accelerated WebGL buffers",
                "Implemented memory-efficient ring buffers for live threat ingestion",
                "Optimized Web Worker pipelines for parallel IP resolution",
            ],
        },
        result: {
            metric: "60 FPS @ 50K+ Nodes",
            summary: "Eliminated visual lag across all high-density network visualizer sessions.",
        },
    },
    {
        id: "hp-connect",
        num: "02",
        title: "HP Connect",
        tagline: "Enterprise visitor management ecosystem with real-time omnichannel verification.",
        role: "Full-Stack Engineering & System Architecture",
        year: "2024",
        client: "Commercial Enterprise",
        image: "/hpconnect.webp",
        tech: ["Next.js", "Node.js", "WebSockets", "MongoDB", "Twilio API"],
        liveUrl: "#",
        overview:
            "HP Connect is an automated identity and check-in system designed for high-throughput corporate campuses. It manages visitor registration, QR-based badge issuance, and automated host notifications across WhatsApp and Gmail.",
        problem:
            "Physical paper visitor logs caused lobby bottlenecks during peak hours, privacy non-compliance, and zero auditing capabilities for corporate facility managers.",
        approach:
            "Architected an end-to-end contactless workflow using dynamic QR token validation, instant WebSockets kiosk synchronization, and asynchronous notification queues.",
        design: {
            description:
                "Tactile, minimal kiosk interface built for touch terminals with high-contrast inputs, deliberate negative space, and unambiguous visual confirmations.",
            highlights: [
                "Zero-learning-curve kiosk registration flow completed in under 20 seconds",
                "Dynamic QR digital pass dispatched directly to mobile wallets",
                "Real-time facility occupancy and egress monitoring",
            ],
        },
        engineering: {
            architecture:
                "Distributed Node.js microservices with event-driven WebSockets and resilient external messaging webhooks.",
            decisions: [
                "Stateless cryptographic QR tokens for sub-100ms offline scanner verification",
                "Optimistic UI updates with offline queuing on terminal clients",
                "Strict tenant isolation with automated compliance log pruning",
            ],
        },
        result: {
            metric: "< 20s Check-In Time",
            summary: "Reduced lobby registration queues by 85% across campus deployment.",
        },
    },
    {
        id: "ithpl-platform",
        num: "03",
        title: "ITHPL Corporate Platform",
        tagline: "High-throughput web infrastructure and corporate engineering showcase.",
        role: "Full-Stack Development & Performance Engineering",
        year: "2024",
        client: "ITHPL Group",
        image: "/ithplwebsite.webp",
        tech: ["Next.js", "PHP", "MySQL", "Tailwind CSS", "JavaScript", "REST APIs"],
        liveUrl: "https://ithpl.com",
        overview:
            "Enterprise web portal engineering for an industrial infrastructure leader, highlighting operational facilities, technical capabilities, and global industrial projects.",
        problem:
            "Legacy monolithic architecture suffered from sluggish page loads, outdated presentation, and brittle content maintenance.",
        approach:
            "Modernized the presentation layer with modern responsive layouts, sub-second asset delivery, and a flexible content architecture.",
        design: {
            description:
                "Monochrome editorial aesthetic with confident typography, razor-thin hairlines, and restrained industrial imagery.",
            highlights: [
                "Editorial project showcases with structured technical metrics",
                "Fluid responsive layouts optimized for all corporate devices",
                "Consistent brand identity communicating engineering scale",
            ],
        },
        engineering: {
            architecture:
                "Modernized front-end layer delivering optimized static chunks backed by secure high-availability application services.",
            decisions: [
                "99+ Google Lighthouse performance score achieved across all public routes",
                "Streamlined database schemas reducing query load by 45%",
                "Automated CI/CD pipeline ensuring zero-downtime rolling updates",
            ],
        },
        result: {
            metric: "99+ Lighthouse Score",
            summary: "Transformed brand perception with ultra-fast page loading.",
        },
    },
];

export function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<CaseStudyData | null>(null);

    return (
        <section
            id="work"
            className="relative w-full border-t border-border px-6 py-28 md:px-12 lg:px-20 xl:px-24"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-20">
                {/* Section Index & Eyebrow */}
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            04 / SELECTED WORK
                        </span>
                        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            Engineered for Precision.
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        Selected case studies demonstrating full-stack engineering, creative technology, and editorial UX.
                    </p>
                </div>

                {/* Editorial Project Showcase: Alternating Horizontal Compositions */}
                <div className="flex flex-col gap-28">
                    {caseStudies.map((project, index) => {
                        const isEven = index % 2 === 1;

                        return (
                            <motion.article
                                key={project.id}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative flex flex-col border-b border-border pb-24"
                            >
                                <div
                                    className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                                        isEven ? "lg:[&>*:first-child]:order-2" : ""
                                    }`}
                                >
                                    {/* Project Preview & Visual Identity (Col 1-7) */}
                                    <div
                                        onClick={() => setSelectedProject(project)}
                                        data-cursor-text="VIEW"
                                        className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-sm border border-border bg-card transition-transform duration-700 ease-out hover:scale-[1.015] lg:col-span-7"
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 [filter:contrast(1.04)]"
                                        />
                                        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        {/* Corner Index Tag */}
                                        <span className="absolute top-4 left-4 rounded-sm border border-border/80 bg-background/90 px-3 py-1 font-mono text-xs font-semibold text-foreground backdrop-blur-sm">
                                            {project.num}
                                        </span>
                                    </div>

                                    {/* Editorial Content & Metadata (Col 8-12) */}
                                    <div className="flex flex-col gap-6 lg:col-span-5">
                                        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                            <span className="font-semibold text-primary">{project.num}</span>
                                            <span className="h-px w-6 bg-border" />
                                            <span>{project.year}</span>
                                        </div>

                                        <h3
                                            onClick={() => setSelectedProject(project)}
                                            data-cursor-text="VIEW"
                                            className="cursor-pointer font-display text-3xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-4xl"
                                        >
                                            {project.title}
                                        </h3>

                                        <p className="text-base leading-relaxed text-muted-foreground font-normal">
                                            {project.tagline}
                                        </p>

                                        {/* Metadata Breakdown */}
                                        <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                                    ROLE
                                                </span>
                                                <span className="font-mono text-xs font-medium text-foreground">
                                                    {project.role}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                                    CLIENT
                                                </span>
                                                <span className="font-mono text-xs font-medium text-foreground">
                                                    {project.client}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Tech Badges */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-sm border border-border/80 bg-muted/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Case Study CTA */}
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            data-cursor-text="VIEW"
                                            className="group/btn mt-2 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-primary self-start"
                                        >
                                            <span className="border-b border-foreground pb-0.5 group-hover/btn:border-primary">
                                                EXPLORE CASE STUDY
                                            </span>
                                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>

            {/* Cinematic Modal Case Study Drawer */}
            <CaseStudyModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}