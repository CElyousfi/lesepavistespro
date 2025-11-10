'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Truck, CurrencyEur, Phone, WhatsappLogo, MapPin } from '@phosphor-icons/react';

interface MobileServiceMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileServiceMenu({ isOpen, onClose }: MobileServiceMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-brand-navy text-white p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Nos Services</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={24} weight="bold" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6 space-y-2">
          <Link
            href="/"
            onClick={onClose}
            className="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg font-medium transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/blog"
            onClick={onClose}
            className="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg font-medium transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Services */}
        <div className="px-6 pb-6 space-y-4">
          <p className="text-sm font-semibold text-neutral-700 mb-2">Nos Services</p>
          
          {/* Épaviste Service */}
          <Link
            href="/epaviste"
            onClick={onClose}
            className="block bg-gradient-to-br from-brand-red to-brand-red-dark rounded-2xl p-6 text-white active:scale-95 transition-transform"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Truck size={24} weight="bold" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Enlèvement d'Épave</h3>
                <p className="text-white/80 text-sm">Service 100% gratuit</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-white/20 rounded-full">Gratuit</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">24-48h</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">Agréé VHU</span>
            </div>
          </Link>

          {/* Rachat Service */}
          <Link
            href="/rachat-voiture"
            onClick={onClose}
            className="block bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-2xl p-6 text-white active:scale-95 transition-transform"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <CurrencyEur size={24} weight="bold" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Rachat de Voiture</h3>
                <p className="text-white/80 text-sm">Paiement cash immédiat</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-white/20 rounded-full">Cash</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">Gratuit</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">Meilleur prix</span>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-neutral-50 space-y-3">
          <p className="text-sm font-semibold text-neutral-700 mb-4">Contact rapide</p>
          
          <a
            href="tel:0979049486"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-brand-blue active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
              <Phone size={20} weight="bold" className="text-brand-blue" />
            </div>
            <div>
              <div className="text-sm text-neutral-600">Appelez-nous</div>
              <div className="font-bold text-neutral-900">09 79 04 94 86</div>
            </div>
          </a>

          <a
            href="https://wa.me/33602427345"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-whatsapp rounded-xl text-white active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <WhatsappLogo size={20} weight="fill" />
            </div>
            <div>
              <div className="text-sm text-white/80">Message WhatsApp</div>
              <div className="font-bold">Réponse rapide</div>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="p-6 text-center text-sm text-neutral-600">
          <p>Disponible 7j/7</p>
          <p className="font-semibold text-neutral-900 mt-1">Toute l'Île-de-France</p>
        </div>
      </div>
    </>
  );
}
