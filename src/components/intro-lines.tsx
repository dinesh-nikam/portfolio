"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePageRevealed } from "@/hooks/use-page-revealed";

/* Editorial headline reveal — each passed line sits in an overflow mask and
   slides up once the preloader signals the page is revealed. Runs once per
   mount; reduced-motion users see the lines immediately. */

interface IntroLinesProps {
    lines: React.ReactNode[];
    ariaLabel: string;
    className?: string;
    lineClassName?: string;
}

export function IntroLines({ lines, ariaLabel, className, lineClassName }: IntroLinesProps) {
    const rootRef = useRef<HTMLHeadingElement | null>(null);
    const revealed = usePageRevealed();

    useEffect(() => {
        const root = rootRef.current;
        if (!revealed || !root) return;
        const masks = Array.from(root.querySelectorAll<HTMLElement>("[data-intro-line]"));
        if (masks.length === 0) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            gsap.set(masks, { yPercent: 0, opacity: 1 });
            return;
        }

        const timeline = gsap.fromTo(
            masks,
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, ease: "power4.inOut", stagger: 0.12 }
        );
        return () => {
            timeline.kill();
        };
    }, [revealed]);

    return (
        <h1 ref={rootRef} aria-label={ariaLabel} className={className}>
            {lines.map((line, index) => (
                <span
                    key={index}
                    aria-hidden="true"
                    className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
                >
                    <span
                        data-intro-line
                        className={`block will-change-transform ${lineClassName ?? ""}`}
                    >
                        {line}
                    </span>
                </span>
            ))}
        </h1>
    );
}