'use client';

import { CheckCircle, Clock, Shield, Star, Users, MapPin } from '@phosphor-icons/react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid';
  service?: 'epaviste' | 'rachat';
  className?: string;
}

export default function TrustBadges({ variant = 'horizontal', service = 'epaviste', className = '' }: TrustBadgesProps) {
  const color = service === 'epaviste' ? 'brand-red' : 'brand-gold';
  
  const badges = service === 'epaviste' ? [
    { icon: CheckCircle, text: '100% Gratuit' },
    { icon: Clock, text: 'Intervention 24-48h' },
    { icon: Shield, text: 'Agréé VHU' },
    { icon: Star, text: '500+ clients satisfaits' },
  ] : [
    { icon: CheckCircle, text: 'Paiement Cash' },
    { icon: Clock, text: 'Estimation Gratuite' },
    { icon: Shield, text: 'Meilleur Prix' },
    { icon: Star, text: '500+ rachats réalisés' },
  ];

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div 
            key={index}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border-2 border-neutral-100 hover:border-neutral-200 transition-all"
          >
            <badge.icon size={32} weight="bold" className={`text-${color}`} />
            <span className="text-sm font-semibold text-neutral-900 text-center">{badge.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-6 text-sm ${className}`}>
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <badge.icon size={20} weight="bold" className={`text-${color}`} />
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}
