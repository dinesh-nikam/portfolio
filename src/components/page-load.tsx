"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { markPageRevealed, sessionAlreadyLoaded } from "@/lib/page-reveal";

const PRELOAD_DURATION = 1.35;

export default function PageLoad() {
    const [visible, setVisible] = useState(false);
    const [done, setDone] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const counterRef = useRef<HTMLSpanElement | null>(null);
    const counterWrapRef = useRef<HTMLDivElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        if (!visible) return;
        const root = rootRef.current;
        const top = topRef.current;
        const bottom = bottomRef.current;
        const counterWrap = counterWrapRef.current;
        if (!root || !top || !bottom || !counterWrap) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion || sessionAlreadyLoaded()) {
            markPageRevealed();
            const id = requestAnimationFrame(() => setDone(true));
            return () => cancelAnimationFrame(id);
        }

        document.documentElement.classList.add("preload-lock");
        root.style.pointerEvents = "auto";

        const counter = { value: 0 };
        const timeline = gsap.timeline();
        timeline
            .to(
                counter,
                {
                    value: 100,
                    duration: PRELOAD_DURATION,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        if (counterRef.current) {
                            counterRef.current.textContent = String(
                                Math.round(counter.value)
                            ).padStart(3, "0");
                        }
                    },
                },
                0
            )
            .to(
                progressRef.current,
                {
                    scaleX: 1,
                    duration: PRELOAD_DURATION,
                    ease: "power2.inOut",
                },
                0
            )
            .to(counterWrap, {
                opacity: 0,
                duration: 0.2,
                ease: "power1.out",
            }, PRELOAD_DURATION - 0.12)
            .add(() => {
                root.style.pointerEvents = "none";
                markPageRevealed();
            }, PRELOAD_DURATION - 0.12)
            .to(
                top,
                { yPercent: -101, duration: 0.75, ease: "power4.inOut" },
                PRELOAD_DURATION - 0.1
            )
            .to(
                bottom,
                { yPercent: 101, duration: 0.75, ease: "power4.inOut" },
                PRELOAD_DURATION - 0.1
            )
            .add(() => {
                document.documentElement.classList.remove("preload-lock");
                setDone(true);
            }, "+=0.05");

        return () => {
            timeline.kill();
            document.documentElement.classList.remove("preload-lock");
        };
    }, [visible]);

    if (!visible || done) return null;

    return (
        <div
            ref={rootRef}
            className="pointer-events-none fixed inset-0 z-[250]"
            aria-hidden="true"
        >
            <div
                ref={topRef}
                className="absolute inset-x-0 top-0 h-1/2 border-b border-border bg-background"
            >
                <div className="noise-overlay absolute inset-0" />
            </div>
            <div
                ref={bottomRef}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
            >
                <div className="noise-overlay absolute inset-0" />
            </div>
            <div
                ref={counterWrapRef}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            >
                <span
                    ref={counterRef}
                    className="font-mono text-5xl tabular-nums tracking-tight text-foreground sm:text-6xl"
                >
                    000
                </span>
                <div className="h-px w-40 overflow-hidden bg-border">
                    <div
                        ref={progressRef}
                        className="h-full w-full origin-left scale-x-0 bg-primary"
                    />
                </div>
            </div>
        </div>
    );
}