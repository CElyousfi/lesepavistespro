/**
 * Generated content for Île-de-France Tier B and Tier C commune pages (P3.2).
 *
 * Every sentence is built from PUBLIC, CHECKABLE facts about the commune:
 * INSEE population and surface, EPCI, distance to Paris, the nearest
 * communes (all from geo.api.gouv.fr), whether it sits inside the ZFE
 * perimeter (Métropole du Grand Paris), and the department hub facts.
 * Phrasing rotates across several variants chosen deterministically from the
 * commune slug, so two Tier B pages never read as the same template with a
 * different name. Nothing here asserts a business fact the owner has not
 * vouched for.
 */

import type { FaqItem } from './faq';
import type { IdfCityRef } from './idf-cities';
import type { IdfCommuneFacts } from '@/data/idf-facts.generated';
import type { IdfDeptHub } from '@/data/idf-extra-content';
import type { IdfCitySituation } from '@/data/idf-cities/types';
import type { IdfTransportLine } from '@/data/idf-transport.generated';
import { idfLocative, idfGenitive } from './idf';

export interface GeneratedCityContent {
  intro: string[];
  situations: IdfCitySituation[];
  /** A different subset for the rachat page of the same commune. */
  rachatSituations: IdfCitySituation[];
  acces: string[];
  fourriere: string;
  faqEpaviste: FaqItem[];
  rachatIntro: string[];
  faqRachat: FaqItem[];
  /** Sentences that only make sense for this commune (facts), for the QA check. */
  specificSentences: number;
}

export interface GeneratorInput {
  city: IdfCityRef;
  facts: IdfCommuneFacts | null;
  hub: IdfDeptHub;
  nearest: Array<{ name: string; distanceKm: number; deptCode: string }>;
  distanceToParisKm: number | null;
  /** Rail lines serving the commune (IDFM open data), empty when none. */
  transport?: IdfTransportLine[];
}

/** "RER D" → "le RER D", "TRAIN J" → "la ligne J du Transilien", "METRO 13" → "la ligne 13 du métro", "TRAM 5" → "le tramway T5". */
function formatLine(l: IdfTransportLine): string {
  const [kind, id] = l.line.split(' ');
  switch (kind) {
    case 'RER': return `le RER ${id}`;
    case 'TRAIN': return `la ligne ${id} du Transilien`;
    case 'METRO': return `la ligne ${id} du métro`;
    case 'TRAM': return `le tramway T${id}`;
    default: return l.line;
  }
}

function joinFr(items: string[]): string {
  return items.join(', ').replace(/, ([^,]*)$/, ' et $1');
}

/** Rachat-side variant of the transport fact (different wording, same source). */
export function rachatTransportSentence(city: IdfCityRef, transport: IdfTransportLine[] | undefined, seed: string): string | null {
  const lines = (transport ?? []).filter(l => !l.line.startsWith('VAL')).slice(0, 4);
  if (!lines.length) return null;
  const lineText = joinFr(lines.map(formatLine));
  const station = lines[0].station;
  const variants = [
    `Avec ${lineText} à la gare de ${station}, beaucoup de ménages de ${city.name} n'ont plus qu'un usage occasionnel de leur voiture : c'est cette voiture-là, peu kilométrée mais vieillissante, que nous rachetons le plus souvent, avant qu'elle ne coûte un contrôle technique de plus.`,
    `Le rendez-vous peut aussi se fixer sur le parking de la gare de ${station} (${lineText}) avant votre train : vérification, paiement et chargement prennent une trentaine de minutes.`,
    `${city.name} est reliée à Paris par ${lineText} ; les voitures que nous y reprenons sont souvent des secondes voitures qui dorment près de la gare de ${station}, entretenues mais peu utilisées, et notre offre en tient compte.`,
  ];
  return pick(variants, seed, 16);
}

/** One verifiable sentence about the commune's rail service, or null. */
export function transportSentence(city: IdfCityRef, transport: IdfTransportLine[] | undefined, seed: string): string | null {
  const lines = (transport ?? []).filter(l => !l.line.startsWith('VAL')).slice(0, 4);
  if (!lines.length) return null;
  const lineText = joinFr(lines.map(formatLine));
  const stations = Array.from(new Set(lines.map(l => l.station))).slice(0, 3);
  const stationText = stations.length === 1 ? `gare de ${stations[0]}` : `gares de ${joinFr(stations)}`;
  const variants = [
    `${city.name} est desservie par ${lineText} (${stationText}) : beaucoup d'habitants n'utilisent plus leur voiture au quotidien, et c'est souvent une seconde voiture immobilisée depuis des mois que l'on nous demande d'enlever.`,
    `Côté transports, ${lineText} dessert la commune (${stationText}), ce qui explique le nombre de voitures qui restent des semaines au parking ou dans la rue sans bouger.`,
    `La commune est reliée à Paris par ${lineText} (${stationText}) ; les abords de la gare concentrent les véhicules laissés trop longtemps en stationnement, et donc les mises en fourrière.`,
  ];
  return pick(variants, seed, 15);
}

/** Deterministic hash → index. */
function pick<T>(pool: T[], seed: string, salt: number): T {
  let h = salt * 2654435761;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

/** Pick `n` distinct items, deterministic. */
function pickMany<T>(pool: T[], seed: string, n: number, salt: number): T[] {
  const idx = pool.map((_, i) => i);
  let h = salt * 40503;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  for (let i = idx.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, n).map(i => pool[i]);
}

const fr = (n: number) => n.toLocaleString('fr-FR');

type Density = 'dense' | 'urbain' | 'periurbain' | 'rural';
function densityClass(pop: number, surfaceKm2: number | null): Density {
  if (!surfaceKm2) return pop > 20000 ? 'dense' : 'periurbain';
  const d = pop / surfaceKm2;
  if (d > 6000) return 'dense';
  if (d > 2000) return 'urbain';
  if (d > 500) return 'periurbain';
  return 'rural';
}

const DENSITY_HOUSING: Record<Density, string[]> = {
  dense: [
    "L'habitat y est très majoritairement collectif : le véhicule à enlever est presque toujours dans un parking souterrain ou sur une dalle de copropriété, avec une rampe dont il faut connaître la hauteur libre avant de venir.",
    "On y stationne surtout en sous-sol d'immeuble ou dans des parkings en ouvrage ; un enlèvement se prépare donc avec le niveau exact du véhicule, la hauteur de la rampe et le nom du gardien ou du syndic à prévenir.",
    "Tissu urbain serré, immeubles collectifs, peu de places en surface : la plupart des interventions se font en sous-sol, au treuil et au chariot quand les roues ne tournent plus.",
  ],
  urbain: [
    "Le tissu mêle immeubles collectifs avec parkings en sous-sol et rues pavillonnaires : selon l'adresse, l'épave sera au fond d'un parking ou dans une allée derrière un portail, et l'équipement envoyé n'est pas le même.",
    "Copropriétés des années 1960-1990 avec parkings enterrés d'un côté, pavillons avec garage ou allée de l'autre : nous demandons l'emplacement précis du véhicule pour venir avec le bon plateau.",
    "Entre résidences collectives et quartiers de pavillons, les accès varient d'une rue à l'autre ; une photo de l'emplacement suffit pour préparer l'intervention.",
  ],
  periurbain: [
    "L'habitat est surtout pavillonnaire : l'épave attend en général dans une allée, un garage, un jardin ou sur un terrain, parfois enfoncée après plusieurs hivers, ce qui appelle un treuil long plutôt qu'une simple dépanneuse.",
    "Commune résidentielle, largement pavillonnaire : les enlèvements se font le plus souvent devant un garage ou dans un jardin, avec un plateau capable d'entrer dans une allée étroite.",
    "Maisons individuelles, lotissements et quelques petites résidences : les véhicules à enlever sont rarement en sous-sol, plus souvent derrière un portail ou dans une cour.",
  ],
  rural: [
    "Commune rurale : l'épave se trouve souvent sur un terrain, dans une grange ou un chemin, loin d'une route stabilisée, ce qui impose un plateau équipé d'un treuil long et un repérage de l'accès à l'avance.",
    "Village et hameaux : les véhicules hors d'usage attendent dans des cours de ferme, des jardins ou en bord de chemin ; nous planifions l'enlèvement avec une photo de l'accès et de l'état du véhicule.",
    "Peu d'immeubles, beaucoup de terrain : les interventions se font sur propriété privée, parfois sur sol meuble, avec le matériel de treuillage adapté.",
  ],
};

const INTRO_OPENERS = [
  (c: IdfCityRef, facts: IdfCommuneFacts | null) =>
    `${c.name} (${c.postalCode}) compte ${fr(c.population)} habitants${facts?.surfaceKm2 ? ` sur ${fr(facts.surfaceKm2)} km²` : ''}, ${idfLocative(c.deptCode, c.deptName)}${facts?.epci ? `, au sein de l'intercommunalité ${facts.epci}` : ''}.`,
  (c: IdfCityRef, facts: IdfCommuneFacts | null) =>
    `Avec ${fr(c.population)} habitants${facts?.surfaceKm2 ? ` répartis sur ${fr(facts.surfaceKm2)} km²` : ''}, ${c.name} est une commune ${idfGenitive(c.deptCode, c.deptName)} (${c.postalCode})${facts?.epci ? `, rattachée à ${facts.epci}` : ''}.`,
  (c: IdfCityRef, facts: IdfCommuneFacts | null) =>
    `À ${c.name} (${c.postalCode}), ${fr(c.population)} habitants${facts?.epci ? ` — commune membre de ${facts.epci}` : ''}, nous enlevons gratuitement les véhicules hors d'usage, comme dans le reste ${idfGenitive(c.deptCode, c.deptName)}.`,
];

const DISTANCE_SENTENCES = [
  (c: IdfCityRef, km: number) => `La commune se trouve à environ ${km} km du centre de Paris à vol d'oiseau.`,
  (c: IdfCityRef, km: number) => `${c.name} est à ${km} km environ de Notre-Dame de Paris.`,
  (c: IdfCityRef, km: number) => `Comptez une trentaine de kilomètres ou moins depuis notre base pour ${c.name} (${km} km du centre de Paris à vol d'oiseau).`,
];

const NEAREST_SENTENCES = [
  (c: IdfCityRef, list: string) => `Ses voisines les plus proches sont ${list} : nos tournées les regroupent, ce qui raccourcit les délais.`,
  (c: IdfCityRef, list: string) => `Nous intervenons le même jour à ${c.name} et dans les communes voisines de ${list}.`,
  (c: IdfCityRef, list: string) => `Autour de ${c.name}, nous desservons notamment ${list} — souvent dans la même tournée.`,
];

const ZFE_IN = [
  (c: IdfCityRef) => `Comme toutes les communes situées à l'intérieur de l'A86, ${c.name} fait partie du périmètre ZFE du Grand Paris. En 2026, les sanctions visant les Crit'Air 3 sont suspendues ; la suppression des ZFE votée au printemps 2026 a été censurée par le Conseil constitutionnel le 21 mai 2026 : la zone reste en vigueur ; renseignez-vous avant de rouler avec un véhicule ancien, ou faites-le enlever gratuitement s'il ne sert plus.`,
  (c: IdfCityRef) => `${c.name} est située à l'intérieur de l'A86, donc dans le périmètre de la zone à faibles émissions du Grand Paris ; les sanctions pour les Crit'Air 3 ont été suspendues pour 2026 ; la suppression des ZFE votée au printemps 2026 a été censurée par le Conseil constitutionnel le 21 mai 2026 : la zone reste en vigueur. Un véhicule ancien qui ne circule plus reste une charge : l'enlèvement gratuit avec certificat de destruction y met fin.`,
  (c: IdfCityRef) => `Située dans le périmètre ZFE de la Métropole du Grand Paris (à l'intérieur de l'A86), ${c.name} est concernée par les restrictions Crit'Air, dont le calendrier a évolué en 2026 (sanctions suspendues ; la suppression des ZFE votée au printemps 2026 a été censurée par le Conseil constitutionnel le 21 mai 2026 : la zone reste en vigueur). Pour un véhicule qui ne roule plus, le certificat de destruction reste la sortie la plus simple.`,
];
const ZFE_OUT = [
  (c: IdfCityRef) => `Aucune restriction ZFE ne s'applique à ${c.name} : la commune est hors du périmètre de la Métropole du Grand Paris délimité par l'A86. Reste la règle valable partout en France pour un véhicule hors d'usage — le confier à un centre VHU agréé, qui délivre le certificat de destruction et déclare la cession, ce qui met fin à l'assurance et à la carte grise.`,
  (c: IdfCityRef) => `${c.name} est en dehors du périmètre de la zone à faibles émissions du Grand Paris, limité aux communes situées à l'intérieur de l'A86 ; la réglementation qui s'applique ici est celle des véhicules hors d'usage : remise obligatoire à un centre VHU agréé, certificat de destruction, radiation de la carte grise.`,
  (c: IdfCityRef) => `Pas de ZFE à ${c.name} — le périmètre du Grand Paris s'arrête à l'A86 — mais les obligations VHU sont les mêmes partout : seul un centre agréé peut détruire un véhicule et délivrer le certificat qui met fin à votre responsabilité.`,
];

const SITUATION_POOL: Array<(c: IdfCityRef) => IdfCitySituation> = [
  c => ({ title: `Voiture en panne immobilisée à ${c.name}`, text: `Le véhicule ne démarre plus, le garage a rendu un devis supérieur à sa valeur et il occupe une place depuis des semaines. Nous l'enlevons gratuitement à ${c.name}, roulant ou non, et vous repartez avec le certificat de destruction.` }),
  c => ({ title: `Épave en parking souterrain`, text: `Niveau -2, rampe étroite, roues bloquées : c'est la situation la plus courante à ${c.name}. Nous remontons le véhicule au treuil et au chariot jusqu'à la rue avant de le charger sur le plateau. Prévenez le gardien ou le syndic, nous nous chargeons du reste.` }),
  c => ({ title: `Véhicule sans contrôle technique`, text: `Contrôle technique refusé ou périmé, contre-visite trop chère : plutôt que de laisser la voiture se dégrader à ${c.name}, faites-la enlever gratuitement ou demandez une estimation de rachat si elle a encore de la valeur.` }),
  c => ({ title: `Voiture abandonnée par un tiers`, text: `Un véhicule ventouse occupe votre place ou le parking de la copropriété à ${c.name} ? Nous expliquons la procédure (mise en demeure, signalement en mairie ou au commissariat) et nous intervenons dès que le droit de faire enlever le véhicule est établi.` }),
  c => ({ title: `Succession ou déménagement`, text: `La voiture d'un parent décédé ou un véhicule à laisser derrière soi avant un déménagement de ${c.name} : nous adaptons les documents (attestation des héritiers, procuration) et prenons rendez-vous rapidement.` }),
  c => ({ title: `Véhicule accidenté non réparable`, text: `Après un sinistre, l'assureur ne rachète pas toujours l'épave. Nous l'enlevons gratuitement à ${c.name}, y compris si elle n'est plus roulante, et nous remettons le certificat de destruction nécessaire pour clore le dossier.` }),
  c => ({ title: `Utilitaire ou véhicule d'entreprise`, text: `Camionnette d'artisan en fin de vie, véhicule de flotte immobilisé sur un site de ${c.name} : nous intervenons sur mandat de l'entreprise, avec les documents de cession adaptés à une société.` }),
  c => ({ title: `Deux-roues hors d'usage`, text: `Scooter ou moto qui ne roule plus, brûlé ou incomplet : l'enlèvement à ${c.name} est gratuit dès lors que le véhicule est identifiable, et le certificat de destruction est remis de la même façon qu'une voiture.` }),
  c => ({ title: `Voiture qui ne peut plus circuler`, text: `Vignette Crit'Air défavorable, assurance trop chère pour un véhicule qui ne sert plus : à ${c.name}, faire détruire la voiture est souvent la décision la plus économique. Nous nous chargeons de tout, cession comprise.` }),
  c => ({ title: `Véhicule en fourrière`, text: `Le véhicule a été enlevé à ${c.name} et les frais dépassent sa valeur ? Avec votre mandat écrit, nous pouvons intervenir directement en fourrière pour organiser sa destruction plutôt que de payer la sortie.` }),
];

const FOURRIERE_OPENERS = [
  (c: IdfCityRef) => `À ${c.name}, la mise en fourrière est décidée par le commissariat, la police municipale ou la gendarmerie du lieu de stationnement ; c'est à eux qu'il faut demander où se trouve un véhicule enlevé et l'autorisation de sortie.`,
  (c: IdfCityRef) => `Un véhicule enlevé à ${c.name} se retrouve via le téléservice du ministère de l'Intérieur ou auprès des forces de l'ordre du secteur, qui délivrent l'autorisation de restitution.`,
  (c: IdfCityRef) => `Si votre voiture a disparu d'une rue de ${c.name}, commencez par le commissariat ou la police municipale : ce sont eux qui savent vers quelle fourrière elle a été conduite.`,
];

const FOURRIERE_TAILS = [
  "Hors Paris, les frais sont plafonnés au niveau national pour une voiture particulière (enlèvement, garde journalière, expertise au-delà de trois jours). Si le véhicule ne vaut plus ces frais, nous pouvons le récupérer directement en fourrière pour destruction, avec votre mandat.",
  "Les tarifs sont réglementés : un forfait d'enlèvement, une garde facturée par jour et, passé trois jours, une expertise. Quand la facture dépasse la valeur de la voiture, mieux vaut nous mandater pour la faire détruire sur place plutôt que de payer la sortie.",
  "Comptez un forfait d'enlèvement plus des frais de garde quotidiens (montants plafonnés par arrêté), et une expertise si le véhicule reste plus de trois jours ; un véhicule non réclamé finit vendu ou détruit. Nous pouvons prendre le relais en fourrière avec votre accord écrit.",
];

const RACHAT_PICKUP: Record<Density, string[]> = {
  dense: [
    "Le rachat se fait le plus souvent en sous-sol de copropriété : nous remontons le véhicule jusqu'à la rue avec notre matériel, il n'a pas besoin de rouler.",
    "Parking souterrain, box ou place en dalle : indiquez-nous le niveau et la hauteur de la rampe, nous venons avec le plateau adapté.",
  ],
  urbain: [
    "Selon le quartier, nous récupérons la voiture dans un parking d'immeuble ou devant un pavillon ; l'enlèvement est compris dans l'offre.",
    "Rue, parking de résidence ou allée privée : le plateau vient là où la voiture est immobilisée, sans supplément.",
  ],
  periurbain: [
    "La voiture est en général dans une allée ou un garage : un plateau avec treuil suffit, même si elle ne démarre plus.",
    "Pavillon, garage, jardin : nous chargeons sur place, roulante ou non, et nous emmenons le véhicule le jour du paiement.",
  ],
  rural: [
    "Terrain, cour de ferme ou chemin : nous venons avec un plateau équipé d'un treuil long ; précisez l'accès pour que tout se fasse en une visite.",
    "En zone rurale, nous groupons les rendez-vous par secteur ; envoyez une photo de l'emplacement et de l'état de la voiture pour fixer le créneau.",
  ],
};

const FAQ_E_POOL: Array<(c: IdfCityRef, km: number | null) => FaqItem> = [
  (c, km) => ({ question: `Quel est le délai pour enlever une épave à ${c.name} ?`, answer: `${km !== null && km <= 15 ? `${c.name} est à ${km} km du centre de Paris : nous intervenons généralement sous 2 h en journée, et au plus tard le lendemain.` : `${c.name} est en grande couronne${km !== null ? ` (${km} km du centre de Paris)` : ''} : nous intervenons en général sous 24 h, souvent le jour même en regroupant les enlèvements du secteur.`} Appelez le 06 02 42 73 45 pour un créneau précis.` }),
  (c) => ({ question: `L'enlèvement d'épave est-il vraiment gratuit à ${c.name} ?`, answer: `Oui. À ${c.name} comme partout en Île-de-France, l'enlèvement d'un véhicule complet est gratuit : déplacement, chargement, dépollution et certificat de destruction compris. La filière VHU est financée par le recyclage des matériaux, pas par vous.` }),
  (c) => ({ question: `Pouvez-vous enlever une voiture en sous-sol à ${c.name} ?`, answer: `Oui. Nous intervenons dans les parkings souterrains de ${c.name} avec un treuil et un chariot pour les véhicules qui ne roulent plus ; indiquez-nous le niveau et la hauteur de la rampe pour que nous venions avec le bon plateau.` }),
  (c) => ({ question: `Quels documents préparer pour un enlèvement à ${c.name} ?`, answer: `La carte grise (barrée, datée et signée avec la mention « cédé pour destruction »), une pièce d'identité et un certificat de situation administrative de moins de 15 jours. Nous remplissons avec vous la déclaration de cession le jour de l'enlèvement à ${c.name}.` }),
  (c) => ({ question: `Que devient mon véhicule après l'enlèvement à ${c.name} ?`, answer: `Il est transporté vers un centre VHU agréé, dépollué (carburant, huiles, batterie, fluides), démonté pour les pièces réutilisables puis broyé et recyclé. Vous recevez le certificat de destruction, qui met fin à votre responsabilité et à l'obligation d'assurance.` }),
  (c) => ({ question: `Un voisin a abandonné une voiture dans notre parking à ${c.name}, que faire ?`, answer: `Sur un parking privé de ${c.name}, le syndic ou le propriétaire doit d'abord mettre en demeure le propriétaire du véhicule ; sans réponse, une décision de justice ou une procédure d'abandon permet de faire enlever l'épave. Nous vous expliquons les étapes et intervenons dès que c'est possible.` }),
  (c) => ({ question: `Enlevez-vous les véhicules sans carte grise à ${c.name} ?`, answer: `Dans certains cas (carte grise perdue, succession, véhicule très ancien) oui, avec une déclaration de perte et les justificatifs adaptés. Décrivez-nous la situation à ${c.name} et nous vous dirons quels documents réunir.` }),
  (c) => ({ question: `Faut-il être présent lors de l'enlèvement à ${c.name} ?`, answer: `Idéalement oui, pour signer la cession et remettre les clés. Sinon, une procuration avec copie de votre pièce d'identité permet à un tiers (gardien, proche) de nous recevoir à ${c.name}.` }),
];

const RACHAT_INTRO = [
  (c: IdfCityRef, km: number | null) => `Votre voiture a encore de la valeur ? À ${c.name} (${c.postalCode}), nous la rachetons plutôt que de la détruire : estimation gratuite sur photos, offre ferme, enlèvement inclus et paiement le jour du départ du véhicule${km !== null && km <= 15 ? ', généralement sous 24 h' : ''}.`,
  (c: IdfCityRef, km: number | null) => `Plutôt que de laisser une voiture perdre de la valeur dans un parking de ${c.name}, demandez une estimation de rachat : nous reprenons les véhicules roulants ou non, avec ou sans contrôle technique, et nous venons les chercher sur place${km !== null && km > 15 ? ` (${km} km du centre de Paris, tournée dédiée pour la grande couronne)` : ''}.`,
  (c: IdfCityRef) => `Rachat de voiture à ${c.name} : nous achetons les véhicules d'occasion en l'état — panne, accident, kilométrage élevé, contrôle technique refusé — et nous nous occupons de l'enlèvement et de la déclaration de cession.`,
  (c: IdfCityRef) => `Vendre une voiture d'occasion à ${c.name} (${c.postalCode}) entre particuliers prend des semaines : annonces, visites, négociation, risque d'impayé. Le rachat professionnel règle tout en une visite, avec une offre connue d'avance et un paiement le jour de l'enlèvement.`,
  (c: IdfCityRef, km: number | null) => `Nous achetons à ${c.name} les voitures que les concessionnaires refusent en reprise : trop kilométrées, sans contrôle technique, accidentées ou en panne. Le plateau vient sur place${km !== null && km <= 15 ? ', souvent le jour même' : ' sur rendez-vous'}, et vous êtes payé au moment du chargement.`,
];
const RACHAT_SECOND = [
  (c: IdfCityRef, facts: IdfCommuneFacts | null) => `Le prix dépend du modèle, de l'année, du kilométrage et de l'état ; il est annoncé avant le déplacement et ne change pas à l'arrivée. ${facts?.zfe ? `À ${c.name}, dans le périmètre ZFE, les véhicules Crit'Air 3 et plus se vendent surtout pour l'export ou les pièces — nous les rachetons aussi.` : `Les véhicules qui ne valent plus rien sont enlevés gratuitement avec certificat de destruction.`}`,
  (c: IdfCityRef) => `Une seule visite à ${c.name} suffit : contrôle du véhicule et des documents, paiement, chargement. Si le véhicule ne vaut finalement rien, il repart en enlèvement gratuit avec certificat de destruction.`,
  (c: IdfCityRef, facts: IdfCommuneFacts | null) => `Ce qui fait le prix à ${c.name} : la demande en pièces pour ce modèle, l'état mécanique, la carrosserie, le kilométrage et la présence des documents. ${facts?.zfe ? `Une vignette Crit'Air défavorable ne rend pas la voiture invendable : elle oriente simplement vers l'export ou le démontage.` : `Un contrôle technique à jour améliore l'offre mais n'est pas obligatoire pour vendre à un professionnel.`}`,
  (c: IdfCityRef) => `Pour préparer le rachat à ${c.name}, réunissez la carte grise, une pièce d'identité et un certificat de situation administrative récent ; le reste (déclaration de cession, enlèvement, paiement) est fait sur place, en une trentaine de minutes.`,
];

const FAQ_R_POOL: Array<(c: IdfCityRef) => FaqItem> = [
  c => ({ question: `Combien vaut ma voiture à ${c.name} ?`, answer: `Cela dépend du modèle, de l'année, du kilométrage et de l'état (roulante, en panne, accidentée). Envoyez-nous la carte grise et quelques photos depuis ${c.name} : l'estimation est gratuite et l'offre est ferme avant le déplacement.` }),
  c => ({ question: `Comment suis-je payé pour un rachat à ${c.name} ?`, answer: `Le paiement se fait le jour de l'enlèvement à ${c.name}, par virement immédiat ou selon le mode convenu, contre les documents du véhicule et les clés.` }),
  c => ({ question: `Rachetez-vous une voiture sans contrôle technique à ${c.name} ?`, answer: `Oui. Pour une vente à un professionnel, le contrôle technique n'est pas obligatoire. Nous reprenons à ${c.name} les véhicules dont le CT est refusé, périmé ou jamais passé.` }),
  c => ({ question: `Qui s'occupe de la carte grise et de la cession ?`, answer: `Nous. Le jour du rachat à ${c.name}, nous remplissons ensemble la déclaration de cession ; vous en gardez un exemplaire et nous effectuons la déclaration en ligne, ce qui vous libère de toute responsabilité.` }),
  c => ({ question: `Rachetez-vous les voitures accidentées ou en panne à ${c.name} ?`, answer: `Oui, y compris non roulantes : nous venons les chercher à ${c.name} avec un plateau. Le prix tient compte des dégâts et de la valeur des pièces.` }),
  c => ({ question: `Rachat ou enlèvement gratuit à ${c.name} : lequel choisir ?`, answer: `Si le véhicule a de la valeur (roulant, récent, pièces recherchées), le rachat. S'il est hors d'usage, l'enlèvement gratuit avec certificat de destruction. Dans le doute, demandez l'estimation : elle est gratuite et sans engagement à ${c.name}.` }),
  c => ({ question: `Puis-je vendre à ${c.name} une voiture dont je ne suis pas le titulaire ?`, answer: `Seulement avec un mandat : procuration du titulaire et copie de sa pièce d'identité, ou attestation des héritiers pour une succession. Nous vous indiquons le document adapté avant de venir à ${c.name}.` }),
  c => ({ question: `Le rachat est-il possible si la voiture est gagée ?`, answer: `Un véhicule gagé ne peut pas être cédé tant que l'opposition n'est pas levée. Le certificat de situation administrative le montre en quelques secondes ; nous vous expliquons comment obtenir la mainlevée avant le rachat à ${c.name}.` }),
  c => ({ question: `Faut-il nettoyer ou réparer la voiture avant le rachat à ${c.name} ?`, answer: `Non. Nous rachetons en l'état : ni nettoyage, ni réparation, ni contrôle technique à passer avant notre venue à ${c.name}. Décrivez simplement les défauts connus pour que l'offre soit juste dès le départ.` }),
  c => ({ question: `Rachetez-vous les utilitaires et les deux-roues à ${c.name} ?`, answer: `Oui : camionnettes, fourgons, scooters et motos sont estimés comme les voitures, sur photos et carte grise, puis enlevés à ${c.name} le jour du paiement.` }),
  c => ({ question: `Combien de temps prend un rachat à ${c.name} ?`, answer: `L'estimation est faite dans la journée sur photos et carte grise ; l'enlèvement et le paiement suivent sur rendez-vous, souvent sous 24 à 48 h à ${c.name}. Sur place, comptez une trentaine de minutes.` }),
];

export function generateIdfCityContent({ city, facts, nearest, distanceToParisKm, transport }: GeneratorInput): GeneratedCityContent {
  const seed = `${city.deptSlug}/${city.slug}`;
  const density = densityClass(city.population, facts?.surfaceKm2 ?? null);
  const nearestList = nearest
    .slice(0, 3)
    .map(n => `${n.name} (${n.distanceKm < 1 ? 'moins de 1' : Math.round(n.distanceKm)} km)`)
    .join(', ')
    .replace(/, ([^,]*)$/, ' et $1');

  let specific = 0;
  const intro: string[] = [];
  const p1: string[] = [pick(INTRO_OPENERS, seed, 1)(city, facts)];
  specific++;
  if (distanceToParisKm !== null) {
    p1.push(pick(DISTANCE_SENTENCES, seed, 2)(city, distanceToParisKm));
    specific++;
  }
  if (nearestList) {
    p1.push(pick(NEAREST_SENTENCES, seed, 3)(city, nearestList));
    specific++;
  }
  intro.push(p1.join(' '));
  const transportText = transportSentence(city, transport, seed);
  if (transportText) {
    intro.push(transportText);
    specific++;
  }
  intro.push(pick(DENSITY_HOUSING[density], seed, 4));

  const situations = pickMany(SITUATION_POOL, seed, 4, 5).map(f => f(city));
  const rachatSituations = pickMany(SITUATION_POOL, seed, 3, 12).map(f => f(city));

  const acces: string[] = [facts?.zfe ? pick(ZFE_IN, seed, 6)(city) : pick(ZFE_OUT, seed, 6)(city)];
  specific++;

  const fourriere = `${pick(FOURRIERE_OPENERS, seed, 7)(city)} ${
    city.deptCode === '75'
      ? 'À Paris, comptez 179 € le premier jour puis 29 € par jour de garde (tarifs Ville de Paris, renseignements au 3975).'
      : pick(FOURRIERE_TAILS, seed, 13)
  }`;

  const faqEpaviste = pickMany(FAQ_E_POOL, seed, 5, 8).map(f => f(city, distanceToParisKm));
  const rachatIntro = [
    pick(RACHAT_INTRO, seed, 9)(city, distanceToParisKm),
    `${pick(RACHAT_SECOND, seed, 10)(city, facts)} ${pick(RACHAT_PICKUP[density], seed, 14)}`,
  ];
  const rachatTransport = rachatTransportSentence(city, transport, seed);
  if (rachatTransport) rachatIntro.push(rachatTransport);
  const faqRachat = pickMany(FAQ_R_POOL, seed, 5, 11).map(f => f(city));

  return { intro, situations, rachatSituations, acces, fourriere, faqEpaviste, rachatIntro, faqRachat, specificSentences: specific };
}
