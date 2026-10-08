"use client";

/* ────────────────────────────────────────────────────────────────────
   THE LAB · EXHIBIT 02 — "Pune, Day ↔ Night"

   An original interactive: an arched glass window over a CSS/SVG
   skyline of Pune. Drag the horizontal time-cursor (or click/tap the
   scene) to slide between noon and midnight. GSAP tweens a single
   progress value; React state derives everything from it. All CSS/
   SVG — no video, no image assets.

   Reduced motion: cursor still works (it is the interface) but snaps
   instantly instead of tweening.
   ──────────────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCapable } from "@/hooks/use-capable";

/** Day↔night keyframes: [day sky, night sky] gradient stops. */
const SKY_DAY = ["#7fb4e8", "#a9cff0", "#e8d9b8", "#f2efe4"];
const SKY_NIGHT = ["#0a0c18", "#181a34", "#2a2c54", "#3a3e6e"];

const lerpHex = (a: string, b: string, t: number) => {
  const pa = a.match(/\w\w/g)?.map((h) => parseInt(h, 16)) ?? [0, 0, 0];
  const pb = b.match(/\w\w/g)?.map((h) => parseInt(h, 16)) ?? [0, 0, 0];
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};

export default function PuneWindow() {
  const { noReducedMotion } = useCapable();
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  // 0 = midnight, 1 = noon. Ref mirrors state so listeners stay stable.
  const timeRef = useRef(1);
  const [time, setTimeState] = useState(1);

  const applyTime = useCallback((v: number) => {
    timeRef.current = v;
    setTimeState(v);
  }, []);

  /* Map a clientX to 0..1 across the scene, then tween the value. */
  const setFromClientX = useCallback(
    (clientX: number, animate = true) => {
      const scene = sceneRef.current;
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const raw = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const target = Math.round(raw * 100) / 100;
      if (animate && noReducedMotion) {
        gsap.to(
          { v: timeRef.current },
          {
            v: target,
            duration: 0.6,
            ease: "power3.out",
            onUpdate() {
              applyTime(this.targets()[0].v);
            },
          }
        );
      } else {
        applyTime(target);
      }
    },
    [noReducedMotion, applyTime]
  );

  /* Pointer drag on the whole scene */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const onDown = (e: PointerEvent) => {
      draggingRef.current = true;
      scene.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX, false);
    };
    const onMove = (e: PointerEvent) => {
      if (draggingRef.current) setFromClientX(e.clientX, false);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    scene.addEventListener("pointerdown", onDown);
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerup", onUp);
    scene.addEventListener("pointercancel", onUp);
    return () => {
      scene.removeEventListener("pointerdown", onDown);
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerup", onUp);
      scene.removeEventListener("pointercancel", onUp);
    };
  }, [setFromClientX]);

  const nudge = useCallback(
    (delta: number) => {
      const next = Math.min(1, Math.max(0, Math.round((timeRef.current + delta) * 100) / 100));
      applyTime(next);
    },
    [applyTime]
  );

  /* Derived scene values */
  const night = 1 - time; // 0 = noon … 1 = midnight
  const skyStops = SKY_DAY.map((dayStop, i) => lerpHex(dayStop, SKY_NIGHT[i], night));
  const sunY = 26 + (1 - time) * 55; // sun sinks as time → night
  const moonY = 20 + night * 14; // moon rises as night falls
  const moonOpacity = Math.max(0, night * 1.6 - 0.35);
  const starOpacity = Math.max(0, night * 1.8 - 0.55);
  const windowGlow = Math.max(0, night * 1.7 - 0.45);

  /* Toggle targets for the quick day/night buttons */
  const goTo = useCallback(
    (target: number) => {
      if (!noReducedMotion) {
        applyTime(target);
        return;
      }
      gsap.to(
        { v: timeRef.current },
        {
          v: target,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate() {
            applyTime(this.targets()[0].v);
          },
        }
      );
    },
    [noReducedMotion, applyTime]
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* The scene — an arched glass window */}
      <div
        ref={sceneRef}
        className="relative h-[380px] w-full max-w-3xl touch-none overflow-hidden rounded-t-[170px] rounded-b-2xl border border-foreground/20 shadow-[0_18px_60px_rgba(20,18,16,0.2)] md:h-[440px]"
        role="slider"
        aria-label="Time of day over Pune"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(time * 100)}
        aria-valuetext={time > 0.5 ? "Day" : "Night"}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            nudge(0.05);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            nudge(-0.05);
          }
        }}
        data-cursor-text="DRAG"
      >
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${skyStops[0]} 0%, ${skyStops[1]} 45%, ${skyStops[2]} 78%, ${skyStops[3]} 100%)`,
          }}
        />

        {/* Stars */}
        <div className="absolute inset-0" style={{ opacity: starOpacity }}>
          {[
            [12, 18], [24, 9], [38, 22], [55, 12], [68, 25], [82, 15], [90, 30], [45, 6], [18, 34], [74, 40],
          ].map(([left, top], i) => (
            <span
              key={i}
              className="absolute h-px w-px rounded-full bg-white"
              style={{ left: `${left}%`, top: `${top}%`, boxShadow: "0 0 4px 1px rgba(255,255,255,0.8)" }}
            />
          ))}
        </div>

        {/* Sun */}
        <div
          className="absolute h-12 w-12 rounded-full"
          style={{
            left: "50%",
            top: `${sunY}%`,
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, #ffd98a 0%, #f7b34c 60%, transparent 72%)",
            opacity: Math.max(0, time * 1.4 - 0.25),
          }}
        />

        {/* Moon */}
        <div
          className="absolute h-9 w-9 rounded-full"
          style={{
            left: "58%",
            top: `${moonY}%`,
            background: "radial-gradient(circle at 38% 36%, #f4f4f8 0%, #c9cede 58%, transparent 70%)",
            opacity: moonOpacity,
          }}
        />

        {/* Skyline silhouettes */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[46%] w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,100 L0,70 L12,70 L12,54 L22,54 L22,70 L40,70 L40,42 L52,42 L52,70 L68,70 L68,58 L80,58 L80,70 L100,70 L100,100 Z" fill="rgba(30,28,40,0.55)" />
          <path d="M0,100 L0,62 L8,62 L8,44 L16,44 L16,62 L30,62 L30,36 L38,36 L38,62 L52,62 L52,50 L64,50 L64,62 L78,62 L78,30 L86,30 L86,62 L100,62 L100,100 Z" fill="rgba(16,15,22,0.92)" />
        </svg>

        {/* Building window lights — fade in at night */}
        <div className="absolute inset-x-0 bottom-0 h-[46%]" aria-hidden="true">
          {[
            [34.5, 22], [36.5, 30], [35.5, 46], [44, 48], [46, 56], [79.5, 36], [81, 44], [82.5, 52], [13, 58], [15, 64], [70, 62], [72, 68],
          ].map(([left, top], i) => (
            <span
              key={i}
              className="absolute h-1 w-1.5 rounded-[1px]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                background: "#ffce7a",
                opacity: windowGlow,
                boxShadow: `0 0 6px 1px rgba(255,206,122,${windowGlow * 0.7})`,
              }}
            />
          ))}
        </div>

        {/* Paper window: sheen, time cursor, ink frame */}
        <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[170px] rounded-b-2xl bg-gradient-to-br from-white/25 via-transparent to-white/10" />
        <div
          ref={cursorRef}
          className="absolute inset-y-0 z-20 w-px bg-foreground/60"
          style={{ left: `${time * 100}%` }}
        />
        <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[170px] rounded-b-2xl border border-foreground/25" />
        <div className="pointer-events-none absolute inset-x-5 inset-y-4 z-10 rounded-t-[150px] rounded-b-xl border border-foreground/15" />
      </div>

      {/* Caption + controls */}
      <div className="flex flex-col items-center gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Drag anywhere in the window · Pune, 18.52° N
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(1)}
            data-cursor-text="DAY"
            className="rounded-[3px] border border-border px-5 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            NOON
          </button>
          <button
            type="button"
            onClick={() => goTo(0)}
            data-cursor-text="NIGHT"
            className="rounded-[3px] border border-border px-5 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            MIDNIGHT
          </button>
        </div>
      </div>
    </div>
  );
}
