'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List, X, Phone, Truck, CurrencyEur, CaretDown, MapPin, WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react';
import Button from './Button';
import { trackCallClick, trackWhatsAppClick } from '@/lib/analytics';
import MobileServiceMenu from './MobileServiceMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => {
    trackCallClick('header');
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-1' : 'py-3 sm:py-1.5'}`}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          {/* Rectangular rounded container like screenshot */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg px-4 sm:px-4 py-3 sm:py-1 flex items-center justify-between max-w-6xl mx-auto">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/* Logo with name for desktop */}
              <Image 
                src="/logo_name.png" 
                alt="Les Épavistes Pro" 
                width={120} 
                height={30}
                className="object-contain hidden sm:block"
              />
              {/* Logo only for mobile */}
              <Image 
                src="/logo.png" 
                alt="Les Épavistes Pro" 
                width={40} 
                height={40}
                className="object-contain sm:hidden"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all text-sm font-medium"
                >
                  <span>Nos Services</span>
                  <CaretDown size={14} weight="bold" className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 py-2 z-50"
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      href="/epaviste"
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-start gap-4 px-4 py-3 hover:bg-brand-red/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-all">
                        <Truck size={24} weight="bold" className="text-brand-red" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 mb-1 group-hover:text-brand-red transition-colors">
                          Enlèvement d'Épave
                        </div>
                        <div className="text-xs text-neutral-600">
                          Service 100% gratuit • Intervention 24-48h
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/rachat-voiture"
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-start gap-4 px-4 py-3 hover:bg-brand-gold/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-all">
                        <CurrencyEur size={24} weight="bold" className="text-brand-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 mb-1 group-hover:text-brand-gold transition-colors">
                          Rachat de Voiture
                        </div>
                        <div className="text-xs text-neutral-600">
                          Paiement cash immédiat • Meilleur prix
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Zones d'intervention */}
              <Link
                href="/epaviste"
                className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all text-sm font-medium"
              >
                <MapPin size={18} weight="bold" />
                <span>Zones</span>
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                className="px-4 py-2 text-neutral-700 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all text-sm font-medium"
              >
                Blog
              </Link>
            </nav>

            {/* CTA Buttons - 3 Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Phone CTA */}
              <a 
                href="tel:0979049486" 
                onClick={handleCallClick}
                className="flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white rounded-lg transition-all text-sm font-semibold shadow-md hover:shadow-lg"
              >
                <Phone size={16} weight="bold" />
                <span className="hidden xl:inline">09 79 04 94 86</span>
                <span className="xl:hidden">Appeler</span>
              </a>
              
              {/* WhatsApp CTA */}
              <a 
                href="https://wa.me/33602427345?text=Bonjour, je souhaite un devis"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('header')}
                className="flex items-center gap-2 px-4 py-2 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-lg transition-all text-sm font-semibold shadow-md hover:shadow-lg"
              >
                <WhatsappLogo size={16} weight="fill" />
                <span>WhatsApp</span>
              </a>
              
              {/* Form CTA */}
              <button
                onClick={() => {
                  const formSection = document.querySelector('section:has(form)');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg transition-all text-sm font-semibold shadow-md hover:shadow-lg"
              >
                <EnvelopeSimple size={16} weight="bold" />
                <span>Devis</span>
              </button>
            </div>
            
            {/* Mobile - Single CTA */}
            <div className="hidden md:block lg:hidden">
              <a href="tel:0979049486" onClick={handleCallClick}>
                <Button size="sm" className="bg-brand-red hover:bg-brand-red-light text-white shadow-lg hover:shadow-xl">
                  <Phone size={16} weight="bold" className="mr-1" />
                  Contact
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={28} weight="bold" className="text-brand-navy" />
              ) : (
                <List size={28} weight="bold" className="text-brand-navy" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Service Menu */}
      <MobileServiceMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Sticky Mobile CTAs - 3 buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 p-3 shadow-2xl z-50">
        <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
          {/* Phone CTA */}
          <a
            href="tel:0979049486"
            onClick={handleCallClick}
            className="flex flex-col items-center justify-center bg-brand-red text-white py-3 px-2 rounded-lg font-semibold hover:bg-brand-red-light transition-colors shadow-md active:scale-95"
          >
            <Phone size={20} weight="bold" className="mb-1" />
            <span className="text-xs">Appeler</span>
          </a>
          
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/33979049486?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis%20pour%20l%27enl%C3%A8vement%20d%27une%20%C3%A9pave.%20Pouvez-vous%20me%20rappeler%20%3F"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mobile_sticky')}
            className="flex flex-col items-center justify-center bg-whatsapp text-white py-3 px-2 rounded-lg font-semibold hover:bg-whatsapp-hover transition-colors shadow-md active:scale-95"
          >
            <WhatsappLogo size={20} weight="fill" className="mb-1" />
            <span className="text-xs">WhatsApp</span>
          </a>
          
          {/* Form CTA */}
          <button
            onClick={() => {
              const formSection = document.querySelector('section:has(form)');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex flex-col items-center justify-center bg-brand-blue text-white py-3 px-2 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors shadow-md active:scale-95"
          >
            <EnvelopeSimple size={20} weight="bold" className="mb-1" />
            <span className="text-xs">Devis</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;