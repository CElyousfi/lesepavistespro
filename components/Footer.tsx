import { Phone, EnvelopeSimple, MapPin } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import Image from 'next/image';
import { getIdfDepartments, getTopIdfCities } from '@/lib/idf-cities';

/** Most-populated IDF communes linked from every page. */
const FOOTER_IDF_CITIES = 20;

/**
 * Site footer — server component so the Île-de-France links are derived
 * from the dataset (INSEE population), never a hardcoded slug list. Client
 * page templates must not import it: the route renders it after them.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const departments = getIdfDepartments();
  const topCities = getTopIdfCities(FOOTER_IDF_CITIES);

  return (
    <footer data-nosnippet className="bg-brand-navy pt-20 pb-28 lg:pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-5">
                <span className="font-bold text-xl text-white tracking-tight">
                  LesEpavistes<span className="text-brand-gold">pro</span>
                </span>
              </Link>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Épaviste agréé VHU en Île-de-France&nbsp;: enlèvement d&apos;épave gratuit et rachat de véhicules à Paris et dans
                les 8 départements franciliens. Intervention aussi partout en France.
              </p>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-semibold text-sm text-white mb-5">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/epaviste" className="text-neutral-400 hover:text-white text-sm transition-colors">Enlèvement d&apos;Épave</Link></li>
                <li><Link href="/rachat-voiture" className="text-neutral-400 hover:text-white text-sm transition-colors">Rachat de Voiture</Link></li>
                <li><Link href="/epaviste/ile-de-france" className="text-neutral-400 hover:text-white text-sm transition-colors">Épaviste Île-de-France</Link></li>
                <li><Link href="/rachat-voiture/ile-de-france" className="text-neutral-400 hover:text-white text-sm transition-colors">Rachat voiture Île-de-France</Link></li>
                <li><Link href="/zones" className="text-neutral-400 hover:text-white text-sm transition-colors">Toute la France</Link></li>
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
                  <span className="text-sm text-neutral-300">
                    <a href="tel:+33602427345" className="hover:text-white">06 02 42 73 45</a>
                    <br /><span className="text-neutral-500">7j/7, 24h/24</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <EnvelopeSimple size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 break-all">contact@lesepavistes.pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300">Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Île-de-France: departments (both services) + top communes */}
          <nav aria-label="Île-de-France" className="border-t border-white/10 pt-8 pb-6">
            <h4 className="font-semibold text-sm text-white mb-4">Épaviste et rachat de voiture en Île-de-France</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 mb-6">
              {departments.map((d) => (
                <li key={d.slug} className="text-sm">
                  <Link href={`/epaviste/${d.slug}`} className="text-neutral-300 hover:text-white">
                    {d.name} ({d.code})
                  </Link>
                  <span className="text-neutral-600"> · </span>
                  <Link href={`/rachat-voiture/${d.slug}`} className="text-neutral-500 hover:text-white">
                    rachat
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {topCities.map((c) => (
                <li key={`${c.deptSlug}/${c.slug}`}>
                  <Link href={`/epaviste/${c.deptSlug}/${c.slug}`} className="text-xs text-neutral-500 hover:text-neutral-200">
                    Épaviste {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* VHU Agrément bar */}
          <div className="pt-8 pb-6 border-t border-white/10 flex items-center justify-center gap-4">
            <div className="relative w-14 h-8 shrink-0">
              <Image
                src="/images/centre-vhu-agree.webp"
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
