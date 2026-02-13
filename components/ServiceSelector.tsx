'use client';

import Link from 'next/link';
import { Truck, CurrencyEur, ArrowRight, CheckCircle } from '@phosphor-icons/react';

interface ServiceSelectorProps {
  className?: string;
}

export default function ServiceSelector({ className = '' }: ServiceSelectorProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {/* Épaviste Service Card */}
      <Link href="/epaviste" className="group">
        <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 hover:border-brand-red/30 hover:shadow-lg transition-all duration-500 h-full">
          <div className="absolute inset-0 rounded-2xl bg-brand-red/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-8 group-hover:bg-brand-red/20 transition-colors">
              <Truck size={28} weight="bold" className="text-brand-red" />
            </div>

            <h3 className="text-2xl font-bold text-brand-navy mb-3 tracking-tight">
              Enlèvement d&apos;Épave
            </h3>

            <p className="text-neutral-600 mb-8 leading-relaxed">
              Service 100% gratuit pour tous véhicules. Intervention rapide sous 24h et remise immédiate du certificat de destruction.
            </p>

            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-neutral-700 text-sm">
                <CheckCircle size={18} weight="fill" className="text-brand-red flex-shrink-0" />
                <span>100% Gratuit &amp; Agréé VHU</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-700 text-sm">
                <CheckCircle size={18} weight="fill" className="text-brand-red flex-shrink-0" />
                <span>Tous véhicules acceptés</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-700 text-sm">
                <CheckCircle size={18} weight="fill" className="text-brand-red flex-shrink-0" />
                <span>Démarches administratives incluses</span>
              </li>
            </ul>

            <div className="flex items-center gap-2 text-brand-red font-semibold text-sm group-hover:gap-3 transition-all">
              En savoir plus
              <ArrowRight size={16} weight="bold" />
            </div>
          </div>
        </div>
      </Link>

      {/* Rachat Service Card */}
      <Link href="/rachat-voiture" className="group">
        <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 hover:border-brand-gold/30 hover:shadow-lg transition-all duration-500 h-full">
          <div className="absolute inset-0 rounded-2xl bg-brand-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-8 group-hover:bg-brand-gold/20 transition-colors">
              <CurrencyEur size={28} weight="bold" className="text-brand-gold" />
            </div>

            <h3 className="text-2xl font-bold text-brand-navy mb-3 tracking-tight">
              Rachat Cash
            </h3>

            <p className="text-neutral-600 mb-8 leading-relaxed">
              Nous rachetons votre véhicule au meilleur prix, qu&apos;il soit roulant, en panne ou accidenté. Paiement immédiat.
            </p>

            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-neutral-700 text-sm">
                <CheckCircle size={18} weight="fill" className="text-brand-gold flex-shrink-0" />
                <span>Paiement Cash / Virement</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-700 text-sm">
                <CheckCircle size={18} weight="fill" className="text-brand-gold flex-shrink-0" />
                <span>Estimation en ligne gratuite</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-700 text-sm">
                <CheckCircle size={18} weight="fill" className="text-brand-gold flex-shrink-0" />
                <span>Reprise immédiate</span>
              </li>
            </ul>

            <div className="flex items-center gap-2 text-brand-gold font-semibold text-sm group-hover:gap-3 transition-all">
              Estimer mon véhicule
              <ArrowRight size={16} weight="bold" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
