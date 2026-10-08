import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import WorldCanvas from "@/components/story/world-canvas";
import StoryChrome from "@/components/story/story-chrome";
import {
  SceneEmergence,
  SceneCuriosity,
  SceneBuilder,
  SceneCapability,
  SceneWork,
  ScenePhilosophy,
  SceneHuman,
  SceneFinale,
  ProgressDriver,
  PointerDriver,
} from "@/components/story/story-scenes";

/* ────────────────────────────────────────────────────────────────────
   /story — "THE MAKER BEHIND THE SCREEN"

   One continuous cinematic page. The fixed WebGL world (WorldCanvas)
   sits behind every scene; the story text scrolls above it. Scene
   order mirrors the emotional journey: person → curiosity → code →
   creation → human → invitation.
   ──────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = createMetadata({
  title: "The Maker Behind the Screen",
  description:
    "A cinematic story: how Dinesh Nikam's curiosity became engineering, and engineering became experiences people actually use. Full stack developer in Pune, India.",
});

export default function StoryPage() {
  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <WorldCanvas />
      <StoryChrome />
      <ProgressDriver />
      <PointerDriver />
      <div className="relative z-10">
        <SceneEmergence />
        <SceneCuriosity />
        <SceneBuilder />
        <SceneCapability />
        <SceneWork />
        <ScenePhilosophy />
        <SceneHuman />
        <SceneFinale />
      </div>
    </main>
  );
}
