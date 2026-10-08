/**
 * Per-project OG images — /og/projects/<slug>
 *
 * Project case studies render in a modal on the homepage (no dedicated page),
 * so these images are served from a dedicated route and referenced explicitly
 * wherever project URLs are shared (bio links, social posts, schema.org).
 */

import { renderOgCard, OG_WIDTH, OG_HEIGHT } from "@/lib/og-card";
import { getCaseStudy } from "@/lib/case-studies";

export const contentType = "image/png";
export const size = { width: "1200", height: "630" } as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  const image = renderOgCard({
    eyebrow: `CASE STUDY — ${project.num}`,
    title: project.title,
    subtitle: project.tagline,
    chips: project.tech.slice(0, 4),
    metric: project.result.metric,
  });

  return new Response(image.body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
}
