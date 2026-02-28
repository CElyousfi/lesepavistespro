'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Certificate, Recycle, ArrowRight } from '@phosphor-icons/react';
import ScrollAnimation from './ScrollAnimation';

const VHUCertification = () => {
  return (
    <section className="py-24 md:py-32 bg-brand-surface relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">

          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">
                Certification
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                Centre VHU agréé préfecture
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Votre véhicule est traité dans le strict respect de la réglementation environnementale par notre centre partenaire agréé.
              </p>
            </div>
          </ScrollAnimation>

          {/* Badge + Agrément - Centered hero card */}
          <ScrollAnimation>
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 justify-center">
                <div className="relative w-[180px] h-[100px] shrink-0">
                  <Image
                    src="/images/centre-vhu-agree.jpeg"
                    alt="Centre VHU Agréé - Partenaire avec centre VHU agréé N° PR9500003D"
                    fill
                    sizes="180px"
                    className="rounded-xl object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-2">Partenaire avec centre VHU agréé</h3>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed max-w-md">
                    Destruction légale et écologique de votre véhicule hors d&apos;usage dans un centre agréé par la préfecture.
                  </p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-navy text-white text-sm font-bold">
                    <Certificate size={18} weight="fill" />
                    N° d&apos;agrément : PR9500003D
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* 3 Trust Points - Horizontal grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScrollAnimation delay={0.1}>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 h-full">
                <div className="w-11 h-11 bg-brand-red/10 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck size={22} weight="fill" className="text-brand-red" />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">Agrément préfectoral officiel</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Notre centre partenaire dispose de l&apos;agrément VHU délivré par la préfecture, garantissant un traitement légal et conforme.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 hover:border-brand-gold/20 hover:shadow-md transition-all duration-500 h-full">
                <div className="w-11 h-11 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Recycle size={22} weight="fill" className="text-brand-gold" />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">Recyclage écologique 95%</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Dépollution complète, extraction des déchets dangereux et recyclage de 95% de la masse du véhicule.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.3}>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 h-full">
                <div className="w-11 h-11 bg-brand-red/10 rounded-xl flex items-center justify-center mb-4">
                  <Certificate size={22} weight="fill" className="text-brand-red" />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">Certificat de destruction</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Certificat Cerfa n°14365*01 remis sous 15 jours. Annulation de l&apos;immatriculation dans le SIV.
                </p>
              </div>
            </ScrollAnimation>
          </div>

          {/* CTA */}
          <ScrollAnimation delay={0.4}>
            <div className="mt-10 text-center">
              <Link
                href="/conformite-vhu"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:text-brand-navy transition-colors"
              >
                En savoir plus sur la conformité VHU
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </ScrollAnimation>

        </div>
      </div>
    </section>
  );
};

export default VHUCertification;
