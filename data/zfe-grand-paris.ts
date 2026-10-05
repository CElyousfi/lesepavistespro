/**
 * ZFE du Grand Paris — facts used by the Paris hubs and /guides/zfe-grand-paris
 * (S3.3). Every statement is sourced; re-check at each official announcement
 * (TODO(owner): calendar of fines from 2027, each January).
 *
 * Sources, checked on 5 October 2026:
 *   - Métropole du Grand Paris, « La ZFE métropolitaine » (page mise à jour le
 *     02/01/2026) and « Communes comprises dans la ZFE-m » (PDF): perimeter
 *     inside the A86 (A86 itself excluded), 77 communes (Paris + 59 entirely +
 *     17 partly), Crit'Air 3, 4, 5 and non classés restricted Monday–Friday
 *     8 h–20 h, « Pass ZFE » 24 h, no fines (période pédagogique) until
 *     31 December 2026.
 *   - Conseil constitutionnel, décision n° 2026-903 DC du 21 mai 2026: the
 *     abolition of the ZFE voted by Parliament was censured — the zone
 *     remains.
 *   - certificat-air.gouv.fr — the only official site to order the Crit'Air
 *     vignette; classes by fuel and Euro standard.
 */

export const ZFE_CHECKED_AT = '2026-10-05';

export const ZFE_COMMUNE_COUNT = 77;

export const ZFE_FACTS = {
  perimeter:
    "La ZFE métropolitaine couvre le territoire situé à l'intérieur de l'A86, l'autoroute elle-même étant exclue : 77 communes, dont Paris, 59 communes entièrement et 17 en partie (Bobigny, Bondy, Champigny-sur-Marne, Châtenay-Malabry, Choisy-le-Roi, Clamart, Colombes, Créteil, Drancy, Gennevilliers, Maisons-Alfort, Montreuil, Rosny-sous-Bois, Rungis, Thiais, Villeneuve-la-Garenne, Vitry-sur-Seine).",
  rule:
    "Les véhicules Crit'Air 3, 4, 5 et non classés n'ont plus le droit d'y circuler du lundi au vendredi, de 8 h à 20 h. Un « Pass ZFE » permet une circulation ponctuelle de 24 heures.",
  sanctions:
    "Aucune amende n'est dressée en 2026 : la Métropole a prolongé la période pédagogique jusqu'au 31 décembre 2026. Le calendrier des verbalisations à partir de 2027 doit être confirmé par la Métropole.",
  legal:
    "La suppression des ZFE votée au printemps 2026 a été censurée par le Conseil constitutionnel (décision n° 2026-903 DC du 21 mai 2026) : la zone reste en vigueur.",
};

/** Crit'Air classes for cars (voitures particulières), by first registration. */
export const CRITAIR_CLASSES: Array<{ vignette: string; essence: string; diesel: string; zfe: string }> = [
  { vignette: 'Crit’Air 0 (verte)', essence: 'Électrique, hydrogène', diesel: '—', zfe: 'Autorisée' },
  { vignette: 'Crit’Air 1 (violette)', essence: 'Euro 5 et 6 (depuis le 1er janvier 2011), hybrides rechargeables, gaz', diesel: '—', zfe: 'Autorisée' },
  { vignette: 'Crit’Air 2 (jaune)', essence: 'Euro 4 (2006 à 2010)', diesel: 'Euro 5 et 6 (depuis le 1er janvier 2011)', zfe: 'Autorisée' },
  { vignette: 'Crit’Air 3 (orange)', essence: 'Euro 2 et 3 (1997 à 2005)', diesel: 'Euro 4 (2006 à 2010)', zfe: 'Restreinte lun.–ven. 8 h–20 h' },
  { vignette: 'Crit’Air 4 (bordeaux)', essence: '—', diesel: 'Euro 3 (2001 à 2005)', zfe: 'Restreinte lun.–ven. 8 h–20 h' },
  { vignette: 'Crit’Air 5 (grise)', essence: '—', diesel: 'Euro 2 (1997 à 2000)', zfe: 'Restreinte lun.–ven. 8 h–20 h' },
  { vignette: 'Non classé', essence: 'Avant le 1er janvier 1997', diesel: 'Avant le 1er janvier 1997', zfe: 'Restreinte lun.–ven. 8 h–20 h' },
];

export const ZFE_SOURCES = [
  { label: 'Métropole du Grand Paris — La ZFE métropolitaine (mise à jour 02/01/2026)', url: 'https://metropolegrandparis.fr/fr/la-zone-faibles-emissions-metropolitaine' },
  { label: 'Conseil constitutionnel — décision n° 2026-903 DC du 21 mai 2026', url: 'https://www.conseil-constitutionnel.fr/decision/2026/2026903DC.htm' },
  { label: 'Certificat qualité de l’air (Crit’Air) — site officiel', url: 'https://www.certificat-air.gouv.fr/' },
];

/** One paragraph for the Paris hubs. */
export const ZFE_PARIS_PARAGRAPH = `${ZFE_FACTS.perimeter.split(' : ')[0]}, Paris compris. ${ZFE_FACTS.rule} ${ZFE_FACTS.sanctions} ${ZFE_FACTS.legal}`;
