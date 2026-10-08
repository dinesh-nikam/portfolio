"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { statsData } from "@/lib/data";

interface ServiceItem {
    num: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
}

const servicesList: ServiceItem[] = [
    {
        num: "001",
        title: "FULL STACK WEB ARCHITECTURE",
        category: "EDGE APPS",
        description:
            "Crafting high-throughput, edge-rendered Next.js web applications that connect users with products effortlessly with 99+ Lighthouse performance.",
        image: "/cybersherlock.webp",
        tags: ["Edge SSR", "Next.js 16", "TypeScript", "Core Web Vitals", "Lighthouse 99"],
    },
    {
        num: "002",
        title: "BESPOKE UI/UX & MOTION DESIGN",
        category: "DESIGN SYSTEMS",
        description:
            "Designing seamless, tactile experiences built for fluid 60fps micro-animations, accessible design tokens, and dark editorial aesthetics.",
        image: "/my.webp",
        tags: ["Design Tokens", "Accessible UI", "Framer Motion", "Micro-Interactions"],
    },
    {
        num: "003",
        title: "WEBGL & IMMERSIVE 3D TECH",
        category: "CREATIVE 3D",
        description:
            "Shaping interactive 3D digital experiences using Three.js, React Three Fiber, GLSL shaders, and hardware-accelerated physics canvas.",
        image: "/hpconnect.webp",
        tags: ["React Three Fiber", "Custom GLSL", "3D Canvas", "GPU Optimization"],
    },
    {
        num: "004",
        title: "HIGH-THROUGHPUT CLOUD & APIS",
        category: "SCALABLE SYSTEMS",
        description:
            "Architecting distributed microservices, real-time WebSockets, robust PostgreSQL schemas, Redis caching, and automated AWS pipelines.",
        image: "/ithplwebsite.webp",
        tags: ["Node.js & Go", "PostgreSQL", "Prisma ORM", "Redis Caching", "Docker & AWS"],
    },
];

export function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeService = servicesList[activeIndex];

    return (
        <section id="services" className="relative w-full overflow-hidden bg-background py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Stats Bar */}
                <div className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4 lg:mb-28">
                    {statsData.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex flex-col gap-2"
                        >
                            <span className="h-[1px] w-full bg-border" />
                            <h4 className="font-display text-4xl text-foreground lg:text-5xl">
                                {stat.value}
                            </h4>
                            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Section Header */}
                <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            OUR CAPABILITIES
                        </span>
                        <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            POWERFUL DIGITAL <br />
                            SERVICES FOR YOUR BRAND<span className="text-primary">.</span>
                        </h2>
                    </div>

                    <p className="max-w-sm text-base text-muted-foreground md:text-right">
                        Delivering world-class digital platforms with an uncompromising focus on speed, typography, and fluid user interaction.
                    </p>
                </div>

                {/* Interactive Split Layout with Hover Image Reveal (Video 1 Hallmark) */}
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14 border-t border-border pt-6">
                    {/* Left Column: Interactive Service Rows (Col 1-7) */}
                    <div className="flex flex-col divide-y divide-border lg:col-span-7">
                        {servicesList.map((service, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <div
                                    key={service.num}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`group relative flex flex-col py-8 transition-colors duration-300 cursor-pointer ${
                                        isActive ? "bg-card/40" : "bg-transparent hover:bg-card/20"
                                    }`}
                                >
                                    <div className="flex w-full flex-col gap-4">
                                        {/* Number & Title */}
                                        <div className="flex items-baseline gap-4 sm:gap-6">
                                            <span
                                                className={`font-mono text-xs font-bold transition-colors duration-300 ${
                                                    isActive ? "text-primary" : "text-muted-foreground"
                                                }`}
                                            >
                                                {service.num}
                                            </span>
                                            <h3
                                                className={`font-display text-2xl font-bold tracking-tight transition-all duration-300 sm:text-3xl lg:text-4xl ${
                                                    isActive
                                                        ? "text-primary translate-x-1"
                                                        : "text-foreground group-hover:text-primary group-hover:translate-x-1"
                                                }`}
                                            >
                                                {service.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground pl-7 sm:pl-10">
                                            {service.description}
                                        </p>

                                        {/* Tags Strip (Video 1 style) */}
                                        <div className="flex flex-wrap gap-2 pl-7 pt-1 sm:pl-10">
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Button */}
                                        <div className="pl-7 pt-2 sm:pl-10">
                                            <Link
                                                href="/contactme"
                                                className="inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90"
                                            >
                                                <span>DISCUSS SERVICE</span>
                                                <ArrowUpRight className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Bottom Animated Line */}
                                    <div
                                        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
                                            isActive ? "w-full bg-primary" : "w-0 bg-transparent"
                                        }`}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Dynamic Sticky Floating Preview Image Card (Video 1 signature) */}
                    <div className="sticky top-28 hidden lg:col-span-5 lg:flex flex-col">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-card shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeService.num}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative h-full w-full"
                                >
                                    <Image
                                        src={activeService.image}
                                        alt={activeService.title}
                                        fill
                                        sizes="(max-width: 1280px) 450px, 550px"
                                        className="object-cover [filter:contrast(1.05)]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Video 1 Bottom Pill Badge with Orange Dot */}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-sm border border-white/15 bg-black/75 px-4 py-2.5 backdrop-blur-md">
                                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white">
                                            <span className="h-2 w-2 rounded-sm bg-primary" />
                                            <span>{activeService.num} {activeService.category}</span>
                                        </div>
                                        <span className="font-mono text-[10px] text-white/60">
                                            /Architecture
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            <span>Interactive Preview</span>
                            <span>Hover row to inspect</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}