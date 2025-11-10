'use client';

import { useState } from 'react';
import { Phone, Truck, FileText, CurrencyEur } from '@phosphor-icons/react';

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

  return (
    <section id="comment-ca-marche" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-[5%]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
              Notre méthodologie
            </h2>
          </div>

          {/* Steps List */}
          <ul className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isOpen = openStep === index;
              
              return (
                <li
                  key={index}
                  className="border-2 border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-blue hover:shadow-lg"
                >
                  {/* Step Header - Clickable */}
                  <button
                    onClick={() => setOpenStep(isOpen ? null : index)}
                    className="w-full p-6 md:p-8 flex items-center justify-between gap-6 text-left"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      {/* Step Number */}
                      <div className="text-5xl md:text-6xl font-bold text-brand-red opacity-20">
                        {step.number}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
                        {step.title}
                      </h3>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <Icon size={32} weight="bold" className="text-brand-gold" />
                    </div>
                  </button>

                  {/* Step Content - Expandable */}
                  {isOpen && (
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                      <div className="pl-0 md:pl-24">
                        <p className="text-neutral-700 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProcessNew;
