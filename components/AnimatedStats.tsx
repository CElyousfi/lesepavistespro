'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '@phosphor-icons/react';

interface Stat {
  number: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    number: '+250',
    label: 'Clients satisfaits',
    description: 'Plus de 250 clients satisfaits en Île-de-France. Service rapide et professionnel garanti.'
  },
  {
    number: '100%',
    label: 'Gratuit',
    description: 'Enlèvement d\'épave 100% gratuit. Aucun frais caché, certificat de destruction inclus.'
  },
  {
    number: '7j/7',
    label: 'Disponibilité',
    description: 'Disponible 7 jours sur 7 pour répondre à vos besoins. Service client réactif.'
  },
  {
    number: '24h',
    label: 'Intervention',
    description: 'Intervention rapide sous 24-48h partout en Île-de-France. Prise en charge immédiate.'
  }
];

export default function AnimatedStats() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if section is visible in viewport
      const isVisible = rect.top < viewportHeight * 0.8 && rect.bottom > viewportHeight * 0.2;
      
      if (isVisible) {
        // Calculate scroll progress within the visible section
        const sectionTop = rect.top;
        const scrollInSection = viewportHeight * 0.8 - sectionTop;
        const sectionHeight = rect.height;
        const sectionProgress = Math.max(0, Math.min(1, scrollInSection / (sectionHeight * 0.8)));
        
        // Change stat based on scroll progress
        const newIndex = Math.min(
          stats.length - 1,
          Math.floor(sectionProgress * stats.length)
        );
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatStyle = (index: number) => {
    const diff = index - currentIndex;
    const rotation = diff * 25; // Reduced rotation for smoother effect
    const translateY = diff * 60; // Reduced translation for smoother effect
    const scale = diff === 0 ? 1 : Math.max(0.8, 1 - Math.abs(diff) * 0.2);
    const opacity = diff === 0 ? 1 : Math.max(0, 1 - Math.abs(diff) * 0.5);

    return {
      transform: `rotateX(${-rotation}deg) translateY(${translateY}%) translateZ(0px) scale(${scale})`,
      opacity,
      position: index === 0 ? 'relative' : 'absolute',
      inset: index === 0 ? undefined : '0',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    } as React.CSSProperties;
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-neutral-50"
      style={{ minHeight: '100vh' }}
    >
      <div className="container mx-auto px-[5%]">
        <div className="max-w-6xl mx-auto">
          {/* Boxed container with brand navy gradient background */}
          <div className="bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark text-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left side - Label */}
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Nos Chiffres Clés
              </h2>
              <p className="text-lg md:text-xl text-white/80">
                {String(currentIndex + 1).padStart(2, '0')} • {String(stats.length).padStart(2, '0')}
              </p>
            </div>

            {/* Center - Animated Number */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative">
                <div 
                  className="relative bg-white text-brand-red rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
                  style={{
                    width: '280px',
                    height: '280px',
                    perspective: '1000px'
                  }}
                >
                  <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center text-6xl md:text-7xl font-bold transition-all duration-700 ease-out"
                        style={{
                          ...getStatStyle(index),
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        {stat.number}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Description */}
            <div className="lg:col-span-4 relative" style={{ minHeight: '200px' }}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    index === currentIndex ? 'opacity-100 relative' : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none'
                  }`}
                  style={{
                    transform: index === currentIndex ? 'translateY(0)' : 'translateY(10px)',
                  }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    {stat.label}
                  </h3>
                  <p className="text-base md:text-lg text-white/90 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="lg:col-span-12 flex justify-center gap-2 mt-8">
              {stats.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
