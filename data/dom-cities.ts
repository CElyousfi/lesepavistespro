/**
 * Hand-written content for overseas commune pages that Search Console shows
 * as worth it (S3.4): pages with ≥ 50 impressions on the 5 Oct 2026 import.
 * Only one qualifies — La Trinité (972), 653 impressions on the épaviste page,
 * 882 on its queries, 0 click; its rachat twin gets the same treatment.
 *
 * Facts, all public: INSEE via geo.api.gouv.fr (code 97230, CP 97220,
 * population 11 454, surface 46,0 km², CA du Pays Nord Martinique), centroid
 * distances computed from the same dataset, arrondissement of La Trinité
 * (sous-préfecture), presqu'île de la Caravelle and its réserve naturelle,
 * cyclone season 1 June – 30 November (Météo-France), VHU rules
 * (service-public F1468, code de l'environnement R.543-153 s.).
 * Nothing about fourrière addresses, partner centres or delays is asserted.
 */

import type { FaqItem } from '@/lib/faq';

export interface DomCityContent {
  updatedAt: string;
  epaviste: { h2: string; intro: string[]; situations: Array<{ title: string; text: string }>; acces: string[]; faq: FaqItem[] };
  rachat: { h2: string; intro: string[]; situations: Array<{ title: string; text: string }>; faq: FaqItem[] };
  sources: string[];
}

const LA_TRINITE: DomCityContent = {
  updatedAt: '2026-10-05',
  epaviste: {
    h2: 'Épaviste à La Trinité (Martinique) : enlèvement et destruction de votre véhicule',
    intro: [
      "La Trinité (97220) est la sous-préfecture du nord-atlantique de la Martinique : 11 454 habitants (INSEE) sur 46 km², membre de la communauté d'agglomération du Pays Nord Martinique. La commune s'étend du bourg, en fond de baie, jusqu'à la presqu'île de la Caravelle et au village de Tartane. Sur cette côte exposée aux alizés, l'air salin accélère la corrosion : une voiture immobilisée quelques mois sous la pluie et les embruns devient vite une épave.",
      "Pour faire enlever une épave à La Trinité, comme partout en France, le véhicule doit être remis à un centre VHU agréé, seul habilité à le dépolluer et à délivrer le certificat de destruction. La remise d'un véhicule complet — moteur, catalyseur et batterie présents — est gratuite. Appelez-nous avec l'adresse, le modèle et l'état du véhicule : nous vous indiquons le délai d'intervention et le centre VHU agréé vers lequel il sera dirigé.",
    ],
    situations: [
      { title: 'Voiture rouillée par l’air marin', text: "Plancher percé, freins grippés, carrosserie attaquée : sur la côte atlantique, la corrosion décide souvent de la fin de vie d'un véhicule avant la mécanique. Tant qu'il est complet, sa destruction ne coûte rien." },
      { title: 'Véhicule abîmé après une tempête', text: "La saison cyclonique court du 1er juin au 30 novembre. Après un épisode de vents ou d'inondation, un véhicule noyé ou écrasé peut être déclaré économiquement irréparable par l'assureur : nous l'enlevons avec la cession pour destruction." },
      { title: 'Voiture à l’arrêt à Tartane ou sur la Caravelle', text: "Chemins étroits, terrains en pente, accès par la route de la presqu'île : précisez l'emplacement exact et si les roues tournent encore, pour que le bon matériel (treuil) soit prévu." },
      { title: 'Voiture d’un proche décédé', text: "Les héritiers peuvent faire détruire le véhicule sans le faire immatriculer à leur nom : carte grise barrée et signée par eux, certificat de situation administrative et justificatif de succession." },
    ],
    acces: [
      "La Trinité est à environ 18 km à vol d'oiseau du centre de Fort-de-France ; ses voisines sont Sainte-Marie au nord-ouest, Gros-Morne à l'ouest et Le Robert au sud. Le bourg est desservi par la route du littoral atlantique, la presqu'île de la Caravelle par une route unique jusqu'à Tartane.",
      "La réserve naturelle de la Caravelle est un espace protégé : un véhicule abandonné en bord de piste ou de plage doit être signalé à la mairie, qui peut faire procéder à son enlèvement. S'il vous appartient, faites-le enlever avant cette procédure.",
    ],
    faq: [
      { question: 'Où faire détruire une voiture à La Trinité ?', answer: "Dans un centre VHU agréé de Martinique : c'est le seul à pouvoir délivrer le certificat de destruction. L'annuaire officiel est publié par l'ANTS. Vous pouvez aussi nous appeler : nous organisons l'enlèvement et la remise au centre agréé." },
      { question: 'L’enlèvement d’épave est-il gratuit à La Trinité ?', answer: "La remise d'un véhicule complet à un centre VHU agréé est gratuite. Un véhicule incomplet, brûlé ou difficile d'accès est un cas particulier : nous vous le disons avant toute intervention." },
      { question: 'Quels documents préparer ?', answer: "La carte grise barrée « Cédé le … pour destruction », datée et signée, un certificat de situation administrative de moins de 15 jours, le cerfa n° 15776 et une pièce d'identité. En cas de perte de la carte grise, la déclaration de perte la remplace." },
      { question: 'Que faire après la destruction ?', answer: "Gardez le certificat de destruction : il met fin à votre responsabilité. Envoyez-en une copie à votre assureur pour résilier le contrat." },
    ],
  },
  rachat: {
    h2: 'Rachat de voiture à La Trinité (Martinique) : vendre en l’état',
    intro: [
      "À La Trinité (97220), 11 454 habitants dans le nord-atlantique de la Martinique, une voiture qui a encore de la valeur — roulante, peu kilométrée ou recherchée pour ses pièces — n'a pas à finir à la casse. Vous pouvez la vendre en l'état à un professionnel, même sans contrôle technique : la vente sans CT est autorisée lorsque l'acheteur est un professionnel de l'automobile.",
      "Décrivez-nous le véhicule (marque, modèle, année, kilométrage, état) et envoyez quelques photos : nous vous disons s'il peut être racheté et à quelles conditions, ou si l'enlèvement gratuit pour destruction est la meilleure solution. La déclaration de cession est faite avec vous, pour que le véhicule ne soit plus à votre nom.",
    ],
    situations: [
      { title: 'Sans contrôle technique', text: "Un CT défavorable ou périmé n'empêche pas la vente à un professionnel. L'offre tient compte des réparations à prévoir." },
      { title: 'Corrosion avancée', text: "Sur la côte atlantique, une carrosserie attaquée par le sel n'enlève pas forcément toute valeur au moteur, à la boîte ou aux éléments intérieurs." },
      { title: 'Après un sinistre', text: "Véhicule accidenté ou touché par une tempête : selon l'avis de l'expert (VE ou VEI), il peut être cédé en l'état à un professionnel ou à l'assureur." },
    ],
    faq: [
      { question: 'Peut-on vendre une voiture sans contrôle technique à La Trinité ?', answer: "Oui, si l'acheteur est un professionnel de l'automobile. Entre particuliers, un contrôle technique de moins de 6 mois est obligatoire pour un véhicule de plus de 4 ans." },
      { question: 'Ma voiture ne roule plus : peut-elle être rachetée ?', answer: "Un véhicule non roulant ne peut être vendu qu'à un professionnel. S'il est complet et que ses pièces ont de la valeur, une offre est possible ; sinon, l'enlèvement gratuit vers un centre VHU agréé reste la solution." },
      { question: 'Quels documents pour vendre ?', answer: "La carte grise barrée « Vendu le … », datée et signée, un certificat de situation administrative de moins de 15 jours, le cerfa n° 15776 et une pièce d'identité." },
    ],
  },
  sources: [
    'INSEE via geo.api.gouv.fr — population, superficie, intercommunalité, centroïde',
    'Météo-France — saison cyclonique aux Antilles (1er juin – 30 novembre)',
    'service-public.gouv.fr — Véhicule à détruire (F1468), vente sans contrôle technique (F16540), véhicule non roulant (F17375)',
    'Code de l’environnement, articles R.543-153 et suivants',
  ],
};

export const DOM_CITY_CONTENT: Record<string, DomCityContent> = {
  'martinique-972/la-trinite': LA_TRINITE,
};

export function getDomCityContent(deptSlug: string, citySlug: string): DomCityContent | null {
  return DOM_CITY_CONTENT[`${deptSlug}/${citySlug}`] ?? null;
}
