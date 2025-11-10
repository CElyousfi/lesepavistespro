'use client';

import { Phone, WhatsappLogo, Truck, CurrencyEur } from '@phosphor-icons/react';

interface DualServiceCTAProps {
  className?: string;
}

export default function DualServiceCTA({ className = '' }: DualServiceCTAProps) {
  return (
    <section className={`py-20 md:py-28 bg-white ${className}`}>
      {/* Boxed container with 5% padding */}
      <div className="container mx-auto px-[5%]">
        <div className="max-w-6xl mx-auto">
          {/* Boxed section with gradient background */}
          <div className="bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy rounded-3xl p-8 md:p-12 lg:p-16">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                Besoin d'aide ? Contactez-nous !
              </h2>
              <p className="text-lg sm:text-xl text-neutral-200 max-w-3xl mx-auto font-light leading-relaxed">
                Épaviste ou rachat de voiture, nous sommes disponibles 7j/7 pour vous répondre
              </p>
            </div>

          {/* Dual Service CTAs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Épaviste CTA */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-white/20 hover:border-brand-red/50 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
                  <Truck size={28} weight="bold" className="text-brand-red icon-hover-grow" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Enlèvement d'Épave</h3>
              </div>
              <p className="text-white/80 mb-6 text-sm">
                Service gratuit • Intervention rapide • Certificat VHU
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="tel:0979049486"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-red-light text-white rounded-lg font-semibold transition-all text-sm group/btn"
                >
                  <Phone size={18} weight="bold" className="icon-cta-pulse group-hover/btn:icon-cta-shake" />
                  <span>09 79 04 94 86</span>
                </a>
                <a 
                  href="https://wa.me/33602427345?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-lg font-semibold transition-all text-sm group/btn"
                >
                  <WhatsappLogo size={18} weight="fill" className="icon-hover-grow" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Rachat CTA */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-white/20 hover:border-brand-gold/50 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
                  <CurrencyEur size={28} weight="bold" className="text-brand-gold icon-hover-grow" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Rachat de Voiture</h3>
              </div>
              <p className="text-white/80 mb-6 text-sm">
                Paiement cash • Estimation gratuite • Meilleur prix
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="tel:0979049486"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-white rounded-lg font-semibold transition-all text-sm group/btn"
                >
                  <Phone size={18} weight="bold" className="icon-cta-pulse group-hover/btn:icon-cta-shake" />
                  <span>09 79 04 94 86</span>
                </a>
                <a 
                  href="https://wa.me/33602427345?text=Bonjour, je souhaite vendre ma voiture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-lg font-semibold transition-all text-sm group/btn"
                >
                  <WhatsappLogo size={18} weight="fill" className="icon-hover-grow" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

            {/* Quick Contact Bar - Mobile Optimized */}
            <div className="text-center">
              <p className="text-neutral-300 text-sm md:text-base mb-4">
                Disponible 7j/7 • Réponse rapide • Service professionnel
              </p>
              <a 
                href="tel:0979049486"
                className="inline-flex items-center gap-2 text-white hover:text-brand-red transition-colors text-lg md:text-xl font-bold group"
              >
                <Phone size={24} weight="bold" className="icon-cta-pulse group-hover:icon-glow" />
                09 79 04 94 86
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
