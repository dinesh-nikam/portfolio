"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

/* Smooth scrolling is a one-way enhancement: it must never fight the browser
   or the user. Reduced-motion visitors get native scrolling — no hijack, no
   smooth-scroll interception, no fighting interface. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
        };
    }, []);

    return <>{children}</>;
}
