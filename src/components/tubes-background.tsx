"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function TubesBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        // Disable on mobile or if not mounted/dark theme
        if (!mounted || resolvedTheme !== "dark" || !containerRef.current || isMobile) return;

        const container = containerRef.current;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let app: Record<string, any> | null = null;

        const loadEffect = async () => {
            try {
                // Ensure THREE is globally available for the CDN module
                const THREE = await import("three");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any).THREE = THREE;

                // @ts-expect-error: absolute imports from CDN are not typed
                const tubesModule = await import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js");
                const TubesCursor = tubesModule.default;

                if (containerRef.current) {
                    // Clear container to prevent duplicate canvases
                    containerRef.current.innerHTML = "";

                    app = TubesCursor(containerRef.current, {
                        tubes: {
                            count: 2,
                            colors: ["#f967fb", "#53bc28", "#6958d5"],
                            lights: {
                                intensity: 200,
                                colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
                            }
                        }
                    });
                }
            } catch (err) {
                console.error("Failed to load TubesCursor", err);
            }
        };

        loadEffect();

        const randomColors = (count: number) => {
            return new Array(count)
                .fill(0)
                .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
        };

        const handleClick = () => {
            if (app && app.tubes) {
                const colors = randomColors(3);
                const lightsColors = randomColors(4);
                app.tubes.setColors(colors);
                app.tubes.setLightsColors(lightsColors);
            }
        };

        document.body.addEventListener("click", handleClick);

        return () => {
            document.body.removeEventListener("click", handleClick);
            if (app && typeof app.destroy === "function") {
                app.destroy();
            }
            if (container) {
                container.innerHTML = "";
            }
        };
    }, [resolvedTheme, mounted, isMobile]);

    if (!mounted || resolvedTheme !== "dark" || isMobile) return null;

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="fixed inset-0 w-full h-full z-[-1] pointer-events-none opacity-40 mix-blend-screen"
            id="tubes-background-container"
        />
    );
}
