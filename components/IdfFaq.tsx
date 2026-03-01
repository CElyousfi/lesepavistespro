'use client';

import { useState } from 'react';
import { CaretDown, Phone, WhatsappLogo } from '@phosphor-icons/react';
import { type IdfFaqItem } from '@/data/idf-faq';
import ScrollAnimation from '@/components/ScrollAnimation';

interface IdfFaqProps {
  faqItems: IdfFaqItem[];
  service: 'epaviste' | 'rachat';
}

export default function IdfFaq({ faqItems, service }: IdfFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accentColor = service === 'rachat' ? 'brand-gold' : 'brand-red';

  if (faqItems.length === 0) return null;

  return (
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
                      openIndex === i
                        ? `border-${accentColor}/20 bg-white shadow-sm`
                        : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <h3 className={`font-semibold text-[15px] transition-colors ${
                        openIndex === i ? 'text-brand-navy' : 'text-neutral-700 group-hover:text-brand-navy'
                      }`}>
                        {item.question}
                      </h3>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        openIndex === i
                          ? `bg-${accentColor} text-white rotate-180`
                          : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200'
                      }`}>
                        <CaretDown size={14} weight="bold" />
                      </div>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        openIndex === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
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
  );
}
