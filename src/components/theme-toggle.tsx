"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const mountedSubscribe = () => () => {};

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(mountedSubscribe, () => true, () => false);
    const isDark = mounted && resolvedTheme === "dark";
    const iconWrapRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const wrap = iconWrapRef.current;
        if (!wrap || !mounted) return;
        const tl = gsap.timeline();
        tl.fromTo(
            wrap,
            { rotate: isDark ? -90 : 90, opacity: 0.2, scale: 0.9 },
            { rotate: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
        );
        return () => {
            tl.kill();
        };
    }, [isDark, mounted]);

    const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label="Toggle color theme"
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors duration-300 hover:border-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
        >
            <span ref={iconWrapRef} className="inline-flex items-center justify-center">
                {isDark ? (
                    <Moon className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                    <Sun className="h-4 w-4" strokeWidth={1.5} />
                )}
            </span>
        </button>
    );
}