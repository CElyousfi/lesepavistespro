'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Truck, CurrencyEur, ArrowUpRight, Check } from '@phosphor-icons/react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServiceSelectorProps {
  className?: string;
}

export default function ServiceSelector({ className = '' }: ServiceSelectorProps) {
  const card1 = useScrollAnimation({ threshold: 0.2 });
  const card2 = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Épaviste Service Card */}
      <Link
        href="/epaviste"
        ref={card1.ref as any}
        className={`bg-service-purple rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative group hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-red/20 hover-lift ${
          card1.isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* Top row: Icon and Arrow */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
            <Truck size={28} weight="bold" className="text-brand-navy" />
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:bg-brand-red group-hover:text-white">
            <ArrowUpRight size={20} weight="bold" className="transition-colors" />
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">
            Enlèvement d'Épave Gratuit
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            Service 100% gratuit pour tous types de véhicules : voitures, motos, scooters, utilitaires. 
            Intervention rapide 7j/7 dans toute l'Île-de-France.
          </p>
        </div>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-3">
          <ul className="space-y-2 flex-1 w-full">
            <li className="flex items-center gap-2 text-neutral-700">
              <Check size={20} weight="bold" className="text-brand-red flex-shrink-0" />
              <span className="text-sm">Enlèvement 100% gratuit</span>
            </li>
            <li className="flex items-center gap-2 text-neutral-700">
              <Check size={20} weight="bold" className="text-brand-red flex-shrink-0" />
              <span className="text-sm">Intervention sous 24-48h</span>
            </li>
            <li className="flex items-center gap-2 text-neutral-700">
              <Check size={20} weight="bold" className="text-brand-red flex-shrink-0" />
              <span className="text-sm">Certificat VHU fourni</span>
            </li>
          </ul>
          
          {/* Épaviste Illustration */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex-shrink-0 relative">
            <Image
              src="/services/epaviste.png"
              alt="Service d'enlèvement d'épave"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Link>

      {/* Rachat Service Card */}
      <Link
        href="/rachat-voiture"
        ref={card2.ref as any}
        className={`bg-service-blue rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative group hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-gold/20 hover-lift ${
          card2.isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'
        }`}
      >
        {/* Top row: Icon and Arrow */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
            <CurrencyEur size={28} weight="bold" className="text-brand-navy" />
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:bg-brand-gold group-hover:text-white">
            <ArrowUpRight size={20} weight="bold" className="transition-colors" />
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">
            Rachat de Voiture Cash
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            Nous rachetons votre véhicule HS, accidenté ou en panne au meilleur prix. 
            Paiement immédiat par chèque, espèces ou virement.
          </p>
        </div>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-3">
          <ul className="space-y-2 flex-1 w-full">
            <li className="flex items-center gap-2 text-neutral-700">
              <Check size={20} weight="bold" className="text-brand-gold flex-shrink-0" />
              <span className="text-sm">Paiement cash immédiat</span>
            </li>
            <li className="flex items-center gap-2 text-neutral-700">
              <Check size={20} weight="bold" className="text-brand-gold flex-shrink-0" />
              <span className="text-sm">Meilleur prix garanti</span>
            </li>
            <li className="flex items-center gap-2 text-neutral-700">
              <Check size={20} weight="bold" className="text-brand-gold flex-shrink-0" />
              <span className="text-sm">Estimation gratuite</span>
            </li>
          </ul>
          
          {/* Rachat Illustration */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex-shrink-0 relative">
            <Image
              src="/services/rachat.png"
              alt="Service de rachat de voiture"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
