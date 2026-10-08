"use client";

/* ────────────────────────────────────────────────────────────────────
   Story scenes — the DOM half of the cinematic experience.

   One continuous page; the WebGL world sits fixed behind it and the
   chapter bounds here mirror the canvas intensity map (world-canvas).
   Reveals use framer-motion whileInView (repo convention) with generous
   durations; the avatar reacts through storyWorld progress instead of
   per-section props.
   ──────────────────────────────────────────────────────────────────── */

import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  STORY,
  EMERGENCE,
  CURIOSITY,
  BUILDER,
  CAPABILITY,
  STORY_CHAPTERS_DATA,
  PROOF,
  EXPERIENCE_CHAPTERS,
  HUMAN,
  VALUES,
  MAGIC,
  CONTACT,
  FINAL_FRAME,
} from "@/lib/story";
import { storyWorld } from "@/components/story/story-world-state";

/* ── Shared motion language ──────────────────────────────────────── */

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

const riseIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE_CINEMATIC, delay },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.4, ease: "easeOut", delay },
  }),
};

const maskUp: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    clipPath: "inset(0 0 -8% 0)",
    transition: { duration: 1.2, ease: EASE_CINEMATIC, delay },
  }),
};

const MASK_VIEWPORT = { once: true, margin: "-18% 0px -18% 0px" } as const;

/** Folio mark — a short rule and a small label, like a book margin. */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
      <span aria-hidden="true" className="h-px w-8 bg-border" />
      {children}
    </span>
  );
}

/** Drives storyWorld.progress from real scroll position. */
export function ProgressDriver() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      storyWorld.progress = Math.min(1, Math.max(0, window.scrollY / max));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}

/* ── Pointer feed (desktop only; the canvas reads it every frame) ── */

export function PointerDriver() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (event: PointerEvent) => {
      storyWorld.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      storyWorld.pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

/* ── Scene 01 · EMERGENCE ────────────────────────────────────────── */

export function SceneEmergence() {
  return (
    <section
      id="intro"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-6"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-5 text-center"
      >
        <motion.h1
          custom={0.2}
          variants={riseIn}
          className="font-display text-3xl font-medium tracking-[0.2em] text-foreground sm:text-4xl"
        >
          {EMERGENCE.intro[0]}
        </motion.h1>
        <motion.p
          custom={0.9}
          variants={riseIn}
          className="font-mono text-[11px] uppercase tracking-[0.45em] text-muted-foreground"
        >
          {EMERGENCE.intro[1]}
        </motion.p>
        <motion.p
          custom={2.0}
          variants={fadeIn}
          className="mt-6 max-w-md font-display text-lg italic leading-relaxed text-foreground/80 sm:text-xl"
        >
          &ldquo;{EMERGENCE.line}&rdquo;
        </motion.p>
        <motion.div
          custom={3.0}
          variants={fadeIn}
          className="mt-16 flex flex-col items-center gap-3 text-muted-foreground"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em]">
            SCROLL TO BEGIN
          </span>
          <span className="h-8 w-px animate-pulse bg-border" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Scene 02 · CURIOSITY ────────────────────────────────────────── */

export function SceneCuriosity() {
  return (
    <section
      id="curiosity"
      aria-label="Curiosity"
      className="relative w-full px-6 py-[22vh]"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-[24vh]">
        {CURIOSITY.moments.map((moment, index) => {
          const isBeat = index === CURIOSITY.moments.length - 1;
          return (
            <motion.blockquote
              key={moment.kicker}
              initial="hidden"
              whileInView="visible"
              viewport={MASK_VIEWPORT}
              className="grid grid-cols-12 gap-x-4"
            >
              <motion.span
                variants={fadeIn}
                className="col-span-2 pt-2 font-mono text-[11px] tracking-[0.3em] text-primary md:col-span-1"
              >
                {moment.kicker}
              </motion.span>
              <motion.p
                variants={riseIn}
                className={`col-span-10 font-display font-medium leading-snug tracking-tight text-foreground md:col-span-11 ${
                  isBeat
                    ? "text-5xl sm:text-6xl md:text-7xl"
                    : "text-3xl sm:text-4xl md:text-5xl"
                }`}
              >
                {moment.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </motion.p>
            </motion.blockquote>
          );
        })}
      </div>
    </section>
  );
}

/* ── Scene 03 · BUILDER (human → wireframe → network) ────────────── */

export function SceneBuilder() {
  return (
    <section
      id="build"
      aria-label="Becoming a builder"
      className="relative w-full px-6 py-[20vh]"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-[24vh]">
        {BUILDER.moments.map((moment) => (
          <motion.p
            key={moment.lines[0]}
            initial="hidden"
            whileInView="visible"
            viewport={MASK_VIEWPORT}
            variants={riseIn}
            className="max-w-2xl border-l-2 border-primary/60 pl-6 font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {moment.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        ))}

        {/* Technology annotations — subtle, never badges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={MASK_VIEWPORT}
          className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
          <motion.span variants={fadeIn} className="w-full text-center">
            <Kicker>{CAPABILITY.techNote}</Kicker>
          </motion.span>
          {CAPABILITY.tech.map((tech, index) => (
            <motion.span
              key={tech}
              custom={index * 0.06}
              variants={fadeIn}
              className="font-mono text-xs tracking-[0.2em] text-muted-foreground/80"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Scene 04 · CAPABILITY ("I BUILD") ───────────────────────────── */

export function SceneCapability() {
  return (
    <section
      id="capability"
      aria-label="What I build"
      className="relative w-full px-6 py-[20vh]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-[16vh]">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={MASK_VIEWPORT}
          variants={riseIn}
          className="text-center font-display text-6xl font-medium tracking-tight text-foreground sm:text-7xl md:text-8xl"
        >
          {CAPABILITY.heading}
        </motion.h2>
        {/* An index, not a ping-pong of headlines */}
        <div className="border-t border-border">
          {CAPABILITY.phrases.map((phrase, index) => (
            <motion.p
              key={phrase}
              initial="hidden"
              whileInView="visible"
              viewport={MASK_VIEWPORT}
              variants={riseIn}
              className="flex items-baseline gap-5 border-b border-border py-7 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              <span className="font-mono text-[11px] font-normal tracking-[0.2em] text-muted-foreground">
                0{index + 1}
              </span>
              {phrase}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Scene 05 · WORK (projects as memory chapters) ───────────────── */

function ChapterBlock({ chapter }: { chapter: (typeof STORY_CHAPTERS_DATA)[number] }) {
  return (
    <article className="flex flex-col gap-[14vh]">
      {/* CHAPTER 0X — title */}
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={MASK_VIEWPORT}
        className="flex flex-col gap-4"
      >
        <motion.span variants={fadeIn} className="font-mono text-[11px] tracking-[0.4em] text-primary">
          CHAPTER {chapter.index}
        </motion.span>
        <motion.h3
          variants={riseIn}
          className="font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          {chapter.title}
        </motion.h3>
        <motion.p variants={fadeIn} className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          {chapter.tagline}
        </motion.p>
      </motion.header>

      {/* Progressive reveal — problem, opportunity, design, build */}
      {chapter.steps.map((step) => (
        <motion.div
          key={step.label}
          initial="hidden"
          whileInView="visible"
          viewport={MASK_VIEWPORT}
          className="grid grid-cols-12 gap-x-4 border-t border-border pt-8"
        >
          <motion.p
            variants={fadeIn}
            className="col-span-12 font-display text-2xl italic text-foreground/90 sm:col-span-5 sm:text-3xl"
          >
            {step.label}
          </motion.p>
          <motion.p
            variants={riseIn}
            className="col-span-12 mt-3 max-w-xl leading-relaxed text-muted-foreground sm:col-span-7 sm:mt-0"
          >
            {step.text}
          </motion.p>
        </motion.div>
      ))}

      {/* The project, as a printed plate */}
      <motion.figure
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        variants={fadeIn}
        className="group relative border border-border bg-card p-2 shadow-[0_18px_60px_rgba(20,18,16,0.12)]"
        data-cursor-text="VIEW"
      >
        <div className="relative overflow-hidden">
          <Image
            src={chapter.image}
            alt={`${chapter.title} — interface preview`}
            width={1600}
            height={1000}
            className="h-auto w-full object-cover opacity-90 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          />
        </div>
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
            {chapter.title} · {chapter.year}
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-primary">
            {chapter.result}
          </span>
        </figcaption>
      </motion.figure>

      {/* Role + tech annotation + case study link */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={MASK_VIEWPORT}
        className="flex flex-col gap-4 border-t border-border pt-6"
      >
        <motion.p variants={fadeIn} className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {chapter.role}
        </motion.p>
        <motion.div variants={fadeIn} className="flex flex-wrap gap-x-5 gap-y-2">
          {chapter.tech.map((tech) => (
            <span key={tech} className="font-mono text-xs tracking-[0.15em] text-muted-foreground/70">
              {tech}
            </span>
          ))}
        </motion.div>
        <a
          href={chapter.liveUrl ?? "#"}
          target={chapter.liveUrl ? "_blank" : undefined}
          rel={chapter.liveUrl ? "noopener noreferrer" : undefined}
          className="group/link inline-flex w-max items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:text-primary"
        >
          VIEW CASE STUDY
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </motion.footer>
    </article>
  );
}

export function SceneWork() {
  return (
    <section id="work" aria-label="Things I've built" className="relative w-full px-6 py-[18vh]">
      <div className="mx-auto flex max-w-5xl flex-col gap-[24vh]">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={MASK_VIEWPORT}
          variants={riseIn}
          className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
        >
          THINGS I&apos;VE BUILT
        </motion.h2>
        {STORY_CHAPTERS_DATA.map((chapter) => (
          <ChapterBlock key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}

/* ── Scene 06 · PHILOSOPHY + MOMENT OF PROOF (ivory interlude) ───── */

export function ScenePhilosophy() {
  return (
    <section
      id="philosophy"
      aria-label="Philosophy and proof"
      className="relative w-full"
    >
      {/* Dark typography moment */}
      <div className="flex flex-col gap-[22vh] px-6 py-[24vh]">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={MASK_VIEWPORT}
          variants={maskUp}
          className="text-center font-display text-5xl font-medium leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          I DON&apos;T JUST WRITE CODE.
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={MASK_VIEWPORT}
          variants={maskUp}
          className="text-center font-display text-5xl font-medium leading-tight tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-primary">I DESIGN WHAT THE CODE</span>
          <br />
          <span className="text-primary">MAKES POSSIBLE.</span>
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={MASK_VIEWPORT}
          variants={fadeIn}
          className="mx-auto flex max-w-2xl flex-col gap-2 text-center"
        >
          <p className="font-display text-xl italic text-foreground/85 sm:text-2xl">
            Every interface has a feeling.
          </p>
          <p className="font-display text-xl italic text-foreground/85 sm:text-2xl">
            Every interaction tells a story.
          </p>
          <p className="font-display text-xl italic text-foreground/85 sm:text-2xl">
            Every detail has a reason.
          </p>
        </motion.div>
      </div>

      {/* MOMENT OF PROOF — ivory background flips the world */}
      <div className="relative w-full bg-[#f4f1ea] text-[#141210] transition-colors duration-700">
        <div className="mx-auto flex max-w-5xl flex-col gap-[16vh] px-6 py-[20vh]">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={MASK_VIEWPORT}
            variants={maskUp}
            className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            {PROOF.headline[0]}
            <br />
            {PROOF.headline[1]}
          </motion.h3>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={MASK_VIEWPORT}
            variants={maskUp}
            className="font-display text-5xl font-medium tracking-tight text-[#e4572e] sm:text-6xl md:text-7xl"
          >
            {PROOF.turn}
          </motion.p>

          {/* Evidence — verified metrics only */}
          <div className="grid grid-cols-1 gap-px border border-[#1412101f] bg-[#1412101f] sm:grid-cols-2">
            {PROOF.evidence.map((item, index) => (
              <motion.div
                key={item.metric}
                initial="hidden"
                whileInView="visible"
                viewport={MASK_VIEWPORT}
                custom={index * 0.08}
                variants={riseIn}
                className="flex flex-col gap-2 bg-[#f4f1ea] p-8"
              >
                <span className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                  {item.metric}
                </span>
                <span className="text-sm leading-relaxed text-[#6e675b]">{item.detail}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e4572e]">
                  {item.project}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Experience as chapters */}
          <div className="flex flex-col gap-12 border-t border-[#1412101f] pt-16">
            {EXPERIENCE_CHAPTERS.map((entry, index) => (
              <motion.div
                key={entry.year}
                initial="hidden"
                whileInView="visible"
                viewport={MASK_VIEWPORT}
                custom={index * 0.05}
                variants={riseIn}
                className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-baseline"
              >
                <span className="font-mono text-sm tracking-[0.3em] sm:col-span-2">
                  {entry.year}
                </span>
                <span className="font-display text-3xl font-medium tracking-tight sm:col-span-3">
                  {entry.word}
                </span>
                <div className="flex flex-col gap-1 sm:col-span-7">
                  <span className="font-medium">{entry.role} · {entry.place}</span>
                  <span className="text-sm leading-relaxed text-[#6e675b]">{entry.line}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Scene 07 · HUMAN + VALUES ───────────────────────────────────── */

export function SceneHuman() {
  return (
    <section
      id="about"
      aria-label="The human behind the work"
      className="relative w-full px-6 py-[26vh]"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-[24vh]">
        {HUMAN.lines.map((group, index) => (
          <motion.p
            key={group[0]}
            initial="hidden"
            whileInView="visible"
            viewport={MASK_VIEWPORT}
            variants={riseIn}
            className="text-center font-display text-3xl font-medium leading-snug tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            {group.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            {index === 1 && (
              <span className="mt-10 block font-display text-lg font-normal italic leading-relaxed text-muted-foreground sm:text-xl">
                {HUMAN.statement}
              </span>
            )}
          </motion.p>
        ))}

        {/* Values — numbered entries on hairlines, like a colophon */}
        <div className="border-t border-border">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial="hidden"
              whileInView="visible"
              viewport={MASK_VIEWPORT}
              className="grid grid-cols-12 gap-x-4 border-b border-border py-12 md:py-16"
            >
              <span className="col-span-2 pt-3 font-mono text-[11px] tracking-[0.3em] text-primary md:col-span-1">
                0{index + 1}
              </span>
              <motion.h3
                variants={riseIn}
                className="col-span-10 font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl md:col-span-11"
              >
                {value.title}
              </motion.h3>
              <motion.p
                variants={fadeIn}
                className="col-span-10 col-start-3 mt-4 max-w-xl font-display text-xl italic leading-relaxed text-muted-foreground sm:text-2xl md:col-span-11 md:col-start-2"
              >
                {value.line}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Scene 08 · MAGIC MOMENT + CONTACT + FINAL FRAME ─────────────── */

export function SceneFinale() {
  return (
    <>
      {/* The magic moment: everything disappears; only the avatar remains */}
      <section
        id="magic"
        aria-label="An invitation"
        className="relative flex min-h-[130svh] w-full items-center justify-center px-6"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={MASK_VIEWPORT}
          className="flex flex-col items-center gap-10 text-center"
        >
          <motion.h2
            variants={riseIn}
            className="font-display text-4xl font-medium leading-snug tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {MAGIC.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="font-display text-2xl italic text-primary sm:text-3xl"
          >
            {MAGIC.turn}
          </motion.p>
        </motion.div>
      </section>

      {/* Contact — almost a movie ending */}
      <section
        id="contact"
        aria-label="Contact"
        className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-24"
      >
        <div className="flex w-full max-w-5xl flex-col items-center gap-14 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={MASK_VIEWPORT}
            variants={riseIn}
            className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {CONTACT.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={MASK_VIEWPORT}
            variants={fadeIn}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-foreground">
              {STORY.name}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {STORY.role} · {STORY.location}
            </span>
          </motion.div>

          <motion.a
            initial="hidden"
            whileInView="visible"
            viewport={MASK_VIEWPORT}
            variants={riseIn}
            href={`mailto:${STORY.email}`}
            data-cursor-text="TALK"
            className="group inline-flex items-center gap-3 border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.35em] text-foreground transition-all duration-500 hover:border-primary hover:text-primary"
          >
            {CONTACT.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={MASK_VIEWPORT}
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
          >
            <a
              href={`mailto:${STORY.email}`}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              EMAIL
            </a>
            <a
              href={STORY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              LINKEDIN
            </a>
            <a
              href={STORY.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              GITHUB
            </a>
          </motion.div>
        </div>

        {/* Final frame — fades to almost nothing */}
        <motion.footer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={fadeIn}
          className="mt-32 flex flex-col items-center gap-6"
        >
          <span className="h-3 w-3 bg-primary" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-foreground">
            {FINAL_FRAME.name}
          </span>
          <span className="font-display text-lg italic text-muted-foreground">
            {FINAL_FRAME.signOff}
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/60">
            {STORY.year}
          </span>
        </motion.footer>
      </section>
    </>
  );
}
