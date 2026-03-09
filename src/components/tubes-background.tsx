"use client";
"use no memo";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ───────────────────────────────────────────────
   Curated neon color palettes (cycled on click)
   ─────────────────────────────────────────────── */
const PALETTES = [
    { tubes: ["#f967fb", "#53bc28", "#6958d5", "#00f0ff"], lights: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"] },
    { tubes: ["#00f0ff", "#ff2d95", "#b44aff", "#39ff14"], lights: ["#00f0ff", "#ff2d95", "#ffcc00", "#44ff88"] },
    { tubes: ["#ff6b35", "#00e5a0", "#845ef7", "#fe53bb"], lights: ["#ff6b35", "#00e5a0", "#ffd93d", "#845ef7"] },
    { tubes: ["#08f7fe", "#fe53bb", "#09fbd3", "#f5d300"], lights: ["#08f7fe", "#f5d300", "#fe53bb", "#09fbd3"] },
    { tubes: ["#ff1493", "#39ff14", "#bf00ff", "#00bfff"], lights: ["#ff1493", "#ffae00", "#39ff14", "#00bfff"] },
    { tubes: ["#ffdd00", "#ff006e", "#8338ec", "#3a86ff"], lights: ["#ffdd00", "#ff006e", "#3a86ff", "#8338ec"] },
    { tubes: ["#00ff87", "#7b2ff7", "#ff2281", "#ffe100"], lights: ["#00ff87", "#ffe100", "#7b2ff7", "#ff2281"] },
    { tubes: ["#ff9a00", "#00d4ff", "#ff0058", "#50fa7b"], lights: ["#50fa7b", "#ff9a00", "#00d4ff", "#ff79c6"] },
];

/* Per-tube config — 12 tubes for dense visual coverage */
const TUBE_CONFIGS = [
    { radius: 0.12, speed: 0.40, amplitude: 2.2, depth: 1.0 },
    { radius: 0.18, speed: 0.33, amplitude: 2.6, depth: 1.8 },
    { radius: 0.10, speed: 0.50, amplitude: 3.0, depth: 0.6 },
    { radius: 0.15, speed: 0.42, amplitude: 1.9, depth: 2.4 },
    { radius: 0.08, speed: 0.55, amplitude: 2.8, depth: 1.4 },
    { radius: 0.20, speed: 0.30, amplitude: 2.0, depth: 2.0 },
    { radius: 0.11, speed: 0.48, amplitude: 3.4, depth: 0.8 },
    { radius: 0.16, speed: 0.36, amplitude: 2.4, depth: 2.6 },
    { radius: 0.09, speed: 0.52, amplitude: 2.6, depth: 1.2 },
    { radius: 0.14, speed: 0.44, amplitude: 1.8, depth: 1.6 },
    { radius: 0.13, speed: 0.38, amplitude: 3.2, depth: 2.2 },
    { radius: 0.17, speed: 0.46, amplitude: 2.1, depth: 0.4 },
];

const CURVE_POINTS = 7;
const TUBULAR_SEGMENTS = 48;
const RADIAL_SEGMENTS = 8;

/* ───────────────────────────────────────────────
   Types
   ─────────────────────────────────────────────── */
interface TubeState {
    mesh: THREE.Mesh;
    material: THREE.MeshBasicMaterial;
    points: THREE.Vector3[];
    targetPoints: THREE.Vector3[];
    targetColor: THREE.Color;
    seed: number;
    config: (typeof TUBE_CONFIGS)[number];
}

/* ───────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────── */
export function TubesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const check = () => setIsMobile(window.innerWidth < 480);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    /* ── Main Three.js lifecycle ─────────────── */
    useEffect(() => {
        if (!mounted || isMobile || !canvasRef.current) return;

        const canvas = canvasRef.current;
        let destroyed = false;

        // ─── Scene ───
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.set(0, 0, 6);

        // ─── Renderer (uses the React-managed canvas ref directly) ───
        let renderer: THREE.WebGLRenderer | null = null;
        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
        } catch {
            console.warn("TubesBackground: WebGL not available");
            return;
        }

        // Handle WebGL context loss gracefully
        const onContextLost = (e: Event) => {
            e.preventDefault();
            console.warn("TubesBackground: WebGL context lost — pausing render");
        };
        const onContextRestored = () => {
            console.log("TubesBackground: WebGL context restored");
        };
        canvas.addEventListener("webglcontextlost", onContextLost);
        canvas.addEventListener("webglcontextrestored", onContextRestored);

        // ─── Cursor ───
        const cursor = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
        const onMouseMove = (e: MouseEvent) => {
            cursor.tx = e.clientX / window.innerWidth;
            cursor.ty = e.clientY / window.innerHeight;
        };
        window.addEventListener("mousemove", onMouseMove);

        // ─── Create tubes ───
        const palette = PALETTES[0];
        const tubes: TubeState[] = [];

        for (let i = 0; i < TUBE_CONFIGS.length; i++) {
            const cfg = TUBE_CONFIGS[i];
            const seed = i * 1.7 + 0.3;

            const points: THREE.Vector3[] = [];
            const targets: THREE.Vector3[] = [];
            for (let j = 0; j < CURVE_POINTS; j++) {
                const t = j / (CURVE_POINTS - 1);
                const x = (t - 0.5) * 12;
                const y = Math.sin(t * Math.PI + seed) * cfg.amplitude;
                const z = -cfg.depth + Math.cos(t * Math.PI * 0.5 + seed) * 1.5;
                points.push(new THREE.Vector3(x, y, z));
                targets.push(new THREE.Vector3(x, y, z));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            const geometry = new THREE.TubeGeometry(curve, TUBULAR_SEGMENTS, cfg.radius, RADIAL_SEGMENTS, false);
            const color = new THREE.Color(palette.tubes[i % palette.tubes.length]);
            const material = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            tubes.push({ mesh, material, points, targetPoints: targets, targetColor: color.clone(), seed, config: cfg });
        }

        // ─── Lighting ───
        scene.add(new THREE.AmbientLight(0x222222, 0.5));

        const lightAnchors = [
            new THREE.Vector3(-5, 3, 3),
            new THREE.Vector3(5, -2, 4),
            new THREE.Vector3(0, 4, 2),
            new THREE.Vector3(-3, -4, 5),
        ];
        const pointLights: THREE.PointLight[] = [];
        const targetLightColors: THREE.Color[] = [];

        for (let i = 0; i < 4; i++) {
            const c = new THREE.Color(palette.lights[i]);
            const light = new THREE.PointLight(c, 200, 30);
            light.position.copy(lightAnchors[i]);
            scene.add(light);
            pointLights.push(light);
            targetLightColors.push(c.clone());
        }

        // ─── Click → cycle palette ───
        let paletteIdx = 0;
        const onBodyClick = () => {
            paletteIdx = (paletteIdx + 1) % PALETTES.length;
            const p = PALETTES[paletteIdx];
            tubes.forEach((t, i) => t.targetColor.set(p.tubes[i % p.tubes.length]));
            targetLightColors.forEach((c, i) => c.set(p.lights[i % p.lights.length]));
        };
        document.body.addEventListener("click", onBodyClick);

        // ─── Animation ───
        const startTime = performance.now();
        let rafId = 0;

        const animate = () => {
            if (destroyed) return;
            rafId = requestAnimationFrame(animate);

            // Skip render if context is lost
            const gl = renderer!.getContext();
            if (!gl || gl.isContextLost()) return;

            const time = (performance.now() - startTime) / 1000;

            // Smooth cursor
            cursor.x += (cursor.tx - cursor.x) * 0.04;
            cursor.y += (cursor.ty - cursor.y) * 0.04;
            const cursorX = (cursor.x - 0.5) * 10;
            const cursorY = -(cursor.y - 0.5) * 8;

            // Update tubes
            for (let i = 0; i < tubes.length; i++) {
                const tube = tubes[i];
                const { seed, config } = tube;

                for (let j = 0; j < CURVE_POINTS; j++) {
                    const t = j / (CURVE_POINTS - 1);

                    const bx = (t - 0.5) * 12;
                    const by =
                        Math.sin(t * Math.PI * 2 + time * config.speed + seed * 2) * config.amplitude * 0.8 +
                        Math.cos(t * Math.PI * 1.3 + time * config.speed * 0.7 + seed * 1.5) * config.amplitude * 0.4;
                    const bz = Math.cos(t * Math.PI + time * 0.35 + seed * 3) * 1.5 - config.depth;

                    // Cursor attraction
                    const dx = cursorX - bx;
                    const dy = cursorY - by;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const pull = Math.exp(-dist * 0.13) * 2.8;

                    tube.targetPoints[j].set(bx + dx * pull * 0.22, by + dy * pull * 0.22, bz + pull * 0.25);
                }

                // Elastic lerp
                for (let j = 0; j < CURVE_POINTS; j++) {
                    tube.points[j].lerp(tube.targetPoints[j], 0.055);
                }

                // Update tube geometry without causing WebGL buffer destruction
                const curve = new THREE.CatmullRomCurve3(tube.points);
                const tempGeo = new THREE.TubeGeometry(curve, TUBULAR_SEGMENTS, config.radius, RADIAL_SEGMENTS, false);

                const posAttribute = tube.mesh.geometry.attributes.position;
                const normAttribute = tube.mesh.geometry.attributes.normal;

                (posAttribute.array as Float32Array).set(tempGeo.attributes.position.array);
                (normAttribute.array as Float32Array).set(tempGeo.attributes.normal.array);

                posAttribute.needsUpdate = true;
                normAttribute.needsUpdate = true;

                tempGeo.dispose();

                // Smooth color transition
                tube.material.color.lerp(tube.targetColor, 0.035);
            }

            // Drift lights
            for (let i = 0; i < pointLights.length; i++) {
                const a = lightAnchors[i];
                pointLights[i].position.set(
                    a.x + Math.sin(time * 0.45 + i * 1.2) * 1.8,
                    a.y + Math.cos(time * 0.35 + i * 0.9) * 1.2,
                    a.z
                );
                pointLights[i].color.lerp(targetLightColors[i], 0.035);
            }

            renderer!.render(scene, camera);
        };

        animate();

        // ─── Resize ───
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer?.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        // ─── Cleanup ───
        return () => {
            destroyed = true;
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            document.body.removeEventListener("click", onBodyClick);
            canvas.removeEventListener("webglcontextlost", onContextLost);
            canvas.removeEventListener("webglcontextrestored", onContextRestored);

            tubes.forEach((t) => {
                t.mesh.geometry.dispose();
                t.material.dispose();
                scene.remove(t.mesh);
            });
            pointLights.forEach((l) => scene.remove(l));

            renderer?.dispose();
            renderer = null;
        };
    }, [mounted, isMobile]);

    if (!mounted) return null;

    if (isMobile) {
        return <div aria-hidden="true" className="tubes-mobile-fallback" />;
    }

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            id="tubes-background-canvas"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
}
