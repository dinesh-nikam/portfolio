"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !textRef.current) return;

        // Split text animation effect for that premium "reveal on scroll" look
        const paragraphs = textRef.current.querySelectorAll("p");

        paragraphs.forEach((p) => {
            gsap.fromTo(p,
                { opacity: 0.1, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: p,
                        start: "top 85%",
                        end: "bottom 60%",
                        scrub: 1, // Smooth scrub for premium feel
                    }
                }
            );
        });

        // Small decorative line animation
        const separator = sectionRef.current.querySelector(".separator");
        if (separator) {
            gsap.fromTo(separator,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: separator,
                        start: "top 90%",
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="w-full min-h-screen py-32 flex items-center justify-center px-6 md:px-12 relative"
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-16">

                <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">
                    01 / Philosophy
                </span>

                <div
                    ref={textRef}
                    className="flex flex-col gap-12 text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-snug"
                >
                    <p>
                        I believe the best digital products sit at the intersection of robust engineering and elevated design.
                    </p>
                    <p>
                        Every line of code and every pixel is crafted with intention—focusing on fluid motion, precise typography, and a seamless user experience.
                    </p>
                    <p>
                        I don&apos;t just build websites; I architect digital environments that feel calm, polished, and unmistakably premium.
                    </p>
                </div>

                <div className="w-24 h-[1px] bg-foreground/20 separator origin-center" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full mt-12">
                    {[
                        { label: "Experience", value: "5+ Years" },
                        { label: "Projects", value: "40+" },
                        { label: "Focus", value: "UX/UI & Code" },
                        { label: "Location", value: "Remote" }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <span className="text-3xl lg:text-4xl font-light tracking-tighter">{stat.value}</span>
                            <span className="text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
