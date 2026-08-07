'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List, X, Phone, WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react';
import Button from './Button';
import { trackCallClick, trackWhatsAppClick } from '@/lib/analytics';
import MobileServiceMenu from './MobileServiceMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      <header data-nosnippet className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4">
        <div className="container mx-auto px-4">
          <div className={`
            relative mx-auto max-w-6xl rounded-full transition-all duration-500 px-6
            flex items-center justify-between
            ${isScrolled
              ? 'glass py-3'
              : 'bg-transparent py-3'
            }
          `}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image src="/logo.png" alt="Les Épavistes Pro" width={36} height={36} className="w-9 h-9" />
              <span className="font-bold text-lg tracking-tight text-brand-navy">
                LesEpavistes<span className="text-brand-red">pro</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/epaviste" className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-brand-navy rounded-full hover:bg-neutral-100 transition-all">
                Enlèvement
              </Link>
              <Link href="/rachat-voiture" className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-brand-navy rounded-full hover:bg-neutral-100 transition-all">
                Rachat
              </Link>
              <Link href="/blog" className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-brand-navy rounded-full hover:bg-neutral-100 transition-all">
                Conseils
              </Link>
              <Link href="/faq" className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-brand-navy rounded-full hover:bg-neutral-100 transition-all">
                FAQ
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+33602427345" className="text-sm font-medium text-neutral-600 hover:text-brand-red transition-colors">
                06 02 42 73 45
              </a>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const formSection = document.querySelector('section:has(form)');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/contact';
                  }
                }}
              >
                Devis Gratuit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors text-brand-navy"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Service Menu */}
      <MobileServiceMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Sticky Mobile CTAs */}
      <div data-nosnippet className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-3 z-50 shadow-lg">
        <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
          <a
            href="tel:+33602427345"
            onClick={handleCallClick}
            className="flex flex-col items-center justify-center bg-brand-red text-white py-3 px-2 rounded-xl font-semibold hover:bg-brand-red/90 transition-colors active:scale-95"
          >
            <Phone size={20} weight="bold" className="mb-1" />
            <span className="text-xs">Appeler</span>
          </a>

          <a
            href="https://wa.me/33602427345?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis%20pour%20l%27enl%C3%A8vement%20d%27une%20%C3%A9pave.%20Pouvez-vous%20me%20rappeler%20%3F"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mobile_sticky')}
            className="flex flex-col items-center justify-center bg-whatsapp text-white py-3 px-2 rounded-xl font-semibold hover:bg-whatsapp-hover transition-colors active:scale-95"
          >
            <WhatsappLogo size={20} weight="fill" className="mb-1" />
            <span className="text-xs">WhatsApp</span>
          </a>

          <button
            onClick={() => {
              const formSection = document.querySelector('section:has(form)');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex flex-col items-center justify-center bg-brand-navy/5 text-brand-navy py-3 px-2 rounded-xl font-semibold hover:bg-brand-navy/10 transition-colors active:scale-95 border border-neutral-200"
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