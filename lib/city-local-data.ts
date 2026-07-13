// Local data for cities - fourrière, parking, access details
// This provides unique content for each city page

export interface CityLocalData {
  fourriere?: {
    name: string;
    address: string;
    phone: string;
    tarif: string;
    delai: string;
  };
  parkings: string[];
  acces: string;
  specificites: string[];
}

export const cityLocalData: Record<string, CityLocalData> = {
  // PARIS ARRONDISSEMENTS
  'paris-1er': {
    fourriere: {
      name: 'Fourrière Paris Centre',
      address: '2 Rue du Département, 75018 Paris',
      phone: '01 53 71 53 71',
      tarif: '150-200€ selon durée',
      delai: 'Récupération sous 24h'
    },
    parkings: ['Parking Indigo Les Halles', 'Parking Vinci Louvre', 'Parking Q-Park Vendôme'],
    acces: 'Accès limité en journée (zone piétonne). Intervention préférable tôt le matin (6h-9h) ou en soirée (après 20h).',
    specificites: [
      'Zone à circulation restreinte - autorisation nécessaire',
      'Nombreux sous-sols Indigo/Vinci accessibles',
      'Délais fourrière courts (48h) avant majoration'
    ]
  },
  'paris-2e': {
    fourriere: {
      name: 'Fourrière Paris Centre',
      address: '2 Rue du Département, 75018 Paris',
      phone: '01 53 71 53 71',
      tarif: '150-200€ selon durée',
      delai: 'Récupération sous 24h'
    },
    parkings: ['Parking Bourse', 'Parking Réaumur', 'Parking Montmartre-Drouot'],
    acces: 'Quartier dense. Accès sous-sol facilité. Intervention rapide possible 7j/7.',
    specificites: [
      'Forte densité de parkings souterrains',
      'Accès camion limité - utilisation treuil fréquente',
      'Zone commerçante - intervention matinale recommandée'
    ]
  },
  'paris-3e': {
    fourriere: {
      name: 'Fourrière Paris Centre',
      address: '2 Rue du Département, 75018 Paris',
      phone: '01 53 71 53 71',
      tarif: '150-200€ selon durée',
      delai: 'Récupération sous 24h'
    },
    parkings: ['Parking Beaubourg', 'Parking République', 'Parking Temple'],
    acces: 'Marais - rues étroites. Équipement spécial pour accès difficiles.',
    specificites: [
      'Rues pavées et étroites du Marais',
      'Nombreux immeubles anciens avec caves',
      'Coordination avec gardiens souvent nécessaire'
    ]
  },
  'paris-15e': {
    fourriere: {
      name: 'Fourrière Paris Sud',
      address: '12 Rue Jean Colly, 75013 Paris',
      phone: '01 53 71 53 71',
      tarif: '150-200€ selon durée',
      delai: 'Récupération sous 24h'
    },
    parkings: ['Parking Vaugirard', 'Parking Montparnasse', 'Parking Convention'],
    acces: 'Arrondissement résidentiel. Accès facilité, nombreux parkings.',
    specificites: [
      'Grand arrondissement - délais variables selon secteur',
      'Nombreuses résidences avec parkings souterrains',
      'Accès camion généralement bon'
    ]
  },
  'paris-18e': {
    fourriere: {
      name: 'Fourrière Paris Nord',
      address: '2 Rue du Département, 75018 Paris',
      phone: '01 53 71 53 71',
      tarif: '150-200€ selon durée',
      delai: 'Récupération sous 24h'
    },
    parkings: ['Parking Montmartre', 'Parking Marcadet', 'Parking Clignancourt'],
    acces: 'Montmartre - pentes raides. Équipement treuil systématique.',
    specificites: [
      'Relief accidenté - pentes importantes',
      'Stationnement difficile - fourrière fréquente',
      'Intervention technique pour zones en pente'
    ]
  },

  // HAUTS-DE-SEINE (92)
  'boulogne-billancourt': {
    fourriere: {
      name: 'Fourrière Boulogne-Billancourt',
      address: '32 Rue de Silly, 92100 Boulogne',
      phone: '01 55 18 54 00',
      tarif: '120-180€ selon durée',
      delai: 'Récupération 24h/24'
    },
    parkings: ['Parking Rhin et Danube', 'Parking Point du Jour', 'Parking Marcel Sembat'],
    acces: 'Ville dense, nombreux immeubles récents avec sous-sols. Accès généralement bon.',
    specificites: [
      'Nombreuses résidences modernes avec parkings',
      'Fourrière municipale très active',
      'Zone ZFE - véhicules polluants souvent mis en fourrière'
    ]
  },
  'nanterre': {
    fourriere: {
      name: 'Fourrière Nanterre',
      address: 'Avenue Frédéric et Irène Joliot-Curie, 92000 Nanterre',
      phone: '01 47 29 10 10',
      tarif: '120-180€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Préfecture', 'Parking RER Nanterre-Ville', 'Parking La Défense'],
    acces: 'Proximité La Défense. Nombreux parkings d\'entreprise et résidentiels.',
    specificites: [
      'Zone d\'affaires - parkings d\'entreprise nombreux',
      'Accès La Défense complexe - autorisation requise',
      'Université - stationnement étudiant problématique'
    ]
  },
  'courbevoie': {
    fourriere: {
      name: 'Fourrière Courbevoie',
      address: '142 Boulevard Saint-Denis, 92400 Courbevoie',
      phone: '01 71 05 70 00',
      tarif: '120-180€ selon durée',
      delai: 'Récupération 24h/24'
    },
    parkings: ['Parking Charras', 'Parking Faubourg de l\'Arche', 'Parking Bécon'],
    acces: 'Quartier d\'affaires. Parkings modernes, accès facilité.',
    specificites: [
      'Proximité immédiate La Défense',
      'Nombreux parkings d\'entreprise et centres commerciaux',
      'Circulation dense en semaine - intervention week-end préférable'
    ]
  },

  // SEINE-SAINT-DENIS (93)
  'saint-denis': {
    fourriere: {
      name: 'Fourrière Saint-Denis',
      address: 'Rue du Landy, 93200 Saint-Denis',
      phone: '01 49 33 66 66',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Stade de France', 'Parking Basilique', 'Parking Pleyel'],
    acces: 'Zone industrielle et résidentielle mixte. Accès variable selon quartier.',
    specificites: [
      'Stade de France - restrictions jours de match',
      'Zone en rénovation urbaine - accès changeants',
      'Nombreux véhicules abandonnés - fourrière saturée'
    ]
  },
  'montreuil': {
    fourriere: {
      name: 'Fourrière Montreuil',
      address: 'Avenue du Président Wilson, 93100 Montreuil',
      phone: '01 48 70 60 00',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Croix de Chavaux', 'Parking Mairie', 'Parking Robespierre'],
    acces: 'Ville populaire, nombreux immeubles anciens. Sous-sols parfois étroits.',
    specificites: [
      'Quartiers anciens - accès sous-sol parfois difficile',
      'Forte densité de véhicules - stationnement compliqué',
      'Proximité Paris - intervention rapide possible'
    ]
  },

  // VAL-DE-MARNE (94)
  'creteil': {
    fourriere: {
      name: 'Fourrière Créteil',
      address: 'Rue de Falkirk, 94000 Créteil',
      phone: '01 58 43 35 00',
      tarif: '120-170€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Créteil Soleil', 'Parking Préfecture', 'Parking Hôtel de Ville'],
    acces: 'Ville moderne avec grands parkings. Accès généralement facile.',
    specificites: [
      'Centre commercial Créteil Soleil - grand parking souterrain',
      'Quartiers résidentiels modernes - parkings spacieux',
      'Préfecture Val-de-Marne - zone administrative'
    ]
  },
  'vitry-sur-seine': {
    fourriere: {
      name: 'Fourrière Vitry-sur-Seine',
      address: 'Avenue Guy Môquet, 94400 Vitry',
      phone: '01 43 91 15 15',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Mairie', 'Parking Port à l\'Anglais', 'Parking Les Ardoines'],
    acces: 'Zone mixte résidentielle et industrielle. Accès variable.',
    specificites: [
      'Zone industrielle Les Ardoines - grands espaces',
      'Quartiers résidentiels denses - parkings limités',
      'Bords de Seine - accès parfois complexe'
    ]
  },

  // VAL-D'OISE (95)
  'argenteuil': {
    fourriere: {
      name: 'Fourrière Argenteuil',
      address: 'Rue Henri Barbusse, 95100 Argenteuil',
      phone: '01 34 23 41 00',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Gare', 'Parking Centre-Ville', 'Parking Val d\'Argent'],
    acces: 'Grande ville, accès généralement bon. Parkings nombreux.',
    specificites: [
      'Grande ville - plusieurs zones distinctes',
      'Centre commercial Val d\'Argent - grand parking',
      'Quartiers pavillonnaires - garages individuels fréquents'
    ]
  },
  'cergy': {
    fourriere: {
      name: 'Fourrière Cergy-Pontoise',
      address: 'Boulevard de l\'Oise, 95000 Cergy',
      phone: '01 34 33 42 00',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Les 3 Fontaines', 'Parking Préfecture', 'Parking Gare'],
    acces: 'Ville nouvelle, parkings modernes et spacieux. Accès excellent.',
    specificites: [
      'Ville nouvelle - urbanisme moderne',
      'Centre commercial Les 3 Fontaines - très grand parking',
      'Quartiers pavillonnaires étendus - accès facile'
    ]
  },

  // SEINE-ET-MARNE (77)
  'meaux': {
    fourriere: {
      name: 'Fourrière Meaux',
      address: 'Rue du Faubourg Saint-Nicolas, 77100 Meaux',
      phone: '01 64 36 45 45',
      tarif: '80-120€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Gare', 'Parking Centre-Ville', 'Parking Beauval'],
    acces: 'Ville moyenne, accès facile. Peu de contraintes de circulation.',
    specificites: [
      'Ville historique - centre ancien avec rues étroites',
      'Quartiers pavillonnaires étendus',
      'Tarifs fourrière moins élevés qu\'à Paris'
    ]
  },
  'melun': {
    fourriere: {
      name: 'Fourrière Melun',
      address: 'Avenue Thiers, 77000 Melun',
      phone: '01 64 52 01 77',
      tarif: '80-120€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Gare', 'Parking Préfecture', 'Parking Centre Commercial'],
    acces: 'Préfecture Seine-et-Marne. Accès bon, ville étendue.',
    specificites: [
      'Préfecture départementale - zone administrative',
      'Bords de Seine - accès parfois limité',
      'Quartiers résidentiels calmes - intervention facile'
    ]
  },

  // YVELINES (78)
  'versailles': {
    fourriere: {
      name: 'Fourrière Versailles',
      address: '4 Rue des Chantiers, 78000 Versailles',
      phone: '01 30 97 28 00',
      tarif: '120-170€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Château', 'Parking Gare', 'Parking Marché Notre-Dame'],
    acces: 'Ville touristique. Restrictions circulation centre-ville. Accès périphérie bon.',
    specificites: [
      'Zone touristique - restrictions de circulation',
      'Quartiers historiques - rues étroites',
      'Nombreux parkings souterrains modernes'
    ]
  },
  'saint-germain-en-laye': {
    fourriere: {
      name: 'Fourrière Saint-Germain-en-Laye',
      address: 'Rue de Poissy, 78100 Saint-Germain',
      phone: '01 30 87 20 00',
      tarif: '120-170€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Château', 'Parking RER', 'Parking Centre-Ville'],
    acces: 'Ville résidentielle aisée. Parkings bien entretenus, accès bon.',
    specificites: [
      'Quartiers résidentiels haut de gamme',
      'Forêt de Saint-Germain - zones pavillonnaires',
      'Parkings privés nombreux et bien équipés'
    ]
  },

  // ESSONNE (91)
  'evry-courcouronnes': {
    fourriere: {
      name: 'Fourrière Évry-Courcouronnes',
      address: 'Boulevard de l\'Europe, 91000 Évry',
      phone: '01 60 75 01 00',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Agora', 'Parking Cathédrale', 'Parking Gare'],
    acces: 'Ville nouvelle, parkings modernes. Accès excellent.',
    specificites: [
      'Préfecture Essonne - zone administrative',
      'Centre commercial Agora - grand parking',
      'Quartiers modernes - accès facilité'
    ]
  },
  'massy': {
    fourriere: {
      name: 'Fourrière Massy',
      address: 'Avenue de Paris, 91300 Massy',
      phone: '01 60 11 60 11',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Gare TGV', 'Parking Atlantis', 'Parking Opéra'],
    acces: 'Hub de transport. Nombreux parkings, accès excellent.',
    specificites: [
      'Gare TGV - grand parking souterrain',
      'Centre commercial Atlantis - parking spacieux',
      'Zone d\'affaires - parkings d\'entreprise nombreux'
    ]
  },

  // HIGH-PRIORITY CITIES (high impressions, 0% CTR - added for Phase 2 optimization)
  'mantes-la-jolie': {
    fourriere: {
      name: 'Fourrière Mantes-la-Jolie',
      address: 'Rue Pierre Curie, 78200 Mantes-la-Jolie',
      phone: '01 30 98 55 00',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Gare', 'Parking Val Fourré', 'Parking Centre Commercial'],
    acces: 'Ville moyenne des Yvelines. Accès facile, peu de contraintes de circulation.',
    specificites: [
      'Quartier Val Fourré - grands parkings résidentiels',
      'Bords de Seine - accès parfois limité en bord de fleuve',
      'Zone commerciale - intervention facilitée week-end',
      'Tarifs fourrière modérés comparé à Paris'
    ]
  },
  'les-mureaux': {
    fourriere: {
      name: 'Fourrière Les Mureaux',
      address: 'Avenue Paul Raoult, 78130 Les Mureaux',
      phone: '01 30 91 37 00',
      tarif: '100-150€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Gare', 'Parking Centre-Ville', 'Parking Zone Commerciale'],
    acces: 'Ville industrielle et résidentielle. Accès bon, parkings spacieux.',
    specificites: [
      'Zone industrielle importante - grands espaces',
      'Quartiers résidentiels modernes - parkings souterrains nombreux',
      'Proximité A13 - intervention rapide depuis Paris',
      'Peu de restrictions de circulation'
    ]
  },
  'fontainebleau': {
    fourriere: {
      name: 'Fourrière Fontainebleau',
      address: 'Rue de la Chancellerie, 77300 Fontainebleau',
      phone: '01 60 74 64 00',
      tarif: '80-120€ selon durée',
      delai: 'Récupération en journée'
    },
    parkings: ['Parking Château', 'Parking Gare', 'Parking Centre-Ville'],
    acces: 'Ville touristique et résidentielle. Centre historique avec restrictions, périphérie accessible.',
    specificites: [
      'Zone touristique - restrictions circulation centre historique',
      'Forêt de Fontainebleau - zones pavillonnaires étendues',
      'Château - parking visiteurs important',
      'Quartiers résidentiels calmes - intervention facilitée',
    ]
  },

  // ARRONDISSEMENTS PARISIENS MANQUANTS
  'paris-4e': {
    fourriere: { name: 'Fourrière Paris Centre', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Pont Marie', 'Parking Baudoyer', 'Parking Lobau'],
    acces: 'Île de la Cité et Île Saint-Louis : rues très étroites, circulation très restreinte. Le Marais historique impose des fenêtres d\'intervention très précises (avant 8h ou après 20h).',
    specificites: ['Habitat haussmannien dense avec caves profondes', 'Île Saint-Louis : accès par pont unique, treuil nécessaire', 'Zone piétonne étendue — autorisation préfectorale parfois requise']
  },
  'paris-5e': {
    fourriere: { name: 'Fourrière Paris Centre', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Panthéon', 'Parking Maubert', 'Parking Port Royal'],
    acces: 'Quartier Latin : forte densité étudiante, rues pavées et en pente. Certaines rues du Mouffetard impossibles aux véhicules de plus de 3,5t.',
    specificites: ['Habitat mixte : immeubles haussmanniens + résidences universitaires', 'Nombreuses cours intérieures sur rue étroite', 'Rampes de parking parfois inférieures à 1,9m de hauteur']
  },
  'paris-6e': {
    fourriere: { name: 'Fourrière Paris Centre', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Saint-Sulpice', 'Parking Montparnasse', 'Parking Saint-Germain-des-Prés'],
    acces: 'Saint-Germain-des-Prés : arrondissement résidentiel haut de gamme, circulation modérée. Accès sous-sol généralement bon mais hauteurs parfois limitées.',
    specificites: ['Habitat bourgeois : immeubles pierre de taille, caves nombreuses', 'Parkings privés résidentiels bien entretenus', 'Zone ZFE stricte — amendes fréquentes pour véhicules Crit\'Air 3+']
  },
  'paris-7e': {
    fourriere: { name: 'Fourrière Paris Centre', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Tour Eiffel', 'Parking Invalides', 'Parking Saint-François-Xavier'],
    acces: 'Arrondissement ministériel et résidentiel huppé. Large avenue avec stationnement résidentiel. Secteur Tour Eiffel : restrictions importantes les jours d\'affluence touristique.',
    specificites: ['Hôtels particuliers avec cours privées', 'Nombreux ministères : restrictions circulation secteur Assemblée', 'Habitat de prestige — parkings privatifs bien équipés']
  },
  'paris-8e': {
    fourriere: { name: 'Fourrière Paris Centre', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Champs-Élysées', 'Parking George V', 'Parking Madeleine'],
    acces: 'Champs-Élysées : avenue très surveillée, arrêt interdit. Intervention par rues adjacentes obligatoire. Quartier des affaires actif en semaine.',
    specificites: ['Immeubles haussmanniens haut de gamme avec gardiens', 'Parkings souterrains privés nombreux sous immeubles de bureaux', 'Axe routier chargé — intervention nuit/week-end vivement conseillée']
  },
  'paris-9e': {
    fourriere: { name: 'Fourrière Paris Centre', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Opéra', 'Parking Drouot', 'Parking Saint-Georges'],
    acces: 'Opéra-Grands Boulevards : forte affluence piétonne. Rues nord (Pigalle, Anvers) plus accessibles. Stationnement limité en journée.',
    specificites: ['Mixte commerce/résidence — activité nocturne importante', 'Nombreux hôtels : coordination avec réception nécessaire', 'Sous-sols variables : bonne accessibilité rue de la Victoire, difficile rues étroites']
  },
  'paris-10e': {
    fourriere: { name: 'Fourrière Paris Centre', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Gare du Nord', 'Parking Gare de l\'Est', 'Parking République'],
    acces: 'Deux grandes gares (Nord + Est) génèrent un trafic intense. Secteur Canal Saint-Martin : rues à sens unique. Intervention matinale (avant 8h) recommandée.',
    specificites: ['Habitat populaire mixte : haussmannien + immeubles récents', 'Canal Saint-Martin : sous-sols peu nombreux, stationnement sur rue dominant', 'Zone en mutation rapide — nouveaux immeubles avec parkings modernes']
  },
  'paris-11e': {
    fourriere: { name: 'Fourrière Paris Centre', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Bastille', 'Parking Voltaire', 'Parking Charonne'],
    acces: 'Arrondissement populaire et vivant. Réseau de rues dense mais généralement accessible. Place de la Bastille : zone très fréquentée, prévoir créneau tôt le matin.',
    specificites: ['Habitat haussmannien dense avec caves', 'Nombreux garages de quartier — coordination propriétaire indispensable', 'Fort trafic nocturne place de la Bastille — intervention 6h-9h idéale']
  },
  'paris-12e': {
    fourriere: { name: 'Fourrière Paris Sud', address: '12 Rue Jean Colly, 75013 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Gare de Lyon', 'Parking Bercy Village', 'Parking Nation'],
    acces: 'Grand arrondissement, accès variable. Bercy : parkings modernes sous le parc. Nation : artère large, intervention aisée. Bois de Vincennes en bordure.',
    specificites: ['Parc de Bercy : espace vert dense, accès limité aux véhicules d\'intervention', 'Gare de Lyon : zone réglementée, coordination sécurité ferroviaire', 'Quartiers résidentiels calmes côté Daumesnil — accès parking souterrain bon']
  },
  'paris-13e': {
    fourriere: { name: 'Fourrière Paris Sud', address: '12 Rue Jean Colly, 75013 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Italie 2', 'Parking MK2 Bibliothèque', 'Parking Olympiades'],
    acces: 'Arrondissement mixte : tours modernes du quartier Olympiades + habitat haussmannien + Chinatown. Les tours des Olympiades ont des parkings souterrains profonds (4-5 niveaux) nécessitant du matériel spécialisé.',
    specificites: ['Tours Olympiades : parkings -4/-5 avec rampes en hélice serrées', 'Habitat populaire dense Butte-aux-Cailles : rues en pente', 'Zone Bibliothèque François-Mitterrand : quartier neuf, accès moderne']
  },
  'paris-14e': {
    fourriere: { name: 'Fourrière Paris Sud', address: '12 Rue Jean Colly, 75013 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Montparnasse', 'Parking Alésia', 'Parking Plaisance'],
    acces: 'Montparnasse : gare et tour génèrent un trafic soutenu. Quartiers résidentiels (Pernety, Plaisance) plus calmes avec bon accès.',
    specificites: ['Tour Montparnasse : parking souterrain commercial, accès parking résidentiel séparé', 'Quartier résidentiel calme côté Alésia — sous-sols de bonne hauteur', 'Nombreux ateliers d\'artistes reconvertis en lofts sans parking']
  },
  'paris-16e': {
    fourriere: { name: 'Fourrière Paris Ouest', address: '143 Rue du Point du Jour, 92100 Boulogne', phone: '01 55 18 54 00', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Trocadéro', 'Parking Auteuil', 'Parking Passy'],
    acces: 'Arrondissement résidentiel aisé. Larges avenues, stationnement facilité. Parkings privatifs dans les immeubles haussmanniens bien équipés. Bois de Boulogne : zones sans parking.',
    specificites: ['Habitat bourgeois haut de gamme avec concierge — coordination indispensable', 'Nombreux garages privatifs individuels sous immeubles', 'Secteur Trocadéro très surveillé : intervenir tôt le matin']
  },
  'paris-17e': {
    fourriere: { name: 'Fourrière Paris Nord', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Courcelles', 'Parking Batignolles', 'Parking Porte de Champerret'],
    acces: 'Arrondissement mixte : quartier huppé Monceau au sud, plus populaire Batignolles au nord. Accès variable selon secteur. Porte de Champerret : bonne accessibilité.',
    specificites: ['Quartier Monceau : hôtels particuliers avec cours privées', 'Batignolles : immeubles anciens avec cours intérieures étroites', 'Forte densité résidentielle — places de stationnement rares']
  },
  'paris-19e': {
    fourriere: { name: 'Fourrière Paris Nord', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking La Villette', 'Parking Stalingrad', 'Parking Botzaris'],
    acces: 'Arrondissement populaire en pleine mutation. La Villette : grands espaces accessibles. Quartiers Belleville et Combat : rues en pente, intervention matinale recommandée.',
    specificites: ['Parc de La Villette : véhicules abandonnés sur voie publique fréquents', 'Buttes-Chaumont : zone résidentielle sur relief — équipement treuil parfois nécessaire', 'Nouveaux programmes immobiliers avec parkings souterrains modernes']
  },
  'paris-20e': {
    fourriere: { name: 'Fourrière Paris Nord', address: '2 Rue du Département, 75018 Paris', phone: '01 53 71 53 71', tarif: '150-200€ selon durée', delai: 'Récupération sous 24h' },
    parkings: ['Parking Père Lachaise', 'Parking Gambetta', 'Parking Nation'],
    acces: 'Belleville-Ménilmontant : relief accidenté, rues en pente. Accès difficile pour grandes remorques. Secteur Père-Lachaise plus plat et accessible.',
    specificites: ['Pentes de Belleville : treuil systématique recommandé', 'Habitat mixte très dense — peu de garages privés', 'Cimetière Père-Lachaise : zone adjacente calme, accès bon']
  },

  // GRANDES COMMUNES PETITE COURONNE MANQUANTES
  'aubervilliers': {
    fourriere: { name: 'Fourrière Aubervilliers', address: 'Route de la Révolte, 93300 Aubervilliers', phone: '01 48 34 55 55', tarif: '100-150€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Quatre-Chemins', 'Parking Fort d\'Aubervilliers', 'Parking Centre Commercial'],
    acces: 'Commune dense à vocation mixte (résidentielle + industrielle). Zone du Fort en pleine reconversion. Accès variable selon quartier.',
    specificites: ['Zone industrielle Fort d\'Aubervilliers : grands espaces, nombreux utilitaires en fin de vie', 'Habitat populaire dense : parc locatif social dominant, peu de parkings privés', 'Fourrière souvent saturée — délais plus courts avec épaviste privé']
  },
  'asnieres-sur-seine': {
    fourriere: { name: 'Fourrière Asnières-sur-Seine', address: 'Rue Galilée, 92600 Asnières', phone: '01 41 11 31 00', tarif: '120-170€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Gare', 'Parking Les Grésillons', 'Parking Centre-Ville'],
    acces: 'Ville résidentielle aisée, largement pavillonnaire dans sa partie ouest. Centre-ville dense avec immeubles haussmanniens. Bords de Seine accessibles.',
    specificites: ['Habitat mixte : pavillons avec garage intégré côté Seine, collectifs côté centre', 'Forte proportion de garages individuels — accès direct plateau possible', 'Zone ZFE Grand Paris : véhicules Crit\'Air 3+ très concernés']
  },
  'champigny-sur-marne': {
    fourriere: { name: 'Fourrière Champigny-sur-Marne', address: 'Avenue Roger Salengro, 94500 Champigny', phone: '01 55 09 69 00', tarif: '100-150€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Mairie', 'Parking Gare', 'Parking Tremblay'],
    acces: 'Grande commune résidentielle pavillonnaire. Accès très facile, larges rues. Bords de Marne accessibles avec quelques contraintes de voirie.',
    specificites: ['Tissu pavillonnaire dominant : garages individuels nombreux', 'Faible densité relative — intervention rapide', 'Bords de Marne : risque d\'inondation certaines zones, vérifier accessibilité hiver']
  },
  'colombes': {
    fourriere: { name: 'Fourrière Colombes', address: 'Rue Pierre et Marie Curie, 92700 Colombes', phone: '01 41 19 22 00', tarif: '120-170€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Hôtel de Ville', 'Parking Les Fossés Jean', 'Parking Gare'],
    acces: 'Ville résidentielle avec zones pavillonnaires et immeubles collectifs. Accès généralement bon sauf abords de la N1 en heure de pointe.',
    specificites: ['Habitat varié : collectifs 60-70 avec sous-sols + pavillons ouest', 'Stade Yves-du-Manoir : parking important à proximité', 'Zone ZFE : restrictions croissantes pour véhicules anciens']
  },
  'drancy': {
    fourriere: { name: 'Fourrière Drancy', address: 'Avenue Henri Barbusse, 93700 Drancy', phone: '01 41 60 61 00', tarif: '100-150€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Mairie', 'Parking Gare', 'Parking Centre Commercial'],
    acces: 'Commune résidentielle dense. Nombreuses cités de logement social avec parkings en pied d\'immeuble. Accès parfois restreint aux véhicules extérieurs dans les résidences fermées.',
    specificites: ['Fort taux de logement social : épaves en parking résidence fréquentes', 'Proximité aéroport Bourget : zone sous couloir aérien', 'Fourrière municipale limitée — recours épaviste privé fréquent']
  },
  'issy-les-moulineaux': {
    fourriere: { name: 'Fourrière Issy-les-Moulineaux', address: 'Rue Ernest Renan, 92130 Issy', phone: '01 41 23 15 15', tarif: '120-180€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Issy Coeur de Ville', 'Parking Victor Cresson', 'Parking Mairie'],
    acces: 'Commune en forte mutation : nombreux sièges sociaux + quartiers résidentiels. Zone Val de Seine moderne avec sous-sols de haute qualité. Accès excellent côté bureaux.',
    specificites: ['Forte présence de sièges sociaux (Canal+, Microsoft) : parkings d\'entreprise bien équipés', 'Quartiers résidentiels en hauteur côté fort : accès parfois complexe', 'Zone ZFE stricte — renouvellement fréquent du parc automobile']
  },
  'ivry-sur-seine': {
    fourriere: { name: 'Fourrière Ivry-sur-Seine', address: 'Rue Raspail, 94200 Ivry', phone: '01 49 60 21 00', tarif: '100-150€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Mairie', 'Parking Gare RER', 'Parking Centre Commercial'],
    acces: 'Commune industrielle et résidentielle. Zone portuaire en bord de Seine. Anciens entrepôts reconvertis. Accès variable selon quartier.',
    specificites: ['Zone industrielle portuaire : utilitaires en fin de vie fréquents', 'Habitat social dense : épaves en parking collectif récurrentes', 'Quartier en gentrification : nouveaux immeubles avec parkings modernes']
  },
  'levallois-perret': {
    fourriere: { name: 'Fourrière Levallois-Perret', address: 'Rue Baudin, 92300 Levallois', phone: '01 47 58 32 00', tarif: '150-200€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Anatole France', 'Parking Louise Michel', 'Parking Île de la Jatte'],
    acces: 'Ville très dense, plan en damier. Toutes les rues sont à sens unique alternés. Stationnement quasi impossible en double file — intervention à planifier tôt le matin.',
    specificites: ['Densité humaine et automobile parmi les plus élevées de France', 'Immeubles haussmanniens : caves nombreuses, sous-sols bien aménagés', 'Taux d\'imposition élevé = parc automobile récent, mais épaves présentes en parking résidence']
  },
  'montrouge': {
    fourriere: { name: 'Fourrière Montrouge', address: 'Avenue de la République, 92120 Montrouge', phone: '01 42 53 11 11', tarif: '120-170€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Mairie', 'Parking Gabriel Péri', 'Parking Centre-Ville'],
    acces: 'Commune compacte et résidentielle, limitrophe du 14e. Accès facilité, larges voies. Parking Gabriel Péri (métro) : sous-sol bien accessible.',
    specificites: ['Forte densité résidentielle : immeubles récents avec parkings souterrains', 'Limitrophe Paris 14e — même zone ZFE stricte', 'Excellente desserte transports en commun : intervention plateau facilitée']
  },
  'rueil-malmaison': {
    fourriere: { name: 'Fourrière Rueil-Malmaison', address: 'Rue Henri Regnault, 92500 Rueil', phone: '01 47 32 63 00', tarif: '120-170€ selon durée', delai: 'Récupération en journée' },
    parkings: ['Parking Gare RER', 'Parking Centre Commercial Régional', 'Parking Malmaison'],
    acces: 'Commune résidentielle aisée avec zones pavillonnaires importantes. Quartier La Défense côté Nanterre en limite. Accès très facile dans les zones pavillonnaires.',
    specificites: ['Tissu mixte : zones pavillonnaires aisées + quartiers collectifs', 'Zone d\'affaires en développement : parkings d\'entreprise nombreux', 'Château de Malmaison : zone touristique sans contrainte pour l\'intervention']
  },
};

// Helper function to get city data
export function getCityLocalData(citySlug: string): CityLocalData | null {
  return cityLocalData[citySlug] || null;
}

// Check if city has local data
export function hasCityLocalData(citySlug: string): boolean {
  return citySlug in cityLocalData;
}
