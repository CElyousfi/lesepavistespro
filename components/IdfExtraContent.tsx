'use client';

import { CheckCircle, Shield, Clock, Star, MapPin, Leaf } from '@phosphor-icons/react';
import { type IdfDeptContent } from '@/data/idf-extra-content';
import { type IdfTestimonial } from '@/data/idf-testimonials';

interface IdfExtraContentProps {
  deptContent: IdfDeptContent;
  testimonials: IdfTestimonial[];
  service: 'epaviste' | 'rachat';
  locationName: string;
}

export default function IdfExtraContent({
  deptContent,
  testimonials,
  service,
  locationName,
}: IdfExtraContentProps) {
  const isGold = service === 'rachat';
  // Static class maps (Tailwind JIT cannot resolve interpolated names)
  const cls = isGold
    ? { text: 'text-brand-gold', bg10: 'bg-brand-gold/10', bg20: 'bg-brand-gold/20', border20: 'border-brand-gold/20' }
    : { text: 'text-brand-red',  bg10: 'bg-brand-red/10',  bg20: 'bg-brand-red/20',  border20: 'border-brand-red/20'  };

  return (
    <>
      {/* Why Choose Us in IDF */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className={`${cls.text} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
              Expertise locale
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-6 leading-tight tracking-tight">
              Pourquoi choisir Les Épavistes Pro {service === 'epaviste' ? 'pour votre épave' : 'pour vendre votre véhicule'} dans le {deptContent.deptName} ?
            </h2>
            <div className="space-y-6 text-neutral-600 text-base sm:text-lg leading-relaxed">
              <p>{deptContent.whyChoose}</p>
            </div>

            {/* Trust Features */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-200">
                <div className={`w-10 h-10 rounded-lg ${cls.bg10} flex items-center justify-center shrink-0`}>
                  <Clock size={20} weight="fill" className={cls.text} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">Intervention rapide IDF</h3>
                  <p className="text-sm text-neutral-600">Sous 2h en petite couronne, sous 24h en grande couronne. 24h/24, 7j/7.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-200">
                <div className={`w-10 h-10 rounded-lg ${cls.bg10} flex items-center justify-center shrink-0`}>
                  <Shield size={20} weight="fill" className={cls.text} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">Centre VHU agréé</h3>
                  <p className="text-sm text-neutral-600">Partenaire agréé préfecture N° PR9500003D. Certificat de destruction immédiat.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-200">
                <div className={`w-10 h-10 rounded-lg ${cls.bg10} flex items-center justify-center shrink-0`}>
                  <Leaf size={20} weight="fill" className={cls.text} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">Éco-responsable</h3>
                  <p className="text-sm text-neutral-600">95% des matériaux recyclés. Dépollution conforme directive EU 2000/53/CE.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-200">
                <div className={`w-10 h-10 rounded-lg ${cls.bg10} flex items-center justify-center shrink-0`}>
                  <CheckCircle size={20} weight="fill" className={cls.text} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">100% gratuit</h3>
                  <p className="text-sm text-neutral-600">Enlèvement, remorquage, dépollution et destruction sans aucun frais en IDF.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className={`${cls.text} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
              Témoignage terrain
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-6 leading-tight tracking-tight">
              Étude de cas : intervention dans le {deptContent.deptName}
            </h2>
            <div className="bg-brand-surface rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed italic">
                &ldquo;{deptContent.caseStudy}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ZFE & Regulations */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className={`${cls.text} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
              Réglementations 2026
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-6 leading-tight tracking-tight">
              Réglementations et ZFE-m dans le {deptContent.deptName}
            </h2>
            <div className="space-y-6 text-neutral-600 text-base sm:text-lg leading-relaxed">
              <p>{deptContent.regulations}</p>
              <p>{deptContent.localContext}</p>
            </div>
          </div>
        </div>
      </section>

      {/* IDF Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 sm:mb-14">
                <span className={`${cls.text} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
                  Avis clients IDF
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
                  Ce que disent nos clients en {locationName}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {testimonials.slice(0, 6).map((t, i) => (
                  <div key={i} className="bg-brand-surface rounded-2xl p-5 sm:p-6 border border-neutral-200">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={16} weight="fill" className={cls.text} />
                      ))}
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-brand-navy">{t.name}</span>
                      <span className="text-neutral-400">·</span>
                      <span className="text-neutral-500 flex items-center gap-1">
                        <MapPin size={12} weight="fill" />
                        {t.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* IDF FAQ is rendered separately in page component, after CTASection */}
    </>
  );
}
