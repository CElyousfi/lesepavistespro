/**
 * Search Console actions applied to specific pages (S3.1.c).
 *
 * Source: seo-audit/striking-distance.md (import of 5 October 2026). Every
 * entry is logged in IDF-DOMINATION-REPORT.md (Sprint 3) with the old and new
 * values. Keep this file small and dated: the next import says whether each
 * change worked.
 *
 *   T1 (push to page 1, 34 IDF pages): the page's top query gets
 *     • a title that contains it in natural French (when the S3.2 pattern
 *       does not already — only /epaviste/ile-de-france needed one),
 *     • an H2 that answers it, 80–150 words, town-specific
 *       (communes: built from public facts by lib/gsc-answer.ts; the 4 hub
 *       pages: written below),
 *     • 3 internal links from topically related pages (the 3 nearest
 *       communes of the same service; for hubs, sibling hubs) with the query
 *       as anchor (components/GscBoostLinks.tsx),
 *     • a refreshed <lastmod> (lib/lastmod.ts).
 *   T2 (fix the snippet, 20 pages): the S3.2 generators give every one of
 *     them a new title and description; half are in the CTR test cohort
 *     without ☎ (seo-audit/ctr-test.json).
 */

export const GSC_ACTIONS_DATE = '2026-10-05';

export interface GscPageOverride {
  /** Replaces the generated title (≤ 60 rendered characters). */
  title?: string | { absolute: string };
  /** Replaces the generated description (130–155 characters). */
  description?: string;
}

export interface GscT1Action extends GscPageOverride {
  path: string;
  /** The query as typed — the page's top query (inferred landing, CSV mode) or, when none maps to the page, its own head term. */
  query: string;
  querySource: 'gsc' | 'page';
  /** The query in natural French, used as the anchor of the 3 links. */
  anchor: string;
  /** The 3 pages that link here with `anchor`. */
  linkFrom: string[];
  /** Hand-written answer (hub pages). Communes get theirs from lib/gsc-answer.ts. */
  h2?: string;
  paragraphs?: string[];
}

export const GSC_T1_ACTIONS: GscT1Action[] = [
  {
    path: "/epaviste/seine-et-marne-77/annet-sur-marne",
    query: "épaviste annet-sur-marne",
    querySource: "gsc",
    anchor: "Épaviste Annet-sur-Marne",
    linkFrom: ["/epaviste/seine-et-marne-77/carnetin", "/epaviste/seine-et-marne-77/claye-souilly", "/epaviste/seine-et-marne-77/fresnes-sur-marne"],
  },
  {
    path: "/epaviste/paris-75",
    query: "epaviste paris",
    querySource: "gsc",
    anchor: "Épaviste Paris",
    linkFrom: ["/epaviste/ile-de-france", "/epaviste/hauts-de-seine-92", "/epaviste/seine-saint-denis-93"],
    h2: "Épaviste Paris : enlèvement d'épave gratuit dans les 20 arrondissements",
    paragraphs: [
      "Vous cherchez un épaviste à Paris ? Nous enlevons gratuitement les véhicules hors d'usage dans les 20 arrondissements, du 1er au 20e, avec une intervention sous 2 h. Rue, cour d'immeuble, box fermé ou parking souterrain : nous demandons la hauteur de la rampe et le niveau du véhicule pour venir avec le bon matériel — treuil et chariot de manutention quand la voiture ne roule plus.",
      "À Paris, une épave qui occupe une place finit souvent en fourrière : nous pouvons aussi organiser la destruction d'un véhicule déjà enlevé, avec votre mandat. Sur place, vous signez la déclaration de cession, nous l'enregistrons en ligne, et le certificat de destruction établi par le centre VHU agréé partenaire met fin à votre responsabilité et à l'assurance. ☎ 06 02 42 73 45.",
    ],
  },
  {
    path: "/epaviste/seine-et-marne-77/quincy-voisins",
    query: "épaviste quincy-voisins",
    querySource: "gsc",
    anchor: "Épaviste Quincy-Voisins",
    linkFrom: ["/epaviste/seine-et-marne-77/couilly-pont-aux-dames", "/epaviste/seine-et-marne-77/conde-ste-libiaire", "/epaviste/seine-et-marne-77/mareuil-les-meaux"],
  },
  {
    path: "/epaviste/seine-et-marne-77/trilport",
    query: "épaviste trilport",
    querySource: "gsc",
    anchor: "Épaviste Trilport",
    linkFrom: ["/epaviste/seine-et-marne-77/montceaux-les-meaux", "/epaviste/seine-et-marne-77/fublaines", "/epaviste/seine-et-marne-77/germigny-l-eveque"],
  },
  {
    path: "/epaviste/seine-et-marne-77/esbly",
    query: "épaviste esbly",
    querySource: "gsc",
    anchor: "Épaviste Esbly",
    linkFrom: ["/epaviste/seine-et-marne-77/montry", "/epaviste/seine-et-marne-77/conde-ste-libiaire", "/epaviste/seine-et-marne-77/isles-les-villenoy"],
  },
  {
    path: "/epaviste/seine-et-marne-77/champagne-sur-seine",
    query: "épaviste champagne-sur-seine",
    querySource: "gsc",
    anchor: "Épaviste Champagne-sur-Seine",
    linkFrom: ["/epaviste/seine-et-marne-77/st-mammes", "/epaviste/seine-et-marne-77/thomery", "/epaviste/seine-et-marne-77/samoreau"],
  },
  {
    path: "/epaviste/ile-de-france",
    query: "epaviste idf",
    querySource: "gsc",
    anchor: "Épaviste en Île-de-France (IDF)",
    linkFrom: ["/epaviste/paris-75", "/epaviste/seine-et-marne-77", "/epaviste/val-d-oise-95"],
    title: { absolute: "Épaviste IDF (Île-de-France) – Enlèvement gratuit 24h/24" },
    h2: "Épaviste IDF : un seul numéro pour les 8 départements d'Île-de-France",
    paragraphs: [
      "Épaviste en IDF, c'est-à-dire à Paris (75), en Seine-et-Marne (77), dans les Yvelines (78), en Essonne (91), dans les Hauts-de-Seine (92), en Seine-Saint-Denis (93), dans le Val-de-Marne (94) et dans le Val-d'Oise (95) : nous enlevons gratuitement les épaves dans les 1 286 communes franciliennes. En petite couronne (75, 92, 93, 94), l'intervention se fait sous 2 h ; en grande couronne, sous 24 h, souvent le jour même.",
      "Voiture, utilitaire, moto ou scooter, roulant ou non, en sous-sol ou en fourrière : un appel ou quelques photos par WhatsApp suffisent pour fixer le créneau. Vous signez la déclaration de cession sur place et recevez le certificat de destruction du centre VHU agréé partenaire. ☎ 06 02 42 73 45.",
    ],
  },
  {
    path: "/rachat-voiture/seine-et-marne-77/brou-sur-chantereine",
    query: "rachat voiture brou-sur-chantereine",
    querySource: "page",
    anchor: "Rachat voiture Brou-sur-Chantereine",
    linkFrom: ["/rachat-voiture/seine-et-marne-77/vaires-sur-marne", "/rachat-voiture/seine-et-marne-77/pomponne", "/rachat-voiture/seine-et-marne-77/le-pin"],
  },
  {
    path: "/rachat-voiture/seine-saint-denis-93",
    query: "rachat voiture seine-saint-denis",
    querySource: "page",
    anchor: "Rachat voiture Seine-Saint-Denis (93)",
    linkFrom: ["/rachat-voiture/ile-de-france", "/rachat-voiture/paris-75", "/rachat-voiture/val-de-marne-94"],
    h2: "Rachat voiture en Seine-Saint-Denis (93) : offre ferme, paiement le jour même",
    paragraphs: [
      "Pour un rachat de voiture en Seine-Saint-Denis, envoyez-nous la marque, le modèle, l'année, le kilométrage et quelques photos : l'offre est ferme et ne change pas à l'arrivée du plateau. Nous rachetons dans les 40 communes du 93, de Saint-Denis à Montreuil, d'Aulnay-sous-Bois à Noisy-le-Grand, les voitures sans contrôle technique, les véhicules Crit'Air 3 ou plus, les utilitaires d'artisans et les voitures accidentées ou en panne moteur.",
      "L'enlèvement est inclus, à domicile comme en parking de copropriété, et le paiement se fait le jour même. Nous remplissons la déclaration de cession avec vous et l'enregistrons en ligne : le véhicule n'est plus à votre nom dès son départ. Si la voiture n'a plus de valeur, nous vous proposons l'enlèvement gratuit avec certificat de destruction. ☎ 06 02 42 73 45.",
    ],
  },
  {
    path: "/epaviste/seine-et-marne-77/mareuil-les-meaux",
    query: "épaviste mareuil-lès-meaux",
    querySource: "gsc",
    anchor: "Épaviste Mareuil-lès-Meaux",
    linkFrom: ["/epaviste/seine-et-marne-77/nanteuil-les-meaux", "/epaviste/seine-et-marne-77/villenoy", "/epaviste/seine-et-marne-77/quincy-voisins"],
  },
  {
    path: "/rachat-voiture/yvelines-78/le-chesnay-rocquencourt",
    query: "rachat voiture le chesnay-rocquencourt",
    querySource: "page",
    anchor: "Rachat voiture Le Chesnay-Rocquencourt",
    linkFrom: ["/rachat-voiture/yvelines-78/la-celle-st-cloud", "/rachat-voiture/yvelines-78/versailles", "/rachat-voiture/yvelines-78/bailly"],
  },
  {
    path: "/epaviste/seine-saint-denis-93/bagnolet",
    query: "épaviste bagnolet",
    querySource: "gsc",
    anchor: "Épaviste Bagnolet",
    linkFrom: ["/epaviste/seine-saint-denis-93/les-lilas", "/epaviste/seine-saint-denis-93/montreuil", "/epaviste/paris-75/paris-20e"],
  },
  {
    path: "/epaviste/seine-et-marne-77/serris",
    query: "épaviste serris",
    querySource: "gsc",
    anchor: "Épaviste Serris",
    linkFrom: ["/epaviste/seine-et-marne-77/bailly-romainvilliers", "/epaviste/seine-et-marne-77/jossigny", "/epaviste/seine-et-marne-77/chessy"],
  },
  {
    path: "/epaviste/seine-et-marne-77/isles-les-villenoy",
    query: "épaviste isles-lès-villenoy",
    querySource: "page",
    anchor: "Épaviste Isles-lès-Villenoy",
    linkFrom: ["/epaviste/seine-et-marne-77/vignely", "/epaviste/seine-et-marne-77/esbly", "/epaviste/seine-et-marne-77/conde-ste-libiaire"],
  },
  {
    path: "/rachat-voiture/seine-et-marne-77/varennes-sur-seine",
    query: "rachat voiture varennes-sur-seine",
    querySource: "page",
    anchor: "Rachat voiture Varennes-sur-Seine",
    linkFrom: ["/rachat-voiture/seine-et-marne-77/montereau-fault-yonne", "/rachat-voiture/seine-et-marne-77/noisy-rudignon", "/rachat-voiture/seine-et-marne-77/ville-st-jacques"],
  },
  {
    path: "/epaviste/seine-saint-denis-93/la-courneuve",
    query: "épaviste la courneuve",
    querySource: "gsc",
    anchor: "Épaviste La Courneuve",
    linkFrom: ["/epaviste/seine-saint-denis-93/le-bourget", "/epaviste/seine-saint-denis-93/st-denis", "/epaviste/seine-saint-denis-93/aubervilliers"],
  },
  {
    path: "/epaviste/val-de-marne-94/l-hay-les-roses",
    query: "épaviste l'haÿ-les-roses",
    querySource: "gsc",
    anchor: "Épaviste L'Haÿ-les-Roses",
    linkFrom: ["/epaviste/val-de-marne-94/chevilly-larue", "/epaviste/val-de-marne-94/cachan", "/epaviste/hauts-de-seine-92/bourg-la-reine"],
  },
  {
    path: "/rachat-voiture/seine-et-marne-77/coulommiers",
    query: "rachat voiture coulommiers",
    querySource: "page",
    anchor: "Rachat voiture Coulommiers",
    linkFrom: ["/rachat-voiture/seine-et-marne-77/mouroux", "/rachat-voiture/seine-et-marne-77/boissy-le-chatel", "/rachat-voiture/seine-et-marne-77/chailly-en-brie"],
  },
  {
    path: "/epaviste/seine-saint-denis-93/villemomble",
    query: "épaviste villemomble",
    querySource: "gsc",
    anchor: "Épaviste Villemomble",
    linkFrom: ["/epaviste/seine-saint-denis-93/le-raincy", "/epaviste/seine-saint-denis-93/rosny-sous-bois", "/epaviste/seine-saint-denis-93/les-pavillons-sous-bois"],
  },
  {
    path: "/epaviste/seine-et-marne-77/souppes-sur-loing",
    query: "épaviste souppes-sur-loing",
    querySource: "gsc",
    anchor: "Épaviste Souppes-sur-Loing",
    linkFrom: ["/epaviste/seine-et-marne-77/la-madeleine-sur-loing", "/epaviste/seine-et-marne-77/bagneaux-sur-loing", "/epaviste/seine-et-marne-77/chateau-landon"],
  },
  {
    path: "/rachat-voiture/seine-et-marne-77/le-chatelet-en-brie",
    query: "rachat voiture le châtelet-en-brie",
    querySource: "page",
    anchor: "Rachat voiture Le Châtelet-en-Brie",
    linkFrom: ["/rachat-voiture/seine-et-marne-77/fontaine-le-port", "/rachat-voiture/seine-et-marne-77/fericy", "/rachat-voiture/seine-et-marne-77/sivry-courtry"],
  },
  {
    path: "/epaviste/yvelines-78/sartrouville",
    query: "épaviste sartrouville",
    querySource: "gsc",
    anchor: "Épaviste Sartrouville",
    linkFrom: ["/epaviste/yvelines-78/houilles", "/epaviste/yvelines-78/maisons-laffitte", "/epaviste/yvelines-78/carrieres-sur-seine"],
  },
  {
    path: "/epaviste/seine-et-marne-77/nangis",
    query: "épaviste nangis",
    querySource: "gsc",
    anchor: "Épaviste Nangis",
    linkFrom: ["/epaviste/seine-et-marne-77/grandpuits-bailly-carrois", "/epaviste/seine-et-marne-77/fontains", "/epaviste/seine-et-marne-77/clos-fontaine"],
  },
  {
    path: "/epaviste/val-de-marne-94/alfortville",
    query: "épaviste alfortville",
    querySource: "gsc",
    anchor: "Épaviste Alfortville",
    linkFrom: ["/epaviste/val-de-marne-94/maisons-alfort", "/epaviste/val-de-marne-94/vitry-sur-seine", "/epaviste/val-de-marne-94/creteil"],
  },
  {
    path: "/epaviste/val-d-oise-95",
    query: "epaviste 95",
    querySource: "gsc",
    anchor: "Épaviste Val-d'Oise (95)",
    linkFrom: ["/epaviste/ile-de-france", "/epaviste/yvelines-78", "/epaviste/hauts-de-seine-92"],
    h2: "Épaviste 95 : enlèvement gratuit dans tout le Val-d'Oise",
    paragraphs: [
      "Épaviste dans le 95 : nous enlevons gratuitement les épaves dans les 184 communes du Val-d'Oise, sous 24 h et souvent le jour même. Nos tournées sont organisées par secteur — Argenteuil et Bezons, vallée de Montmorency, Cergy-Pontoise, est aéroportuaire autour de Roissy et Goussainville, villages du Vexin — pour venir vite, y compris pour une voiture qui ne roule plus.",
      "Le Val-d'Oise est hors du périmètre de la ZFE du Grand Paris, mais les obligations VHU sont les mêmes partout : seul un centre agréé peut délivrer un certificat de destruction valable. Nous préparons avec vous la déclaration de cession pour destruction le jour de l'enlèvement, et pouvons récupérer en fourrière un véhicule qui ne vaut plus les frais, avec votre mandat. ☎ 06 02 42 73 45.",
    ],
  },
  {
    path: "/epaviste/seine-et-marne-77/lagny-sur-marne",
    query: "épaviste lagny-sur-marne",
    querySource: "gsc",
    anchor: "Épaviste Lagny-sur-Marne",
    linkFrom: ["/epaviste/seine-et-marne-77/gouvernes", "/epaviste/seine-et-marne-77/conches-sur-gondoire", "/epaviste/seine-et-marne-77/st-thibault-des-vignes"],
  },
  {
    path: "/epaviste/val-de-marne-94/valenton",
    query: "epaviste valenton",
    querySource: "gsc",
    anchor: "Épaviste Valenton",
    linkFrom: ["/epaviste/val-de-marne-94/villeneuve-st-georges", "/epaviste/val-de-marne-94/limeil-brevannes", "/epaviste/essonne-91/crosne"],
  },
  {
    path: "/epaviste/yvelines-78/poissy",
    query: "épaviste poissy",
    querySource: "gsc",
    anchor: "Épaviste Poissy",
    linkFrom: ["/epaviste/yvelines-78/villennes-sur-seine", "/epaviste/yvelines-78/carrieres-sous-poissy", "/epaviste/yvelines-78/aigremont"],
  },
  {
    path: "/epaviste/val-de-marne-94/maisons-alfort",
    query: "épaviste maisons-alfort",
    querySource: "gsc",
    anchor: "Épaviste Maisons-Alfort",
    linkFrom: ["/epaviste/val-de-marne-94/alfortville", "/epaviste/val-de-marne-94/st-maurice", "/epaviste/val-de-marne-94/creteil"],
  },
  {
    path: "/epaviste/seine-saint-denis-93/livry-gargan",
    query: "épaviste livry-gargan",
    querySource: "gsc",
    anchor: "Épaviste Livry-Gargan",
    linkFrom: ["/epaviste/seine-saint-denis-93/clichy-sous-bois", "/epaviste/seine-saint-denis-93/sevran", "/epaviste/seine-saint-denis-93/les-pavillons-sous-bois"],
  },
  {
    path: "/epaviste/seine-saint-denis-93/le-blanc-mesnil",
    query: "épaviste le blanc-mesnil",
    querySource: "gsc",
    anchor: "Épaviste Le Blanc-Mesnil",
    linkFrom: ["/epaviste/seine-saint-denis-93/drancy", "/epaviste/seine-saint-denis-93/le-bourget", "/epaviste/seine-saint-denis-93/aulnay-sous-bois"],
  },
  {
    path: "/epaviste/paris-75/paris-10e",
    query: "épaviste paris 10e",
    querySource: "page",
    anchor: "Épaviste Paris 10e",
    linkFrom: ["/epaviste/paris-75/paris-3e", "/epaviste/paris-75/paris-9e", "/epaviste/paris-75/paris-2e"],
  },
  {
    path: "/epaviste/seine-et-marne-77/champs-sur-marne",
    query: "épaviste champs-sur-marne",
    querySource: "gsc",
    anchor: "Épaviste Champs-sur-Marne",
    linkFrom: ["/epaviste/seine-et-marne-77/noisiel", "/epaviste/seine-saint-denis-93/gournay-sur-marne", "/epaviste/seine-saint-denis-93/noisy-le-grand"],
  },
  {
    path: "/epaviste/hauts-de-seine-92/chatenay-malabry",
    query: "épaviste châtenay-malabry",
    querySource: "gsc",
    anchor: "Épaviste Châtenay-Malabry",
    linkFrom: ["/epaviste/hauts-de-seine-92/le-plessis-robinson", "/epaviste/essonne-91/verrieres-le-buisson", "/epaviste/hauts-de-seine-92/sceaux"],
  },
];

const BY_PATH = new Map(GSC_T1_ACTIONS.map((a) => [a.path, a]));

export function getGscT1Action(path: string): GscT1Action | undefined {
  return BY_PATH.get(path);
}

/** T1 targets that `fromPath` must link to with their anchor. */
export function getGscBoostLinksFrom(fromPath: string): Array<{ href: string; anchor: string }> {
  return GSC_T1_ACTIONS.filter((a) => a.linkFrom.includes(fromPath)).map((a) => ({ href: a.path, anchor: a.anchor }));
}

/** Title / description overrides read by lib/seo.ts generateMeta(). */
export function getGscPageOverride(path: string): GscPageOverride | undefined {
  const a = BY_PATH.get(path);
  return a && (a.title || a.description) ? { title: a.title, description: a.description } : undefined;
}
