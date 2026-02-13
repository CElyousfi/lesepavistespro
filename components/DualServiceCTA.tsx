'use client';

import { Phone, WhatsappLogo, ArrowRight } from '@phosphor-icons/react';
import ScrollAnimation from './ScrollAnimation';

interface DualServiceCTAProps {
  className?: string;
}

export default function DualServiceCTA({ className = '' }: DualServiceCTAProps) {
  return (
    <section className={`py-24 md:py-32 bg-brand-surface relative overflow-hidden ${className}`}>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            {/* Header - Bold like Lorikeet's "Complex is our comfort zone" */}
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy tracking-tight leading-[1.05] mb-6">
                Besoin d&apos;aide ?<br />
                <span className="text-brand-red">Contactez-nous</span>
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Épaviste ou rachat de voiture, nous sommes disponibles 7j/7 pour vous répondre
              </p>
            </div>
          </ScrollAnimation>

          {/* CTA Buttons - Clean and prominent */}
          <ScrollAnimation delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="tel:0979049486"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-red text-white rounded-full font-semibold text-base hover:bg-brand-red/90 hover:scale-[1.02] transition-all shadow-lg min-w-[220px]"
              >
                <Phone size={20} weight="bold" />
                09 79 04 94 86
              </a>
              <a
                href="https://wa.me/33602427345?text=Bonjour,%20je%20souhaite%20un%20devis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-whatsapp text-white rounded-full font-semibold text-base hover:bg-whatsapp-hover hover:scale-[1.02] transition-all shadow-lg min-w-[220px]"
              >
                <WhatsappLogo size={20} weight="fill" />
                WhatsApp
              </a>
            </div>
          </ScrollAnimation>

          {/* Bottom link */}
          <ScrollAnimation delay={0.3}>
            <div className="text-center">
              <button
                onClick={() => {
                  const formSection = document.querySelector('section:has(form)');
                  if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-navy text-sm font-medium transition-colors group"
              >
                Ou remplissez notre formulaire de devis gratuit
                <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
