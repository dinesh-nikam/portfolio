"use client";

import { motion } from "framer-motion";

const brands = [
    { name: "VERCEL", label: "Vercel Edge" },
    { name: "SUPABASE", label: "Supabase DB" },
    { name: "AWS CLOUD", label: "AWS Lambda" },
    { name: "PRISMA", label: "Prisma ORM" },
    { name: "STRIPE", label: "Stripe Billing" },
    { name: "DOCKER", label: "Docker Container" },
    { name: "TAILWIND", label: "Tailwind UI" },
    { name: "PLAYWRIGHT", label: "Playwright E2E" },
];

export function BrandMarqueeV2() {
    return (
        <section className="w-full border-y border-border/80 bg-card/40 py-8 overflow-hidden select-none">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                {/* Section Tag */}
                <div className="shrink-0 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
                        TRUSTED BY LEADING BRANDS
                    </span>
                </div>

                {/* Infinite Marquee Track */}
                <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        className="flex w-max shrink-0 items-center gap-10 sm:gap-14 font-display text-lg sm:text-xl font-bold tracking-wider text-muted-foreground/60"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 22,
                        }}
                    >
                        {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
                            <span
                                key={idx}
                                className="flex items-center gap-8 transition-colors duration-300 hover:text-foreground cursor-default"
                            >
                                <span className="tracking-widest uppercase">{brand.name}</span>
                                <span className="font-mono text-xs text-primary/70">✦</span>
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
