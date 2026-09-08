/**
 * Centralized SEO metadata utilities for the Dinesh Nikam portfolio.
 *
 * All public-facing pages import from here to guarantee consistent
 * title, description, OpenGraph, and Twitter Card values across the site.
 */
import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/* Brand constants                                                     */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://dineshnikam.com";
export const SITE_NAME = "Dinesh Nikam";
export const SITE_DESCRIPTION =
  "Portfolio of Dinesh Nikam — full stack engineer crafting calm, precise, editorial-grade digital products at the intersection of code, motion, and design.";

/** Canonical job-title used across all metadata. */
export const JOB_TITLE = "Full Stack Developer";

/* Social profile URLs (used in structured data + OG) */
export const SOCIAL_PROFILES = {
  github: "https://github.com/dinesh-nikam",
  linkedin: "https://linkedin.com/in/dinesh-nikam3/",
  twitter: "https://twitter.com/dinesh_nikam3",
  email: "mailto:nikamdinesh362@gmail.com",
};

/* Shared OG image — served from /public/og-image.svg */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.svg`;

/* ------------------------------------------------------------------ */
/* Base metadata — every page spreads this then overrides as needed.   */
/* ------------------------------------------------------------------ */

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${JOB_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Dinesh Nikam",
    "Full Stack Developer",
    "portfolio",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Framer Motion",
    "WebGL",
    "Three.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "Software Engineer",
    "frontend developer",
    "backend developer",
    "cloud architect",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | ${JOB_TITLE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${JOB_TITLE} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${JOB_TITLE}`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
    // bing: "YOUR_BING_VERIFICATION_CODE",
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
    {
      rel: "apple-touch-icon",
      url: "/favicon.svg",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Helper: merge base metadata with page-specific overrides.           */

/**
 * Merges the shared base metadata with page-specific overrides.
 * Deep-merges openGraph and twitter so pages only need to provide
 * the fields that change (e.g. `title`).
 */
export function createMetadata(
  overrides: Pick<Metadata, "title" | "description" | "keywords" | "robots" | "openGraph" | "twitter" | "alternates"> & {
    /** Optional per-page OG image URL */
    ogImage?: string;
  },
): Metadata {
  const ogImage = overrides.ogImage ?? OG_IMAGE_URL;

  const pageOG: Metadata["openGraph"] = {
    ...baseMetadata.openGraph,
    ...overrides.openGraph,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Portfolio`,
      },
    ],
  };

  return {
    ...baseMetadata,
    title: overrides.title ?? baseMetadata.title,
    description: overrides.description ?? baseMetadata.description,
    keywords: overrides.keywords ?? baseMetadata.keywords,
    robots: overrides.robots ?? baseMetadata.robots,
    alternates: overrides.alternates ?? baseMetadata.alternates,
    openGraph: pageOG,
    twitter: {
      ...baseMetadata.twitter,
      ...overrides.twitter,
      images: [ogImage],
    },
  };
}
