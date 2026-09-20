import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import { getIdfIntents } from '@/data/idf-intents';

interface IdfIntentLinksProps {
  service: 'epaviste' | 'rachat-voiture';
  /** Compact: inline chips (department pages); default: card list (hubs). */
  variant?: 'cards' | 'chips';
}

/**
 * "Situations particulières" — links to the Île-de-France situation pages
 * of one service (S2.1). Server component; every link is in the HTML.
 */
export default function IdfIntentLinks({ service, variant = 'cards' }: IdfIntentLinksProps) {
  const intents = getIdfIntents(service);
  const isRachat = service === 'rachat-voiture';
  const hover = isRachat ? 'hover:border-brand-gold/40 hover:text-brand-gold' : 'hover:border-brand-red/40 hover:text-brand-red';

  if (variant === 'chips') {
    return (
      <ul className="flex flex-wrap gap-2">
        {intents.map((i) => (
          <li key={i.slug}>
            <Link href={`/${service}/ile-de-france/${i.slug}`} className={`px-3 py-1.5 rounded-full text-sm border border-neutral-200 text-brand-navy ${hover}`}>
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-neutral-200" aria-labelledby="situations-title">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className={`inline-block ${isRachat ? 'text-brand-gold' : 'text-brand-red'} text-sm font-semibold tracking-wider uppercase mb-4`}>Situations particulières</span>
            <h2 id="situations-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
              {isRachat ? 'Vendre une voiture… quelle que soit sa situation' : 'Une épave… dans chaque situation'}
            </h2>
            <p className="text-neutral-600 mt-3">
              {isRachat
                ? 'Sans contrôle technique, accidentée, en panne, gagée, en succession : la règle applicable et notre réponse, cas par cas.'
                : 'Sans carte grise, en sous-sol, brûlée, gagée, en fourrière, en succession : la démarche exacte et ce que nous faisons, cas par cas.'}
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {intents.map((i) => (
              <li key={i.slug}>
                <Link href={`/${service}/ile-de-france/${i.slug}`} className={`flex items-center justify-between gap-3 p-4 bg-white rounded-xl border border-neutral-200 text-brand-navy font-medium text-sm transition-colors ${hover}`}>
                  <span>{i.label}</span>
                  <CaretRight size={16} weight="bold" className="flex-shrink-0 text-neutral-400" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
