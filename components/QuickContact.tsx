'use client';

import { useState, useEffect } from 'react';
import { Phone, WhatsappLogo } from '@phosphor-icons/react';
import { trackCallClick, trackWhatsAppClick } from '@/lib/analytics';
import { isAdsTraffic } from '@/lib/trafficSource';

interface QuickContactProps {
  service?: 'epaviste' | 'rachat';
  location?: string;
  className?: string;
}

export default function QuickContact({ service = 'epaviste', location, className = '' }: QuickContactProps) {
  const [isFromAds, setIsFromAds] = useState(false);

  useEffect(() => {
    setIsFromAds(isAdsTraffic());
  }, []);

  const whatsappMessage = location 
    ? `Bonjour, je souhaite ${service === 'epaviste' ? "un devis pour l'enlèvement d'une épave" : "vendre ma voiture"} à ${location}`
    : `Bonjour, je souhaite ${service === 'epaviste' ? "un devis pour l'enlèvement d'une épave" : "vendre ma voiture"}`;

  const primaryColor = service === 'epaviste' ? 'brand-red' : 'brand-gold';
  
  const handleCallClick = () => {
    trackCallClick(location || service);
  };
  
  const handleWhatsAppClick = () => {
    trackWhatsAppClick(location || service);
  };

  // Deterministic micro-copy based on service type
  const reassuranceCopy = service === 'epaviste' 
    ? 'Enlèvement gratuit – aucune avance'
    : 'Paiement cash – sans frais';

  return (
    <div className={`${className}`}>
      {/* Ads-specific phone priority micro-copy */}
      {isFromAds && (
        <p className="text-sm text-center text-brand-red font-semibold mb-3 flex items-center justify-center gap-2">
          <Phone size={16} weight="bold" />
          Appel recommandé – intervention rapide
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4">
        <a 
          href="tel:0979049486"
          onClick={handleCallClick}
          className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-${primaryColor} hover:bg-${primaryColor}-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${isFromAds ? 'ring-2 ring-offset-2 ring-brand-red' : ''}`}
        >
          <Phone size={20} weight="bold" />
          <span>09 79 04 94 86</span>
        </a>
        <a 
          href={`https://wa.me/33602427345?text=${encodeURIComponent(whatsappMessage)}`}
          onClick={handleWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${isFromAds ? 'opacity-75' : ''}`}
        >
          <WhatsappLogo size={20} weight="fill" />
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">Message</span>
        </a>
      </div>
      <p className="text-xs text-center text-neutral-500 mt-3">
        {reassuranceCopy} • Documents gérés pour vous
      </p>
    </div>
  );
}
