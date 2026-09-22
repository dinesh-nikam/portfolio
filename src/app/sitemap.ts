/**
 * Dynamic sitemap — generated at build time / on-demand for ISR.
 *
 * Combines the static routes with dynamically published articles so that
 * every public-facing URL is discoverable by search engine crawlers.
 *
 * Next.js automatically serves /sitemap.xml from this file.
 */
import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { SITE_URL } from "@/lib/metadata";

import { CURATED_FALLBACK_ARTICLES } from "@/lib/blog-generator";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published articles for dynamic routes with safe fallback
  let articles: { slug: string; updatedAt: Date | null }[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      select: {
        slug: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.warn("Sitemap: Database unreachable during build, using static routes fallback.", error);
  }

  if (!articles || articles.length === 0) {
    articles = Object.values(CURATED_FALLBACK_ARTICLES).map((item) => ({
      slug: item.slug,
      updatedAt: item.publishedAt,
    }));
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contactme`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date("2025-03-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/writing/${article.slug}`,
    lastModified: article.updatedAt ?? new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
