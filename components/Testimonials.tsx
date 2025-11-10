'use client';

import { Star, Users, Gift, Clock, Lightning } from '@phosphor-icons/react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sébastien Moreau",
    location: "Paris 15e",
    rating: 5,
    text: "Service impeccable ! Mon épave a été enlevée en moins de 24h, gratuitement et sans aucune paperasse. L'équipe est professionnelle et très réactive. Je recommande à 100% !",
    service: "Enlèvement épave gratuit"
  },
  {
    id: 2,
    name: "Maxence Dubois",
    location: "Nanterre (92)",
    rating: 5,
    text: "J'ai vendu ma voiture accidentée au meilleur prix. Paiement immédiat en espèces, certificat de destruction fourni. Très satisfait du professionnalisme de l'équipe !",
    service: "Rachat voiture accidentée"
  },
  {
    id: 3,
    name: "Tiffany Martin",
    location: "Saint-Denis (93)",
    rating: 5,
    text: "Excellent service d'enlèvement d'épave ! Intervention rapide, équipe sympathique et tout est pris en charge. Vraiment rien à redire, service parfait du début à la fin.",
    service: "Enlèvement épave moto"
  },
  {
    id: 4,
    name: "Marie Lefebvre",
    location: "Créteil (94)",
    rating: 5,
    text: "Ma voiture en panne depuis des mois a été enlevée gratuitement. Service rapide, professionnel et sans frais cachés. Merci pour votre efficacité !",
    service: "Rachat voiture HS"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-[5%]">
        <div className="max-w-7xl mx-auto">
          {/* Stats section - Virya Energy inspired layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
            
            {/* Large branded card on the left */}
            <div className="lg:col-span-4 relative rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark text-white p-10 md:p-12 overflow-hidden min-h-[400px] flex flex-col justify-between">
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  <span className="text-brand-red">Les Épavistes Pro</span>
                  <br />
                  en quelques chiffres
                </h3>
                <a 
                  href="tel:0979049486"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  Nous contacter
                </a>
              </div>
              
              {/* Decorative shape */}
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-red/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl"></div>
            </div>

            {/* Stats grid on the right */}
            <div className="lg:col-span-8 grid grid-cols-2 gap-4 md:gap-6">
              <div className="relative text-center p-8 md:p-10 rounded-3xl bg-white border-2 border-neutral-200 hover:border-brand-red hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative z-10">
                  <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <Users size={64} weight="thin" className="text-brand-red opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110 duration-300" />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-red mb-3">+250</div>
                  <div className="text-xs md:text-sm font-medium text-neutral-700">Clients satisfaits</div>
                </div>
                <span className="absolute inset-0 border-2 border-transparent group-hover:border-brand-red rounded-3xl transition-all duration-300"></span>
              </div>
              
              <div className="relative text-center p-8 md:p-10 rounded-3xl bg-white border-2 border-neutral-200 hover:border-success hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative z-10">
                  <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <Gift size={64} weight="thin" className="text-success opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110 duration-300" />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-success mb-3">100%</div>
                  <div className="text-xs md:text-sm font-medium text-neutral-700">Gratuit</div>
                </div>
                <span className="absolute inset-0 border-2 border-transparent group-hover:border-success rounded-3xl transition-all duration-300"></span>
              </div>
              
              <div className="relative text-center p-8 md:p-10 rounded-3xl bg-white border-2 border-neutral-200 hover:border-brand-blue hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative z-10">
                  <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <Clock size={64} weight="thin" className="text-brand-blue opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110 duration-300" />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-blue mb-3">7j/7</div>
                  <div className="text-xs md:text-sm font-medium text-neutral-700">Disponibilité</div>
                </div>
                <span className="absolute inset-0 border-2 border-transparent group-hover:border-brand-blue rounded-3xl transition-all duration-300"></span>
              </div>
              
              <div className="relative text-center p-8 md:p-10 rounded-3xl bg-white border-2 border-neutral-200 hover:border-brand-gold hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative z-10">
                  <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <Lightning size={64} weight="thin" className="text-brand-gold opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110 duration-300" />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gold mb-3">24h</div>
                  <div className="text-xs md:text-sm font-medium text-neutral-700">Intervention</div>
                </div>
                <span className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold rounded-3xl transition-all duration-300"></span>
              </div>
            </div>

          </div>

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
              Ils nous font confiance
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto font-light">
              Découvrez les témoignages de nos clients satisfaits en Île-de-France.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 border-2 border-neutral-200 hover:border-brand-red hover:shadow-xl transition-all"
            >
              {/* Stars first */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} weight="fill" className="text-brand-gold" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-neutral-700 mb-6 leading-relaxed text-base">
                "{testimonial.text}"
              </p>

              {/* Author info at bottom */}
              <div className="flex items-center pt-4 border-t-2 border-neutral-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-neutral-900">{testimonial.name}</h3>
                  <p className="text-sm text-neutral-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
