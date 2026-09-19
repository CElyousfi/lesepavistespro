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
    regulations: `Paris intra-muros est au cœur de la zone à faibles émissions (ZFE) de la Métropole du Grand Paris. Le calendrier des restrictions Crit'Air a beaucoup bougé : les sanctions pour les Crit'Air 3 ont été suspendues pour 2026, et une loi de simplification votée en avril 2026 prévoit la suppression des ZFE, sous réserve de sa promulgation. Quel que soit le cadre final, un véhicule ancien qui ne circule plus reste une charge (assurance, stationnement, risque de fourrière à 179 € puis 29 € par jour à Paris). L'enlèvement gratuit avec certificat de destruction est la façon la plus simple de s'en libérer, et nous nous chargeons de la déclaration de cession pour destruction.`,
    localContext: `À Paris, un véhicule enlevé par la fourrière coûte 179 € le premier jour puis 29 € par jour de garde (tarifs Ville de Paris), et il peut être vendu ou détruit s'il n'est pas récupéré : les cinq préfourrières (Louvre-Samaritaine, Charléty, Foch, Pouchet, Pantin) le gardent quelques jours avant transfert vers Chevaleret, Bonneuil ou La Courneuve. Notre service privé agréé est l'alternative choisie : intervention sous 2 h dans Paris, 7j/7, enlèvement 100 % gratuit et certificat de destruction remis sur place.`,
    keywords: ['épaviste paris', 'enlèvement épave gratuit paris', 'épaviste agréé vhu paris', 'enlèvement voiture paris', 'casse auto paris'],
  },
  {
    deptCode: '77',
    deptName: 'Seine-et-Marne',
    whyChoose: `La Seine-et-Marne est le plus grand département d'Île-de-France avec plus de 500 communes réparties sur 5 915 km². Cette superficie rend l'enlèvement d'épave plus complexe qu'ailleurs en IDF. Notre réseau de dépanneurs couvre l'intégralité du département, de Meaux au nord à Fontainebleau au sud, en passant par Melun, Chelles, et Pontault-Combault. Que vous soyez en zone urbaine ou en pleine campagne briarde, nous intervenons avec le même engagement : enlèvement gratuit sous 24h, certificat de destruction fourni sur place.`,
    caseStudy: `Exemple type d'intervention en Seine-et-Marne : enlèvement de plusieurs véhicules hors d'usage stationnés dans une propriété rurale. Pour ce type de cas, notre équipe se déplace avec un plateau grande capacité pour traiter plusieurs véhicules en une seule intervention. Les certificats de destruction sont délivrés immédiatement, permettant au propriétaire de régulariser sa situation vis-à-vis de la préfecture.`,
    regulations: `En Seine-et-Marne, aucune commune n'est dans le périmètre de la ZFE du Grand Paris : les contraintes sont plutôt celles des véhicules abandonnés sur la voie publique ou dans les propriétés. Le Code pénal punit l'abandon d'une épave (contravention de 5e classe), et le Code de l'environnement impose de confier tout véhicule hors d'usage à un centre VHU agréé, seul habilité à délivrer le certificat de destruction. Notre service gratuit vous met en conformité et prend en charge la déclaration de cession pour destruction.`,
    localContext: `Avec ses zones pavillonnaires étendues et ses nombreuses zones d'activités (Roissy, Marne-la-Vallée, Sénart), la Seine-et-Marne concentre un parc automobile important. Les centres VHU agréés du département traitent plus de 30 000 véhicules par an. Notre partenariat avec ces centres garantit un traitement écologique et conforme de votre épave.`,
    keywords: ['épaviste seine-et-marne', 'enlèvement épave 77', 'épaviste meaux', 'épaviste melun', 'casse auto seine-et-marne'],
  },
  {
    deptCode: '78',
    deptName: 'Yvelines',
    whyChoose: `Les Yvelines combinent zones urbaines denses (Versailles, Sartrouville, Poissy) et vastes espaces ruraux (forêt de Rambouillet, vallée de Chevreuse). Notre service d'épaviste couvre l'ensemble du département 78, avec une expertise particulière dans les communes de la boucle de Seine et du Mantois. Nous intervenons aussi bien dans les parkings souterrains des résidences de Saint-Germain-en-Laye que dans les propriétés rurales du sud du département. Paiement cash immédiat pour les véhicules en état de rouler.`,
    caseStudy: `Exemple type d'intervention dans les Yvelines : enlèvement d'un véhicule accidenté déclaré épave par l'assurance. Pour ce type de cas, nous récupérons le véhicule directement chez le propriétaire sous quelques heures. Le certificat de destruction est fourni immédiatement pour permettre le remboursement par l'assurance.`,
    regulations: `Les Yvelines sont en dehors du périmètre de la zone à faibles émissions du Grand Paris (limité aux communes situées à l'intérieur de l'A86, dans le 75, le 92, le 93 et le 94). En revanche, les règles nationales s'appliquent partout : un véhicule hors d'usage doit être remis à un centre VHU agréé, qui délivre le certificat de destruction et déclare la cession. Pour un véhicule qui ne roule plus, c'est aussi la seule façon d'arrêter l'assurance et la carte grise proprement.`,
    localContext: `Le département des Yvelines compte plus de 1,4 million d'habitants et un parc automobile parmi les plus importants d'IDF. Les communes comme Mantes-la-Jolie, Les Mureaux et Trappes concentrent un nombre important de véhicules en fin de vie. Notre maillage local permet une intervention rapide partout dans le 78.`,
    keywords: ['épaviste yvelines', 'enlèvement épave 78', 'épaviste versailles', 'épaviste sartrouville', 'casse auto yvelines'],
  },
  {
    deptCode: '91',
    deptName: 'Essonne',
    whyChoose: `L'Essonne, carrefour stratégique du sud de l'Île-de-France, combine pôles technologiques (Paris-Saclay, Évry-Courcouronnes) et zones résidentielles étendues. Notre service d'épaviste agréé VHU couvre les 196 communes du département, de Massy au nord à Étampes au sud. Nous intervenons rapidement dans les zones d'activités de Corbeil-Essonnes, les quartiers résidentiels de Savigny-sur-Orge, et les communes rurales du sud du département. Enlèvement 100% gratuit, 24h/24.`,
    caseStudy: `Exemple type d'intervention en Essonne : enlèvement d'un véhicule en panne stationné dans un parking de résidence. Dans ce type de situation, un syndic peut mettre en demeure le propriétaire de retirer le véhicule. Notre intervention gratuite résout le problème : enlèvement sous quelques heures, certificat de destruction fourni au propriétaire, copie disponible pour le syndic.`,
    regulations: `Six communes de l'Essonne appartiennent à la Métropole du Grand Paris, mais aucune n'est dans le périmètre de la ZFE, délimité par l'A86. Ce qui compte pour un véhicule en fin de vie en Essonne, c'est la réglementation VHU : remise obligatoire à un centre agréé, certificat de destruction, radiation du certificat d'immatriculation. Nous intervenons gratuitement et nous chargeons de ces démarches.`,
    localContext: `L'Essonne traite chaque année plus de 15 000 véhicules hors d'usage via ses centres VHU agréés. Les communes les plus sollicitées sont Évry-Courcouronnes, Corbeil-Essonnes, Massy, Savigny-sur-Orge et Grigny. Notre couverture complète du 91 garantit une intervention sous 24h partout dans le département.`,
    keywords: ['épaviste essonne', 'enlèvement épave 91', 'épaviste evry', 'épaviste massy', 'casse auto essonne'],
  },
  {
    deptCode: '92',
    deptName: 'Hauts-de-Seine',
    whyChoose: `Les Hauts-de-Seine, département le plus riche de France métropolitaine, présentent des défis logistiques uniques pour l'enlèvement d'épaves : densité urbaine extrême, parkings souterrains à niveaux multiples, et réglementations de stationnement strictes. Notre équipe d'épavistes agréés VHU intervient dans les 36 communes du département, de Nanterre à Boulogne-Billancourt, en passant par Colombes, Courbevoie et Issy-les-Moulineaux. Nous disposons de véhicules adaptés aux accès étroits et aux parkings souterrains.`,
    caseStudy: `Exemple type d'intervention dans les Hauts-de-Seine : enlèvement d'un véhicule accidenté dans un parking souterrain. Pour les véhicules non roulants en sous-sol, notre équipe utilise un chariot de manutention spécialisé pour sortir le véhicule avant de le charger sur notre plateau. Ce type d'intervention est réalisé en quelques heures, certificat de destruction fourni sur place.`,
    regulations: `La quasi-totalité des Hauts-de-Seine se trouve à l'intérieur de l'A86, donc dans le périmètre de la ZFE du Grand Paris. Les sanctions pour les Crit'Air 3 ont été suspendues pour 2026 et la suppression des ZFE a été votée en avril 2026 (loi en cours de promulgation) : vérifiez les règles en vigueur avant de vous déplacer. Pour un véhicule qui ne circule plus, la question ne se pose pas : l'enlèvement gratuit par un épaviste agréé, avec certificat de destruction, reste la solution la plus rapide.`,
    localContext: `Avec une densité de population parmi les plus élevées de France, les Hauts-de-Seine génèrent un flux constant de véhicules en fin de vie. Les communes de Gennevilliers et Nanterre abritent des centres de traitement VHU majeurs. Notre proximité avec ces centres garantit un traitement rapide et écologique de votre véhicule.`,
    keywords: ['épaviste hauts-de-seine', 'enlèvement épave 92', 'épaviste nanterre', 'épaviste boulogne', 'casse auto 92'],
  },
  {
    deptCode: '93',
    deptName: 'Seine-Saint-Denis',
    whyChoose: `La Seine-Saint-Denis est le département francilien avec le plus grand nombre de véhicules hors d'usage traités chaque année. Notre service d'épaviste agréé VHU couvre l'ensemble des 40 communes du 93, de Saint-Denis à Montreuil, en passant par Aulnay-sous-Bois, Bondy et Pantin. Nous intervenons 24h/24 et 7j/7, y compris les jours fériés. Enlèvement gratuit garanti, même pour les véhicules sans carte grise ou sans contrôle technique.`,
    caseStudy: `Exemple type d'intervention en Seine-Saint-Denis : enlèvement de plusieurs véhicules abandonnés sur un terrain privé à la demande du propriétaire foncier. Les véhicules abandonnés représentent un risque environnemental (fuites d'huile, batteries au plomb). Notre équipe peut traiter plusieurs véhicules en une demi-journée avec délivrance de tous les certificats de destruction.`,
    regulations: `Les communes de Seine-Saint-Denis situées à l'intérieur de l'A86 (Saint-Denis, Aubervilliers, Pantin, Montreuil, Bobigny, Bondy… en tout ou partie) sont dans le périmètre de la ZFE du Grand Paris ; celles au-delà (Aulnay-sous-Bois, Sevran, Tremblay-en-France…) ne le sont pas. L'abandon d'un véhicule sur la voie publique est une contravention de 5e classe (jusqu'à 1 500 €), et les véhicules ventouses peuvent être mis en fourrière puis détruits. Faire enlever gratuitement une épave avec certificat de destruction évite ces sanctions.`,
    localContext: `Le 93 concentre plusieurs centres VHU agréés et casses automobiles historiques. Notre partenariat avec ces centres garantit un recyclage optimal de votre véhicule : 95% des matériaux sont réutilisés ou recyclés conformément à la directive européenne. Chaque année, plus de 20 000 véhicules sont traités dans le département.`,
    keywords: ['épaviste seine-saint-denis', 'enlèvement épave 93', 'épaviste saint-denis', 'épaviste montreuil', 'casse auto 93'],
  },
  {
    deptCode: '94',
    deptName: 'Val-de-Marne',
    whyChoose: `Le Val-de-Marne, avec ses 47 communes et plus de 1,4 million d'habitants, est un territoire dense où les problématiques de stationnement et de véhicules en fin de vie sont quotidiennes. Notre service d'épaviste agréé VHU couvre tout le département 94, de Créteil à Vincennes, en passant par Vitry-sur-Seine, Champigny-sur-Marne et Ivry-sur-Seine. Intervention rapide sous 24h, enlèvement gratuit même en parking souterrain.`,
    caseStudy: `Exemple type d'intervention dans le Val-de-Marne : enlèvement urgent d'un véhicule utilitaire hors d'usage bloquant l'accès à un local commercial. Pour les urgences, notre équipe peut intervenir sous 2 heures, y compris le week-end. Le véhicule est remorqué vers notre centre VHU partenaire, et le certificat de destruction est remis au propriétaire dans la journée.`,
    regulations: `Dans le Val-de-Marne, seules les communes situées à l'intérieur de l'A86 (Vincennes, Saint-Mandé, Ivry-sur-Seine, Vitry-sur-Seine, Créteil, Maisons-Alfort, Champigny-sur-Marne en partie…) sont dans le périmètre de la ZFE du Grand Paris. Le calendrier des restrictions Crit'Air est incertain en 2026 (sanctions suspendues, suppression votée en avril 2026 sous réserve de promulgation). Pour un véhicule en fin de vie, l'obligation qui ne change pas est la remise à un centre VHU agréé, avec certificat de destruction.`,
    localContext: `Le Val-de-Marne dispose de plusieurs centres de traitement VHU agréés, notamment à Vitry-sur-Seine et Ivry-sur-Seine. Ces centres assurent la dépollution complète des véhicules avant recyclage. Notre service garantit que votre véhicule sera traité dans le strict respect des normes environnementales.`,
    keywords: ['épaviste val-de-marne', 'enlèvement épave 94', 'épaviste créteil', 'épaviste vitry', 'casse auto 94'],
  },
  {
    deptCode: '95',
    deptName: "Val-d'Oise",
    whyChoose: `Le Val-d'Oise combine zones urbaines denses (Argenteuil, Cergy, Sarcelles) et espaces ruraux du Vexin français. Notre service d'épaviste agréé VHU couvre l'ensemble du département 95, avec une expertise particulière dans les communes proches de l'aéroport de Roissy-Charles de Gaulle, où les véhicules de location et utilitaires en fin de vie sont nombreux. Enlèvement gratuit 24h/24, certificat de destruction immédiat.`,
    caseStudy: `Exemple type d'intervention dans le Val-d'Oise : enlèvement d'un véhicule abandonné dans une rue résidentielle, signalé à la mairie par les riverains. Ce type d'intervention peut être réalisé en coordination avec la police municipale. Le propriétaire reçoit son certificat de destruction, ce qui le libère de toute responsabilité.`,
    regulations: `Le Val-d'Oise est en dehors du périmètre de la ZFE du Grand Paris : Argenteuil et Bezons appartiennent à la Métropole mais se trouvent au-delà de l'A86, qui délimite la zone. Les obligations VHU restent les mêmes partout dans le département : seul un centre agréé peut délivrer un certificat de destruction valable, et l'abandon d'une épave est sanctionné. Nous intervenons gratuitement dans les 184 communes et gérons la déclaration de cession pour destruction.`,
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
  regulations: `La zone à faibles émissions (ZFE) de la Métropole du Grand Paris couvre Paris et les communes situées à l'intérieur de l'A86, dans les Hauts-de-Seine, la Seine-Saint-Denis et le Val-de-Marne ; la grande couronne (77, 78, 91, 95) est en dehors du périmètre. Son avenir est incertain : les sanctions pour les Crit'Air 3 ont été suspendues pour 2026 et une loi de simplification votée en avril 2026 prévoit la suppression des ZFE, sous réserve de promulgation. Ce qui ne change pas, c'est la réglementation des véhicules hors d'usage : un VHU doit être remis à un centre agréé, qui dépollue, recycle et délivre le certificat de destruction (directive européenne 2000/53/CE) — document que nous remettons le jour de l'enlèvement, avec la déclaration de cession pour destruction. La prime à la conversion nationale a été supprimée en décembre 2024 ; les aides à l'achat d'un véhicule propre (coup de pouce CEE, dispositifs locaux) évoluent chaque année, renseignez-vous avant de compter dessus.`,
  localContext: `L'Île-de-France concentre plus de 12 millions d'habitants et le parc automobile le plus dense de France, avec des fourrières très sollicitées : à Paris, un véhicule enlevé coûte 179 € le premier jour puis 29 € par jour de garde (tarifs Ville de Paris), et il peut être vendu ou détruit s'il n'est pas récupéré. Notre service privé agréé est l'alternative choisie : intervention sous 2 h en zone dense, certificat de destruction remis sur place, et gestion complète des démarches de cession pour destruction. Pour un véhicule ancien qui ne peut plus ou ne doit plus circuler, l'enlèvement gratuit est la sortie la plus simple et la plus sûre.`,
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

// ─────────────────────────────────────────────────────────────────────────────
// HUBS DÉPARTEMENTAUX (P2.2) — 400+ mots uniques par département, faits
// publics uniquement (INSEE via geo.api.gouv.fr, paris.fr, préfectures,
// Métropole du Grand Paris). Rendus par components/IdfDepartmentPage.tsx sur
// les 16 pages département IDF (épaviste + rachat).
// ─────────────────────────────────────────────────────────────────────────────

export interface IdfDeptHub {
  deptCode: string;
  /** Préfecture (chef-lieu). */
  prefecture: string;
  /** Intro paragraphs — the department in two paragraphs. */
  intro: string[];
  /** Circulation : axes, trafic, aéroports, gares. */
  circulation: string;
  /** Habitat et stationnement : ce que ça change pour un enlèvement. */
  habitat: string;
  /** ZFE et réglementation locale, formulée avec prudence (cadre 2026 mouvant). */
  zfe: string;
  /** Fourrière : qui enlève, où, combien — faits publics. */
  fourriere: string;
  /** Rachat angle: what sells in this department. */
  rachat: string;
  sources: string[];
}

export const idfDeptHubs: IdfDeptHub[] = [
  {
    deptCode: '75',
    prefecture: 'Paris',
    intro: [
      `Paris, c'est vingt arrondissements sur 105 km², plus de deux millions d'habitants et la densité la plus élevée de France. Une épave n'y reste jamais longtemps invisible : elle occupe une place de stationnement rare, elle finit signalée par un gardien, un syndic ou un voisin, et elle attire la fourrière. Notre service d'épaviste agréé VHU intervient dans les 20 arrondissements, du 1er au 20e, avec un plateau adapté aux rues étroites du centre et aux rampes des parkings souterrains.`,
      `Ce qui distingue Paris des autres départements franciliens, c'est la part de véhicules garés en sous-sol et en cour d'immeuble. Les parkings haussmanniens ou des années 1970 imposent souvent une hauteur libre inférieure à 1,90 m et des rampes en colimaçon : on n'y entre pas avec un poids lourd. Nous travaillons avec un treuil et un chariot de manutention pour remonter un véhicule qui ne roule plus jusqu'au niveau de la rue, avant de le charger.`,
    ],
    circulation: `Le boulevard périphérique (35 km) ceinture la ville et sépare Paris des communes limitrophes ; à l'intérieur, la vitesse est limitée à 30 km/h sur la quasi-totalité des rues depuis août 2021, et les voies sur berges sont fermées à la circulation automobile sur la rive droite comme sur la rive gauche. Les opérations « Paris Respire » ferment certains quartiers le dimanche. Pour un enlèvement, cela signifie une intervention planifiée : créneau matinal ou en soirée dans les arrondissements centraux, itinéraire d'accès vérifié, et arrêt minute autorisé sur la chaussée le temps du chargement.`,
    habitat: `Immeubles haussmanniens, copropriétés récentes avec parkings sur plusieurs niveaux, box fermés, cours intérieures accessibles par une porte cochère : chaque configuration parisienne a sa méthode. Nous demandons systématiquement la hauteur de la rampe, le niveau où se trouve le véhicule et la présence ou non d'un gardien, pour envoyer le bon matériel du premier coup. Un véhicule en cour d'immeuble ou en box est extrait au treuil jusqu'au trottoir, puis chargé sur le plateau.`,
    zfe: `Paris intra-muros est au cœur de la zone à faibles émissions de la Métropole du Grand Paris. Le calendrier des restrictions Crit'Air a beaucoup évolué : les sanctions pour les véhicules Crit'Air 3 ont été suspendues pour 2026 et une loi de simplification votée en avril 2026 prévoit la suppression des ZFE, sous réserve de sa promulgation. Quel que soit le cadre final, un véhicule ancien qui ne roule plus reste une charge : assurance, stationnement, risque de fourrière. L'enlèvement gratuit avec certificat de destruction met fin à tout cela en une visite.`,
    fourriere: `À Paris, les fourrières sont gérées par la Ville (renseignements au 3975, portail « Où est mon véhicule ? »). Un véhicule enlevé passe d'abord par l'une des cinq préfourrières — Louvre-Samaritaine (1er), Charléty (13e), Foch (16e), Pantin (19e) ou Pouchet (Clichy) — puis, après quelques jours, par les fourrières de Chevaleret (13e), de Bonneuil-sur-Marne ou de La Courneuve. Pour une voiture particulière, le tarif est de 179 € le premier jour puis 29 € par jour de garde ; un véhicule non récupéré peut être vendu ou détruit. Si votre véhicule est déjà en fourrière et que vous ne souhaitez pas le récupérer, nous pouvons vous aider à organiser sa destruction.`,
    rachat: `À Paris, les voitures que nous rachetons le plus souvent sont des citadines et compactes peu kilométrées mais vieillissantes, des véhicules Crit'Air 3 ou plus que leur propriétaire ne veut plus assurer, et des voitures immobilisées en parking après une panne ou un sinistre. Le rachat se fait sur place, avec paiement le jour de l'enlèvement et prise en charge de la déclaration de cession.`,
    sources: [
      'paris.fr — Fourrières et préfourrières (adresses, horaires, tarifs)',
      'INSEE via geo.api.gouv.fr — population des arrondissements',
      'Métropole du Grand Paris — périmètre de la ZFE',
    ],
  },
  {
    deptCode: '77',
    prefecture: 'Melun',
    intro: [
      `La Seine-et-Marne est le plus vaste département d'Île-de-France : près de 6 000 km², soit environ la moitié de la superficie régionale, et 507 communes, de Chelles et Torcy aux portes de Paris jusqu'à Provins et Nemours à plus d'une heure de route. Avec quelque 1,4 million d'habitants, c'est un territoire où l'on possède souvent deux véhicules par foyer et où une voiture en fin de vie reste facilement des mois au fond d'un jardin ou d'une allée.`,
      `Notre service d'épaviste agréé VHU couvre tout le département, préfecture de Melun comprise. En petite couronne, l'intervention se joue sur l'accès ; en Seine-et-Marne, elle se joue sur la distance et la planification : nous regroupons les enlèvements par secteur (Marne-la-Vallée, Sénart, Meaux, Fontainebleau, Provins, Montereau) pour intervenir rapidement même dans les communes rurales.`,
    ],
    circulation: `Le département est traversé par l'A4 (vers Reims), l'A5 (vers Troyes), l'A6 (vers Lyon) et bouclé par la Francilienne (N104/A104), qui relie Marne-la-Vallée, Sénart et Évry. La N4 et la N36 desservent l'est et le sud. Les pôles de Marne-la-Vallée (Disneyland Paris à Chessy, Val d'Europe), de Sénart et de Meaux concentrent le trafic et les grands parkings de centres commerciaux ; le reste du territoire se parcourt par départementales, ce qui nous impose des plateaux capables d'aller chercher un véhicule en chemin rural ou sur terrain non stabilisé.`,
    habitat: `La Seine-et-Marne est majoritairement pavillonnaire : le véhicule à enlever est le plus souvent dans une allée, un garage individuel, un jardin ou un champ, parfois enfoncé dans la terre après plusieurs hivers. Les villes nouvelles (Marne-la-Vallée, Sénart) et les centres-villes de Meaux, Melun ou Chelles ajoutent des parkings souterrains de résidences et des copropriétés. Dans tous les cas, nous demandons une photo et une description de l'accès pour envoyer le bon équipement : treuil long, plateau à rampe basse, ou simple dépanneuse pour un véhicule roulant.`,
    zfe: `Aucune commune de Seine-et-Marne n'est dans le périmètre de la zone à faibles émissions du Grand Paris, délimité par l'A86. Les contraintes du département sont plutôt celles des véhicules abandonnés : le Code pénal punit l'abandon d'une épave d'une contravention de 5e classe, et le Code de l'environnement impose de confier tout véhicule hors d'usage à un centre VHU agréé, seul habilité à délivrer le certificat de destruction. Une voiture qui dort dans un jardin depuis trois ans est concernée au même titre qu'une épave sur la voie publique.`,
    fourriere: `Hors Paris, les mises en fourrière sont décidées par la police municipale, la police nationale ou la gendarmerie de la commune, et les véhicules sont conduits vers des fourrières municipales ou agréées par la préfecture. Les frais sont plafonnés au niveau national pour une voiture particulière (enlèvement puis garde journalière, plus une expertise après trois jours). Pour savoir où se trouve un véhicule enlevé en Seine-et-Marne, adressez-vous au commissariat ou à la brigade de gendarmerie du lieu de stationnement. Si le véhicule ne vaut pas les frais, nous pouvons intervenir directement en fourrière avec votre accord écrit.`,
    rachat: `En Seine-et-Marne, nous rachetons surtout des berlines et des SUV kilométrés, des utilitaires d'artisans en fin de carrière et des véhicules accidentés immobilisés chez un garagiste. Le rachat inclut l'enlèvement, quelle que soit la commune, et le paiement le jour du départ du véhicule.`,
    sources: [
      'INSEE via geo.api.gouv.fr — population et nombre de communes',
      'Métropole du Grand Paris — périmètre de la ZFE',
      'Code pénal art. R.635-8 ; Code de l’environnement (filière VHU)',
    ],
  },
  {
    deptCode: '78',
    prefecture: 'Versailles',
    intro: [
      `Les Yvelines s'étendent sur 2 284 km² et 259 communes, de la boucle de Seine (Sartrouville, Poissy, Les Mureaux, Mantes-la-Jolie) au plateau de Saint-Quentin-en-Yvelines et jusqu'aux forêts de Rambouillet et de Saint-Germain-en-Laye. Près de 1,5 million d'habitants y vivent, dans un mélange de villes industrielles de vallée, de villes nouvelles et de communes résidentielles très pavillonnaires.`,
      `Notre service d'épaviste agréé VHU intervient dans tout le département, préfecture de Versailles comprise. Les demandes viennent autant des grandes copropriétés de Sartrouville, Trappes ou Mantes-la-Jolie que des pavillons de Rambouillet ou de Maisons-Laffitte : nous adaptons le plateau, le treuil et le créneau d'intervention à chaque situation.`,
    ],
    circulation: `L'A13 (autoroute de Normandie), l'A12 vers Saint-Quentin-en-Yvelines, l'A14 et l'A86 côté Versailles–Vélizy, la N12 vers Dreux, la N10 vers Rambouillet et la N118 structurent le département. Les vallées de la Seine et de la Mauldre ainsi que les forêts imposent des détours ; les zones d'activité (Poissy, Flins, Les Mureaux, Trappes, Vélizy) génèrent un volume important d'utilitaires et de véhicules de flotte à retirer. Nous planifions les tournées par secteur pour tenir des délais courts même à l'ouest du département.`,
    habitat: `Pavillons avec allée ou garage, résidences des années 1960–1980 avec parkings en sous-sol (Trappes, Élancourt, Les Mureaux, Chanteloup-les-Vignes), centres anciens aux rues étroites (Versailles, Saint-Germain-en-Laye, Poissy) et propriétés forestières isolées : la palette est large. Nous demandons systématiquement l'accès (portail, largeur de l'allée, hauteur de rampe) et l'état du véhicule (roues, direction, freins bloqués) pour envoyer l'équipement adapté.`,
    zfe: `Les Yvelines sont en dehors du périmètre de la zone à faibles émissions du Grand Paris, limité aux communes situées à l'intérieur de l'A86 dans les Hauts-de-Seine, la Seine-Saint-Denis et le Val-de-Marne. Les règles nationales s'appliquent en revanche partout : un véhicule hors d'usage doit être remis à un centre VHU agréé, qui délivre le certificat de destruction et déclare la cession. C'est aussi la seule façon d'arrêter proprement l'assurance et le certificat d'immatriculation d'un véhicule qui ne roulera plus.`,
    fourriere: `Dans les Yvelines, la mise en fourrière relève de la police municipale, de la police nationale ou de la gendarmerie de la commune concernée, avec des fourrières municipales ou agréées par la préfecture. Pour une voiture particulière, les frais sont plafonnés au niveau national (enlèvement, garde journalière, expertise au-delà de trois jours). Pour localiser un véhicule enlevé, contactez le commissariat ou la brigade du lieu de stationnement. Si le véhicule n'a plus de valeur, nous pouvons organiser sa sortie de fourrière pour destruction, sur votre mandat.`,
    rachat: `Dans les Yvelines, nous rachetons des véhicules de tous âges : citadines de seconde voiture, berlines et breaks familiaux, utilitaires d'artisans, voitures accidentées ou en panne moteur. Le rachat comprend l'enlèvement à domicile et le paiement le jour même.`,
    sources: [
      'INSEE via geo.api.gouv.fr — population et nombre de communes',
      'Métropole du Grand Paris — périmètre de la ZFE',
    ],
  },
  {
    deptCode: '91',
    prefecture: 'Évry-Courcouronnes',
    intro: [
      `L'Essonne compte 194 communes et un peu plus de 1,3 million d'habitants sur 1 804 km². Le nord du département (Massy, Palaiseau, Savigny-sur-Orge, Athis-Mons, Viry-Châtillon) est dense, en continuité avec la petite couronne ; le centre (Évry-Courcouronnes, Corbeil-Essonnes, Sainte-Geneviève-des-Bois) mêle grands ensembles et pavillons ; le sud (Étampes, Dourdan, Milly-la-Forêt) est rural.`,
      `Notre service d'épaviste agréé VHU intervient dans toute l'Essonne, préfecture d'Évry-Courcouronnes comprise. Les demandes les plus fréquentes : un véhicule immobilisé dans le parking d'une résidence, une voiture en panne restée chez un garagiste, un utilitaire en fin de vie dans une zone d'activité, ou une épave dans un jardin du sud du département.`,
    ],
    circulation: `L'A6 et l'A10 traversent le département du nord au sud, reliées par la Francilienne (N104) ; la N20 et la N118 desservent l'ouest, l'A126 relie Massy à Palaiseau et au plateau de Saclay. La gare de Massy TGV, l'aéroport d'Orly en limite nord (Paray-Vieille-Poste) et les zones d'activité de Courtabœuf, Évry et Corbeil génèrent beaucoup de trafic et de véhicules de flotte. Nous organisons les enlèvements par secteur : nord dense, vallée de l'Orge, Évry–Corbeil, Étampois.`,
    habitat: `Résidences des années 1960–1970 avec parkings souterrains (Grigny, Évry-Courcouronnes, Massy, Les Ulis), quartiers pavillonnaires étendus (Sainte-Geneviève-des-Bois, Savigny-sur-Orge, Brétigny-sur-Orge), copropriétés récentes le long du RER C et D, fermes et propriétés isolées dans le sud : l'accès varie beaucoup. Nous demandons l'emplacement exact du véhicule (niveau de parking, hauteur de rampe, allée, terrain) et son état pour envoyer un plateau ou une dépanneuse avec le bon équipement.`,
    zfe: `Six communes de l'Essonne appartiennent à la Métropole du Grand Paris, mais aucune n'est dans le périmètre de la zone à faibles émissions, délimité par l'A86. Ce qui compte pour un véhicule en fin de vie en Essonne, c'est la réglementation VHU : remise obligatoire à un centre agréé, certificat de destruction, radiation du certificat d'immatriculation. Nous nous chargeons de ces démarches le jour de l'enlèvement.`,
    fourriere: `En Essonne, les mises en fourrière sont décidées par la police municipale, la police nationale ou la gendarmerie de la commune, et les véhicules rejoignent des fourrières municipales ou agréées par la préfecture. Les frais d'une voiture particulière sont plafonnés au niveau national (enlèvement, garde par jour, expertise après trois jours). Le commissariat ou la brigade du lieu de stationnement vous indique où se trouve le véhicule. Lorsqu'il ne vaut plus les frais de sortie, nous pouvons le récupérer directement en fourrière pour destruction.`,
    rachat: `En Essonne, nous rachetons des citadines et compactes de seconde main, des véhicules familiaux kilométrés, des utilitaires de zones d'activité et des voitures accidentées ou en panne, avec ou sans contrôle technique. Enlèvement inclus, paiement le jour du départ du véhicule.`,
    sources: [
      'INSEE via geo.api.gouv.fr — population et nombre de communes',
      'Métropole du Grand Paris — communes membres et périmètre de la ZFE',
    ],
  },
  {
    deptCode: '92',
    prefecture: 'Nanterre',
    intro: [
      `Les Hauts-de-Seine, ce sont 36 communes sur 176 km² et plus de 1,6 million d'habitants : après Paris, c'est le département le plus dense de France. Boulogne-Billancourt, Nanterre, Colombes, Asnières-sur-Seine, Courbevoie, Rueil-Malmaison, Issy-les-Moulineaux, Levallois-Perret… presque toutes les communes dépassent 20 000 habitants, et la voiture y est très majoritairement garée en sous-sol.`,
      `Notre service d'épaviste agréé VHU intervient dans les 36 communes, préfecture de Nanterre comprise, avec un équipement pensé pour les parkings à plusieurs niveaux : treuil, chariot de manutention pour véhicule aux roues bloquées, plateau à rampe basse. Le quartier d'affaires de La Défense (Puteaux, Courbevoie, Nanterre) ajoute ses parkings d'entreprise et ses contraintes d'accès.`,
    ],
    circulation: `L'A86 fait le tour du département par Nanterre, Colombes, Gennevilliers et Antony ; l'A13 et l'A14 partent vers l'ouest, la N13 traverse Neuilly et Courbevoie, la N118 file vers le plateau de Saclay depuis le pont de Sèvres, et la D7 longe la Seine. Le trafic est dense en semaine, surtout autour de La Défense et du pont de Sèvres : nous privilégions des créneaux tôt le matin ou en fin de journée pour les enlèvements en voirie, et nous vérifions à l'avance les hauteurs de parking.`,
    habitat: `Grandes copropriétés avec parkings souterrains sur deux à quatre niveaux, immeubles de bureaux avec parkings d'entreprise, résidences récentes en bord de Seine, quelques secteurs pavillonnaires (Bois-Colombes, Le Plessis-Robinson, Sceaux, Vaucresson) : l'enlèvement dans les Hauts-de-Seine commence presque toujours par une question de rampe et de hauteur libre. Nous coordonnons l'intervention avec le gardien ou le syndic lorsque le véhicule est dans une copropriété, et nous pouvons intervenir sur mandat d'un professionnel de l'immobilier.`,
    zfe: `La quasi-totalité des Hauts-de-Seine se trouve à l'intérieur de l'A86, donc dans le périmètre de la zone à faibles émissions du Grand Paris. Les sanctions pour les Crit'Air 3 ont été suspendues pour 2026 et la suppression des ZFE a été votée en avril 2026 (loi en cours de promulgation) : vérifiez les règles en vigueur avant de vous déplacer avec un véhicule ancien. Pour un véhicule qui ne circule plus, la question ne se pose pas : l'enlèvement gratuit par un épaviste agréé, avec certificat de destruction, reste la sortie la plus simple.`,
    fourriere: `Dans les Hauts-de-Seine, les mises en fourrière relèvent de la police (nationale ou municipale selon la commune), et les véhicules sont conduits vers des fourrières agréées, dont celle de Gennevilliers ; la préfourrière Pouchet (Clichy) dépend, elle, de la Ville de Paris. Les frais d'une voiture particulière sont plafonnés au niveau national (enlèvement, garde journalière, expertise au-delà de trois jours). Le commissariat du lieu d'enlèvement vous indique la fourrière et délivre l'autorisation de sortie. Si le véhicule ne vaut plus ces frais, nous pouvons organiser sa destruction directement depuis la fourrière.`,
    rachat: `Dans les Hauts-de-Seine, nous rachetons beaucoup de citadines et de compactes de résidents qui abandonnent la voiture, des véhicules Crit'Air 3 ou plus, des voitures de fonction en fin de contrat et des véhicules immobilisés en parking après un sinistre. Le rachat se fait sur place, paiement le jour de l'enlèvement, cession déclarée par nos soins.`,
    sources: [
      'INSEE via geo.api.gouv.fr — population et nombre de communes',
      'paris.fr — préfourrière Pouchet (Clichy)',
      'Métropole du Grand Paris — périmètre de la ZFE',
    ],
  },
  {
    deptCode: '93',
    prefecture: 'Bobigny',
    intro: [
      `La Seine-Saint-Denis compte 40 communes et 1,7 million d'habitants sur 236 km² : c'est le département le plus peuplé de la petite couronne et l'un des plus jeunes de France. Saint-Denis, Montreuil, Aubervilliers, Aulnay-sous-Bois, Drancy, Noisy-le-Grand, Pantin, Bondy, Épinay-sur-Seine, Sevran : dix communes dépassent 50 000 habitants, et le parc automobile y est ancien.`,
      `Notre service d'épaviste agréé VHU intervient dans tout le département, préfecture de Bobigny comprise. Les demandes viennent des copropriétés et des bailleurs (véhicules ventouses en parking), des particuliers dont la voiture ne passe plus le contrôle technique, et des entreprises des zones d'activité de Saint-Denis, Aubervilliers, Le Bourget ou Tremblay-en-France.`,
    ],
    circulation: `L'A1 (Roissy) et l'A3 (Lille, Bobigny) traversent le département, l'A86 le coupe d'est en ouest, la Francilienne (A104) passe à l'est, la N2 et la N3 desservent Le Bourget, Aulnay et Bondy. Le Stade de France à Saint-Denis, l'aéroport du Bourget et la partie sud de Roissy-Charles-de-Gaulle (Tremblay-en-France) créent des pics de trafic et des restrictions ponctuelles : nous évitons les jours de match et de salon pour les enlèvements en voirie autour du Stade et du Bourget.`,
    habitat: `Grands ensembles avec parkings souterrains ou en dalle (Bobigny, La Courneuve, Clichy-sous-Bois, Sevran), quartiers pavillonnaires (Le Raincy, Villemomble, Gagny, Rosny-sous-Bois), tissu ancien et dense (Montreuil, Saint-Ouen-sur-Seine, Pantin), zones industrielles reconverties : la Seine-Saint-Denis demande de vérifier l'accès avant de partir. Nous intervenons en sous-sol au treuil et au chariot, et nous travaillons régulièrement avec les gardiens et les gestionnaires d'immeubles pour les véhicules abandonnés.`,
    zfe: `Les communes de Seine-Saint-Denis situées à l'intérieur de l'A86 (Saint-Denis, Aubervilliers, Pantin, Montreuil, Bobigny, Bondy… en tout ou partie) sont dans le périmètre de la zone à faibles émissions du Grand Paris ; celles au-delà (Aulnay-sous-Bois, Sevran, Tremblay-en-France…) ne le sont pas. Le calendrier des restrictions Crit'Air est incertain en 2026 (sanctions suspendues, suppression votée en avril 2026 sous réserve de promulgation). L'abandon d'un véhicule sur la voie publique reste une contravention de 5e classe, et un véhicule ventouse peut être mis en fourrière puis détruit.`,
    fourriere: `Une partie des véhicules enlevés en Seine-Saint-Denis rejoint la fourrière de La Courneuve (92 avenue Jean Mermoz), utilisée par la Ville de Paris et la préfecture de police ; les communes disposent aussi de fourrières municipales ou agréées. Pour une voiture particulière, les frais sont plafonnés au niveau national hors Paris (enlèvement, garde journalière, expertise après trois jours). Le commissariat du lieu d'enlèvement délivre l'autorisation de sortie. Si le véhicule ne vaut pas les frais, nous pouvons intervenir en fourrière pour sa destruction, avec votre mandat écrit.`,
    rachat: `En Seine-Saint-Denis, nous rachetons beaucoup de véhicules sans contrôle technique, de voitures Crit'Air 3 ou plus, d'utilitaires d'artisans et de véhicules accidentés ou en panne moteur. Le rachat comprend l'enlèvement à domicile ou en parking, le paiement le jour même et la déclaration de cession.`,
    sources: [
      'INSEE via geo.api.gouv.fr — population et nombre de communes',
      'paris.fr — fourrière de La Courneuve',
      'Métropole du Grand Paris — périmètre de la ZFE',
    ],
  },
  {
    deptCode: '94',
    prefecture: 'Créteil',
    intro: [
      `Le Val-de-Marne, ce sont 47 communes sur 245 km² et 1,4 million d'habitants, entre la Marne, la Seine et l'aéroport d'Orly. Créteil, Vitry-sur-Seine, Champigny-sur-Marne, Saint-Maur-des-Fossés, Ivry-sur-Seine, Villejuif, Maisons-Alfort, Fontenay-sous-Bois, Vincennes : le nord et l'ouest du département sont très urbains, l'est (Boissy-Saint-Léger, Sucy-en-Brie, Villiers-sur-Marne) plus pavillonnaire.`,
      `Notre service d'épaviste agréé VHU intervient dans tout le Val-de-Marne, préfecture de Créteil comprise. Les situations les plus fréquentes : véhicule immobilisé dans le parking d'une résidence, voiture qui ne passe plus le contrôle technique, utilitaire en fin de vie du côté de Rungis ou d'Orly, épave en jardin dans les communes de l'est.`,
    ],
    circulation: `L'A4 longe la Marne vers Champigny et Marne-la-Vallée, l'A6 file vers Orly et Rungis, l'A86 traverse le département de Créteil à Vitry, la N19 dessert Boissy-Saint-Léger, la N6 et la N7 le sud. L'aéroport d'Orly et le marché d'intérêt national de Rungis génèrent un trafic professionnel très dense : nous planifions les enlèvements en dehors des heures de pointe sur ces secteurs. Le bois de Vincennes et les boucles de la Marne imposent des itinéraires précis pour un plateau.`,
    habitat: `Grands ensembles et copropriétés avec parkings souterrains (Créteil, Vitry-sur-Seine, Villejuif, Ivry-sur-Seine, Champigny-sur-Marne), quartiers pavillonnaires (Saint-Maur-des-Fossés, Le Perreux-sur-Marne, Sucy-en-Brie, Ormesson-sur-Marne), immeubles anciens de Vincennes et Saint-Mandé aux cours étroites, zones logistiques de Rungis et d'Orly : nous adaptons le matériel (treuil, chariot, plateau à rampe basse) à chaque accès et nous coordonnons avec les gardiens et syndics pour les véhicules en copropriété.`,
    zfe: `Dans le Val-de-Marne, seules les communes situées à l'intérieur de l'A86 (Vincennes, Saint-Mandé, Ivry-sur-Seine, Vitry-sur-Seine, Créteil, Maisons-Alfort, Champigny-sur-Marne en partie…) sont dans le périmètre de la zone à faibles émissions du Grand Paris. Le calendrier des restrictions Crit'Air est incertain en 2026 (sanctions suspendues, suppression votée en avril 2026 sous réserve de promulgation). Pour un véhicule en fin de vie, l'obligation qui ne change pas est la remise à un centre VHU agréé, avec certificat de destruction.`,
    fourriere: `Une partie des véhicules enlevés dans le Val-de-Marne rejoint la fourrière de Bonneuil-sur-Marne (11 rue des Champs, RN 19), utilisée par la Ville de Paris et la préfecture de police ; les communes ont aussi leurs fourrières municipales ou agréées. Hors Paris, les frais d'une voiture particulière sont plafonnés au niveau national (enlèvement, garde journalière, expertise après trois jours). Le commissariat du lieu d'enlèvement délivre l'autorisation de sortie. Lorsque le véhicule ne vaut plus ces frais, nous pouvons organiser sa destruction directement depuis la fourrière.`,
    rachat: `Dans le Val-de-Marne, nous rachetons des citadines et compactes de résidents, des véhicules familiaux kilométrés, des utilitaires liés à Rungis et Orly, et des voitures accidentées ou en panne, avec ou sans contrôle technique. Enlèvement inclus, paiement le jour du départ du véhicule.`,
    sources: [
      'INSEE via geo.api.gouv.fr — population et nombre de communes',
      'paris.fr — fourrière de Bonneuil-sur-Marne',
      'Métropole du Grand Paris — périmètre de la ZFE',
    ],
  },
  {
    deptCode: '95',
    prefecture: 'Cergy',
    intro: [
      `Le Val-d'Oise réunit 184 communes et près de 1,3 million d'habitants sur 1 246 km². Le sud-est (Argenteuil, Bezons, Sarcelles, Garges-lès-Gonesse, Villiers-le-Bel, Goussainville) est dense et en continuité avec la Seine-Saint-Denis et les Hauts-de-Seine ; l'agglomération de Cergy-Pontoise accueille la préfecture ; l'ouest (Vexin français) et le nord (Pays de France) sont ruraux.`,
      `Notre service d'épaviste agréé VHU intervient dans tout le département, de la vallée de Montmorency aux villages du Vexin. Argenteuil, plus grande commune du Val-d'Oise et l'une des plus peuplées d'Île-de-France, concentre les demandes en copropriété ; les zones d'activité de Roissy et de Cergy génèrent des enlèvements d'utilitaires et de véhicules de flotte.`,
    ],
    circulation: `L'A15 relie Argenteuil à Cergy-Pontoise, l'A115 dessert la vallée de Montmorency, l'A1 et l'A16 traversent l'est du département vers Roissy et Beauvais, la Francilienne (N104) et la N184 relient Cergy à Roissy. L'aéroport de Roissy-Charles-de-Gaulle, en grande partie sur le Val-d'Oise, et ses zones logistiques (Roissy, Goussainville, Gonesse) créent un trafic poids lourds important. Nous organisons les tournées par secteur : Argenteuil–Bezons, vallée de Montmorency, Cergy-Pontoise, est aéroportuaire, Vexin.`,
    habitat: `Grands ensembles avec parkings souterrains ou en dalle (Argenteuil, Sarcelles, Garges-lès-Gonesse, Cergy), quartiers pavillonnaires étendus (Franconville, Ermont, Taverny, Herblay-sur-Seine), villages du Vexin avec corps de ferme et terrains : l'accès va du parking à trois niveaux au chemin de terre. Nous demandons toujours l'emplacement précis et l'état du véhicule pour envoyer le bon équipement, et nous intervenons sur mandat pour les bailleurs et syndics confrontés à des véhicules abandonnés.`,
    zfe: `Le Val-d'Oise est en dehors du périmètre de la zone à faibles émissions du Grand Paris : Argenteuil et Bezons appartiennent à la Métropole mais se trouvent au-delà de l'A86, qui délimite la zone. Les obligations VHU restent les mêmes partout dans le département : seul un centre agréé peut délivrer un certificat de destruction valable, et l'abandon d'une épave est sanctionné. Nous gérons la déclaration de cession pour destruction le jour de l'enlèvement.`,
    fourriere: `Dans le Val-d'Oise, la mise en fourrière est décidée par la police municipale, la police nationale ou la gendarmerie de la commune, et les véhicules sont conduits vers des fourrières municipales ou agréées par la préfecture. Les frais d'une voiture particulière sont plafonnés au niveau national (enlèvement, garde journalière, expertise après trois jours). Le commissariat ou la brigade du lieu de stationnement vous indique où se trouve le véhicule et délivre l'autorisation de sortie. Lorsqu'il ne vaut plus les frais, nous pouvons le récupérer en fourrière pour destruction, avec votre mandat.`,
    rachat: `Dans le Val-d'Oise, nous rachetons des citadines et compactes de résidents, des véhicules familiaux kilométrés, des utilitaires des zones de Roissy et de Cergy, et des voitures accidentées, en panne ou sans contrôle technique. Enlèvement inclus, paiement le jour même, cession déclarée par nos soins.`,
    sources: [
      'INSEE via geo.api.gouv.fr — population et nombre de communes',
      'Métropole du Grand Paris — communes membres et périmètre de la ZFE',
    ],
  },
];

export function getIdfDeptHub(deptCode: string): IdfDeptHub | undefined {
  return idfDeptHubs.find(h => h.deptCode === deptCode);
}

/** Word count of a hub's prose — the QA check asserts ≥ 400 per department. */
export function idfDeptHubWordCount(hub: IdfDeptHub): number {
  return [...hub.intro, hub.circulation, hub.habitat, hub.zfe, hub.fourriere, hub.rachat]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
}
