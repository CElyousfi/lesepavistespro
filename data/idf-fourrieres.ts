/**
 * Fourrières in Île-de-France — public data only (S3.3).
 *
 * Paris: the Ville de Paris page « Fourrières » (paris.fr/pages/fourrieres-5315,
 * mise à jour du 31/08/2026) and its « Fourrières et préfourrières » place
 * pages (addresses, opening hours), checked on 5 October 2026: five
 * préfourrières, three fourrières, 179 € the first day then 29 € per day for a
 * car or a van < 3.5 t, 59 € then 10 € for two-wheelers, information line
 * 3975, portal oemv-fourrieres.paris.fr, 2 to 5 days in préfourrière, sale or
 * destruction after 10 to 15 days.
 *
 * Elsewhere: fourrières are municipal or run by gardiens agréés by each
 * préfecture. The lists are published by the préfectures (PDF, of uneven
 * freshness — the Seine-et-Marne one is dated 5 September 2017), so they are
 * linked, not copied: a copied list goes stale silently.
 * National fee caps: arrêté du 13 septembre 2026 (NOR ECOC2620806A, JORF du
 * 22 septembre 2026), in force on 1 October 2026.
 */

import type { IdfFourriere } from './idf-cities/types';

export const FOURRIERES_CHECKED_AT = '2026-10-05';

export const PARIS_TARIF = '179 € le premier jour, puis 29 € par jour de garde (voiture particulière, tarifs Ville de Paris)';
export const PARIS_TARIF_2RM = '59 € le premier jour, puis 10 € par jour (deux-roues motorisés et voiturettes)';
export const PARIS_NOTE =
  "Renseignements au 3975 ou sur le portail « Où est mon véhicule ? » (oemv-fourrieres.paris.fr). Un véhicule reste 2 à 5 jours en préfourrière avant transfert vers les fourrières de Chevaleret (13e), Bonneuil-sur-Marne ou La Courneuve ; non réclamé, il peut être vendu ou détruit après 10 à 15 jours. Si vous ne souhaitez pas le récupérer, nous pouvons organiser sa destruction avec votre mandat.";

export interface ParisFourriereSite extends IdfFourriere {
  kind: 'préfourrière' | 'fourrière';
  /** Short locality label for tables ("Paris 1er", "Clichy (92)"). */
  where: string;
}

export const LOUVRE: ParisFourriereSite = {
  kind: 'préfourrière',
  where: 'Paris 1er',
  name: 'Préfourrière Louvre-Samaritaine (Paris Centre)',
  address: 'Place du Louvre, parking Louvre-Samaritaine niveau -4, 75001 Paris',
  phone: '3975',
  hours: 'Lundi–samedi 8h00–20h30, fermée le dimanche',
  tarif: PARIS_TARIF,
  note: PARIS_NOTE,
};
export const CHARLETY: ParisFourriereSite = {
  kind: 'préfourrière',
  where: 'Paris 13e',
  name: 'Préfourrière Charléty',
  address: 'Parc Charléty-Thomire, rue Thomire, 75013 Paris',
  phone: '3975',
  hours: 'Tous les jours 6h30–22h30',
  tarif: PARIS_TARIF,
  note: PARIS_NOTE,
};
export const FOCH: ParisFourriereSite = {
  kind: 'préfourrière',
  where: 'Paris 16e',
  name: 'Préfourrière Foch',
  address: 'Parc Étoile-Foch, 2e sous-sol, avenue Foch, 75016 Paris',
  phone: '3975',
  hours: 'Lundi–samedi 8h00–20h30, fermée le dimanche',
  tarif: PARIS_TARIF,
  note: PARIS_NOTE,
};
export const PANTIN: ParisFourriereSite = {
  kind: 'préfourrière',
  where: 'Paris 19e',
  name: 'Préfourrière Pantin',
  address: '15 rue de la Marseillaise, 75019 Paris',
  phone: '3975',
  hours: 'Lundi–samedi 8h00–20h30, fermée le dimanche',
  tarif: PARIS_TARIF,
  note: PARIS_NOTE,
};
export const POUCHET: ParisFourriereSite = {
  kind: 'préfourrière',
  where: 'Clichy (92)',
  name: 'Préfourrière Pouchet',
  address: '3 boulevard du Général Leclerc, 92110 Clichy (porte Pouchet)',
  phone: '3975',
  hours: '24h/24',
  tarif: PARIS_TARIF,
  note: PARIS_NOTE,
};
const FOURRIERE_HOURS = 'Lundi–jeudi 8h30–17h00, vendredi 8h30–16h30, fermée le week-end';
export const CHEVALERET: ParisFourriereSite = {
  kind: 'fourrière',
  where: 'Paris 13e',
  name: 'Fourrière Chevaleret',
  address: 'Au niveau du 97-99 boulevard Vincent-Auriol, 75013 Paris',
  phone: '3975',
  hours: FOURRIERE_HOURS,
  tarif: PARIS_TARIF,
};
export const BONNEUIL: ParisFourriereSite = {
  kind: 'fourrière',
  where: 'Bonneuil-sur-Marne (94)',
  name: 'Fourrière de Bonneuil',
  address: 'ZI de la Haie Griselle, 11 rue des Champs (angle RN 19), 94380 Bonneuil-sur-Marne',
  phone: '3975',
  hours: FOURRIERE_HOURS,
  tarif: PARIS_TARIF,
};
export const LA_COURNEUVE: ParisFourriereSite = {
  kind: 'fourrière',
  where: 'La Courneuve (93)',
  name: 'Fourrière de La Courneuve',
  address: '92 avenue Jean-Mermoz, 93120 La Courneuve',
  phone: '3975',
  hours: FOURRIERE_HOURS,
  tarif: PARIS_TARIF,
};

/** The 8 sites of the Ville de Paris, préfourrières first. */
export const PARIS_FOURRIERE_SITES: ParisFourriereSite[] = [LOUVRE, CHARLETY, FOCH, PANTIN, POUCHET, CHEVALERET, BONNEUIL, LA_COURNEUVE];

export const PARIS_FOURRIERE_SOURCE = {
  label: 'Ville de Paris — Fourrières (mise à jour du 31/08/2026) et fiches « Fourrières et préfourrières »',
  url: 'https://www.paris.fr/pages/fourrieres-5315',
};

/** National maximum fees for a voiture particulière, outside Paris (arrêté du 13/09/2026, en vigueur le 01/10/2026). */
export const NATIONAL_FEE_CAPS = {
  source: 'Arrêté du 13 septembre 2026 modifiant l’arrêté du 14 novembre 2001 fixant les tarifs maxima des frais de fourrière pour automobiles (JORF du 22/09/2026, NOR ECOC2620806A)',
  url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054877184',
  inForce: '2026-10-01',
  rows: [
    { label: 'Immobilisation matérielle', amount: '7,60 €' },
    { label: 'Opérations préalables', amount: '15,20 €' },
    { label: 'Enlèvement', amount: '135,00 €' },
    { label: 'Garde journalière', amount: '7,15 € par jour' },
  ],
};

/** Outside Paris: who decides, where the official list is. */
export interface DeptFourriereInfo {
  code: string;
  name: string;
  slug: string;
  /** Préfecture page publishing the agreed gardiens de fourrière. */
  prefectureUrl: string;
  /** Sites of the Ville de Paris located in the department, if any. */
  parisSites: ParisFourriereSite[];
  note: string;
}

const COMMON =
  'La mise en fourrière est prescrite par la police municipale, la police nationale ou la gendarmerie ; le véhicule est conduit dans une fourrière municipale ou chez un gardien agréé par la préfecture. Le commissariat ou la brigade du lieu d’enlèvement indique où il se trouve et délivre l’autorisation de sortie.';

export const DEPT_FOURRIERES: DeptFourriereInfo[] = [
  { code: '77', name: 'Seine-et-Marne', slug: 'seine-et-marne-77', prefectureUrl: 'https://www.seine-et-marne.gouv.fr/Demarches/Toutes-les-demarches/Professionnels-de-l-automobile/Fourrieres-depannage/Gardiens-de-fourrieres', parisSites: [], note: `${COMMON} La liste publiée par la préfecture date de septembre 2017 : vérifiez toujours auprès du commissariat ou de la gendarmerie.` },
  { code: '78', name: 'Yvelines', slug: 'yvelines-78', prefectureUrl: 'https://www.yvelines.gouv.fr/Politiques-publiques/Consommation-et-commerce/Professions-reglementees/Agrement-des-fourrieres', parisSites: [], note: `${COMMON} La préfecture publie la liste des gardiens de fourrière agréés (mise à jour de novembre 2025).` },
  { code: '91', name: 'Essonne', slug: 'essonne-91', prefectureUrl: 'https://www.essonne.gouv.fr/Demarches/Circulation-et-vehicules/Professionnels-de-la-route/Gardien-de-fourriere', parisSites: [], note: `${COMMON} La préfecture publie la liste des fourrières agréées du département.` },
  { code: '92', name: 'Hauts-de-Seine', slug: 'hauts-de-seine-92', prefectureUrl: 'https://www.hauts-de-seine.gouv.fr/Demarches-administratives/Autres-demarches/Activites-reglementees-et-police-administrative/Professions-reglementees/Fourriere', parisSites: [POUCHET], note: `${COMMON} La préfourrière Pouchet, à Clichy, dépend de la Ville de Paris et reçoit des véhicules enlevés dans Paris.` },
  { code: '93', name: 'Seine-Saint-Denis', slug: 'seine-saint-denis-93', prefectureUrl: 'https://www.seine-saint-denis.gouv.fr/Demarches/Professions-et-activites-reglementees/Gardien-de-fourriere', parisSites: [LA_COURNEUVE], note: `${COMMON} La fourrière de La Courneuve est gérée par la Ville de Paris (véhicules enlevés dans Paris).` },
  { code: '94', name: 'Val-de-Marne', slug: 'val-de-marne-94', prefectureUrl: 'https://www.val-de-marne.gouv.fr/Demarches-administratives/Professions-et-activites-reglementees/Depanneurs-autoroutiers-et-fourrieres-automobiles', parisSites: [BONNEUIL], note: `${COMMON} La préfecture publie la liste des fourriéristes par secteur. La fourrière de Bonneuil-sur-Marne est gérée par la Ville de Paris.` },
  { code: '95', name: "Val-d'Oise", slug: 'val-d-oise-95', prefectureUrl: 'https://www.val-doise.gouv.fr/Demarches/Professions-reglementees/Fourriere', parisSites: [], note: `${COMMON} La préfecture publie les listes des gardiens agréés par secteur de police et de gendarmerie.` },
];
