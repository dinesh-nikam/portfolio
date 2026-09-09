import { createMetadata } from "@/lib/metadata";
import { JsonLdScript, buildServicesSchema } from "@/components/seo/json-ld";
import { NavigationBar } from "@/components/navigation-bar";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { HomeClientContent } from "@/components/home-client-content";

export const metadata = createMetadata({
  title: "Full Stack Developer | Dinesh Nikam",
  description:
    "Portfolio of Dinesh Nikam — full stack engineer crafting calm, precise, editorial-grade digital products at the intersection of code, motion, and design.",
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col w-full relative">
      {/* Structured Data: Services (ItemList of Service entities) */}
      <JsonLdScript data={buildServicesSchema()} />

      <NavigationBar />

      {/* Sections wrapper for smooth scrolling and GSAP context */}
      <div id="smooth-wrapper" className="w-full flex flex-col items-center">
        <HeroSection />

        <AboutSection />

        {/* Dynamically loaded sections rendered via client wrapper */}
        <HomeClientContent />
      </div>
    </main>
  );
}
