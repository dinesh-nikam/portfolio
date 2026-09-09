"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCapable } from "@/hooks/use-capable";
import { useSignalTokens } from "@/lib/signal-tokens";

/* Ink ribbon cursor — a deterministic 2D canvas stroke that trails the pointer,
   driven by gsap.ticker. A tapered vermilion ribbon follows the cursor and fast
   flicks cast small ink splatters. The effect stops itself when the pointer
   goes idle and never blocks interaction (pointer-events-none). */

const MAX_POINTS = 22;

interface Drop {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    max: number;
    size: number;
    color: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const value = hex.replace("#", "");
    const full =
        value.length === 3
            ? value
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : value;
    return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
    };
}

export default function VfxCursor() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const tokens = useSignalTokens();
    const tokensRef = useRef(tokens);

    useEffect(() => {
        tokensRef.current = tokens;
    }, [tokens]);
    const { capable } = useCapable();

    useEffect(() => {
        if (!capable) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let running = false;
        let width = 0;
        let height = 0;
        let dpr = 1;
        let lastMove = 0;
        let speed = 0;
        let headWidth = 8;

        const trail: { x: number; y: number }[] = [];
        const drops: Drop[] = [];

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const spawnDrops = (x: number, y: number, magnitude: number) => {
            const primary = hexToRgb(tokensRef.current.primary);
            const foreground = hexToRgb(tokensRef.current.foreground);
            const count = Math.min(3, Math.floor(magnitude / 16));
            for (let i = 0; i < count; i += 1) {
                const angle = Math.random() * Math.PI * 2;
                const velocity = (0.4 + Math.random() * 0.7) * (magnitude / 30);
                const usePrimary = Math.random() > 0.35;
                const rgb = usePrimary ? primary : foreground;
                drops.push({
                    x,
                    y,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity - 0.35,
                    life: 0,
                    max: 20 + Math.random() * 14,
                    size: 1.1 + Math.random() * 1.3,
                    color: `rgba(${rgb.r},${rgb.g},${rgb.b},`,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            const primary = hexToRgb(tokensRef.current.primary);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            if (trail.length >= 2) {
                const n = trail.length;
                for (let i = 1; i < n; i += 1) {
                    const a = trail[i - 1];
                    const b = trail[i];
                    const t = i / n;
                    const fade = 1 - t;
                    ctx.strokeStyle = `rgba(${primary.r},${primary.g},${primary.b},${(0.16 * fade).toFixed(3)})`;
                    ctx.lineWidth = Math.max(1, headWidth * fade);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
                const head = trail[n - 1];
                ctx.fillStyle = `rgba(${primary.r},${primary.g},${primary.b},0.45)`;
                ctx.beginPath();
                ctx.arc(head.x, head.y, Math.max(1.5, headWidth * 0.4), 0, Math.PI * 2);
                ctx.fill();
            }

            for (let i = drops.length - 1; i >= 0; i -= 1) {
                const drop = drops[i];
                drop.life += 1;
                drop.x += drop.vx;
                drop.y += drop.vy;
                drop.vy += 0.045;
                drop.vx *= 0.97;
                drop.size *= 0.975;
                if (drop.life > drop.max || drop.size < 0.35) {
                    drops.splice(i, 1);
                    continue;
                }
                const alpha = 0.42 * (1 - drop.life / drop.max);
                ctx.fillStyle = `${drop.color}${alpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const tick = () => {
            const now = performance.now();
            if (typeof document !== "undefined" && document.hidden) return;
            if (now - lastMove > 600) {
                gsap.ticker.remove(tick);
                running = false;
                trail.length = 0;
                drops.length = 0;
                ctx.clearRect(0, 0, width, height);
                return;
            }
            if (now - lastMove > 140 && trail.length > 0) {
                trail.shift();
            }
            draw();
        };

        const onPointerMove = (event: PointerEvent) => {
            const x = event.clientX;
            const y = event.clientY;
            const last = trail[trail.length - 1];
            if (last) {
                const dist = Math.hypot(x - last.x, y - last.y);
                speed = speed * 0.7 + Math.min(dist, 40) * 0.3;
                headWidth = Math.min(20, 6 + speed * 0.5);
                if (speed > 24) spawnDrops(x, y, speed);
            }
            trail.push({ x, y });
            if (trail.length > MAX_POINTS) trail.shift();
            lastMove = performance.now();
            if (!running) {
                gsap.ticker.add(tick);
                running = true;
            }
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", onPointerMove, { passive: true });

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onPointerMove);
            if (running) gsap.ticker.remove(tick);
            trail.length = 0;
            drops.length = 0;
        };
    }, [capable]);

    if (!capable) return null;

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[200]"
        />
    );
}