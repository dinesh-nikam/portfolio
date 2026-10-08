import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { NavigationBarV2 } from "@/components/navigation-bar-v2";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = createMetadata({
  title: "Resume",
  description:
    "Professional experience, skills, and achievements of Dinesh Nikam — Full Stack Developer specializing in React, Next.js, AWS, and cloud architecture.",
});

export default function ResumePage() {
    return (
        <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col w-full relative pt-24">
            <NavigationBarV2 />
            <div
                className="w-full flex flex-col items-center"
            >
                {/* Reusing the ExperienceSection which already contains hero, timeline, skills, etc. */}
                <ExperienceSection />

                {/* Contact section at the bottom for next steps */}
                <div className="w-full max-w-6xl mx-auto h-[1px] bg-border/50 my-12" />
                <ContactSection />
            </div>
        </main>
    );
}