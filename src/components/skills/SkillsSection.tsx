"use client";

import React from "react";
import dynamic from "next/dynamic";
const SkillsGlobe = dynamic(() => import("./SkillsGlobe").then((mod) => mod.SkillsGlobe), { ssr: false });
import { SkillsMarquee } from "./SkillsMarquee";
import { SkillsCategories } from "./SkillsCategories";
import { motion } from "framer-motion";

export function SkillsSection() {
    return (
        <section id="skills" className="w-full relative py-20 lg:py-32 overflow-hidden bg-background">
            {/* Background noise and glow */}
            <div className="absolute inset-0 bg-background noise-overlay opacity-50 z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
                <div className="text-center mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block">02 / Network</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-foreground">
                            Tech Ecosystem
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        A 3D visualization of my technical expertise, showcasing the frameworks and
                        tools I use to build premium digital experiences.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-20 lg:mb-32">
                    {/* Left Side: 3D Globe */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full flex justify-center items-center lg:order-1 order-1 min-h-[400px]"
                    >
                        <SkillsGlobe />
                    </motion.div>

                    {/* Right Side: Skills Categories */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-full flex flex-col justify-center lg:order-2 order-2"
                    >
                        <SkillsCategories />
                    </motion.div>
                </div>

                {/* Bottom Marquee */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="w-full relative"
                >
                    <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-px h-16 bg-gradient-to-b from-transparent via-zinc-500/50 to-transparent" />
                    <SkillsMarquee />
                </motion.div>
            </div>
        </section>
    );
}
