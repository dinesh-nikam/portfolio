"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCapable } from "@/hooks/use-capable";

export default function CustomCursor() {
    const { capable } = useCapable();
    const dotRef = useRef<HTMLDivElement | null>(null);
    const ringRef = useRef<HTMLDivElement | null>(null);
    const labelRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (!capable) return;
        const dot = dotRef.current;
        const ring = ringRef.current;
        const label = labelRef.current;
        if (!dot || !ring || !label) return;

        document.documentElement.classList.add("has-custom-cursor");

        const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
        const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

        let currentMode: "normal" | "interactive" | "external" | "labelled" = "normal";
        let currentText = "";

        const onMove = (event: MouseEvent) => {
            dotX(event.clientX);
            dotY(event.clientY);
            ringX(event.clientX);
            ringY(event.clientY);
        };

        const updateCursorState = (target: HTMLElement | null) => {
            const labelled = target?.closest?.("[data-cursor-text]") as HTMLElement | null;
            const external = !labelled
                ? (target?.closest?.('a[target="_blank"], a[href^="http"]') as HTMLElement | null)
                : null;
            const interactive = target?.closest?.(
                "a, button, [role='button'], [data-cursor-interactive]"
            ) as HTMLElement | null;

            let nextMode: typeof currentMode = "normal";
            let nextText = "";

            if (labelled) {
                nextMode = "labelled";
                nextText = labelled.getAttribute("data-cursor-text") ?? "";
            } else if (external) {
                nextMode = "external";
                nextText = "↗";
            } else if (interactive) {
                nextMode = "interactive";
                nextText = "";
            }

            if (nextMode === currentMode && nextText === currentText) return;
            currentMode = nextMode;
            currentText = nextText;

            if (nextMode === "labelled") {
                label.textContent = nextText;
                gsap.to(ring, { scale: 2.6, opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
                gsap.to(label, { opacity: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" });
            } else if (nextMode === "external") {
                label.textContent = nextText;
                gsap.to(ring, { scale: 2.0, opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
                gsap.to(label, { opacity: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" });
            } else if (nextMode === "interactive") {
                label.textContent = "";
                gsap.to(ring, { scale: 1.8, opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
                gsap.to(label, { opacity: 0, duration: 0.15, ease: "power1.out", overwrite: "auto" });
            } else {
                label.textContent = "";
                gsap.to(ring, { scale: 1, opacity: 0.55, duration: 0.25, ease: "power2.out", overwrite: "auto" });
                gsap.to(label, { opacity: 0, duration: 0.15, ease: "power1.out", overwrite: "auto" });
            }
        };

        const onOver = (event: MouseEvent) => {
            updateCursorState(event.target as HTMLElement | null);
        };

        const onLeave = () => {
            gsap.to([dot, ring], { opacity: 0, duration: 0.2, ease: "power1.out", overwrite: "auto" });
        };
        const onEnter = () => {
            gsap.to([dot, ring], { opacity: 1, duration: 0.25, ease: "power1.out", overwrite: "auto" });
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseover", onOver, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeave);
        document.documentElement.addEventListener("mouseenter", onEnter);

        return () => {
            document.documentElement.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onOver);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            document.documentElement.removeEventListener("mouseenter", onEnter);
            gsap.killTweensOf([dot, ring, label]);
        };
    }, [capable]);

    if (!capable) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[300]"
            aria-hidden="true"
        >
            <div
                ref={dotRef}
                className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-foreground mix-blend-difference"
            />
            <div
                ref={ringRef}
                className="fixed left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-foreground opacity-55 mix-blend-difference"
            >
                <span
                    ref={labelRef}
                    className="whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-foreground opacity-0"
                />
            </div>
        </div>
    );
}