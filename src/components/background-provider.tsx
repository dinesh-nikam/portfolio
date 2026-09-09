"use client";

import { useEffect, useState, type ReactNode } from "react";
import TubesBackground from "./tubes-background";

/* Lazy SSR-safe gate for the fixed background layer — nothing renders on the
   server; the canvas mounts one frame after hydration so it never blocks
   first paint or LCP. */
export default function BackgroundProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col">
            {mounted ? <TubesBackground /> : null}
            <div className="relative z-[2]">{children}</div>
        </div>
    );
}