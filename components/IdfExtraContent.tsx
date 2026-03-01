'use client';

import { CheckCircle, Shield, Clock, Star, MapPin, Certificate, Leaf, CaretDown, Phone, WhatsappLogo } from '@phosphor-icons/react';
import { useState } from 'react';
import { type IdfDeptContent } from '@/data/idf-extra-content';
import { type IdfFaqItem } from '@/data/idf-faq';
import { type IdfTestimonial } from '@/data/idf-testimonials';
import { IDF_STATS } from '@/lib/idf';
import ScrollAnimation from '@/components/ScrollAnimation';

interface IdfExtraContentProps {
  deptContent: IdfDeptContent;
  faqItems: IdfFaqItem[];
  testimonials: IdfTestimonial[];
  service: 'epaviste' | 'rachat';
  locationName: string;
}

export default function IdfExtraContent({
  deptContent,
  faqItems,
  testimonials,
  service,
  locationName,
}: IdfExtraContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isGold = service === 'rachat';
  const accentColor = isGold ? 'brand-gold' : 'brand-red';

  return (
    <>
      {/* IDF Stats Bar — matches AnimatedStats style */}
      <section className="py-20 md:py-24 bg-brand-navy">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
              {IDF_STATS.map((stat, index) => (
                <ScrollAnimation key={index} delay={index * 0.1}>
                  <div className="text-center group">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white tracking-tight whitespace-nowrap">
                      {stat.number}
                    </div>
                    <div className="h-px w-8 bg-brand-gold/60 mx-auto mb-3 group-hover:w-16 transition-all duration-500"></div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300 mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-[160px] mx-auto leading-relaxed hidden md:block">
                      {stat.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us in IDF */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className={`text-${accentColor} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
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
                <div className={`w-10 h-10 rounded-lg bg-${accentColor}/10 flex items-center justify-center shrink-0`}>
                  <Clock size={20} weight="fill" className={`text-${accentColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">Intervention rapide IDF</h3>
                  <p className="text-sm text-neutral-600">Sous 2h en petite couronne, sous 24h en grande couronne. 24h/24, 7j/7.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-200">
                <div className={`w-10 h-10 rounded-lg bg-${accentColor}/10 flex items-center justify-center shrink-0`}>
                  <Shield size={20} weight="fill" className={`text-${accentColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">Centre VHU agréé</h3>
                  <p className="text-sm text-neutral-600">Partenaire agréé préfecture N° PR9500003D. Certificat de destruction immédiat.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-200">
                <div className={`w-10 h-10 rounded-lg bg-${accentColor}/10 flex items-center justify-center shrink-0`}>
                  <Leaf size={20} weight="fill" className={`text-${accentColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">Éco-responsable</h3>
                  <p className="text-sm text-neutral-600">95% des matériaux recyclés. Dépollution conforme directive EU 2000/53/CE.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-200">
                <div className={`w-10 h-10 rounded-lg bg-${accentColor}/10 flex items-center justify-center shrink-0`}>
                  <CheckCircle size={20} weight="fill" className={`text-${accentColor}`} />
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
            <span className={`text-${accentColor} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
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
            <span className={`text-${accentColor} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
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
                <span className={`text-${accentColor} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
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
                        <Star key={j} size={16} weight="fill" className={`text-${accentColor}`} />
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

      {/* IDF FAQ — two-column layout matching global FAQ style */}
      {faqItems.length > 0 && (
        <section className="py-24 md:py-32 bg-brand-surface border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column - Title & CTA */}
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                  <ScrollAnimation>
                    <span className={`inline-block text-${accentColor} text-sm font-semibold tracking-wider uppercase mb-4`}>
                      FAQ Île-de-France
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight tracking-tight">
                      Questions fréquentes
                    </h2>
                    <p className="text-neutral-600 leading-relaxed mb-10">
                      Tout ce que vous devez savoir sur {service === 'epaviste' ? "l'enlèvement d'épave" : 'le rachat de véhicule'} en Île-de-France. Une question spécifique ? Nos experts sont là pour vous répondre.
                    </p>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <a
                        href="tel:0979049486"
                        className="flex items-center gap-4 px-6 py-4 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 text-brand-navy rounded-2xl font-medium transition-all group shadow-sm"
                      >
                        <div className={`w-10 h-10 bg-${accentColor}/10 rounded-xl flex items-center justify-center group-hover:bg-${accentColor}/20 transition-colors`}>
                          <Phone size={20} weight="bold" className={`text-${accentColor}`} />
                        </div>
                        <div>
                          <span className="block text-xs text-neutral-500">Une question ?</span>
                          <span className="font-bold text-brand-navy">09 79 04 94 86</span>
                        </div>
                      </a>

                      <a
                        href="https://wa.me/33602427345?text=Bonjour,%20je%20souhaite%20un%20devis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 px-6 py-4 bg-whatsapp/5 hover:bg-whatsapp/10 border border-whatsapp/20 hover:border-whatsapp/30 text-brand-navy rounded-2xl font-medium transition-all group"
                      >
                        <div className="w-10 h-10 bg-whatsapp/10 rounded-xl flex items-center justify-center group-hover:bg-whatsapp/20 transition-colors">
                          <WhatsappLogo size={20} weight="fill" className="text-whatsapp" />
                        </div>
                        <span className="font-bold text-brand-navy">WhatsApp</span>
                      </a>
                    </div>
                  </ScrollAnimation>
                </div>

                {/* Right Column - Accordion */}
                <div className="lg:col-span-7 space-y-3">
                  {faqItems.map((item, i) => (
                    <ScrollAnimation key={i} delay={i * 0.05}>
                      <div
                        className={`group rounded-2xl overflow-hidden transition-all duration-500 border ${
                          openFaq === i
                            ? `border-${accentColor}/20 bg-white shadow-sm`
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm'
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                        >
                          <h3 className={`font-semibold text-[15px] transition-colors ${
                            openFaq === i ? 'text-brand-navy' : 'text-neutral-700 group-hover:text-brand-navy'
                          }`}>
                            {item.question}
                          </h3>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            openFaq === i
                              ? `bg-${accentColor} text-white rotate-180`
                              : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200'
                          }`}>
                            <CaretDown size={14} weight="bold" />
                          </div>
                        </button>

                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-6 pb-6 text-neutral-600 leading-relaxed text-sm">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
