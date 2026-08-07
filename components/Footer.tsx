'use client';

import { Phone, EnvelopeSimple, MapPin } from '@phosphor-icons/react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-nosnippet className="bg-brand-navy pt-20 pb-28 lg:pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">

            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-5">
                <span className="font-bold text-xl text-white tracking-tight">
                  LesEpavistes<span className="text-brand-gold">pro</span>
                </span>
              </Link>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Service professionnel agréé VHU. Enlèvement d&apos;épave gratuit et rachat de véhicules partout en France.
              </p>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-semibold text-sm text-white mb-5">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/epaviste" className="text-neutral-400 hover:text-white text-sm transition-colors">Enlèvement d&apos;Épave</Link></li>
                <li><Link href="/rachat-voiture" className="text-neutral-400 hover:text-white text-sm transition-colors">Rachat de Voiture</Link></li>
                <li><Link href="/zones" className="text-neutral-400 hover:text-white text-sm transition-colors">Zones d&apos;Intervention</Link></li>
                <li><Link href="/blog" className="text-neutral-400 hover:text-white text-sm transition-colors">Conseils &amp; Actus</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-semibold text-sm text-white mb-5">Informations</h4>
              <ul className="space-y-3">
                <li><Link href="/mentions-legales" className="text-neutral-400 hover:text-white text-sm transition-colors">Mentions Légales</Link></li>
                <li><Link href="/politique-de-confidentialite" className="text-neutral-400 hover:text-white text-sm transition-colors">Confidentialité</Link></li>
                <li><Link href="/cookies" className="text-neutral-400 hover:text-white text-sm transition-colors">Cookies</Link></li>
                <li><Link href="/faq" className="text-neutral-400 hover:text-white text-sm transition-colors">FAQ</Link></li>
                <li><Link href="/documents" className="text-neutral-400 hover:text-white text-sm transition-colors">Documents</Link></li>
                <li><Link href="/conformite-vhu" className="text-neutral-400 hover:text-white text-sm transition-colors">Conformité VHU</Link></li>
                <li><Link href="/contact" className="text-neutral-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-semibold text-sm text-white mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300">06 02 42 73 45<br /><span className="text-neutral-500">7j/7 - 8h à 20h</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <EnvelopeSimple size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 break-all">contact@lesepavistes.pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300">France Entière</span>
                </li>
              </ul>
            </div>

          </div>

          {/* VHU Agrément bar */}
          <div className="pt-8 pb-6 border-t border-white/10 flex items-center justify-center gap-4">
            <div className="relative w-14 h-8 shrink-0">
              <Image
                src="/images/centre-vhu-agree.jpeg"
                alt="Centre VHU Agréé"
                fill
                sizes="56px"
                className="rounded object-cover"
              />
            </div>
            <p className="text-neutral-400 text-sm">
              Partenaire centre VHU agréé · <span className="text-brand-gold font-semibold">N° PR9500003D</span>
            </p>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col items-center md:flex-row md:justify-between gap-4">
            <p className="text-neutral-500 text-xs">
              &copy; {currentYear} LesEpavistespro. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link href="/mentions-legales" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors">Mentions Légales</Link>
              <Link href="/politique-de-confidentialite" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors">Confidentialité</Link>
              <Link href="/cookies" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors">Cookies</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
