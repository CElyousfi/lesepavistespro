'use client';

import { Check, ArrowUpRight, Truck, CurrencyEur, Shield, FileText } from '@phosphor-icons/react';

const services = [
  {
    id: 1,
    title: 'Enlèvement d\'épave gratuit',
    description: 'Service 100% gratuit pour tous types de véhicules : voitures, motos, scooters, utilitaires. Aucun frais caché, même en sous-sol.',
    benefits: [
      'Enlèvement gratuit tous véhicules',
      'Intervention rapide 7j/7'
    ],
    bgColor: 'bg-service-purple',
    icon: Truck
  },
  {
    id: 2,
    title: 'Rachat de véhicule cash',
    description: 'Nous rachetons votre véhicule HS, accidenté ou en panne au meilleur prix. Paiement immédiat par chèque, espèces ou virement.',
    benefits: [
      'Paiement immédiat',
      'Meilleur prix garanti'
    ],
    bgColor: 'bg-service-blue',
    icon: CurrencyEur
  },
  {
    id: 3,
    title: 'Centre VHU agréé',
    description: 'Agrément préfecture officiel. Dépollution et recyclage aux normes européennes. Jusqu\'à 95% du véhicule valorisé.',
    benefits: [
      'Certificat de destruction fourni',
      'Recyclage écologique à 95%'
    ],
    bgColor: 'bg-service-green',
    icon: Shield
  },
  {
    id: 4,
    title: 'Démarches administratives',
    description: 'Nous gérons tout : certificat de destruction, déclaration préfecture, aide au certificat de non-gage. Zéro paperasse pour vous.',
    benefits: [
      'Toutes démarches incluses',
      'Accompagnement complet'
    ],
    bgColor: 'bg-service-orange',
    icon: FileText
  }
];

const ServicesArtea = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      {/* Boxed container with 5% padding */}
      <div className="container mx-auto px-[5%]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
              Nos services d'épaviste en Île-de-France
            </h2>
            <p className="text-lg text-neutral-600 font-light leading-relaxed">
              Un service complet pour vous débarrasser de votre véhicule hors d'usage en toute légalité et simplicité.
            </p>
          </div>

          {/* Service Cards - 2 Column Grid like screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
            <div
              key={service.id}
              className={`${service.bgColor} rounded-3xl p-8 relative group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-brand-blue/20`}
            >
              {/* Top row: Icon and Arrow */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                  <IconComponent size={28} weight="bold" className="text-brand-navy" />
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:bg-brand-blue group-hover:text-white">
                  <ArrowUpRight size={20} weight="bold" className="transition-colors" />
                </div>
              </div>

              {/* Title and Description */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom row: Checkmarks and Illustration */}
              <div className="flex items-end justify-between gap-6">
                {/* Checkmarks */}
                <ul className="space-y-2 flex-1">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={16} weight="bold" className="text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Illustration */}
                <div className="w-48 h-48 flex-shrink-0">
                  <div className="w-full h-full bg-white/50 rounded-xl flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Illustration</span>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesArtea;
