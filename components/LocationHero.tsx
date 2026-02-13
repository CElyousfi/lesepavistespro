'use client';

import React from 'react';

interface LocationHeroProps {
  children: React.ReactNode;
  accentColor?: 'red' | 'gold';
}

const LocationHero = ({ children, accentColor = 'red' }: LocationHeroProps) => {
  const orbColor = accentColor === 'gold' ? 'bg-brand-gold/[0.05]' : 'bg-brand-red/[0.04]';

  return (
    <section className="relative bg-white overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] ${orbColor} rounded-full blur-[120px]`}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
