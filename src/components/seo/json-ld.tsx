/**
 * Structured Data (JSON-LD) components for SEO.
 *
 * These render <script type="application/ld+json"> tags that help search
 * engines understand the page content, enabling rich results.
 *
 * Reference: https://schema.org/
 */

import { SITE_NAME, SITE_URL, JOB_TITLE, SITE_DESCRIPTION, SOCIAL_PROFILES, OG_IMAGE_URL } from "@/lib/metadata";

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

export function buildArticleSchema({
  title,
  excerpt,
  datePublished,
  dateModified,
  slug,
  author = SITE_NAME,
  image = `${OG_IMAGE_URL}`,
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
    author: {
      "@type": "Person",
      name: author,
    },
    image,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${OG_IMAGE_URL}`,
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
