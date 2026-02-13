'use client';

import { useState } from 'react';
import { Phone, Truck, FileText, CurrencyEur } from '@phosphor-icons/react';
import ScrollAnimation from './ScrollAnimation';

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Prise de contact',
    description: 'Contactez-nous par téléphone au 09 79 04 94 86 ou via notre formulaire. Nous vous proposons un rendez-vous selon vos disponibilités. Devis gratuit et sans engagement.',
  },
  {
    icon: Truck,
    number: '02',
    title: 'Enlèvement de l\'épave',
    description: 'Nos épavistes professionnels se déplacent avec une dépanneuse. Nous récupérons votre véhicule gratuitement, même en sous-sol. Nous prenons en charge tous les documents nécessaires.',
  },
  {
    icon: FileText,
    number: '03',
    title: 'Certificat de destruction',
    description: 'Votre véhicule est acheminé vers notre centre VHU agréé préfecture. Dépollution complète et recyclage aux normes européennes. Certificat de destruction délivré sous 15 jours.',
  },
  {
    icon: CurrencyEur,
    number: '04',
    title: 'Paiement immédiat',
    description: 'Si rachat de véhicule : paiement immédiat par chèque, espèces ou virement bancaire. Vous n\'avez rien à faire, nous gérons toutes les démarches administratives !',
  },
];

const ProcessNew = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <section id="comment-ca-marche" className="py-24 md:py-32 bg-brand-surface relative">

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation className="w-full">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="mb-16 text-center">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Comment ça marche</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Notre méthodologie
              </h2>
            </div>

            {/* Steps List */}
            <ul className="space-y-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isOpen = openStep === index;

                return (
                  <ScrollAnimation key={index} delay={index * 0.1} className="w-full">
                    <li
                      className={`rounded-2xl overflow-hidden transition-all duration-500 border ${isOpen ? 'border-brand-red/30 bg-white shadow-md' : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm'}`}
                    >
                      <button
                        onClick={() => toggleStep(index)}
                        className="w-full p-6 md:p-8 flex items-center justify-between gap-6 text-left group"
                      >
                        <div className="flex items-center gap-6 flex-1">
                          <div className={`text-4xl md:text-5xl font-bold transition-colors ${isOpen ? 'text-brand-red' : 'text-neutral-200 group-hover:text-neutral-300'}`}>
                            {step.number}
                          </div>
                          <h3 className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-brand-navy' : 'text-neutral-700 group-hover:text-brand-navy'}`}>
                            {step.title}
                          </h3>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? 'bg-brand-red text-white' : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200 group-hover:text-neutral-600'}`}>
                          <Icon size={24} weight="bold" />
                        </div>
                      </button>

                      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 md:pl-[88px]">
                            <p className="text-neutral-600 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ScrollAnimation>
                );
              })}
            </ul>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ProcessNew;
