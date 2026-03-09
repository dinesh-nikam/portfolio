"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface ParticleImageProps {
    src: string;
}

function Particles({ src }: { src: string }) {
    const texture = useTexture(src) as THREE.Texture;
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const pointsRef = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    const targetHover = useRef(0);
    const targetUv = useRef(new THREE.Vector2(0.5, 0.5));

    // Generate dense grid of particles on the GPU
    const { positions, uvs, aspect } = useMemo(() => {
        // Density of points (150x150 max) -> ~22,500 particles vs former 500,000+
        const width = 180;
        const img = texture.image as HTMLImageElement;
        const aspect = img.width / img.height;
        const height = Math.floor(width / aspect);

        const count = width * height;
        const positions = new Float32Array(count * 3);
        const uvs = new Float32Array(count * 2);

        let i = 0;
        let j = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                positions[i++] = (x / width) - 0.5;
                positions[i++] = (y / height) - 0.5;
                positions[i++] = 0;

                uvs[j++] = x / width;
                uvs[j++] = y / height; // Regular Y for UV in shaders when flipped usually not needed if PlaneGeometry UVs match
            }
        }

        return { positions, uvs, aspect };
    }, [texture]);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHoverUv: { value: new THREE.Vector2(0.5, 0.5) },
        uHoverState: { value: 0 },
        uAspect: { value: aspect }
    }), [texture, aspect]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            materialRef.current.uniforms.uHoverUv.value.lerp(targetUv.current, 0.1);
            materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uHoverState.value,
                targetHover.current,
                0.1
            );
        }

        if (pointsRef.current) {
            pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, state.pointer.x * 0.1, 0.05);
            pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -state.pointer.y * 0.1, 0.05);
        }
    });

    // Determine scale to fit within viewport nicely
    const scale = Math.min(viewport.width * 0.9, viewport.height * 0.9);
    const scaleX = aspect > 1 ? scale : scale * aspect;
    const scaleY = aspect > 1 ? scale / aspect : scale;

    // Added a slight negative X position to shift the entire image a little to the left
    return (
        <group scale={[scaleX, scaleY, 1]} position={[1.1, 0, 0]}>
            <mesh
                visible={false}
                onPointerMove={(e) => {
                    targetHover.current = 1;
                    if (e.uv) targetUv.current.copy(e.uv);
                }}
                onPointerLeave={() => {
                    targetHover.current = 0;
                }}
            >
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial />
            </mesh>

            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-uv"
                        args={[uvs, 2]}
                    />
                </bufferGeometry>
                <shaderMaterial
                    ref={materialRef}
                    transparent={true}
                    depthWrite={false}
                    uniforms={uniforms}
                    vertexShader={`
                        uniform float uTime;
                        uniform vec2 uHoverUv;
                        uniform float uHoverState;
                        uniform float uAspect;
                        
                        varying vec2 vUv;
                        varying float vVisibility;
                        
                        uniform sampler2D uTexture;
                        
                        void main() {
                            vUv = uv;
                            
                            vec4 texColor = texture2D(uTexture, vUv);
                            
                            // Calculate perceived luminance
                            float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
                            
                            // If not hovering, keep visibility high so image looks solid. 
                            // When hovering, drop dark pixels.
                            float particleVisibility = smoothstep(0.01, 0.1, brightness);
                            vVisibility = mix(1.0, particleVisibility, uHoverState);
                            
                            vec3 pos = position;
                            
                            // Aspect-corrected distance for perfect circular hover area
                            vec2 aspectUv = uv * vec2(uAspect, 1.0);
                            vec2 aspectHover = uHoverUv * vec2(uAspect, 1.0);
                            
                            float dist = distance(aspectUv, aspectHover);
                            
                            // Force field calculation (reduced radius for tighter repel)
                            float force = smoothstep(0.15, 0.0, dist) * uHoverState;
                            
                            vec2 dir = uv - uHoverUv;
                            if (length(dir) < 0.0001) dir = vec2(1.0, 0.0);
                            dir = normalize(dir);
                            
                            // Push points inward/outward dynamically (reduced distance)
                            pos.x += dir.x * force * 0.05;
                            pos.y += dir.y * force * 0.05;
                            pos.z += force * 0.1; // Pop out towards camera slightly
                            
                            // Gentle breathing effect ONLY when particles are active (hovered)
                            pos.z += sin(pos.x * 20.0 + uTime * 3.0) * 0.01 * brightness * uHoverState;
                            
                            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                            
                            // Particle size logic
                            // baseSize is tuned to tightly pack the points without overlap blowout
                            float baseSize = 4.0 * (1.0 / -mvPosition.z) * 12.0; 
                            float hoverSize = (4.0 * brightness + 2.0) * (1.0 / -mvPosition.z) * 12.0;
                            
                            gl_PointSize = mix(baseSize, hoverSize, uHoverState);
                            gl_Position = projectionMatrix * mvPosition;
                        }
                    `}
                    fragmentShader={`
                        uniform sampler2D uTexture;
                        uniform float uHoverState;
                        varying vec2 vUv;
                        varying float vVisibility;
                        
                        void main() {
                            if (vVisibility < 0.05) discard;
                            
                            vec2 coord = gl_PointCoord - vec2(0.5);
                            float dist = length(coord);
                            
                            // When uHoverState is 0, render squares (solid image). 
                            // When uHoverState is 1, render circles (dist > 0.5 discarded).
                            float radius = mix(1.0, 0.5, uHoverState);
                            if (dist > radius) discard; 
                            
                            vec4 texColor = texture2D(uTexture, vUv);
                            
                            // Radial alpha mask for soft edges on particles
                            float particleAlpha = 1.0 - smoothstep(0.3, 0.5, dist);
                            float alpha = mix(1.0, particleAlpha, uHoverState);
                            
                            // Color enhancement during particle state
                            vec3 finalColor = mix(texColor.rgb, texColor.rgb * 1.2, uHoverState);
                            
                            gl_FragColor = vec4(finalColor, alpha * texColor.a * vVisibility);
                        }
                    `}
                />
            </points>
        </group>
    );
}

export function ParticleImage({ src }: ParticleImageProps) {
    // Mobile fallback to prevent heavy operations
    if (typeof window !== "undefined" && window.innerWidth < 768) {
        return (
            <div className="w-full h-full flex items-center justify-center opacity-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Hero" className="w-full h-auto object-contain mix-blend-lighten grayscale contrast-125" />
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            >
                <Suspense fallback={null}>
                    <Particles src={src} />
                </Suspense>
            </Canvas>
        </div>
    );
}

