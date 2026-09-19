import Link from 'next/link';
import { MapPin, CaretRight } from '@phosphor-icons/react/dist/ssr';

interface AlsoInIdfProps {
  /** Where the block sits, for the copy ("en Bretagne", "à Lyon"…). Optional. */
  context?: string;
}

/**
 * "Aussi en Île-de-France" — one contextual link to each IDF hub, rendered on
 * every NON-IDF page (region, department, city, blog). Two links, not spam:
 * this is how the national long tail passes equity back to the region where
 * the business actually operates (P2.3).
 */
export default function AlsoInIdf({ context }: AlsoInIdfProps) {
  return (
    <aside className="py-10 bg-brand-surface border-t border-neutral-200" aria-label="Aussi en Île-de-France">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex items-start gap-3 flex-1">
            <MapPin size={22} weight="fill" className="text-brand-red flex-shrink-0 mt-0.5" />
            <p className="text-sm text-neutral-600 leading-relaxed">
              <strong className="text-brand-navy">Aussi en Île-de-France.</strong> Notre base est à Paris et en petite couronne&nbsp;:
              intervention sous 2&nbsp;h dans les 8 départements franciliens{context ? `, comme ${context}` : ''}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/epaviste/ile-de-france" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-brand-red/10 text-brand-red hover:bg-brand-red/20 transition-colors">
              Épaviste Île-de-France <CaretRight size={12} weight="bold" />
            </Link>
            <Link href="/rachat-voiture/ile-de-france" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition-colors">
              Rachat voiture Île-de-France <CaretRight size={12} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
