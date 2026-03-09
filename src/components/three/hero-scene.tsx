"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

const CoreSphere = () => {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.getElapsedTime() * 0.15;
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
            <mesh ref={mesh} scale={2.2}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial
                    color="#8b5cf6"
                    metalness={0.95}
                    roughness={0.05}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    wireframe={true}
                    emissive="#6366f1"
                    emissiveIntensity={0.15}
                />
            </mesh>
        </Float>
    );
};

const OrbitRing = ({ position, color, speed, scale = 0.4 }: {
    position: [number, number, number];
    color: string;
    speed: number;
    scale?: number;
}) => {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.getElapsedTime() * speed;
            mesh.current.rotation.z = state.clock.getElapsedTime() * speed * 0.7;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={mesh} position={position} scale={scale}>
                <torusKnotGeometry args={[1, 0.3, 64, 8, 2, 3]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.85}
                    roughness={0.15}
                    wireframe={true}
                    emissive={color}
                    emissiveIntensity={0.1}
                />
            </mesh>
        </Float>
    );
};

const FloatingParticle = ({ position, color }: {
    position: [number, number, number];
    color: string;
}) => {
    return (
        <Float speed={3} rotationIntensity={0} floatIntensity={3}>
            <mesh position={position}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color={color} />
            </mesh>
        </Float>
    );
};

export function HeroScene() {
    const { theme } = useTheme();
    const isDark = theme === "dark" || theme === "system";

    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }}>
                <ambientLight intensity={isDark ? 0.3 : 0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} color="#e0d4ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
                <pointLight position={[5, 5, -5]} intensity={0.4} color="#06b6d4" />

                <CoreSphere />
                <OrbitRing position={[-4, 2.5, -2]} color="#8b5cf6" speed={0.4} scale={0.35} />
                <OrbitRing position={[4.5, -1.5, -1]} color="#6366f1" speed={0.3} scale={0.3} />
                <OrbitRing position={[-2, -3, -3]} color="#06b6d4" speed={0.5} scale={0.25} />

                {/* Floating particles */}
                <FloatingParticle position={[3, 3, -2]} color="#8b5cf6" />
                <FloatingParticle position={[-3, -2, -1]} color="#6366f1" />
                <FloatingParticle position={[2, -3, -3]} color="#06b6d4" />
                <FloatingParticle position={[-4, 1, -2]} color="#a78bfa" />
                <FloatingParticle position={[1, 4, -4]} color="#818cf8" />

                <ContactShadows position={[0, -3.5, 0]} opacity={0.3} scale={20} blur={2.5} far={4} color="#8b5cf6" />
                <Environment preset={isDark ? "night" : "studio"} />
            </Canvas>
        </div>
    );
}
