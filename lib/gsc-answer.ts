/**
 * The H2 answer for a T1 commune page (S3.1.c) — server-only.
 *
 * Built only from facts the site already publishes and sources: INSEE
 * population and EPCI, distance to the nearest communes (centroids), the rail
 * lines of Île-de-France Mobilités open data, the ZFE perimeter, and the
 * intervention delays stated site-wide (2 h petite couronne, 24 h elsewhere).
 * Nothing is invented; phrasing rotates by commune so the 30 answers do not
 * read as one template.
 */

import type { ResolvedIdfCity } from './idf-city-content';
import { getGscT1Action, type GscT1Action } from '@/data/gsc-actions';
import { aLieu, interventionDelay, PHONE_DISPLAY } from './seo';

export interface GscAnswer {
  query: string;
  h2: string;
  paragraphs: string[];
}

function pick<T>(items: T[], key: string, salt = 0): T {
  let h = salt;
  for (const ch of key) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
  return items[h % items.length];
}

const fmtKm = (km: number) => `${Math.max(1, Math.round(km))} km`;
const MAX_WORDS = 150;
const wordCount = (parts: string[]) => parts.join(' ').split(/\s+/).filter(Boolean).length;

/** "CA du Pays de Meaux" → "la communauté d’agglomération du Pays de Meaux". */
function epciPhrase(epci: string): string {
  const m = epci.match(/^(CA|CC|CU) (.*)$/);
  if (!m) return `la ${epci}`;
  // "CA Val d'Europe Agglomération" already says what it is.
  if (/agglom|communaut/i.test(m[2])) return m[2];
  const kind = { CA: 'communauté d’agglomération', CC: 'communauté de communes', CU: 'communauté urbaine' }[m[1] as 'CA' | 'CC' | 'CU'];
  return `la ${kind} ${m[2]}`;
}

function listFr(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`;
}

function epaviste(city: ResolvedIdfCity, action: GscT1Action): GscAnswer {
  const { ref, facts } = city;
  const key = ref.slug;
  const where = aLieu(ref.name);
  const delay = interventionDelay(ref.deptCode) ?? 'sous 24 h';
  const delayLong = delay === 'sous 2 h' ? 'sous 2 h' : 'sous 24 h, souvent le jour même';
  const near = city.nearest.slice(0, 3).map((n) => `${n.name} (${fmtKm(n.distanceKm)})`);
  const pop = ref.population ? `${ref.population.toLocaleString('fr-FR')} habitants` : null;

  const open = pick(
    [
      `Vous cherchez un épaviste ${where} (${ref.postalCode}) ? Nous enlevons gratuitement les véhicules hors d'usage dans toute la commune, intervention ${delayLong}.`,
      `Pour faire enlever une épave ${where} (${ref.postalCode}), un appel suffit : l'enlèvement est gratuit et nous intervenons ${delayLong}.`,
      `Épaviste agréé VHU ${where} (${ref.postalCode}) : nous venons chercher gratuitement votre véhicule hors d'usage, ${delayLong}.`,
    ],
    key
  );
  const local = [
    pop && facts?.epci ? `${ref.name} compte ${pop} (INSEE) et fait partie de ${epciPhrase(facts.epci)}.` : pop ? `${ref.name} compte ${pop} (INSEE).` : '',
    near.length ? pick([`La même tournée dessert ${listFr(near)}.`, `Nous passons aussi par ${listFr(near)}.`, `Les communes voisines — ${listFr(near)} — sont desservies dans la même tournée.`], key, 1) : '',
  ].filter(Boolean);
  const method = pick(
    [
      `Voiture qui ne roule plus, roues bloquées, en garage ou en parking : le plateau est équipé d'un treuil.`,
      `Le véhicule peut être roulant ou non, garé dans la rue, dans une cour ou en sous-sol : nous venons avec le treuil.`,
      `Panne, accident, contrôle technique refusé ou voiture immobilisée depuis des mois : nous l'enlevons en l'état.`,
    ],
    key,
    2
  );
  const zfe = facts?.zfe
    ? `${ref.name} est dans le périmètre de la ZFE du Grand Paris : un véhicule ancien que vous ne pouvez plus utiliser part sans frais.`
    : '';
  const close = `Sur place, vous signez la déclaration de cession, nous l'enregistrons en ligne et le certificat de destruction du centre VHU agréé partenaire met fin à votre responsabilité. ☎ ${PHONE_DISPLAY}.`;

  const second = [method, zfe, close].filter(Boolean);
  // 80–150 words: the method sentence is the first to go.
  if (wordCount([open, ...local, ...second]) > MAX_WORDS) second.shift();

  return {
    query: action.query,
    h2: pick(
      [
        `Épaviste ${where} : enlèvement d'épave gratuit ${delay}`,
        `Épaviste ${ref.name} : qui appeler pour un enlèvement gratuit ?`,
        `Enlèvement d'épave gratuit ${where}, ${delay}`,
      ],
      key,
      3
    ),
    paragraphs: [[open, ...local].join(' '), second.join(' ')],
  };
}

function rachat(city: ResolvedIdfCity, action: GscT1Action): GscAnswer {
  const { ref, facts } = city;
  const key = ref.slug;
  const where = aLieu(ref.name);
  const near = city.nearest.slice(0, 3).map((n) => n.name);
  const pop = ref.population ? `${ref.population.toLocaleString('fr-FR')} habitants (INSEE)` : null;

  const open = pick(
    [
      `Pour un rachat de voiture ${where} (${ref.postalCode}), envoyez-nous la marque, le modèle, l'année, le kilométrage et quelques photos : vous recevez une offre ferme, qui ne change pas à l'arrivée du plateau.`,
      `Vendre sa voiture ${where} (${ref.postalCode}) se fait en une visite : vous décrivez le véhicule et envoyez des photos, nous faisons une offre ferme, puis nous venons le chercher.`,
    ],
    key
  );
  const scope = `Nous rachetons les véhicules roulants ou non, avec ou sans contrôle technique, en panne, accidentés ou très kilométrés${near.length ? `, ${where} comme à ${listFr(near)}` : ''}.`;
  const local = pop && facts?.epci ? `${ref.name} compte ${pop} et fait partie de ${epciPhrase(facts.epci)}.` : pop ? `${ref.name} compte ${pop}.` : '';
  const close = `Le paiement se fait le jour de l'enlèvement, qui est inclus ; nous remplissons la déclaration de cession avec vous et l'enregistrons en ligne. Si la voiture n'a plus de valeur, nous vous le disons et proposons l'enlèvement gratuit avec certificat de destruction. ☎ ${PHONE_DISPLAY}.`;

  return {
    query: action.query,
    h2: pick(
      [
        `Rachat voiture ${where} : offre ferme et paiement cash`,
        `Rachat voiture ${ref.name} : comment vendre en une visite`,
      ],
      key,
      3
    ),
    paragraphs: [[open, local].filter(Boolean).join(' '), [scope, close].join(' ')],
  };
}

/** The T1 answer for a commune page, or null when the page is not a T1 target. */
export function getGscCityAnswer(service: 'epaviste' | 'rachat-voiture', city: ResolvedIdfCity): GscAnswer | null {
  const action = getGscT1Action(`/${service}/${city.ref.deptSlug}/${city.ref.slug}`);
  if (!action) return null;
  if (action.h2 && action.paragraphs) return { query: action.query, h2: action.h2, paragraphs: action.paragraphs };
  return service === 'epaviste' ? epaviste(city, action) : rachat(city, action);
}

/** Hand-written T1 answer for a hub page (department / region), or null. */
export function getGscHubAnswer(path: string): GscAnswer | null {
  const action = getGscT1Action(path);
  return action?.h2 && action.paragraphs ? { query: action.query, h2: action.h2, paragraphs: action.paragraphs } : null;
}
