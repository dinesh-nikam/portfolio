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
  "Top-ranked digital engineering and full stack web development brand in Pune, India. Dinesh Nikam architects high-performance Next.js web applications, bespoke UI/UX designs, WebGL 3D, and AI automation for global enterprises and leading brands.";

/** Canonical job-title used across all metadata. */
export const JOB_TITLE = "Full Stack Developer & Digital Architect";

/* Social profile URLs (used in structured data + OG) */
export const SOCIAL_PROFILES = {
  github: "https://github.com/dinesh-nikam",
  linkedin: "https://linkedin.com/in/dinesh-nikam3/",
  twitter: "https://twitter.com/dinesh_nikam3",
  email: "mailto:nikamdinesh362@gmail.com",
};

/** Shared OG image — rendered 1200x630 PNG (SVG is not supported by social platforms) */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

/** Business location — used by local SEO structured data (ProfessionalService). */
export const LOCATION = {
  city: "Pune",
  region: "Maharashtra",
  country: "India",
  latitude: 18.5204,
  longitude: 73.8567,
};

/* ------------------------------------------------------------------ */
/* Base metadata — every page spreads this then overrides as needed.   */
/* ------------------------------------------------------------------ */

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Top Full Stack Developer & Web Services in Pune`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Dinesh Nikam",
    "Best Full Stack Developer in Pune",
    "Top Web Development Company in Pune",
    "Web Development Services Pune",
    "Next.js Developer Pune",
    "React Developer Pune",
    "Full Stack Engineer Pune India",
    "Enterprise Software Solutions Pune",
    "Creative Digital Agency Pune",
    "WebGL 3D Web Design Pune",
    "Cloud Architect AWS DevOps Pune",
    "AI and Automation Developer Pune",
    "Freelance Web Developer Pune",
    "Hinjawadi IT Park Web Developer",
    "Baner Koregaon Park Web Development",
    "Custom Web Applications Pune",
    "High Performance Web Engineering",
    "TypeScript Node.js Architect",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Dinesh Nikam", url: SITE_URL }],
  creator: "Dinesh Nikam",
  publisher: "Dinesh Nikam",
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
    title: `${SITE_NAME} | Top Full Stack Developer & Web Services in Pune`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Premier Digital Brand & Full Stack Developer in Pune`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Top Full Stack Developer in Pune`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune",
    "geo.position": "18.5204;73.8567",
    "ICBM": "18.5204, 73.8567",
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
      bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
    }),
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
    {
      rel: "icon",
      url: "/favicon-32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
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
