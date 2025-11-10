'use client';

import { Phone, EnvelopeSimple, MapPin, FacebookLogo, InstagramLogo } from '@phosphor-icons/react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white overflow-hidden p-1 md:p-[0.25%] pb-20 md:pb-1">
      <div className="w-full md:w-[99.5%] mx-auto">
        <div className="w-full bg-brand-navy text-white border-2 border-neutral-200 rounded-xl sm:rounded-2xl md:rounded-3xl px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Les Épavistes Pro</h3>
            <p className="text-neutral-300 mb-4">
              Épaviste agréé VHU en Île-de-France. Service d'enlèvement d'épave gratuit et rachat de véhicules 7j/7.
            </p>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/profile.php?id=61552439650150" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors" aria-label="Facebook">
                <FacebookLogo size={24} weight="regular" />
              </a>
              <a href="https://www.instagram.com/lesepavistespro" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors" aria-label="Instagram">
                <InstagramLogo size={24} weight="regular" />
              </a>
            </div>
          </div>

          {/* Services Épaviste */}
          <div>
            <h4 className="font-semibold mb-4">Épaviste</h4>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <li><Link href="/epaviste" className="hover:text-brand-red transition-colors">Enlèvement d'épave gratuit</Link></li>
              <li><Link href="/epaviste/paris-75" className="hover:text-brand-red transition-colors">Épaviste Paris</Link></li>
              <li><Link href="/epaviste/hauts-de-seine-92" className="hover:text-brand-red transition-colors">Épaviste 92</Link></li>
              <li><Link href="/epaviste/seine-saint-denis-93" className="hover:text-brand-red transition-colors">Épaviste 93</Link></li>
              <li><Link href="/epaviste/val-de-marne-94" className="hover:text-brand-red transition-colors">Épaviste 94</Link></li>
              <li><Link href="/epaviste/val-d-oise-95" className="hover:text-brand-red transition-colors">Épaviste 95</Link></li>
            </ul>
          </div>

          {/* Services Rachat */}
          <div>
            <h4 className="font-semibold mb-4">Rachat Voiture</h4>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <li><Link href="/rachat-voiture" className="hover:text-brand-gold transition-colors">Rachat voiture cash</Link></li>
              <li><Link href="/rachat-voiture/paris-75" className="hover:text-brand-gold transition-colors">Rachat Paris</Link></li>
              <li><Link href="/rachat-voiture/hauts-de-seine-92" className="hover:text-brand-gold transition-colors">Rachat 92</Link></li>
              <li><Link href="/rachat-voiture/seine-saint-denis-93" className="hover:text-brand-gold transition-colors">Rachat 93</Link></li>
              <li><Link href="/rachat-voiture/val-de-marne-94" className="hover:text-brand-gold transition-colors">Rachat 94</Link></li>
              <li><Link href="/rachat-voiture/val-d-oise-95" className="hover:text-brand-gold transition-colors">Rachat 95</Link></li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-neutral-300 text-sm">
              <li className="flex items-start">
                <Phone size={18} weight="bold" className="mr-2 mt-0.5 flex-shrink-0 text-brand-red" />
                <a href="tel:0979049486" className="hover:text-brand-red transition-colors">
                  09 79 04 94 86
                </a>
              </li>
              <li className="flex items-start">
                <EnvelopeSimple size={18} weight="bold" className="mr-2 mt-0.5 flex-shrink-0 text-brand-red" />
                <a href="mailto:lesepavistespro@gmail.com" className="hover:text-brand-red transition-colors break-all">
                  lesepavistespro@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} weight="bold" className="mr-2 mt-0.5 flex-shrink-0 text-brand-red" />
                <span>Île-de-France</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-sm font-semibold mb-1">Horaires</div>
              <div className="text-xs text-neutral-400">
                24h/24 • 7j/7<br />
                Service disponible jour et nuit
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-neutral-700 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center px-4">
            <h4 className="font-semibold mb-2 text-base sm:text-lg">La newsletter des entreprises</h4>
            <p className="text-xs sm:text-sm text-neutral-400 mb-4">
              En souscrivant, je confirme que je lis et j'accepte les termes de la politique de confidentialité.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-mail *"
                className="flex-1 px-4 py-3 sm:py-2 rounded-lg bg-white/10 border border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 sm:py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-light transition-colors font-medium shadow-lg hover:shadow-xl whitespace-nowrap text-sm sm:text-base"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <div className="mb-4 md:mb-0">
            ©{currentYear} Les Épavistes Pro - Tous droits réservés
          </div>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-brand-red transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-brand-red transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
