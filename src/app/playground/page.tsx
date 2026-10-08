import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import JourneyStamps from "@/components/playground/journey-stamps";
import PuneWindow from "@/components/playground/pune-window";

/* ────────────────────────────────────────────────────────────────────
   /playground — "THE LAB"

   Styled as a printed catalog of working instruments: ivory paper,
   ink hairlines, vermilion plate numbers. Same design language as the
   rest of the site — no glass, no grids, no glow.
   ──────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = createMetadata({
  title: "The Lab — Working Instruments",
  description:
    "Two working instruments from Dinesh Nikam's desk: journey stamps and a window over Pune that keeps its own hours. Built with GSAP on paper and ink.",
});

function Plate({
  num,
  title,
  note,
  children,
}: {
  num: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <span className="shrink-0 font-mono text-[11px] tracking-[0.3em] text-primary">
          PLATE {num}
        </span>
      </div>
      <p className="mb-12 max-w-md text-sm leading-relaxed text-muted-foreground">
        {note}
      </p>
      {children}
    </section>
  );
}

export default function PlaygroundPage() {
  return (
    <main className="noise-overlay relative min-h-dvh w-full bg-background text-foreground">
      {/* Header — hairline, ink, no blur */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background px-6 py-4 md:px-10">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-foreground"
          data-cursor-text="EXIT"
        >
          ← DINESH NIKAM
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          THE LAB
        </span>
      </header>

      <div className="mx-auto max-w-4xl px-6">
        {/* Front matter */}
        <section className="flex flex-col gap-6 pb-16 pt-20 md:pb-20 md:pt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Working instruments · not case studies
          </p>
          <h1 className="font-display text-6xl font-medium leading-[0.95] tracking-tight text-foreground sm:text-7xl">
            The Lab<span className="text-primary">.</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            The machines I keep on the desk. Built the same way I build
            everything else — start with a question, keep the parts visible.
          </p>
        </section>

        <Plate
          num="I"
          title="The journey, as stamps"
          note="Four chapters of the story, inked like passport stamps. Open one; reshuffle the desk when it feels too tidy."
        >
          <JourneyStamps />
        </Plate>

        <Plate
          num="II"
          title="A window over Pune"
          note="Drag inside the frame. The city keeps its own hours — noon to midnight and back."
        >
          <PuneWindow />
        </Plate>

        {/* Colophon */}
        <footer className="flex items-center justify-between border-t border-border py-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>© 2026 Dinesh Nikam</span>
          <span className="font-display text-base normal-case italic tracking-normal text-foreground">
            Still curious.
          </span>
        </footer>
      </div>
    </main>
  );
}
