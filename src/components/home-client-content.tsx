"use client";

import dynamic from "next/dynamic";

/* Existing sections loaded dynamically */
const ProjectsSection = dynamic(() =>
  import("@/components/sections/projects").then((m) => m.ProjectsSection)
);
const ServicesSection = dynamic(() =>
  import("@/components/services/ServicesSection").then((m) => m.ServicesSection)
);
const SkillsSection = dynamic(() =>
  import("@/components/skills/SkillsSection").then((m) => m.SkillsSection)
);
const ExperienceSection = dynamic(() =>
  import("@/components/sections/experience").then((m) => m.ExperienceSection)
);
const CertificationsSection = dynamic(() =>
  import("@/components/sections/certifications").then((m) => m.CertificationsSection)
);
const ContactSection = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.ContactSection)
);

/* Five premium sections loaded dynamically (client-only via ssr: false) */
const StackRadar = dynamic(
  () => import("@/components/sections/stack-radar").then((m) => m.StackRadar),
  { ssr: false }
);
const JourneyTimeline = dynamic(
  () => import("@/components/sections/journey-timeline").then((m) => m.JourneyTimeline),
  { ssr: false }
);
const CurrentlyExploring = dynamic(
  () =>
    import("@/components/sections/currently-exploring").then(
      (m) => m.CurrentlyExploring
    ),
  { ssr: false }
);
const GithubActivity = dynamic(
  () => import("@/components/sections/github-activity").then((m) => m.GithubActivity),
  { ssr: false }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/testimonials").then((m) => m.TestimonialsSection),
  { ssr: false }
);

export function HomeClientContent() {
  return (
    <>
      <SkillsSection />
      {/* Radar analysis visually expanding on Skills Globe */}
      <StackRadar />

      <ExperienceSection />
      {/* Chronological career roadmap below Experience cards */}
      <JourneyTimeline />

      <CertificationsSection />

      <ProjectsSection />
      {/* Exploring future tech and real-time activity dashboards after works */}
      <CurrentlyExploring />
      <GithubActivity />

      <ServicesSection />
      {/* Social peer proof right before contacting Dinesh */}
      <TestimonialsSection />

      <ContactSection />
    </>
  );
}
