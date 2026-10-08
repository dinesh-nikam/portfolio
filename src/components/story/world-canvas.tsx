"use client";

/* ────────────────────────────────────────────────────────────────────
   The persistent 3D world behind the /story experience.

   One fixed full-screen canvas for the entire page. A single point
   cloud — sampled from Dinesh's portrait — morphs between states as
   the visitor scrolls:

     EMERGENCE  scattered light → portrait assembles
     CURIOSITY  portrait breathes, gaze follows the pointer
     BUILDER    portrait → wireframe → network shell
     CAPABILITY network densifies with orbiting memory objects
     PROOF      world goes architectural, portrait recedes
     HUMAN      everything dissolves, the portrait returns alone
     INVITATION near-empty; avatar barely visible

   Scroll/pointer values flow through story-world-state (no React
   re-renders at 60fps). Patterns follow the repo's proven R3F
   components (hero-scene.tsx, particle-image.tsx): useCapable gates,
   IntersectionObserver pausing, document.hidden checks.
   ──────────────────────────────────────────────────────────────────── */

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import Image from "next/image";
import { useCapable } from "@/hooks/use-capable";
import { useSignalTokens } from "@/lib/signal-tokens";
import {
  storyWorld,
  sampleAvatar,
  buildNetworkSegments,
  smoothstep,
  type AvatarSample,
} from "@/components/story/story-world-state";

/* ── Scroll → world-state window map ───────────────────────────────
   Page-level scroll progress (0..1) mapped to per-state intensities.
   Kept in one place so the DOM scenes and the canvas stay in sync.

   Chapter bounds (see lib/story.ts):
     INTRO 0–.08  CURIOSITY .08–.24  BUILD .24–.38  WORK .38–.6
     PHILOSOPHY .6–.78  ABOUT .78–.9  CONTACT .9–1 */

export interface WorldIntensities {
  /** 1 = fully scattered light cloud (pre-assembly). */
  scatter: number;
  /** 1 = portrait fully assembled. */
  portrait: number;
  /** 1 = fully wireframe / network state. */
  wireframe: number;
  /** Global cloud opacity multiplier. */
  opacity: number;
}

export function worldIntensities(progress: number, intro: number): WorldIntensities {
  // The intro tween assembles the portrait on load; scrolling away from
  // the top during INTRO can finish the job early.
  const assembled = Math.max(intro, smoothstep(0.0, 0.05, progress));

  const portrait =
    assembled * (1 - smoothstep(0.2, 0.28, progress)) + // curiosity → builder hand-off
    smoothstep(0.74, 0.82, progress) * // the human returns
      (1 - smoothstep(0.9, 0.96, progress) * 0.85); // faint residual for contact

  const wireframe =
    smoothstep(0.22, 0.3, progress) * (1 - smoothstep(0.42, 0.5, progress)) +
    smoothstep(0.42, 0.5, progress) * (1 - smoothstep(0.62, 0.72, progress)) * 0.45; // architectural Work/Proof phase

  const opacity =
    0.95 * (1 - smoothstep(0.86, 0.97, progress) * 0.7); // world dissolves at the end

  return {
    scatter: 1 - assembled,
    portrait: Math.min(1, portrait),
    wireframe: Math.min(1, wireframe),
    opacity,
  };
}

/* ── Morphing point cloud ────────────────────────────────────────── */

const MORPH_VERTEX = /* glsl */ `
  attribute vec3 aScatter;
  attribute vec3 aNet;
  attribute float aSeed;

  uniform float uScatter;
  uniform float uPortrait;
  uniform float uWireframe;
  uniform float uTime;
  uniform float uPixelScale;
  uniform vec2 uPointer;
  uniform float uMotion;

  varying float vSeed;
  varying float vDim;

  void main() {
    // Weighted morph: portrait <-> network shell -> scattered light.
    vec3 assembled = mix(position, aNet, uWireframe * 0.92);
    vec3 pos = mix(assembled, aScatter, uScatter);

    // Gentle breathing when assembled; restlessness while scattered.
    // uMotion is 0 under prefers-reduced-motion: the cloud holds still.
    float breatheAmp = mix(0.012, 0.22, uScatter) * uMotion;
    float breatheFreq = mix(0.9, 2.0, uScatter);
    pos += vec3(
      sin(uTime * breatheFreq + aSeed * 9.0),
      cos(uTime * breatheFreq * 0.8 + aSeed * 7.0),
      sin(uTime * breatheFreq * 0.9 + aSeed * 5.0)
    ) * breatheAmp;

    // Subtle pointer gaze - the cloud leans toward the cursor.
    pos.xy += uPointer * 0.05 * uPortrait * uMotion;

    vSeed = aSeed;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vDim = smoothstep(-4.5, 2.0, mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (1.5 + aSeed * 1.2) * uPixelScale;
  }
`;

const MORPH_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uOpacity;
  uniform float uPortrait;

  varying float vSeed;
  varying float vDim;

  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.08, dist)
      * uOpacity
      * mix(0.35, 1.0, uPortrait)
      * mix(1.0, 0.55, vDim);
    vec3 color = mix(uColor, uAccent, step(0.86, vSeed) * uPortrait);
    gl_FragColor = vec4(color, alpha);
  }
`;

/* ── StoryAvatar ─────────────────────────────────────────────────── */

interface StoryAvatarProps {
  sample: AvatarSample;
  tokens: { foreground: string; primary: string; muted: string };
}

function StoryAvatar({ sample, tokens }: StoryAvatarProps) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const { noReducedMotion } = useCapable();
  // 1 = full motion, 0 = reduced motion (still world, scroll fades only).
  const motionValue = noReducedMotion ? 1 : 0;

  const uniforms = useMemo(
    () => ({
      uScatter: { value: 1 },
      uPortrait: { value: 0 },
      uWireframe: { value: 0 },
      uTime: { value: 0 },
      uPixelScale: {
        value: Math.min(
          (typeof window !== "undefined" ? window.devicePixelRatio : 1) || 1,
          2
        ),
      },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color(tokens.foreground) },
      uAccent: { value: new THREE.Color(tokens.primary) },
      uOpacity: { value: 0.95 },
      uMotion: { value: motionValue },
    }),
    [tokens.foreground, tokens.primary, motionValue]
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    const group = groupRef.current;
    if (!material || !group) return;
    if (typeof document !== "undefined" && document.hidden) return;

    const { progress, intro, pointer } = storyWorld;
    const intensities = worldIntensities(progress, intro);

    material.uniforms.uScatter.value = intensities.scatter;
    material.uniforms.uPortrait.value = intensities.portrait;
    material.uniforms.uWireframe.value = intensities.wireframe;
    material.uniforms.uOpacity.value = intensities.opacity;
    material.uniforms.uTime.value += delta;
    material.uniforms.uPointer.value.set(
      pointer.x * 0.35,
      -pointer.y * 0.35
    );

    // Cinematic camera-adjacent motion: slow drift + pointer parallax.
    // Under reduced motion the group holds a fixed, centered pose.
    if (motionValue === 0) {
      group.rotation.y = 0;
      group.rotation.x = 0;
      group.position.x = 0;
      return;
    }
    const targetRotationY = pointer.x * 0.16 + progress * 0.6;
    const targetRotationX = -pointer.y * 0.1 + Math.sin(state.clock.elapsedTime * 0.1) * 0.04;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotationY, 2.5, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotationX, 2.5, delta);
    group.position.x = THREE.MathUtils.damp(group.position.x, pointer.x * 0.12, 2.0, delta);
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sample.portrait, 3]} />
          <bufferAttribute attach="attributes-aScatter" args={[sample.scatter, 3]} />
          <bufferAttribute attach="attributes-aNet" args={[sample.net, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[sample.seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          args={[
            {
              transparent: true,
              depthWrite: false,
              uniforms,
              vertexShader: MORPH_VERTEX,
              fragmentShader: MORPH_FRAGMENT,
            },
          ]}
        />
      </points>
    </group>
  );
}

/* ── Network lines (builder/architectural phase) ─────────────────── */

function NetworkLines({ color }: { color: string }) {
  const segments = useMemo(() => buildNetworkSegments(90), []);
  const materialRef = useRef<THREE.LineBasicMaterial | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const { noReducedMotion } = useCapable();

  useFrame((state, delta) => {
    const lines = linesRef.current;
    const material = materialRef.current;
    if (!lines || !material) return;
    if (typeof document !== "undefined" && document.hidden) return;

    const { wireframe, opacity } = worldIntensities(
      storyWorld.progress,
      storyWorld.intro
    );

    material.opacity = wireframe * 0.35 * opacity;
    lines.visible = material.opacity > 0.01;

    // Ambient rotation pauses under prefers-reduced-motion.
    if (noReducedMotion) {
      lines.rotation.y += delta * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[segments, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* ── WorldCanvas — the exported fixed canvas ─────────────────────── */

export default function WorldCanvas() {
  const { mounted } = useCapable();
  const tokens = useSignalTokens();
  const [sample, setSample] = useState<AvatarSample | null>(null);
  const [failed, setFailed] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Load the portrait sample on the client.
  useEffect(() => {
    let alive = true;
    sampleAvatar().then((result) => {
      if (!alive) return;
      if (result) setSample(result);
      else setFailed(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Rendering pauses in hidden tabs via the document.hidden checks in useFrame.

  // The intro tween: point of light → portrait assembly (~2.4s).
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      storyWorld.intro = 1;
      return;
    }
    const tween = gsap.to(storyWorld, {
      intro: 1,
      duration: 2.4,
      ease: "power2.inOut",
    });
    return () => {
      tween.kill();
    };
  }, [mounted]);

  // While the portrait sample loads, hold a quiet dark frame — the
  // emergence scene expects to start from near-black anyway.
  if (!mounted) {
    return <div aria-hidden="true" className="fixed inset-0 z-0 bg-background" />;
  }

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-background"
      >
        <Image
          src="/my.webp"
          alt=""
          fill
          sizes="100vw"
          className="absolute left-1/2 top-1/2 h-[52vh] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <WorldContents tokens={tokens} sample={sample!} />
      </Canvas>
    </div>
  );
}

/* ── WorldContents — scene graph inside the canvas ───────────────── */

function WorldContents({
  tokens,
  sample,
}: {
  tokens: { foreground: string; primary: string; muted: string };
  sample: AvatarSample;
}) {
  return (
    <>
      <StoryAvatar sample={sample} tokens={tokens} />
      <NetworkLines color={tokens.muted} />
    </>
  );
}

