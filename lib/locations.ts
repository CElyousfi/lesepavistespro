export interface Department {
  code: string;
  name: string;
  slug: string;
  cities: string[];
}

export const departments: Department[] = [
  {
    code: "75",
    name: "Paris",
    slug: "paris-75",
    cities: [
      "Paris 1er", "Paris 2e", "Paris 3e", "Paris 4e", "Paris 5e",
      "Paris 6e", "Paris 7e", "Paris 8e", "Paris 9e", "Paris 10e",
      "Paris 11e", "Paris 12e", "Paris 13e", "Paris 14e", "Paris 15e",
      "Paris 16e", "Paris 17e", "Paris 18e", "Paris 19e", "Paris 20e"
    ]
  },
  {
    code: "77",
    name: "Seine-et-Marne",
    slug: "seine-et-marne-77",
    cities: [
      "Meaux", "Melun", "Chelles", "Fontainebleau", "Savigny-le-Temple",
      "Torcy", "Pontault-Combault", "Champs-sur-Marne", "Lagny-sur-Marne",
      "Roissy-en-Brie", "Combs-la-Ville", "Coulommiers", "Provins",
      "Montereau-Fault-Yonne", "Ozoir-la-Ferrière", "Le Mée-sur-Seine"
    ]
  },
  {
    code: "78",
    name: "Yvelines",
    slug: "yvelines-78",
    cities: [
      "Versailles", "Sartrouville", "Mantes-la-Jolie", "Saint-Germain-en-Laye",
      "Poissy", "Montigny-le-Bretonneux", "Conflans-Sainte-Honorine",
      "Les Mureaux", "Houilles", "Plaisir", "Trappes", "Rambouillet",
      "Guyancourt", "Élancourt", "Chatou", "Maisons-Laffitte"
    ]
  },
  {
    code: "91",
    name: "Essonne",
    slug: "essonne-91",
    cities: [
      "Évry-Courcouronnes", "Corbeil-Essonnes", "Massy", "Savigny-sur-Orge",
      "Sainte-Geneviève-des-Bois", "Viry-Châtillon", "Athis-Mons",
      "Palaiseau", "Yerres", "Draveil", "Grigny", "Ris-Orangis",
      "Étampes", "Brunoy", "Les Ulis", "Montgeron"
    ]
  },
  {
    code: "92",
    name: "Hauts-de-Seine",
    slug: "hauts-de-seine-92",
    cities: [
      "Boulogne-Billancourt", "Nanterre", "Courbevoie", "Colombes",
      "Asnières-sur-Seine", "Rueil-Malmaison", "Levallois-Perret",
      "Issy-les-Moulineaux", "Antony", "Neuilly-sur-Seine",
      "Clichy", "Clamart", "Suresnes", "Montrouge", "Meudon",
      "Puteaux", "Gennevilliers", "Châtenay-Malabry"
    ]
  },
  {
    code: "93",
    name: "Seine-Saint-Denis",
    slug: "seine-saint-denis-93",
    cities: [
      "Saint-Denis", "Montreuil", "Aubervilliers", "Aulnay-sous-Bois",
      "Drancy", "Noisy-le-Grand", "Pantin", "Bondy", "Épinay-sur-Seine",
      "Le Blanc-Mesnil", "Sevran", "Bobigny", "Livry-Gargan",
      "Rosny-sous-Bois", "Noisy-le-Sec", "Gagny", "La Courneuve"
    ]
  },
  {
    code: "94",
    name: "Val-de-Marne",
    slug: "val-de-marne-94",
    cities: [
      "Créteil", "Vitry-sur-Seine", "Champigny-sur-Marne", "Saint-Maur-des-Fossés",
      "Ivry-sur-Seine", "Maisons-Alfort", "Fontenay-sous-Bois",
      "Vincennes", "Alfortville", "Villejuif", "Choisy-le-Roi",
      "Nogent-sur-Marne", "Le Perreux-sur-Marne", "Cachan",
      "Thiais", "Villeneuve-Saint-Georges", "L'Haÿ-les-Roses"
    ]
  },
  {
    code: "95",
    name: "Val-d'Oise",
    slug: "val-d-oise-95",
    cities: [
      "Argenteuil", "Sarcelles", "Cergy", "Garges-lès-Gonesse",
      "Franconville", "Goussainville", "Pontoise", "Bezons",
      "Ermont", "Villiers-le-Bel", "Gonesse", "Taverny",
      "Herblay-sur-Seine", "Montmorency", "Deuil-la-Barre", "Eaubonne"
    ]
  }
];

export function getDepartmentBySlug(slug: string): Department | undefined {
  return departments.find(d => d.slug === slug);
}

export function getAllDepartmentSlugs(): string[] {
  return departments.map(d => d.slug);
}