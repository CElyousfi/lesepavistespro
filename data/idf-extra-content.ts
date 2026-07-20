/**
 * IDF-Specific Extended Content for Department & City Pages
 * Adds 600-1000+ words of hyper-local content per department
 * Targets long-tail keywords: "épaviste gratuit [dept] 24h", "rachat voiture cash [dept]"
 */

export interface IdfDeptContent {
  deptCode: string;
  deptName: string;
  whyChoose: string;
  caseStudy: string;
  regulations: string;
  localContext: string;
  keywords: string[];
}

export interface IdfCityContent {
  citySlug: string;
  localContext: string;
}

export const idfDeptContents: IdfDeptContent[] = [
  {
    deptCode: '75',
    deptName: 'Paris',
    whyChoose: `Paris est la ville la plus dense de France avec plus de 2 millions d'habitants et des millions de véhicules en circulation. Les contraintes de stationnement, les zones à faibles émissions (ZFE-m) et les restrictions de circulation Crit'Air rendent l'enlèvement d'épave particulièrement complexe. Notre service d'épaviste agréé VHU à Paris intervient dans les 20 arrondissements, y compris dans les parkings souterrains, les cours d'immeubles et les voies étroites du centre historique. Nous maîtrisons parfaitement la logistique parisienne : autorisations de stationnement temporaire, horaires de livraison, et accès aux zones piétonnes pour les enlèvements urgents.`,
    caseStudy: `Exemple type d'intervention à Paris : enlèvement d'un véhicule hors d'usage stationné depuis plusieurs mois dans un parking souterrain. Pour ce type de cas, notre équipe intervient avec un plateau adapté aux rampes de parking et aux accès étroits. Le propriétaire reçoit son certificat de destruction le jour même, ce qui permet de résilier immédiatement l'assurance et d'éviter les amendes de stationnement.`,
    regulations: `Depuis janvier 2025, la Zone à Faibles Émissions métropolitaine (ZFE-m) du Grand Paris interdit la circulation des véhicules Crit'Air 3 et plus. Si votre véhicule est concerné, vous risquez une amende de 68€ à chaque contrôle. La prime à la conversion peut atteindre 6 000€ en Île-de-France pour l'achat d'un véhicule propre. Nous vous accompagnons dans toutes les démarches : certificat de destruction conforme à la directive européenne 2000/53/CE, radiation auprès de l'ANTS, et conseil pour bénéficier des aides régionales.`,
    localContext: `L'Île-de-France génère à elle seule plus de 250 000 véhicules hors d'usage par an. À Paris, les fourrières municipales sont saturées et les délais d'enlèvement par la préfecture peuvent dépasser 3 semaines. Notre service privé agréé garantit une intervention sous 24h, 7j/7, avec un enlèvement 100% gratuit et un certificat de destruction immédiat.`,
    keywords: ['épaviste paris', 'enlèvement épave gratuit paris', 'épaviste agréé vhu paris', 'enlèvement voiture paris', 'casse auto paris'],
  },
  {
    deptCode: '77',
    deptName: 'Seine-et-Marne',
    whyChoose: `La Seine-et-Marne est le plus grand département d'Île-de-France avec plus de 500 communes réparties sur 5 915 km². Cette superficie rend l'enlèvement d'épave plus complexe qu'ailleurs en IDF. Notre réseau de dépanneurs couvre l'intégralité du département, de Meaux au nord à Fontainebleau au sud, en passant par Melun, Chelles, et Pontault-Combault. Que vous soyez en zone urbaine ou en pleine campagne briarde, nous intervenons avec le même engagement : enlèvement gratuit sous 24h, certificat de destruction fourni sur place.`,
    caseStudy: `Exemple type d'intervention en Seine-et-Marne : enlèvement de plusieurs véhicules hors d'usage stationnés dans une propriété rurale. Pour ce type de cas, notre équipe se déplace avec un plateau grande capacité pour traiter plusieurs véhicules en une seule intervention. Les certificats de destruction sont délivrés immédiatement, permettant au propriétaire de régulariser sa situation vis-à-vis de la préfecture.`,
    regulations: `En Seine-et-Marne, de nombreuses communes rurales sont confrontées au problème des véhicules abandonnés sur la voie publique ou dans les propriétés privées. La loi impose au propriétaire de faire détruire son véhicule dans un centre VHU agréé sous peine d'une amende pouvant atteindre 75 000€. Notre service gratuit vous met en conformité avec la réglementation tout en respectant l'environnement grâce à la dépollution et au recyclage de 95% des matériaux.`,
    localContext: `Avec ses zones pavillonnaires étendues et ses nombreuses zones d'activités (Roissy, Marne-la-Vallée, Sénart), la Seine-et-Marne concentre un parc automobile important. Les centres VHU agréés du département traitent plus de 30 000 véhicules par an. Notre partenariat avec ces centres garantit un traitement écologique et conforme de votre épave.`,
    keywords: ['épaviste seine-et-marne', 'enlèvement épave 77', 'épaviste meaux', 'épaviste melun', 'casse auto seine-et-marne'],
  },
  {
    deptCode: '78',
    deptName: 'Yvelines',
    whyChoose: `Les Yvelines combinent zones urbaines denses (Versailles, Sartrouville, Poissy) et vastes espaces ruraux (forêt de Rambouillet, vallée de Chevreuse). Notre service d'épaviste couvre l'ensemble du département 78, avec une expertise particulière dans les communes de la boucle de Seine et du Mantois. Nous intervenons aussi bien dans les parkings souterrains des résidences de Saint-Germain-en-Laye que dans les propriétés rurales du sud du département. Paiement cash immédiat pour les véhicules en état de rouler.`,
    caseStudy: `Exemple type d'intervention dans les Yvelines : enlèvement d'un véhicule accidenté déclaré épave par l'assurance. Pour ce type de cas, nous récupérons le véhicule directement chez le propriétaire sous quelques heures. Le certificat de destruction est fourni immédiatement pour permettre le remboursement par l'assurance.`,
    regulations: `Les Yvelines font partie de la ZFE-m du Grand Paris pour les communes de la Métropole. Les véhicules Crit'Air 4 et 5 y sont déjà interdits. Si votre véhicule ne peut plus circuler dans cette zone, nous proposons un enlèvement gratuit avec certificat de destruction, vous ouvrant droit à la prime à la conversion régionale pouvant atteindre 6 000€ pour l'achat d'un véhicule électrique ou hybride.`,
    localContext: `Le département des Yvelines compte plus de 1,4 million d'habitants et un parc automobile parmi les plus importants d'IDF. Les communes comme Mantes-la-Jolie, Les Mureaux et Trappes concentrent un nombre important de véhicules en fin de vie. Notre maillage local permet une intervention rapide partout dans le 78.`,
    keywords: ['épaviste yvelines', 'enlèvement épave 78', 'épaviste versailles', 'épaviste sartrouville', 'casse auto yvelines'],
  },
  {
    deptCode: '91',
    deptName: 'Essonne',
    whyChoose: `L'Essonne, carrefour stratégique du sud de l'Île-de-France, combine pôles technologiques (Paris-Saclay, Évry-Courcouronnes) et zones résidentielles étendues. Notre service d'épaviste agréé VHU couvre les 196 communes du département, de Massy au nord à Étampes au sud. Nous intervenons rapidement dans les zones d'activités de Corbeil-Essonnes, les quartiers résidentiels de Savigny-sur-Orge, et les communes rurales du sud du département. Enlèvement 100% gratuit, 24h/24.`,
    caseStudy: `Exemple type d'intervention en Essonne : enlèvement d'un véhicule en panne stationné dans un parking de résidence. Dans ce type de situation, un syndic peut mettre en demeure le propriétaire de retirer le véhicule. Notre intervention gratuite résout le problème : enlèvement sous quelques heures, certificat de destruction fourni au propriétaire, copie disponible pour le syndic.`,
    regulations: `Plusieurs communes de l'Essonne sont intégrées à la ZFE-m du Grand Paris. Les véhicules non conformes aux normes Crit'Air risquent des amendes récurrentes. En Essonne, la préfecture a renforcé les contrôles sur les véhicules abandonnés depuis 2024. Faire appel à un épaviste agréé est la solution la plus rapide et gratuite pour se mettre en conformité.`,
    localContext: `L'Essonne traite chaque année plus de 15 000 véhicules hors d'usage via ses centres VHU agréés. Les communes les plus sollicitées sont Évry-Courcouronnes, Corbeil-Essonnes, Massy, Savigny-sur-Orge et Grigny. Notre couverture complète du 91 garantit une intervention sous 24h partout dans le département.`,
    keywords: ['épaviste essonne', 'enlèvement épave 91', 'épaviste evry', 'épaviste massy', 'casse auto essonne'],
  },
  {
    deptCode: '92',
    deptName: 'Hauts-de-Seine',
    whyChoose: `Les Hauts-de-Seine, département le plus riche de France métropolitaine, présentent des défis logistiques uniques pour l'enlèvement d'épaves : densité urbaine extrême, parkings souterrains à niveaux multiples, et réglementations de stationnement strictes. Notre équipe d'épavistes agréés VHU intervient dans les 36 communes du département, de Nanterre à Boulogne-Billancourt, en passant par Colombes, Courbevoie et Issy-les-Moulineaux. Nous disposons de véhicules adaptés aux accès étroits et aux parkings souterrains.`,
    caseStudy: `Exemple type d'intervention dans les Hauts-de-Seine : enlèvement d'un véhicule accidenté dans un parking souterrain. Pour les véhicules non roulants en sous-sol, notre équipe utilise un chariot de manutention spécialisé pour sortir le véhicule avant de le charger sur notre plateau. Ce type d'intervention est réalisé en quelques heures, certificat de destruction fourni sur place.`,
    regulations: `L'ensemble des Hauts-de-Seine est en zone ZFE-m. Les restrictions de circulation concernent désormais les véhicules Crit'Air 3 et plus. Les amendes peuvent s'accumuler rapidement (68€ par infraction). Si votre véhicule ancien ne peut plus circuler, notre service d'enlèvement gratuit vous permet de bénéficier de la prime à la conversion tout en vous libérant de l'obligation d'assurance.`,
    localContext: `Avec une densité de population parmi les plus élevées de France, les Hauts-de-Seine génèrent un flux constant de véhicules en fin de vie. Les communes de Gennevilliers et Nanterre abritent des centres de traitement VHU majeurs. Notre proximité avec ces centres garantit un traitement rapide et écologique de votre véhicule.`,
    keywords: ['épaviste hauts-de-seine', 'enlèvement épave 92', 'épaviste nanterre', 'épaviste boulogne', 'casse auto 92'],
  },
  {
    deptCode: '93',
    deptName: 'Seine-Saint-Denis',
    whyChoose: `La Seine-Saint-Denis est le département francilien avec le plus grand nombre de véhicules hors d'usage traités chaque année. Notre service d'épaviste agréé VHU couvre l'ensemble des 40 communes du 93, de Saint-Denis à Montreuil, en passant par Aulnay-sous-Bois, Bondy et Pantin. Nous intervenons 24h/24 et 7j/7, y compris les jours fériés. Enlèvement gratuit garanti, même pour les véhicules sans carte grise ou sans contrôle technique.`,
    caseStudy: `Exemple type d'intervention en Seine-Saint-Denis : enlèvement de plusieurs véhicules abandonnés sur un terrain privé à la demande du propriétaire foncier. Les véhicules abandonnés représentent un risque environnemental (fuites d'huile, batteries au plomb). Notre équipe peut traiter plusieurs véhicules en une demi-journée avec délivrance de tous les certificats de destruction.`,
    regulations: `La Seine-Saint-Denis est intégralement couverte par la ZFE-m du Grand Paris. Le département fait l'objet d'une attention particulière de la préfecture concernant les véhicules abandonnés. Depuis 2024, les contrôles se sont intensifiés et les amendes pour abandon de véhicule sur la voie publique peuvent atteindre 1 500€. Notre service gratuit vous évite ces sanctions.`,
    localContext: `Le 93 concentre plusieurs centres VHU agréés et casses automobiles historiques. Notre partenariat avec ces centres garantit un recyclage optimal de votre véhicule : 95% des matériaux sont réutilisés ou recyclés conformément à la directive européenne. Chaque année, plus de 20 000 véhicules sont traités dans le département.`,
    keywords: ['épaviste seine-saint-denis', 'enlèvement épave 93', 'épaviste saint-denis', 'épaviste montreuil', 'casse auto 93'],
  },
  {
    deptCode: '94',
    deptName: 'Val-de-Marne',
    whyChoose: `Le Val-de-Marne, avec ses 47 communes et plus de 1,4 million d'habitants, est un territoire dense où les problématiques de stationnement et de véhicules en fin de vie sont quotidiennes. Notre service d'épaviste agréé VHU couvre tout le département 94, de Créteil à Vincennes, en passant par Vitry-sur-Seine, Champigny-sur-Marne et Ivry-sur-Seine. Intervention rapide sous 24h, enlèvement gratuit même en parking souterrain.`,
    caseStudy: `Exemple type d'intervention dans le Val-de-Marne : enlèvement urgent d'un véhicule utilitaire hors d'usage bloquant l'accès à un local commercial. Pour les urgences, notre équipe peut intervenir sous 2 heures, y compris le week-end. Le véhicule est remorqué vers notre centre VHU partenaire, et le certificat de destruction est remis au propriétaire dans la journée.`,
    regulations: `Le Val-de-Marne est entièrement couvert par la ZFE-m métropolitaine. Les restrictions Crit'Air s'appliquent à toutes les communes du département. Pour les véhicules ne pouvant plus circuler, l'enlèvement gratuit par un épaviste agréé est la solution la plus rapide. Vous recevez un certificat de destruction conforme, indispensable pour bénéficier de la prime à la conversion.`,
    localContext: `Le Val-de-Marne dispose de plusieurs centres de traitement VHU agréés, notamment à Vitry-sur-Seine et Ivry-sur-Seine. Ces centres assurent la dépollution complète des véhicules avant recyclage. Notre service garantit que votre véhicule sera traité dans le strict respect des normes environnementales.`,
    keywords: ['épaviste val-de-marne', 'enlèvement épave 94', 'épaviste créteil', 'épaviste vitry', 'casse auto 94'],
  },
  {
    deptCode: '95',
    deptName: "Val-d'Oise",
    whyChoose: `Le Val-d'Oise combine zones urbaines denses (Argenteuil, Cergy, Sarcelles) et espaces ruraux du Vexin français. Notre service d'épaviste agréé VHU couvre l'ensemble du département 95, avec une expertise particulière dans les communes proches de l'aéroport de Roissy-Charles de Gaulle, où les véhicules de location et utilitaires en fin de vie sont nombreux. Enlèvement gratuit 24h/24, certificat de destruction immédiat.`,
    caseStudy: `Exemple type d'intervention dans le Val-d'Oise : enlèvement d'un véhicule abandonné dans une rue résidentielle, signalé à la mairie par les riverains. Ce type d'intervention peut être réalisé en coordination avec la police municipale. Le propriétaire reçoit son certificat de destruction, ce qui le libère de toute responsabilité.`,
    regulations: `Plusieurs communes du Val-d'Oise font partie de la ZFE-m du Grand Paris (notamment Argenteuil, Bezons, et les communes limitrophes du 92 et 93). Les restrictions Crit'Air y sont en vigueur. Pour les communes hors ZFE, les obligations de destruction des VHU restent les mêmes : seul un centre agréé peut délivrer un certificat de destruction valide.`,
    localContext: `Le Val-d'Oise traite chaque année plus de 12 000 véhicules hors d'usage. Les zones d'activités autour de Roissy et Cergy-Pontoise concentrent de nombreux véhicules utilitaires en fin de vie. Notre maillage territorial permet une intervention rapide partout dans le 95, des bords de l'Oise jusqu'au plateau du Vexin.`,
    keywords: ['épaviste val-d-oise', 'enlèvement épave 95', 'épaviste argenteuil', 'épaviste cergy', 'casse auto 95'],
  },
];

/** Get IDF content for a specific department code */
export function getIdfDeptContent(deptCode: string): IdfDeptContent | undefined {
  return idfDeptContents.find(c => c.deptCode === deptCode);
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENU RÉGION IDF — distinct du département Paris (75) pour éviter le
// near-duplicate content entre /epaviste/ile-de-france et /epaviste/paris-75
// ─────────────────────────────────────────────────────────────────────────────

export interface IdfRegionContent {
  whyChoose: string;
  caseStudy: string;
  regulations: string;
  localContext: string;
}

export const idfRegionContent: IdfRegionContent = {
  whyChoose: `L'Île-de-France est la région la plus dense et la plus connectée de France, avec plus de 12 millions d'habitants répartis dans 8 départements aux profils très distincts : la capitale (75), la grande banlieue résidentielle pavillonnaire (77, 78, 91), la petite couronne hyper-urbanisée (92, 93, 94) et le nord industriel et aéroportuaire (95). Notre service d'épaviste agréé VHU n° PR9500003D couvre l'intégralité de ce territoire, avec une organisation logistique adaptée à chaque secteur. En petite couronne, nos équipes interviennent sous 2h. En grande couronne (Seine-et-Marne, Yvelines sud, Essonne, Val-d'Oise nord), nous garantissons l'intervention sous 24h. Nous maîtrisons les spécificités de chaque territoire : parkings souterrains haute sécurité à La Défense, cours d'immeubles haussmanniens à Paris, zones d'activités autour de Roissy et Orly, zones pavillonnaires de la grande couronne, et zones interdites aux poids lourds en ZFE.`,
  caseStudy: `En Île-de-France, les situations d'intervention sont très variées. À Paris, nos équipes interviennent dans des parkings souterrains de 4 à 6 niveaux avec rampes à forte pente, nécessitant un équipement de plateau bas spécialisé. En Seine-Saint-Denis, les demandes concernent souvent des véhicules abandonnés signalés par les mairies ou les gardiens de résidence — un complément à l'action des fourrières municipales souvent saturées. Dans les Yvelines et l'Essonne, les interventions en propriétés rurales peuvent concerner 2 à 5 véhicules en un seul déplacement. Autour de Roissy et Orly, les flottes de véhicules utilitaires en fin de vie représentent un volume significatif.`,
  regulations: `La Zone à Faibles Émissions métropolitaine du Grand Paris (ZFE-m) est la plus étendue de France : elle couvre Paris et 131 communes de la Métropole du Grand Paris, avec des extensions progressives vers la grande couronne. Depuis 2025, les véhicules Crit'Air 3 et au-delà sont interdits de circulation dans le périmètre métropolitain aux heures de pointe. Les amendes (68€ par infraction) peuvent s'accumuler rapidement pour les propriétaires de véhicules anciens encore immatriculés. La prime à la conversion en Île-de-France peut atteindre 6 000€ pour l'achat d'un véhicule 100% électrique, à condition de fournir un certificat de destruction VHU conforme à la directive européenne 2000/53/CE — document que nous remettons systématiquement le jour de l'enlèvement. L'agrément préfectoral n° PR9500003D garantit la conformité de notre procédure.`,
  localContext: `L'Île-de-France génère chaque année plus de 250 000 véhicules hors d'usage, soit le volume le plus élevé de toutes les régions françaises. Les fourrières municipales parisiennes et de petite couronne sont régulièrement saturées, avec des délais d'enlèvement par les services préfectoraux pouvant dépasser 3 semaines. Notre service privé agréé offre une alternative rapide et gratuite : intervention sous 2h en zone dense, certificat de destruction immédiat, et gestion complète des démarches ANTS (radiation du véhicule). En 2026, le renforcement des contrôles ZFE et la montée en puissance des restrictions Crit'Air rendent l'enlèvement d'épave encore plus urgent pour les propriétaires de véhicules ne pouvant plus circuler légalement.`,
};

// ─────────────────────────────────────────────────────────────────────────────
// BANQUE DE VARIANTES "POURQUOI NOUS CHOISIR" (10 formulations)
// Utilisée dans IdfExtraContent pour éviter le bloc identique sur toutes les
// pages. La variante est sélectionnée par hachage du slug de la page.
// ─────────────────────────────────────────────────────────────────────────────

export const whyChooseVariants: string[] = [
  `Notre service d'épaviste agréé VHU n° PR9500003D se distingue par une disponibilité 24h/24, 7j/7, y compris les jours fériés. Contrairement aux casses traditionnelles qui n'opèrent qu'en horaires de bureau, nous intervenons à toute heure pour les enlèvements urgents. Notre équipement moderne — plateaux bas, chariots de manutention, véhicules de petit gabarit — nous permet de traiter les cas les plus complexes : sous-sol étroit, rampe à forte pente, accès restreint. Le certificat de destruction est remis sur place, le jour même.`,
  `Choisir un épaviste agréé VHU n'est pas qu'une obligation légale — c'est aussi la garantie que votre véhicule sera traité de façon écologique et conforme. Notre agrément préfectoral n° PR9500003D atteste que nous travaillons avec des centres VHU certifiés, où chaque véhicule est dépollué (vidange huiles, récupération liquides de refroidissement et de frein, retrait des catalyseurs) avant d'être démantelé. 95% des matériaux sont réutilisés ou recyclés. Vous êtes libéré de toute responsabilité légale dès la remise du certificat.`,
  `La gratuité de notre service n'est pas un argument marketing — c'est un modèle économique. Nous sommes rémunérés par la valeur des matières recyclables (ferraille, métaux non-ferreux, pièces d'occasion). C'est pourquoi notre service est 100% gratuit pour vous, même pour les véhicules en très mauvais état. Seuls les cas où le véhicule n'a plus aucune valeur marchande (brûlé intégralement, immergé, sans aucune pièce récupérable) peuvent faire l'objet d'une tarification exceptionnelle — que nous vous communiquons avant toute intervention.`,
  `Notre implantation dans les 8 départements de l'Île-de-France nous permet d'affecter l'équipe la plus proche de votre adresse, réduisant ainsi les délais d'intervention. Nous ne sommes pas un centre national qui sous-traite à des prestataires locaux — nous gérons nos propres équipes sur le terrain, avec une coordination centralisée et des engagements de délai tenus. En petite couronne, notre temps de réponse moyen est inférieur à 2 heures. En grande couronne, nous intervenons sous 24 heures.`,
  `Propriétaire d'un véhicule sans carte grise, gagé, ou issu d'une succession ? Ces situations, souvent perçues comme des obstacles, font partie de notre quotidien. Nous vous guidons pas à pas dans les démarches administratives : déclaration de perte de carte grise, levée de gage, or attestation notariale en cas de décès du propriétaire. Notre service est là pour simplifier, pas pour compliquer. Appelez-nous et nous vous dirons précisément ce qu'il vous faut pour que l'enlèvement puisse avoir lieu.`,
  `Un épaviste privé agréé, c'est différent d'une fourrière municipale. La fourrière intervient sur réquisition d'un officier de police ou d'un agent assermenté, pour des véhicules stationnés illégalement sur la voie publique. Nous, nous intervenons à votre demande, sur votre propriété ou sur la voie publique avec votre accord, pour les véhicules dont vous êtes propriétaire. Résultat : pas de frais de gardiennage, pas de délai administratif, pas de procédure. Juste un enlèvement gratuit et un certificat de destruction immédiat.`,
  `Notre agrément VHU (Véhicule Hors d'Usage) n° PR9500003D est délivré par la préfecture et renouvelé chaque année. Il garantit que nous respectons les normes strictes de dépollution et de recyclage imposées par la directive européenne 2000/53/CE. Seul un centre VHU agréé peut émettre le certificat de destruction qui vous libère de votre responsabilité légale de propriétaire. Ce document est indispensable pour résilier votre assurance, radier le véhicule auprès de l'ANTS, et bénéficier de la prime à la conversion.`,
  `Votre véhicule est dans un parking en sous-sol ? C'est notre spécialité en Île-de-France, où la densité urbaine concentre des milliers de parkings souterrains dans les résidences, les centres commerciaux et les immeubles de bureaux. Nous disposons d'équipements spécifiques pour les rampes étroites, les hauteurs limitées et les véhicules non roulants dans ces espaces. Pas besoin de faire remonter le véhicule vous-même — nos équipes s'en chargent intégralement. Mentionnez simplement lors de votre demande que le véhicule est en sous-sol.`,
  `Administrateur d'une copropriété, gardien d'immeuble ou syndic confronté à une épave dans votre parking souterrain ? Nous travaillons régulièrement avec des professionnels de la gestion immobilière en Île-de-France. Nous pouvons intervenir sur présentation d'un mandat du copropriétaire ou, dans les cas d'abandon avéré (plus de 7 jours sans identification du propriétaire), en coordination avec la police municipale. N'hésitez pas à nous appeler pour discuter de votre situation spécifique.`,
  `En Île-de-France, les réglementations évoluent vite : ZFE-m, restrictions Crit'Air, obligation de destruction des VHU… Il n'est pas toujours facile de savoir ce qu'on peut et ne peut pas faire. Notre équipe connaît parfaitement le cadre juridique et réglementaire applicable à votre situation. Lors de notre intervention, nous vous expliquons clairement vos droits et obligations, et nous nous assurons que toutes les démarches sont réalisées dans les règles. Vous repartez avec un certificat de destruction valide et l'esprit tranquille.`,
];

/**
 * Sélectionne une variante "whyChoose" de façon déterministe selon le slug.
 * Même slug → même variante à chaque render (pas de rotation aléatoire qui
 * changerait entre SSG et hydratation).
 */
export function getWhyChooseVariant(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) & 0xffffffff;
  }
  return whyChooseVariants[Math.abs(hash) % whyChooseVariants.length];
}
