/**
 * Per-article OG image — Next.js file convention.
 *
 * Automatically serves /writing/<slug>/opengraph-image and is injected into
 * the page's metadata (og:image + twitter:image) without manual wiring.
 */

import prisma from "@/lib/prisma";
import { CURATED_FALLBACK_ARTICLES } from "@/lib/blog-generator";
import { renderOgCard, OG_WIDTH, OG_HEIGHT } from "@/lib/og-card";

export const contentType = "image/png";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export default async function ArticleOgImage({ params }: RouteContext) {
  const { slug } = await params;

  let article: {
    title: string;
    excerpt: string;
    category: string;
    readingTime: number;
  } | null = null;

  try {
    article = await prisma.article.findUnique({
      where: { slug },
      select: {
        title: true,
        excerpt: true,
        category: true,
        readingTime: true,
      },
    });
  } catch {
    // Fall through to curated fallback below.
  }

  if (!article) {
    const fallback = CURATED_FALLBACK_ARTICLES[slug];
    if (fallback) {
      article = {
        title: fallback.title,
        excerpt: fallback.excerpt,
        category: fallback.category,
        readingTime: fallback.readingTime,
      };
    }
  }

  if (!article) {
    article = {
      title: "Engineering Notes",
      excerpt: "Writing on software architecture and creative technology by Dinesh Nikam.",
      category: "Writing",
      readingTime: 5,
    };
  }

  return renderOgCard({
    eyebrow: `${article.category.toUpperCase()} — ${article.readingTime} MIN READ`,
    title: article.title,
    subtitle: article.excerpt,
    chips: [article.category],
  });
}
