import dynamic from "next/dynamic";
import { NavigationBar } from "@/components/navigation-bar";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";

const ProjectsSection = dynamic(() => import("@/components/sections/projects").then(m => m.ProjectsSection));
const ServicesSection = dynamic(() => import("@/components/services/ServicesSection").then(m => m.ServicesSection));
const SkillsSection = dynamic(() => import("@/components/skills/SkillsSection").then(m => m.SkillsSection));
const ExperienceSection = dynamic(() => import("@/components/sections/experience").then(m => m.ExperienceSection));
const ContactSection = dynamic(() => import("@/components/sections/contact").then(m => m.ContactSection));

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col w-full relative">
      <NavigationBar />

      {/* Sections wrapper for smooth scrolling and GSAP context */}
      <div id="smooth-wrapper" className="w-full flex flex-col items-center">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ServicesSection />
        <ContactSection />
      </div>
    </main>
  );
}
