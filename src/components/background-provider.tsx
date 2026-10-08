"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import TubesBackground from "./tubes-background";

/* Lazy SSR-safe gate for the fixed background layer — nothing renders on the
   server; the canvas mounts one frame after hydration so it never blocks
   first paint or LCP.
   [story] The /story route renders its own persistent WebGL world
   (src/components/story/world-canvas.tsx). TubesBackground sleeps there so
   the two fixed layers never fight for the GPU. It also sleeps on any route
   not explicitly allow-listed, so future pages (like /story) get a quiet
   background by default. */
/* The "Ink Currents" tube field was removed in the experience audit: four
   floating ribbons plus specks behind every section is decoration that
   competes with content, and a second always-on render loop for no narrative
   gain. The component stays in the tree for a future one-page decision —
   flip TUBES_ROUTES to re-enable. */
const TUBES_ROUTES = new Set<string>([]);

export default function BackgroundProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const showTubes = mounted && TUBES_ROUTES.has(pathname);

    return (
        <div className="relative flex min-h-screen flex-col">
            {showTubes ? <TubesBackground /> : null}
            <div className="relative flex-1">{children}</div>
        </div>
    );
}
