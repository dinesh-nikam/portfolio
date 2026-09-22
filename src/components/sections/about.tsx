"use client";

import { Terminal, Compass, Feather } from "lucide-react";

export function AboutSection() {
    return (
        <section
            id="about"
            className="relative w-full border-t border-border px-6 py-28 md:px-12 lg:px-20 xl:px-24"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
                {/* Section Index */}
                <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                        <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                        01 / PHILOSOPHY & ABOUT
                    </span>
                </div>

                {/* Dominant Manifesto Statement */}
                <div className="max-w-5xl">
                    <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                        I care about the space between{" "}
                        <span className="italic text-primary">design</span> and{" "}
                        <span className="italic text-primary">engineering</span>.
                    </h2>
                </div>

                {/* Editorial Biography & Human Narrative */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 pt-4">
                    {/* Left Column: The Narrative (Col 1-7) */}
                    <div className="flex flex-col gap-6 text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-7">
                        <p>
                            I&apos;m <strong className="font-medium text-foreground">Dinesh Nikam</strong>, a full-stack engineer and creative technologist based in Pune, India. I treat the browser not merely as an application viewport, but as an interactive canvas where typography, motion mathematics, and systems architecture converge.
                        </p>
                        <p>
                            Too often, digital products suffer from a fundamental disconnect: engineers view design as decorative afterthought, while designers lack intimate intuition for GPU memory boundaries, edge compute latency, and DOM layout thrashing. I operate squarely in that seam.
                        </p>
                        <p>
                            When I build, I don&apos;t assemble generic boilerplate components. I architect bespoke digital environments where transitions feel organic, tactile interactions respond without perceptible latency, and typography commands the page with editorial dignity.
                        </p>
                        <p>
                            What drives me is quiet confidence: building software that doesn&apos;t scream for attention with gimmicks, but rewards attention through relentless intentionality, sub-second performance, and timeless restraint.
                        </p>
                    </div>

                    {/* Right Column: Values & Distinctions (Col 8-12) */}
                    <div className="flex flex-col gap-6 rounded-sm border border-border bg-card p-8 lg:col-span-5">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                            CORE ETHOS
                        </span>

                        <div className="flex flex-col gap-6">
                            {[
                                {
                                    icon: Feather,
                                    title: "Typography as Interface",
                                    desc: "Type is never mere filler. It dictates rhythm, establishes tension, and guides the eye with architectural clarity.",
                                },
                                {
                                    icon: Terminal,
                                    title: "Engineered Precision",
                                    desc: "Clean abstractions, strict type safety, sub-50ms edge APIs, and zero unneeded dependencies.",
                                },
                                {
                                    icon: Compass,
                                    title: "Deliberate Motion",
                                    desc: "Every spring and keyframe must have physical purpose. If an animation exists only to show off, it gets removed.",
                                },
                            ].map((ethos, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-primary">
                                        <ethos.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                                            {ethos.title}
                                        </h3>
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            {ethos.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 border-t border-border pt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            <span>LOCATION: PUNE, IN</span>
                            <span>TIMEZONE: IST (UTC+5:30)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}