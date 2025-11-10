'use client';

import { Icon } from '@phosphor-icons/react';
import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: Icon;
  title: string;
  description: string;
  color?: 'red' | 'orange' | 'blue';
  className?: string;
}

export default function ServiceCard({ 
  icon: IconComponent, 
  title, 
  description, 
  color = 'red',
  className = '' 
}: ServiceCardProps) {
  const colorClasses = {
    red: 'bg-brand-red/10 text-brand-red',
    orange: 'bg-brand-gold/10 text-brand-gold',
    blue: 'bg-brand-blue/10 text-brand-blue',
  };

  return (
    <div className={`bg-white p-6 rounded-2xl border-2 border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all group ${className}`}>
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <IconComponent size={24} weight="bold" />
      </div>
      <h3 className="font-bold text-neutral-900 mb-2 text-lg">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}
