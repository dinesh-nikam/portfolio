"use client";

import { motion } from "framer-motion";
import { useCapable } from "@/hooks/use-capable";
import { SkillsMarquee } from "./SkillsMarquee";
import { SkillsCategories } from "./SkillsCategories";
import SkillsGlobe from "./SkillsGlobe";
import { allSkills } from "./constants";

function StackLedger() {
    return (
        <div className="w-full overflow-hidden rounded-md border border-border">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Toolchain Register
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                    {String(allSkills.length).padStart(2, "0")} entries
                </span>
            </div>
            <div className="grid grid-cols-1 gap-x-10 px-5 py-3 sm:grid-cols-2">
                {allSkills.map((skill, idx) => (
                    <div key={skill.name} className="flex items-baseline gap-3 border-b border-border/50 py-2.5">
                        <span className="font-mono text-[10px] text-muted-foreground/70">
                            {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="ml-auto font-mono text-[10px] text-muted-foreground">{skill.level}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SkillsSection() {
    const { capable } = useCapable(1024);

    return (
        <section id="skills" className="noise-overlay relative w-full overflow-hidden bg-background py-20 lg:py-32">
            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                <div className="mb-16 text-center lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="mb-4 block font-mono text-sm uppercase tracking-widest text-primary">
                            02 / Network
                        </span>
                        <h2 className="text-display mb-4">Tech Ecosystem</h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mx-auto max-w-2xl text-lg text-muted-foreground"
                    >
                        The frameworks, languages, and tooling I reach for when designing and shipping premium digital
                        experiences.
                    </motion.p>
                </div>

                <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:mb-32 lg:grid-cols-2 lg:gap-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="order-1 flex min-h-[400px] w-full items-center justify-center lg:order-1"
                    >
                        {capable ? (
                            <div className="h-[440px] w-full">
                                <SkillsGlobe skills={allSkills} />
                            </div>
                        ) : (
                            <StackLedger />
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-2 flex w-full flex-col justify-center lg:order-2"
                    >
                        <SkillsCategories />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative w-full"
                >
                    <div className="absolute -top-8 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
                    <SkillsMarquee />
                </motion.div>
            </div>
        </section>
    );
}