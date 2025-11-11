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
  }
};

// Helper function to get city data
export function getCityLocalData(citySlug: string): CityLocalData | null {
  return cityLocalData[citySlug] || null;
}

// Check if city has local data
export function hasCityLocalData(citySlug: string): boolean {
  return citySlug in cityLocalData;
}
