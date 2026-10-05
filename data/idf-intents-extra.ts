/**
 * S3.5 — rachat × marque (10 pages) and B2B « professionnels » pages (5),
 * served by the existing IDF intent routes:
 *   /rachat-voiture/ile-de-france/marque-<brand>
 *   /epaviste/ile-de-france/pro-<segment>
 * Same template, schema, sitemap and guardrails as the situation pages
 * (900–1,400 words, 6 FAQ, 3 Tier A towns, sources). No price anywhere.
 *
 * Brand facts are limited to public, uncontroversial ones (group, origin,
 * models sold in France, fuel types, documented manufacturer programmes);
 * vehicle condition and value are always assessed on photos.
 */

import type { IdfIntent } from './idf-intents';

const UPDATED = '2026-10-05';

interface Brand {
  slug: string;
  name: string;
  /** "une Renault", "une Peugeot"… */
  une: string;
  origin: string;
  models: string[];
  /** Two brand-specific paragraphs. */
  angle: [string, string];
  /** One brand-specific question. */
  faq: { question: string; answer: string };
  towns: IdfIntent['towns'];
}

const BRANDS: Brand[] = [
  {
    slug: 'renault',
    name: 'Renault',
    une: 'une Renault',
    origin: 'constructeur français du groupe Renault, qui comprend aussi Dacia et Alpine',
    models: ['Clio', 'Mégane', 'Captur', 'Scénic et Grand Scénic', 'Twingo', 'Kangoo', 'Trafic et Master', 'Zoé'],
    angle: [
      "Renault est la marque la plus présente dans le parc francilien, des Clio de première main aux Kangoo d'artisans. Nous rachetons toutes les générations : citadines anciennes que leur propriétaire ne veut plus assurer, Mégane et Scénic familiaux très kilométrés, utilitaires Trafic et Master des entreprises.",
      "Les Renault électriques — Zoé en tête — se rachètent aussi : l'état de la batterie et le contrat associé (batterie achetée ou louée, ce qui était proposé à l'origine) comptent dans l'offre. Indiquez-le dès votre premier message, avec une photo de la carte grise.",
    ],
    faq: { question: 'Rachetez-vous les Renault Zoé ?', answer: "Oui. Précisez si la batterie a été achetée avec la voiture ou louée : cela change la démarche de cession et l'offre. Une photo du tableau de bord (autonomie, kilométrage) aide à l'estimation." },
    towns: [
      { deptSlug: 'hauts-de-seine-92', slug: 'boulogne-billancourt' },
      { deptSlug: 'yvelines-78', slug: 'sartrouville' },
      { deptSlug: 'essonne-91', slug: 'massy' },
    ],
  },
  {
    slug: 'peugeot',
    name: 'Peugeot',
    une: 'une Peugeot',
    origin: 'constructeur français, membre du groupe Stellantis depuis 2021',
    models: ['206, 207 et 208', '307 et 308', '2008', '3008', '5008', 'Partner et Rifter', 'Expert', 'Boxer'],
    angle: [
      "Des 206 qui roulent encore aux 3008 récents, Peugeot est partout en Île-de-France, et les utilitaires Partner, Expert et Boxer sont nombreux chez les artisans. Nous rachetons toutes les Peugeot, essence (PureTech, VTi), diesel (HDi, BlueHDi), hybrides ou électriques.",
      "Certains moteurs essence 1.2 PureTech ont fait l'objet d'une extension de garantie du constructeur liée à l'usure de la courroie de distribution. Si votre Peugeot est immobilisée pour cette raison, vérifiez d'abord vos droits auprès du réseau de la marque : une prise en charge peut changer votre décision. Si vous préférez vendre en l'état, nous faisons une offre sur la base de la panne déclarée.",
    ],
    faq: { question: 'Ma Peugeot PureTech a un problème de courroie, la rachetez-vous ?', answer: "Oui, en l'état. Vérifiez d'abord auprès du réseau Peugeot si votre véhicule entre dans l'extension de garantie du constructeur ; si vous vendez quand même, indiquez la panne et le kilométrage pour une offre ferme." },
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'aulnay-sous-bois' },
      { deptSlug: 'val-de-marne-94', slug: 'creteil' },
      { deptSlug: 'val-d-oise-95', slug: 'argenteuil' },
    ],
  },
  {
    slug: 'citroen',
    name: 'Citroën',
    une: 'une Citroën',
    origin: 'constructeur français, membre du groupe Stellantis depuis 2021',
    models: ['C1', 'C3', 'C3 Aircross', 'C4', 'Xsara Picasso et C4 Picasso', 'Berlingo', 'Jumpy', 'Jumper'],
    angle: [
      "Monospaces familiaux Xsara Picasso et C4 Picasso, citadines C1 et C3, ludospaces Berlingo : les Citroën que l'on nous propose en Île-de-France sont souvent des voitures de famille très kilométrées, ou des utilitaires Jumpy et Jumper en fin de carrière. Nous les rachetons roulantes ou non.",
      "Citroën partage de nombreux moteurs avec Peugeot au sein de Stellantis, notamment les essence 1.2 PureTech, dont certains ont bénéficié d'une extension de garantie du constructeur pour la courroie de distribution. En cas de panne de ce type, renseignez-vous auprès du réseau Citroën avant de vendre ; sinon, l'offre tient compte de la panne.",
    ],
    faq: { question: 'Rachetez-vous les Citroën Berlingo et Jumpy utilitaires ?', answer: "Oui, en version utilitaire comme en version particulière, aménagés ou non. Pour un utilitaire, signalez les équipements (galerie, aménagement, cloison) : ils comptent dans l'offre." },
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'montreuil' },
      { deptSlug: 'seine-et-marne-77', slug: 'chelles' },
      { deptSlug: 'essonne-91', slug: 'evry-courcouronnes' },
    ],
  },
  {
    slug: 'volkswagen',
    name: 'Volkswagen',
    une: 'une Volkswagen',
    origin: 'constructeur allemand du groupe Volkswagen, qui comprend aussi Audi, Seat, Cupra et Skoda',
    models: ['Polo', 'Golf', 'Passat', 'Touran', 'Tiguan', 'T-Roc', 'Caddy', 'Transporter'],
    angle: [
      "Golf et Polo restent parmi les occasions les plus recherchées : une Volkswagen garde souvent une valeur de pièces ou de revente même avec une grosse panne. Nous rachetons aussi les monospaces Touran, les SUV Tiguan et T-Roc, et les utilitaires Caddy et Transporter.",
      "Les moteurs diesel EA189 (1.6 et 2.0 TDI produits jusqu'en 2015) ont fait l'objet d'un rappel du constructeur après l'affaire des émissions de 2015. Si vous avez le justificatif de la mise à jour, joignez-le : un historique d'entretien complet rassure toujours l'acheteur.",
    ],
    faq: { question: 'Ma Volkswagen TDI est concernée par le rappel de 2015, est-ce un problème ?', answer: "Non pour la vente à un professionnel. Indiquez si la mise à jour du constructeur a été faite et joignez le justificatif si vous l'avez : l'historique d'entretien compte dans l'offre." },
    towns: [
      { deptSlug: 'hauts-de-seine-92', slug: 'rueil-malmaison' },
      { deptSlug: 'yvelines-78', slug: 'versailles' },
      { deptSlug: 'val-de-marne-94', slug: 'vincennes' },
    ],
  },
  {
    slug: 'toyota',
    name: 'Toyota',
    une: 'une Toyota',
    origin: 'constructeur japonais, pionnier de l’hybride avec la Prius lancée en 1997',
    models: ['Aygo', 'Yaris', 'Auris', 'Corolla', 'C-HR', 'RAV4', 'Prius', 'Proace'],
    angle: [
      "Une grande partie des Toyota d'Île-de-France sont des hybrides essence : Yaris — produite en France, à Onnaing près de Valenciennes —, Auris, Corolla, C-HR, RAV4 et Prius, très utilisées en VTC et en taxi. Elles arrivent souvent chez nous avec un kilométrage élevé, mais une mécanique hybride entretenue garde de la valeur.",
      "Pour une hybride, l'offre dépend aussi de l'état de la batterie de traction et de l'entretien suivi. Un historique dans le réseau, des factures récentes ou un contrôle de la batterie sont des atouts : joignez-les à votre demande.",
    ],
    faq: { question: 'Rachetez-vous les Toyota hybrides de VTC très kilométrées ?', answer: "Oui. Indiquez le kilométrage, l'historique d'entretien et l'état de la batterie de traction si vous l'avez fait contrôler : ce sont les trois éléments qui comptent le plus dans l'offre." },
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'st-denis' },
      { deptSlug: 'paris-75', slug: 'paris-15e' },
      { deptSlug: 'hauts-de-seine-92', slug: 'nanterre' },
    ],
  },
  {
    slug: 'dacia',
    name: 'Dacia',
    une: 'une Dacia',
    origin: 'marque roumaine du groupe Renault depuis 1999',
    models: ['Logan et Logan MCV', 'Sandero et Sandero Stepway', 'Duster', 'Lodgy', 'Dokker', 'Jogger', 'Spring'],
    angle: [
      "Sandero, Logan et Duster sont des voitures très répandues et simples, recherchées pour les pièces comme à la revente. Une Dacia de dix ans, même avec un contrôle technique refusé, intéresse souvent un professionnel : c'est l'un des cas où le rachat est plus intéressant que l'enlèvement gratuit.",
      "Dacia propose des versions GPL bicarburation (ECO-G) : un véhicule GPL relève de la vignette Crit'Air 1, ce qui le laisse circuler dans la ZFE du Grand Paris. Signalez-le, ainsi que la date de la dernière révision du réservoir GPL si vous l'avez.",
    ],
    faq: { question: 'Ma Dacia est en GPL, est-ce un avantage ?', answer: "Oui : un véhicule GPL est classé Crit'Air 1 et peut circuler dans la ZFE du Grand Paris. Indiquez-le avec la carte grise (carburant « EG » ou « GP ») pour l'estimation." },
    towns: [
      { deptSlug: 'seine-et-marne-77', slug: 'meaux' },
      { deptSlug: 'val-d-oise-95', slug: 'sarcelles' },
      { deptSlug: 'essonne-91', slug: 'corbeil-essonnes' },
    ],
  },
  {
    slug: 'ford',
    name: 'Ford',
    une: 'une Ford',
    origin: 'constructeur américain présent en Europe de longue date',
    models: ['Ka', 'Fiesta', 'Focus', 'C-Max', 'Kuga', 'Puma', 'Transit Connect et Transit Custom', 'Transit'],
    angle: [
      "Fiesta et Focus ont été des voitures très répandues en France ; la Fiesta n'est plus produite depuis 2023, ce qui n'empêche pas les exemplaires roulants de se revendre. Les utilitaires Transit, Transit Custom et Transit Connect sont nombreux chez les artisans d'Île-de-France.",
      "Pour les moteurs essence 1.0 EcoBoost et les diesels TDCi, l'historique d'entretien est déterminant dans l'offre : courroie, embrayage, vanne EGR ou filtre à particules remplacés, signalez-le. Une panne connue n'empêche pas le rachat ; elle doit simplement être décrite.",
    ],
    faq: { question: 'Rachetez-vous les Ford Transit des artisans ?', answer: "Oui, Transit, Transit Custom et Transit Connect, aménagés ou non. Pour un véhicule d'entreprise, la cession est signée par le représentant légal ; nous établissons les documents à son nom." },
    towns: [
      { deptSlug: 'val-de-marne-94', slug: 'champigny-sur-marne' },
      { deptSlug: 'seine-saint-denis-93', slug: 'noisy-le-grand' },
      { deptSlug: 'yvelines-78', slug: 'mantes-la-jolie' },
    ],
  },
  {
    slug: 'opel',
    name: 'Opel',
    une: 'une Opel',
    origin: 'constructeur allemand, membre du groupe PSA en 2017 puis de Stellantis depuis 2021',
    models: ['Corsa', 'Astra', 'Meriva', 'Zafira', 'Mokka', 'Crossland', 'Combo', 'Vivaro'],
    angle: [
      "Corsa et Astra pour la ville, Meriva et Zafira pour les familles, Vivaro et Combo pour les professionnels : les Opel que nous rachetons en Île-de-France sont variées. Les modèles récents partagent de nombreux éléments avec Peugeot et Citroën depuis l'intégration au groupe PSA puis à Stellantis.",
      "Les Zafira et Meriva anciens sont souvent proposés avec un kilométrage élevé ou un contrôle technique refusé. Ils peuvent avoir une valeur de pièces ; si ce n'est pas le cas, nous vous le disons et l'enlèvement est gratuit, avec certificat de destruction.",
    ],
    faq: { question: 'Mon Opel Zafira a un contrôle technique refusé, la rachetez-vous ?', answer: "Oui. Le contrôle technique n'est pas obligatoire pour vendre à un professionnel ; envoyez le procès-verbal du contrôle avec les photos, l'offre tient compte des défauts relevés." },
    towns: [
      { deptSlug: 'hauts-de-seine-92', slug: 'colombes' },
      { deptSlug: 'essonne-91', slug: 'athis-mons' },
      { deptSlug: 'val-d-oise-95', slug: 'cergy' },
    ],
  },
  {
    slug: 'fiat',
    name: 'Fiat',
    une: 'une Fiat',
    origin: 'constructeur italien, membre du groupe Stellantis depuis 2021',
    models: ['500', 'Panda', 'Punto', 'Tipo', '500X', 'Doblo', 'Ducato'],
    angle: [
      "La Fiat 500, relancée en 2007, et la Panda sont des citadines très présentes à Paris et en petite couronne. Le Ducato, lui, est à la fois un utilitaire d'artisan et la base de très nombreux camping-cars : nous le rachetons dans les deux versions.",
      "Pour une 500 ou une Panda ancienne, l'offre dépend surtout de l'état de la carrosserie et de l'embrayage ; pour un Ducato, du kilométrage et de l'aménagement. Un Ducato camping-car se juge aussi à sa cellule : étanchéité, plafond, plancher.",
    ],
    faq: { question: 'Rachetez-vous les camping-cars sur base Fiat Ducato ?', answer: "Oui, porteur et cellule sont estimés ensemble. Envoyez des photos de l'extérieur, de l'intérieur (plafond, angles, plancher) et du compartiment moteur." },
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-11e' },
      { deptSlug: 'hauts-de-seine-92', slug: 'issy-les-moulineaux' },
      { deptSlug: 'val-de-marne-94', slug: 'ivry-sur-seine' },
    ],
  },
  {
    slug: 'mercedes',
    name: 'Mercedes-Benz',
    une: 'une Mercedes',
    origin: 'constructeur allemand',
    models: ['Classe A', 'Classe B', 'Classe C', 'Classe E', 'GLA et GLC', 'Citan', 'Vito', 'Sprinter'],
    angle: [
      "Classe A et Classe B en ville, Classe C et Classe E pour les gros rouleurs et les VTC, Vito et Sprinter pour les professionnels : une Mercedes conserve souvent une valeur au-delà de 200 000 km si l'entretien est suivi. Nous rachetons toutes les générations, roulantes ou non.",
      "Le carnet d'entretien, les factures et l'historique de la boîte de vitesses automatique pèsent dans l'offre. Pour un Sprinter ou un Vito d'entreprise, précisez l'aménagement (frigorifique, plateau, cellule) et la carte grise (VP ou CTTE).",
    ],
    faq: { question: 'Rachetez-vous les Mercedes Classe E de VTC très kilométrées ?', answer: "Oui. Le kilométrage élevé est la règle pour ces véhicules ; joignez l'historique d'entretien et signalez les réparations récentes (boîte, turbo, suspensions)." },
    towns: [
      { deptSlug: 'hauts-de-seine-92', slug: 'neuilly-sur-seine' },
      { deptSlug: 'paris-75', slug: 'paris-16e' },
      { deptSlug: 'yvelines-78', slug: 'st-germain-en-laye' },
    ],
  },
];

/** 120–155 characters: with up to 3 models when they fit. */
function brandDescription(b: Brand): string {
  for (const n of [3, 2, 1, 0]) {
    const models = n ? ` (${b.models.slice(0, n).join(', ')}…)` : '';
    const d = `Rachat de votre ${b.name} en Île-de-France${models} : avec ou sans CT, en panne ou accidentée, offre ferme et paiement le jour même.`;
    if (d.length <= 155) return d;
  }
  return `Rachat ${b.name} en Île-de-France : avec ou sans CT, offre ferme et paiement le jour même.`;
}

function brandIntent(b: Brand): IdfIntent {
  const models = b.models.join(', ');
  return {
    slug: `marque-${b.slug}`,
    service: 'rachat-voiture',
    kind: 'marque',
    updatedAt: UPDATED,
    title: `Rachat de ${b.name} en Île-de-France : toutes les ${b.name}, même sans CT`,
    metaTitle: `Rachat ${b.name} en Île-de-France`,
    description: brandDescription(b),
    label: b.name,
    intro: [
      `Vous voulez vendre ${b.une} à Paris ou en Île-de-France, sans passer par une annonce, les essais et les négociations ? Nous rachetons les ${b.name} de tous âges et dans tous les états : roulantes ou non, avec ou sans contrôle technique, accidentées, en panne moteur ou très kilométrées. ${b.name} est un ${b.origin}.`,
      `Le principe est simple : vous décrivez le véhicule et envoyez quelques photos, nous faisons une offre ferme, puis nous venons chercher la voiture à l'adresse de votre choix dans les huit départements. Le paiement se fait le jour de l'enlèvement et la déclaration de cession est faite avec vous.`,
    ],
    sections: [
      {
        title: `Les ${b.name} que nous rachetons`,
        paragraphs: [
          `Nous rachetons toute la gamme ${b.name} que l'on croise en Île-de-France, notamment : ${models}. Les versions essence, diesel, hybrides, GPL ou électriques sont toutes concernées, comme les utilitaires immatriculés en camionnette (CTTE).`,
          ...b.angle,
        ],
      },
      {
        title: `Ce qui fait la valeur d'${b.une} d'occasion`,
        paragraphs: [
          "Cinq éléments décident de l'offre : l'année de première mise en circulation, le kilométrage, l'état mécanique (démarre, roule, panne connue), l'état de la carrosserie et de l'intérieur, et l'historique d'entretien. Le contrôle technique n'est pas obligatoire pour vendre à un professionnel ; s'il a été passé, le procès-verbal nous aide à chiffrer les réparations à prévoir.",
          "Une voiture qui ne roule plus ne peut être vendue qu'à un professionnel : c'est précisément notre métier. Si elle est complète et que ses pièces ont de la valeur, une offre est possible ; sinon, nous vous le disons franchement et proposons l'enlèvement gratuit avec certificat de destruction.",
        ],
      },
      {
        title: `Vendre ${b.une} à un particulier ou à un professionnel ?`,
        paragraphs: [
          `Entre particuliers, un véhicule de plus de quatre ans ne peut être vendu qu'avec un contrôle technique de moins de six mois ; une voiture qui ne roule plus ne peut pas être vendue à un particulier du tout. La vente à un professionnel de l'automobile échappe à ces deux contraintes : c'est la solution quand votre ${b.name} a un CT refusé, une panne ou un sinistre.`,
          `Vendre à un professionnel évite aussi l'annonce, les visites, les essais et la négociation, ainsi que le risque d'un litige pour vice caché avec un acheteur particulier. En contrepartie, l'offre tient compte des réparations que le professionnel devra engager : c'est pourquoi nous la faisons sur photos et sur une description honnête de l'état du véhicule.`,
        ],
      },
      {
        title: `${b.name} et ZFE du Grand Paris`,
        paragraphs: [
          `À l'intérieur de l'A86, les véhicules Crit'Air 3, 4, 5 et non classés ne peuvent plus circuler en semaine de 8 h à 20 h ; aucune amende n'est dressée jusqu'au 31 décembre 2026. Pour ${b.une}, la vignette se déduit du carburant et de la date de première immatriculation : un diesel immatriculé de 2006 à 2010 ou une essence de 1997 à 2005 sont Crit'Air 3 ; un diesel de 2001 à 2005 est Crit'Air 4. Ces véhicules gardent une valeur hors de la zone : les vendre est souvent plus intéressant que de les garder immobilisés.`,
        ],
      },
      {
        title: 'Comment se passe le rachat en Île-de-France',
        paragraphs: [
          "Vous nous contactez par téléphone, WhatsApp ou formulaire avec la marque, le modèle, l'année, le kilométrage, l'état et quelques photos. Nous faisons une offre ferme, qui ne change pas à l'arrivée du plateau tant que le véhicule correspond à la description. Nous fixons ensuite un créneau : sous 2 h en petite couronne, sous 24 h ailleurs en Île-de-France.",
          "Sur place, nous vérifions les documents, vous signez la déclaration de cession, le véhicule est chargé et le paiement est effectué. Nous enregistrons la cession en ligne : vous n'êtes plus responsable du véhicule dès son départ.",
        ],
        list: [
          'Carte grise barrée « Vendu le … », datée et signée.',
          'Certificat de situation administrative de moins de 15 jours.',
          'Pièce d’identité du titulaire de la carte grise.',
          'Clés, double et carnet d’entretien si vous les avez.',
        ],
      },
    ],
    faq: [
      { question: `Rachetez-vous ${b.une} sans contrôle technique ?`, answer: "Oui. Le contrôle technique n'est pas exigé pour une vente à un professionnel ; l'offre tient compte des réparations à prévoir." },
      { question: `Ma ${b.name} ne roule plus, pouvez-vous la racheter ?`, answer: "Oui, si elle est complète et que ses pièces ont de la valeur. Sinon, nous vous le disons et proposons l'enlèvement gratuit avec certificat de destruction." },
      { question: 'Quand suis-je payé ?', answer: "Le jour de l'enlèvement, au moment de la signature de la cession, après vérification des documents." },
      { question: 'Dans quelles communes intervenez-vous ?', answer: "Dans les huit départements d'Île-de-France : Paris, Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne, Seine-et-Marne, Yvelines, Essonne et Val-d'Oise." },
      { question: 'La voiture est gagée, est-ce possible ?', answer: "Un gage n'empêche pas la vente, mais le crédit doit être soldé pour qu'il soit levé ; une opposition, elle, bloque la vente tant qu'elle n'est pas levée. Le certificat de situation administrative indique laquelle s'applique." },
      b.faq,
    ],
    towns: b.towns,
    sources: ['SP_CT', 'SP_NON_ROULANT', 'SP_CSA', 'MGP_ZFE'],
  };
}

// ────────────────────────────────────────────────────────────────────────────
// B2B — professionnels (épaviste)
// ────────────────────────────────────────────────────────────────────────────

const PRO: IdfIntent[] = [
  {
    slug: 'pro-syndic-copropriete',
    service: 'epaviste',
    kind: 'pro',
    updatedAt: UPDATED,
    title: 'Syndics de copropriété : faire enlever un véhicule ventouse en Île-de-France',
    metaTitle: 'Syndic : enlever un véhicule ventouse',
    description: "Syndics en Île-de-France : véhicule abandonné dans le parking de la copropriété, procédure légale (mise en demeure, fourrière) et enlèvement gratuit.",
    label: 'Syndics de copropriété',
    intro: [
      "Une voiture qui n'a pas bougé depuis des mois au deuxième sous-sol, une plaque qui ne correspond plus à aucun résident, des pneus à plat et de la poussière : chaque gestionnaire de copropriété en Île-de-France connaît le véhicule ventouse. Il occupe une place, gêne le nettoyage, inquiète les assureurs, et personne ne sait à qui s'adresser.",
      "Cette page s'adresse aux syndics professionnels et bénévoles, aux gestionnaires et aux conseils syndicaux. Elle distingue les deux cas qui n'ont pas la même solution — le propriétaire est identifié et d'accord, ou il ne l'est pas — et explique comment nous intervenons dans les parkings de résidence, y compris les plus difficiles d'accès.",
    ],
    sections: [
      {
        title: 'Le propriétaire est connu : l’enlèvement se règle en une visite',
        paragraphs: [
          "Dans la majorité des cas, le véhicule appartient à un copropriétaire ou à un locataire qui l'a oublié, qui a déménagé ou qui n'a pas les moyens de le faire réparer. Il suffit souvent d'un courrier du syndic rappelant le règlement de copropriété et proposant une solution : l'enlèvement gratuit d'un véhicule complet, avec certificat de destruction, ne lui coûte rien et règle la question en une visite.",
          "Le propriétaire signe la cession pour destruction, ou la vente si le véhicule a encore de la valeur ; nous nous chargeons du reste. Le syndic n'a rien à avancer et n'engage aucune responsabilité : c'est le titulaire de la carte grise qui cède son véhicule.",
        ],
      },
      {
        title: 'Le propriétaire est inconnu ou ne répond pas : la procédure légale',
        paragraphs: [
          "Un véhicule laissé sans droit dans un lieu privé, comme un parking de copropriété, ne peut pas être enlevé sur simple décision du syndic : ce serait une appropriation. Le code de la route prévoit une procédure : le maître des lieux met en demeure le propriétaire du véhicule, par lettre recommandée avec accusé de réception, de le retirer ; à défaut, il peut demander sa mise en fourrière à l'officier de police judiciaire compétent.",
          "Pour identifier le propriétaire, les services de police peuvent interroger le fichier des immatriculations à partir de la plaque ; le syndic, lui, n'y a pas accès. Une fois le véhicule en fourrière, la suite relève de la procédure de fourrière ; si le propriétaire se manifeste et ne veut pas récupérer le véhicule, nous pouvons organiser sa destruction avec son mandat.",
        ],
        list: [
          'Photos datées du véhicule et de son emplacement.',
          'Courrier recommandé de mise en demeure au propriétaire, s’il est connu.',
          'À défaut de réponse : demande de mise en fourrière auprès du commissariat.',
          'Information du conseil syndical à chaque étape.',
        ],
      },
      {
        title: 'Intervenir dans un parking de résidence',
        paragraphs: [
          "Les parkings de copropriété franciliens ont souvent une hauteur libre de 1,90 m à 2,10 m, des rampes étroites et des niveaux profonds. Nous n'y entrons pas avec un poids lourd : nous treuillons le véhicule jusqu'à la sortie, ou jusqu'à un niveau accessible au plateau, puis nous le chargeons en surface. Les roues bloquées se travaillent avec des chariots.",
          "Pour préparer l'intervention, nous demandons la hauteur de la rampe, le niveau et le numéro de la place, et un contact pour l'ouverture des portes (gardien, badge, télécommande). Nous intervenons à l'heure qui gêne le moins les résidents, souvent en milieu de matinée.",
        ],
      },
      {
        title: 'Plusieurs véhicules dans la même résidence',
        paragraphs: [
          "Après un changement de syndic, des travaux de parking ou un ravalement, il arrive que plusieurs véhicules soient à traiter. Nous établissons avec le gestionnaire la liste des véhicules, leur situation (propriétaire identifié ou non) et un calendrier, puis nous enlevons en une ou plusieurs tournées ceux dont les propriétaires ont signé. Les autres suivent la procédure de mise en demeure et de fourrière.",
        ],
      },
      {
        title: 'Prévenir les véhicules ventouses',
        paragraphs: [
          "Le règlement de copropriété peut rappeler que les places de stationnement sont destinées à des véhicules en état de circuler et régulièrement utilisés. Un affichage annuel dans les halls et les parkings, un recensement par le gardien ou la société de nettoyage, et une relance rapide des propriétaires identifiés évitent qu'un véhicule immobilisé ne devienne, au fil des années, une épave sans propriétaire joignable. Plus le signalement est précoce, plus la solution amiable — l'enlèvement gratuit proposé au propriétaire — a de chances d'aboutir.",
        ],
      },
    ],
    faq: [
      { question: 'Le syndic peut-il faire enlever une voiture sans l’accord du propriétaire ?', answer: "Non. Il doit mettre en demeure le propriétaire par lettre recommandée de retirer le véhicule, puis, à défaut, demander sa mise en fourrière à l'officier de police judiciaire." },
      { question: 'Combien coûte l’enlèvement pour la copropriété ?', answer: "Rien lorsque le propriétaire nous cède un véhicule complet : l'enlèvement est gratuit et le certificat de destruction lui est remis. La copropriété n'avance aucun frais." },
      { question: 'Comment identifier le propriétaire d’un véhicule inconnu ?', answer: "Seuls les services de police peuvent interroger le fichier des immatriculations. Le syndic signale le véhicule au commissariat lors de la demande de mise en fourrière." },
      { question: 'Pouvez-vous intervenir dans un parking à 1,90 m ?', answer: "Oui. Nous treuillons le véhicule jusqu'à la sortie ou un niveau accessible, puis nous le chargeons en surface." },
      { question: 'Faut-il un vote en assemblée générale ?', answer: "Pas pour proposer l'enlèvement gratuit à un propriétaire identifié. Pour une procédure de mise en demeure et de fourrière, le syndic agit au nom du syndicat des copropriétaires ; informez le conseil syndical." },
      { question: 'Traitez-vous plusieurs véhicules en même temps ?', answer: "Oui : nous établissons la liste avec le gestionnaire et enlevons en une ou plusieurs tournées les véhicules dont les propriétaires ont signé." },
    ],
    towns: [
      { deptSlug: 'paris-75', slug: 'paris-15e' },
      { deptSlug: 'hauts-de-seine-92', slug: 'courbevoie' },
      { deptSlug: 'val-de-marne-94', slug: 'creteil' },
    ],
    sources: ['CR_R325_47', 'SP_FOURRIERE', 'SP_VHU', 'SP_CSA'],
  },
  {
    slug: 'pro-bailleur-social',
    service: 'epaviste',
    kind: 'pro',
    updatedAt: UPDATED,
    title: 'Bailleurs sociaux : enlever les épaves des parkings et résidences en Île-de-France',
    metaTitle: 'Bailleurs : épaves en résidence',
    description: "Bailleurs sociaux en Île-de-France : véhicules abandonnés en parking ou pied d'immeuble, procédure légale, campagnes d'enlèvement, suivi.",
    label: 'Bailleurs sociaux',
    intro: [
      "Dans les grands ensembles d'Île-de-France, les véhicules abandonnés ne sont pas une exception : parkings souterrains fermés pour cause de dégradations, places extérieures occupées par des épaves, voitures brûlées ou dépouillées. Pour un bailleur, c'est à la fois un sujet de sécurité, de propreté et de relation avec les locataires.",
      "Nous travaillons avec les gardiens, les responsables de site et les directions de proximité pour traiter ces véhicules dans le cadre légal : enlèvement gratuit quand le propriétaire est identifié et cède son véhicule, procédure de mise en demeure et de fourrière quand il ne l'est pas, et organisation de campagnes lorsque les véhicules sont nombreux.",
    ],
    sections: [
      {
        title: 'Deux situations, deux procédures',
        paragraphs: [
          "Lorsque le propriétaire est un locataire identifié, le gardien ou le responsable de site peut lui proposer l'enlèvement gratuit de son véhicule : il signe la cession pour destruction, nous l'enlevons, il reçoit le certificat de destruction. C'est la voie la plus rapide, et elle évite toute procédure.",
          "Lorsque le propriétaire est inconnu, injoignable ou refuse, le bailleur, maître des lieux, doit le mettre en demeure par lettre recommandée de retirer le véhicule, puis, à défaut, demander la mise en fourrière à l'officier de police judiciaire. Le bailleur ne peut pas faire enlever lui-même un véhicule qui ne lui appartient pas.",
        ],
      },
      {
        title: 'Véhicules brûlés, dépouillés ou incomplets',
        paragraphs: [
          "Un véhicule brûlé ou dont il ne reste que la caisse n'est plus un véhicule complet : sa prise en charge par un centre VHU n'est plus forcément gratuite, et son propriétaire doit, s'il est connu, déclarer le sinistre à son assureur. S'il est inconnu, c'est la procédure de fourrière qui s'applique, la police procédant le cas échéant aux constatations.",
          "Nous vous indiquons, avant toute intervention et sur photos, si un véhicule relève d'un enlèvement gratuit ou d'un cas particulier : pas de mauvaise surprise sur le terrain.",
        ],
      },
      {
        title: 'Organiser une campagne d’enlèvement',
        paragraphs: [
          "Avant une réhabilitation de parking, une résidentialisation ou une reprise de places, le plus efficace est une campagne : recensement des véhicules par le gardien, affichage dans les halls, courriers aux locataires concernés, puis une ou plusieurs journées d'enlèvement des véhicules cédés. Les véhicules restants suivent la procédure de mise en demeure et de fourrière.",
          "Nous fournissons un état des véhicules enlevés (immatriculation, emplacement, date, document remis) pour le suivi du bailleur. Il peut être joint au compte rendu de la campagne présenté aux amicales de locataires ou au conseil de concertation locative.",
        ],
        list: [
          'Recensement : immatriculation, emplacement, photos, état.',
          'Information des locataires : affichage et courriers.',
          'Journées d’enlèvement des véhicules cédés.',
          'Mise en demeure puis fourrière pour les autres.',
          'État récapitulatif remis au bailleur.',
        ],
      },
      {
        title: 'Accès et sécurité sur site',
        paragraphs: [
          "Nous intervenons avec un plateau et un treuil, en coordination avec le gardien pour l'ouverture des parkings et la sécurisation de la zone. Les parkings souterrains à hauteur réduite et les rampes étroites sont traités comme dans le parc privé : treuillage jusqu'à un niveau accessible, chargement en surface.",
        ],
      },
      {
        title: 'Ce que le gardien peut faire dès aujourd’hui',
        paragraphs: [
          "Le gardien est souvent le premier à repérer un véhicule qui ne bouge plus. Noter l'immatriculation, l'emplacement et la date, prendre deux photos et, si le véhicule appartient à un locataire connu, lui transmettre nos coordonnées suffit dans beaucoup de cas : le locataire nous appelle, signe la cession, et le véhicule part sans procédure. Pour un véhicule dont le propriétaire est inconnu, le gardien transmet ces éléments au responsable de site, qui engage la mise en demeure.",
        ],
      },
      {
        title: 'Locataires en difficulté : une solution sans frais',
        paragraphs: [
          "Beaucoup de véhicules abandonnés appartiennent à des locataires qui n'ont pas les moyens de les faire réparer, ni de payer une fourrière. Leur expliquer qu'un véhicule complet est enlevé gratuitement, qu'ils reçoivent le certificat de destruction et qu'ils peuvent ensuite résilier leur assurance, désamorce souvent la situation. La déclaration de cession met fin à leur responsabilité : ils ne recevront plus d'avis de contravention pour ce véhicule.",
        ],
      },
      {
        title: 'Après l’enlèvement : place libérée, dossier clos',
        paragraphs: [
          "Une fois le véhicule enlevé, la place peut être réattribuée ou intégrée aux travaux prévus. Le locataire conserve son exemplaire de la déclaration de cession et reçoit le certificat de destruction établi par le centre VHU agréé partenaire ; le bailleur reçoit, s'il le souhaite, la liste des véhicules enlevés avec la date et l'emplacement. Pour les véhicules passés par la fourrière, c'est le procès-verbal de mise en fourrière qui fait foi.",
        ],
      },
    ],
    faq: [
      { question: 'Le bailleur peut-il faire enlever un véhicule abandonné par un locataire ?', answer: "Seulement avec l'accord du propriétaire du véhicule, qui le cède. Sinon, le bailleur le met en demeure par lettre recommandée, puis demande la mise en fourrière à l'officier de police judiciaire." },
      { question: 'L’enlèvement est-il gratuit pour le bailleur ?', answer: "Oui lorsque le propriétaire cède un véhicule complet. Un véhicule brûlé ou incomplet est un cas particulier, annoncé avant l'intervention." },
      { question: 'Pouvez-vous traiter tout un parking ?', answer: "Oui, dans le cadre d'une campagne : recensement, information des locataires, journées d'enlèvement, puis procédure de fourrière pour les véhicules non cédés." },
      { question: 'Que faire d’une voiture brûlée en pied d’immeuble ?', answer: "Signalez-la à la police ; si le propriétaire est identifié, il déclare le sinistre à son assureur et peut nous céder le véhicule. Sinon, la procédure de fourrière s'applique." },
      { question: 'Fournissez-vous un suivi ?', answer: "Oui, un état récapitulatif des véhicules enlevés : immatriculation, emplacement, date et document remis au propriétaire." },
      { question: 'Intervenez-vous dans tous les départements ?', answer: "Oui, dans les huit départements d'Île-de-France, en coordination avec les gardiens et les responsables de site." },
    ],
    towns: [
      { deptSlug: 'seine-saint-denis-93', slug: 'sevran' },
      { deptSlug: 'val-d-oise-95', slug: 'garges-les-gonesse' },
      { deptSlug: 'essonne-91', slug: 'grigny' },
    ],
    sources: ['CR_R325_47', 'SP_FOURRIERE', 'SP_VHU'],
  },
  {
    slug: 'pro-garage-carrossier',
    service: 'epaviste',
    kind: 'pro',
    updatedAt: UPDATED,
    title: 'Garages et carrossiers : véhicules non réparés ou abandonnés en Île-de-France',
    metaTitle: 'Garages : véhicules non réparés',
    description: "Garages et carrossiers en Île-de-France : client qui refuse la réparation, VEI, voiture abandonnée à l'atelier (loi de 1903) — enlèvement, rachat.",
    label: 'Garages et carrossiers',
    intro: [
      "Un devis qui dépasse la valeur de la voiture, un client qui ne revient pas, un véhicule déclaré économiquement irréparable par l'expert : chaque atelier d'Île-de-France a des voitures qui occupent des places sans jamais repartir. Pour un garage, une place immobilisée, c'est du chiffre d'affaires perdu.",
      "Nous travaillons avec les garages et carrossiers pour libérer ces places dans les règles : rachat ou enlèvement gratuit lorsque le client cède son véhicule, et, lorsqu'il l'a abandonné, information sur la procédure prévue par la loi.",
    ],
    sections: [
      {
        title: 'Le client refuse la réparation : proposez-lui une sortie',
        paragraphs: [
          "Quand le devis dépasse la valeur du véhicule, beaucoup de clients ne savent pas quoi faire et laissent la voiture à l'atelier. Leur proposer, avec le devis, une solution de rachat en l'état ou d'enlèvement gratuit avec certificat de destruction règle la situation en quelques jours : le client signe la cession, nous enlevons le véhicule directement sur votre parking.",
          "Nous pouvons aussi prendre en charge les véhicules de vos clients particuliers qui ne veulent pas de remise en état après un sinistre : la cession se fait au nom du titulaire de la carte grise, jamais au nom du garage.",
        ],
      },
      {
        title: 'Véhicule économiquement irréparable (VEI)',
        paragraphs: [
          "Après un accident, l'expert peut classer un véhicule économiquement irréparable. Si le propriétaire refuse l'offre de l'assureur et conserve le véhicule, une opposition au transfert de la carte grise est inscrite, et le véhicule ne peut être cédé qu'à un démolisseur, c'est-à-dire à un centre VHU agréé. Si le propriétaire accepte l'offre, c'est l'assureur qui devient propriétaire et organise l'enlèvement.",
          "Dans le premier cas, nous enlevons le véhicule pour le remettre au centre VHU agréé partenaire, qui délivre le certificat de destruction : la place est libérée, le client est en règle.",
        ],
      },
      {
        title: 'Le client a abandonné le véhicule : la loi de 1903',
        paragraphs: [
          "Un véhicule confié pour réparation et non retiré n'appartient pas au garage. La loi du 31 décembre 1903 relative à la vente de certains objets abandonnés prévoit une procédure : pour un véhicule à moteur, après trois mois sans retrait, le professionnel peut présenter une requête au juge, qui peut ordonner la vente aux enchères publiques ; le produit de la vente couvre les sommes dues au garage.",
          "Nous ne pouvons pas enlever un véhicule abandonné sans l'accord de son propriétaire : la procédure judiciaire est la seule voie. Si le propriétaire réapparaît et ne veut plus du véhicule, il peut en revanche nous le céder directement.",
        ],
        list: [
          'Conservez l’ordre de réparation et les échanges avec le client.',
          'Relancez par lettre recommandée avant d’engager la procédure.',
          'Après trois mois : requête au juge pour une vente aux enchères.',
          'Si le client se manifeste : cession directe, rachat ou enlèvement.',
        ],
      },
      {
        title: 'Un partenariat simple',
        paragraphs: [
          "Pas d'abonnement ni de commission : vous nous appelez quand un client a pris sa décision, nous fixons un créneau qui ne gêne pas l'atelier, nous enlevons le véhicule et remettons les documents au client. Pour les ateliers qui ont régulièrement des véhicules à sortir, nous organisons des passages groupés.",
        ],
      },
      {
        title: 'Pièces déjà démontées : ce qui change',
        paragraphs: [
          "Un véhicule dont le moteur, la boîte ou le catalyseur ont été déposés pendant un diagnostic n'est plus un véhicule complet : sa prise en charge par un centre VHU n'est alors plus forcément gratuite. Si les pièces sont encore à l'atelier, il suffit souvent de les remettre dans le véhicule ou de les charger avec lui. Dites-le-nous avant l'intervention, photos à l'appui : nous vous indiquons la solution et ses conditions avant de nous déplacer.",
        ],
      },
      {
        title: 'Ce que le client doit préparer',
        paragraphs: [
          "Pour que l'enlèvement se fasse en une seule visite, le client réunit ses documents avant notre passage. S'il ne peut pas être présent, il peut signer la cession à l'avance et vous confier les documents, avec une procuration et une copie de sa pièce d'identité.",
        ],
        list: [
          'Carte grise barrée « Cédé le … pour destruction » ou « Vendu le … », datée et signée.',
          'Certificat de situation administrative de moins de 15 jours.',
          'Pièce d’identité, ou procuration et copie de la pièce d’identité.',
        ],
      },
      {
        title: 'Rachat plutôt que destruction',
        paragraphs: [
          "Toutes les voitures non réparées ne sont pas des épaves. Une voiture récente dont la réparation est jugée trop chère par son propriétaire peut avoir une vraie valeur pour un professionnel. Nous faisons alors une offre de rachat au client, payée le jour de l'enlèvement : votre client repart avec une solution et sans frais, et vous libérez la place.",
        ],
      },
    ],
    faq: [
      { question: 'Le garage peut-il nous céder un véhicule laissé par un client ?', answer: "Non : seul le titulaire de la carte grise peut céder son véhicule. Le garage peut en revanche proposer la solution au client, qui signe la cession." },
      { question: 'Que faire d’une voiture abandonnée à l’atelier ?', answer: "La loi du 31 décembre 1903 permet, après trois mois pour un véhicule à moteur, de demander au juge d'ordonner sa vente aux enchères publiques ; le produit couvre les sommes dues." },
      { question: 'Un véhicule VEI peut-il être vendu ?', answer: "Si le propriétaire l'a conservé, il ne peut être cédé qu'à un démolisseur, c'est-à-dire un centre VHU agréé. Nous l'acheminons vers notre centre VHU agréé partenaire." },
      { question: 'L’enlèvement est-il gratuit ?', answer: "Oui pour un véhicule complet cédé pour destruction ; s'il a encore de la valeur, nous proposons un rachat au client." },
      { question: 'Intervenez-vous sur le parking du garage ?', answer: "Oui, sur un créneau qui ne gêne pas l'atelier, avec un plateau et un treuil pour les véhicules qui ne roulent plus." },
      { question: 'Proposez-vous des passages groupés ?', answer: "Oui, pour les ateliers qui ont régulièrement plusieurs véhicules à sortir." },
    ],
    towns: [
      { deptSlug: 'val-de-marne-94', slug: 'vitry-sur-seine' },
      { deptSlug: 'hauts-de-seine-92', slug: 'gennevilliers' },
      { deptSlug: 'seine-et-marne-77', slug: 'melun' },
    ],
    sources: ['LOI_1903', 'SP_VE', 'SP_GAGE', 'SP_VHU'],
  },
  {
    slug: 'pro-concession-negociant',
    service: 'epaviste',
    kind: 'pro',
    updatedAt: UPDATED,
    title: 'Concessionnaires et négociants : reprises invendables en Île-de-France',
    metaTitle: 'Concessions : reprises invendables',
    description: "Concessions et négociants en Île-de-France : reprises invendables et épaves de parc — enlèvement gratuit ou rachat, documents en règle.",
    label: 'Concessions et négociants',
    intro: [
      "Une reprise acceptée pour conclure une vente, et qui se révèle invendable ; un véhicule de parc qui ne passe plus le contrôle technique ; une voiture laissée en dépôt-vente et jamais vendue : les concessions et négociants d'Île-de-France ont tous des véhicules qui ne rentreront jamais dans le circuit de l'occasion.",
      "Nous enlevons ces véhicules pour les remettre à un centre VHU agréé partenaire, ou nous les rachetons lorsqu'ils ont une valeur de pièces. La cession est faite au nom du propriétaire inscrit sur la carte grise, c'est-à-dire, pour une reprise, au nom de votre société.",
    ],
    sections: [
      {
        title: 'Reprises que l’on ne peut pas revendre',
        paragraphs: [
          "Une reprise trop ancienne, trop kilométrée ou trop coûteuse à remettre en état n'a pas sa place sur votre parc. La vendre à un marchand prend du temps ; la faire détruire est souvent plus simple. Quand le véhicule est complet, l'enlèvement est gratuit et le certificat de destruction établi par le centre VHU agréé partenaire clôt le dossier.",
          "Si le véhicule a encore une valeur de pièces — moteur, boîte, éléments de carrosserie —, nous faisons une offre de rachat sur photos. Vous choisissez la solution la plus intéressante pour la société.",
        ],
      },
      {
        title: 'Des documents propres pour votre comptabilité',
        paragraphs: [
          "Le véhicule repris est enregistré au nom de la société, ou a fait l'objet d'une déclaration d'achat par un professionnel. C'est ce titre qui permet de céder le véhicule : sans lui, aucune cession n'est possible, qu'il s'agisse d'une destruction ou d'une vente. Vérifiez-le avant de programmer l'enlèvement, en particulier pour les reprises anciennes enregistrées par un collaborateur qui a quitté la société. La cession pour destruction ou la vente est signée par une personne habilitée, et vous recevez l'exemplaire de la déclaration de cession et, pour une destruction, le certificat de destruction. Ces documents justifient la sortie du véhicule de votre stock.",
          "Pour un véhicule sous opposition ou gagé, la cession n'est possible qu'une fois la situation administrative réglée : le certificat de situation administrative le dit.",
        ],
        list: [
          'Carte grise ou déclaration d’achat au nom de la société.',
          'Certificat de situation administrative de moins de 15 jours.',
          'Kbis et pièce d’identité du signataire habilité.',
          'Déclaration de cession remplie sur place.',
        ],
      },
      {
        title: 'Organisation des enlèvements',
        paragraphs: [
          "Nous intervenons sur votre parc ou votre atelier sur un créneau convenu, avec un plateau et un treuil pour les véhicules qui ne roulent plus. Pour plusieurs véhicules, nous organisons une tournée : liste des immatriculations, photos, puis enlèvement en une ou plusieurs fois.",
          "Les véhicules laissés en dépôt-vente restent la propriété du déposant : c'est lui qui doit signer la cession. Prévenez-le avant de nous solliciter.",
        ],
      },
      {
        title: 'Utilitaires et véhicules de démonstration endommagés',
        paragraphs: [
          "Les utilitaires de reprise très usés et les véhicules de démonstration ou de prêt sévèrement endommagés suivent le même circuit. Après un sinistre déclaré à l'assurance de la concession, c'est l'avis de l'expert et la décision de l'assureur qui fixent la suite ; nous intervenons ensuite pour l'enlèvement.",
        ],
      },
      {
        title: 'Carte grise perdue ou véhicule ancien sans papiers',
        paragraphs: [
          "Il arrive qu'une vieille reprise arrive sans sa carte grise, ou que celle-ci ait été égarée depuis. Pour une destruction, une déclaration de perte remplace le certificat d'immatriculation ; le certificat de situation administrative reste nécessaire pour vérifier qu'aucune opposition ne bloque la cession. Un véhicule dont l'origine ne peut pas être établie n'est pas pris en charge : c'est une garantie pour vous comme pour nous.",
        ],
      },
      {
        title: 'Pourquoi passer par un centre VHU agréé',
        paragraphs: [
          "Seul un centre VHU agréé peut délivrer un certificat de destruction valable. Céder une épave à un acheteur non agréé « pour pièces » expose la société à retrouver le véhicule en circulation, ou abandonné, toujours enregistré à son nom. En passant par le circuit agréé, la destruction est tracée, la carte grise est annulée dans le système d'immatriculation, et le dossier est clos.",
        ],
      },
      {
        title: 'Rachat de pièces : comment l’offre est faite',
        paragraphs: [
          "Lorsque le véhicule a une valeur de pièces, l'offre dépend de ce qui est réutilisable : moteur, boîte, trains roulants, éléments de carrosserie, électronique. Des photos du compartiment moteur, du compteur et des faces du véhicule suffisent pour une première offre, confirmée à l'enlèvement si l'état correspond.",
        ],
      },
      {
        title: 'Une relation suivie avec votre parc',
        paragraphs: [
          "Pour les concessions et négociants qui sortent régulièrement des véhicules de leur stock, nous convenons d'un fonctionnement simple : un contact unique, une liste transmise par message avec immatriculations et photos, une réponse dans la journée sur la solution (enlèvement gratuit ou rachat) et un passage groupé à la date qui vous convient. Les documents de chaque véhicule sont remis à la personne habilitée de la société, pour un suivi comptable sans ressaisie.",
        ],
      },
    ],
    faq: [
      { question: 'Enlevez-vous les reprises invendables gratuitement ?', answer: "Oui lorsque le véhicule est complet ; s'il a une valeur de pièces, nous proposons un rachat sur photos." },
      { question: 'Qui signe la cession pour une reprise ?', answer: "La société propriétaire, par une personne habilitée, avec le Kbis et sa pièce d'identité." },
      { question: 'Et pour un véhicule en dépôt-vente ?', answer: "Il appartient toujours au déposant : c'est lui qui signe la cession." },
      { question: 'Pouvez-vous enlever plusieurs véhicules à la fois ?', answer: "Oui, en tournée organisée à partir d'une liste d'immatriculations et de photos." },
      { question: 'Quels documents recevons-nous ?', answer: "L'exemplaire de la déclaration de cession et, pour une destruction, le certificat de destruction du centre VHU agréé partenaire." },
      { question: 'Un véhicule gagé peut-il être cédé ?', answer: "Le gage n'empêche pas la vente mais doit être levé ; une opposition bloque toute cession tant qu'elle n'est pas levée." },
    ],
    towns: [
      { deptSlug: 'seine-et-marne-77', slug: 'pontault-combault' },
      { deptSlug: 'yvelines-78', slug: 'plaisir' },
      { deptSlug: 'val-d-oise-95', slug: 'cergy' },
    ],
    sources: ['SP_VHU', 'SP_CSA', 'SP_GAGE', 'SP_VE'],
  },
  {
    slug: 'pro-notaire-agence-immobiliere',
    service: 'epaviste',
    kind: 'pro',
    updatedAt: UPDATED,
    title: 'Notaires et agences immobilières : véhicule dans un bien à vendre en Île-de-France',
    metaTitle: 'Notaires : véhicule dans un bien vendu',
    description: "Notaires et agences en Île-de-France : voiture d'un défunt ou laissée dans un bien à vendre — qui peut la céder, documents, enlèvement gratuit.",
    label: 'Notaires et agences',
    intro: [
      "Une maison à vendre après une succession, avec une voiture au garage et une autre au fond du jardin ; un appartement vendu dont le box contient encore le véhicule de l'ancien propriétaire : notaires et agents immobiliers d'Île-de-France rencontrent souvent ce problème au moment de la remise des clés.",
      "Le véhicule ne fait pas partie du bien immobilier : il doit être cédé par son propriétaire ou, après un décès, par les héritiers. Nous expliquons ici qui peut signer, quels documents réunir, et comment nous libérons le garage ou le jardin avant la vente.",
    ],
    sections: [
      {
        title: 'Après un décès : ce sont les héritiers qui cèdent',
        paragraphs: [
          "Les héritiers qui ne souhaitent pas conserver le véhicule peuvent le céder — pour destruction ou à la vente — sans le faire immatriculer à leur nom au préalable. Ils remplissent la déclaration de cession à leur nom, barrent et signent la carte grise, et fournissent un certificat de situation administrative de moins de quinze jours et un justificatif de la succession.",
          "Le justificatif peut être une attestation du notaire chargé de la succession, un acte de notoriété, ou, à défaut, l'acte de décès accompagné d'une attestation signée par l'ensemble des héritiers autorisant la cession. Le notaire est souvent le mieux placé pour remettre ce document aux héritiers.",
        ],
        list: [
          'Carte grise du défunt barrée et signée par les héritiers.',
          'Déclaration de cession au nom des héritiers.',
          'Certificat de situation administrative de moins de 15 jours.',
          'Attestation du notaire, acte de notoriété, ou acte de décès + accord de tous les héritiers.',
        ],
      },
      {
        title: 'Véhicule laissé par un vendeur vivant',
        paragraphs: [
          "Lorsque le vendeur du bien est vivant et propriétaire du véhicule, c'est simplement à lui de le céder. Proposer l'enlèvement gratuit avec certificat de destruction, ou le rachat s'il a de la valeur, évite qu'il reste dans le garage après la signature de l'acte.",
          "Si un véhicule est laissé après la vente par l'ancien propriétaire, le nouveau propriétaire du terrain ne peut pas en disposer : il doit mettre l'ancien propriétaire en demeure de le retirer, puis, à défaut, demander sa mise en fourrière.",
        ],
      },
      {
        title: 'Libérer le garage ou le jardin avant la vente',
        paragraphs: [
          "Les véhicules des maisons à vendre ne roulent souvent plus depuis longtemps : batterie à plat, pneus dégonflés, freins grippés. Nous les treuillons jusqu'au plateau, depuis un garage, une cour ou un jardin, en vérifiant au préalable l'accès (largeur du portail, pente, distance). Une photo de l'emplacement suffit pour préparer l'intervention. Si la maison est vide et que personne ne peut être présent, l'agence ou un voisin peut nous ouvrir, à condition que les documents aient été signés avant.",
          "L'enlèvement d'un véhicule complet est gratuit ; s'il a encore de la valeur, une offre de rachat est faite aux héritiers ou au vendeur, et le paiement est fait à leur ordre le jour de l'enlèvement.",
        ],
      },
      {
        title: 'Un interlocuteur pour vos dossiers',
        paragraphs: [
          "Pour les études et agences qui rencontrent régulièrement ces situations, nous servons d'interlocuteur unique : vous nous mettez en relation avec les héritiers ou le vendeur, nous leur expliquons les documents à réunir, et nous fixons l'enlèvement avant la date de signature.",
        ],
      },
      {
        title: 'Un seul héritier joignable, plusieurs véhicules',
        paragraphs: [
          "Lorsque plusieurs héritiers existent mais qu'un seul s'occupe de la maison, il ne peut pas céder seul le véhicule sans justifier de l'accord des autres : l'attestation du notaire chargé de la succession, ou une attestation signée par tous les héritiers, est nécessaire. Si la maison contient plusieurs véhicules, chacun fait l'objet de sa propre cession, avec sa carte grise et son certificat de situation administrative.",
        ],
      },
      {
        title: 'Véhicule gagé ou sous opposition dans une succession',
        paragraphs: [
          "Le certificat de situation administrative peut révéler un gage — un crédit en cours — ou une opposition, par exemple pour des amendes impayées. Un gage n'empêche pas la cession, mais l'organisme prêteur doit être réglé pour le lever ; une opposition bloque toute cession tant qu'elle n'est pas levée auprès de l'autorité qui l'a inscrite. Mieux vaut le vérifier dès l'ouverture de la succession, pour que l'enlèvement ne retarde pas la vente du bien.",
        ],
      },
      {
        title: 'Assurance et carte grise après la cession',
        paragraphs: [
          "Une fois la cession enregistrée, les héritiers ou le vendeur peuvent résilier l'assurance du véhicule en transmettant à l'assureur la déclaration de cession ou le certificat de destruction. La carte grise n'a pas à être mise à leur nom : la cession est enregistrée directement à partir du titre du défunt, ce qui évite des frais et des délais inutiles.",
        ],
      },
    ],
    faq: [
      { question: 'Qui peut céder la voiture d’une personne décédée ?', answer: "Les héritiers, sans faire immatriculer le véhicule à leur nom, avec un justificatif de la succession (attestation du notaire, acte de notoriété, ou acte de décès et accord de tous les héritiers)." },
      { question: 'Le notaire peut-il signer la cession ?', answer: "Non : ce sont les héritiers qui cèdent. Le notaire peut en revanche fournir l'attestation qui justifie leur qualité." },
      { question: 'Le véhicule est-il vendu avec la maison ?', answer: "Non, c'est un bien distinct ; il doit être cédé par son propriétaire ou ses héritiers." },
      { question: 'L’enlèvement est-il gratuit ?', answer: "Oui pour un véhicule complet cédé pour destruction ; s'il a de la valeur, nous faisons une offre de rachat aux héritiers ou au vendeur." },
      { question: 'Que faire si l’ancien propriétaire a laissé sa voiture après la vente ?', answer: "Le nouveau propriétaire le met en demeure de la retirer par lettre recommandée, puis peut demander sa mise en fourrière." },
      { question: 'Pouvez-vous intervenir avant la signature de l’acte ?', answer: "Oui, sur rendez-vous, une fois les documents réunis par les héritiers ou le vendeur." },
    ],
    towns: [
      { deptSlug: 'yvelines-78', slug: 'le-chesnay-rocquencourt' },
      { deptSlug: 'val-de-marne-94', slug: 'st-maur-des-fosses' },
      { deptSlug: 'essonne-91', slug: 'brunoy' },
    ],
    sources: ['SP_HERITAGE', 'SP_CSA', 'CR_R325_47', 'SP_VHU'],
  },
];

export const extraIdfIntents: IdfIntent[] = [...BRANDS.map(brandIntent), ...PRO];
