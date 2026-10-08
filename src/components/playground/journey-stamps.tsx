"use client";

/* ────────────────────────────────────────────────────────────────────
   THE LAB · PLATE I — Journey Stamps

   Four chapters of Dinesh's journey (lib/story.ts), inked like
   passport stamps on paper — dashed inner frame, vermilion year,
   Bodoni word, soft paper shadow. No glass, no glow. GSAP drives the
   staggered entrance, the scatter shuffle and the card reveal.
   Reduced motion: stamps are simply placed, tweens snap.
   ──────────────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EXPERIENCE_CHAPTERS } from "@/lib/story";
import { useCapable } from "@/hooks/use-capable";

/* Resting desk positions (percent) */
const RESTING = [
  { x: 27, y: 34 },
  { x: 57, y: 26 },
  { x: 37, y: 66 },
  { x: 67, y: 58 },
];

export default function JourneyStamps() {
  const { noReducedMotion } = useCapable();
  const stampRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  /* Center-anchored positioning handled by GSAP so it can co-exist
     with its own rotate/scale transforms without Tailwind conflicts. */
  useLayoutEffect(() => {
    const els = stampRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!els.length) return;
    gsap.set(els, { xPercent: -50, yPercent: -50 });

    if (!noReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { scale: 0, opacity: 0, y: 26 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "back.out(1.8)",
          stagger: 0.12,
          delay: 0.25,
        }
      );
    });
    return () => ctx.revert();
  }, [noReducedMotion]);

  /* Shuffle — clustered scatter around the desk center. */
  const scatter = useCallback(() => {
    stampRefs.current.forEach((el, i) => {
      if (!el) return;
      const angle = Math.random() * Math.PI * 2;
      const spreadX = 5 + Math.random() * 11;
      const spreadY = 7 + Math.random() * 15;
      gsap.to(el, {
        left: `${Math.round(48 + Math.cos(angle) * spreadX)}%`,
        top: `${Math.round(48 + Math.sin(angle) * spreadY)}%`,
        rotate: Math.round(-40 + Math.random() * 80),
        duration: noReducedMotion ? 0 : 0.9,
        ease: "power3.inOut",
        delay: noReducedMotion ? 0 : i * 0.05,
      });
    });
  }, [noReducedMotion]);

  /* Detail card reveal */
  useEffect(() => {
    if (active == null || !noReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power1.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { y: 36, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [active, noReducedMotion]);

  /* Escape closes the card */
  useEffect(() => {
    if (active == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const chapter = active != null ? EXPERIENCE_CHAPTERS[active] : null;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* The desk */}
      <div
        className="relative h-[400px] w-full max-w-3xl md:h-[480px]"
        aria-label="Journey stamps"
      >
        {EXPERIENCE_CHAPTERS.map((entry, i) => (
          <button
            key={entry.year}
            ref={(el) => {
              stampRefs.current[i] = el;
            }}
            type="button"
            onClick={() => setActive(i)}
            data-cursor-text="VIEW"
            aria-haspopup="dialog"
            aria-label={`Open stamp: ${entry.word}, ${entry.year}`}
            className="group absolute cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#e4572e]"
            style={{ left: `${RESTING[i].x}%`, top: `${RESTING[i].y}%` }}
          >
            {/* Paper stamp — ink frame, dashed inner border */}
            <div className="relative rounded-[4px] border border-foreground/30 bg-card px-4 py-5 text-center shadow-[0_10px_28px_rgba(20,18,16,0.16)] transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-1 group-focus-visible:-translate-y-1">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-1.5 rounded-[2px] border border-dashed border-foreground/25"
              />
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-primary">
                {entry.year}
              </span>
              <h3 className="mt-1 font-display text-2xl tracking-wide text-foreground">
                {entry.word}
              </h3>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                {entry.place}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Shuffle control */}
      <button
        type="button"
        onClick={scatter}
        data-cursor-text="SHUFFLE"
        className="rounded-[3px] border border-border px-6 py-2.5 font-mono text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        RESHUFFLE THE DESK
      </button>

      {/* Detail card — an index card, not glass */}
      {chapter && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Chapter ${chapter.year}`}
        >
          <div
            ref={overlayRef}
            onClick={() => setActive(null)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div
            ref={cardRef}
            className="relative w-full max-w-md rounded-[4px] border border-border bg-card p-8 shadow-[0_30px_80px_rgba(20,18,16,0.35)]"
          >
            <span className="font-mono text-[11px] font-bold tracking-[0.35em] text-primary">
              {chapter.year}
            </span>
            <h3 className="mt-2 font-display text-4xl tracking-tight text-foreground">
              {chapter.word}
            </h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {chapter.role}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
              {chapter.place}
            </p>
            <p className="mt-5 border-t border-border pt-5 leading-relaxed text-foreground/80">
              {chapter.line}
            </p>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="mt-7 rounded-[3px] border border-border px-5 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
