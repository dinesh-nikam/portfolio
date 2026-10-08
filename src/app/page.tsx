import { createMetadata } from "@/lib/metadata";
import { JsonLdScript, buildServicesSchema, buildLocalBusinessSchema } from "@/components/seo/json-ld";
import { NavigationBarV2 } from "@/components/navigation-bar-v2";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { HomeClientContent } from "@/components/home-client-content";

export const metadata = createMetadata({
  title: "Top Full Stack Developer & Web Services in Pune | Dinesh Nikam",
  description:
    "Top-ranked digital engineering and full stack web development brand in Pune, India. Dinesh Nikam architects high-performance Next.js web applications, bespoke UI/UX, WebGL 3D, and AI automation for global enterprises.",
});

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col w-full relative">
      {/* Structured Data: LocalBusiness / ProfessionalService (Pune #1 Brand) */}
      <JsonLdScript data={buildLocalBusinessSchema()} />
      {/* Structured Data: Services (ItemList of Service entities) */}
      <JsonLdScript data={buildServicesSchema()} />

      <NavigationBarV2 />

      {/* Sections wrapper for smooth scrolling and GSAP context */}
      <div id="smooth-wrapper" className="w-full flex flex-col items-center">
        <HeroSection />

        <AboutSection />

        {/* Narrative progression: the work IS the story — it now leads the
            page right after About, before capabilities and proof. The
            DevTicker and AboutGalleryReel that previously sat here repeated
            content the sections below already cover, and were commented out
            during the experience audit (kept for reference, not deleted). */}
        {/* <DevTicker /> */}
        {/* <AboutGalleryReel /> */}

        {/* Dynamically loaded sections rendered via client wrapper */}
        <HomeClientContent />
      </div>
    </main>
  );
}
