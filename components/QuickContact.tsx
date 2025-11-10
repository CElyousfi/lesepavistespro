'use client';

import { Phone, WhatsappLogo } from '@phosphor-icons/react';

interface QuickContactProps {
  service?: 'epaviste' | 'rachat';
  location?: string;
  className?: string;
}

export default function QuickContact({ service = 'epaviste', location, className = '' }: QuickContactProps) {
  const whatsappMessage = location 
    ? `Bonjour, je souhaite ${service === 'epaviste' ? "un devis pour l'enlèvement d'une épave" : "vendre ma voiture"} à ${location}`
    : `Bonjour, je souhaite ${service === 'epaviste' ? "un devis pour l'enlèvement d'une épave" : "vendre ma voiture"}`;

  const primaryColor = service === 'epaviste' ? 'brand-red' : 'brand-gold';

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <a 
        href="tel:0979049486" 
        className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-${primaryColor} hover:bg-${primaryColor}-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`}
      >
        <Phone size={20} weight="bold" />
        <span>09 79 04 94 86</span>
      </a>
      <a 
        href={`https://wa.me/33602427345?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <WhatsappLogo size={20} weight="fill" />
        <span className="hidden sm:inline">WhatsApp</span>
        <span className="sm:hidden">Message</span>
      </a>
    </div>
  );
}
