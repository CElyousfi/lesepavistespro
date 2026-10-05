import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/GuideShell';
import { generateMeta } from '@/lib/seo';
import { getBreadcrumbData, getBlogArticleData, getWebPageData, renderJSONLD } from '@/lib/structured-data';
import { getSiteUrl } from '@/lib/site';
import {
  PARIS_FOURRIERE_SITES,
  PARIS_FOURRIERE_SOURCE,
  PARIS_TARIF,
  PARIS_TARIF_2RM,
  NATIONAL_FEE_CAPS,
  DEPT_FOURRIERES,
  FOURRIERES_CHECKED_AT,
} from '@/data/idf-fourrieres';
import { INTENT_SOURCES } from '@/data/idf-intents';

const PATH = '/guides/fourrieres-ile-de-france';
const TITLE = 'Fourrières en Île-de-France : adresses, horaires et tarifs 2026';
const DESCRIPTION =
  "Fourrières d'Île-de-France : les 8 sites de Paris (adresses, horaires), les tarifs 2026 et où trouver votre véhicule dans les 77, 78, 91, 92, 93, 94, 95.";

export const metadata: Metadata = generateMeta({
  title: { absolute: 'Fourrières Île-de-France 2026 : adresses, horaires, tarifs' },
  description: DESCRIPTION,
  path: PATH,
});

export default function FourrieresIdfGuide() {
  const base = getSiteUrl();
  const url = `${base}${PATH}`;
  const structuredData = [
    getWebPageData(url, TITLE, DESCRIPTION),
    getBreadcrumbData([
      { name: 'Accueil', url: base },
      { name: 'Guides', url: `${base}/blog` },
      { name: 'Fourrières en Île-de-France', url },
    ]),
    getBlogArticleData({ title: TITLE, description: DESCRIPTION, author: 'Les Épavistes Pro', publishDate: FOURRIERES_CHECKED_AT, modifiedDate: FOURRIERES_CHECKED_AT, url }),
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Fourrières et préfourrières de la Ville de Paris et procédures par département d’Île-de-France',
      description:
        'Nom, adresse, téléphone et horaires des 5 préfourrières et 3 fourrières de la Ville de Paris, tarifs 2026 (Paris et plafonds nationaux), et page officielle des gardiens de fourrière agréés pour chaque département d’Île-de-France.',
      url,
      dateModified: FOURRIERES_CHECKED_AT,
      inLanguage: 'fr-FR',
      spatialCoverage: { '@type': 'Place', name: 'Île-de-France' },
      creator: { '@id': `${base}/#organization` },
      isBasedOn: [PARIS_FOURRIERE_SOURCE.url, NATIONAL_FEE_CAPS.url, ...DEPT_FOURRIERES.map((d) => d.prefectureUrl)],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJSONLD(structuredData)} />
      <GuideShell
        title={TITLE}
        crumb="Fourrières en Île-de-France"
        updatedAt={FOURRIERES_CHECKED_AT}
        lead="Votre voiture a été enlevée, ou vous cherchez à savoir où un véhicule a été emmené ? Voici les fourrières de Paris avec leurs adresses et horaires, les tarifs en vigueur en 2026 et, pour chaque département d’Île-de-France, la marche à suivre et la liste officielle des gardiens agréés."
      >
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Paris : 5 préfourrières et 3 fourrières</h2>
          <p className="text-neutral-700 leading-relaxed mb-6">
            À Paris, la Ville gère les fourrières. Un véhicule enlevé est conduit dans l’une des cinq préfourrières, où il reste 2 à 5 jours,
            puis transféré dans l’une des trois fourrières. Pour le localiser : le 3975 (coût d’un appel local) ou le portail « Où est mon
            véhicule ? » (oemv-fourrieres.paris.fr). Non réclamé, un véhicule peut être vendu ou détruit après 10 à 15 jours.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Préfourrières et fourrières de la Ville de Paris</caption>
              <thead className="bg-neutral-50 text-brand-navy">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Site</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Adresse</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Téléphone</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Horaires</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                {PARIS_FOURRIERE_SITES.map((f) => (
                  <tr key={f.name}>
                    <td className="px-4 py-3 align-top font-semibold text-brand-navy">{f.name}</td>
                    <td className="px-4 py-3 align-top">{f.kind}</td>
                    <td className="px-4 py-3 align-top">{f.address}</td>
                    <td className="px-4 py-3 align-top whitespace-nowrap">{f.phone}</td>
                    <td className="px-4 py-3 align-top">{f.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-neutral-700">
            <strong>Tarifs à Paris :</strong> {PARIS_TARIF} ; {PARIS_TARIF_2RM}.
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            Source :{' '}
            <a href={PARIS_FOURRIERE_SOURCE.url} rel="noopener" className="underline underline-offset-2">
              {PARIS_FOURRIERE_SOURCE.label}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Hors Paris : les tarifs maximums en 2026</h2>
          <p className="text-neutral-700 leading-relaxed mb-6">
            Hors Paris, les frais de fourrière d’une voiture particulière ne peuvent pas dépasser les plafonds fixés par arrêté. Ceux-ci ont
            été revalorisés au 1er octobre 2026 :
          </p>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 max-w-xl">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Tarifs maximums des frais de fourrière, voiture particulière</caption>
              <thead className="bg-neutral-50 text-brand-navy">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Prestation</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Montant maximum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                {NATIONAL_FEE_CAPS.rows.map((r) => (
                  <tr key={r.label}>
                    <td className="px-4 py-3">{r.label}</td>
                    <td className="px-4 py-3 font-semibold">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            Source :{' '}
            <a href={NATIONAL_FEE_CAPS.url} rel="noopener" className="underline underline-offset-2">
              {NATIONAL_FEE_CAPS.source}
            </a>
            , en vigueur le 1er octobre 2026.
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Département par département</h2>
          <p className="text-neutral-700 leading-relaxed mb-6">
            Hors Paris, il n’existe pas de fourrière unique : chaque commune travaille avec sa fourrière municipale ou avec un gardien agréé par
            la préfecture. Les préfectures publient la liste des gardiens agréés ; nous renvoyons vers ces listes officielles plutôt que de les
            recopier, car elles changent au fil des agréments.
          </p>
          <div className="space-y-6">
            {DEPT_FOURRIERES.map((d) => (
              <article key={d.code} className="p-6 bg-brand-surface rounded-2xl border border-neutral-200">
                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  {d.name} ({d.code})
                </h3>
                <p className="text-neutral-700 leading-relaxed">{d.note}</p>
                {d.parisSites.length > 0 && (
                  <ul className="mt-3 text-sm text-neutral-700 list-disc ml-5">
                    {d.parisSites.map((s) => (
                      <li key={s.name}>
                        <strong>{s.name}</strong> — {s.address} — {s.hours} — ☎ {s.phone}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-3 text-sm flex flex-wrap gap-x-4 gap-y-1">
                  <a href={d.prefectureUrl} rel="noopener" className="font-semibold text-brand-navy underline underline-offset-4">
                    Liste officielle des fourrières agréées ({d.name})
                  </a>
                  <Link href={`/epaviste/${d.slug}`} className="font-semibold text-brand-red hover:underline underline-offset-4">
                    Épaviste {d.name} ({d.code})
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Délais et démarches</h2>
          <ul className="space-y-3 text-neutral-700 leading-relaxed list-disc ml-5">
            <li>Le propriétaire est informé de la mise en fourrière par lettre recommandée dans les 5 jours ouvrables.</li>
            <li>
              Un véhicule non réclamé est réputé abandonné : il peut être remis aux Domaines pour être vendu après 15 jours, ou détruit après
              10 jours s’il est jugé hors d’état de circuler. Les frais restent dus.
            </li>
            <li>Pour le récupérer : attestation d’assurance, permis de conduire, certificat d’immatriculation et autorisation de sortie (mainlevée).</li>
          </ul>
          <p className="mt-2 text-xs text-neutral-500">Source : {INTENT_SOURCES.SP_FOURRIERE}.</p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Le véhicule ne vaut pas les frais ?</h2>
          <p className="text-neutral-700 leading-relaxed">
            Quand la réparation et les frais de garde dépassent la valeur de la voiture, la destruction est souvent la solution la moins
            coûteuse. Avec votre mandat écrit, nous pouvons récupérer le véhicule en fourrière et le remettre à un centre VHU agréé partenaire,
            qui établit le certificat de destruction : vous n’êtes plus responsable du véhicule.{' '}
            <Link href="/epaviste/ile-de-france/fourriere" className="font-semibold text-brand-red hover:underline underline-offset-4">
              Voiture en fourrière : comment la faire détruire
            </Link>
            . Si elle a encore de la valeur, nous pouvons aussi la{' '}
            <Link href="/rachat-voiture/ile-de-france" className="font-semibold text-brand-gold hover:underline underline-offset-4">
              racheter en Île-de-France
            </Link>
            .
          </p>
        </section>
      </GuideShell>
    </>
  );
}
