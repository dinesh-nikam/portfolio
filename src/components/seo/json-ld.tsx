/**
 * Structured Data (JSON-LD) components for SEO.
 *
 * These render <script type="application/ld+json"> tags that help search
 * engines understand the page content, enabling rich results.
 *
 * Reference: https://schema.org/
 */

import { SITE_NAME, SITE_URL, JOB_TITLE, SITE_DESCRIPTION, SOCIAL_PROFILES, OG_IMAGE_URL, LOCATION } from "@/lib/metadata";

interface JsonLdProps {
  /** The JSON-LD object to embed. */
  data: unknown;
}

/**
 * Generic JSON-LD script renderer.
 * Accepts a plain object (not a string) for type safety.
 * Renders as a Server Component (no "use client" directive) so the
 * script markup is present in the initial SSR HTML that crawlers see.
 */
export function JsonLdScript({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(data, null, 2)}
    </script>
  );
}

/* ------------------------------------------------------------------ */
/* Schema builders                                                     */
/* ------------------------------------------------------------------ */

/** Person schema for the portfolio owner (used on every page via layout). */
export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: JOB_TITLE,
    description: SITE_DESCRIPTION,
    sameAs: [
      SOCIAL_PROFILES.github,
      SOCIAL_PROFILES.linkedin,
      SOCIAL_PROFILES.twitter,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCATION.city,
      addressRegion: LOCATION.region,
      addressCountry: "IN",
    },
    knowsLanguage: ["English", "Hindi"],
    knowsProgrammingLanguage: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "SQL",
      "GLSL",
    ],
    knowsAbout: [
      "Full Stack Development",
      "Cloud Architecture (AWS)",
      "WebGL & 3D Graphics",
      "UI/UX Design",
      "DevOps & Containerization",
      "System Design",
    ],
  };
}

/** WebSite schema (site name, search action). */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/writing?search=`,
      "query-input": "required name=search",
    },
  };
}

/**
 * Service schema for the portfolio's professional offerings.
 * Each service is a self-contained entity with a name, description, and provider.
 */
export function buildServicesSchema() {
  const services = [
    {
      name: "Web Development",
      description: "Building fast, scalable, and beautifully animated web applications using Next.js and React.",
      url: `${SITE_URL}/#work`,
    },
    {
      name: "UI/UX Design",
      description: "Crafting premium user interfaces with a focus on dark aesthetics, glassmorphism, and intuitive experiences.",
      url: `${SITE_URL}/#skills`,
    },
    {
      name: "WebGL & 3D",
      description: "Creating immersive 3D web experiences using Three.js, React Three Fiber, and custom GLSL shaders.",
      url: `${SITE_URL}/#work`,
    },
    {
      name: "Creative Development",
      description: "Bringing designs to life with fluid motion, GSAP animations, and physics-based interactions.",
      url: `${SITE_URL}/#work`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.name,
      description: service.description,
      serviceType: service.name,
      provider: {
        "@type": "Person",
        name: SITE_NAME,
      },
      url: service.url,
    })),
  };
}


/**
 * Article / BlogPosting schema for an individual article page.
 */
interface ArticleSchemaProps {
  title: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  slug: string;
  author?: string;
  image?: string;
}

/** Per-article OG image URL (served by the opengraph-image file convention). */
export function articleOgImageUrl(slug: string): string {
  return `${SITE_URL}/writing/${slug}/opengraph-image`;
}

export function buildArticleSchema({
  title,
  excerpt,
  datePublished,
  dateModified,
  slug,
  author = SITE_NAME,
  image = articleOgImageUrl(slug),
}: ArticleSchemaProps) {
  const url = `${SITE_URL}/writing/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description: excerpt,
    datePublished,
    dateModified,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: author,
      url: SITE_URL,
    },
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    keywords: "engineering, software architecture, web development, React, Next.js",
  };
}

/**
 * CollectionPage / Blog schema for the writing listing page.
 */
export function buildBlogListingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Writing — Engineering Notes",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/writing`,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    hasPart: [],
  };
}

/**
 * BreadcrumbList schema for navigation aids on deeper pages.
 */
export function buildBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

/**
 * ContactPage schema for the contact page.
 */
export function buildContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — Dinesh Nikam",
    description: "Get in touch for freelance opportunities, partnerships, and discussions about creative technology, React, Next.js, and cloud architecture.",
    url: `${SITE_URL}/contactme`,
    mainEntity: {
      "@type": "Person",
      name: SITE_NAME,
      email: SOCIAL_PROFILES.email.replace("mailto:", ""),
    },
  };
}

/**
 * LocalBusiness & ProfessionalService schema establishing Dinesh Nikam as
 * Pune's top brand for all digital, web engineering, and cloud services.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Dinesh Nikam — Premier Digital Brand & Full Stack Web Services Pune",
    alternateName: "Dinesh Nikam Digital Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: OG_IMAGE_URL,
    description: "Top-ranked digital engineering and full stack web development brand in Pune, India. Specializing in Next.js, React, Node.js, WebGL 3D, and AI automation for global leaders.",
    email: SOCIAL_PROFILES.email.replace("mailto:", ""),
    priceRange: "$$ - $$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hinjawadi IT Park & Baner",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411057",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.5204,
      longitude: 73.8567,
    },
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "AdministrativeArea", name: "Hinjawadi" },
      { "@type": "AdministrativeArea", name: "Baner" },
      { "@type": "AdministrativeArea", name: "Koregaon Park" },
      { "@type": "AdministrativeArea", name: "Viman Nagar" },
      { "@type": "AdministrativeArea", name: "Kharadi" },
      { "@type": "AdministrativeArea", name: "Magarpatta City" },
      { "@type": "AdministrativeArea", name: "Kothrud" },
      { "@type": "AdministrativeArea", name: "Aundh" },
      { "@type": "State", name: "Maharashtra" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Germany" },
    ],
    sameAs: [
      SOCIAL_PROFILES.github,
      SOCIAL_PROFILES.linkedin,
      SOCIAL_PROFILES.twitter,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Top Digital Engineering & Web Services in Pune",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Development (Next.js & React 19)",
            description: "High performance, scalable web applications with sub-second page loads and modern architecture.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise UI/UX Design & Creative Technology",
            description: "Editorial-grade digital aesthetics, smooth micro-interactions, and design systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WebGL, Three.js & 3D Interactive Web Design",
            description: "Cinematic, GPU-accelerated interactive 3D web visualizations and particle shaders.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud Architecture, AWS & DevOps Automation",
            description: "Resilient distributed cloud infrastructure, Docker, Kubernetes, and CI/CD pipelines.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automated AI, LLM Integrations & Tech Content Systems",
            description: "Autonomous LLM workflow pipelines, auto-generating blogs, and intelligent agents.",
          },
          },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technical SEO & 99+ Core Web Vitals Optimization",
            description: "Guaranteed top-ranking search engine optimization and sub-second Google PageSpeed scores.",
          },
        },
      ],
    },
  };
}

/**
 * FAQItem interface — used by components and faq-data.ts
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQPage Schema for Google Rich Snippets accordions in SERPs.
 */
export function buildFAQSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const buildFaqSchema = buildFAQSchema;


