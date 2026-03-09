import { Metadata } from "next";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { NavigationBar } from "@/components/navigation-bar";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
    title: "Resume – Developer Portfolio",
    description: "Professional experience, skills, and achievements.",
};

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col w-full relative pt-24">
            <NavigationBar />
            <div
                className="w-full flex flex-col items-center"
            >
                {/* Reusing the ExperienceSection which already contains hero, timeline, skills, etc. */}
                <ExperienceSection />

                {/* Optional: Add contact section at the bottom to give users a clear next step */}
                <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />
                <ContactSection />
            </div>
        </main>
    );
}
