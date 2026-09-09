"use client";

import { motion } from "framer-motion";
import { ExperienceHero } from "./ExperienceHero";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SkillsEvolution } from "./SkillsEvolution";
import { AchievementsSection } from "./AchievementsSection";
import { EducationSection } from "./EducationSection";
import { Download } from "lucide-react";
import { StickyDownload } from "@/components/ui/sticky-download";

export function ExperienceSection() {
    return (
        <section id="experience" className="w-full bg-background relative overflow-hidden">
            <div className="relative z-10 w-full flex flex-col items-center">
                <ExperienceHero />

                <AchievementsSection />

                <div className="w-full max-w-6xl mx-auto h-[1px] bg-border/50 my-12" />

                <ExperienceTimeline />

                <div className="w-full max-w-6xl mx-auto h-[1px] bg-border/50 my-12" />

                <SkillsEvolution />

                <div className="w-full max-w-6xl mx-auto h-[1px] bg-border/50 my-12" />

                <EducationSection />

                {/* Download CTA */}
                <div className="w-full max-w-6xl mx-auto py-24 px-6 flex flex-col items-center justify-center">
                    <motion.a
                        href="https://drive.google.com/file/d/15sOTRbV-1NFzoL3Ko_Bh5iKd43L1yuyF/view?usp=drivesdk"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 border border-primary rounded-full text-primary-foreground font-medium transition-all duration-300"
                    >
                        <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
                        <span className="relative z-10">Download Full Resume</span>
                    </motion.a>
                </div>

                {/* Sticky/Floating download badge */}
                <StickyDownload />
            </div>
        </section>
    );
}