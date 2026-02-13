'use client';

import { useState } from 'react';
import { CaretDown, Phone, WhatsappLogo } from '@phosphor-icons/react';
import Script from 'next/script';
import { getFAQSchema } from '@/lib/schema';
import ScrollAnimation from './ScrollAnimation';

const faqs = [
  {
    question: 'L\u2019enlèvement d\u2019épave est-il vraiment gratuit ?',
    answer: 'Oui, l\u2019enlèvement est 100% gratuit pour tout véhicule complet (avec moteur et éléments essentiels). Aucun frais caché, même si votre véhicule est en sous-sol ou difficile d\u2019accès. C\u2019est la loi française qui impose aux centres VHU agréés d\u2019accepter gratuitement les véhicules hors d\u2019usage.',
  },
  {
    question: 'Dois-je être présent lors de l\u2019enlèvement ?',
    answer: 'Idéalement oui, pour signer les documents de cession. Si vous ne pouvez pas être présent, une procuration signée avec copie de votre pièce d\u2019identité permet à un tiers de vous représenter. Nous nous adaptons à votre emploi du temps.',
  },
  {
    question: 'Puis-je faire enlever une épave sans carte grise ?',
    answer: 'Dans certains cas particuliers (véhicule très ancien, perte de papiers, succession), nous pouvons intervenir. Contactez-nous pour étudier votre situation. Des démarches spécifiques seront nécessaires auprès de la préfecture.',
  },
  {
    question: 'Intervenez-vous en sous-sol ou parking privé ?',
    answer: 'Oui, nous intervenons dans tous types de parkings : sous-sol, copropriété, parking privé, box fermé. Notre équipement (treuil, chariot) permet d\u2019extraire les véhicules même dans les espaces étroits. Aucun surcoût.',
  },
  {
    question: 'Quels documents faut-il fournir ?',
    answer: 'Vous devez fournir : la carte grise originale avec la mention "cédé le" + date et signature, un certificat de non-gage de moins de 15 jours, une copie de votre pièce d\u2019identité, et le formulaire Cerfa 15776*02 rempli. Nous vous aidons pour toutes ces démarches.',
  },
  {
    question: 'Combien de temps prend l\u2019intervention ?',
    answer: 'Nous intervenons généralement sous 24 à 48h après votre demande. En urgence, nous pouvons intervenir sous 2h en région parisienne. L\u2019enlèvement lui-même prend environ 30 minutes. Vous recevez le certificat de destruction sous 15 jours.',
  },
  {
    question: 'Qu\u2019est-ce que la prime à la conversion ?',
    answer: 'C\u2019est une aide gouvernementale pouvant atteindre plusieurs milliers d\u2019euros si vous mettez votre vieille voiture à la casse et achetez un véhicule propre. Nous vous fournissons le certificat de destruction nécessaire pour en bénéficier.',
  },
  {
    question: 'Que devient mon véhicule après l\u2019enlèvement ?',
    answer: 'Votre véhicule est acheminé vers notre centre VHU agréé où il est dépollué (retrait des fluides toxiques), démonté (récupération des pièces réutilisables) et recyclé (jusqu\u2019à 95% du poids). Vous recevez un certificat de destruction officiel sous 15 jours.',
  },
  {
    question: 'Intervenez-vous partout en France ?',
    answer: 'Oui, nous couvrons l\u2019intégralité de la France : 18 régions, 101 départements, plus de 35 000 communes desservies sans frais supplémentaires.',
  },
  {
    question: 'Puis-je vendre mon épave au lieu de la faire enlever gratuitement ?',
    answer: 'Oui ! Si votre véhicule a encore de la valeur (pièces récupérables, métaux), nous pouvons vous le racheter. Le prix dépend de l\u2019état, du modèle et de l\u2019année. Contactez-nous pour une estimation gratuite.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = getFAQSchema(faqs);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <section className="py-24 md:py-32 bg-brand-surface border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column - Title & CTA */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <ScrollAnimation>
                  <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Support</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight tracking-tight">
                    Questions fréquentes
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-10">
                    Tout ce que vous devez savoir sur l&apos;enlèvement d&apos;épave gratuit. Une question spécifique ? Nos experts sont là pour vous répondre.
                  </p>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <a
                      href="tel:0979049486"
                      className="flex items-center gap-4 px-6 py-4 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 text-brand-navy rounded-2xl font-medium transition-all group shadow-sm"
                    >
                      <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                        <Phone size={20} weight="bold" className="text-brand-red" />
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
                {faqs.map((faq, index) => (
                  <ScrollAnimation key={index} delay={index * 0.05}>
                    <div
                      className={`group rounded-2xl overflow-hidden transition-all duration-500 border ${openIndex === index
                          ? 'border-brand-red/20 bg-white shadow-sm'
                          : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm'
                        }`}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <h3 className={`font-semibold text-[15px] transition-colors ${openIndex === index ? 'text-brand-navy' : 'text-neutral-700 group-hover:text-brand-navy'
                          }`}>
                          {faq.question}
                        </h3>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'bg-brand-red text-white rotate-180' : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200'
                          }`}>
                          <CaretDown size={14} weight="bold" />
                        </div>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-6 text-neutral-600 leading-relaxed text-sm">
                            {faq.answer}
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
    </>
  );
};

export default FAQ;