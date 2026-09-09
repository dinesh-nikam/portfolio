"use client";

import { useMemo, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { useSignalTokens } from "@/lib/signal-tokens";

/* Tech constellation — skill names orbit a wireframe ink globe on a Fibonacci
   lattice. Hovering a chip pulls a vermilion thread from the core to it. Drag
   to orbit; the globe keeps drifting on its own. */

interface GlobeSkill {
    name: string;
}

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i += 1) {
        const y = 1 - (i / Math.max(1, count - 1)) * 2;
        const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = goldenAngle * i;
        points.push(
            new THREE.Vector3(
                Math.cos(theta) * radiusAtY * radius,
                y * radius,
                Math.sin(theta) * radiusAtY * radius
            )
        );
    }
    return points;
}

interface GlobeSceneProps {
    skills: GlobeSkill[];
    colors: { foreground: string; primary: string; muted: string };
}

function GlobeScene({ skills, colors }: GlobeSceneProps) {
    const [hovered, setHovered] = useState<number | null>(null);
    const radius = 1.9;
    const positions = useMemo(
        () => fibonacciSphere(Math.max(skills.length, 2), radius),
        [skills.length, radius]
    );
    const hoveredPosition = hovered != null ? positions[hovered] : null;

    return (
        <>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.55}
                rotateSpeed={0.35}
                minPolarAngle={Math.PI / 3.2}
                maxPolarAngle={(Math.PI * 2) / 3.2}
            />

            <group>
                <mesh>
                    <icosahedronGeometry args={[radius, 1]} />
                    <meshBasicMaterial color={colors.foreground} wireframe transparent opacity={0.18} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[radius * 1.06, 0.004, 8, 128]} />
                    <meshBasicMaterial color={colors.primary} transparent opacity={0.5} />
                </mesh>
                <mesh rotation={[0, Math.PI / 2, Math.PI / 2.4]}>
                    <torusGeometry args={[radius * 1.12, 0.003, 8, 128]} />
                    <meshBasicMaterial color={colors.muted} transparent opacity={0.4} />
                </mesh>
                <Sparkles
                    count={70}
                    scale={[radius * 2.7, radius * 2.7, radius * 2.7]}
                    size={1.6}
                    speed={0.35}
                    opacity={0.35}
                    color={colors.muted}
                />
            </group>

            {skills.map((skill, index) => {
                const position = positions[index];
                const active = hovered === index;
                return (
                    <group key={`${skill.name}-${index}`} position={position}>
                        <mesh>
                            <sphereGeometry args={[0.022, 12, 12]} />
                            <meshBasicMaterial
                                color={active ? colors.primary : colors.muted}
                                transparent
                                opacity={active ? 1 : 0.7}
                            />
                        </mesh>
                        <Html center zIndexRange={[30, 0]} wrapperClass="pointer-events-auto">
                            <button
                                type="button"
                                onPointerEnter={() => setHovered(index)}
                                onPointerLeave={() => setHovered(null)}
                                aria-label={skill.name}
                                className={`whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-200 ${
                                    active
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border bg-card/90 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                                }`}
                            >
                                {skill.name}
                            </button>
                        </Html>
                    </group>
                );
            })}

            {hoveredPosition && (
                <Line
                    points={[new THREE.Vector3(0, 0, 0), hoveredPosition]}
                    color={colors.primary}
                    lineWidth={1}
                />
            )}
        </>
    );
}

export default function SkillsGlobe({
    skills,
    className,
}: {
    skills: GlobeSkill[];
    className?: string;
}) {
    const tokens = useSignalTokens();
    const colors = useMemo(
        () => ({ foreground: tokens.foreground, primary: tokens.primary, muted: tokens.muted }),
        [tokens]
    );

    return (
        <div className={className ?? "h-full w-full"}>
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 6.2], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <GlobeScene skills={skills} colors={colors} />
            </Canvas>
        </div>
    );
}