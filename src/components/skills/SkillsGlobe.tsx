/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Preload, Line } from "@react-three/drei";
import * as THREE from "three";
import { allSkills } from "./constants";
import { motion, AnimatePresence } from "framer-motion";

type Skill = typeof allSkills[0];

function SkillNode({ skill, position }: { skill: Skill, position: THREE.Vector3 }) {
    const [hovered, setHovered] = useState(false);

    // Dynamic line points (from center to node position)
    const linePoints = useMemo(() => {
        return [new THREE.Vector3(0, 0, 0), position];
    }, [position]);

    return (
        <group position={position}>
            {/* Connection Line */}
            {hovered ? (
                <Line
                    points={linePoints}
                    color="#3b82f6"
                    lineWidth={2}
                    transparent
                    opacity={0.8}
                    dashed={false}
                />
            ) : (
                <Line
                    points={linePoints}
                    color="#1e293b"
                    lineWidth={1}
                    transparent
                    opacity={0.15}
                />
            )}

            <Html center zIndexRange={[100, 0]}>
                <div
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${hovered ? 'bg-blue-900/80 border-blue-400 scale-125 shadow-[0_4px_20px_rgba(59,130,246,0.3)] z-50' : 'bg-black/60 border-white/10 hover:bg-white/10'}`}>
                        <img src={skill.icon} alt={skill.name} className="w-5 h-5 md:w-6 md:h-6 object-contain pointer-events-none" crossOrigin="anonymous" />
                    </div>

                    {/* Hover Card */}
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute top-14 left-1/2 -translate-x-1/2 w-48 bg-black/80 backdrop-blur-xl border border-blue-500/50 rounded-xl p-4 shadow-[0_4px_20px_rgba(59,130,246,0.2)] pointer-events-none z-50 text-center"
                            >
                                <h4 className="text-white font-bold text-lg mb-1">{skill.name}</h4>
                                <div className="text-blue-400 text-[10px] md:text-xs font-semibold mb-2 uppercase tracking-wider">{skill.level}</div>
                                <p className="text-white/70 text-[10px] md:text-xs leading-relaxed">{skill.description}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Html>
        </group>
    );
}

function Globe() {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Setup skill positions on a sphere using Fibonacci distribution
    const skillNodes = useMemo(() => {
        const nodes = [];
        const radius = 2.6; // slightly outside the base sphere
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < allSkills.length; i++) {
            const y = 1 - (i / (allSkills.length - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            nodes.push({
                skill: allSkills[i],
                position: new THREE.Vector3(x * radius, y * radius, z * radius)
            });
        }
        return nodes;
    }, []);

    // Rotate entire globe
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
            particlesRef.current.rotation.x = clock.getElapsedTime() * 0.01;
        }
    });

    // Generate random particles around a sphere
    const particleCount = 600;

    // Using simple points instead of complex lines for better performance on mobile
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const rBase = 2.2;

        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;

            // Deterministic random based on index
            const rand = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
            const r = rBase + rand * 0.4;

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, [particleCount]);

    return (
        <group>
            {/* The rotating system */}
            <group ref={groupRef}>
                {/* Base Inner Sphere */}
                <Sphere args={[2, 64, 64]}>
                    <meshBasicMaterial color="#0f172a" transparent opacity={0.6} />
                </Sphere>

                {/* Wireframe outer sphere */}
                <Sphere args={[2.01, 32, 32]}>
                    <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.15} />
                </Sphere>

                {/* Nodes on the sphere surface */}
                {skillNodes.map((node, i) => (
                    <SkillNode key={i} skill={node.skill} position={node.position} />
                ))}
            </group>

            {/* Network Particles (rotates differently for parallax) */}
            {positions && (
                <points ref={particlesRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[positions, 3]}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.02}
                        color="#60a5fa"
                        transparent
                        opacity={0.6}
                        sizeAttenuation
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            )}
        </group>
    );
}

export function SkillsGlobe() {
    return (
        <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative pointer-events-auto">
            {/* Ambient glow behind the globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-zinc-800/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="absolute inset-0 cursor-move">
                <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }}>
                    <ambientLight intensity={0.5} />
                    <Globe />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.8}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                    />
                    <Preload all />
                </Canvas>
            </div>
        </div>
    );
}
