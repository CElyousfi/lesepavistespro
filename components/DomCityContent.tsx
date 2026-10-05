import Link from 'next/link';
import type { DomCityContent as Content } from '@/data/dom-cities';
import { formatFrenchDate } from '@/lib/lastmod';

/**
 * Tier-A depth for overseas commune pages (S3.4) — server component. The
 * questions of `content` are rendered by the page FAQ (merged into the single
 * FAQPage); this block carries the intro, situations and access notes.
 */
export default function DomCityContent({
  content,
  service,
  deptSlug,
  citySlug,
  cityName,
}: {
  content: Content;
  service: 'epaviste' | 'rachat-voiture';
  deptSlug: string;
  citySlug: string;
  cityName: string;
}) {
  const isRachat = service === 'rachat-voiture';
  const block = isRachat ? content.rachat : content.epaviste;
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-neutral-200" data-dom-content>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-6 tracking-tight">{block.h2}</h2>
          <div className="space-y-5 text-neutral-700 text-lg leading-relaxed">
            {block.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-navy mt-12 mb-6 tracking-tight">Situations fréquentes à {cityName}</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {block.situations.map((s) => (
              <li key={s.title} className="p-5 bg-brand-surface rounded-2xl border border-neutral-200">
                <h3 className="font-bold text-brand-navy mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ul>
          {!isRachat && (
            <>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-navy mt-12 mb-6 tracking-tight">Accès et repères à {cityName}</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                {content.epaviste.acces.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </>
          )}
          <p className="mt-10 text-sm flex flex-wrap gap-x-5 gap-y-2 font-semibold">
            <Link href={`/${isRachat ? 'epaviste' : 'rachat-voiture'}/${deptSlug}/${citySlug}`} className={isRachat ? 'text-brand-red' : 'text-brand-gold'}>
              {isRachat ? `Épaviste à ${cityName}` : `Rachat voiture à ${cityName}`}
            </Link>
            <Link href={`/centre-vhu-agree/${deptSlug}`} className="text-brand-navy">
              Centre VHU agréé : destruction et certificat
            </Link>
          </p>
          <p className="mt-6 text-xs text-neutral-400">
            Mis à jour le {formatFrenchDate(content.updatedAt)}. Sources : {content.sources.join(' · ')}.
          </p>
        </div>
      </div>
    </section>
  );
}
