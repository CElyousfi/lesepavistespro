'use client';

import { Phone, WhatsappLogo } from '@phosphor-icons/react';
import Button from './Button';
import { trackCallClick, trackWhatsAppClick } from '@/lib/analytics';

const CTASection = () => {
  const phoneNumber = '0979049486';
  const whatsappNumber = '33602427345';

  const handleCallClick = () => {
    trackCallClick('cta-section');
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('cta-section');
  };

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-[5%]">
        {/* Boxed CTA Container */}
        <div className="max-w-6xl mx-auto bg-brand-navy text-white rounded-3xl border-2 border-neutral-200 relative overflow-hidden shadow-2xl">
          {/* Textured background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark"></div>
          
          {/* Decorative texture elements for depth */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 py-12 md:py-16 px-8 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight">
            Et vous, <span className="text-brand-red italic">combien</span> pourriez-vous récupérer ?
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg text-neutral-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Un service rapide et efficace : intervention sous 24h pour enlever votre épave gratuitement 
            et vous remettre votre certificat de destruction.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href={`tel:${phoneNumber}`} onClick={handleCallClick}>
              <button className="px-6 py-3 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                <Phone size={16} weight="bold" />
                Prendre rendez-vous
              </button>
            </a>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all border-2 border-white/20 hover:border-white/40 flex items-center gap-2">
                <WhatsappLogo size={16} weight="fill" />
                Poser une question
              </button>
            </a>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
