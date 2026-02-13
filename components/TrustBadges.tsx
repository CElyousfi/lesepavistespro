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
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all"
          >
            <badge.icon size={28} className={`${badge.colorClass} sm:w-8 sm:h-8`} weight="fill" />
            <span className="text-sm font-semibold text-brand-navy text-center">{badge.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm border-t border-neutral-200 pt-6 sm:pt-8 ${className}`}>
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <badge.icon size={22} weight="fill" className={badge.colorClass} />
          <span className="font-semibold text-neutral-700">{badge.text}</span>
        </div>
      ))}
    </div>
  );
}
