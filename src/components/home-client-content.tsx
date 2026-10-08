"use client";

import dynamic from "next/dynamic";

/* Dynamically loaded sections. During the experience audit the page ran
   fourteen sections in sequence and repeated the same ideas (three skill
   showcases, two career timelines, two project grids, a fabricated GitHub
   heatmap, invented Before/After metrics, and unverified testimonials).
   Duplicates are commented out below — not deleted — so they can be
   restored deliberately. */
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

/* Premium hybrid sections loaded dynamically (client-only via ssr: false) */
const TechStackShowcase = dynamic(
  () =>
    import("@/components/sections/tech-stack-showcase").then(
      (m) => m.TechStackShowcase
    ),
  { ssr: false }
);
const BeforeAfterSection = dynamic(
  () =>
    import("@/components/sections/before-after").then(
      (m) => m.BeforeAfterSection
    ),
  { ssr: false }
);
const ProcessFlowSection = dynamic(
  () =>
    import("@/components/sections/process-flow").then(
      (m) => m.ProcessFlowSection
    ),
  { ssr: false }
);
const PricingPlansSection = dynamic(
  () =>
    import("@/components/sections/pricing-plans").then(
      (m) => m.PricingPlansSection
    ),
  { ssr: false }
);

/* Additional interactive sections */
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
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.TestimonialsSection)
);
const FAQSection = dynamic(() =>
  import("@/components/sections/faq").then((m) => m.FAQSection)
);

const CreateTogetherBanner = dynamic(
  () =>
    import("@/components/sections/create-together-banner").then(
      (m) => m.CreateTogetherBanner
    ),
  { ssr: false }
);

export function HomeClientContent() {
  return (
    <>
      {/* ── 02 / WORK — the proof. Leads the page after About. ── */}
      <ProjectsSection />

      {/* ── 03 / STACK — one capability story, not three. ── */}
      <SkillsSection />
      <TechStackShowcase />

      {/* ── 04 / SERVICES ── */}
      <ServicesSection />

      {/* ── 05 / PROCESS & ENGAGEMENT ── */}
      <ProcessFlowSection />
      <PricingPlansSection />

      {/* ── 06 / EXPERIENCE & CREDENTIALS ── */}
      <ExperienceSection />
      {/* <CertificationsSection /> */}

      {/* ── 07 / FAQ ── */}
      <FAQSection />

      {/* ── 08 / CONTACT ── */}
      <ContactSection />

      {/* ═══ COMMENTED OUT DURING EXPERIENCE AUDIT ═══
          Restorable one by one once their content is real:

          // Fabricated GitHub contribution heatmap (randomized data,
          // invented commit/PR stats). Restore only with the real
          // GitHub API or real numbers.
          // <GithubActivity />

          // Before/After metrics are invented client results
          // ("94% coverage", "-95% production defects").
          // <BeforeAfterSection />

          // Unverifiable named testimonials (Sarah Jenkins,
          // Marcus Chen, Priya Sharma, Alexander Miller).
          // <TestimonialsSection />

          // Duplicates StackRadar's story with a third skill taxonomy.
          // <StackRadar />

          // Duplicates ExperienceSection with a second career timeline
          // whose dates conflict with it (2024-Present vs 2026 independent).
          // <JourneyTimeline />

          // A second contact form right before the contact section —
          // two competing forms, one converts the other into noise.
          // <CreateTogetherBanner />

          // A fourth "exploring/learning" grid; the page needs one,
          // not a museum of intentions.
          // <CurrentlyExploring />
      */}
    </>
  );
}
