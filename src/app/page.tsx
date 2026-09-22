import { createMetadata } from "@/lib/metadata";
import { JsonLdScript, buildServicesSchema, buildLocalBusinessSchema } from "@/components/seo/json-ld";
import { NavigationBar } from "@/components/navigation-bar";
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
    <main className="min-h-screen bg-background text-foreground flex flex-col w-full relative">
      {/* Structured Data: LocalBusiness / ProfessionalService (Pune #1 Brand) */}
      <JsonLdScript data={buildLocalBusinessSchema()} />
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
