"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCapable } from "@/hooks/use-capable";
import { useSignalTokens } from "@/lib/signal-tokens";

/* Portrait as particles — the hero portrait is re-sampled into a soft point
   cloud over the base <Image> layer (LCP stays intact). Hovering repels the
   particles around an ink-radius well; they settle back on release. */

const IMAGE_URL = "/my.png";
const TARGET_COUNT = 9000;

interface Sample {
    positions: Float32Array;
    seeds: Float32Array;
    aspect: number;
}

async function sampleImage(url: string): Promise<Sample | null> {
    const image = new Image();
    image.src = url;
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

    let step = 2;
    for (; step < 10; step += 1) {
        let count = 0;
        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                if (data[(y * width + x) * 4 + 3] > 100) count += 1;
            }
        }
        if (count <= TARGET_COUNT) break;
    }

    const positions: number[] = [];
    const seeds: number[] = [];
    const aspect = width / height;
    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            if (data[(y * width + x) * 4 + 3] <= 100) continue;
            positions.push((x / width) * 2 - 1, ((y / height) * 2 - 1) * aspect, 0);
            seeds.push(Math.random());
        }
    }
    if (positions.length === 0) return null;
    return { positions: new Float32Array(positions), seeds: new Float32Array(seeds), aspect };
}

const vertexShader = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uHoverState;
  uniform vec2 uHover;
  uniform float uPixelScale;
  varying float vSeed;
  void main() {
    vec3 pos = position;
    float d = distance(pos.xy, uHover);
    float push = smoothstep(0.28, 0.0, d) * uHoverState;
    vec2 dir = normalize(pos.xy - uHover + 0.0001);
    pos.xy += dir * push * 0.15;
    pos.xy += vec2(
      sin(uTime * 1.2 + aSeed * 6.28318),
      cos(uTime * 0.9 + aSeed * 6.28318)
    ) * 0.003;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (2.4 + aSeed * 1.4) * uPixelScale;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vSeed;
  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.06, dist);
    vec3 color = mix(uColor, uAccent, step(0.82, vSeed));
    gl_FragColor = vec4(color, alpha);
  }
`;

interface PortraitPointsProps {
    sample: Sample;
    colors: { foreground: string; primary: string };
    boundsRef: React.RefObject<HTMLDivElement | null>;
}

function PortraitPoints({ sample, colors, boundsRef }: PortraitPointsProps) {
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const hover = useRef({ x: 0, y: 0, state: 0 });
    const target = useRef({ x: 0, y: 0 });
    const inside = useRef(false);

    useEffect(() => {
        const element = boundsRef.current;
        if (!element) return;
        const onMove = (event: PointerEvent) => {
            const rect = element.getBoundingClientRect();
            const insideElement =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;
            inside.current = insideElement;
            if (insideElement) {
                const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
                target.current.x = nx;
                target.current.y = ny * sample.aspect;
            }
        };
        const onLeave = () => {
            inside.current = false;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        element.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            element.removeEventListener("pointerleave", onLeave);
        };
    }, [boundsRef, sample.aspect]);

    useEffect(() => {
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.uColor.value.set(colors.foreground);
        material.uniforms.uAccent.value.set(colors.primary);
    }, [colors.foreground, colors.primary]);

    useFrame((_, delta) => {
        if (typeof document !== "undefined" && document.hidden) return;
        const material = materialRef.current;
        if (!material) return;
        const step = Math.min(delta, 0.05);
        hover.current.x = THREE.MathUtils.damp(hover.current.x, target.current.x, 7, step);
        hover.current.y = THREE.MathUtils.damp(hover.current.y, target.current.y, 7, step);
        hover.current.state = THREE.MathUtils.damp(
            hover.current.state,
            inside.current ? 1 : 0,
            6,
            step
        );
        material.uniforms.uTime.value += delta;
        material.uniforms.uHover.value.set(hover.current.x, hover.current.y);
        material.uniforms.uHoverState.value = hover.current.state;
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uHover: { value: new THREE.Vector2(0, 0) },
            uHoverState: { value: 0 },
            uPixelScale: { value: Math.min(window.devicePixelRatio || 1, 2) },
            uColor: { value: new THREE.Color(colors.foreground) },
            uAccent: { value: new THREE.Color(colors.primary) },
        }),
        [colors.foreground, colors.primary]
    );

    return (
        <points frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[sample.positions, 3]} />
                <bufferAttribute attach="attributes-aSeed" args={[sample.seeds, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                args={[
                    {
                        transparent: true,
                        depthWrite: false,
                        uniforms,
                        vertexShader,
                        fragmentShader,
                    },
                ]}
            />
        </points>
    );
}

export default function ParticleImage({ className }: { className?: string }) {
    const { mounted, capable } = useCapable();
    const tokens = useSignalTokens();
    const [sample, setSample] = useState<Sample | null>(null);
    const boundsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let alive = true;
        sampleImage(IMAGE_URL)
            .then((result) => {
                if (alive) setSample(result);
            })
            .catch(() => {
                /* the base <Image> layer remains the visual fallback */
            });
        return () => {
            alive = false;
        };
    }, []);

    if (!mounted || !capable) return null;

    return (
        <div ref={boundsRef} className={className ?? "absolute inset-0"}>
            {sample && (
                <Canvas
                    dpr={[1, 1.5]}
                    camera={{ position: [0, 0, 3], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    style={{ pointerEvents: "none" }}
                >
                    <PortraitPoints
                        sample={sample}
                        colors={{ foreground: tokens.foreground, primary: tokens.primary }}
                        boundsRef={boundsRef}
                    />
                </Canvas>
            )}
        </div>
    );
}