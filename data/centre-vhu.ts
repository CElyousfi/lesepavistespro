/**
 * Centre VHU agréé pages (S3.4) — /centre-vhu-agree/<department>, for the 8
 * Île-de-France departments and the 4 overseas departments where the
 * « centre vhu <dept> » queries exist (Search Console, 5 Oct 2026).
 *
 * Les Épavistes Pro is an épaviste, NOT a centre VHU: these pages explain what
 * an agreed centre is, what the law requires, and how we take the vehicle to
 * an agreed partner centre, which issues the certificat de destruction.
 *
 * TODO(owner): the partner centre's name and agrément number. Until they are
 * provided, the pages say « centre VHU agréé partenaire » without a number
 * (the PR9500003D shown elsewhere on the site is itself unconfirmed — see
 * IDF-DOMINATION-REPORT.md §5).
 *
 * Legal sources, checked on 5 October 2026:
 *   - service-public.gouv.fr F1468 « Véhicule à détruire » (vérifié le
 *     13/08/2026): only agreed centres VHU, free for a complete vehicle
 *     (engine, catalyst, battery), documents, certificat de destruction,
 *     national directory on immatriculation.ants.gouv.fr,
 *     recyclermonvehicule.fr for manufacturer networks, inform the insurer.
 *   - Code de l'environnement, articles R.543-153 et suivants (section
 *     « Voitures particulières, camionnettes, véhicules à moteur à deux ou trois
 *     roues et quadricycles à moteur ») — definition of the centre VHU
 *     (R.543-154), prefectoral agrément with a cahier des charges,
 *     dépollution and dismantling obligations.
 *   - Code de la route, article R.322-9 — the certificat de destruction.
 */

export const CENTRE_VHU_UPDATED_AT = '2026-10-05';

export interface CentreVhuDept {
  slug: string;
  code: string;
  name: string;
  /** "à Paris", "en Martinique"… */
  locative: string;
  idf: boolean;
  /** One department-specific paragraph — public facts only. */
  local: string;
}

export const CENTRE_VHU_DEPTS: CentreVhuDept[] = [
  { slug: 'paris-75', code: '75', name: 'Paris', locative: 'à Paris', idf: true, local: "À Paris, un véhicule hors d'usage est enlevé là où il se trouve — rue, cour, parking souterrain ou, avec votre mandat, préfourrière — puis transporté jusqu'au centre VHU agréé partenaire. Les 20 arrondissements sont dans la ZFE du Grand Paris ; une voiture ancienne qui ne roule plus n'a donc plus d'usage en ville, et sa destruction met fin à l'assurance et au stationnement." },
  { slug: 'seine-et-marne-77', code: '77', name: 'Seine-et-Marne', locative: 'en Seine-et-Marne', idf: true, local: "La Seine-et-Marne est le plus grand département d'Île-de-France, avec plus de 500 communes, des villes nouvelles (Marne-la-Vallée, Sénart) et de vastes zones rurales. Les distances jusqu'au centre VHU sont plus longues qu'en petite couronne : nous organisons les enlèvements par secteur, sous 24 h, souvent le jour même." },
  { slug: 'yvelines-78', code: '78', name: 'Yvelines', locative: 'dans les Yvelines', idf: true, local: "Des pavillons de la vallée de la Seine aux villages du Vexin et de la forêt de Rambouillet, les véhicules à détruire dans les Yvelines sont souvent dans un garage, une cour ou un jardin. Nous venons avec un plateau équipé d'un treuil, puis nous remettons le véhicule à un centre VHU agréé partenaire." },
  { slug: 'essonne-91', code: '91', name: 'Essonne', locative: 'en Essonne', idf: true, local: "L'Essonne combine une partie nord urbanisée (Massy, Évry-Courcouronnes, Corbeil-Essonnes) et un sud rural. Pour une épave immobilisée sur un parking de résidence comme pour une voiture abandonnée dans un terrain, la remise à un centre VHU agréé est la seule fin de vie légale du véhicule." },
  { slug: 'hauts-de-seine-92', code: '92', name: 'Hauts-de-Seine', locative: 'dans les Hauts-de-Seine', idf: true, local: "Les Hauts-de-Seine sont presque entièrement dans la ZFE du Grand Paris et leurs véhicules sont souvent garés en sous-sol d'immeuble. Nous remontons au treuil les voitures qui ne roulent plus, puis nous les remettons à un centre VHU agréé partenaire, qui établit le certificat de destruction." },
  { slug: 'seine-saint-denis-93', code: '93', name: 'Seine-Saint-Denis', locative: 'en Seine-Saint-Denis', idf: true, local: "La Seine-Saint-Denis compte 40 communes et accueille la fourrière de La Courneuve, gérée par la Ville de Paris. Faire détruire un véhicule n'exige pourtant aucun déplacement : nous l'enlevons gratuitement là où il est et le remettons à un centre VHU agréé partenaire." },
  { slug: 'val-de-marne-94', code: '94', name: 'Val-de-Marne', locative: 'dans le Val-de-Marne', idf: true, local: "Dans le Val-de-Marne, la fourrière de Bonneuil-sur-Marne reçoit des véhicules enlevés à Paris, et les communes situées à l'intérieur de l'A86 sont dans la ZFE du Grand Paris. Qu'il soit dans la rue, en parking ou en fourrière (avec votre mandat), nous acheminons le véhicule vers un centre VHU agréé partenaire." },
  { slug: 'val-d-oise-95', code: '95', name: "Val-d'Oise", locative: "dans le Val-d'Oise", idf: true, local: "Le Val-d'Oise est hors de la ZFE du Grand Paris, mais les obligations VHU y sont les mêmes partout : seul un centre agréé peut délivrer un certificat de destruction valable. Nous intervenons d'Argenteuil au Vexin et dans l'est aéroportuaire, sous 24 h." },
  { slug: 'guadeloupe-971', code: '971', name: 'Guadeloupe', locative: 'en Guadeloupe', idf: false, local: "En Guadeloupe comme en métropole, un véhicule hors d'usage doit être remis à un centre VHU agréé, seul habilité à délivrer le certificat de destruction ; la liste des centres agréés est consultable sur le site de l'ANTS. Appelez-nous avant toute démarche : nous vous indiquons si nous pouvons intervenir et vers quel centre agréé le véhicule sera dirigé." },
  { slug: 'martinique-972', code: '972', name: 'Martinique', locative: 'en Martinique', idf: false, local: "En Martinique, les règles sont celles du code de l'environnement : un véhicule hors d'usage ne peut finir que dans un centre VHU agréé, qui le dépollue et délivre le certificat de destruction ; l'annuaire officiel des centres agréés est sur le site de l'ANTS. Appelez-nous : nous vous indiquons si nous pouvons intervenir dans votre commune et vers quel centre agréé le véhicule sera dirigé." },
  { slug: 'guyane-973', code: '973', name: 'Guyane', locative: 'en Guyane', idf: false, local: "En Guyane, les distances entre les communes du littoral et de l'intérieur rendent l'enlèvement plus long à organiser, mais l'obligation est la même : la destruction d'un véhicule passe par un centre VHU agréé, qui délivre le certificat de destruction. Appelez-nous pour savoir si nous pouvons intervenir et vers quel centre agréé le véhicule sera dirigé." },
  { slug: 'la-reunion-974', code: '974', name: 'La Réunion', locative: 'à La Réunion', idf: false, local: "À La Réunion, comme partout en France, un véhicule hors d'usage doit être remis à un centre VHU agréé, seul habilité à délivrer le certificat de destruction ; la liste des centres agréés est publiée par l'ANTS. Appelez-nous : nous vous indiquons si nous pouvons intervenir et vers quel centre agréé le véhicule sera dirigé." },
];

export function getCentreVhuDept(slug: string): CentreVhuDept | undefined {
  return CENTRE_VHU_DEPTS.find((d) => d.slug === slug);
}

export const CENTRE_VHU_SOURCES = [
  { label: 'service-public.gouv.fr — Véhicule à détruire (F1468, vérifié le 13/08/2026)', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F1468' },
  { label: 'Code de l’environnement — articles R.543-153 et suivants (véhicules hors d’usage)', url: 'https://www.legifrance.gouv.fr/codes/id/LEGIARTI000046669583' },
  { label: 'Code de la route — article R.322-9 (certificat de destruction)', url: 'https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074228/' },
  { label: 'ANTS — annuaire des centres VHU agréés (démolisseurs)', url: 'https://immatriculation.ants.gouv.fr/' },
];
