"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Scoped GSAP context — everything below is cleaned up on unmount
        const ctx = gsap.context(() => {
            // Statement reveal on scroll
            gsap.utils.toArray<HTMLElement>(".about-statement").forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0.15, y: 28 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.4,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            end: "bottom 60%",
                            scrub: 1,
                        },
                    }
                );
            });

            // Decorative rule draws itself in
            gsap.fromTo(
                ".separator-about",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".separator-about",
                        start: "top 92%",
                    },
                }
            );

            // Stats fade up
            gsap.utils.toArray<HTMLElement>(".stat-item").forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 18 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full px-6 py-32 md:px-12 lg:px-24"
        >
            <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[220px_1fr]">
                {/* Sticky index column */}
                <div className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
                    <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                        <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                        01 — Philosophy
                    </span>
                    <p className="max-w-[14rem] text-sm leading-relaxed text-muted-foreground">
                        Some principles behind the work — the how, not just the what.
                    </p>
                    <span className="hairline mt-2 hidden lg:block" />
                </div>

                {/* Statements + stats */}
                <div className="flex flex-col gap-14">
                    <p className="about-statement font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
                        I believe the best digital products sit at the intersection of{" "}
                        <em className="text-primary">robust engineering</em> and{" "}
                        <em className="text-primary">elevated design</em>.
                    </p>
                    <p className="about-statement font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
                        Every line of code and every pixel is crafted with intention — focusing on{" "}
                        <em className="text-primary">fluid motion</em> and{" "}
                        <em className="text-primary">precise typography</em> for a seamless experience.
                    </p>
                    <p className="about-statement font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
                        I don&apos;t just build websites — I{" "}
                        <em className="text-primary">architect digital environments</em> that feel calm, polished,
                        and unmistakably precise.
                    </p>

                    <div className="separator-about hairline origin-left" />

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
                        {[
                            { value: "3+ Years", label: "Experience" },
                            { value: "50+", label: "Projects" },
                            { value: "UX/UI & Code", label: "Focus" },
                            { value: "Remote", label: "Location" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="stat-item flex flex-col gap-2 border-l border-border pl-5"
                            >
                                <span className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                                    {stat.value}
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}