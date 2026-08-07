import React from 'react';
import { Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/[0.08] rounded-full blur-[200px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
          Besoin d&apos;un enlèvement<br /><span className="text-brand-gold">urgent ?</span>
        </h2>
        <p className="text-neutral-300 text-lg max-w-2xl mx-auto mb-12">
          Nos épavistes agréés interviennent 7j/7 partout en France.
          Service 100% gratuit et conforme à la loi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="tel:+33602427345"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-red text-white rounded-full font-semibold text-base hover:bg-brand-red/90 hover:scale-[1.02] transition-all shadow-lg min-w-[220px]"
          >
            <Phone size={20} weight="bold" />
            06 02 42 73 45
          </a>

          <a
            href="https://wa.me/33602427345"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-whatsapp text-white rounded-full font-semibold text-base hover:bg-whatsapp-hover hover:scale-[1.02] transition-all shadow-lg min-w-[220px]"
          >
            <WhatsappLogo size={20} weight="fill" />
            WhatsApp
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-neutral-400 text-xs sm:text-sm font-medium">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
            Intervention 24/7
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
            Agrément VHU
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
            Certificat immédiat
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
