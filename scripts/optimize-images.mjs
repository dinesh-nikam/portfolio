/**
 * Asset optimization script — run once via `node scripts/optimize-images.mjs`
 * 1. my.png (4.5MB) → my.webp hero set (LCP-critical)
 * 2. Branded 1200x630 og-image.png (social platforms can't render SVG)
 * 3. Full favicon set: 32/180/192/512 PNG from brand mark
 */
import sharp from "sharp";
import { existsSync, unlinkSync } from "fs";
import path from "path";

const PUB = path.join(process.cwd(), "public");

/* ---------- 1. Hero portrait ---------- */
if (existsSync(path.join(PUB, "my.png"))) {
  await sharp(path.join(PUB, "my.png"))
    .resize({ width: 760, height: 950, fit: "cover", position: "attention" })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(PUB, "my.webp"));
  console.log("✓ my.webp (760x950)");
} else {
  console.log("– my.png not found, skipping");
}

/* ---------- 2. OG image (1200x630) ---------- */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="82%" cy="18%" r="60%">
      <stop offset="0%" stop-color="#e4572e" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#e4572e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#121110"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <!-- register crop marks -->
  <g stroke="#ede9df" stroke-opacity="0.35" stroke-width="2">
    <path d="M48 48 h36 M48 48 v36"/>
    <path d="M1152 48 h-36 M1152 48 v36"/>
    <path d="M48 582 h36 M48 582 v-36"/>
    <path d="M1152 582 h-36 M1152 582 v-36"/>
  </g>
  <circle cx="1032" cy="150" r="92" fill="none" stroke="#e4572e" stroke-width="2" stroke-opacity="0.85"/>
  <circle cx="1032" cy="150" r="128" fill="none" stroke="#ede9df" stroke-width="1" stroke-opacity="0.22"/>
  <circle cx="1032" cy="150" r="5" fill="#e4572e"/>
  <text x="96" y="188" fill="#a49c8f" font-family="Georgia, 'Times New Roman', serif" font-size="26" letter-spacing="14">PORTFOLIO — 2026</text>
  <text x="90" y="330" fill="#ede9df" font-family="Georgia, 'Times New Roman', serif" font-size="118" font-weight="700" letter-spacing="2">Dinesh Nikam</text>
  <text x="96" y="402" fill="#ede9df" fill-opacity="0.82" font-family="Georgia, 'Times New Roman', serif" font-size="38" font-style="italic">Full Stack Developer · Web, Cloud &amp; AI Solutions</text>
  <rect x="96" y="452" width="120" height="4" fill="#e4572e"/>
  <text x="96" y="530" fill="#a49c8f" font-family="Georgia, 'Times New Roman', serif" font-size="28" letter-spacing="6">PUNE, INDIA — DINESHNIKAM.COM</text>
</svg>`;
await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(path.join(PUB, "og-image.png"));
console.log("✓ og-image.png (1200x630)");

/* ---------- 3. Favicon set ---------- */
const markSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#141210"/>
  <rect x="40" y="40" width="432" height="432" rx="72" fill="none" stroke="#ede9df" stroke-opacity="0.16" stroke-width="6"/>
  <circle cx="256" cy="256" r="118" fill="none" stroke="#ede9df" stroke-opacity="0.5" stroke-width="7"/>
  <text x="256" y="292" fill="#ede9df" font-family="Georgia, 'Times New Roman', serif" font-size="106" font-weight="700" text-anchor="middle" letter-spacing="4">DN</text>
  <circle cx="256" cy="120" r="13" fill="#e4572e"/>
</svg>`;
const mark = Buffer.from(markSvg(512));
await sharp(mark).resize(512, 512).png().toFile(path.join(PUB, "icon-512.png"));
await sharp(mark).resize(192, 192).png().toFile(path.join(PUB, "icon-192.png"));
await sharp(mark).resize(180, 180).png().toFile(path.join(PUB, "apple-touch-icon.png"));
await sharp(mark).resize(32, 32).png().toFile(path.join(PUB, "favicon-32.png"));
console.log("✓ favicon set (32/180/192/512)");

/* ---------- 4. Keep all original source assets safe (never delete) ---------- */
console.log("✓ All original assets preserved. High-performance WebP and PNG assets generated alongside originals.");
console.log("Done.");

