'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show progress bar only after scrolling down a bit
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50 origin-left"
            style={{ scaleX: scrollYProgress, opacity: isVisible ? 1 : 0 }}
            transition={{ opacity: { duration: 0.2 } }}
        />
    );
}
