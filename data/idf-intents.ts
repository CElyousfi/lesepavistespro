import type { FaqItem } from '@/lib/faq';

/**
 * Île-de-France "situation" pages (S2.1) — /epaviste/ile-de-france/<intent>
 * and /rachat-voiture/ile-de-france/<intent>. People search by situation
 * ("épave sans carte grise", "voiture accidentée rachat") as much as by
 * town; each entry below is a hand-written, self-contained page.
 *
 * Every statement about law or procedure comes from an official source,
 * checked on 20 Sep 2026 — see SOURCES; the entry cites the keys it relies
 * on. Nothing that could not be verified is written. No price is stated
 * except "gratuit" for the enlèvement of a complete vehicle, which is the
 * legal rule (SP_VHU).
 *
 * Word budget: 900–1 400 words per page in intro + sections + faq
 * (guarded by scripts/seo-qa-check.ts).
 */

export const INTENT_SOURCES = {
  /** Véhicule à détruire et carte grise — véhicule immatriculé en France:
   *  centre VHU agréé seul habilité ; remise gratuite si le véhicule est
   *  complet (moteur, catalyseur, batterie) ; carte grise barrée « Cédé le
   *  … pour destruction » ; certificat de situation administrative de moins
   *  de 15 jours ; cerfa 15776 ; perte/vol → déclaration de perte ; informer
   *  l'assureur. https://www.service-public.gouv.fr/particuliers/vosdroits/F36516/0_0 */
  SP_VHU: 'service-public.gouv.fr — Véhicule à détruire et carte grise (F1468)',
  /** Certificat de situation administrative : « La présence d'un gage
   *  n'empêche pas la vente du véhicule » ; une opposition bloque la vente
   *  tant qu'elle n'est pas levée ; CSA de moins de 15 jours, gratuit
   *  (HistoVec). https://www.service-public.gouv.fr/particuliers/vosdroits/F1360 */
  SP_CSA: 'service-public.gouv.fr — Certificat de situation administrative (F1360)',
  /** Lever un gage ou une opposition : le gage est levé par l'organisme
   *  financier une fois le crédit remboursé ; l'opposition (Trésor public,
   *  commissaire de justice, expert VE/VEI, FOVeS) bloque tout changement de
   *  propriétaire ; un VEI « ne pourra être cédé qu'à un démolisseur ».
   *  https://www.service-public.gouv.fr/particuliers/vosdroits/F34107 */
  SP_GAGE: 'service-public.gouv.fr — Faire lever le gage ou l\'opposition (F34107)',
  /** Véhicule accidenté : procédure VE / VEI / VGE, offre de l'assureur,
   *  30 jours pour répondre, opposition au transfert, cession en l'état
   *  possible « à un professionnel de l'automobile ou à votre assureur ».
   *  https://www.service-public.gouv.fr/particuliers/vosdroits/F34300/17 */
  SP_VE: 'service-public.gouv.fr — Véhicule accidenté : conséquences sur la carte grise',
  /** Hériter d'un véhicule, les héritiers ne le conservent pas : cerfa 15776
   *  au nom des héritiers, CSA de moins de 15 jours, carte grise barrée et
   *  signée par les héritiers, justificatif de succession (attestation du
   *  notaire, acte de notoriété, ou acte de décès + attestation de tous les
   *  héritiers) ; pas de carte grise au nom d'un héritier au préalable.
   *  https://www.service-public.gouv.fr/particuliers/vosdroits/F36517/0_0_1_0_0 */
  SP_HERITAGE: 'service-public.gouv.fr — Carte grise : hériter d\'un véhicule (F1480)',
  /** Mise en fourrière : lettre dans les 5 jours ouvrables ; véhicule réputé
   *  abandonné 15 jours (vente aux Domaines) ou 10 jours (destruction) après
   *  la notification ; frais dus même après abandon ; documents pour
   *  récupérer : assurance, permis, titre de circulation, mainlevée.
   *  https://www.service-public.gouv.fr/particuliers/vosdroits/F12918 */
  SP_FOURRIERE: 'service-public.gouv.fr — Mise en fourrière du véhicule (F12918)',
  /** Vente sans contrôle technique : possible si le véhicule a moins de 4 ans
   *  ou s'il est vendu à un professionnel ; sinon CT de moins de 6 mois.
   *  https://www.service-public.gouv.fr/particuliers/vosdroits/F16540 */
  SP_CT: 'service-public.gouv.fr — Vendre un véhicule sans contrôle technique (F16540)',
  /** Véhicule non roulant : « ne peut pas être vendu à un particulier », vente
   *  réservée aux professionnels ; sinon remise à un centre VHU.
   *  https://www.service-public.gouv.fr/particuliers/vosdroits/F17375 */
  SP_NON_ROULANT: 'service-public.gouv.fr — Vendre ou acheter un véhicule non roulant (F17375)',
  /** Stationnement abusif : plus de 7 jours consécutifs au même point de la
   *  voie publique (art. R417-12 code de la route) — contravention et mise en
   *  fourrière possible. https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842300 */
  CR_R417_12: 'Code de la route, art. R417-12 (stationnement abusif)',
  /** Véhicule laissé sans droit sur un terrain privé : mise en demeure au
   *  propriétaire, avec accusé de réception, de retirer le véhicule sous
   *  8 jours (art. R325-47 s. code de la route).
   *  https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074228/LEGISCTA000006189108 */
  CR_R325_47: 'Code de la route, art. R325-47 à R325-52 (véhicules laissés sur un terrain privé)',
  /** Caravane ou remorque : immatriculation obligatoire (carte grise propre)
   *  lorsque le PTAC dépasse 500 kg. https://www.service-public.gouv.fr/particuliers/vosdroits/F21112 */
  SP_CARAVANE: 'service-public.gouv.fr — Faut-il immatriculer une caravane ou une remorque ? (F21112)',
  /** Prime à la conversion supprimée à compter du 2 décembre 2024 (décret
   *  n° 2024-1084 du 29 novembre 2024). https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050690951 */
  DECRET_2024_1084: 'Décret n° 2024-1084 du 29 novembre 2024 — fin de la prime à la conversion',
  /** ZFE métropolitaine : périmètre de 77 communes (liste officielle),
   *  Crit'Air 3/4/5 restreints du lundi au vendredi 8h–20h, période
   *  pédagogique sans verbalisation jusqu'au 31/12/2026, Pass ZFE 24h.
   *  https://metropolegrandparis.fr/fr/la-zone-faibles-emissions-metropolitaine (02/01/2026) */
  MGP_ZFE: 'Métropole du Grand Paris — la ZFE métropolitaine (mise à jour 02/01/2026)',
  /** Suppression des ZFE censurée : décision n° 2026-903 DC du 21 mai 2026.
   *  https://www.conseil-constitutionnel.fr/decision/2026/2026903DC.htm */
  CC_2026_903: 'Conseil constitutionnel — décision n° 2026-903 DC du 21 mai 2026',
} as const;

export type IntentSourceKey = keyof typeof INTENT_SOURCES;

export interface IdfIntentSection {
  title: string;
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs. */
  list?: string[];
}

export interface IdfIntent {
  slug: string;
  service: 'epaviste' | 'rachat-voiture';
  /** ISO date of the last real content change (sitemap lastmod). */
  updatedAt: string;
  /** H1. */
  title: string;
  /** SERP title, ≤ 60 characters, brand appended by the route. */
  metaTitle: string;
  /** Meta description, 120–155 characters. */
  description: string;
  /** Short label for link lists ("Sans carte grise"). */
  label: string;
  intro: string[];
  sections: IdfIntentSection[];
  faq: FaqItem[];
  /** Three Tier A communes this situation is typical of. */
  towns: Array<{ deptSlug: string; slug: string }>;
  sources: IntentSourceKey[];
}

export const idfIntents: IdfIntent[] = [
  {
    slug: 'sans-carte-grise',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Enlèvement d'épave sans carte grise en Île-de-France",
    metaTitle: 'Épave sans carte grise en IDF',
    description: "Carte grise perdue, volée ou au nom d'un tiers : comment faire enlever gratuitement une épave en Île-de-France, et quels documents la remplacent.",
    label: 'Sans carte grise',
    intro: [
      "« Je n'ai plus la carte grise » est la première phrase que nous entendons dans un appel sur cinq en Île-de-France. Une voiture restée dix ans au fond d'un parking de copropriété à Paris, un utilitaire hérité d'un oncle à Argenteuil, une citadine achetée à un particulier à Montreuil sans jamais avoir refait les papiers : les cas sont innombrables, et la réponse est presque toujours la même — l'enlèvement reste possible, et gratuit, à condition de rassembler les bons documents de remplacement.",
      "La règle de fond ne change pas : un véhicule hors d'usage doit être remis à un centre VHU agréé, seul habilité à le détruire et à délivrer le certificat de destruction. Ce que la carte grise sert à prouver — que vous êtes bien le titulaire et que le véhicule n'est ni gagé ni frappé d'opposition — peut l'être autrement. Cette page détaille chaque situation, ce que nous vous demandons et ce que nous faisons pour vous.",
    ],
    sections: [
      {
        title: 'Ce que dit la réglementation quand la carte grise manque',
        paragraphs: [
          "Pour céder un véhicule à un centre VHU, le propriétaire remet normalement le certificat d'immatriculation barré, daté et signé, avec la mention « Cédé le (jour/mois/année) pour destruction », accompagné d'un certificat de situation administrative de moins de quinze jours et du formulaire de déclaration de cession (cerfa 15776). Lorsque le certificat est perdu ou volé, la démarche officielle prévoit de le remplacer par une déclaration de perte ou de vol du certificat d'immatriculation : c'est ce document, et non un duplicata, qui accompagne alors la cession.",
          "Le certificat de situation administrative, lui, ne dépend pas de la possession physique de la carte grise : il s'obtient gratuitement en ligne, immédiatement, à partir de l'immatriculation et des informations du titulaire. Il indique si le véhicule est gagé ou sous opposition ; un gage n'empêche pas la cession, une opposition la bloque tant qu'elle n'est pas levée.",
        ],
      },
      {
        title: 'Les quatre cas que nous rencontrons en Île-de-France',
        paragraphs: [
          "Carte grise perdue ou volée, véhicule à votre nom : c'est le cas le plus simple. Vous remplissez une déclaration de perte (ou déposez plainte pour vol), vous demandez le certificat de situation administrative en ligne, et nous établissons la cession pour destruction avec ces deux documents et votre pièce d'identité. Aucune démarche de duplicata n'est nécessaire pour une voiture qui part à la destruction.",
          "Carte grise au nom d'un parent décédé : les héritiers cèdent le véhicule sans avoir à le mettre à leur nom, en joignant un justificatif de succession — attestation du notaire, acte de notoriété, ou acte de décès accompagné d'une attestation signée de tous les héritiers — et en signant la déclaration de cession. Nous détaillons ce cas sur notre page consacrée aux successions.",
          "Carte grise au nom d'un ancien propriétaire jamais mise à jour : la voiture est toujours, administrativement, celle du vendeur. Il faut soit que ce dernier signe la cession (nous pouvons lui envoyer le document), soit que vous régularisiez d'abord l'immatriculation à votre nom. Sans l'un ou l'autre, aucun centre agréé ne peut détruire le véhicule à votre demande.",
          "Véhicule sans aucun papier, immatriculation illisible ou plaques absentes : nous relevons le numéro de série sur le châssis et interrogeons, avec vous, l'historique administratif. Si le titulaire ne peut pas être établi, le véhicule relève de la procédure d'abandon menée par le propriétaire du lieu ou par la commune, pas d'une cession volontaire.",
        ],
      },
      {
        title: 'Comment se déroule l\'enlèvement',
        paragraphs: [
          "Vous nous envoyez par WhatsApp une photo du véhicule, de la plaque ou du numéro de série, et des documents dont vous disposez. Nous vous confirmons dans la journée la liste exacte de ce qu'il faut réunir, et nous fixons un créneau : le plus souvent sous 2 h en petite couronne, sous 24 h en grande couronne. Le jour venu, nous vérifions les documents, remplissons la déclaration de cession avec vous, chargeons le véhicule et vous remettons le certificat de destruction.",
          "Ce certificat est la pièce qui compte : c'est lui qui vous permet d'informer votre assureur et de mettre fin au contrat, et qui atteste que le véhicule ne pourra plus jamais circuler sous son identité. Conservez-en une copie, avec votre exemplaire de la déclaration de cession.",
        ],
        list: [
          "Déclaration de perte ou de vol du certificat d'immatriculation, ou justificatif de succession, ou signature de l'ancien titulaire.",
          "Certificat de situation administrative de moins de quinze jours (gratuit, en ligne).",
          "Pièce d'identité du titulaire, ou procuration et copie de sa pièce d'identité si un tiers nous reçoit.",
          "Déclaration de cession cerfa 15776, remplie sur place et déclarée en ligne par nos soins.",
        ],
      },
      {
        title: 'Ce qui rend l\'enlèvement gratuit — et ce qui pourrait le compliquer',
        paragraphs: [
          "La remise d'un véhicule complet — moteur, catalyseur et batterie présents — à un centre VHU agréé est gratuite ; c'est la règle, pas une offre commerciale. Un véhicule incomplet ou une situation exceptionnelle (véhicule bloqué par un autre, accès condamné) sont étudiés au cas par cas, et nous vous le disons avant de venir. L'absence de carte grise, elle, ne change rien au prix : elle change seulement les documents à préparer.",
          "Ce qui peut bloquer, en revanche, c'est une opposition inscrite sur le véhicule : amendes impayées signalées par le Trésor public, saisie par un commissaire de justice, opposition d'un expert après un accident. Le certificat de situation administrative la révèle immédiatement, et c'est la raison pour laquelle nous le demandons avant de nous déplacer.",
        ],
      },
    ],
    faq: [
      { question: "Peut-on faire enlever une épave sans carte grise ?", answer: "Oui. La carte grise est remplacée par une déclaration de perte ou de vol du certificat d'immatriculation, accompagnée du certificat de situation administrative de moins de quinze jours et de votre pièce d'identité ; la cession pour destruction est établie avec ces documents." },
      { question: "Faut-il demander un duplicata de carte grise avant la destruction ?", answer: "Non. Pour un véhicule qui part à la destruction, la déclaration de perte ou de vol tient lieu de certificat d'immatriculation ; un duplicata serait une dépense et un délai inutiles." },
      { question: "La carte grise est au nom de mon père décédé, comment faire ?", answer: "Les héritiers cèdent le véhicule sans le mettre à leur nom : justificatif de succession (attestation du notaire, acte de notoriété ou acte de décès avec attestation de tous les héritiers), carte grise barrée et signée par les héritiers si elle existe, certificat de situation administrative, déclaration de cession signée par eux." },
      { question: "La carte grise est encore au nom du vendeur qui m'a cédé la voiture, que faire ?", answer: "Administrativement, le véhicule est toujours le sien : il doit signer la déclaration de cession pour destruction, ou vous devez d'abord régulariser l'immatriculation à votre nom. Nous pouvons lui transmettre le document à signer." },
      { question: "Comment obtenir le certificat de situation administrative sans la carte grise ?", answer: "En ligne, gratuitement et immédiatement, à partir du numéro d'immatriculation et des informations du titulaire ; il ne nécessite pas de présenter le certificat d'immatriculation." },
      { question: "L'enlèvement est-il toujours gratuit sans carte grise ?", answer: "Oui, pour un véhicule complet : la gratuité tient à l'état du véhicule (moteur, catalyseur, batterie présents), pas aux papiers. Une opposition inscrite au fichier des immatriculations doit en revanche être levée avant toute cession." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-15e' },
      { deptSlug: 'val-d-oise-95', slug: 'argenteuil' },
      { deptSlug: 'seine-saint-denis-93', slug: 'montreuil' },
    ],
    sources: ['SP_VHU', 'SP_CSA', 'SP_HERITAGE'],
  },
  {
    slug: 'parking-souterrain',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Enlèvement d'épave en parking souterrain en Île-de-France",
    metaTitle: 'Épave en parking souterrain en IDF',
    description: "Niveau -2, rampe étroite, hauteur limitée, badge, syndic : comment nous sortons une épave d'un parking souterrain en Île-de-France, gratuitement.",
    label: 'Parking souterrain',
    intro: [
      "En Île-de-France, l'épave n'est presque jamais dans la rue : elle est au niveau -2 d'une copropriété du 15e, sur la dalle d'un bailleur à Bobigny, au fond d'un parking de résidence à Créteil ou à Cergy. Une hauteur libre de 1,90 m, une rampe hélicoïdale, une barrière à badge et une voiture dont les roues ne tournent plus : c'est le quotidien de nos interventions, et la raison pour laquelle nous venons toujours avec un chariot, un treuil et un plateau bas.",
      "Cette page explique ce qui se passe concrètement, ce que nous vous demandons avant de venir, ce que peut faire un syndic ou un bailleur face à un véhicule abandonné dans son parking, et pourquoi l'enlèvement reste gratuit même depuis un troisième sous-sol.",
    ],
    sections: [
      {
        title: 'Pourquoi un plateau classique ne suffit pas',
        paragraphs: [
          "Un camion plateau mesure plus de 2,50 m de haut : il ne descend dans aucun parking d'immeuble. La voiture doit donc remonter à la surface par ses propres moyens — ou par les nôtres. Si elle roule encore, un opérateur la conduit jusqu'à la rue. Si elle ne démarre plus, nous la tirons au treuil palier par palier, un opérateur au volant pour diriger et freiner. Si les roues sont bloquées ou absentes, nous la posons sur des chariots de manutention et la poussons jusqu'à la rampe, où le treuil prend le relais.",
          "Les rampes hélicoïdales des immeubles des années 1960–1980, fréquentes à Paris et en petite couronne, imposent une manœuvre lente et une rampe libre le temps de l'opération : nous prévenons le gardien pour que les résidents ne s'y engagent pas pendant la remontée. Une intervention en sous-sol dure en général de trente minutes à une heure.",
        ],
      },
      {
        title: 'Ce que nous vous demandons avant de venir',
        paragraphs: [
          "Quatre informations suffisent à préparer l'intervention, et vous pouvez nous les envoyer par WhatsApp en deux minutes : une photo du panneau de hauteur à l'entrée du parking, le niveau où se trouve la voiture, son état (roule, ne démarre plus, roues bloquées, sans roues) et la personne qui ouvrira l'accès — vous, le gardien ou le syndic — avec ses horaires.",
          "Côté papiers, la cession pour destruction se fait comme partout : carte grise barrée « Cédé le … pour destruction », certificat de situation administrative de moins de quinze jours, pièce d'identité, déclaration de cession cerfa 15776 que nous remplissons sur place. Si la carte grise manque, une déclaration de perte ou de vol la remplace.",
        ],
        list: [
          "Photo du panneau de hauteur libre et du niveau concerné.",
          "État de la voiture : roule, ne démarre plus, roues bloquées, sans roues.",
          "Qui ouvre l'accès (badge, télécommande, gardien) et à quelles heures.",
          "Documents : carte grise ou déclaration de perte, certificat de situation administrative, pièce d'identité.",
        ],
      },
      {
        title: 'Syndic ou bailleur : le véhicule ventouse qui n\'est pas à vous',
        paragraphs: [
          "Un syndic ne peut pas faire détruire la voiture d'un copropriétaire ou d'un tiers de sa propre initiative : le véhicule reste la propriété de son titulaire. Pour un véhicule laissé sans droit dans un lieu non ouvert à la circulation publique — un parking privé en fait partie —, le code de la route prévoit que le propriétaire des lieux qui connaît l'identité du titulaire lui adresse une mise en demeure de retirer le véhicule, avec accusé de réception, sous huit jours ; si elle reste sans effet, la mise en fourrière peut être demandée à l'officier de police judiciaire.",
          "En pratique, les syndics et bailleurs d'Île-de-France mènent cette procédure véhicule par véhicule, avec l'aide du commissariat pour identifier les titulaires. Une fois le droit de disposer du véhicule établi, nous intervenons, souvent pour plusieurs véhicules dans la même tournée, et remettons un certificat de destruction par immatriculation, pièce indispensable au dossier de la copropriété ou du bailleur.",
        ],
      },
      {
        title: 'Les situations particulières des parkings franciliens',
        paragraphs: [
          "Le parking vendu avec l'appartement, mais pas la voiture qui l'occupe : le nouveau propriétaire de la place n'a aucun droit sur le véhicule ; c'est le vendeur, ou le titulaire de la carte grise, qui doit le céder. Le parking inondé après une fuite ou une crue : une voiture noyée est rarement récupérable, nous l'enlevons avec un certificat de destruction que vous transmettez à votre assureur. La voiture d'un locataire parti sans laisser d'adresse dans un immeuble de bailleur : c'est le bailleur qui mène la procédure, puis nous mandate.",
          "Enfin, la voiture d'un parent décédé, restée des années au parking : les héritiers la cèdent avec un justificatif de succession, sans avoir à la mettre à leur nom. Nous traitons ce cas sur une page dédiée.",
        ],
      },
      {
        title: 'Gratuit, même au niveau -3',
        paragraphs: [
          "La remise d'un véhicule complet à un centre VHU agréé est gratuite, et le temps de manutention en sous-sol fait partie de notre métier en Île-de-France : nous ne facturons ni la remontée au treuil, ni les chariots, ni l'attente du gardien. Un véhicule incomplet — moteur ou catalyseur absents — ou une situation exceptionnelle sont étudiés au cas par cas, et nous vous le disons avant de nous déplacer. Le certificat de destruction, lui, est remis dans tous les cas.",
        ],
      },
    ],
    faq: [
      { question: "Pouvez-vous enlever une voiture au niveau -3 d'un parking dont la hauteur est de 1,80 m ?", answer: "Oui. Le plateau reste dans la rue ; nous remontons la voiture au treuil ou sur des chariots, palier par palier, avec un opérateur au volant. Envoyez une photo du panneau de hauteur et le niveau concerné." },
      { question: "La voiture n'a plus de roues, est-ce possible ?", answer: "Oui, nous la posons sur des chariots de manutention et la poussons jusqu'à la rampe, où le treuil prend le relais ; l'intervention est plus longue mais reste gratuite pour un véhicule complet." },
      { question: "Je suis syndic, puis-je faire enlever un véhicule abandonné dans le parking ?", answer: "Pas sans procédure : le véhicule reste la propriété de son titulaire. Mise en demeure avec accusé de réception de retirer le véhicule sous huit jours, puis demande de mise en fourrière si elle reste sans effet ; nous intervenons une fois le droit de disposer du véhicule établi." },
      { question: "Faut-il être présent pendant l'enlèvement ?", answer: "Vous, ou une personne munie d'une procuration et des documents ; le gardien peut ouvrir l'accès, mais la signature de la déclaration de cession reste celle du titulaire ou de son mandataire." },
      { question: "L'enlèvement en sous-sol coûte-t-il plus cher ?", answer: "Non : la remise d'un véhicule complet à un centre VHU agréé est gratuite, sous-sol compris. Seul un véhicule incomplet ou une situation exceptionnelle est étudié au cas par cas, et nous le disons avant de venir." },
      { question: "Combien de temps dure l'intervention ?", answer: "De trente minutes à une heure dans la plupart des parkings d'Île-de-France ; davantage si la voiture est sans roues ou si la rampe doit être neutralisée par étapes." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-13e' },
      { deptSlug: 'val-de-marne-94', slug: 'creteil' },
      { deptSlug: 'val-d-oise-95', slug: 'cergy' },
    ],
    sources: ['SP_VHU', 'CR_R325_47', 'SP_HERITAGE'],
  },
  {
    slug: 'voiture-brulee',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Enlèvement d'une voiture brûlée en Île-de-France",
    metaTitle: 'Voiture brûlée : enlèvement en IDF',
    description: "Voiture incendiée dans la rue, sur un parking ou en sous-sol en Île-de-France : assurance, identification, procédure et enlèvement par un centre VHU agréé.",
    label: 'Voiture brûlée',
    intro: [
      "Une voiture brûlée n'est plus une voiture : c'est un déchet dangereux, qui coule sur la chaussée, sent pendant des semaines et attire d'autres dépôts. En Île-de-France, nous en enlevons chaque semaine, dans des rues de Seine-Saint-Denis, sur des parkings de résidence du Val-d'Oise, dans des sous-sols de copropriété où un incendie de deux-roues a gagné les places voisines. La procédure dépend d'une seule question : le véhicule est-il encore identifiable ?",
      "Cette page décrit ce que doit faire le propriétaire d'une voiture incendiée, ce que peut faire un syndic, un bailleur ou une commune face à une carcasse qui n'appartient à personne de connu, et comment nous intervenons — avec, presque toujours, un enlèvement gratuit et un certificat de destruction.",
    ],
    sections: [
      {
        title: 'Si c\'est votre voiture : assureur d\'abord, épaviste ensuite',
        paragraphs: [
          "Déclarez l'incendie à votre assureur dans les délais de votre contrat, et déposez plainte si l'incendie est volontaire : ces deux démarches précèdent tout le reste, parce que l'assureur peut vouloir faire expertiser le véhicule avant qu'il ne bouge. Une fois l'expert passé — ou l'assureur ayant confirmé qu'il n'en mandate pas —, le véhicule peut être enlevé.",
          "Une voiture brûlée est, dans l'immense majorité des cas, un véhicule économiquement irréparable : les réparations dépasseraient sa valeur. Si votre contrat couvre l'incendie, l'assureur vous proposera une indemnisation contre cession du véhicule ; s'il ne le couvre pas, ou si vous refusez l'offre, le véhicule reste à votre charge et doit être remis à un centre VHU agréé. C'est là que nous intervenons : nous l'enlevons, vous remettons le certificat de destruction et déclarons la cession, et ce certificat clôt votre dossier auprès de l'assureur et met fin au contrat.",
        ],
      },
      {
        title: 'Le véhicule est-il identifiable ?',
        paragraphs: [
          "Tout repose sur l'identification. Les plaques ont souvent fondu, mais le numéro de série frappé sur le châssis résiste généralement à l'incendie ; nous le relevons et le rapprochons de votre carte grise ou de votre déclaration de perte. Si la carte grise a brûlé avec la voiture, une déclaration de perte du certificat d'immatriculation la remplace, avec un certificat de situation administrative de moins de quinze jours obtenu en ligne à partir de l'immatriculation.",
          "Un véhicule identifiable et dont le titulaire est connu suit la cession pour destruction ordinaire. Un véhicule dont le titulaire ne peut pas être établi — plaques absentes, numéro de série détruit, propriétaire introuvable — ne peut pas être cédé volontairement : il relève de la procédure d'abandon, menée par le propriétaire du lieu ou par la commune, que nous décrivons plus bas.",
        ],
      },
      {
        title: 'Syndic, bailleur, commune : la carcasse qui n\'est à personne',
        paragraphs: [
          "Dans un parking privé, un véhicule laissé sans droit peut faire l'objet d'une mise en demeure au titulaire, adressée avec accusé de réception, de le retirer sous huit jours ; restée sans effet, elle ouvre la voie à une demande de mise en fourrière auprès de l'officier de police judiciaire. Lorsque le titulaire est inconnu, c'est l'officier de police judiciaire qui le recherche à partir des éléments d'identification relevés sur la carcasse.",
          "Sur la voie publique, la commune ou la police constate le stationnement abusif ou l'épave manifeste et engage l'enlèvement. Dans les deux cas, nous intervenons une fois le droit de faire enlever le véhicule établi, en tournée pour les bailleurs qui en ont plusieurs, avec un état par véhicule — photos, numéro de série relevé, certificat de destruction — pour le dossier.",
        ],
      },
      {
        title: 'Comment nous enlevons une voiture brûlée',
        paragraphs: [
          "Une carcasse incendiée ne roule pas, ne se dirige pas et perd des fluides : nous la treuillons sur le plateau bas, en la sanglant, après avoir protégé le sol si elle fuit encore. Dans un sous-sol, la manœuvre se fait sur chariots jusqu'à la rampe ; sur un parking, nous prenons soin de ne pas rayer les véhicules voisins avec des débris. La carcasse part ensuite au centre VHU agréé, où elle est dépolluée puis broyée.",
          "Un véhicule brûlé est-il « complet » au sens de la règle qui rend la remise gratuite ? Le moteur, le catalyseur et la batterie sont en général présents, même endommagés : la gratuité s'applique alors. Si des éléments majeurs ont été retirés avant l'incendie — un moteur déposé, un catalyseur découpé —, nous vous le disons dès la photo, avant de venir.",
        ],
        list: [
          "Déclaration à l'assureur et, si l'incendie est volontaire, dépôt de plainte.",
          "Attendre l'expertise si l'assureur en mandate une.",
          "Carte grise ou déclaration de perte, certificat de situation administrative, pièce d'identité.",
          "Cession pour destruction sur place, certificat de destruction remis, assureur informé.",
        ],
      },
      {
        title: 'Deux-roues brûlé dans un local à vélos, voiture brûlée par contagion',
        paragraphs: [
          "Les incendies de scooters dans les locaux communs sont fréquents dans les copropriétés franciliennes, et ils abîment souvent les voitures garées à proximité. Chaque véhicule touché est traité séparément : le scooter avec sa propre carte grise et sa propre cession, la voiture voisine avec son assureur et, si elle est déclarée irréparable, sa propre destruction. Nous pouvons enlever l'ensemble dans le même passage, avec un certificat de destruction par immatriculation.",
        ],
      },
    ],
    faq: [
      { question: "Ma voiture a brûlé, que faire en premier ?", answer: "Déclarer le sinistre à votre assureur et, si l'incendie est volontaire, déposer plainte ; attendre l'éventuelle expertise avant de faire enlever le véhicule, puis nous appeler pour l'enlèvement et le certificat de destruction." },
      { question: "La carte grise a brûlé avec la voiture, l'enlèvement est-il possible ?", answer: "Oui : une déclaration de perte du certificat d'immatriculation la remplace, avec un certificat de situation administrative de moins de quinze jours obtenu en ligne à partir de l'immatriculation." },
      { question: "Une voiture brûlée est-elle enlevée gratuitement ?", answer: "Oui si elle est complète — moteur, catalyseur et batterie présents, même endommagés. Un véhicule dont des éléments majeurs ont été retirés avant l'incendie est étudié au cas par cas, et nous le disons avant de venir." },
      { question: "Une carcasse brûlée est abandonnée dans le parking de ma copropriété, que peut faire le syndic ?", answer: "Mise en demeure au titulaire de retirer le véhicule sous huit jours, avec accusé de réception, puis demande de mise en fourrière si elle reste sans effet ; si le titulaire est inconnu, l'officier de police judiciaire le recherche à partir du numéro de série." },
      { question: "L'assureur m'a indemnisé, dois-je encore m'occuper de l'épave ?", answer: "Si vous avez accepté l'offre, le véhicule est cédé à l'assureur qui s'en charge. Si vous l'avez refusée ou si le contrat ne couvre pas l'incendie, le véhicule reste à votre charge et doit être remis à un centre VHU agréé." },
      { question: "Le certificat de destruction sert-il pour l'assurance ?", answer: "Oui : c'est le document qui prouve que le véhicule a été détruit, permet de résilier le contrat et met fin à votre responsabilité." },
    ],
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'sevran' },
      { deptSlug: 'val-d-oise-95', slug: 'sarcelles' },
      { deptSlug: 'essonne-91', slug: 'grigny' },
    ],
    sources: ['SP_VHU', 'SP_VE', 'CR_R325_47', 'CR_R417_12'],
  },
  {
    slug: 'vehicule-gage',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Épave gagée ou sous opposition en Île-de-France : peut-on la faire enlever ?",
    metaTitle: 'Épave gagée ou sous opposition en IDF',
    description: "Gage de crédit, opposition du Trésor public, saisie, opposition d'expert : ce qui bloque ou non la destruction d'une épave en Île-de-France.",
    label: 'Véhicule gagé',
    intro: [
      "Vous demandez le certificat de situation administrative de votre vieille voiture et il mentionne un gage, ou pire, une opposition. Est-ce que l'épaviste peut quand même l'enlever ? La réponse tient en une distinction que beaucoup ignorent : un gage et une opposition ne sont pas la même chose, et ils n'ont pas les mêmes effets sur la cession d'un véhicule pour destruction.",
      "En Île-de-France, où les voitures anciennes achetées à crédit et les amendes de stationnement impayées sont légion, ce cas est fréquent. Voici ce que disent les textes, ce que nous pouvons faire, et ce que vous devez régler avant.",
    ],
    sections: [
      {
        title: 'Gage : la cession reste possible',
        paragraphs: [
          "Un gage est une garantie prise sur le véhicule par l'organisme qui a financé son achat : tant que le crédit n'est pas remboursé, le gage subsiste. La démarche officielle est claire sur un point : « la présence d'un gage n'empêche pas la vente du véhicule ». Le certificat de situation administrative le mentionne pour informer l'acquéreur, et c'est l'organisme financier qui lève le gage une fois le crédit intégralement remboursé.",
          "Pour une cession pour destruction, le gage n'est donc pas un obstacle administratif. Mais il reste un engagement contractuel envers votre prêteur : détruire un véhicule qui garantit un crédit en cours sans l'en informer peut vous être reproché. Notre conseil, dans tous les cas : prévenez l'organisme de crédit, réglez le solde si vous le pouvez, et demandez-lui la levée du gage — le certificat de situation administrative en sera plus net, et votre dossier aussi.",
        ],
      },
      {
        title: 'Opposition : le blocage qu\'il faut lever d\'abord',
        paragraphs: [
          "Une opposition au transfert du certificat d'immatriculation est une situation qui bloque tout changement de propriétaire du véhicule. Elle peut être inscrite par le Trésor public pour des amendes impayées, par un commissaire de justice dans le cadre d'une saisie, par un expert automobile lorsque le véhicule a été déclaré économiquement irréparable ou gravement endommagé, ou par les autorités lorsque le véhicule figure au fichier des véhicules volés. La règle : « la vente du véhicule ne peut pas avoir lieu tant qu'il n'est pas mis fin à l'opposition ».",
          "Une cession pour destruction est un changement de titulaire : elle est bloquée de la même façon. Lever l'opposition dépend de son origine — payer les amendes auprès du Trésor public et obtenir la mainlevée, régler la saisie avec le commissaire de justice, ou, pour un véhicule signalé volé, faire mettre à jour le fichier après sa restitution. Nous ne pouvons pas contourner une opposition, et un centre VHU agréé ne le peut pas davantage.",
        ],
      },
      {
        title: 'Le cas particulier de l\'opposition d\'expert (VE / VEI)',
        paragraphs: [
          "Après un accident, l'expert de l'assureur peut déclarer le véhicule économiquement irréparable ou gravement endommagé ; la préfecture inscrit alors une opposition au transfert. Cette opposition-là fait exception : elle « ne fait pas obstacle à la cession en l'état de votre véhicule endommagé à un professionnel de l'automobile ou à votre assureur », et un véhicule économiquement irréparable « ne pourra être cédé qu'à un démolisseur ». Autrement dit, la destruction par un centre VHU agréé est précisément la sortie prévue.",
          "Dans ce cas, nous enlevons le véhicule avec le rapport d'expertise, la carte grise, le certificat de situation administrative qui mentionne l'opposition et votre pièce d'identité ; le certificat de destruction que nous vous remettons clôt le dossier auprès de l'assureur.",
        ],
      },
      {
        title: 'Comment vérifier la situation de votre véhicule',
        paragraphs: [
          "Le certificat de situation administrative s'obtient gratuitement et immédiatement en ligne, à partir de l'immatriculation et des informations du titulaire ; il doit dater de moins de quinze jours au moment de la cession. Il indique l'existence d'un gage, d'une opposition et, le cas échéant, de qui elle émane. C'est la première chose que nous vous demandons, avant de nous déplacer : il évite un rendez-vous inutile et vous dit exactement ce qu'il reste à régler.",
          "Vous ne connaissez pas l'origine d'une opposition ? Le certificat mentionne l'autorité qui l'a inscrite ; pour des amendes, c'est le comptable public dont les coordonnées figurent sur les avis. Une fois la mainlevée obtenue, un nouveau certificat de situation administrative, vierge, permet la cession.",
        ],
        list: [
          "Gage de crédit : cession possible ; informez le prêteur et demandez la levée.",
          "Opposition du Trésor public ou saisie : à lever avant toute cession, destruction comprise.",
          "Opposition d'expert (VE/VEI) : cession en l'état possible à un professionnel ou démolisseur — c'est le cas de la destruction.",
          "Véhicule signalé volé : régularisation du fichier avant toute démarche.",
        ],
      },
      {
        title: 'Ce que nous faisons, et ce que nous ne faisons pas',
        paragraphs: [
          "Nous lisons votre certificat de situation administrative avec vous, nous vous disons si l'enlèvement est possible tout de suite ou après une démarche, et nous vous indiquons laquelle. Nous enlevons gratuitement tout véhicule complet dont la cession est possible, et nous remettons le certificat de destruction. Nous n'enlevons pas un véhicule sous opposition non levée, même pour « rendre service » : ce serait irrégulier pour vous comme pour nous, et le véhicule resterait à votre nom.",
        ],
      },
    ],
    faq: [
      { question: "Ma voiture est gagée, puis-je la faire détruire ?", answer: "Administrativement, oui : la présence d'un gage n'empêche pas la cession. Le gage garantit toutefois un crédit en cours : prévenez l'organisme prêteur, réglez le solde et demandez-lui la levée du gage." },
      { question: "Quelle différence entre un gage et une opposition ?", answer: "Le gage est une garantie prise par l'organisme de crédit, qui n'empêche pas la cession ; l'opposition (Trésor public, commissaire de justice, expert, véhicule volé) bloque tout changement de titulaire tant qu'elle n'est pas levée." },
      { question: "J'ai des amendes impayées, l'enlèvement est-il possible ?", answer: "Pas tant que l'opposition du Trésor public n'est pas levée : réglez les amendes auprès du comptable public, obtenez la mainlevée, puis demandez un nouveau certificat de situation administrative." },
      { question: "L'expert a déclaré ma voiture économiquement irréparable, puis-je la faire enlever ?", answer: "Oui : l'opposition d'expert n'empêche pas la cession en l'état à un professionnel de l'automobile, et un véhicule économiquement irréparable ne peut être cédé qu'à un démolisseur — la destruction par un centre VHU agréé est précisément prévue." },
      { question: "Comment savoir si mon véhicule est gagé ou sous opposition ?", answer: "En demandant le certificat de situation administrative, gratuit et immédiat en ligne ; il doit dater de moins de quinze jours au moment de la cession et précise l'origine d'une éventuelle opposition." },
      { question: "Pouvez-vous enlever le véhicule et régler l'opposition ensuite ?", answer: "Non : une opposition bloque tout changement de titulaire, destruction comprise ; nous intervenons dès que vous nous transmettez un certificat de situation administrative sans opposition." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-18e' },
      { deptSlug: 'seine-saint-denis-93', slug: 'aubervilliers' },
      { deptSlug: 'val-de-marne-94', slug: 'vitry-sur-seine' },
    ],
    sources: ['SP_CSA', 'SP_GAGE', 'SP_VE', 'SP_VHU'],
  },
  {
    slug: 'succession-deces',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Faire enlever la voiture d'un parent décédé en Île-de-France",
    metaTitle: 'Voiture d’un parent décédé : que faire',
    description: "Succession : les documents pour céder à la destruction la voiture d'une personne décédée en Île-de-France, sans la mettre au nom d'un héritier.",
    label: 'Succession, décès',
    intro: [
      "Après un décès, la voiture est rarement la priorité. Elle reste au parking de la résidence, dans le garage du pavillon, devant l'immeuble, parfois des mois — jusqu'à ce que la place doive être libérée, que l'appartement soit vendu ou que l'assurance réclame une décision. En Île-de-France, où la place de stationnement vaut cher et où les copropriétés ne tolèrent pas longtemps un véhicule immobile, la question finit toujours par arriver.",
      "La bonne nouvelle est que la démarche est plus simple qu'on ne le croit : les héritiers peuvent céder le véhicule, y compris pour destruction, sans avoir à le faire immatriculer à leur nom. Cette page détaille les documents, les cas particuliers (plusieurs héritiers, notaire, carte grise introuvable) et la façon dont nous nous organisons avec les familles.",
    ],
    sections: [
      {
        title: 'Pas besoin de mettre la carte grise au nom d\'un héritier',
        paragraphs: [
          "Lorsque les héritiers ne conservent pas le véhicule, la démarche officielle prévoit qu'ils le cèdent directement, sans immatriculation intermédiaire : « le certificat d'immatriculation n'est pas modifié au nom d'un héritier avant la vente ou la cession ». Ils remettent à l'acquéreur — ici, le centre VHU agréé — la déclaration de cession signée en leur nom, avec leurs adresses, la carte grise du défunt barrée avec la mention « Cédé le (jour/mois/année) » et signée par les héritiers, un certificat de situation administrative de moins de quinze jours, et un justificatif de la succession.",
          "Ce justificatif prend l'une de ces formes : une attestation du notaire certifiant l'identité du défunt et la présence du véhicule dans la succession, un acte de notoriété, ou l'acte de décès accompagné d'une attestation signée de tous les héritiers certifiant qu'il n'existe ni testament, ni autre héritier, ni contrat de mariage, ni contestation. Pour une voiture de faible valeur, cette dernière option évite souvent de solliciter le notaire.",
        ],
      },
      {
        title: 'Plusieurs héritiers, un héritier éloigné, un notaire',
        paragraphs: [
          "Lorsqu'il y a plusieurs héritiers, tous signent la déclaration de cession et la carte grise, ou l'un d'eux signe muni d'une procuration des autres. Un héritier qui vit en province ou à l'étranger n'a pas à se déplacer : une procuration signée et la copie de sa pièce d'identité suffisent, et nous pouvons envoyer les documents à signer à l'avance.",
          "Si un notaire règle la succession, nous lui transmettons sur demande le certificat de destruction et la déclaration de cession, qui attestent que le véhicule est sorti de l'actif successoral. Certaines familles préfèrent que nous intervenions le jour du vide-appartement ou du vide-maison : nous fixons alors le créneau en conséquence, et nous nous adaptons aux horaires du gardien pour les parkings de résidence.",
        ],
      },
      {
        title: 'Carte grise introuvable, véhicule gagé, assurance',
        paragraphs: [
          "La carte grise du défunt est souvent introuvable. Elle est alors remplacée par une déclaration de perte du certificat d'immatriculation, établie par un héritier, accompagnée du justificatif de succession ; le certificat de situation administrative, obtenu en ligne à partir de l'immatriculation, complète le dossier. Si ce certificat révèle un gage, la cession reste possible mais l'organisme de crédit doit être informé de la succession ; s'il révèle une opposition — amendes impayées, par exemple —, elle doit être levée avant toute cession, par le règlement auprès de l'autorité qui l'a inscrite.",
          "L'assurance du défunt, elle, doit être informée du décès puis de la destruction : le certificat de destruction que nous remettons permet de résilier le contrat et de récupérer, le cas échéant, le trop-perçu de cotisation. Pensez aussi à retirer la vignette Crit'Air, le badge de télépéage et les effets personnels avant l'enlèvement ; nous vous laissons le temps de le faire sur place.",
        ],
        list: [
          "Déclaration de cession cerfa 15776 au nom des héritiers, avec leurs adresses.",
          "Carte grise barrée « Cédé le … pour destruction » et signée par les héritiers, ou déclaration de perte.",
          "Certificat de situation administrative de moins de quinze jours.",
          "Attestation du notaire, acte de notoriété, ou acte de décès + attestation de tous les héritiers.",
          "Pièce d'identité de l'héritier signataire, procurations des autres.",
        ],
      },
      {
        title: 'Détruire ou vendre : la question à se poser avant',
        paragraphs: [
          "Une voiture de parent est souvent peu kilométrée et entretenue : avant de la faire détruire, demandez-vous si elle a une valeur. Si elle roule et est complète, elle peut être rachetée plutôt que détruite, avec le même dossier de succession et un paiement versé sur le compte indiqué par les héritiers — nous traitons ce cas sur notre page consacrée au rachat dans le cadre d'une succession. Si elle est en panne depuis longtemps, incomplète ou corrodée, la cession pour destruction est la voie normale, gratuite pour un véhicule complet.",
          "Nous vous donnons cette réponse sur photos, avant de venir, sans vous pousser dans un sens ou dans l'autre : une famille en deuil n'a pas besoin d'un vendeur, elle a besoin d'une réponse claire.",
        ],
      },
      {
        title: 'Le jour de l\'enlèvement',
        paragraphs: [
          "Nous venons au créneau convenu, au parking de la résidence avec le gardien, devant le pavillon ou dans la rue. Nous vérifions les documents, remplissons la déclaration de cession avec l'héritier présent, chargeons le véhicule — au treuil s'il ne roule plus, sur chariots s'il est bloqué en sous-sol — et remettons le certificat de destruction. La déclaration de cession est ensuite enregistrée en ligne par nos soins ; vous en conservez votre exemplaire pour le notaire et l'assureur.",
        ],
      },
    ],
    faq: [
      { question: "Faut-il refaire la carte grise au nom d'un héritier avant de faire détruire la voiture ?", answer: "Non : lorsque les héritiers ne conservent pas le véhicule, ils le cèdent directement, sans immatriculation intermédiaire, avec un justificatif de succession et la déclaration de cession signée en leur nom." },
      { question: "Quel justificatif de succession est accepté ?", answer: "Une attestation du notaire mentionnant le véhicule, un acte de notoriété, ou l'acte de décès accompagné d'une attestation signée de tous les héritiers certifiant l'absence de testament, d'autre héritier, de contrat de mariage et de contestation." },
      { question: "Nous sommes trois héritiers, faut-il être tous présents ?", answer: "Non : un héritier peut signer pour les autres avec leurs procurations et la copie de leurs pièces d'identité ; nous envoyons les documents à signer à l'avance." },
      { question: "La carte grise de notre mère est introuvable, que faire ?", answer: "Une déclaration de perte du certificat d'immatriculation, établie par un héritier, la remplace ; le certificat de situation administrative s'obtient en ligne à partir de l'immatriculation." },
      { question: "L'enlèvement est-il gratuit dans le cadre d'une succession ?", answer: "Oui pour un véhicule complet (moteur, catalyseur, batterie), comme pour toute cession à un centre VHU agréé ; si la voiture roule et a une valeur, un rachat est possible avec le même dossier." },
      { question: "Le notaire a-t-il besoin d'un document ?", answer: "Nous lui transmettons sur demande le certificat de destruction et la déclaration de cession, qui attestent que le véhicule est sorti de la succession." },
    ],
    towns: [
      { deptSlug: 'yvelines-78', slug: 'le-chesnay-rocquencourt' },
      { deptSlug: 'val-d-oise-95', slug: 'eaubonne' },
      { deptSlug: 'hauts-de-seine-92', slug: 'boulogne-billancourt' },
    ],
    sources: ['SP_HERITAGE', 'SP_VHU', 'SP_CSA', 'SP_GAGE'],
  },
  {
    slug: 'voiture-abandonnee-voie-publique',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Voiture abandonnée sur la voie publique en Île-de-France : procédure et enlèvement",
    metaTitle: 'Voiture abandonnée dans la rue en IDF',
    description: "Véhicule ventouse devant chez vous, épave sur un parking privé ou un chemin : qui peut agir en Île-de-France, la règle des 7 jours, la mise en demeure.",
    label: 'Voiture abandonnée',
    intro: [
      "Une voiture qui n'a pas bougé depuis des mois devant votre immeuble, les pneus à plat et le pare-brise couvert d'avis de contravention ; une carcasse sur le parking de la résidence ; un fourgon désossé au bout d'un chemin en lisière de forêt. Chaque commune d'Île-de-France a ses véhicules ventouses, et chaque voisin excédé se pose la même question : qui peut la faire enlever, et comment ?",
      "La réponse dépend d'abord du lieu — voie publique, parking privé, terrain — et ensuite de l'identité du propriétaire. Dans tous les cas, un particulier ne peut pas faire enlever la voiture d'un tiers de sa propre initiative, et nous n'intervenons qu'une fois le droit de disposer du véhicule établi. Voici qui fait quoi.",
    ],
    sections: [
      {
        title: 'Sur la voie publique : la règle des sept jours',
        paragraphs: [
          "Le code de la route considère comme abusif le stationnement ininterrompu d'un véhicule au même point de la voie publique pendant plus de sept jours consécutifs — ou moins, si un arrêté municipal fixe une durée inférieure. C'est une contravention, et lorsque le conducteur ou le titulaire est absent ou refuse de faire cesser le stationnement abusif, l'immobilisation et la mise en fourrière du véhicule peuvent être prescrites.",
          "Concrètement, vous signalez le véhicule à la police municipale ou au commissariat — immatriculation, emplacement, date depuis laquelle il n'a pas bougé ; beaucoup de communes franciliennes proposent un signalement en ligne. Les agents constatent, apposent un avis, puis font enlever le véhicule par la fourrière si le titulaire ne réagit pas. Une fois en fourrière, le titulaire est notifié par lettre dans les cinq jours ouvrables ; s'il ne récupère pas le véhicule, celui-ci est réputé abandonné au bout de quinze jours s'il est destiné à la vente par les Domaines, ou de dix jours s'il est destiné à la destruction, et remis à un centre VHU.",
        ],
      },
      {
        title: 'Sur un parking privé ou un terrain : la mise en demeure',
        paragraphs: [
          "Un véhicule laissé sans droit dans un lieu non ouvert à la circulation publique — parking de copropriété, parking de bailleur, cour, terrain — ne relève pas de la police de la circulation : la commune n'interviendra pas d'office. C'est le propriétaire ou le gestionnaire du lieu qui agit. S'il connaît l'identité et l'adresse du titulaire, il doit justifier lui avoir adressé une mise en demeure, envoyée avec accusé de réception, de retirer le véhicule dans un délai de huit jours à compter de sa réception ; restée sans effet, elle permet de demander la mise en fourrière à l'officier de police judiciaire, qui recherche le titulaire lorsqu'il est inconnu.",
          "Les bailleurs sociaux d'Île-de-France mènent ces procédures par dizaines de véhicules avant leurs chantiers de rénovation urbaine ; les syndics les mènent une place à la fois. Dans les deux cas, nous intervenons en tournée une fois le droit d'enlever établi, et remettons un certificat de destruction par immatriculation.",
        ],
      },
      {
        title: 'L\'épave manifeste : carcasse brûlée, désossée, sans plaques',
        paragraphs: [
          "Lorsqu'un véhicule est visiblement hors d'usage — brûlé, sans roues, sans plaques —, il constitue un déchet abandonné, et la commune peut engager la procédure prévue à ce titre après avoir tenté d'identifier le titulaire à partir du numéro de série. C'est dans ce cadre que les communes, mais aussi l'Office national des forêts pour les forêts de Sénart, de Rambouillet ou de Montmorency, nous mandatent pour évacuer des carcasses au treuil long depuis le chemin carrossable le plus proche.",
        ],
      },
      {
        title: 'Si la voiture ventouse est la vôtre',
        paragraphs: [
          "C'est le cas le plus fréquent, et le plus simple : vous avez une voiture en panne devant chez vous, vous avez repoussé le moment de vous en occuper, et les avis s'accumulent. Passé sept jours, elle est en stationnement abusif ; enlevée par la fourrière, elle vous coûtera les frais d'enlèvement et de garde, dus même si vous ne la récupérez jamais. Un appel suffit à éviter cela : nous l'enlevons gratuitement si elle est complète, avec la carte grise barrée « Cédé le … pour destruction », un certificat de situation administrative de moins de quinze jours et votre pièce d'identité, et nous vous remettons le certificat de destruction.",
          "Si elle roule encore et est complète, elle peut être rachetée plutôt que détruite ; nous vous le disons sur photos, avant de venir.",
        ],
        list: [
          "Voie publique : signalement à la police municipale ou au commissariat, stationnement abusif au-delà de sept jours, mise en fourrière.",
          "Parking privé, terrain : mise en demeure avec accusé de réception (huit jours), puis demande de mise en fourrière.",
          "Épave manifeste : procédure de déchet abandonné menée par la commune ou le propriétaire du terrain.",
          "Votre propre voiture : cession pour destruction, gratuite si le véhicule est complet.",
        ],
      },
      {
        title: 'Ce qu\'il ne faut jamais faire',
        paragraphs: [
          "Déplacer, ouvrir ou dépouiller le véhicule d'un tiers, même pour libérer une place. Confier une épave à un particulier ou à une casse non agréée : seul un centre VHU agréé délivre le certificat de destruction, et sans lui le véhicule reste à votre nom, avec ses amendes futures. Et laisser sa propre voiture en panne dans la rue au-delà d'une semaine : la fourrière coûte toujours plus cher qu'un appel à un épaviste.",
        ],
      },
    ],
    faq: [
      { question: "Au bout de combien de temps une voiture est-elle considérée comme abandonnée dans la rue ?", answer: "Le stationnement au même point de la voie publique pendant plus de sept jours consécutifs est abusif et permet la mise en fourrière ; une fois en fourrière, le véhicule est réputé abandonné dix jours (destruction) ou quinze jours (vente) après la notification au titulaire." },
      { question: "Puis-je faire enlever moi-même la voiture abandonnée devant chez moi ?", answer: "Non : elle appartient à son titulaire. Signalez-la à la police municipale ou au commissariat, qui constate le stationnement abusif et fait procéder à la mise en fourrière." },
      { question: "Un véhicule est abandonné dans le parking de ma copropriété, que peut faire le syndic ?", answer: "Adresser au titulaire une mise en demeure de retirer le véhicule sous huit jours, avec accusé de réception, puis demander la mise en fourrière à l'officier de police judiciaire si elle reste sans effet ; nous intervenons ensuite." },
      { question: "Le propriétaire de la voiture est inconnu, que se passe-t-il ?", answer: "L'officier de police judiciaire le recherche à partir de l'immatriculation ou du numéro de série ; pour une épave manifeste, la commune ou le propriétaire du terrain engage la procédure de déchet abandonné." },
      { question: "Ma propre voiture est en panne dans la rue depuis deux semaines, que faire ?", answer: "L'enlever avant la fourrière : nous venons gratuitement si elle est complète, avec la carte grise, un certificat de situation administrative récent et votre pièce d'identité, et nous remettons le certificat de destruction." },
      { question: "Les frais de fourrière sont-ils dus si je ne récupère pas la voiture ?", answer: "Oui : les frais d'enlèvement et de garde restent à la charge du titulaire, même lorsque le véhicule est vendu par les Domaines ou remis à un centre VHU." },
    ],
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'st-denis' },
      { deptSlug: 'essonne-91', slug: 'evry-courcouronnes' },
      { deptSlug: 'seine-et-marne-77', slug: 'meaux' },
    ],
    sources: ['CR_R417_12', 'CR_R325_47', 'SP_FOURRIERE', 'SP_VHU'],
  },
  {
    slug: 'fourriere',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Voiture en fourrière en Île-de-France : la récupérer ou la faire détruire",
    metaTitle: 'Voiture en fourrière en IDF : que faire',
    description: "Délais, frais et documents pour récupérer un véhicule en fourrière en Île-de-France, ou le céder à la destruction depuis la fourrière s'il ne vaut plus.",
    label: 'Fourrière',
    intro: [
      "Chaque jour, des centaines de véhicules sont enlevés dans les rues de Paris et de sa banlieue : stationnement gênant, abusif, arrêté de travaux ignoré, voiture en panne laissée trop longtemps. Pour une voiture récente, la question ne se pose pas : on va la chercher. Pour une voiture ancienne, en panne ou sans contrôle technique, les frais de garde qui s'accumulent chaque jour posent vite une autre question — est-ce qu'elle vaut encore ce qu'elle coûte ?",
      "Cette page résume ce que prévoit la réglementation nationale sur la mise en fourrière — délais, documents, frais — et explique comment un véhicule peut être cédé à la destruction directement depuis la fourrière, avec notre mandat, quand le récupérer n'a plus de sens.",
    ],
    sections: [
      {
        title: 'Retrouver le véhicule et comprendre les délais',
        paragraphs: [
          "Avant de déclarer un vol, vérifiez la fourrière : un téléservice national permet de savoir si un véhicule a été mis en fourrière et de consulter la fiche d'enlèvement (motif, date et heure). À Paris, la Ville dispose en outre de son propre portail et d'un numéro d'information. Le titulaire est ensuite informé par lettre, envoyée dans les cinq jours ouvrables suivant la mise en fourrière.",
          "Les délais courent à partir de cette notification. Un véhicule que son titulaire ne réclame pas est réputé abandonné au bout de quinze jours s'il est destiné à être vendu par le service des Domaines, ou de dix jours s'il est destiné à la destruction — sept jours s'il a servi à un rodéo urbain. Il est alors remis aux Domaines pour être vendu, ou à un centre VHU pour être détruit. Les frais de fourrière restent dus par le titulaire, même dans ce cas.",
        ],
      },
      {
        title: 'Récupérer le véhicule : documents et frais',
        paragraphs: [
          "Pour ressortir un véhicule, il faut présenter une attestation d'assurance en cours de validité, un permis de conduire valide, le titre de circulation (certificat d'immatriculation ou document équivalent) et l'autorisation de sortie — la mainlevée — délivrée par l'autorité qui a prescrit la mise en fourrière, en général le commissariat ou la police municipale du lieu de l'enlèvement. Si une interdiction de circuler a été prononcée, le véhicule ne repart pas par la route : une expertise doit être organisée en dehors de la fourrière, et le véhicule remorqué.",
          "Les frais comprennent l'enlèvement et la garde journalière, fixés par arrêté, plus l'amende liée à l'infraction. En quelques semaines, pour une voiture ancienne, la garde dépasse la valeur du véhicule : c'est le moment de décider.",
        ],
        list: [
          "Attestation d'assurance en cours de validité.",
          "Permis de conduire valide de la personne qui repart au volant.",
          "Titre de circulation (certificat d'immatriculation ou équivalent).",
          "Mainlevée délivrée par l'autorité qui a prescrit la mise en fourrière.",
        ],
      },
      {
        title: 'Céder le véhicule à la destruction depuis la fourrière',
        paragraphs: [
          "Vous pouvez décider de ne pas récupérer le véhicule et de le céder pour destruction à un centre VHU agréé, qui vient le chercher à la fourrière avec votre mandat. Vous réglez les frais dus jusqu'au jour de la sortie, vous nous remettez la carte grise barrée « Cédé le … pour destruction » (ou une déclaration de perte), un certificat de situation administrative de moins de quinze jours et une procuration, et nous nous chargeons de l'enlèvement, de la déclaration de cession et du certificat de destruction.",
          "L'intérêt par rapport à « laisser faire » est double : les frais cessent de courir le jour de la sortie au lieu de s'accumuler jusqu'à l'abandon, et vous obtenez le certificat de destruction, qui met fin à l'assurance et à votre responsabilité — ce qu'une destruction décidée par la fourrière ne vous garantit pas.",
        ],
      },
      {
        title: 'Les cas particuliers d\'Île-de-France',
        paragraphs: [
          "À Paris, le véhicule passe d'abord par une préfourrière, où il reste quelques jours avant transfert vers une fourrière de longue durée plus éloignée : plus vous réagissez vite, plus la sortie est simple. En petite et grande couronne, chaque commune ou intercommunalité a sa fourrière, municipale ou agréée, et c'est le commissariat ou la police municipale du lieu de l'enlèvement qui délivre la mainlevée.",
          "Autre cas fréquent : la voiture enlevée pendant un arrêté temporaire (déménagement, travaux, tournage, événement) que vous n'aviez pas vu. L'enlèvement est régulier, les frais sont dus ; si la voiture est ancienne, la cession depuis la fourrière évite une seconde peine.",
        ],
      },
      {
        title: 'Éviter la fourrière la prochaine fois',
        paragraphs: [
          "Une voiture en panne laissée sur la voie publique est en stationnement abusif au-delà de sept jours consécutifs au même point, même correctement garée. Une voiture qui ne servira plus n'a rien à faire dans la rue : sa cession pour destruction est gratuite si elle est complète, et le certificat de destruction vous libère de l'assurance et des amendes futures.",
        ],
      },
    ],
    faq: [
      { question: "Comment savoir si ma voiture est en fourrière ?", answer: "Par le téléservice national d'interrogation des fourrières (immatriculation et informations du titulaire), qui indique la fourrière et la fiche d'enlèvement ; à Paris, la Ville propose aussi son propre portail." },
      { question: "Au bout de combien de temps la fourrière détruit-elle une voiture ?", answer: "Le véhicule est réputé abandonné dix jours après la notification s'il est destiné à la destruction (quinze jours s'il est destiné à la vente par les Domaines), puis remis à un centre VHU ; les frais restent dus." },
      { question: "Quels documents pour récupérer ma voiture ?", answer: "Attestation d'assurance, permis de conduire valide, titre de circulation et mainlevée délivrée par l'autorité qui a prescrit la mise en fourrière." },
      { question: "Ma voiture ne vaut pas les frais, puis-je la laisser à la fourrière ?", answer: "Vous pouvez, mais les frais restent dus et vous n'obtenez pas forcément le certificat de destruction ; la céder à un centre VHU agréé depuis la fourrière arrête les frais le jour de la sortie et vous remet ce certificat." },
      { question: "Que faut-il pour que vous alliez la chercher en fourrière ?", answer: "Une procuration, la carte grise barrée pour destruction (ou une déclaration de perte), un certificat de situation administrative de moins de quinze jours et le règlement des frais dus jusqu'au jour de la sortie." },
      { question: "Le certificat de destruction arrête-t-il l'assurance ?", answer: "Oui : il permet de résilier le contrat et prouve que le véhicule ne circulera plus sous son identité." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-19e' },
      { deptSlug: 'hauts-de-seine-92', slug: 'nanterre' },
      { deptSlug: 'val-de-marne-94', slug: 'creteil' },
    ],
    sources: ['SP_FOURRIERE', 'SP_VHU', 'CR_R417_12'],
  },
  {
    slug: 'utilitaire-camionnette',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Enlèvement d'utilitaire ou de camionnette hors d'usage en Île-de-France",
    metaTitle: 'Utilitaire hors d’usage : enlèvement IDF',
    description: "Fourgon, camionnette ou fourgonnette d'artisan ou de flotte jusqu'à 3,5 t : enlèvement gratuit en Île-de-France, documents pour une société.",
    label: 'Utilitaire, camionnette',
    intro: [
      "L'Île-de-France roule en utilitaire : artisans du bâtiment, livreurs, sociétés de logistique de Roissy, de Gennevilliers ou de Sénart, commerçants des marchés, auto-entrepreneurs. Quand la camionnette rend l'âme — moteur cassé, châssis rongé, contrôle technique refusé pour la troisième fois —, elle occupe une place sur un site où la place manque, et son propriétaire n'a ni le temps ni l'envie de s'en occuper.",
      "Nous enlevons gratuitement les utilitaires hors d'usage jusqu'à 3,5 tonnes dans toute l'Île-de-France, sur mandat du propriétaire ou de la société, avec les mêmes garanties que pour une voiture : certificat de destruction et déclaration de cession. Cette page précise ce qui change pour un professionnel, et ce qui ne change pas.",
    ],
    sections: [
      {
        title: 'Ce qui ne change pas : la règle VHU',
        paragraphs: [
          "Une camionnette hors d'usage est un véhicule hors d'usage comme un autre : elle doit être remise à un centre VHU agréé, seul habilité à la détruire et à délivrer le certificat de destruction, et sa remise est gratuite si le véhicule est complet — moteur, catalyseur et batterie présents. La carte grise est barrée avec la mention « Cédé le … pour destruction », un certificat de situation administrative de moins de quinze jours est fourni, et la déclaration de cession est établie sur le cerfa 15776.",
          "La limite qui compte est celle de notre plateau : 3,5 tonnes de poids total. Un fourgon, une fourgonnette, un pick-up, un châssis-cabine léger sont enlevés ; un poids lourd ne l'est pas, et nous vous orientons alors vers un confrère spécialisé plutôt que de vous faire attendre.",
        ],
      },
      {
        title: 'Ce qui change pour une société',
        paragraphs: [
          "Lorsque le titulaire de la carte grise est une personne morale, la cession est signée par son représentant légal ou par une personne munie d'un pouvoir : nous demandons un extrait Kbis récent et la pièce d'identité du signataire, ou le pouvoir qui l'habilite. Pour un artisan inscrit au répertoire des métiers ou un auto-entrepreneur, l'extrait d'immatriculation ou le justificatif SIRENE remplit le même rôle.",
          "Une flotte se traite par lots : liste des immatriculations, état de chaque véhicule, tournées programmées hors des heures de quai pour les sites logistiques, et un certificat de destruction par immatriculation, que le gestionnaire de parc joint à ses sorties d'actif. Les véhicules qui ont encore une valeur — un fourgon roulant, un pick-up récent — sont rachetés plutôt que détruits, et nous le disons véhicule par véhicule.",
        ],
        list: [
          "Extrait Kbis (ou répertoire des métiers, SIRENE) et pièce d'identité du signataire, ou pouvoir.",
          "Carte grise barrée « Cédé le … pour destruction », certificat de situation administrative de moins de quinze jours.",
          "Pour un lot : liste des immatriculations et état de chaque véhicule.",
          "Créneau hors des heures de chargement pour les sites logistiques ; autorisation d'accès si nécessaire.",
        ],
      },
      {
        title: 'Aménagements, équipements, marchandises',
        paragraphs: [
          "Videz le véhicule avant notre passage : outillage, marchandises, documents. Les aménagements fixes — rayonnages, plancher bois, cellule frigorifique, hayon — peuvent rester, ils partent avec le véhicule ; s'ils ont une valeur et que vous souhaitez les récupérer, déposez-les avant. Un groupe froid ou une caisse isotherme n'empêche pas l'enlèvement, mais nous le signaler à l'avance nous évite un plateau inadapté.",
          "Le marquage publicitaire n'a pas à être retiré ; les plaques professionnelles, le badge de télépéage et la vignette Crit'Air, si.",
        ],
      },
      {
        title: 'Où nous enlevons les utilitaires en Île-de-France',
        paragraphs: [
          "Sur le site de l'entreprise, dans les zones d'activité et plateformes logistiques du nord (Roissy, Gonesse, Mitry-Compans, Gennevilliers), du sud (Rungis, Wissous, Sénart, Évry) et de l'ouest (Poissy, Saint-Ouen-l'Aumône, Trappes), devant l'atelier d'un artisan, sur un parking de résidence où un fourgon de livraison finit sa vie, ou chez un particulier qui a hérité de la camionnette d'un parent. Le déroulement est le même : photos et documents par WhatsApp, créneau convenu, vérification, chargement au treuil si le véhicule ne roule plus, certificat de destruction remis sur place.",
        ],
      },
      {
        title: 'Utilitaire en fin de vie ou utilitaire à vendre ?',
        paragraphs: [
          "Un utilitaire qui roule encore, même à fort kilométrage, garde souvent une valeur à l'export ou pour ses pièces : avant de le faire détruire, demandez-nous une estimation sur photos et carte grise. Nous vous répondons dans la journée, sans engagement, et nous ne poussons jamais vers la destruction un véhicule qui peut être racheté.",
        ],
      },
    ],
    faq: [
      { question: "Jusqu'à quel poids enlevez-vous un utilitaire ?", answer: "Jusqu'à 3,5 tonnes de poids total : fourgons, fourgonnettes, pick-up, châssis-cabine légers. Au-delà, nous vous orientons vers un confrère spécialisé dans les poids lourds." },
      { question: "Quels documents pour un utilitaire au nom d'une société ?", answer: "Extrait Kbis récent et pièce d'identité du signataire (ou pouvoir), carte grise barrée pour destruction, certificat de situation administrative de moins de quinze jours ; la déclaration de cession est signée par le représentant ou son mandataire." },
      { question: "L'enlèvement d'une camionnette est-il gratuit ?", answer: "Oui si le véhicule est complet — moteur, catalyseur et batterie présents — comme pour tout véhicule remis à un centre VHU agréé." },
      { question: "Pouvez-vous enlever plusieurs véhicules d'une flotte en une fois ?", answer: "Oui, en une ou plusieurs tournées hors des heures de quai, avec un certificat de destruction par immatriculation ; les véhicules qui ont encore une valeur sont rachetés." },
      { question: "Faut-il retirer les rayonnages ou le hayon ?", answer: "Non, les aménagements fixes partent avec le véhicule ; déposez-les seulement si vous voulez les récupérer, et signalez-nous un groupe froid ou une caisse isotherme à l'avance." },
      { question: "L'utilitaire a 300 000 km mais roule, faut-il le détruire ?", answer: "Pas forcément : un utilitaire roulant et complet se vend souvent à l'export ou pour ses pièces. Envoyez photos et carte grise, nous vous disons dans la journée s'il relève d'un rachat ou d'un enlèvement gratuit." },
    ],
    towns: [
      { deptSlug: 'val-d-oise-95', slug: 'st-ouen-l-aumone' },
      { deptSlug: 'hauts-de-seine-92', slug: 'gennevilliers' },
      { deptSlug: 'essonne-91', slug: 'chilly-mazarin' },
    ],
    sources: ['SP_VHU', 'SP_CSA'],
  },
  {
    slug: 'moto-scooter',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Enlèvement de moto ou scooter hors d'usage en Île-de-France",
    metaTitle: 'Moto ou scooter hors d’usage en IDF',
    description: "Scooter abandonné dans un local à vélos, moto accidentée, deux-roues sans carte grise : l'enlèvement des deux-roues en Île-de-France, avec certificat.",
    label: 'Moto, scooter',
    intro: [
      "Le deux-roues hors d'usage est le déchet le plus discret de l'Île-de-France : un scooter sous une bâche dans le local à vélos, une moto accidentée dans une cave, un 50 cm³ dont personne ne se souvient au fond d'un parking. Il ne gêne pas assez pour qu'on s'en occupe, jusqu'au jour où le syndic réclame la place, où le local doit être vidé, ou où un incendie de batterie rappelle que ce n'est pas un objet inerte.",
      "Nous enlevons les motos, scooters et cyclomoteurs hors d'usage dans toute l'Île-de-France, seuls ou en même temps qu'une voiture, avec la même démarche administrative : cession pour destruction, certificat de destruction, déclaration en ligne. Voici ce qu'il faut savoir.",
    ],
    sections: [
      {
        title: 'Un deux-roues immatriculé se cède comme une voiture',
        paragraphs: [
          "Tout véhicule immatriculé — voiture, camionnette, moto, scooter, cyclomoteur — se cède pour destruction de la même façon : certificat d'immatriculation barré, daté et signé avec la mention « Cédé le … pour destruction », certificat de situation administrative de moins de quinze jours, déclaration de cession sur le cerfa 15776, et informer ensuite son assureur. Si la carte grise est perdue, une déclaration de perte ou de vol la remplace ; si le titulaire est décédé, les héritiers cèdent le véhicule avec un justificatif de succession.",
          "Un cyclomoteur ancien jamais immatriculé — la situation existe encore pour des engins d'avant l'obligation d'immatriculation — ne peut pas faire l'objet d'une déclaration de cession en ligne ; nous l'enlevons comme déchet, avec une attestation de reprise, mais sans certificat de destruction, faute d'identité administrative.",
        ],
      },
      {
        title: 'Les cas typiques en Île-de-France',
        paragraphs: [
          "Le scooter de résident abandonné dans le local à vélos ou la cave d'une copropriété : le syndic ne peut pas le faire détruire sans procédure, le véhicule appartenant à son titulaire ; il doit d'abord l'identifier, le mettre en demeure de retirer le véhicule, et n'obtenir le droit d'en disposer qu'à l'issue de la procédure applicable aux véhicules laissés sans droit sur un terrain privé. Beaucoup de deux-roues finissent toutefois réclamés par leur propriétaire dès la première lettre, et c'est lui qui nous appelle.",
          "La moto accidentée : après un accident, l'expert de l'assureur peut déclarer le véhicule économiquement irréparable ; l'assureur propose alors une indemnisation, et si vous la refusez ou si le contrat ne couvre pas le sinistre, le véhicule ne peut être cédé qu'à un professionnel — la destruction est la sortie prévue. Le scooter volé et retrouvé brûlé : dépôt de plainte, déclaration à l'assureur, puis enlèvement de la carcasse avec le certificat de situation administrative une fois le fichier des véhicules volés mis à jour.",
          "Le 125 cm³ qui ne démarre plus depuis deux hivers, batterie morte, carburant dégradé : c'est le cas le plus fréquent, et le plus simple — photos, carte grise, enlèvement dans la journée.",
        ],
      },
      {
        title: 'Comment nous enlevons un deux-roues',
        paragraphs: [
          "Un deux-roues se manipule à la main et se charge sur le plateau avec une rampe ; nous le sortons d'une cave, d'un local à vélos ou d'un sous-sol sans avoir besoin d'ascenseur ni de badge de parking, seulement de l'accès au local. Un scooter aux roues bloquées est chargé sur un diable ; une moto lourde est treuillée sur la rampe. Il n'y a pas de manœuvre de plateau dans les rues étroites : le camion reste sur l'axe le plus proche.",
          "Les batteries lithium des scooters électriques demandent une attention particulière : nous vous demandons de nous signaler tout deux-roues électrique à l'avance, surtout s'il a subi un choc ou une immersion, pour transporter la batterie dans des conditions sûres.",
        ],
        list: [
          "Carte grise barrée « Cédé le … pour destruction », ou déclaration de perte.",
          "Certificat de situation administrative de moins de quinze jours (gratuit, en ligne).",
          "Pièce d'identité du titulaire, ou procuration.",
          "Pour un deux-roues électrique : nous prévenir à l'avance (batterie).",
        ],
      },
      {
        title: 'Deux-roues et voiture dans le même passage',
        paragraphs: [
          "Un pavillon de grande couronne a souvent une voiture au jardin et un scooter dans le garage ; une copropriété parisienne, une voiture au niveau -2 et un scooter dans le local à vélos. Nous les enlevons dans le même passage, avec un certificat de destruction par immatriculation et une déclaration de cession par véhicule : prévenez-nous à la prise de rendez-vous pour que le plateau ait la place.",
        ],
      },
      {
        title: 'Détruire ou vendre ?',
        paragraphs: [
          "Un deux-roues complet qui a une valeur — un maxi-scooter récent, une moto recherchée pour ses pièces — peut être racheté plutôt que détruit ; nous vous le disons sur photos et carte grise, dans la journée. Un cyclomoteur de trente ans, incomplet ou corrodé, relève de la destruction ; l'enlèvement d'un deux-roues complet est gratuit, comme pour une voiture.",
        ],
      },
    ],
    faq: [
      { question: "Enlevez-vous les scooters et les motos ?", answer: "Oui, dans toute l'Île-de-France : motos, scooters, cyclomoteurs et deux-roues électriques, seuls ou avec une voiture, avec certificat de destruction et déclaration de cession." },
      { question: "Quels documents pour faire détruire un scooter ?", answer: "Les mêmes que pour une voiture : carte grise barrée « Cédé le … pour destruction » (ou déclaration de perte), certificat de situation administrative de moins de quinze jours, pièce d'identité ; nous remplissons la déclaration de cession sur place." },
      { question: "Le scooter est dans la cave, sans accès pour un camion, est-ce possible ?", answer: "Oui, un deux-roues se sort à la main ou sur un diable et se charge sur le plateau avec une rampe ; nous n'avons besoin que de l'accès au local." },
      { question: "Un scooter abandonné dans le local à vélos de ma copropriété, que peut faire le syndic ?", answer: "Identifier le titulaire et le mettre en demeure de retirer le véhicule, puis suivre la procédure applicable aux véhicules laissés sans droit sur un terrain privé ; nous intervenons une fois le droit d'en disposer établi." },
      { question: "Mon scooter électrique a pris l'eau, pouvez-vous l'enlever ?", answer: "Oui, en nous le signalant à l'avance : la batterie lithium d'un deux-roues immergé ou accidenté est transportée dans des conditions particulières." },
      { question: "L'enlèvement d'un deux-roues est-il gratuit ?", answer: "Oui pour un deux-roues complet ; un modèle récent ou recherché peut même être racheté plutôt que détruit, nous vous le disons sur photos." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-11e' },
      { deptSlug: 'hauts-de-seine-92', slug: 'boulogne-billancourt' },
      { deptSlug: 'seine-saint-denis-93', slug: 'montreuil' },
    ],
    sources: ['SP_VHU', 'SP_NON_ROULANT', 'SP_VE', 'CR_R325_47'],
  },
  {
    slug: 'camping-car',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Enlèvement de camping-car ou de caravane hors d'usage en Île-de-France",
    metaTitle: 'Camping-car hors d’usage : enlèvement',
    description: "Camping-car qui ne roule plus, caravane au fond du jardin, fourgon aménagé : ce que nous enlevons en Île-de-France (jusqu'à 3,5 t) et avec quels documents.",
    label: 'Camping-car, caravane',
    intro: [
      "Le camping-car acheté pour la retraite et qui n'est plus sorti depuis cinq ans, la caravane des vacances d'enfance qui s'enfonce au fond du terrain, le fourgon aménagé à la main dont le contrôle technique est refusé : en grande couronne — Yvelines, Essonne, Seine-et-Marne, Val-d'Oise —, où les parcelles sont grandes, ces véhicules finissent leur vie dans les jardins, sous une bâche, jusqu'à ce que le terrain se vende ou que le voisinage se plaigne.",
      "Nous enlevons les camping-cars, fourgons aménagés et caravanes hors d'usage dans toute l'Île-de-France, dans la limite de 3,5 tonnes pour le porteur, avec le même sérieux administratif que pour une voiture. Cette page précise ce qui relève de la destruction, ce qui peut être racheté, et ce qu'il faut préparer.",
    ],
    sections: [
      {
        title: 'Camping-car, caravane : deux véhicules, deux cartes grises',
        paragraphs: [
          "Un camping-car est un véhicule à moteur immatriculé : il se cède pour destruction comme une voiture, avec la carte grise barrée « Cédé le … pour destruction », un certificat de situation administrative de moins de quinze jours et la déclaration de cession sur le cerfa 15776, puis l'assureur est informé. Une caravane de plus de 500 kg est immatriculée séparément et possède sa propre carte grise : elle fait l'objet de sa propre cession et de son propre certificat de destruction. Une petite caravane non immatriculée est traitée comme un déchet, avec une attestation de reprise.",
          "La limite qui compte est le poids : nous enlevons les porteurs jusqu'à 3,5 tonnes de poids total autorisé — la quasi-totalité des camping-cars de particuliers. Au-delà, ou pour un camping-car intégral très long, nous vous orientons vers un confrère équipé plutôt que d'improviser.",
        ],
      },
      {
        title: 'Sortir un camping-car d\'un jardin',
        paragraphs: [
          "Après des années d'immobilisation, les pneus sont à plat, les freins collés, et le châssis a parfois pris la rouille au niveau des passages de roue : le véhicule ne se déplace plus. Nous le treuillons depuis le portail jusqu'au plateau, sur des plaques si le sol est meuble, après avoir vérifié la largeur du portail et la hauteur des branches — un camping-car mesure jusqu'à 3 mètres de haut. Une photo du portail, de l'accès et de l'emplacement nous permet de venir avec le bon matériel.",
          "Videz le véhicule avant notre passage : bouteilles de gaz, batteries auxiliaires, effets personnels, produits d'entretien des toilettes. Les réservoirs d'eaux usées doivent être vidés ; le réservoir de carburant peut rester en l'état.",
        ],
        list: [
          "Photo du portail (largeur), de l'accès et de l'emplacement.",
          "Bouteilles de gaz et batteries auxiliaires retirées, réservoirs d'eaux vidés.",
          "Carte grise du porteur (et de la caravane si elle est immatriculée), certificat de situation administrative, pièce d'identité.",
          "Déclaration de cession par véhicule, remplie sur place.",
        ],
      },
      {
        title: 'Détruire ou vendre : la cellule fait la différence',
        paragraphs: [
          "Un camping-car ne se juge pas seulement à son porteur. Un moteur cassé sur une cellule saine et étanche intéresse des acheteurs ; à l'inverse, une cellule infiltrée, moisie ou déformée sur un porteur roulant ne vaut souvent que le porteur. Avant de décider la destruction, nous demandons des photos de l'extérieur, de l'intérieur (plafond, angles, plancher) et du compartiment moteur, et nous vous disons dans la journée si le véhicule relève d'un rachat ou d'un enlèvement gratuit.",
          "Un fourgon aménagé à la main dont l'aménagement n'a jamais été homologué reste, administrativement, un fourgon : c'est sa carte grise d'utilitaire qui compte, et il est estimé comme tel.",
        ],
      },
      {
        title: 'Camping-car en stationnement prolongé sur la voie publique',
        paragraphs: [
          "Un camping-car laissé plus de sept jours consécutifs au même point de la voie publique est en stationnement abusif, comme n'importe quel véhicule, et peut être mis en fourrière ; les communes de grande couronne y sont attentives. Si le vôtre ne repartira plus, le céder pour destruction avant l'enlèvement d'office évite des frais de fourrière particulièrement élevés pour un véhicule de ce gabarit.",
        ],
      },
      {
        title: 'Gratuité et cas particuliers',
        paragraphs: [
          "La remise d'un véhicule complet à un centre VHU agréé est gratuite ; un camping-car dont le moteur, le catalyseur et la batterie sont présents en bénéficie. Un porteur dont le moteur a été déposé, une cellule vidée de ses organes ou un accès impossible sans engin de levage sont étudiés au cas par cas, et nous vous le disons avant de venir. Le certificat de destruction est remis dans tous les cas où le véhicule est identifié.",
        ],
      },
    ],
    faq: [
      { question: "Enlevez-vous les camping-cars ?", answer: "Oui, jusqu'à 3,5 tonnes de poids total autorisé pour le porteur, dans toute l'Île-de-France, ainsi que les fourgons aménagés et les caravanes." },
      { question: "Une caravane a-t-elle besoin de sa propre carte grise pour être détruite ?", answer: "Une caravane de plus de 500 kg est immatriculée et fait l'objet de sa propre cession et de son propre certificat de destruction ; une petite caravane non immatriculée est reprise comme déchet, avec une attestation de reprise." },
      { question: "Le camping-car est au fond du jardin, les roues enfoncées, est-ce possible ?", answer: "Oui, nous le treuillons depuis le portail sur des plaques ; envoyez une photo du portail, de l'accès et de l'emplacement, et signalez la hauteur des branches." },
      { question: "Que dois-je retirer avant l'enlèvement ?", answer: "Bouteilles de gaz, batteries auxiliaires, effets personnels et produits d'entretien ; les réservoirs d'eaux usées doivent être vidés." },
      { question: "Mon camping-car a un moteur cassé mais une cellule en bon état, faut-il le détruire ?", answer: "Pas forcément : une cellule saine intéresse des acheteurs. Envoyez des photos de l'extérieur, de l'intérieur et du moteur, nous vous disons dans la journée s'il relève d'un rachat ou d'un enlèvement gratuit." },
      { question: "L'enlèvement d'un camping-car est-il gratuit ?", answer: "Oui pour un véhicule complet — moteur, catalyseur et batterie présents — accessible depuis un portail ; un cas particulier est annoncé avant notre venue." },
    ],
    towns: [
      { deptSlug: 'val-d-oise-95', slug: 'herblay-sur-seine' },
      { deptSlug: 'seine-et-marne-77', slug: 'ozoir-la-ferriere' },
      { deptSlug: 'yvelines-78', slug: 'rambouillet' },
    ],
    sources: ['SP_VHU', 'SP_CARAVANE', 'CR_R417_12', 'SP_CSA'],
  },
  {
    slug: 'vehicule-accidente',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Enlèvement d'un véhicule accidenté en Île-de-France : VE, VEI et destruction",
    metaTitle: 'Véhicule accidenté : enlèvement en IDF',
    description: "Après un accident en Île-de-France : expertise, procédure VE/VEI, offre de l'assureur, opposition sur la carte grise, enlèvement par un centre VHU.",
    label: 'Véhicule accidenté',
    intro: [
      "Un accident sur l'A86, un choc dans un parking de Boulogne, une voiture pliée contre un pilier de sous-sol à Ivry : une fois les constats faits, la voiture reste quelque part — chez un garagiste, dans le parking de la résidence, parfois en fourrière — et son sort dépend de l'expert et de l'assureur. Beaucoup de propriétaires découvrent à cette occasion les sigles VE, VEI, VGE et une « opposition » sur leur carte grise dont ils ignorent la portée.",
      "Cette page explique la procédure telle qu'elle est prévue, ce que vous pouvez faire à chaque étape, et comment nous enlevons un véhicule accidenté en Île-de-France — depuis le garage, le parking ou la fourrière — pour le remettre à un centre VHU agréé.",
    ],
    sections: [
      {
        title: 'L\'expert, puis les trois verdicts',
        paragraphs: [
          "L'expert mandaté par l'assureur examine le véhicule et établit un rapport : il détermine si le véhicule peut circuler en sécurité et s'il est techniquement réparable, et compare le coût des réparations à sa valeur. De là découlent trois situations. Véhicule réparable en sécurité : les réparations sont prises en charge selon votre contrat, et la voiture reprend la route. Véhicule endommagé (VE) jugé dangereux mais réparable : la préfecture inscrit une opposition au transfert de la carte grise ; le véhicule ne peut ni circuler ni être vendu tant qu'il n'a pas été réparé par un professionnel et contrôlé par un second rapport d'expert.",
          "Véhicule économiquement irréparable (VEI) : lorsque le coût des réparations dépasse la valeur du véhicule, l'assureur doit vous proposer son acquisition dans les quinze jours suivant le rapport ; vous disposez de trente jours pour répondre. Si vous refusez, la préfecture inscrit une opposition au transfert, et vous devez soit faire réparer le véhicule et le faire ré-expertiser, soit le faire détruire.",
        ],
      },
      {
        title: 'Ce que l\'opposition autorise encore',
        paragraphs: [
          "L'opposition inscrite après un accident n'est pas une impasse : elle « ne fait pas obstacle à la cession en l'état de votre véhicule endommagé à un professionnel de l'automobile ou à votre assureur ». Un véhicule économiquement irréparable, lui, « ne pourra être cédé qu'à un démolisseur ». Autrement dit, la remise à un centre VHU agréé pour destruction est précisément la sortie que la procédure prévoit — et c'est la seule voie légale : vendre un tel véhicule à un particulier est interdit.",
          "Nous enlevons donc le véhicule avec le rapport d'expertise, la carte grise barrée « Cédé le … pour destruction », le certificat de situation administrative (qui mentionne l'opposition) et votre pièce d'identité ; nous établissons la déclaration de cession et vous remettons le certificat de destruction, que vous transmettez à l'assureur pour clore le dossier.",
        ],
        list: [
          "Rapport d'expertise et courrier de l'assureur, s'ils existent.",
          "Carte grise barrée pour destruction, ou déclaration de perte.",
          "Certificat de situation administrative de moins de quinze jours, même s'il mentionne l'opposition d'expert.",
          "Pièce d'identité du titulaire ; procuration si un tiers nous reçoit.",
        ],
      },
      {
        title: 'Véhicule non expertisé : accident sans tiers, contrat au tiers',
        paragraphs: [
          "Beaucoup d'accidents ne donnent lieu à aucune expertise : contrat au tiers, sinistre sans autre véhicule, franchise supérieure au dommage. Le véhicule est alors libre de toute opposition d'expert, mais la règle de fond s'applique : un véhicule qui n'est plus en état de rouler ne peut pas être vendu à un particulier, seulement à un professionnel de l'automobile — ou remis à un centre VHU agréé s'il n'a plus de valeur. Nous vous disons sur photos s'il relève d'un rachat en l'état ou d'une destruction.",
        ],
      },
      {
        title: 'Où nous allons chercher un véhicule accidenté',
        paragraphs: [
          "Chez le garagiste ou le carrossier qui l'a réceptionné après l'accident : prévenez-le de la cession, réglez ce qui lui est dû, et nous convenons du créneau avec lui ; des frais de gardiennage peuvent courir tant qu'aucune décision n'est prise. Dans le parking de la résidence où le véhicule a été rapatrié : chariots et treuil si les roues ne tournent plus, comme pour toute intervention en sous-sol. En fourrière, si la voiture y a été conduite après l'accident : nous allons la chercher avec votre mandat, après règlement des frais dus.",
          "Un véhicule accidenté ne roule pas et ne se dirige pas toujours : il est treuillé sur le plateau bas, sanglé, les fluides qui fuient encore contenus. Si un airbag s'est déclenché ou si la batterie a été endommagée, signalez-le-nous à l'avance.",
        ],
      },
      {
        title: 'Gratuité et valeur résiduelle',
        paragraphs: [
          "La remise d'un véhicule accidenté complet — moteur, catalyseur, batterie présents, même endommagés — à un centre VHU agréé est gratuite. Mais un véhicule accidenté n'est pas forcément sans valeur : un moteur intact, une boîte, des éléments non touchés par le choc intéressent le réemploi, et un rachat en l'état est possible pour un professionnel. Envoyez des photos du choc et des parties intactes : nous vous disons, avant de venir, si le véhicule vaut une offre ou relève de l'enlèvement gratuit.",
        ],
      },
    ],
    faq: [
      { question: "L'expert a classé ma voiture VEI, que puis-je en faire ?", answer: "Accepter l'offre d'acquisition de l'assureur (vous avez trente jours pour répondre), ou la refuser et conserver le véhicule sous opposition ; il peut alors être réparé puis ré-expertisé, ou cédé en l'état à un professionnel — pour un VEI, à un démolisseur seulement." },
      { question: "L'opposition sur la carte grise empêche-t-elle la destruction ?", answer: "Non : l'opposition inscrite après un accident ne fait pas obstacle à la cession en l'état à un professionnel de l'automobile ou à l'assureur ; la remise à un centre VHU agréé est la sortie prévue." },
      { question: "Puis-je vendre ma voiture accidentée à un particulier ?", answer: "Non : un véhicule qui n'est plus en état de rouler ne peut pas être vendu à un particulier, et un véhicule sous opposition d'expert ne peut être cédé qu'à un professionnel." },
      { question: "La voiture est chez le carrossier depuis l'accident, pouvez-vous la récupérer ?", answer: "Oui, avec votre mandat, après règlement de ce qui lui est dû ; nous convenons du créneau avec lui, et le certificat de destruction vous est remis." },
      { question: "Mon assurance au tiers ne couvre rien, que faire de la voiture ?", answer: "Elle reste à votre charge : si elle a une valeur (moteur, boîte intacts), un rachat en l'état par un professionnel est possible ; sinon, nous l'enlevons gratuitement pour destruction, avec le certificat." },
      { question: "L'enlèvement d'une voiture accidentée est-il gratuit ?", answer: "Oui pour un véhicule complet, même endommagé ; le certificat de destruction que nous remettons clôt le dossier auprès de l'assureur." },
    ],
    towns: [
      { deptSlug: 'hauts-de-seine-92', slug: 'boulogne-billancourt' },
      { deptSlug: 'val-de-marne-94', slug: 'ivry-sur-seine' },
      { deptSlug: 'seine-et-marne-77', slug: 'pontault-combault' },
    ],
    sources: ['SP_VE', 'SP_GAGE', 'SP_NON_ROULANT', 'SP_VHU'],
  },
  {
    slug: 'epave-entreprise-flotte',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "Enlèvement d'épaves pour les entreprises, bailleurs et collectivités en Île-de-France",
    metaTitle: 'Épaves d’entreprise et de flotte en IDF',
    description: "Flottes en fin de vie, véhicules abandonnés dans un parking de bailleur, campagnes communales : enlèvement en tournée en Île-de-France.",
    label: 'Entreprises, flottes',
    intro: [
      "Une flotte se renouvelle par lots, un parking de bailleur se vide avant un chantier de rénovation urbaine, une commune programme une campagne contre les véhicules ventouses : en Île-de-France, une part importante des épaves n'appartient pas à des particuliers mais à des sociétés, des bailleurs sociaux, des syndics, des gestionnaires de sites. Leurs contraintes ne sont pas celles d'un pavillon — mandats, pouvoirs, procédures d'abandon, créneaux hors exploitation, traçabilité pour la comptabilité.",
      "Nous travaillons avec ces structures dans les huit départements : gestionnaires de parc des zones d'activité, bailleurs des grands ensembles, syndics de copropriété, services techniques municipaux. Cette page décrit ce que nous demandons, ce que nous fournissons et comment se déroule une tournée.",
    ],
    sections: [
      {
        title: 'Flotte d\'entreprise : sortir les véhicules de l\'actif',
        paragraphs: [
          "Pour un véhicule dont le titulaire est une personne morale, la cession pour destruction est signée par le représentant légal ou par une personne munie d'un pouvoir : nous demandons un extrait Kbis récent, la pièce d'identité du signataire et, le cas échéant, le pouvoir. Chaque véhicule fait l'objet de sa propre déclaration de cession (cerfa 15776) et de son propre certificat de destruction, que le gestionnaire joint à la sortie d'actif. Le certificat de situation administrative de moins de quinze jours est demandé pour chaque immatriculation, ce qui permet de détecter à l'avance un gage de crédit-bail ou une opposition pour amendes impayées.",
          "Un lot mélange en général des véhicules hors d'usage, enlevés gratuitement s'ils sont complets, et des véhicules qui ont encore une valeur — un fourgon roulant, une berline de fonction à fort kilométrage —, que nous rachetons avec une offre par immatriculation et une facture au nom de la société. Nous le disons véhicule par véhicule, sur photos et liste, avant la tournée.",
        ],
        list: [
          "Extrait Kbis, pièce d'identité du signataire, pouvoir.",
          "Liste des immatriculations, état et emplacement de chaque véhicule.",
          "Carte grise et certificat de situation administrative par véhicule.",
          "Tournées hors des heures de quai ; un certificat de destruction par immatriculation.",
        ],
      },
      {
        title: 'Bailleurs et syndics : les véhicules qui ne sont pas à vous',
        paragraphs: [
          "Le cas le plus fréquent en Île-de-France est le véhicule abandonné dans un parking de bailleur ou de copropriété, dont le gestionnaire n'est pas le titulaire. La procédure est celle des véhicules laissés sans droit dans un lieu non ouvert à la circulation publique : le gestionnaire qui connaît l'identité et l'adresse du titulaire lui adresse une mise en demeure, avec accusé de réception, de retirer le véhicule dans un délai de huit jours ; restée sans effet, elle permet de demander la mise en fourrière à l'officier de police judiciaire, qui recherche le titulaire lorsqu'il est inconnu.",
          "Nous intervenons une fois le droit d'enlever établi, en tournée, avec un état par véhicule — photos, immatriculation ou numéro de série relevé, certificat de destruction — pour le dossier du bailleur ou de la copropriété. Avant une démolition ou une résidentialisation de parking, cette campagne se planifie plusieurs semaines à l'avance, le temps des mises en demeure.",
        ],
      },
      {
        title: 'Communes : campagnes contre les véhicules ventouses et épaves',
        paragraphs: [
          "Sur la voie publique, le stationnement abusif au-delà de sept jours consécutifs permet la mise en fourrière ; un véhicule manifestement hors d'usage relève en outre de la procédure applicable aux déchets abandonnés. Les services techniques et les polices municipales d'Île-de-France nous mandatent pour évacuer, en tournée, les carcasses identifiées à l'issue de ces procédures — sur la voirie, sur des délaissés, sur des chemins ruraux ou en lisière de forêt, au treuil long depuis l'accès carrossable le plus proche.",
        ],
      },
      {
        title: 'Sites logistiques, zones d\'activité, plateformes',
        paragraphs: [
          "Les plateformes de Roissy, de Gennevilliers, de Sénart ou de Saint-Ouen-l'Aumône fonctionnent en continu : nous calons nos passages hors des heures de chargement, avec l'autorisation d'accès du site, et nous respectons les consignes de sécurité du gestionnaire (gilets, zone de manœuvre, pesée). Les utilitaires jusqu'à 3,5 tonnes sont enlevés ; pour un poids lourd, nous vous orientons vers un confrère spécialisé.",
        ],
      },
      {
        title: 'Traçabilité : ce que vous recevez',
        paragraphs: [
          "Pour chaque véhicule : la déclaration de cession, le certificat de destruction délivré au titre de la remise au centre VHU agréé, et, sur demande, un état photographique. Ces pièces attestent que le véhicule est sorti de votre responsabilité — assurance, amendes futures — et de votre actif. Pour un lot, nous remettons un récapitulatif par immatriculation. La remise d'un véhicule complet est gratuite ; les véhicules rachetés font l'objet d'une facture au nom de la société.",
        ],
      },
    ],
    faq: [
      { question: "Quels documents pour faire enlever les véhicules d'une société ?", answer: "Extrait Kbis récent, pièce d'identité du signataire ou pouvoir, carte grise et certificat de situation administrative de moins de quinze jours par véhicule ; une déclaration de cession et un certificat de destruction par immatriculation." },
      { question: "Nous sommes bailleur, pouvons-nous faire enlever les véhicules abandonnés dans nos parkings ?", answer: "Après mise en demeure du titulaire, avec accusé de réception, de retirer le véhicule sous huit jours, puis demande de mise en fourrière à l'officier de police judiciaire si elle reste sans effet ; nous intervenons en tournée une fois le droit d'enlever établi." },
      { question: "Combien de véhicules pouvez-vous enlever en une tournée ?", answer: "Plusieurs par passage, sur un ou plusieurs jours selon le site ; les tournées sont programmées hors des heures de quai pour les sites logistiques." },
      { question: "Fournissez-vous un justificatif pour la comptabilité ?", answer: "Oui : déclaration de cession et certificat de destruction par véhicule, récapitulatif par immatriculation pour un lot, facture au nom de la société pour les véhicules rachetés." },
      { question: "Certains véhicules de la flotte roulent encore, faut-il les détruire ?", answer: "Non : nous les rachetons avec une offre par immatriculation ; seuls les véhicules hors d'usage sont cédés pour destruction, gratuitement s'ils sont complets." },
      { question: "Intervenez-vous pour une commune ?", answer: "Oui, pour l'évacuation des épaves identifiées à l'issue des procédures de stationnement abusif ou de déchet abandonné, sur la voirie comme sur les chemins et délaissés." },
    ],
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'bobigny' },
      { deptSlug: 'val-d-oise-95', slug: 'gonesse' },
      { deptSlug: 'essonne-91', slug: 'les-ulis' },
    ],
    sources: ['SP_VHU', 'CR_R325_47', 'CR_R417_12', 'SP_CSA'],
  },
  {
    slug: 'zfe-vieux-vehicule',
    service: 'epaviste',
    updatedAt: '2026-09-20',
    title: "ZFE du Grand Paris : que faire d'un vieux véhicule Crit'Air 3, 4 ou 5 ?",
    metaTitle: 'ZFE Grand Paris et vieux véhicule',
    description: "77 communes, Crit'Air 3/4/5 restreints, pas de verbalisation jusqu'à fin 2026, suppression censurée : la ZFE en 2026 et vos options.",
    label: 'ZFE, vieux véhicule',
    intro: [
      "La zone à faibles émissions de la Métropole du Grand Paris restreint la circulation des véhicules les plus anciens à l'intérieur de l'A86. Depuis le 1er janvier 2025, les Crit'Air 3 — diesels immatriculés avant 2011, essence d'avant 2006 — s'ajoutent aux Crit'Air 4, 5 et non classés. Mais 2026 a apporté deux nouvelles que beaucoup de conducteurs franciliens n'ont pas entendues clairement : la suppression des ZFE votée par le Parlement a été censurée, et la Métropole a prolongé d'un an la période sans verbalisation.",
      "Cette page fait le point sur les règles telles qu'elles sont publiées par la Métropole et le Conseil constitutionnel, puis sur les options concrètes pour un vieux véhicule : le garder, le vendre tant qu'il roule, ou le faire enlever gratuitement s'il ne sert plus.",
    ],
    sections: [
      {
        title: 'Le périmètre et les règles en vigueur',
        paragraphs: [
          "La ZFE métropolitaine couvre 77 communes : Paris, 59 communes entièrement incluses et 17 communes partiellement incluses parce que l'A86 les traverse — Montreuil, Créteil, Vitry-sur-Seine, Colombes, Clamart, Bobigny, Gennevilliers, entre autres. Les communes situées au-delà de l'A86, même membres de la Métropole (Argenteuil, Athis-Mons, Savigny-sur-Orge…), n'en font pas partie. Sur chaque page de commune d'Île-de-France, nous indiquons si la ville est dans le périmètre.",
          "Pour les véhicules légers, les Crit'Air 5, 4 et 3 ne sont pas autorisés à circuler dans le périmètre du lundi au vendredi de 8 h à 20 h ; la circulation reste libre de 20 h à 8 h, les week-ends et les jours fériés. Un « Pass ZFE 24h » permet en outre de circuler 24 journées pleines par an avec un véhicule normalement interdit.",
        ],
      },
      {
        title: 'Ce qui a changé en 2026',
        paragraphs: [
          "Le Parlement avait voté, au printemps 2026, la suppression de l'obligation de mettre en place des zones à faibles émissions, dans la loi de simplification de la vie économique. Le Conseil constitutionnel a censuré cette disposition le 21 mai 2026 (décision n° 2026-903 DC), pour un motif de procédure : les ZFE restent donc en vigueur, et celle du Grand Paris avec elles.",
          "Dans le même temps, la Métropole du Grand Paris a prolongé sa période pédagogique : jusqu'au 31 décembre 2026, les contrôles restent « ponctuels et informatifs », sans verbalisation des véhicules concernés. Les restrictions existent, mais elles ne sont pas sanctionnées cette année ; le calendrier 2027 sera fixé par la Métropole, et nous mettons cette page à jour à chaque annonce officielle.",
        ],
      },
      {
        title: 'Option 1 : garder le véhicule',
        paragraphs: [
          "Une Crit'Air 3 reste parfaitement légale en dehors de l'A86, le soir, le week-end et les jours fériés dans le périmètre, et 24 jours par an avec le Pass ZFE. Beaucoup de ménages de grande couronne la conservent comme seconde voiture. Son marché s'est en revanche déplacé : les acheteurs de petite couronne s'en détournent, ceux de grande couronne et de province restent preneurs — ce qui pèse sur son prix de revente, et plaide pour ne pas attendre si vous savez que vous vous en séparerez.",
        ],
      },
      {
        title: 'Option 2 : la vendre tant qu\'elle roule',
        paragraphs: [
          "Une voiture qui roule et est complète, même sans contrôle technique valide, se vend à un professionnel de l'automobile : la vente à un professionnel est dispensée du contrôle technique de moins de six mois exigé pour une vente à un particulier. Nous reprenons ces véhicules en l'état dans toute l'Île-de-France, sur photos et carte grise, avec enlèvement à domicile et paiement le jour de l'enlèvement. Notre page consacrée au rachat d'une voiture sans contrôle technique détaille la démarche.",
        ],
      },
      {
        title: 'Option 3 : la faire enlever gratuitement si elle ne sert plus',
        paragraphs: [
          "Une voiture en panne, sans valeur marchande, doit être remise à un centre VHU agréé, seul habilité à la détruire : la remise d'un véhicule complet est gratuite, le certificat de destruction vous est remis et la cession déclarée, ce qui met fin à l'assurance et à votre responsabilité. La laisser dans la rue mène à la fourrière au-delà de sept jours de stationnement au même point.",
          "Aucune aide nationale ne dépend plus de la destruction de l'ancien véhicule : la prime à la conversion a été supprimée pour les commandes passées à partir du 2 décembre 2024. La décision se prend donc sur la seule valeur de la voiture — et nous vous la donnons honnêtement, sur photos, sans pousser vers la destruction un véhicule qui peut être racheté.",
        ],
        list: [
          "Vérifier la vignette Crit'Air du véhicule et la situation du jour sur le site de la Métropole.",
          "Voiture roulante et complète : rachat en l'état, avec ou sans contrôle technique.",
          "Voiture en fin de vie : enlèvement gratuit, certificat de destruction, déclaration de cession.",
          "Dans tous les cas : jamais à un particulier si elle ne roule plus, jamais à une casse non agréée.",
        ],
      },
    ],
    faq: [
      { question: "La ZFE du Grand Paris a-t-elle été supprimée ?", answer: "Non : la suppression des ZFE votée par le Parlement au printemps 2026 a été censurée par le Conseil constitutionnel le 21 mai 2026 ; la ZFE métropolitaine reste en vigueur." },
      { question: "Les Crit'Air 3 sont-ils verbalisés en 2026 ?", answer: "Non : la Métropole du Grand Paris a prolongé la période pédagogique jusqu'au 31 décembre 2026, avec des contrôles ponctuels et informatifs ; les restrictions existent mais ne sont pas sanctionnées cette année." },
      { question: "Quelles communes sont dans la ZFE ?", answer: "77 communes : Paris, 59 communes entièrement à l'intérieur de l'A86 et 17 communes partiellement incluses ; les communes au-delà de l'A86 n'en font pas partie, même lorsqu'elles appartiennent à la Métropole." },
      { question: "Puis-je vendre ma Crit'Air 3 sans contrôle technique ?", answer: "Oui, à un professionnel de l'automobile, dispensé du contrôle technique de moins de six mois exigé pour une vente à un particulier ; nous la reprenons en l'état si elle roule et est complète." },
      { question: "Existe-t-il encore une prime pour détruire une vieille voiture ?", answer: "Non : la prime à la conversion a été supprimée pour les commandes passées à partir du 2 décembre 2024 ; la décision se prend sur la valeur réelle du véhicule." },
      { question: "Ma vieille voiture ne roule plus, que faire ?", answer: "La céder pour destruction à un centre VHU agréé : enlèvement gratuit si elle est complète, certificat de destruction et déclaration de cession, fin de l'assurance et de votre responsabilité." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-12e' },
      { deptSlug: 'hauts-de-seine-92', slug: 'colombes' },
      { deptSlug: 'val-de-marne-94', slug: 'champigny-sur-marne' },
    ],
    sources: ['MGP_ZFE', 'CC_2026_903', 'SP_CT', 'SP_VHU', 'CR_R417_12', 'DECRET_2024_1084'],
  },
  {
    slug: 'sans-controle-technique',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat de voiture sans contrôle technique en Île-de-France",
    metaTitle: 'Rachat voiture sans contrôle technique',
    description: "Contrôle périmé ou refusé ? La vente à un professionnel est dispensée de contrôle technique : effet sur l'offre, documents, enlèvement en IDF.",
    label: 'Sans contrôle technique',
    intro: [
      "Le contrôle technique est périmé depuis dix-huit mois, ou il vient d'être refusé pour une corrosion du châssis dont le devis dépasse la valeur de la voiture. Vous voudriez la vendre, mais un particulier ne peut pas l'acheter sans un contrôle de moins de six mois — et vous ne voulez pas payer un contrôle pour une voiture que vous ne garderez pas. En Île-de-France, ce cas arrive tous les jours, et il a une réponse simple : la vente à un professionnel.",
      "Cette page explique la règle exacte, ce que le contrôle technique change — et ne change pas — sur le prix, les trois situations que nous rencontrons (périmé, refusé, défaillance critique), les documents nécessaires et le déroulement du rachat avec enlèvement à domicile.",
    ],
    sections: [
      {
        title: 'La règle : dispensé de contrôle technique pour une vente à un professionnel',
        paragraphs: [
          "Pour vendre à un particulier une voiture de plus de quatre ans, le vendeur doit remettre un procès-verbal de contrôle technique datant de moins de six mois à la date de la demande de nouvelle carte grise. La règle prévoit deux dispenses : le véhicule de moins de quatre ans, et la vente à un professionnel de l'automobile. Un négociant, un garage ou un centre VHU agréé peuvent donc acheter votre voiture sans contrôle, périmé ou refusé.",
          "C'est cette dispense que nous utilisons. Elle ne vous exonère pas des autres obligations de la cession : carte grise barrée, datée et signée, certificat de situation administrative de moins de quinze jours, déclaration de cession sur le cerfa 15776. Et elle ne s'applique qu'à un véhicule qui peut encore rouler : un véhicule non roulant ne peut, lui, être vendu qu'à un professionnel dans tous les cas.",
        ],
      },
      {
        title: 'Périmé, refusé, critique : trois situations',
        paragraphs: [
          "Contrôle simplement périmé : la voiture roule, aucun défaut connu. Vous avez le choix entre repasser un contrôle pour vendre à un particulier, ou vendre à un professionnel en l'état. Pour une voiture récente en bon état, le contrôle vaut souvent la peine ; pour une voiture de plus de douze ou quinze ans, la différence de prix entre les deux canaux couvre rarement le contrôle et le temps passé.",
          "Contrôle refusé pour défaillance majeure — freins, direction, pollution, corrosion structurelle : vous disposez de deux mois pour la contre-visite. Si la réparation est modeste, faites-la et repassez la contre-visite ; si le devis dépasse la valeur de la voiture, la vente à un professionnel en l'état est la solution rationnelle, et nous reprenons la voiture avec le procès-verbal en main. Défaillance critique : l'autorisation de circuler cesse le jour même du contrôle ; la voiture ne doit plus rouler et sera enlevée sur plateau — l'enlèvement fait partie de notre offre.",
        ],
      },
      {
        title: 'Ce que le contrôle technique change sur l\'offre',
        paragraphs: [
          "Soyons directs : un contrôle refusé ou périmé réduit l'offre, parce que le professionnel qui reprend la voiture devra la contrôler et la réparer avant de la revendre en France, ou la revendra à l'export où la cote est différente. Mais il ne l'annule pas. Une voiture complète et roulante a une valeur ; ce qui la fait vraiment chuter, c'est l'absence d'éléments — moteur, boîte, catalyseur — ou une corrosion avancée.",
          "Envoyez-nous le procès-verbal du dernier contrôle avec les photos : les défaillances relevées nous permettent de chiffrer une offre ferme, sans mauvaise surprise le jour de l'enlèvement. Si la voiture ne vaut plus rien, nous vous le disons aussi, et nous proposons l'enlèvement gratuit avec certificat de destruction plutôt qu'un prix illusoire.",
        ],
        list: [
          "Carte grise, barrée le jour de la vente avec la mention « Vendu le … », datée et signée.",
          "Pièce d'identité du titulaire ; procuration si un tiers nous reçoit.",
          "Certificat de situation administrative de moins de quinze jours, gratuit en ligne.",
          "Procès-verbal du dernier contrôle technique, même périmé ou défavorable : non obligatoire, mais utile à l'estimation.",
          "Déclaration de cession cerfa 15776, remplie avec vous et déclarée en ligne.",
        ],
      },
      {
        title: 'Le cas francilien : Crit\'Air 3 et petite couronne',
        paragraphs: [
          "La ZFE du Grand Paris a fait basculer beaucoup de voitures Crit'Air 3 sans contrôle technique dans la catégorie « à vendre vite » : leurs propriétaires de petite couronne n'en ont plus l'usage quotidien dans le périmètre et ne veulent pas payer un contrôle pour une voiture qu'ils ne garderont pas. Pour ces véhicules, la vente à un professionnel qui les redirige vers la grande couronne, la province ou l'export est la voie normale — et la période sans verbalisation qui court jusqu'à fin 2026 n'y change rien sur le fond.",
          "À l'inverse, en grande couronne, une voiture ancienne bien entretenue garde un marché local : si le contrôle ne demande qu'une réparation légère, le repasser peut valoir la peine avant de comparer les offres.",
        ],
      },
      {
        title: 'Comment se passe le rachat',
        paragraphs: [
          "Photos (quatre angles, compteur, intérieur), carte grise et procès-verbal par WhatsApp ; offre ferme dans la journée ; rendez-vous à domicile, au parking ou devant le pavillon, dans les huit départements. Sur place, nous vérifions les documents, remplissons la déclaration de cession, payons avant le chargement et emmenons la voiture — au treuil si elle ne doit plus rouler. La déclaration de cession est enregistrée en ligne par nos soins ; vous gardez votre exemplaire.",
        ],
      },
    ],
    faq: [
      { question: "Peut-on vendre une voiture sans contrôle technique ?", answer: "Oui, à un professionnel de l'automobile : la vente à un professionnel est dispensée du contrôle technique de moins de six mois exigé pour une vente à un particulier ; c'est aussi le cas d'un véhicule de moins de quatre ans." },
      { question: "Le contrôle technique a été refusé, la voiture vaut-elle encore quelque chose ?", answer: "Oui si elle est complète et roulante : un contrôle refusé réduit l'offre mais ne l'annule pas ; envoyez le procès-verbal, la carte grise et des photos pour une offre ferme dans la journée." },
      { question: "Défaillance critique : la voiture ne doit plus rouler, pouvez-vous quand même la racheter ?", answer: "Oui, nous venons la chercher sur plateau ; l'enlèvement fait partie de l'offre." },
      { question: "Faut-il repasser un contrôle avant de vous la vendre ?", answer: "Non. Il n'est utile que si vous préférez vendre à un particulier une voiture récente en bon état." },
      { question: "Quels documents pour vendre sans contrôle technique ?", answer: "Carte grise barrée et signée, pièce d'identité, certificat de situation administrative de moins de quinze jours, déclaration de cession ; le procès-verbal du dernier contrôle est utile mais pas obligatoire." },
      { question: "Et si la voiture ne vaut plus rien ?", answer: "Nous vous le disons sur photos et proposons l'enlèvement gratuit avec certificat de destruction, plutôt qu'un prix qui ne tiendrait pas le jour de l'enlèvement." },
    ],
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'st-denis' },
      { deptSlug: 'val-d-oise-95', slug: 'sannois' },
      { deptSlug: 'essonne-91', slug: 'corbeil-essonnes' },
    ],
    sources: ['SP_CT', 'SP_NON_ROULANT', 'SP_CSA', 'MGP_ZFE'],
  },
  {
    slug: 'voiture-accidentee',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat de voiture accidentée en Île-de-France",
    metaTitle: 'Rachat voiture accidentée en IDF',
    description: "Vendre une voiture accidentée en Île-de-France : expertise, VEI, offre de l'assureur, opposition, cession en l'état à un professionnel.",
    label: 'Voiture accidentée',
    intro: [
      "Une voiture accidentée n'est pas forcément une épave. Un avant enfoncé sur une mécanique saine, un flanc plié sur un moteur de 80 000 km, une voiture de fonction rendue après un choc de parking : ces véhicules ont une valeur pour un professionnel, qu'il répare, exporte ou démonte. En Île-de-France, où les accrochages sont quotidiens et les parkings étroits, nous en rachetons chaque semaine — à condition de savoir exactement où en est le dossier avec l'assureur.",
      "Cette page décrit la procédure prévue après un accident, ce que vous pouvez vendre et à qui, comment nous estimons une voiture accidentée, et comment se passe l'enlèvement depuis un garage, un parking ou une fourrière.",
    ],
    sections: [
      {
        title: 'Expertise, VE, VEI : ce que vous pouvez faire',
        paragraphs: [
          "Après un accident déclaré, l'expert mandaté par l'assureur examine le véhicule et établit s'il peut circuler en sécurité et s'il est techniquement réparable. Si les réparations dépassent la valeur du véhicule, il est déclaré économiquement irréparable (VEI) : l'assureur doit vous proposer son acquisition dans les quinze jours suivant le rapport, et vous avez trente jours pour répondre. Si vous acceptez, la voiture part chez le professionnel choisi par l'assureur. Si vous refusez, la préfecture inscrit une opposition au transfert de la carte grise ; vous devez alors faire réparer et ré-expertiser la voiture, ou la faire détruire.",
          "Cette opposition n'interdit pas toute vente : elle « ne fait pas obstacle à la cession en l'état de votre véhicule endommagé à un professionnel de l'automobile ou à votre assureur ». Un VEI ne peut être cédé qu'à un démolisseur ; un véhicule endommagé mais réparable peut être cédé à un professionnel qui le réparera. Dans tous les cas, jamais à un particulier.",
        ],
      },
      {
        title: 'Vendre avant ou après l\'offre de l\'assureur ?',
        paragraphs: [
          "Vous n'êtes pas obligé d'accepter l'offre d'acquisition de l'assureur : si vous pensez que la voiture a une valeur résiduelle supérieure — parce que la mécanique est intacte, parce que le modèle est recherché —, demandez une offre de reprise indépendante avant de signer. Vous comparez, puis vous décidez. Attention toutefois : l'indemnisation de l'assureur (valeur avant sinistre) et une offre de rachat en l'état ne portent pas sur la même chose ; la première est souvent plus élevée pour une voiture récente, la seconde peut l'emporter pour une voiture ancienne peu couverte.",
          "Si la voiture n'a pas été expertisée — contrat au tiers, accident sans autre véhicule, franchise supérieure au dommage —, elle est libre de toute opposition, et la seule règle qui s'applique est celle du véhicule non roulant : vente à un professionnel uniquement.",
        ],
      },
      {
        title: 'Comment nous estimons une voiture accidentée',
        paragraphs: [
          "Pas sur sa carrosserie, mais sur ce qui reste vendable : un moteur qui tourne, une boîte, une électronique intacte, des jantes, une sellerie en bon état, un catalyseur. Une berline de dix ans dont l'avant est détruit mais dont la mécanique est saine vaut davantage qu'une citadine de quinze ans sans dégât mais à moteur cassé. Envoyez des photos du choc et des parties intactes, la carte grise, le rapport d'expertise si vous l'avez : l'offre est ferme dans la journée.",
          "Si des airbags se sont déclenchés, si le châssis est touché ou si le véhicule a pris l'eau, dites-le : cela change l'estimation, et nous préférons le savoir avant de venir plutôt que de réviser l'offre sur place — ce que nous ne faisons pas.",
        ],
        list: [
          "Carte grise (même sous opposition d'expert : la vente à un professionnel reste possible).",
          "Pièce d'identité ; procuration si un tiers nous reçoit.",
          "Certificat de situation administrative de moins de quinze jours, qui mentionne l'éventuelle opposition.",
          "Rapport d'expertise et courrier de l'assureur, s'ils existent.",
          "Déclaration de cession, remplie avec vous et déclarée en ligne.",
        ],
      },
      {
        title: 'Où nous allons chercher la voiture',
        paragraphs: [
          "Chez le garagiste ou le carrossier qui l'a réceptionnée : prévenez-le, réglez ce qui lui est dû, nous convenons du créneau avec lui. Dans le parking de la résidence : chariots et treuil si les roues ne tournent plus. En fourrière, si la voiture y a été conduite après l'accident : nous allons la chercher avec votre mandat, après règlement des frais dus — et l'offre tient compte de ces frais si vous le souhaitez. Le paiement a lieu avant le chargement, par virement, ou selon le mode convenu au moment de l'offre.",
        ],
      },
      {
        title: 'Et si elle ne vaut vraiment plus rien ?',
        paragraphs: [
          "Une voiture brûlée, pliée, dont le moteur est touché, n'a pas de valeur marchande : nous le disons dès l'estimation, et nous proposons l'enlèvement gratuit pour destruction par un centre VHU agréé, avec le certificat de destruction que l'assureur réclame pour clore un dossier VEI conservé. Notre page consacrée à l'enlèvement d'un véhicule accidenté détaille ce cas.",
        ],
      },
    ],
    faq: [
      { question: "Puis-je vendre ma voiture accidentée sans passer par l'assureur ?", answer: "Oui, à un professionnel de l'automobile : l'opposition inscrite après un accident ne fait pas obstacle à la cession en l'état à un professionnel ou à l'assureur ; un VEI ne peut être cédé qu'à un démolisseur." },
      { question: "L'assureur me propose une indemnisation, dois-je accepter ?", answer: "Vous avez trente jours pour répondre. Comparez avec une offre de reprise indépendante : l'indemnisation (valeur avant sinistre) l'emporte souvent pour une voiture récente, l'offre en l'état peut l'emporter pour une voiture ancienne peu couverte." },
      { question: "Comment estimez-vous une voiture accidentée ?", answer: "Sur ce qui reste vendable — moteur, boîte, électronique, jantes, sellerie, catalyseur — à partir de photos du choc et des parties intactes, de la carte grise et du rapport d'expertise ; l'offre est ferme dans la journée." },
      { question: "La voiture est chez le carrossier, pouvez-vous la récupérer ?", answer: "Oui, avec votre mandat, après règlement de ce qui lui est dû ; nous convenons du créneau avec lui." },
      { question: "Puis-je la vendre à un particulier ?", answer: "Non : un véhicule qui n'est plus en état de rouler ne peut pas être vendu à un particulier, et un véhicule sous opposition d'expert ne peut être cédé qu'à un professionnel." },
      { question: "Et si elle ne vaut plus rien ?", answer: "Nous proposons l'enlèvement gratuit pour destruction par un centre VHU agréé, avec le certificat de destruction utile pour clore le dossier de l'assureur." },
    ],
    towns: [
      { deptSlug: 'hauts-de-seine-92', slug: 'boulogne-billancourt' },
      { deptSlug: 'val-de-marne-94', slug: 'ivry-sur-seine' },
      { deptSlug: 'yvelines-78', slug: 'sartrouville' },
    ],
    sources: ['SP_VE', 'SP_GAGE', 'SP_NON_ROULANT', 'SP_CSA'],
  },
  {
    slug: 'moteur-hs',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat de voiture avec moteur HS en Île-de-France",
    metaTitle: 'Rachat voiture moteur HS en IDF',
    description: "Moteur cassé, turbo, distribution, joint de culasse : ce que vaut encore une voiture à moteur HS en Île-de-France et à qui la vendre.",
    label: 'Moteur HS',
    intro: [
      "Le garage a rendu son verdict : joint de culasse, courroie de distribution rompue, turbo, bielle coulée — le moteur est hors service, et la réparation coûte plus que la voiture. Elle est maintenant immobilisée devant chez vous, sur le parking de la résidence ou chez le garagiste qui vous demande de la reprendre. En Île-de-France, où les trajets quotidiens usent les mécaniques, c'est l'un des motifs de vente les plus fréquents que nous rencontrons.",
      "Une voiture à moteur HS n'est pas une épave pour autant : ce qui reste — carrosserie, boîte, électronique, sellerie, catalyseur, parfois le moteur lui-même pour ses pièces — a une valeur pour un professionnel. Cette page explique à qui vous pouvez la vendre, comment nous l'estimons, et comment se passe l'enlèvement d'un véhicule qui ne démarre plus.",
    ],
    sections: [
      {
        title: 'À qui peut-on vendre une voiture qui ne roule plus ?',
        paragraphs: [
          "La règle est nette : un véhicule qui n'est plus en état de rouler ne peut pas être vendu à un particulier, même à bas prix, même « pour pièces » entre voisins ; la vente est réservée aux professionnels de l'automobile. Elle est par ailleurs dispensée du contrôle technique de moins de six mois exigé pour une vente à un particulier. Si personne n'en veut, le véhicule doit être remis à un centre VHU agréé.",
          "En pratique, deux acheteurs professionnels existent : celui qui remplace le moteur et revend la voiture (rentable sur un modèle récent ou recherché) et celui qui la démonte ou l'exporte. Nous faisons les deux, et l'offre dépend de la catégorie dans laquelle tombe votre voiture.",
        ],
      },
      {
        title: 'Ce qui fait la valeur d\'une voiture à moteur HS',
        paragraphs: [
          "D'abord l'âge et le modèle : un moteur cassé sur une voiture de cinq ans justifie souvent un remplacement, et la voiture se revend ; sur une voiture de quinze ans, c'est la valeur des pièces qui compte. Ensuite, la nature de la panne : une distribution rompue peut avoir détruit le moteur, un joint de culasse peut laisser le bloc réutilisable, un turbo se remplace seul ; le diagnostic du garage, même sommaire, aide à chiffrer. Enfin, tout le reste : boîte de vitesses, électronique, carrosserie sans choc, sellerie, jantes, catalyseur intact.",
          "Envoyez la carte grise, le kilométrage, le diagnostic ou la facture du garage et des photos ; nous répondons dans la journée par une offre ferme, qui ne bouge pas le jour de l'enlèvement. Un moteur HS sur une voiture ancienne, incomplète ou corrodée peut aussi ne plus rien valoir : nous le disons, et nous proposons alors l'enlèvement gratuit avec certificat de destruction.",
        ],
        list: [
          "Carte grise, barrée « Vendu le … » le jour de la vente, datée et signée.",
          "Pièce d'identité ; procuration si un tiers nous reçoit.",
          "Certificat de situation administrative de moins de quinze jours.",
          "Diagnostic ou facture du garage, factures d'entretien : ils améliorent l'offre.",
          "Déclaration de cession cerfa 15776, remplie sur place et déclarée en ligne.",
        ],
      },
      {
        title: 'La voiture est chez le garagiste',
        paragraphs: [
          "C'est le cas typique : le garage a diagnostiqué, vous avez refusé le devis, et la voiture occupe une place dans son atelier ou sur son parking. Prévenez-le de la vente, réglez le diagnostic et l'éventuel gardiennage, et nous convenons directement avec lui du créneau d'enlèvement ; nous venons avec le treuil, la voiture ne démarrant pas. Le paiement a lieu avant le chargement, par virement ou selon le mode convenu au moment de l'offre.",
        ],
      },
      {
        title: 'La voiture est au parking, dans la rue, au pavillon',
        paragraphs: [
          "Au parking souterrain d'une résidence, nous la remontons au treuil et sur chariots jusqu'au plateau, en coordination avec le gardien ou le syndic ; dans la rue, nous la treuillons sur le plateau depuis sa place ; dans l'allée d'un pavillon, depuis le portail. L'enlèvement d'un véhicule qui ne roule plus fait partie de l'offre dans les huit départements, sans supplément. Attention au délai si la voiture est dans la rue : au-delà de sept jours consécutifs au même point, elle est en stationnement abusif et peut partir en fourrière.",
        ],
      },
      {
        title: 'Moteur HS et Île-de-France',
        paragraphs: [
          "Les longs trajets domicile-travail de la grande couronne (Mantois, Sénart, plaine de France, Roissy) et les embouteillages de la petite couronne produisent des pannes moteur à fort kilométrage ; ces berlines et breaks diesel, entretenus avec leurs factures, se vendent à l'export malgré le moteur, et notre offre en tient compte. Dans le périmètre de la ZFE, une Crit'Air 3 à moteur HS n'a plus d'usage local : sa valeur est celle de ses pièces et de l'export, ni plus ni moins, et nous ne prétendons pas le contraire.",
        ],
      },
    ],
    faq: [
      { question: "Ma voiture a le moteur cassé, puis-je la vendre à un particulier ?", answer: "Non : un véhicule qui n'est plus en état de rouler ne peut être vendu qu'à un professionnel de l'automobile ; sinon, il doit être remis à un centre VHU agréé." },
      { question: "Que vaut une voiture à moteur HS ?", answer: "Cela dépend de l'âge, du modèle, de la nature de la panne et de l'état du reste (boîte, électronique, carrosserie, catalyseur) : envoyez carte grise, kilométrage, diagnostic et photos pour une offre ferme dans la journée." },
      { question: "La voiture est immobilisée chez le garagiste, comment faites-vous ?", answer: "Prévenez-le et réglez ce qui lui est dû ; nous convenons du créneau avec lui et venons la chercher au treuil. Le paiement a lieu avant le chargement." },
      { question: "Faut-il un contrôle technique pour vendre une voiture en panne ?", answer: "Non : la vente à un professionnel est dispensée du contrôle technique." },
      { question: "L'enlèvement d'une voiture qui ne démarre pas est-il facturé ?", answer: "Non, il fait partie de l'offre, au parking, dans la rue ou au pavillon, dans les huit départements." },
      { question: "Et si elle ne vaut plus rien ?", answer: "Nous vous le disons dès l'estimation et proposons l'enlèvement gratuit avec certificat de destruction." },
    ],
    towns: [
      { deptSlug: 'yvelines-78', slug: 'mantes-la-jolie' },
      { deptSlug: 'val-d-oise-95', slug: 'garges-les-gonesse' },
      { deptSlug: 'seine-et-marne-77', slug: 'savigny-le-temple' },
    ],
    sources: ['SP_NON_ROULANT', 'SP_CT', 'SP_CSA', 'CR_R417_12'],
  },
  {
    slug: 'boite-de-vitesses-hs',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat de voiture avec boîte de vitesses HS en Île-de-France",
    metaTitle: 'Rachat voiture boîte de vitesses HS IDF',
    description: "Boîte automatique bloquée, boîte manuelle qui craque, embrayage mort : la voiture reste vendable à un professionnel en Île-de-France.",
    label: 'Boîte de vitesses HS',
    intro: [
      "La boîte automatique reste bloquée en mode dégradé, la manuelle refuse la troisième, l'embrayage patine au moindre démarrage en côte : le devis du garage — boîte reconditionnée, main-d'œuvre — dépasse ce que vaut la voiture, et vous ne voulez pas y mettre cet argent. En Île-de-France, où les embouteillages et les démarrages incessants usent boîtes et embrayages plus vite qu'ailleurs, c'est un cas que nous voyons chaque semaine.",
      "Une voiture à boîte HS garde souvent une valeur réelle : le moteur tourne, la carrosserie est saine, l'électronique fonctionne. Cette page explique à qui la vendre, comment nous l'estimons, et comment nous l'enlevons — y compris quand elle ne peut plus être déplacée.",
    ],
    sections: [
      {
        title: 'Vendable, mais à un professionnel',
        paragraphs: [
          "Une voiture dont la boîte est hors service n'est plus en état de rouler normalement : la règle prévoit qu'un tel véhicule ne peut pas être vendu à un particulier, seulement à un professionnel de l'automobile, et que cette vente est dispensée du contrôle technique. Si la boîte fonctionne encore en mode dégradé et que la voiture peut se déplacer, la même prudence s'impose : ne la vendez pas à un particulier en cachant le défaut, la responsabilité serait la vôtre.",
        ],
      },
      {
        title: 'Ce qui fait la valeur : le moteur d\'abord',
        paragraphs: [
          "Contrairement au moteur HS, la boîte HS laisse intact l'organe le plus cher de la voiture. Un professionnel peut remplacer la boîte par une boîte d'occasion et revendre le véhicule — rentable sur un modèle courant ou récent —, ou récupérer le moteur, l'électronique et la carrosserie. La valeur dépend donc du modèle, de l'âge, du kilométrage du moteur, de l'état de la carrosserie et, pour une boîte automatique, de la disponibilité d'une boîte de remplacement.",
          "Envoyez la carte grise, le kilométrage, le diagnostic du garage (boîte, embrayage, volant moteur ?) et des photos : nous répondons dans la journée par une offre ferme. Les factures d'entretien du moteur améliorent l'offre ; une carrosserie accidentée ou une corrosion la réduisent.",
        ],
        list: [
          "Carte grise barrée « Vendu le … », datée et signée le jour de la vente.",
          "Pièce d'identité ; procuration si un tiers nous reçoit.",
          "Certificat de situation administrative de moins de quinze jours.",
          "Diagnostic du garage et factures d'entretien.",
          "Déclaration de cession cerfa 15776, remplie sur place et déclarée en ligne.",
        ],
      },
      {
        title: 'Embrayage, volant moteur, boîte automatique : trois pannes, trois valeurs',
        paragraphs: [
          "Un embrayage mort sur une manuelle est la panne la moins grave : la réparation est standard, et la voiture se revend une fois réparée — l'offre est proche de celle d'une voiture roulante. Un volant moteur bimasse ajoute au coût mais reste une réparation courante. Une boîte automatique bloquée, surtout sur les boîtes à double embrayage ou robotisées de certains modèles, est plus délicate : la boîte de remplacement peut coûter cher et être rare, et la valeur bascule vers celle des pièces et de l'export. Dites-nous précisément ce que le garage a diagnostiqué.",
        ],
      },
      {
        title: 'Enlever une voiture qui ne passe plus les vitesses',
        paragraphs: [
          "Une boîte bloquée en position parking ou une boîte manuelle coincée en vitesse empêchent de pousser la voiture : nous la treuillons sur le plateau après avoir libéré la transmission (point mort forcé, ou chariots sous les roues motrices si la boîte est verrouillée). Au parking souterrain, la remontée se fait au treuil et sur chariots, avec le gardien ou le syndic ; dans la rue, depuis la place ; chez le garagiste, sur rendez-vous avec lui après règlement de ce qui lui est dû. L'enlèvement fait partie de l'offre, dans les huit départements.",
        ],
      },
      {
        title: 'Le paiement et la cession',
        paragraphs: [
          "Le paiement a lieu avant le chargement, par virement immédiat ou selon le mode convenu au moment de l'offre ; nous remplissons la déclaration de cession avec vous et l'enregistrons en ligne, et vous conservez votre exemplaire ainsi que le coupon détachable de la carte grise. Vous informez ensuite votre assureur de la vente. Si la voiture ne vaut plus rien — boîte HS sur un véhicule ancien, incomplet ou corrodé —, nous le disons dès l'estimation et proposons l'enlèvement gratuit pour destruction.",
          "Un mot sur le calendrier : une voiture bloquée en vitesse dans la rue ne peut pas être déplacée par vos soins, et au-delà de sept jours consécutifs au même point elle est en stationnement abusif. Prévenez-nous dès le diagnostic ; l'offre est faite dans la journée et l'enlèvement suit en général sous 24 à 48 heures, souvent plus vite en petite couronne.",
        ],
      },
    ],
    faq: [
      { question: "Ma boîte automatique est bloquée, la voiture est-elle vendable ?", answer: "Oui, à un professionnel de l'automobile : un véhicule qui n'est plus en état de rouler ne peut pas être vendu à un particulier. Le moteur intact fait l'essentiel de la valeur." },
      { question: "L'embrayage est mort, que vaut la voiture ?", answer: "Proche d'une voiture roulante : la réparation est standard et la voiture se revend une fois réparée. Envoyez carte grise, kilométrage et diagnostic pour une offre ferme dans la journée." },
      { question: "La voiture est bloquée en vitesse et ne se pousse pas, comment l'enlevez-vous ?", answer: "Au treuil, après avoir libéré la transmission ou en plaçant des chariots sous les roues motrices ; au parking souterrain comme dans la rue, l'enlèvement fait partie de l'offre." },
      { question: "Faut-il un contrôle technique ?", answer: "Non : la vente à un professionnel en est dispensée." },
      { question: "Quels documents ?", answer: "Carte grise barrée et signée, pièce d'identité, certificat de situation administrative de moins de quinze jours, diagnostic du garage si vous l'avez ; nous remplissons la déclaration de cession sur place." },
      { question: "Quand suis-je payé ?", answer: "Avant le chargement, le jour de l'enlèvement, par virement immédiat ou selon le mode convenu au moment de l'offre." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-20e' },
      { deptSlug: 'seine-saint-denis-93', slug: 'aulnay-sous-bois' },
      { deptSlug: 'hauts-de-seine-92', slug: 'colombes' },
    ],
    sources: ['SP_NON_ROULANT', 'SP_CT', 'SP_CSA', 'CR_R417_12'],
  },
  {
    slug: 'voiture-en-panne',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat de voiture en panne en Île-de-France",
    metaTitle: 'Rachat voiture en panne en Île-de-France',
    description: "Voiture en panne devant chez vous, au parking ou chez le garagiste : à qui la vendre en Île-de-France, ce qu'elle vaut, enlèvement compris.",
    label: 'Voiture en panne',
    intro: [
      "Panne électrique qui immobilise tout, injection, batterie et alternateur, fuite de liquide de refroidissement, pompe à carburant : la voiture ne démarre plus, et la réparation n'a pas de sens au regard de son âge. Elle attend dans la rue — avec la fourrière qui guette —, au parking de la résidence ou chez le garagiste. En Île-de-France, c'est la première raison pour laquelle on nous appelle pour un rachat.",
      "Une voiture en panne n'est pas une épave : si elle est complète, elle intéresse un professionnel qui la réparera, la démontera ou l'exportera. Cette page explique à qui vous pouvez la vendre, ce qui détermine son prix, les documents, et comment se déroule l'enlèvement d'un véhicule qui ne démarre plus.",
    ],
    sections: [
      {
        title: 'La règle pour un véhicule qui ne roule plus',
        paragraphs: [
          "Un véhicule qui n'est plus en état de rouler ne peut pas être vendu à un particulier : la vente est réservée aux professionnels de l'automobile, et elle est dispensée du contrôle technique de moins de six mois exigé pour une vente à un particulier. Si le véhicule n'a plus de valeur, il doit être remis à un centre VHU agréé, qui le détruit gratuitement s'il est complet et délivre le certificat de destruction.",
          "Les documents sont ceux de toute cession : carte grise barrée « Vendu le … » le jour de la vente, datée et signée ; certificat de situation administrative de moins de quinze jours, gratuit en ligne ; déclaration de cession sur le cerfa 15776 ; pièce d'identité. Vous informez ensuite votre assureur.",
        ],
      },
      {
        title: 'Ce qui détermine le prix d\'une voiture en panne',
        paragraphs: [
          "La nature de la panne d'abord : une panne électrique ou une batterie morte ne diminuent presque pas la valeur d'une voiture récente ; un moteur ou une boîte hors service la ramènent à sa valeur de pièces sur une voiture ancienne. L'âge et le modèle ensuite : une citadine courante de six ans en panne se répare et se revend ; une berline de dix-huit ans part à l'export ou au démontage. Enfin l'état général : carrosserie, intérieur, kilométrage, factures d'entretien, présence du catalyseur.",
          "Nous estimons sur photos (quatre angles, compteur, intérieur, compartiment moteur), carte grise et diagnostic du garage si vous en avez un ; l'offre est ferme dans la journée et ne change pas le jour de l'enlèvement. Si la voiture ne vaut plus rien, nous le disons, et nous proposons l'enlèvement gratuit pour destruction.",
        ],
        list: [
          "Photos : quatre angles, compteur, intérieur, compartiment moteur.",
          "Carte grise, certificat de situation administrative, pièce d'identité.",
          "Diagnostic ou devis du garage, factures d'entretien.",
          "Déclaration de cession remplie sur place et déclarée en ligne.",
        ],
      },
      {
        title: 'La voiture est dans la rue : ne pas attendre',
        paragraphs: [
          "Une voiture en panne laissée sur la voie publique est en stationnement abusif au-delà de sept jours consécutifs au même point, même correctement garée : elle peut être mise en fourrière, et les frais d'enlèvement et de garde restent dus même si vous ne la récupérez jamais. Une voiture en panne dans la rue se vend donc vite : offre dans la journée, enlèvement sous 24 à 48 heures, souvent le jour même en petite couronne.",
        ],
      },
      {
        title: 'La voiture est au parking, chez le garagiste, au pavillon',
        paragraphs: [
          "Au parking souterrain d'une résidence, nous la remontons au treuil ou sur chariots jusqu'au plateau resté dans la rue, en coordination avec le gardien ou le syndic. Chez le garagiste qui a posé le diagnostic, nous convenons du créneau avec lui, après règlement de ce qui lui est dû. Dans l'allée d'un pavillon de grande couronne, nous la treuillons depuis le portail. Dans tous les cas, l'enlèvement d'un véhicule qui ne démarre pas fait partie de l'offre, sans supplément, dans les huit départements.",
        ],
      },
      {
        title: 'Le jour du rachat',
        paragraphs: [
          "Nous vérifions les documents, nous remplissons la déclaration de cession avec vous, nous payons avant le chargement — par virement immédiat ou selon le mode convenu au moment de l'offre — et nous treuillons la voiture sur le plateau. La déclaration de cession est enregistrée en ligne par nos soins ; vous gardez votre exemplaire et le coupon détachable de la carte grise, et vous prévenez votre assureur.",
          "Retirez auparavant vos effets personnels, le badge de télépéage et la vignette Crit'Air, et laissez la carte SD ou le code autoradio si vous les avez : ils font partie du véhicule vendu.",
        ],
      },
    ],
    faq: [
      { question: "Ma voiture ne démarre plus, puis-je la vendre ?", answer: "Oui, à un professionnel de l'automobile : un véhicule qui n'est plus en état de rouler ne peut pas être vendu à un particulier. La vente est dispensée de contrôle technique." },
      { question: "Que vaut une voiture en panne ?", answer: "Cela dépend de la panne, de l'âge, du modèle et de l'état général : une panne électrique sur une voiture récente pèse peu ; un moteur HS sur une voiture ancienne ramène à la valeur des pièces. Offre ferme dans la journée sur photos et carte grise." },
      { question: "La voiture est dans la rue depuis une semaine, est-ce un problème ?", answer: "Oui : au-delà de sept jours consécutifs au même point, elle est en stationnement abusif et peut partir en fourrière, avec des frais dus. Nous l'enlevons sous 24 à 48 heures après l'offre." },
      { question: "L'enlèvement est-il compris dans l'offre ?", answer: "Oui, dans les huit départements, au parking, dans la rue, chez le garagiste ou au pavillon, sans supplément." },
      { question: "Quels documents ?", answer: "Carte grise barrée et signée, pièce d'identité, certificat de situation administrative de moins de quinze jours ; nous remplissons la déclaration de cession sur place." },
      { question: "Et si elle ne vaut plus rien ?", answer: "Nous le disons dès l'estimation et proposons l'enlèvement gratuit avec certificat de destruction par un centre VHU agréé." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-17e' },
      { deptSlug: 'val-de-marne-94', slug: 'champigny-sur-marne' },
      { deptSlug: 'essonne-91', slug: 'massy' },
    ],
    sources: ['SP_NON_ROULANT', 'SP_CT', 'SP_VHU', 'CR_R417_12'],
  },
  {
    slug: 'fort-kilometrage',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat de voiture à fort kilométrage en Île-de-France",
    metaTitle: 'Rachat voiture fort kilométrage en IDF',
    description: "200 000, 300 000 km et plus : ce que vaut une voiture à fort kilométrage en Île-de-France, qui l'achète (export, pièces), offre sur photos.",
    label: 'Fort kilométrage',
    intro: [
      "Les trajets franciliens font des kilomètres : 40 000 par an pour un chauffeur VTC de Roissy, 30 000 pour un cadre qui fait Mantes–La Défense, 25 000 pour un commercial qui couvre les huit départements. À dix ans, la voiture affiche 300 000 km, et les concessions ne veulent plus la reprendre — ou à un prix symbolique. Pourtant, elle roule, elle a ses factures, et elle vaut plus que ce qu'on vous en propose.",
      "Cette page explique qui achète les voitures à fort kilométrage, ce qui fait leur prix, pourquoi les factures d'entretien comptent plus que le compteur, et comment nous les reprenons en Île-de-France, avec ou sans contrôle technique, en l'état.",
    ],
    sections: [
      {
        title: 'Qui achète une voiture de 300 000 km ?',
        paragraphs: [
          "Deux marchés. L'export d'abord : les berlines et breaks diesel européens à fort kilométrage sont recherchés hors de France, où le kilométrage inquiète moins que l'état mécanique et où les pièces sont disponibles. Le réemploi ensuite : une voiture entretenue fournit un moteur, une boîte, une électronique et des éléments de carrosserie qui alimentent la réparation d'autres véhicules. Dans les deux cas, l'acheteur est un professionnel, et c'est à un professionnel que vous vendez — ce qui vous dispense du contrôle technique de moins de six mois exigé pour une vente à un particulier.",
        ],
      },
      {
        title: 'Ce qui fait le prix : l\'entretien, pas le compteur',
        paragraphs: [
          "Un kilométrage élevé n'est pas une panne. Ce qui compte, c'est la façon dont ces kilomètres ont été faits — autoroute ou ville — et surtout la façon dont la voiture a été entretenue : vidanges régulières, distribution remplacée à l'échéance, embrayage changé, factures à l'appui. Une berline de 280 000 km avec un carnet complet vaut davantage qu'une voiture de 150 000 km sans historique. Viennent ensuite le modèle (les moteurs réputés endurants se vendent mieux), l'état de la carrosserie et de l'intérieur, et l'absence de voyants allumés.",
          "Envoyez la carte grise, le compteur, les factures d'entretien et des photos ; nous répondons dans la journée par une offre ferme, qui ne change pas le jour de l'enlèvement. Si la voiture a un défaut — turbo fatigué, boîte qui accroche —, dites-le : nous préférons le savoir avant, et l'offre en tient compte sans surprise.",
        ],
        list: [
          "Carte grise, certificat de situation administrative de moins de quinze jours, pièce d'identité.",
          "Factures d'entretien, carnet, procès-verbal du dernier contrôle technique s'il existe.",
          "Photos : quatre angles, compteur, intérieur, compartiment moteur.",
          "Déclaration de cession remplie sur place et déclarée en ligne.",
        ],
      },
      {
        title: 'Chauffeurs VTC, taxis, commerciaux, artisans',
        paragraphs: [
          "Une part importante des voitures à fort kilométrage que nous rachetons en Île-de-France sont des outils de travail : berlines de VTC autour de Roissy et d'Orly, taxis, voitures de commerciaux, utilitaires d'artisans. Pour un professionnel, la facture est établie à son nom (extrait Kbis ou justificatif SIRENE), le rendez-vous s'adapte aux horaires — tôt le matin, tard le soir — et la reprise peut coïncider avec la livraison du véhicule suivant. Pour un salarié qui rachète sa voiture de fonction en fin de contrat, nous intervenons dès que la carte grise est à son nom.",
        ],
      },
      {
        title: 'Avec ou sans contrôle technique, roulante ou non',
        paragraphs: [
          "Vendue à un professionnel, la voiture n'a pas besoin d'un contrôle technique de moins de six mois ; un contrôle refusé réduit l'offre sans l'annuler. Si la voiture ne roule plus — moteur ou boîte HS à 350 000 km —, la règle change de nature : un véhicule non roulant ne peut être vendu qu'à un professionnel, dans tous les cas, et sa valeur devient celle de ses pièces ; nous vous le disons franchement, et nous l'enlevons au treuil sans supplément.",
        ],
      },
      {
        title: 'Le rachat, concrètement',
        paragraphs: [
          "Offre dans la journée, rendez-vous à domicile, sur le parking de l'entreprise ou près de la gare, dans les huit départements ; vérification des documents, déclaration de cession, paiement avant le chargement par virement immédiat ou selon le mode convenu au moment de l'offre. Vous gardez votre exemplaire de la déclaration et le coupon détachable de la carte grise, et vous informez votre assureur. Pour une voiture Crit'Air 3 de petite couronne, le fort kilométrage et la ZFE se cumulent : sa valeur est celle de l'export, et c'est précisément le marché que nous servons.",
        ],
      },
    ],
    faq: [
      { question: "Ma voiture a 300 000 km, vaut-elle encore quelque chose ?", answer: "Oui si elle est complète, roulante et entretenue : les voitures à fort kilométrage se vendent à l'export et pour le réemploi. Les factures d'entretien comptent plus que le compteur." },
      { question: "La concession refuse de la reprendre, pourquoi l'achèteriez-vous ?", answer: "Parce que nos débouchés ne sont pas les mêmes : export et réemploi de pièces, où un kilométrage élevé sur une mécanique saine n'est pas un obstacle." },
      { question: "Faut-il un contrôle technique ?", answer: "Non : la vente à un professionnel en est dispensée ; un contrôle refusé réduit l'offre sans l'annuler." },
      { question: "Je suis chauffeur VTC, la facture peut-elle être à mon nom professionnel ?", answer: "Oui, sur extrait Kbis ou justificatif SIRENE ; le rendez-vous s'adapte à vos horaires." },
      { question: "La voiture a le moteur cassé à 350 000 km, est-elle vendable ?", answer: "Oui, à un professionnel uniquement, pour la valeur de ses pièces ; nous l'enlevons au treuil sans supplément et le disons franchement dès l'estimation." },
      { question: "Comment obtenir une offre ?", answer: "Envoyez carte grise, compteur, factures d'entretien et photos par WhatsApp ; l'offre est ferme dans la journée et ne change pas le jour de l'enlèvement." },
    ],
    towns: [
      { deptSlug: 'val-d-oise-95', slug: 'goussainville' },
      { deptSlug: 'essonne-91', slug: 'athis-mons' },
      { deptSlug: 'yvelines-78', slug: 'mantes-la-ville' },
    ],
    sources: ['SP_CT', 'SP_NON_ROULANT', 'SP_CSA', 'MGP_ZFE'],
  },
  {
    slug: 'utilitaire',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat d'utilitaire en Île-de-France : fourgon, camionnette, pick-up",
    metaTitle: 'Rachat utilitaire en IDF : fourgon, van',
    description: "Fourgon d'artisan, camionnette, pick-up, flotte jusqu'à 3,5 t : estimation sur photos, facture au nom de la société, enlèvement sur site en IDF.",
    label: 'Utilitaire',
    intro: [
      "L'utilitaire est l'outil de travail de l'Île-de-France : fourgons d'artisans du bâtiment, camionnettes de livraison du dernier kilomètre, pick-up de paysagistes, fourgonnettes de commerçants des marchés, flottes de sociétés de logistique de Roissy, de Gennevilliers ou de Sénart. Quand il est remplacé — fin de leasing, changement d'activité, passage à un modèle plus récent ou électrique —, l'ancien reste sur le site et prend de la place.",
      "Nous rachetons les utilitaires jusqu'à 3,5 tonnes dans les huit départements, roulants ou non, avec ou sans contrôle technique, avec une facture au nom de la société et un enlèvement sur site. Cette page précise ce qui fait la valeur d'un utilitaire, ce qui change pour une entreprise, et comment traiter un lot.",
    ],
    sections: [
      {
        title: 'Ce qui fait la valeur d\'un utilitaire d\'occasion',
        paragraphs: [
          "Un utilitaire se juge à son usage plus qu'à son âge. Le kilométrage compte moins que l'entretien : un fourgon de 250 000 km suivi en concession, avec ses factures, se vend à l'export ou à un artisan ; un fourgon de 120 000 km négligé, au moteur fatigué, vaut moins. La charge utile, la longueur et la hauteur (L1H1, L2H2…), la présence d'une porte latérale, d'un hayon ou d'un groupe froid, et l'état du plateau de chargement pèsent aussi. Enfin, la motorisation et la vignette Crit'Air : un utilitaire Crit'Air 2 récent garde un marché local ; un Crit'Air 3 ou 4 part plutôt en grande couronne ou à l'export.",
          "Envoyez la carte grise, le kilométrage, les factures et des photos — extérieur, cabine, espace de chargement, compteur — et nous répondons dans la journée par une offre ferme. Un aménagement fixe (rayonnages, plancher, cellule) est estimé avec le véhicule ; un groupe froid ou une caisse isotherme nous est signalé à l'avance.",
        ],
      },
      {
        title: 'Vendre un utilitaire de société : les documents',
        paragraphs: [
          "Lorsque la carte grise est au nom d'une personne morale, la cession est signée par le représentant légal ou par une personne munie d'un pouvoir : extrait Kbis récent, pièce d'identité du signataire, pouvoir le cas échéant. Pour un artisan, l'extrait du répertoire des métiers ou le justificatif SIRENE joue le même rôle. Le certificat de situation administrative de moins de quinze jours est demandé pour chaque immatriculation : il révèle un gage de crédit-bail — fréquent sur les utilitaires financés — qui n'empêche pas la cession mais implique d'avoir soldé le contrat, ou une opposition pour amendes impayées, qui la bloque tant qu'elle n'est pas levée.",
          "La facture est établie au nom de la société, avec virement sur son compte ; pour une flotte, une offre par immatriculation et un récapitulatif du lot. La vente à un professionnel est dispensée du contrôle technique.",
        ],
        list: [
          "Extrait Kbis (ou répertoire des métiers, SIRENE), pièce d'identité du signataire, pouvoir.",
          "Carte grise barrée et signée, certificat de situation administrative de moins de quinze jours par véhicule.",
          "Factures d'entretien, photos extérieur/cabine/chargement/compteur.",
          "Contrat de crédit-bail soldé et gage levé, le cas échéant.",
        ],
      },
      {
        title: 'Fin de leasing, LOA, LLD',
        paragraphs: [
          "Un utilitaire en location longue durée appartient au loueur : il ne peut pas être vendu par le locataire. En location avec option d'achat, l'ordre des opérations compte : vous levez l'option, la carte grise passe au nom de la société, puis nous rachetons le véhicule ; nous pouvons chiffrer l'offre avant que vous ne leviez l'option, pour savoir si l'opération vaut la peine. Le gage inscrit par l'organisme financier est levé une fois le contrat soldé, et un nouveau certificat de situation administrative le confirme.",
        ],
      },
      {
        title: 'Utilitaire non roulant, sans contrôle technique, à fort kilométrage',
        paragraphs: [
          "Un utilitaire qui ne roule plus ne peut être vendu qu'à un professionnel : nous le reprenons pour la valeur de ce qui reste et l'enlevons au treuil sur site, sans supplément. Un utilitaire sans contrôle technique se vend à un professionnel sans contrôle ; un contrôle refusé réduit l'offre sans l'annuler. Un utilitaire à 300 000 km entretenu se vend à l'export. Un utilitaire incomplet, brûlé ou très corrodé n'a plus de valeur marchande : nous le disons, et nous proposons l'enlèvement gratuit avec certificat de destruction.",
        ],
      },
      {
        title: 'Enlèvement sur site, en tournée',
        paragraphs: [
          "Nous venons sur le site de l'entreprise, à l'atelier de l'artisan, sur le parking de la résidence ou au dépôt, hors des heures de chargement pour les plateformes logistiques, avec l'autorisation d'accès si nécessaire ; plusieurs véhicules sont repris en une ou plusieurs tournées, la reprise pouvant coïncider avec la livraison des nouveaux véhicules. Vidange préalable de l'outillage et des marchandises ; les aménagements fixes partent avec le véhicule, sauf si vous préférez les déposer. Paiement avant le chargement, déclaration de cession par véhicule enregistrée en ligne.",
        ],
      },
    ],
    faq: [
      { question: "Rachetez-vous les utilitaires d'entreprise ?", answer: "Oui, jusqu'à 3,5 tonnes, dans les huit départements : offre par immatriculation, facture au nom de la société, enlèvement sur site hors des heures de quai." },
      { question: "Quels documents pour un utilitaire au nom d'une société ?", answer: "Extrait Kbis récent, pièce d'identité du signataire ou pouvoir, carte grise barrée et signée, certificat de situation administrative de moins de quinze jours ; la vente à un professionnel est dispensée de contrôle technique." },
      { question: "Mon fourgon est encore en LOA, puis-je le vendre ?", answer: "Après avoir levé l'option d'achat et obtenu la carte grise au nom de la société ; nous pouvons chiffrer l'offre avant, pour décider si l'opération vaut la peine. Un véhicule en LLD appartient au loueur." },
      { question: "Un fourgon de 280 000 km vaut-il quelque chose ?", answer: "Oui s'il est complet et entretenu : les utilitaires à fort kilométrage se vendent à l'export ; les factures améliorent l'offre." },
      { question: "Faut-il retirer les rayonnages ?", answer: "Non, les aménagements fixes sont estimés avec le véhicule ; déposez-les seulement si vous souhaitez les récupérer, et signalez un groupe froid à l'avance." },
      { question: "L'utilitaire ne roule plus, est-ce un problème ?", answer: "Non : il est repris pour la valeur de ce qui reste et enlevé au treuil sur site ; s'il n'a plus de valeur, nous proposons l'enlèvement gratuit avec certificat de destruction." },
    ],
    towns: [
      { deptSlug: 'val-d-oise-95', slug: 'st-ouen-l-aumone' },
      { deptSlug: 'seine-et-marne-77', slug: 'mitry-mory' },
      { deptSlug: 'hauts-de-seine-92', slug: 'gennevilliers' },
    ],
    sources: ['SP_CT', 'SP_CSA', 'SP_GAGE', 'SP_NON_ROULANT'],
  },
  {
    slug: 'voiture-non-roulante',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat de voiture non roulante en Île-de-France",
    metaTitle: 'Rachat voiture non roulante en IDF',
    description: "Une voiture qui ne roule plus ne peut être vendue qu'à un professionnel : la règle, ce qu'elle vaut encore, comment nous l'enlevons en IDF.",
    label: 'Voiture non roulante',
    intro: [
      "« Non roulante » recouvre des réalités très différentes : la voiture qui ne démarre plus depuis deux hivers au fond d'un parking, celle dont la boîte est bloquée, celle dont le contrôle technique a relevé une défaillance critique et qui n'a plus le droit de circuler, celle dont le moteur est cassé chez le garagiste. Toutes ont un point commun en droit : elles ne peuvent pas être vendues à un particulier.",
      "Cette page explique cette règle, ce qu'elle implique pour vous, ce qu'une voiture non roulante vaut encore selon les cas, et comment nous l'enlevons en Île-de-France — au parking, dans la rue, chez le garagiste — l'enlèvement étant compris dans l'offre.",
    ],
    sections: [
      {
        title: 'La règle : vente réservée aux professionnels',
        paragraphs: [
          "La démarche officielle est sans ambiguïté : un véhicule — voiture, camionnette, moto — « qui n'est plus en état de rouler ne peut pas être vendu à un particulier », même partiellement, même pour pièces. La vente est réservée aux professionnels de l'automobile ; si le véhicule n'a plus de valeur, il doit être remis à un centre VHU agréé. Il n'existe pas non plus de carte grise portant la mention « véhicule non roulant » : le véhicule reste immatriculé normalement jusqu'à sa cession ou sa destruction.",
          "La vente à un professionnel est par ailleurs dispensée du contrôle technique de moins de six mois exigé pour une vente à un particulier. Les autres pièces de la cession restent dues : carte grise barrée « Vendu le … », datée et signée ; certificat de situation administrative de moins de quinze jours ; déclaration de cession sur le cerfa 15776.",
        ],
      },
      {
        title: 'Non roulante ne veut pas dire sans valeur',
        paragraphs: [
          "Une voiture qui ne démarre plus à cause d'une batterie, d'un démarreur ou d'une panne électrique vaut presque autant qu'une voiture roulante, surtout si elle est récente. Une voiture immobilisée par une défaillance critique au contrôle technique — freins, direction — se répare et se revend si elle est courante. Une voiture à moteur ou boîte HS vaut ses pièces et l'export. Une voiture immobilisée depuis des années, aux pneus craquelés et à la batterie morte, vaut son état mécanique réel, que l'immobilisation n'a pas forcément dégradé.",
          "Nous estimons sur photos (quatre angles, compteur, intérieur, compartiment moteur), carte grise, kilométrage et diagnostic du garage si vous en avez un ; l'offre est ferme dans la journée. Si la voiture est incomplète, corrodée ou très ancienne, elle n'a plus de valeur marchande : nous le disons, et nous proposons l'enlèvement gratuit pour destruction, avec certificat.",
        ],
        list: [
          "Panne électrique, batterie, démarreur : valeur proche d'une voiture roulante.",
          "Défaillance critique au contrôle technique : réparable, valeur selon le modèle.",
          "Moteur ou boîte HS : valeur des pièces et de l'export.",
          "Immobilisée depuis des années : valeur de l'état mécanique réel.",
          "Incomplète, corrodée, très ancienne : enlèvement gratuit pour destruction.",
        ],
      },
      {
        title: 'Défaillance critique : la voiture ne doit plus rouler',
        paragraphs: [
          "Lorsque le contrôle technique relève une défaillance critique, l'autorisation de circuler cesse le jour même : la voiture ne doit plus prendre la route, même pour aller chez un acheteur. Elle est enlevée sur plateau, depuis le centre de contrôle si vous y êtes encore, ou depuis chez vous. L'enlèvement fait partie de notre offre ; ne prenez pas le risque de rouler avec.",
        ],
      },
      {
        title: 'Où et comment nous l\'enlevons',
        paragraphs: [
          "Au parking souterrain d'une résidence, la voiture est remontée au treuil et sur chariots jusqu'au plateau resté dans la rue, avec le gardien ou le syndic. Dans la rue, elle est treuillée depuis sa place — vite, car au-delà de sept jours consécutifs au même point elle est en stationnement abusif et peut partir en fourrière. Chez le garagiste, nous convenons du créneau avec lui après règlement de ce qui lui est dû. Au pavillon, depuis l'allée ou le portail. Dans les huit départements, sans supplément.",
        ],
      },
      {
        title: 'Paiement et déclaration',
        paragraphs: [
          "Le paiement a lieu avant le chargement, par virement immédiat ou selon le mode convenu au moment de l'offre ; la déclaration de cession est remplie avec vous et enregistrée en ligne par nos soins, et vous conservez votre exemplaire ainsi que le coupon détachable de la carte grise. Vous informez ensuite votre assureur de la vente. Nous n'achetons jamais une voiture non roulante « pour la revendre à un particulier » : elle est réparée par un professionnel et contrôlée, exportée, ou démontée.",
        ],
      },
    ],
    faq: [
      { question: "Puis-je vendre ma voiture non roulante à un particulier ?", answer: "Non : un véhicule qui n'est plus en état de rouler ne peut être vendu qu'à un professionnel de l'automobile ; sinon, il doit être remis à un centre VHU agréé." },
      { question: "Faut-il un contrôle technique ?", answer: "Non : la vente à un professionnel en est dispensée." },
      { question: "Que vaut une voiture qui ne démarre plus ?", answer: "Cela dépend de la cause : une panne électrique pèse peu, un moteur HS ramène à la valeur des pièces. Offre ferme dans la journée sur photos, carte grise et diagnostic." },
      { question: "La voiture a une défaillance critique au contrôle technique, puis-je la conduire jusqu'à vous ?", answer: "Non : l'autorisation de circuler cesse le jour du contrôle. Nous venons la chercher sur plateau, l'enlèvement est compris." },
      { question: "L'enlèvement est-il facturé ?", answer: "Non, il fait partie de l'offre, au parking, dans la rue, chez le garagiste ou au pavillon, dans les huit départements." },
      { question: "Et si elle ne vaut plus rien ?", answer: "Nous le disons dès l'estimation et proposons l'enlèvement gratuit avec certificat de destruction par un centre VHU agréé." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-13e' },
      { deptSlug: 'seine-saint-denis-93', slug: 'bondy' },
      { deptSlug: 'val-d-oise-95', slug: 'cergy' },
    ],
    sources: ['SP_NON_ROULANT', 'SP_CT', 'SP_VHU', 'CR_R417_12'],
  },
  {
    slug: 'succession',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Rachat de la voiture d'un parent décédé en Île-de-France",
    metaTitle: 'Rachat voiture succession en IDF',
    description: "Vendre la voiture d'une personne décédée en Île-de-France : documents des héritiers, pas de carte grise intermédiaire, estimation sur photos.",
    label: 'Succession',
    intro: [
      "La voiture d'un parent est souvent la mieux entretenue de la famille : peu de kilomètres, un carnet à jour, un garage. Quand vient le moment de régler la succession, les héritiers se demandent s'ils peuvent la vendre sans passer par une immatriculation à leur nom, quels documents fournir, et comment répartir le prix. En Île-de-France, où la voiture attend souvent au parking d'une résidence dont la place doit être libérée, la réponse est attendue vite.",
      "Cette page décrit la démarche officielle pour les héritiers qui ne conservent pas le véhicule, les documents selon qu'un notaire intervient ou non, la façon dont nous estimons et payons, et les cas où la voiture relève plutôt d'un enlèvement gratuit.",
    ],
    sections: [
      {
        title: 'Vendre sans mettre la carte grise au nom d\'un héritier',
        paragraphs: [
          "Lorsque les héritiers ne conservent pas le véhicule, ils le cèdent directement : « le certificat d'immatriculation n'est pas modifié au nom d'un héritier avant la vente ». Ils remettent à l'acquéreur la déclaration de cession signée en leur nom, avec leurs adresses, la carte grise du défunt barrée avec la mention « Vendu le (jour/mois/année) » et signée par les héritiers, un certificat de situation administrative de moins de quinze jours, et un justificatif de la succession.",
          "Ce justificatif est l'un des suivants : une attestation du notaire certifiant l'identité du défunt et la présence du véhicule dans la succession ; un acte de notoriété ; ou l'acte de décès accompagné d'une attestation signée de tous les héritiers certifiant qu'il n'existe ni testament, ni autre héritier, ni contrat de mariage, ni contestation. Pour une voiture de valeur modeste, cette dernière option évite souvent de mobiliser le notaire.",
        ],
        list: [
          "Déclaration de cession cerfa 15776 au nom des héritiers, avec leurs adresses.",
          "Carte grise barrée « Vendu le … » et signée par les héritiers, ou déclaration de perte.",
          "Certificat de situation administrative de moins de quinze jours.",
          "Attestation du notaire, acte de notoriété, ou acte de décès + attestation de tous les héritiers.",
          "Pièce d'identité de l'héritier signataire ; procurations des autres.",
        ],
      },
      {
        title: 'Plusieurs héritiers, héritier éloigné, notaire',
        paragraphs: [
          "Tous les héritiers signent la déclaration de cession et la carte grise, ou l'un d'eux signe muni des procurations des autres et de la copie de leurs pièces d'identité ; un héritier en province ou à l'étranger n'a pas à se déplacer, et nous envoyons les documents à signer à l'avance. Le paiement est versé sur le compte indiqué par les héritiers — compte de la succession chez le notaire, ou compte d'un héritier mandaté —, et nous transmettons au notaire, sur demande, la déclaration de cession qui atteste que le véhicule est sorti de l'actif.",
          "Un point de vigilance : si la vente intervient rapidement après le décès, la démarche officielle prévoit une attestation sur l'honneur certifiant que le véhicule n'a pas circulé sur la voie publique depuis le décès ; nous vous indiquons si elle est nécessaire dans votre cas.",
        ],
      },
      {
        title: 'Ce que vaut la voiture d\'un parent',
        paragraphs: [
          "Souvent davantage qu'on ne le croit : une citadine ou une berline de dix à quinze ans, peu kilométrée, entretenue, avec son carnet, trouve preneur rapidement, et notre offre le reflète. Nous estimons sur photos, carte grise et carnet d'entretien, dans la journée, et l'offre ne change pas le jour du rendez-vous. Le contrôle technique n'est pas nécessaire pour une vente à un professionnel ; s'il est récent, il aide.",
          "À l'inverse, une voiture immobilisée depuis des années, incomplète ou corrodée n'a plus de valeur marchande : nous le disons sans détour, et nous proposons l'enlèvement gratuit pour destruction avec certificat, que nous décrivons sur notre page consacrée à l'enlèvement dans le cadre d'une succession. Une famille en deuil n'a pas besoin d'un vendeur : elle a besoin d'une réponse claire.",
        ],
      },
      {
        title: 'Carte grise introuvable, gage, opposition, assurance',
        paragraphs: [
          "La carte grise du défunt est souvent introuvable : une déclaration de perte établie par un héritier la remplace, avec le justificatif de succession. Le certificat de situation administrative, obtenu en ligne à partir de l'immatriculation, révèle un éventuel gage — la cession reste possible, mais l'organisme de crédit doit être informé et le solde réglé par la succession — ou une opposition, par exemple pour des amendes impayées, qui doit être levée avant la vente. L'assurance du défunt est informée du décès puis de la vente, et le trop-perçu de cotisation est remboursé.",
        ],
      },
      {
        title: 'Le jour du rendez-vous',
        paragraphs: [
          "Au parking de la résidence avec le gardien, devant le pavillon ou le jour du vide-maison si vous le souhaitez : nous vérifions les documents, remplissons la déclaration de cession avec l'héritier présent, payons avant le chargement — par virement sur le compte indiqué, ou selon le mode convenu au moment de l'offre — et emmenons la voiture, au treuil si elle ne démarre plus. La déclaration est enregistrée en ligne par nos soins ; vous conservez votre exemplaire pour le notaire et l'assureur.",
        ],
      },
    ],
    faq: [
      { question: "Faut-il refaire la carte grise au nom d'un héritier pour vendre la voiture ?", answer: "Non : lorsque les héritiers ne conservent pas le véhicule, ils le cèdent directement, avec la déclaration de cession signée en leur nom et un justificatif de succession." },
      { question: "Quel justificatif de succession ?", answer: "Attestation du notaire mentionnant le véhicule, acte de notoriété, ou acte de décès accompagné d'une attestation signée de tous les héritiers certifiant l'absence de testament, d'autre héritier, de contrat de mariage et de contestation." },
      { question: "Nous sommes plusieurs héritiers, tous doivent-ils être présents ?", answer: "Non : un héritier signe pour les autres avec leurs procurations et la copie de leurs pièces d'identité ; nous envoyons les documents à l'avance." },
      { question: "À qui est versé le paiement ?", answer: "Sur le compte indiqué par les héritiers : compte de la succession chez le notaire ou compte d'un héritier mandaté ; nous transmettons la déclaration de cession au notaire sur demande." },
      { question: "La carte grise est introuvable, que faire ?", answer: "Une déclaration de perte établie par un héritier la remplace ; le certificat de situation administrative s'obtient en ligne à partir de l'immatriculation." },
      { question: "Faut-il un contrôle technique ?", answer: "Non pour une vente à un professionnel ; un contrôle récent aide l'offre." },
    ],
    towns: [
      { deptSlug: 'yvelines-78', slug: 'le-chesnay-rocquencourt' },
      { deptSlug: 'val-d-oise-95', slug: 'pontoise' },
      { deptSlug: 'hauts-de-seine-92', slug: 'neuilly-sur-seine' },
    ],
    sources: ['SP_HERITAGE', 'SP_CSA', 'SP_GAGE', 'SP_CT'],
  },
  {
    slug: 'vehicule-gage',
    service: 'rachat-voiture',
    updatedAt: '2026-09-20',
    title: "Vendre une voiture gagée ou sous opposition en Île-de-France",
    metaTitle: 'Vendre une voiture gagée en IDF',
    description: "Gage de crédit, opposition du Trésor public, saisie, opposition d'expert : ce qui empêche ou non la vente d'une voiture en Île-de-France.",
    label: 'Véhicule gagé',
    intro: [
      "Le certificat de situation administrative de votre voiture mentionne un gage, ou une opposition au transfert du certificat d'immatriculation. Pouvez-vous la vendre quand même ? Tout dépend de la mention. Un gage de crédit et une opposition n'ont pas les mêmes effets, et une opposition d'expert après un accident n'a pas les mêmes effets qu'une opposition du Trésor public pour des amendes impayées.",
      "Cette page reprend ce que prévoit la démarche officielle pour chaque cas, explique comment nous lisons votre certificat de situation administrative avant de faire une offre, et ce qu'il faut régler — et auprès de qui — avant qu'un rachat soit possible en Île-de-France.",
    ],
    sections: [
      {
        title: 'Gage : la vente reste possible, le crédit doit être soldé',
        paragraphs: [
          "Un gage est une garantie prise sur le véhicule par l'organisme qui a financé son achat. La démarche officielle le dit : « la présence d'un gage n'empêche pas la vente du véhicule ». Mais tant que le crédit n'est pas intégralement remboursé, l'organisme financier ne lève pas le gage, et le certificat de situation administrative continue de le mentionner ; l'acquéreur professionnel en tiendra compte. Une société de crédit-bail peut parfois autoriser la vente si le nouveau propriétaire reprend le solde, mais c'est l'exception.",
          "Concrètement, pour un rachat : vous demandez à votre prêteur le solde de remboursement anticipé, vous le réglez — l'offre de rachat peut y contribuer —, vous obtenez la levée du gage, et un nouveau certificat de situation administrative sans mention confirme que le véhicule est libre. Nous chiffrons l'offre avant, pour que vous sachiez si l'opération a un sens.",
        ],
      },
      {
        title: 'Opposition : rien ne bouge tant qu\'elle n\'est pas levée',
        paragraphs: [
          "Une opposition au transfert du certificat d'immatriculation bloque tout changement de propriétaire : « la vente du véhicule ne peut pas avoir lieu tant qu'il n'est pas mis fin à l'opposition ». Elle peut émaner du Trésor public pour des amendes impayées, d'un commissaire de justice dans le cadre d'une saisie, d'un expert automobile après un accident, ou des autorités lorsque le véhicule figure au fichier des véhicules volés. La lever dépend de son origine : payer les amendes et obtenir la mainlevée, régler la saisie, faire mettre à jour le fichier après restitution d'un véhicule volé.",
          "Nous ne pouvons pas racheter un véhicule sous opposition non levée, et aucun professionnel ne le peut : la déclaration de cession serait refusée. Le certificat de situation administrative indique l'autorité à l'origine de l'opposition ; c'est auprès d'elle que la démarche se fait.",
        ],
        list: [
          "Gage de crédit : vente possible, crédit à solder pour obtenir la levée.",
          "Opposition du Trésor public (amendes) : payer et obtenir la mainlevée.",
          "Saisie par un commissaire de justice : régler avec lui.",
          "Véhicule signalé volé : mise à jour du fichier après restitution.",
          "Opposition d'expert (VE/VEI) : cession en l'état possible à un professionnel — voir ci-dessous.",
        ],
      },
      {
        title: 'L\'exception : l\'opposition d\'expert après un accident',
        paragraphs: [
          "Lorsque l'expert a déclaré le véhicule économiquement irréparable ou gravement endommagé, la préfecture inscrit une opposition au transfert — mais celle-ci « ne fait pas obstacle à la cession en l'état de votre véhicule endommagé à un professionnel de l'automobile ou à votre assureur ». Un VEI ne peut être cédé qu'à un démolisseur ; un véhicule endommagé réparable peut être cédé à un professionnel qui le remettra en état et le fera ré-expertiser. Nous rachetons ces véhicules en l'état, sur photos et rapport d'expertise, pour la valeur de ce qui reste.",
        ],
      },
      {
        title: 'Lire son certificat de situation administrative',
        paragraphs: [
          "Le certificat s'obtient gratuitement et immédiatement en ligne, à partir de l'immatriculation et des informations du titulaire ; il doit dater de moins de quinze jours au moment de la cession. C'est la première chose que nous vous demandons : il nous dit si le rachat est possible tout de suite, après une démarche, ou pas du tout, et il vous évite un rendez-vous inutile. Une fois la levée obtenue, un nouveau certificat vierge permet la vente, avec la carte grise barrée et signée, votre pièce d'identité et la déclaration de cession.",
        ],
      },
      {
        title: 'Ce que nous faisons, et ce que nous refusons',
        paragraphs: [
          "Nous lisons le certificat avec vous, nous chiffrons l'offre sur photos et carte grise avant toute démarche, nous vous disons exactement ce qu'il reste à régler, et nous revenons dès que le véhicule est libre. Nous refusons d'acheter un véhicule sous opposition « en attendant » : ce serait irrégulier pour vous comme pour nous, et le véhicule resterait à votre nom, avec ses amendes futures. Si le véhicule ne vaut plus rien une fois libre, nous proposons l'enlèvement gratuit pour destruction, avec certificat.",
        ],
      },
    ],
    faq: [
      { question: "Ma voiture est gagée, puis-je la vendre ?", answer: "La présence d'un gage n'empêche pas la vente, mais l'organisme financier ne lève le gage qu'une fois le crédit remboursé : demandez le solde de remboursement anticipé, réglez-le, obtenez la levée, puis un nouveau certificat de situation administrative." },
      { question: "Quelle différence entre gage et opposition ?", answer: "Le gage est une garantie du prêteur qui n'empêche pas la vente ; l'opposition (Trésor public, commissaire de justice, expert, véhicule volé) bloque tout changement de propriétaire tant qu'elle n'est pas levée." },
      { question: "J'ai une opposition pour amendes impayées, pouvez-vous racheter la voiture ?", answer: "Pas avant la levée : réglez les amendes auprès du comptable public, obtenez la mainlevée, demandez un nouveau certificat de situation administrative ; nous revenons dès qu'il est vierge." },
      { question: "L'expert a mis une opposition après un accident, la vente est-elle bloquée ?", answer: "Non pour un professionnel : cette opposition ne fait pas obstacle à la cession en l'état à un professionnel de l'automobile ou à l'assureur ; nous rachetons en l'état sur photos et rapport d'expertise." },
      { question: "Comment savoir si mon véhicule est gagé ou sous opposition ?", answer: "Par le certificat de situation administrative, gratuit et immédiat en ligne, qui précise l'origine d'une éventuelle opposition ; il doit dater de moins de quinze jours au moment de la vente." },
      { question: "Pouvez-vous chiffrer l'offre avant que je solde le crédit ?", answer: "Oui, sur photos et carte grise, pour que vous sachiez si l'opération a un sens avant de régler le solde." },
    ],
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'aubervilliers' },
      { deptSlug: 'val-de-marne-94', slug: 'vitry-sur-seine' },
      { deptSlug: 'essonne-91', slug: 'evry-courcouronnes' },
    ],
    sources: ['SP_CSA', 'SP_GAGE', 'SP_VE'],
  },
];

export function getIdfIntent(service: IdfIntent['service'], slug: string): IdfIntent | undefined {
  return idfIntents.find((i) => i.service === service && i.slug === slug);
}

export function getIdfIntents(service: IdfIntent['service']): IdfIntent[] {
  return idfIntents.filter((i) => i.service === service);
}

/** Unique-word count of the hand-written part of an intent page. */
export function intentWordCount(intent: IdfIntent): number {
  const text = [
    intent.title,
    ...intent.intro,
    ...intent.sections.flatMap((s) => [s.title, ...s.paragraphs, ...(s.list ?? [])]),
    ...intent.faq.flatMap((f) => [f.question, f.answer]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}
