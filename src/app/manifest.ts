import type { MetadataRoute } from "next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, JOB_TITLE } from "@/lib/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${JOB_TITLE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    categories: ["portfolio", "developer", "business"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
