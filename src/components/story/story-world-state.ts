"use client";

/* ────────────────────────────────────────────────────────────────────
   Shared mutable state + asset sampling for the /story world.

   The fixed WebGL canvas and the DOM scenes both need the scroll
   progress and pointer position, but neither should trigger React
   re-renders at 60fps — so they read/write this plain module object
   inside rAF / ScrollTrigger callbacks instead.

   The portrait sampler re-uses the technique proven in
   src/components/particle-image.tsx: the profile photo is drawn to an
   offscreen canvas and re-sampled into GPU point positions, plus two
   auxiliary distributions (scatter cloud + network shell) used by the
   avatar's morph shader.
   ──────────────────────────────────────────────────────────────────── */

export const storyWorld = {
  /** 0..1 scroll progress across the whole story page. */
  progress: 0,
  /** 0..1 intro assembly tween (point of light → portrait). */
  intro: 0,
  /** Normalized pointer position, -1..1 on both axes. */
  pointer: { x: 0, y: 0 },
};

/* ── Math helpers shared by canvas + scenes ──────────────────────── */

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / Math.max(1e-6, edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Trapezoid window: ramps up a→b, holds, ramps down c→d. */
export function window01(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number
): number {
  return smoothstep(a, b, x) * (1 - smoothstep(c, d, x));
}

export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ── Portrait sampling ───────────────────────────────────────────── */

export interface AvatarSample {
  /** Portrait point positions (the assembled avatar). */
  portrait: Float32Array;
  /** Wide scattered cloud — the "point of light" state. */
  scatter: Float32Array;
  /** Network shell — the "builder" state. */
  net: Float32Array;
  /** Per-point random seeds. */
  seeds: Float32Array;
  /** Aspect ratio of the sampled region. */
  aspect: number;
  count: number;
}

const PORTRAIT_URL = "/my.webp";

let samplePromise: Promise<AvatarSample | null> | null = null;

function targetCount(): number {
  if (typeof window === "undefined") return 6000;
  const width = window.innerWidth;
  if (width < 768) return 3800;
  if (width < 1280) return 6500;
  return 9000;
}

/**
 * Sample the portrait into three point distributions.
 * `portrait` holds the image shape; `scatter` and `net` are procedural
 * spherical distributions the shader morphs between.
 */
export function sampleAvatar(): Promise<AvatarSample | null> {
  if (samplePromise) return samplePromise;

  samplePromise = (async () => {
    try {
      const image = new Image();
      image.src = PORTRAIT_URL;
      image.decoding = "async";
      await image.decode();

      const width = 120;
      const height = Math.max(
        2,
        Math.round((image.naturalHeight / Math.max(1, image.naturalWidth)) * width)
      );
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return null;
      ctx.drawImage(image, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;

      const budget = targetCount();
      let step = 2;
      for (; step < 10; step += 1) {
        let count = 0;
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            if (data[(y * width + x) * 4 + 3] > 100) count += 1;
          }
        }
        if (count <= budget) break;
      }

      const aspect = width / height;
      const portrait: number[] = [];
      const scatter: number[] = [];
      const net: number[] = [];
      const seeds: number[] = [];

      const scatterPoint = (scale: number): [number, number, number] => {
        // Random point on a sphere shell, scaled.
        const r = scale * (0.55 + Math.random() * 0.45);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ];
      };

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (data[(y * width + x) * 4 + 3] <= 100) continue;
          // Canvas Y=0 is top; WebGL +Y is up. Scale to ~1.6 units tall.
          const px = ((x / width) * 2 - 1) * 0.9;
          const py = -(((y / height) * 2 - 1) * aspect) * 0.9;
          portrait.push(px, py, 0);
          scatter.push(...scatterPoint(3.4));
          net.push(...scatterPoint(2.1));
          seeds.push(Math.random());
        }
      }

      if (portrait.length === 0) return null;

      return {
        portrait: new Float32Array(portrait),
        scatter: new Float32Array(scatter),
        net: new Float32Array(net),
        seeds: new Float32Array(seeds),
        aspect,
        count: seeds.length,
      };
    } catch {
      return null;
    }
  })();

  return samplePromise;
}

/* ── Network line segments (builder scene) ───────────────────────── */

/** Deterministic random so repeated calls stay consistent. */
function rand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function buildNetworkSegments(segmentCount = 90): Float32Array {
  const random = rand(42);
  const positions = new Float32Array(segmentCount * 6);
  const onShell = (radius: number): [number, number, number] => {
    const r = radius * (0.75 + random() * 0.35);
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    return [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    ];
  };
  for (let i = 0; i < segmentCount; i += 1) {
    const a = onShell(2.0);
    const b = onShell(2.0);
    positions.set(a, i * 6);
    positions.set(b, i * 6 + 3);
  }
  return positions;
}
