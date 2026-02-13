'use client';

import Link from 'next/link';
import { X, Truck, CurrencyEur, Phone, WhatsappLogo } from '@phosphor-icons/react';

interface MobileServiceMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileServiceMenu({ isOpen, onClose }: MobileServiceMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto border-l border-neutral-200 shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-neutral-200 p-6 flex items-center justify-between z-10">
          <span className="font-bold text-lg text-brand-navy">Menu</span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-brand-navy"
            aria-label="Fermer le menu"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6 space-y-1">
          {[
            { href: '/', label: 'Accueil' },
            { href: '/epaviste', label: 'Enlèvement' },
            { href: '/rachat-voiture', label: 'Rachat' },
            { href: '/blog', label: 'Conseils' },
            { href: '/faq', label: 'FAQ' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-4 py-3 text-neutral-600 hover:text-brand-navy hover:bg-neutral-50 rounded-xl font-medium transition-all text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Services */}
        <div className="px-6 pb-6 space-y-3">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-1">Services</p>

          <Link
            href="/epaviste"
            onClick={onClose}
            className="block bg-brand-red/5 border border-brand-red/15 rounded-2xl p-5 text-brand-navy active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <Truck size={20} weight="bold" className="text-brand-red" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Enlèvement d&apos;Épave</h3>
                <p className="text-neutral-500 text-xs">100% gratuit</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-500">Gratuit</span>
              <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-500">24-48h</span>
              <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-500">Agréé VHU</span>
            </div>
          </Link>

          <Link
            href="/rachat-voiture"
            onClick={onClose}
            className="block bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-5 text-brand-navy active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                <CurrencyEur size={20} weight="bold" className="text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Rachat de Voiture</h3>
                <p className="text-neutral-500 text-xs">Paiement cash</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-500">Cash</span>
              <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-500">Meilleur prix</span>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="p-6 border-t border-neutral-200 space-y-3">
          <a
            href="tel:0979049486"
            className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:bg-neutral-100 active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center">
              <Phone size={18} weight="bold" className="text-brand-red" />
            </div>
            <div>
              <div className="text-xs text-neutral-500">Appelez-nous</div>
              <div className="font-bold text-brand-navy text-sm">09 79 04 94 86</div>
            </div>
          </a>

          <a
            href="https://wa.me/33602427345"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-whatsapp/5 rounded-xl border border-whatsapp/20 text-brand-navy active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-whatsapp/20 flex items-center justify-center">
              <WhatsappLogo size={18} weight="fill" className="text-whatsapp" />
            </div>
            <div>
              <div className="text-xs text-neutral-500">WhatsApp</div>
              <div className="font-bold text-brand-navy text-sm">Réponse rapide</div>
            </div>
          </a>
        </div>

        <div className="p-6 text-center text-xs text-neutral-500">
          <p>Disponible 7j/7 &middot; Partout en France</p>
        </div>
      </div>
    </>
  );
}
