"use client";
"use no memo";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, Text, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { certificationsData } from "@/lib/data";

class CanvasErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback || <div className="text-white">Failed to load 3D Gallery.</div>;
        }
        return this.props.children;
    }
}

interface CertificateFrameProps {
    cert: typeof certificationsData[0];
    index: number;
    total: number;
    radius: number;
    onSelect: (image: string) => void;
}

function CertificateFrame({ cert, index, total, radius, onSelect }: CertificateFrameProps) {
    const group = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const angle = (index / total) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    // Use smoothly animated target values for hover effects
    useFrame((state, delta) => {
        if (!group.current) return;

        // When hovered, move slightly out from the center
        const targetRadius = hovered ? radius + 0.6 : radius;
        const targetX = Math.sin(angle) * targetRadius;
        const targetZ = Math.cos(angle) * targetRadius;
        const targetY = hovered ? 0.3 : 0;

        group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 5, delta);
        group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 5, delta);
        group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 5, delta);

        // Tilt slightly upwards on hover for a premium feel
        const targetRotX = hovered ? -0.08 : 0;
        group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 5, delta);
    });

    useCursor(hovered);

    return (
        <group
            ref={group}
            position={[x, 0, z]}
            rotation={[0, angle, 0]} // Face outward initially
        >
            <group
                // Face towards the outside of the ring (camera is outside looking in)
                rotation={[0, Math.PI, 0]}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(cert.image);
                }}
            >
                {/* Frame Background / Glass Panel */}
                <mesh position={[0, 0, -0.05]}>
                    <boxGeometry args={[4, 3, 0.1]} />
                    <meshStandardMaterial
                        color={hovered ? "#222222" : "#111111"}
                        roughness={0.1}
                        metalness={0.9}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Glow Border (visible on hover) */}
                <mesh position={[0, 0, -0.06]}>
                    <boxGeometry args={[4.1, 3.1, 0.05]} />
                    <meshBasicMaterial
                        color={hovered ? "#555555" : "#000000"}
                        transparent
                        opacity={hovered ? 0.4 : 0}
                    />
                </mesh>

                {/* Certificate Image - Loaded via Suspense */}
                <Image
                    url={cert.image}
                    transparent
                    opacity={1}
                    position={[0, 0.3, 0.01]}
                    scale={[3.6, 2.2]}
                />

                {/* Title */}
                <Text
                    position={[-1.8, -1.0, 0.01]}
                    fontSize={0.16}
                    color="#ffffff"
                    anchorX="left"
                    anchorY="middle"
                    maxWidth={3.6}
                // Removed the missing local font dependency causing the suspense to hang.
                // Drei will fallback to a robust system font automatically.
                >
                    {cert.title}
                </Text>

                {/* Issuer */}
                <Text
                    position={[-1.8, -1.3, 0.01]}
                    fontSize={0.12}
                    color="#a1a1aa" // text-muted-foreground
                    anchorX="left"
                    anchorY="middle"
                >
                    {`Issued by ${cert.issuer}`}
                </Text>

                {/* Date */}
                <Text
                    position={[1.8, -1.3, 0.01]}
                    fontSize={0.10}
                    color="#71717a"
                    anchorX="right"
                    anchorY="middle"
                >
                    {cert.date}
                </Text>
            </group>
        </group>
    );
}

function Carousel({ radius = 6, onSelect }: { radius?: number, onSelect: (image: string) => void }) {
    const carouselRef = useRef<THREE.Group>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Maintain momentum state
    const rotationVelocity = useRef(0);
    const lastPointerX = useRef(0);
    const lastTime = useRef(0);

    const certs = certificationsData;

    useFrame((state, delta) => {
        if (!carouselRef.current) return;

        // If not dragging, apply inertia and slow ambient rotation
        if (!isDragging) {
            // Apply friction to velocity
            rotationVelocity.current *= 0.95;

            // Add a constant slow base rotation
            const baseRotationSpeed = -0.05;
            const currentSpeed = rotationVelocity.current + baseRotationSpeed;

            carouselRef.current.rotation.y += currentSpeed * delta;
        }
    });

    const handlePointerDown = (e: any) => {
        e.stopPropagation();
        setIsDragging(true);
        lastPointerX.current = e.clientX;
        lastTime.current = performance.now();
        rotationVelocity.current = 0; // Reset velocity on grab
    };

    const handlePointerMove = (e: any) => {
        if (!isDragging || !carouselRef.current) return;
        e.stopPropagation();

        const currentX = e.clientX;
        const currentTime = performance.now();

        const deltaX = currentX - lastPointerX.current;
        const dt = Math.max(1, currentTime - lastTime.current);

        // Calculate instantaneous velocity (pixels per ms, scaled)
        rotationVelocity.current = (deltaX / dt) * 0.5;

        // Apply direct rotation during drag
        carouselRef.current.rotation.y += deltaX * 0.005;

        lastPointerX.current = currentX;
        lastTime.current = currentTime;
    };

    const handlePointerUp = (e: any) => {
        e.stopPropagation();
        setIsDragging(false);
    };

    return (
        <group
            ref={carouselRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            {certs.map((cert, i) => (
                <CertificateFrame
                    key={cert.id}
                    cert={cert}
                    index={i}
                    total={certs.length}
                    radius={radius}
                    onSelect={onSelect}
                />
            ))}
        </group>
    );
}

export function Certifications3DWall({ onSelectCert }: { onSelectCert: (image: string) => void }) {
    return (
        <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
            <CanvasErrorBoundary fallback={
                <div className="w-full h-full flex flex-col items-center justify-center border border-white/10 rounded-2xl bg-white/5">
                    <p className="text-muted-foreground">3D Gallery could not be loaded on this device.</p>
                </div>
            }>
                <Canvas camera={{ position: [0, 0.5, 9], fov: 45 }}>
                    <color attach="background" args={["#000000"]} />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[0, 10, 10]} intensity={2} penumbra={1} angle={0.5} />
                    <spotLight position={[0, -10, 10]} intensity={1} penumbra={1} angle={0.5} color="#4a4a4a" />

                    {/* Fog for depth effect smoothing out the background */}
                    <fog attach="fog" args={["#000000", 5, 20]} />

                    {/* Proper Suspense Boundary! This is critical for nested async useLoaders (Image/Text) */}
                    <Suspense fallback={null}>
                        <Carousel radius={5} onSelect={onSelectCert} />
                    </Suspense>
                </Canvas>
            </CanvasErrorBoundary>
        </div>
    );
}
