"use client";

/* ────────────────────────────────────────────────────────────────────
   Story chrome: minimal floating navigation + film-timeline progress.

   The brief forbids a conventional nav bar. Instead: the name in the
   top corner, a "01 / 07 · CHAPTER" indicator that updates as the
   visitor scrolls, and a thin vertical timeline that fills like a
   film's runtime. A back link exits to the classic home.
   ──────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  STORY,
  STORY_CHAPTERS,
  chapterForProgress,
} from "@/lib/story";
import { storyWorld } from "@/components/story/story-world-state";

export default function StoryChrome() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const timelineFillRef = useRef<HTMLDivElement | null>(null);

  // Mirror storyWorld.progress into React state at a throttled cadence —
  // cheap enough to re-render only when the chapter actually changes.
  useEffect(() => {
    let raf = 0;
    let lastChapter = -1;
    let lastPercent = -1;
    const tick = () => {
      const p = storyWorld.progress;
      const chapter = STORY_CHAPTERS.indexOf(
        chapterForProgress(p) as (typeof STORY_CHAPTERS)[number]
      );
      const percent = Math.round(p * 100);
      if (chapter !== lastChapter) {
        lastChapter = chapter;
        setChapterIndex(chapter);
      }
      if (percent !== lastPercent) {
        lastPercent = percent;
        if (timelineFillRef.current) {
          timelineFillRef.current.style.transform = `scaleY(${p})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* Floating header — name, chapter, sound, exit */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.35em] text-foreground/70 transition-colors hover:text-foreground"
          data-cursor-text="EXIT"
        >
          {STORY.name}
        </Link>
        <div className="pointer-events-auto flex items-center gap-5">
          <span className="font-mono text-[11px] tabular-nums tracking-[0.25em] text-muted-foreground">
            {String(chapterIndex + 1).padStart(2, "0")} / {String(STORY_CHAPTERS.length).padStart(2, "0")}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80 sm:inline">
            {STORY_CHAPTERS[chapterIndex]}
          </span>
          <SoundToggle />
        </div>
      </header>

      {/* Film-timeline progress — right edge, fills downward */}
      <div
        className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-56 w-px -translate-y-1/2 bg-border md:block"
        aria-hidden="true"
      >
        <div
          ref={timelineFillRef}
          className="h-full w-full origin-top scale-y-0 bg-primary"
        />
      </div>

      {/* Live region for screen readers */}
      <span className="sr-only" role="status">
        Chapter {chapterIndex + 1} of {STORY_CHAPTERS.length}: {STORY_CHAPTERS[chapterIndex]}
      </span>
    </>
  );
}

/* ── Sound toggle (SOUND ◌) ──────────────────────────────────────── */

import { enableSound, disableSound, disposeSound } from "@/components/story/story-audio";

const mountedSubscribe = () => () => {};

function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  // Client-only gate without setState-in-effect (repo lint rule).
  const mounted = useSyncExternalStore(
    mountedSubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    return () => disposeSound();
  }, []);

  if (!mounted) {
    return (
      <span className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
        SOUND ◌
      </span>
   );
  }

  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      onClick={() => {
        if (enabled) {
          disableSound();
          setEnabled(false);
        } else {
          void enableSound().then(() => setEnabled(true));
        }
      }}
      className={`font-mono text-[11px] tracking-[0.25em] transition-colors ${
        enabled ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {enabled ? "SOUND ●" : "SOUND ◌"}
    </button>
  );
}
