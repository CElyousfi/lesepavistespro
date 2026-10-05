import Link from 'next/link';
import { getIdfDepartments } from '@/lib/idf-cities';
import { idfLocative } from '@/lib/idf';
import NearMeButton from '@/components/NearMeButton';

/**
 * « Près de chez vous » (S3.4) — for « … autour de moi » searches (25 % of
 * clicks on the 5 Oct 2026 import). The 8 departments are server-rendered
 * (crawlable, and the answer without permission); the opt-in button adds the
 * 5 nearest communes.
 */
/**
 * `showDepartments={false}` on pages that already list the 8 departments right
 * below (the IDF region hubs), to avoid duplicate links and page weight.
 */
export default function NearMe({ service = 'epaviste', showDepartments = true }: { service?: 'epaviste' | 'rachat-voiture'; showDepartments?: boolean }) {
  const label = service === 'rachat-voiture' ? 'Rachat voiture' : 'Épaviste';
  return (
    <section className="py-14 sm:py-16 bg-brand-surface border-t border-neutral-200" id="pres-de-chez-vous">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight text-center mb-3">
            {label} près de chez vous
          </h2>
          <p className="text-neutral-600 text-center mb-8">
            {showDepartments
              ? 'Choisissez votre département, ou laissez-nous trouver les communes les plus proches de vous.'
              : 'Laissez-nous trouver les communes les plus proches de vous, ou choisissez votre département ci-dessous.'}
          </p>
          {showDepartments && (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {getIdfDepartments().map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/${service}/${d.slug}`}
                  className="block p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md text-sm text-center"
                >
                  <span className="block font-bold text-brand-navy">{d.name} ({d.code})</span>
                  <span className="block text-xs text-neutral-500 mt-1">{label} {idfLocative(d.code, d.name)}</span>
                </Link>
              </li>
            ))}
          </ul>
          )}
          <NearMeButton service={service} />
        </div>
      </div>
    </section>
  );
}
