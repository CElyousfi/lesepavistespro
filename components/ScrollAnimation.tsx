'use client';

import { motion, useInView, UseInViewOptions } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollAnimationProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    viewport?: UseInViewOptions;
}

export default function ScrollAnimation({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.5,
    viewport = { once: true, margin: "-10%" }
}: ScrollAnimationProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);

    const getVariants = () => {
        const distance = 50;

        const initial: any = { opacity: 0 };
        if (direction === 'up') initial.y = distance;
        if (direction === 'down') initial.y = -distance;
        if (direction === 'left') initial.x = distance;
        if (direction === 'right') initial.x = -distance;

        const animate: any = { opacity: 1, x: 0, y: 0 };

        return { initial, animate };
    };

    const { initial, animate } = getVariants();

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? animate : initial}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Custom spring-like bezier
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
