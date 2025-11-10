'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const animationClass = `animate-${animation}`;
  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className} ${isVisible ? `${animationClass} ${delayClass}` : 'opacity-0'}`}
      style={{ willChange: isVisible ? 'auto' : 'opacity, transform' }}
    >
      {children}
    </section>
  );
}
