"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image as DreiImage } from "@react-three/drei";
import { useSignalTokens } from "@/lib/signal-tokens";

/* "The Archive" — credential specimens cruise a slow gallery orbit. Each
   frame is a matted print: paper backing, scanner image, and a focus veil
   that dims the rest of the collection while one specimen is studied.
   Motes of dust drift through the light below, and a live accession data
   plate under the stage captions whatever is being examined.
   Interaction contract: R3F's onClick cannot be trusted here — the ring
   keeps rotating between press and release, so press/release rarely hit
   the same frame. Instead each frame records press and release through
   R3F pointer handlers, and a release without a significant drag on the
   same frame counts as a click. Native listeners only track drag distance
   and velocity — they never touch R3F's pointer event stream. */

const RING_RADIUS = 3.2;
const FRAME_BASE_Y = 0.1;
const FRAME_W = 1.5;
const FRAME_H = 1.05;
const IMAGE_W = 1.35;
const IMAGE_H = 0.9;

const MOTE_COUNT = 150;
const MOTE_RADIUS_MIN = 1.9;
const MOTE_RADIUS_MAX = 4.7;
const MOTE_Y_MIN = -2.4;
const MOTE_Y_MAX = 2.6;
const MOTE_POSITIONS = new Float32Array(MOTE_COUNT * 3);
const MOTE_VELOCITY = new Float32Array(MOTE_COUNT);
for (let i = 0; i < MOTE_COUNT; i += 1) {
    const radius = MOTE_RADIUS_MIN + Math.random() * (MOTE_RADIUS_MAX - MOTE_RADIUS_MIN);
    const theta = Math.random() * Math.PI * 2;
    MOTE_POSITIONS[i * 3] = Math.cos(theta) * radius;
    MOTE_POSITIONS[i * 3 + 1] = MOTE_Y_MIN + Math.random() * (MOTE_Y_MAX - MOTE_Y_MIN);
    MOTE_POSITIONS[i * 3 + 2] = Math.sin(theta) * radius;
    MOTE_VELOCITY[i] = 0.02 + Math.random() * 0.06;
}

export class CanvasErrorBoundary extends React.Component<{
    children: React.ReactNode;
}, { hasError: boolean }> {
    state: { hasError: boolean } = { hasError: false };

    static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true };
    }

    render(): React.ReactNode {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

export interface WallCert {
    id: string;
    title: string;
    image: string;
    issuer?: string;
    date?: string;
    credentialId?: string;
    category?: string;
    link?: string;
}

interface RingLayout {
    x: number;
    y: number;
    z: number;
    angle: number;
}

function buildLayout(count: number): RingLayout[] {
    const layout: RingLayout[] = [];
    for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2;
        const y = FRAME_BASE_Y + Math.sin(i * 1.7) * 0.22;
        layout.push({
            x: Math.sin(angle) * RING_RADIUS,
            y,
            z: Math.cos(angle) * RING_RADIUS,
            angle,
        });
    }
    return layout;
}

interface RingColors {
    background: string;
    foreground: string;
    primary: string;
    card: string;
    muted: string;
}

interface CertRingProps {
    certs: WallCert[];
    colors: RingColors;
    dragRef: React.RefObject<{ dragging: boolean; velocity: number; moved: number }>;
    hovered: number | null;
    focusIndex: number | null;
    onHoverChange: (index: number | null) => void;
    onPointerDown: (index: number) => void;
    onPointerUp: (index: number) => void;
}

function AmbientDust({ color }: { color: string }) {
    const pointsRef = useRef<THREE.Points | null>(null);
    const materialRef = useRef<THREE.PointsMaterial | null>(null);

    useFrame((state, delta) => {
        if (typeof document !== "undefined" && document.hidden) return;
        const geometry = pointsRef.current?.geometry;
        if (!geometry) return;
        const attribute = geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
        if (!attribute) return;
        const time = state.clock.elapsedTime;
        for (let i = 0; i < MOTE_COUNT; i += 1) {
            const yIndex = i * 3 + 1;
            const rise = MOTE_VELOCITY[i] * (1 + Math.sin(time * 0.4 + i) * 0.25);
            MOTE_POSITIONS[yIndex] += rise * delta;
            if (MOTE_POSITIONS[yIndex] > MOTE_Y_MAX) MOTE_POSITIONS[yIndex] = MOTE_Y_MIN;
        }
        attribute.needsUpdate = true;
        const material = materialRef.current;
        if (material) material.opacity = 0.3 * (0.7 + Math.sin(time * 0.5) * 0.3);
    });

    return (
        <points ref={pointsRef} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[MOTE_POSITIONS, 3]} />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                color={color}
                size={0.024}
                sizeAttenuation
                transparent
                opacity={0.3}
                depthWrite={false}
            />
        </points>
    );
}

/** Normalize an angle into [-PI, PI]. */
function normalizeAngle(angle: number): number {
    return ((angle % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
}

function CertRing({ certs, colors, dragRef, hovered, focusIndex, onHoverChange, onPointerDown, onPointerUp }: CertRingProps) {
    const groupRef = useRef<THREE.Group | null>(null);
    const frameRefs = useRef<(THREE.Group | null)[]>([]);
    const veilRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
    const reducedMotion = useRef(false);
    const layout = useMemo(() => buildLayout(certs.length), [certs.length]);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        reducedMotion.current = query.matches;
        const onChange = (event: MediaQueryListEvent) => {
            reducedMotion.current = event.matches;
        };
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    useFrame((state, delta) => {
        if (typeof document !== "undefined" && document.hidden) return;
        const group = groupRef.current;
        if (!group) return;
        const drag = dragRef.current;
        const time = state.clock.elapsedTime;

        if (reducedMotion.current) {
            if (drag) group.rotation.y = 0;
        } else if (focusIndex != null && focusIndex < layout.length) {
            // Command from the accession rail: bring the focused frame to the
            // front (its world angle toward 0) along the shortest arc.
            const target = layout[focusIndex];
            const worldAngle = group.rotation.y + target.angle;
            const error = normalizeAngle(worldAngle);
            group.rotation.y = THREE.MathUtils.damp(group.rotation.y, group.rotation.y - error, 2.4, delta);
        } else if (drag) {
            if (!drag.dragging) drag.velocity *= Math.pow(0.96, delta * 60);
            group.rotation.y += drag.velocity + delta * (0.05 + Math.sin(time * 0.1) * 0.015);
        }

        const damping = 4.5;
        for (let i = 0; i < frameRefs.current.length; i += 1) {
            const frame = frameRefs.current[i];
            if (!frame) continue;
            const base = layout[i];
            const isHovered = hovered === i;
            const isDimmed = hovered !== null && !isHovered;
            const distance = Math.hypot(base.x, base.z) || 1;
            const push = isHovered ? 0.42 : 0;
            frame.position.x = THREE.MathUtils.damp(frame.position.x, base.x + (base.x / distance) * push, damping, delta);
            frame.position.y = THREE.MathUtils.damp(frame.position.y, base.y + (isHovered ? 0.28 : 0), damping, delta);
            frame.position.z = THREE.MathUtils.damp(frame.position.z, base.z + (base.z / distance) * push, damping, delta);
            const nextScale = THREE.MathUtils.damp(frame.scale.x, isHovered ? 1.12 : 1, damping, delta);
            frame.scale.setScalar(nextScale);
            frame.rotation.x = THREE.MathUtils.damp(frame.rotation.x, isHovered ? -0.07 : 0, damping, delta);
            frame.rotation.y = THREE.MathUtils.damp(frame.rotation.y, base.angle + (isHovered ? -0.1 : 0), damping, delta);
            const veil = veilRefs.current[i];
            if (veil) veil.opacity = THREE.MathUtils.damp(veil.opacity, isDimmed ? 0.42 : 0, damping, delta);
        }
    });

    return (
        <group ref={groupRef}>
            {certs.map((cert, index) => {
                const base = layout[index];
                return (
                    <group
                        key={cert.id}
                        ref={(el) => {
                            frameRefs.current[index] = el;
                        }}
                        position={[base.x, base.y, base.z]}
                        rotation-y={base.angle}
                        onPointerOver={() => onHoverChange(index)}
                        onPointerOut={() => onHoverChange(null)}
                        onPointerDown={(e) => { e.stopPropagation(); onPointerDown(index); }}
                        onPointerUp={(e) => { e.stopPropagation(); onPointerUp(index); }}
                    >
                        <mesh position={[0, 0, -0.025]}>
                            <planeGeometry args={[FRAME_W, FRAME_H]} />
                            <meshBasicMaterial color={colors.card} />
                        </mesh>
                        <DreiImage
                            url={cert.image}
                            transparent
                            toneMapped={false}
                            scale={[IMAGE_W, IMAGE_H]}
                        />
                        <mesh position={[0, 0, 0.012]} raycast={() => null}>
                            <planeGeometry args={[FRAME_W, FRAME_H]} />
                            <meshBasicMaterial
                                ref={(el) => {
                                    veilRefs.current[index] = el;
                                }}
                                color={colors.background}
                                transparent
                                opacity={0}
                                depthWrite={false}
                            />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

export default function Certifications3DWall({
    certs,
    focusIndex,
    onFocusChange,
    onHoverChange,
    onSelect,
}: {
    certs: WallCert[];
    focusIndex: number | null;
    onFocusChange: (index: number | null) => void;
    onHoverChange: (index: number | null) => void;
    onSelect: (image: string) => void;
}) {
    const tokens = useSignalTokens();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef({ dragging: false, velocity: 0, moved: 0 });
    const [hovered, setHovered] = useState<number | null>(null);
    const selectRef = useRef(onSelect);
    const certsRef = useRef(certs);
    const pressedRef = useRef<number | null>(null);

    useEffect(() => {
        selectRef.current = onSelect;
        certsRef.current = certs;
    }, [onSelect, certs]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const drag = dragRef.current;
        let lastX = 0;

        const onDown = (event: PointerEvent) => {
            drag.dragging = true;
            drag.velocity = 0;
            drag.moved = 0;
            lastX = event.clientX;
            onFocusChange(null);
        };
        const onMove = (event: PointerEvent) => {
            if (!drag.dragging) return;
            const dx = event.clientX - lastX;
            lastX = event.clientX;
            drag.moved += Math.abs(dx);
            drag.velocity += dx * 0.004;
        };
        const onUp = () => {
            drag.dragging = false;
        };

        container.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerup", onUp);
        return () => {
            container.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
        // onFocusChange is a stable setter from the parent via callback
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePointerDown = (index: number) => {
        pressedRef.current = index;
    };

    const handlePointerUp = (index: number) => {
        if (pressedRef.current == null) return;
        pressedRef.current = null;
        if (dragRef.current.moved >= 6) return;
        if (index >= 0 && index < certsRef.current.length) {
            const cert = certsRef.current[index];
            if (cert) selectRef.current(cert.image);
        }
    };

    const handleHoverChange = (index: number | null) => {
        setHovered(index);
        onHoverChange(index);
    };

    const colors = useMemo(
        () => ({
            background: tokens.background,
            foreground: tokens.foreground,
            primary: tokens.primary,
            card: tokens.card,
            muted: tokens.muted,
        }),
        [tokens]
    );

    const activeIndex = hovered ?? focusIndex;
    const activeCert = activeIndex != null && activeIndex < certs.length ? certs[activeIndex] : null;

    return (
        <div
            role="group"
            aria-label="The Archive — credential specimens orbiting a gallery. Drag to rotate. Click a frame to zoom."
            className="flex h-full w-full flex-col"
        >
            {/* Vault stage with registration corners and HUD callouts */}
            <div className="relative min-h-0 w-full flex-1">
                <div
                    ref={containerRef}
                    className="absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing"
                >
                    <CanvasErrorBoundary>
                        <Canvas
                            dpr={[1, 1.5]}
                            camera={{ position: [0, 0, 7.4], fov: 45 }}
                            gl={{ antialias: true, alpha: true }}
                        >
                            <AmbientDust color={tokens.muted} />
                            <CertRing
                                certs={certs}
                                colors={colors}
                                dragRef={dragRef}
                                hovered={hovered}
                                focusIndex={focusIndex}
                                onHoverChange={handleHoverChange}
                                onPointerDown={handlePointerDown}
                                onPointerUp={handlePointerUp}
                            />
                        </Canvas>
                    </CanvasErrorBoundary>
                </div>

                {/* Registration marks — the vault window */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                    <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-foreground/25" />
                    <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-foreground/25" />
                    <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-foreground/25" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-foreground/25" />
                </div>

                {/* HUD callouts */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-2 flex items-start justify-between px-6 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35">
                    <span>Vault · The Archive</span>
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/80" />
                        Live
                    </span>
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-2 flex items-end justify-between px-6 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35">
                    <span>Drag to orbit</span>
                    <span>Click to zoom</span>
                </div>
            </div>

            {/* Accession data plate */}
            <div role="status" aria-live="polite" className="mt-5 border-t border-border/80 pt-4">
                <div className="flex items-start gap-4">
                    <div className="shrink-0 font-mono text-3xl leading-none text-primary">
                        {activeIndex != null && activeIndex < certs.length
                            ? `Nº ${String(activeIndex + 1).padStart(2, "0")}`
                            : "Nº --"}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                            {activeCert
                                ? hovered != null
                                    ? "Specimen under examination"
                                    : "Locked — accession at study"
                                : "Collection at rest — drag to orbit, click to zoom"}
                        </p>
                        <h3 className="truncate font-display text-lg tracking-tight text-foreground md:text-xl">
                            {activeCert ? activeCert.title : "The Archive"}
                        </h3>
                        <p className="truncate text-sm font-light text-muted-foreground">
                            {activeCert ? activeCert.issuer : "Industry-recognized credentials · 4 specimens in vault"}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-foreground/45">
                            {activeCert && activeCert.credentialId ? (
                                <span>ID {activeCert.credentialId}</span>
                            ) : null}
                            {activeCert && activeCert.date ? <span>Issued {activeCert.date}</span> : null}
                            {activeCert && activeCert.category ? <span>Focus · {activeCert.category}</span> : null}
                            <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                                <span className="inline-block h-1 w-1 rounded-full bg-primary/70" />
                                {focusIndex != null ? `Locked on Nº ${String(focusIndex + 1).padStart(2, "0")}` : "Auto-orbit"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}