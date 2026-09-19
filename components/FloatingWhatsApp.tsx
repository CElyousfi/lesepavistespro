'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import { whatsappUrl, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp';

const FloatingWhatsApp = () => {
  return (
    <a
      href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 group"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-whatsapp rounded-full animate-ping opacity-50"></div>
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-whatsapp hover:bg-whatsapp-hover rounded-full shadow-lg shadow-whatsapp/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
          <WhatsappLogo size={28} weight="fill" className="text-white" />
        </div>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-brand-navy text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          WhatsApp
        </div>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
