'use client';

import { CheckCircle, Clock, Shield, Star, Users, MapPin } from '@phosphor-icons/react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid';
  service?: 'epaviste' | 'rachat';
  className?: string;
}

export default function TrustBadges({ variant = 'horizontal', service = 'epaviste', className = '' }: TrustBadgesProps) {


  const badges = service === 'epaviste' ? [
    { icon: CheckCircle, text: '100% Gratuit', colorClass: 'text-brand-red' },
    { icon: Clock, text: 'Intervention 24-48h', colorClass: 'text-brand-red' },
    { icon: Shield, text: 'Agréé VHU', colorClass: 'text-brand-red' },
    { icon: Star, text: '500+ clients satisfaits', colorClass: 'text-brand-red' },
  ] : [
    { icon: CheckCircle, text: 'Paiement Cash', colorClass: 'text-brand-gold' },
    { icon: Clock, text: 'Estimation Gratuite', colorClass: 'text-brand-gold' },
    { icon: Shield, text: 'Meilleur Prix', colorClass: 'text-brand-gold' },
    { icon: Star, text: '500+ rachats réalisés', colorClass: 'text-brand-gold' },
  ];

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border-2 border-neutral-100 hover:border-neutral-200 transition-all"
          >
            <badge.icon size={32} weight="bold" className={badge.colorClass} />
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
          <badge.icon size={20} weight="bold" className={badge.colorClass} />
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}
