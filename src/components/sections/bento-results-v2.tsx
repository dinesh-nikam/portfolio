"use client";

import { motion } from "framer-motion";
import { Star, Zap, CheckCircle2, Award, Users } from "lucide-react";
import Image from "next/image";

export function BentoResultsV2() {
    return (
        <section className="relative w-full border-t border-border bg-background py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Header */}
                <div className="mb-14">
                    <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                        <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                        WHY CHOOSE ME
                    </span>
                    <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                        FOCUSED ON DESIGN <br />
                        THAT DELIVERS RESULTS<span className="text-primary">.</span>
                    </h2>
                </div>

                {/* Bento Grid (Video 1 Layout) */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                    {/* Card 1: Design Experience (Col 1-4) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="group relative flex flex-col justify-between rounded-sm border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg md:col-span-4"
                    >
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Award className="h-3.5 w-3.5" />
                                DESIGN & DEV EXPERIENCE
                            </span>
                            <div className="my-6">
                                <span className="font-display text-6xl font-bold tracking-tight text-foreground">
                                    1+ Year
                                </span>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground font-mono">
                            Creating modern and conversion-focused digital platforms with extreme precision and speed.
                        </p>
                    </motion.div>

                    {/* Card 2: Clients Social Proof + Avatars (Col 5-8) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="group relative flex flex-col justify-between rounded-sm border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg md:col-span-4"
                    >
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Users className="h-3.5 w-3.5" />
                                GLOBAL REACH
                            </span>

                            {/* Avatar Stack */}
                            <div className="my-6 flex items-center -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-card bg-muted shadow"
                                    >
                                        <Image
                                            src="/my.webp"
                                            alt="Happy client avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="font-display text-xl font-bold text-foreground">
                                1.2k+ Happy Clients
                            </span>
                            <p className="mt-1 font-mono text-xs text-muted-foreground">
                                Successfully delivered across 15+ countries worldwide.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: Fast & Reliable (Col 9-12) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="group relative flex flex-col justify-between rounded-sm border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg md:col-span-4"
                    >
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Zap className="h-3.5 w-3.5" />
                                FAST & RELIABLE
                            </span>
                            <div className="my-6">
                                <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                                    99.98%
                                </span>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground font-mono">
                            I maintain an efficient async workflow that ensures smooth collaboration and zero surprises.
                        </p>
                    </motion.div>

                    {/* Card 4: Client Satisfaction (Col 1-5, bottom row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="group relative flex flex-col justify-between rounded-sm border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg md:col-span-5"
                    >
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                                CLIENT SATISFACTION
                            </span>
                            <div className="my-6">
                                <span className="font-display text-6xl font-bold tracking-tight text-foreground">
                                    98%
                                </span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Focused on delivering results that meet both end-user ergonomics and core business revenue goals.
                        </p>
                    </motion.div>

                    {/* Card 5: Featured Testimonial Quote (Col 6-12, bottom row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="group relative flex flex-col justify-between rounded-sm border border-primary/30 bg-card p-8 shadow-md transition-all duration-300 hover:border-primary hover:shadow-xl md:col-span-7"
                    >
                        <div>
                            {/* Stars */}
                            <div className="flex items-center gap-1 text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-primary" />
                                ))}
                                <span className="ml-2 font-mono text-xs font-bold text-foreground">4.9 / 5</span>
                            </div>

                            <p className="mt-5 text-base sm:text-lg leading-relaxed text-foreground font-medium italic">
                                &ldquo;Dinesh delivered an outstanding full-stack architecture and UX that perfectly matched our vision. The attention to performance, micro-motion, and developer documentation was exceptional.&rdquo;
                            </p>
                        </div>

                        {/* Author */}
                        <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/40">
                                <Image src="/my.webp" alt="Client review" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display text-sm font-bold text-foreground">Olivia Davis</span>
                                <span className="font-mono text-[11px] text-muted-foreground">Product Manager, Enterprise SaaS</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
