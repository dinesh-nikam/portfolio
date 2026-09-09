"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useCapable } from "@/hooks/use-capable";
import { usePageRevealed } from "@/hooks/use-page-revealed";
import { useSignalTokens } from "@/lib/signal-tokens";

/* Ambient hero sculpture — an ink wireframe icosahedron with a thin vermilion
   orbit ring and a sparse dust halo. The whole assembly drifts on gsap-tuned
   easing and leans with the pointer. Canvas work pauses in hidden tabs. */

interface SceneColors {
    foreground: string;
    primary: string;
    muted: string;
}

const HALO_COUNT = 260;
const HALO_RADIUS = 3.1;
const HALO_POSITIONS = (() => {
    const array = new Float32Array(HALO_COUNT * 3);
    for (let i = 0; i < HALO_COUNT; i += 1) {
        const r = HALO_RADIUS * (0.7 + Math.random() * 0.45);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        array[i * 3 + 2] = r * Math.cos(phi);
    }
    return array;
})();

function HaloPoints({ color }: { color: string }) {
    const pointsRef = useRef<THREE.Points | null>(null);

    useFrame((state) => {
        if (typeof document !== "undefined" && document.hidden) return;
        const points = pointsRef.current;
        if (!points) return;
        points.rotation.y = state.clock.elapsedTime * 0.02;
        points.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[HALO_POSITIONS, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color={color}
                size={0.022}
                sizeAttenuation
                transparent
                opacity={0.55}
                depthWrite={false}
            />
        </points>
    );
}

function WireScene() {
    const tokens = useSignalTokens();
    const tokensRef = useRef(tokens);

    useEffect(() => {
        tokensRef.current = tokens;
    }, [tokens]);

    const spinRef = useRef<THREE.Group | null>(null);
    const tiltRef = useRef<THREE.Group | null>(null);
    const parallaxRef = useRef<THREE.Group | null>(null);
    const ringRef = useRef<THREE.Mesh | null>(null);
    const pointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (event: PointerEvent) => {
            pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    useFrame((state, delta) => {
        if (typeof document !== "undefined" && document.hidden) return;
        const time = state.clock.elapsedTime;
        if (spinRef.current) spinRef.current.rotation.y += delta * 0.08;
        if (tiltRef.current) {
            tiltRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
            tiltRef.current.rotation.z = Math.sin(time * 0.07) * 0.06;
        }
        if (ringRef.current) ringRef.current.rotation.z += delta * 0.25;
        if (parallaxRef.current) {
            parallaxRef.current.rotation.x = THREE.MathUtils.damp(
                parallaxRef.current.rotation.x,
                -pointer.current.y * 0.16,
                3.5,
                delta
            );
            parallaxRef.current.rotation.y = THREE.MathUtils.damp(
                parallaxRef.current.rotation.y,
                pointer.current.x * 0.22,
                3.5,
                delta
            );
        }
    });

    const colors = tokensRef.current;

    return (
        <group>
            <group ref={spinRef}>
                <HaloPoints color={colors.muted} />
                <group ref={tiltRef}>
                    <group ref={parallaxRef}>
                        <mesh>
                            <icosahedronGeometry args={[1.45, 1]} />
                            <meshBasicMaterial
                                color={colors.foreground}
                                wireframe
                                transparent
                                opacity={0.2}
                            />
                        </mesh>
                        <mesh ref={ringRef} rotation={[Math.PI / 2.15, 0.3, 0]}>
                            <torusGeometry args={[2.05, 0.009, 8, 128]} />
                            <meshBasicMaterial color={colors.primary} transparent opacity={0.7} />
                        </mesh>
                        <mesh rotation={[-Math.PI / 2.4, 0.9, Math.PI / 5]}>
                            <torusGeometry args={[2.4, 0.005, 8, 128]} />
                            <meshBasicMaterial color={colors.muted} transparent opacity={0.5} />
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
}

export default function HeroScene() {
    const { mounted, capable } = useCapable(1024);
    const revealed = usePageRevealed();
    const wrapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!revealed || !wrap) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            gsap.set(wrap, { opacity: 1, scale: 1 });
            return;
        }
        const timeline = gsap.fromTo(
            wrap,
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 1.15, ease: "power3.out" }
        );
        return () => {
            timeline.kill();
        };
    }, [revealed]);

    if (!mounted || !capable) return null;

    return (
        <div
            ref={wrapRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-0"
        >
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <WireScene />
            </Canvas>
        </div>
    );
}