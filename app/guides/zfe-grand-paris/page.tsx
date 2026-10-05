import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/GuideShell';
import { generateMeta } from '@/lib/seo';
import { getBreadcrumbData, getBlogArticleData, getWebPageData, renderJSONLD } from '@/lib/structured-data';
import { getSiteUrl } from '@/lib/site';
import { getAllIdfCities } from '@/lib/idf-cities';
import { getIdfCommuneFacts } from '@/data/idf-facts.generated';
import { ZFE_FACTS, CRITAIR_CLASSES, ZFE_SOURCES, ZFE_CHECKED_AT, ZFE_COMMUNE_COUNT } from '@/data/zfe-grand-paris';

const PATH = '/guides/zfe-grand-paris';
const TITLE = 'ZFE du Grand Paris en 2026 : règles, périmètre, Crit’Air et calendrier';
const DESCRIPTION =
  "ZFE du Grand Paris en 2026 : périmètre (77 communes dans l'A86), vignettes Crit'Air concernées, horaires, amendes et que faire d'un véhicule non autorisé.";

export const metadata: Metadata = generateMeta({
  title: { absolute: 'ZFE Grand Paris 2026 : périmètre, Crit’Air, calendrier' },
  description: DESCRIPTION,
  path: PATH,
});

const DEPT_LABELS: Record<string, string> = {
  '75': 'Paris',
  '92': 'Hauts-de-Seine (92)',
  '93': 'Seine-Saint-Denis (93)',
  '94': 'Val-de-Marne (94)',
};

export default function ZfeGrandParisGuide() {
  const base = getSiteUrl();
  const url = `${base}${PATH}`;
  // The perimeter, from the same dataset the commune pages use.
  const zfeCities = getAllIdfCities().filter((c) => getIdfCommuneFacts(c.deptSlug, c.slug)?.zfe);
  const byDept = Object.keys(DEPT_LABELS).map((code) => ({
    code,
    cities: zfeCities.filter((c) => c.deptCode === code).sort((a, b) => a.name.localeCompare(b.name, 'fr', { numeric: true })),
  }));

  const structuredData = [
    getWebPageData(url, TITLE, DESCRIPTION),
    getBreadcrumbData([
      { name: 'Accueil', url: base },
      { name: 'Guides', url: `${base}/blog` },
      { name: 'ZFE du Grand Paris', url },
    ]),
    getBlogArticleData({ title: TITLE, description: DESCRIPTION, author: 'Les Épavistes Pro', publishDate: ZFE_CHECKED_AT, modifiedDate: ZFE_CHECKED_AT, url }),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJSONLD(structuredData)} />
      <GuideShell
        title={TITLE}
        crumb="ZFE du Grand Paris"
        updatedAt={ZFE_CHECKED_AT}
        lead="La zone à faibles émissions de la Métropole du Grand Paris restreint la circulation des véhicules les plus anciens à l’intérieur de l’A86. Voici, à jour d’octobre 2026, qui est concerné, où, quand, ce que l’on risque et ce que l’on peut faire d’un véhicule qui n’a plus le droit de circuler."
      >
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Les règles en 2026</h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>{ZFE_FACTS.rule}</p>
            <p>{ZFE_FACTS.sanctions}</p>
            <p>{ZFE_FACTS.legal}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Le périmètre : {ZFE_COMMUNE_COUNT} communes à l’intérieur de l’A86</h2>
          <p className="text-neutral-700 leading-relaxed mb-6">{ZFE_FACTS.perimeter}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {byDept.map((d) => (
              <div key={d.code} className="p-5 bg-brand-surface rounded-2xl border border-neutral-200">
                <h3 className="font-bold text-brand-navy mb-3">
                  {DEPT_LABELS[d.code]} — {d.code === '75' ? '20 arrondissements' : `${d.cities.length} communes`}
                </h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                  {d.cities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/epaviste/${c.deptSlug}/${c.slug}`} className="text-neutral-700 hover:text-brand-red underline-offset-4 hover:underline">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Liste issue du document « Communes comprises dans la ZFE-m » de la Métropole du Grand Paris ; pour les communes traversées par
            l’A86, seule la partie intérieure est concernée.
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Quelle vignette Crit’Air pour ma voiture ?</h2>
          <p className="text-neutral-700 leading-relaxed mb-6">
            La vignette dépend de la motorisation et de la norme Euro, que l’on déduit de la date de première immatriculation (case B de la carte
            grise). Elle se commande uniquement sur le site officiel certificat-air.gouv.fr.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Vignettes Crit’Air des voitures particulières et ZFE du Grand Paris</caption>
              <thead className="bg-neutral-50 text-brand-navy">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Vignette</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Essence</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Diesel</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Dans la ZFE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                {CRITAIR_CLASSES.map((c) => (
                  <tr key={c.vignette}>
                    <td className="px-4 py-3 font-semibold text-brand-navy whitespace-nowrap">{c.vignette}</td>
                    <td className="px-4 py-3">{c.essence}</td>
                    <td className="px-4 py-3">{c.diesel}</td>
                    <td className="px-4 py-3">{c.zfe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Calendrier</h2>
          <ul className="space-y-3 text-neutral-700 leading-relaxed list-disc ml-5">
            <li>Restriction des Crit’Air 3, 4, 5 et non classés du lundi au vendredi, de 8 h à 20 h, dans le périmètre de l’A86.</li>
            <li>21 mai 2026 : le Conseil constitutionnel censure la suppression des ZFE votée par le Parlement ; la ZFE du Grand Paris reste en vigueur.</li>
            <li>Jusqu’au 31 décembre 2026 : période pédagogique, aucune amende.</li>
            <li>À partir de 2027 : le calendrier des contrôles et des amendes doit être annoncé par la Métropole du Grand Paris — nous mettrons cette page à jour à la publication.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Que faire d’un véhicule qui n’a plus le droit de circuler ?</h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              <strong>Le garder et rouler hors des horaires ou du périmètre.</strong> La restriction ne s’applique qu’en semaine, de 8 h à 20 h, à
              l’intérieur de l’A86 ; le « Pass ZFE » permet une circulation ponctuelle de 24 heures.
            </p>
            <p>
              <strong>Le vendre.</strong> Une voiture Crit’Air 3 qui roule a encore une valeur, en particulier hors de la ZFE. Nous la rachetons
              avec ou sans contrôle technique, paiement le jour de l’enlèvement :{' '}
              <Link href="/rachat-voiture/ile-de-france" className="font-semibold text-brand-gold hover:underline underline-offset-4">
                rachat voiture en Île-de-France
              </Link>
              .
            </p>
            <p>
              <strong>Le faire détruire.</strong> Si elle ne roule plus ou ne vaut plus les réparations, l’enlèvement est gratuit et le
              certificat de destruction du centre VHU agréé partenaire met fin à l’assurance et à votre responsabilité :{' '}
              <Link href="/epaviste/ile-de-france/zfe-vieux-vehicule" className="font-semibold text-brand-red hover:underline underline-offset-4">
                vieux véhicule et ZFE : l’enlever gratuitement
              </Link>
              , ou{' '}
              <Link href="/epaviste/paris-75" className="font-semibold text-brand-red hover:underline underline-offset-4">
                épaviste à Paris
              </Link>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-navy mb-3">Sources</h2>
          <ul className="space-y-1 text-sm">
            {ZFE_SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener" className="text-neutral-600 underline underline-offset-2">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </GuideShell>
    </>
  );
}
