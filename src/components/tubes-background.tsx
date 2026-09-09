"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useCapable } from "@/hooks/use-capable";
import { useSignalTokens, type SignalTokens } from "@/lib/signal-tokens";

const TUBE_COUNT = 4;
const SPECK_COUNT = 110;

interface TubeRibbon {
    mesh: THREE.Mesh<THREE.TubeGeometry, THREE.MeshBasicMaterial>;
    phase: number;
    baseY: number;
}

interface ManagedMaterial {
    material: THREE.MeshBasicMaterial | THREE.PointsMaterial;
    kind: "ink" | "accent" | "speck";
}

/* "Ink Currents" — token-styled flowing tubes replacing the legacy neon
   click-cycle. Drift is driven purely by the GSAP ticker so the whole page
   shares a single animation clock with the cursor and preloader. */
export default function TubesBackground() {
    const { capable } = useCapable();
    const tokens = useSignalTokens();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const materialsRef = useRef<ManagedMaterial[]>([]);
    const tokensRef = useRef<SignalTokens>(tokens);

    useEffect(() => {
        tokensRef.current = tokens;
    }, [tokens]);

    useEffect(() => {
        if (!capable) return;
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 9;

        const group = new THREE.Group();
        scene.add(group);

        const ribbons: TubeRibbon[] = [];
        for (let i = 0; i < TUBE_COUNT; i++) {
            const radius = 0.22 + Math.random() * 0.38;
            const points: THREE.Vector3[] = [];
            const segments = 5;
            const spread = 6;
            for (let s = 0; s <= segments; s++) {
                const t = s / segments;
                points.push(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * spread,
                        (t - 0.5) * 12,
                        (Math.random() - 0.5) * spread * 0.6
                    )
                );
            }
            const curve = new THREE.CatmullRomCurve3(points);
            const geometry = new THREE.TubeGeometry(curve, 40, radius, 6, false);
            const isAccent = i === TUBE_COUNT - 1;
            const material = new THREE.MeshBasicMaterial({
                color: isAccent
                    ? new THREE.Color(tokensRef.current.primary)
                    : new THREE.Color(tokensRef.current.foreground),
                transparent: true,
                opacity: isAccent ? 0.09 : 0.05,
                side: THREE.DoubleSide,
                depthWrite: false,
            });
            materialsRef.current.push({
                material,
                kind: isAccent ? "accent" : "ink",
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 3;
            group.add(mesh);
            ribbons.push({
                mesh,
                phase: Math.random() * Math.PI * 2,
                baseY: mesh.position.y,
            });
        }

        const speckPositions = new Float32Array(SPECK_COUNT * 3);
        for (let i = 0; i < SPECK_COUNT; i++) {
            speckPositions[i * 3] = (Math.random() - 0.5) * 12;
            speckPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
            speckPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
        const speckGeometry = new THREE.BufferGeometry();
        speckGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(speckPositions, 3)
        );
        const speckMaterial = new THREE.PointsMaterial({
            color: new THREE.Color(tokensRef.current.muted),
            transparent: true,
            opacity: 0.3,
            size: 0.035,
            sizeAttenuation: true,
            depthWrite: false,
        });
        materialsRef.current.push({ material: speckMaterial, kind: "speck" });
        const specks = new THREE.Points(speckGeometry, speckMaterial);
        group.add(specks);

        const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
        const velocity = { current: 0, target: 0 };
        let lastScrollY = window.scrollY;

        const onScroll = () => {
            const delta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            velocity.target = Math.max(-1.4, Math.min(1.4, delta * 0.02));
        };
        const onPointerMove = (event: PointerEvent) => {
            parallax.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
            parallax.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
        };

        const clock = new THREE.Clock();
        const loop = () => {
            const dt = Math.min(clock.getDelta(), 0.05);
            const time = clock.elapsedTime;

            velocity.current += (velocity.target - velocity.current) * 0.06 * (dt * 60);
            velocity.target *= 0.94;
            parallax.x += (parallax.targetX - parallax.x) * 0.05 * (dt * 60);
            parallax.y += (parallax.targetY - parallax.y) * 0.05 * (dt * 60);

            group.rotation.y = parallax.x * 0.16 + velocity.current * 0.6;
            group.rotation.x = -parallax.y * 0.1;

            for (let i = 0; i < ribbons.length; i++) {
                const ribbon = ribbons[i];
                ribbon.mesh.position.y =
                    ribbon.baseY + Math.sin(time * 0.25 + ribbon.phase) * 0.4;
                ribbon.mesh.rotation.z =
                    Math.sin(time * 0.18 + ribbon.phase * 1.7) * 0.09;
            }

            renderer.render(scene, camera);
        };

        const onVisibilityChange = () => {
            if (document.hidden) {
                gsap.ticker.remove(loop);
            } else {
                clock.getDelta();
                gsap.ticker.add(loop);
            }
        };

        const resize = () => {
            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.addEventListener("visibilitychange", onVisibilityChange);
        gsap.ticker.add(loop);

        return () => {
            gsap.ticker.remove(loop);
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            ribbons.forEach((ribbon) => ribbon.mesh.geometry.dispose());
            speckGeometry.dispose();
            materialsRef.current.forEach(({ material }) => material.dispose());
            materialsRef.current = [];
            renderer.dispose();
        };
    }, [capable]);

    useEffect(() => {
        materialsRef.current.forEach(({ material, kind }) => {
            if (material instanceof THREE.MeshBasicMaterial) {
                material.color.set(
                    kind === "accent" ? tokens.primary : tokens.foreground
                );
            } else {
                material.color.set(tokens.muted);
            }
        });
    }, [tokens]);

    if (!capable) return null;

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 -z-10"
            aria-hidden="true"
        >
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
    );
}