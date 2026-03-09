"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState("");

    useEffect(() => {
        // Feature detect touch devices - disable custom cursor on touch
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        // Hide default cursor
        document.body.style.cursor = 'none';

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Target interactable elements
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover') ||
                target.closest('.cursor-hover')
            ) {
                setIsHovering(true);

                // Optional: Check if the element has data-cursor-text attribute
                const elWithText = target.closest('[data-cursor-text]') as HTMLElement;
                if (elWithText) {
                    setHoverText(elWithText.getAttribute('data-cursor-text') || "");
                } else {
                    setHoverText("");
                }
            } else {
                setIsHovering(false);
                setHoverText("");
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setHoverText("");
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseLeave);
            document.body.style.cursor = 'auto'; // Restore default
        };
    }, []);

    // Minimal dot
    const variants = {
        default: {
            x: mousePosition.x - 4, // Center aligning (size is 8px)
            y: mousePosition.y - 4,
            width: 8,
            height: 8,
            backgroundColor: "var(--foreground)",
            mixBlendMode: "difference" as const,
        },
        hover: {
            x: mousePosition.x - (hoverText ? 40 : 20), // Center aligning
            y: mousePosition.y - (hoverText ? 40 : 20),
            width: hoverText ? 80 : 40,
            height: hoverText ? 80 : 40,
            mixBlendMode: hoverText ? "difference" : "normal",
            backgroundColor: hoverText ? "var(--foreground)" : "rgba(0, 0, 0, 0)",
            border: hoverText ? "none" : "1px solid var(--muted-foreground)",
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center overflow-hidden max-md:hidden"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
                mass: 0.5
            }}
        >
            {/* If hovering and there is text, show a small label inside the cursor */}
            {isHovering && hoverText && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] uppercase font-bold text-background tracking-widest"
                >
                    {hoverText}
                </motion.span>
            )}
        </motion.div>
    );
}
