/**
 * Shared branded OG card renderer for social share images (1200x630).
 *
 * Uses next/og (satori) with self-hosted TTF fonts (satori cannot read WOFF2).
 * Design mirrors the site's editorial brand: near-black field, hairline crop
 * marks, serif display type, orange accent, monospace metadata.
 */

import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";
import { SITE_NAME, SITE_URL } from "./metadata";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/* Cache fonts across invocations (dev server / serverless warm starts). */
let fontCache: { display: Buffer; mono: Buffer } | null = null;

function loadFonts() {
  if (fontCache) return fontCache;
  const fontsDir = path.join(process.cwd(), "public", "fonts");
  fontCache = {
    display: readFileSync(path.join(fontsDir, "bodoni-moda-700.ttf")),
    mono: readFileSync(path.join(fontsDir, "jetbrains-mono-500.ttf")),
  };
  return fontCache;
}

interface OgCardOptions {
  /** Eyebrow line above the title, e.g. "CASE STUDY — 01". */
  eyebrow: string;
  /** Main display title. */
  title: string;
  /** Supporting line below the title. */
  subtitle: string;
  /** Optional tech/category chips row. */
  chips?: string[];
  /** Optional right-side metric callout. */
  metric?: string;
}

export function renderOgCard({
  eyebrow,
  title,
  subtitle,
  chips,
  metric,
}: OgCardOptions): ImageResponse {
  const fonts = loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#121110",
          backgroundImage:
            "radial-gradient(circle at 82% 12%, rgba(228, 87, 46, 0.16) 0%, rgba(228, 87, 46, 0) 45%)",
          color: "#ede9df",
          fontFamily: "Bodoni Moda",
        }}
      >
        {/* Crop marks */}
        <div style={{ display: "flex", position: "absolute", top: 44, left: 44 }} />
        <div style={{ display: "flex", position: "absolute", top: 44, right: 44 }} />
        <div style={{ display: "flex", position: "absolute", bottom: 44, left: 44 }} />
        <div style={{ display: "flex", position: "absolute", bottom: 44, right: 44 }} />

        {/* Header row: eyebrow + brand */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            letterSpacing: 8,
            color: "#a49c8f",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>{eyebrow}</div>
          <div style={{ display: "flex" }}>{SITE_NAME.toUpperCase()}</div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 42 ? 84 : 104,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontStyle: "italic",
              color: "#ede9df",
              opacity: 0.82,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Footer row: chips / metric + site URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {(chips ?? []).slice(0, 4).map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  fontFamily: "JetBrains Mono",
                  fontSize: 20,
                  letterSpacing: 2,
                  padding: "8px 18px",
                  border: "1px solid rgba(237, 233, 223, 0.28)",
                  borderRadius: 2,
                  color: "#a49c8f",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
          {metric ? (
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: 24,
                letterSpacing: 3,
                color: "#e4572e",
                textTransform: "uppercase",
              }}
            >
              {metric}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: 24,
                letterSpacing: 6,
                color: "#a49c8f",
              }}
            >
              DINESHNIKAM.COM
            </div>
          )}
        </div>

        {/* Accent rule above footer */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 132,
            left: 84,
            width: 120,
            height: 4,
            backgroundColor: "#e4572e",
          }}
        />
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        {
          name: "Bodoni Moda",
          data: fonts.display,
          weight: 700,
          style: "normal",
        },
        {
          name: "JetBrains Mono",
          data: fonts.mono,
          weight: 500,
          style: "normal",
        },
      ],
    },
  );
}

/** Absolute URL for a project OG image (for use in metadata/JSON-LD). */
export function projectOgImageUrl(slug: string): string {
  return `${SITE_URL}/og/projects/${slug}`;
}
