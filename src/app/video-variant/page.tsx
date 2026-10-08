import { createMetadata } from "@/lib/metadata";
import { NavigationBarV2 } from "@/components/navigation-bar-v2";
import { HeroSection } from "@/components/sections/hero";
import { BrandMarqueeV2 } from "@/components/sections/brand-marquee-v2";
import { AboutSection } from "@/components/sections/about";
import { AboutGalleryReel } from "@/components/sections/about-gallery-reel";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ProjectsGridV2 } from "@/components/sections/projects-grid-v2";
import { BentoResultsV2 } from "@/components/sections/bento-results-v2";
import { TestimonialSliderV2 } from "@/components/sections/testimonial-slider-v2";
import { AchievementsGridV2 } from "@/components/sections/achievements-grid-v2";
import { ProcessFlowSection } from "@/components/sections/process-flow";
import { PricingPlansSection } from "@/components/sections/pricing-plans";
import { FAQSection } from "@/components/sections/faq";
import { CreateTogetherBanner } from "@/components/sections/create-together-banner";
import { FooterV2 } from "@/components/sections/footer-v2";

export const metadata = createMetadata({
  title: "Video 1 Variant — Full Editorial Motion Portfolio | Dinesh Nikam",
  description:
    "Dedicated variant incorporating all signature animations from reference video 1: Staggered masonry projects, hover image reveal, bento results, testimonial slider, achievements grid, and edge-to-edge typography.",
});

export default function VideoVariantPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col w-full relative">
      {/* Navigation V2 with Fullscreen Overlay Drawer */}
      <NavigationBarV2 />

      <div id="smooth-wrapper" className="w-full flex flex-col items-center">
        {/* 1. Hero with Continuous Levitation & Floating Badge */}
        <HeroSection />

        {/* 2. Trusted by Leading Brands Marquee (Video 1: 00:07) */}
        <BrandMarqueeV2 />

        {/* 3. About Section */}
        <AboutSection />

        {/* 4. Horizontal Gallery Photo Reel (Video 1: 00:40) */}
        <AboutGalleryReel />

        {/* 5. Services with Hover Image Reveal & Crossfade (Video 1: 00:10) */}
        <ServicesSection />

        {/* 6. Staggered 2-Column Projects Masonry Grid (Video 1: 00:14) */}
        <ProjectsGridV2 />

        {/* 7. Bento Grid "Focused on Design that Delivers Results" (Video 1: 00:21) */}
        <BentoResultsV2 />

        {/* 8. Process Flow (Video 1: 00:19) */}
        <ProcessFlowSection />

        {/* 9. Achievements & Honors Dark Grid (Video 1: 00:44) */}
        <AchievementsGridV2 />

        {/* 10. Testimonial Slider Carousel (Video 1: 00:25) */}
        <TestimonialSliderV2 />

        {/* 11. Simple Plans Pricing Switch (Video 1: 00:28) */}
        <PricingPlansSection />

        {/* 12. FAQ Section */}
        <FAQSection />

        {/* 13. "Let's Create Together" Atmospheric Banner (Video 1: 00:34) */}
        <CreateTogetherBanner />

        {/* 14. Giant Typography Footer & Newsletter (Video 1: 00:36) */}
        <FooterV2 />
      </div>
    </main>
  );
}
