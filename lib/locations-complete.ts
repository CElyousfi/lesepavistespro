// Complete location data for Île-de-France
// Covering ALL departments and major cities for maximum SEO coverage

export interface City {
  name: string;
  slug: string;
  postalCode: string;
  population?: number;
  arrondissement?: string; // For Paris
}

export interface Department {
  name: string;
  slug: string;
  code: string;
  cities: City[];
}

// Paris (75) - All 20 arrondissements
const paris75: Department = {
  name: "Paris",
  slug: "paris-75",
  code: "75",
  cities: [
    { name: "Paris 1er", slug: "paris-1er", postalCode: "75001", arrondissement: "1er" },
    { name: "Paris 2e", slug: "paris-2e", postalCode: "75002", arrondissement: "2e" },
    { name: "Paris 3e", slug: "paris-3e", postalCode: "75003", arrondissement: "3e" },
    { name: "Paris 4e", slug: "paris-4e", postalCode: "75004", arrondissement: "4e" },
    { name: "Paris 5e", slug: "paris-5e", postalCode: "75005", arrondissement: "5e" },
    { name: "Paris 6e", slug: "paris-6e", postalCode: "75006", arrondissement: "6e" },
    { name: "Paris 7e", slug: "paris-7e", postalCode: "75007", arrondissement: "7e" },
    { name: "Paris 8e", slug: "paris-8e", postalCode: "75008", arrondissement: "8e" },
    { name: "Paris 9e", slug: "paris-9e", postalCode: "75009", arrondissement: "9e" },
    { name: "Paris 10e", slug: "paris-10e", postalCode: "75010", arrondissement: "10e" },
    { name: "Paris 11e", slug: "paris-11e", postalCode: "75011", arrondissement: "11e" },
    { name: "Paris 12e", slug: "paris-12e", postalCode: "75012", arrondissement: "12e" },
    { name: "Paris 13e", slug: "paris-13e", postalCode: "75013", arrondissement: "13e" },
    { name: "Paris 14e", slug: "paris-14e", postalCode: "75014", arrondissement: "14e" },
    { name: "Paris 15e", slug: "paris-15e", postalCode: "75015", arrondissement: "15e" },
    { name: "Paris 16e", slug: "paris-16e", postalCode: "75016", arrondissement: "16e" },
    { name: "Paris 17e", slug: "paris-17e", postalCode: "75017", arrondissement: "17e" },
    { name: "Paris 18e", slug: "paris-18e", postalCode: "75018", arrondissement: "18e" },
    { name: "Paris 19e", slug: "paris-19e", postalCode: "75019", arrondissement: "19e" },
    { name: "Paris 20e", slug: "paris-20e", postalCode: "75020", arrondissement: "20e" },
  ]
};

// Seine-et-Marne (77) - Major cities
const seineEtMarne77: Department = {
  name: "Seine-et-Marne",
  slug: "seine-et-marne-77",
  code: "77",
  cities: [
    { name: "Meaux", slug: "meaux", postalCode: "77100", population: 55000 },
    { name: "Melun", slug: "melun", postalCode: "77000", population: 40000 },
    { name: "Chelles", slug: "chelles", postalCode: "77500", population: 54000 },
    { name: "Pontault-Combault", slug: "pontault-combault", postalCode: "77340", population: 37000 },
    { name: "Savigny-le-Temple", slug: "savigny-le-temple", postalCode: "77176", population: 30000 },
    { name: "Champs-sur-Marne", slug: "champs-sur-marne", postalCode: "77420", population: 25000 },
    { name: "Torcy", slug: "torcy", postalCode: "77200", population: 23000 },
    { name: "Fontainebleau", slug: "fontainebleau", postalCode: "77300", population: 15000 },
    { name: "Combs-la-Ville", slug: "combs-la-ville", postalCode: "77380", population: 22000 },
    { name: "Le Mée-sur-Seine", slug: "le-mee-sur-seine", postalCode: "77350", population: 20000 },
    { name: "Dammarie-les-Lys", slug: "dammarie-les-lys", postalCode: "77190", population: 22000 },
    { name: "Lagny-sur-Marne", slug: "lagny-sur-marne", postalCode: "77400", population: 21000 },
    { name: "Ozoir-la-Ferrière", slug: "ozoir-la-ferriere", postalCode: "77330", population: 21000 },
    { name: "Roissy-en-Brie", slug: "roissy-en-brie", postalCode: "77680", population: 23000 },
    { name: "Brie-Comte-Robert", slug: "brie-comte-robert", postalCode: "77170", population: 17000 },
    { name: "Coulommiers", slug: "coulommiers", postalCode: "77120", population: 15000 },
    { name: "Provins", slug: "provins", postalCode: "77160", population: 12000 },
    { name: "Montereau-Fault-Yonne", slug: "montereau-fault-yonne", postalCode: "77130", population: 18000 },
  ]
};

// Yvelines (78) - Major cities
const yvelines78: Department = {
  name: "Yvelines",
  slug: "yvelines-78",
  code: "78",
  cities: [
    { name: "Versailles", slug: "versailles", postalCode: "78000", population: 85000 },
    { name: "Sartrouville", slug: "sartrouville", postalCode: "78500", population: 52000 },
    { name: "Mantes-la-Jolie", slug: "mantes-la-jolie", postalCode: "78200", population: 45000 },
    { name: "Saint-Germain-en-Laye", slug: "saint-germain-en-laye", postalCode: "78100", population: 44000 },
    { name: "Poissy", slug: "poissy", postalCode: "78300", population: 38000 },
    { name: "Conflans-Sainte-Honorine", slug: "conflans-sainte-honorine", postalCode: "78700", population: 36000 },
    { name: "Montigny-le-Bretonneux", slug: "montigny-le-bretonneux", postalCode: "78180", population: 34000 },
    { name: "Les Mureaux", slug: "les-mureaux", postalCode: "78130", population: 32000 },
    { name: "Plaisir", slug: "plaisir", postalCode: "78370", population: 31000 },
    { name: "Trappes", slug: "trappes", postalCode: "78190", population: 31000 },
    { name: "Houilles", slug: "houilles", postalCode: "78800", population: 32000 },
    { name: "Chatou", slug: "chatou", postalCode: "78400", population: 30000 },
    { name: "Le Chesnay-Rocquencourt", slug: "le-chesnay-rocquencourt", postalCode: "78150", population: 30000 },
    { name: "Guyancourt", slug: "guyancourt", postalCode: "78280", population: 29000 },
    { name: "Rambouillet", slug: "rambouillet", postalCode: "78120", population: 26000 },
    { name: "Maisons-Laffitte", slug: "maisons-laffitte", postalCode: "78600", population: 23000 },
    { name: "Élancourt", slug: "elancourt", postalCode: "78990", population: 25000 },
  ]
};

// Essonne (91) - Major cities
const essonne91: Department = {
  name: "Essonne",
  slug: "essonne-91",
  code: "91",
  cities: [
    { name: "Évry-Courcouronnes", slug: "evry-courcouronnes", postalCode: "91000", population: 69000 },
    { name: "Corbeil-Essonnes", slug: "corbeil-essonnes", postalCode: "91100", population: 50000 },
    { name: "Massy", slug: "massy", postalCode: "91300", population: 48000 },
    { name: "Savigny-sur-Orge", slug: "savigny-sur-orge", postalCode: "91600", population: 37000 },
    { name: "Sainte-Geneviève-des-Bois", slug: "sainte-genevieve-des-bois", postalCode: "91700", population: 36000 },
    { name: "Viry-Châtillon", slug: "viry-chatillon", postalCode: "91170", population: 32000 },
    { name: "Athis-Mons", slug: "athis-mons", postalCode: "91200", population: 34000 },
    { name: "Palaiseau", slug: "palaiseau", postalCode: "91120", population: 36000 },
    { name: "Yerres", slug: "yerres", postalCode: "91330", population: 29000 },
    { name: "Draveil", slug: "draveil", postalCode: "91210", population: 29000 },
    { name: "Ris-Orangis", slug: "ris-orangis", postalCode: "91130", population: 29000 },
    { name: "Grigny", slug: "grigny", postalCode: "91350", population: 29000 },
    { name: "Vigneux-sur-Seine", slug: "vigneux-sur-seine", postalCode: "91270", population: 31000 },
    { name: "Brunoy", slug: "brunoy", postalCode: "91800", population: 26000 },
    { name: "Les Ulis", slug: "les-ulis", postalCode: "91940", population: 25000 },
    { name: "Étampes", slug: "etampes", postalCode: "91150", population: 25000 },
    { name: "Montgeron", slug: "montgeron", postalCode: "91230", population: 24000 },
  ]
};

// Hauts-de-Seine (92) - Major cities
const hautsDeSeine92: Department = {
  name: "Hauts-de-Seine",
  slug: "hauts-de-seine-92",
  code: "92",
  cities: [
    { name: "Boulogne-Billancourt", slug: "boulogne-billancourt", postalCode: "92100", population: 121000 },
    { name: "Nanterre", slug: "nanterre", postalCode: "92000", population: 96000 },
    { name: "Courbevoie", slug: "courbevoie", postalCode: "92400", population: 85000 },
    { name: "Colombes", slug: "colombes", postalCode: "92700", population: 86000 },
    { name: "Asnières-sur-Seine", slug: "asnieres-sur-seine", postalCode: "92600", population: 87000 },
    { name: "Rueil-Malmaison", slug: "rueil-malmaison", postalCode: "92500", population: 79000 },
    { name: "Levallois-Perret", slug: "levallois-perret", postalCode: "92300", population: 66000 },
    { name: "Issy-les-Moulineaux", slug: "issy-les-moulineaux", postalCode: "92130", population: 68000 },
    { name: "Antony", slug: "antony", postalCode: "92160", population: 62000 },
    { name: "Neuilly-sur-Seine", slug: "neuilly-sur-seine", postalCode: "92200", population: 61000 },
    { name: "Clamart", slug: "clamart", postalCode: "92140", population: 53000 },
    { name: "Clichy", slug: "clichy", postalCode: "92110", population: 62000 },
    { name: "Suresnes", slug: "suresnes", postalCode: "92150", population: 49000 },
    { name: "Puteaux", slug: "puteaux", postalCode: "92800", population: 45000 },
    { name: "Montrouge", slug: "montrouge", postalCode: "92120", population: 50000 },
    { name: "Meudon", slug: "meudon", postalCode: "92190", population: 45000 },
    { name: "Gennevilliers", slug: "gennevilliers", postalCode: "92230", population: 46000 },
    { name: "Châtenay-Malabry", slug: "chatenay-malabry", postalCode: "92290", population: 33000 },
    { name: "Bagneux", slug: "bagneux", postalCode: "92220", population: 40000 },
    { name: "Villeneuve-la-Garenne", slug: "villeneuve-la-garenne", postalCode: "92390", population: 25000 },
  ]
};

// Seine-Saint-Denis (93) - Major cities
const seineSaintDenis93: Department = {
  name: "Seine-Saint-Denis",
  slug: "seine-saint-denis-93",
  code: "93",
  cities: [
    { name: "Saint-Denis", slug: "saint-denis", postalCode: "93200", population: 112000 },
    { name: "Montreuil", slug: "montreuil", postalCode: "93100", population: 109000 },
    { name: "Aulnay-sous-Bois", slug: "aulnay-sous-bois", postalCode: "93600", population: 86000 },
    { name: "Aubervilliers", slug: "aubervilliers", postalCode: "93300", population: 88000 },
    { name: "Drancy", slug: "drancy", postalCode: "93700", population: 72000 },
    { name: "Noisy-le-Grand", slug: "noisy-le-grand", postalCode: "93160", population: 68000 },
    { name: "Pantin", slug: "pantin", postalCode: "93500", population: 59000 },
    { name: "Bondy", slug: "bondy", postalCode: "93140", population: 54000 },
    { name: "Épinay-sur-Seine", slug: "epinay-sur-seine", postalCode: "93800", population: 56000 },
    { name: "Sevran", slug: "sevran", postalCode: "93270", population: 51000 },
    { name: "Le Blanc-Mesnil", slug: "le-blanc-mesnil", postalCode: "93150", population: 56000 },
    { name: "Bobigny", slug: "bobigny", postalCode: "93000", population: 54000 },
    { name: "Livry-Gargan", slug: "livry-gargan", postalCode: "93190", population: 45000 },
    { name: "Rosny-sous-Bois", slug: "rosny-sous-bois", postalCode: "93110", population: 46000 },
    { name: "La Courneuve", slug: "la-courneuve", postalCode: "93120", population: 47000 },
    { name: "Stains", slug: "stains", postalCode: "93240", population: 40000 },
    { name: "Neuilly-sur-Marne", slug: "neuilly-sur-marne", postalCode: "93330", population: 36000 },
    { name: "Gagny", slug: "gagny", postalCode: "93220", population: 40000 },
  ]
};

// Val-de-Marne (94) - Major cities
const valDeMarne94: Department = {
  name: "Val-de-Marne",
  slug: "val-de-marne-94",
  code: "94",
  cities: [
    { name: "Créteil", slug: "creteil", postalCode: "94000", population: 92000 },
    { name: "Vitry-sur-Seine", slug: "vitry-sur-seine", postalCode: "94400", population: 93000 },
    { name: "Champigny-sur-Marne", slug: "champigny-sur-marne", postalCode: "94500", population: 77000 },
    { name: "Saint-Maur-des-Fossés", slug: "saint-maur-des-fosses", postalCode: "94100", population: 76000 },
    { name: "Ivry-sur-Seine", slug: "ivry-sur-seine", postalCode: "94200", population: 64000 },
    { name: "Maisons-Alfort", slug: "maisons-alfort", postalCode: "94700", population: 55000 },
    { name: "Fontenay-sous-Bois", slug: "fontenay-sous-bois", postalCode: "94120", population: 53000 },
    { name: "Vincennes", slug: "vincennes", postalCode: "94300", population: 50000 },
    { name: "Alfortville", slug: "alfortville", postalCode: "94140", population: 45000 },
    { name: "Villejuif", slug: "villejuif", postalCode: "94800", population: 60000 },
    { name: "Le Kremlin-Bicêtre", slug: "le-kremlin-bicetre", postalCode: "94270", population: 26000 },
    { name: "Nogent-sur-Marne", slug: "nogent-sur-marne", postalCode: "94130", population: 32000 },
    { name: "Choisy-le-Roi", slug: "choisy-le-roi", postalCode: "94600", population: 46000 },
    { name: "Thiais", slug: "thiais", postalCode: "94320", population: 30000 },
    { name: "Cachan", slug: "cachan", postalCode: "94230", population: 30000 },
    { name: "Charenton-le-Pont", slug: "charenton-le-pont", postalCode: "94220", population: 30000 },
    { name: "L'Haÿ-les-Roses", slug: "l-hay-les-roses", postalCode: "94240", population: 31000 },
  ]
};

// Val-d'Oise (95) - Major cities
const valDOise95: Department = {
  name: "Val-d'Oise",
  slug: "val-d-oise-95",
  code: "95",
  cities: [
    { name: "Argenteuil", slug: "argenteuil", postalCode: "95100", population: 110000 },
    { name: "Sarcelles", slug: "sarcelles", postalCode: "95200", population: 59000 },
    { name: "Cergy", slug: "cergy", postalCode: "95000", population: 67000 },
    { name: "Garges-lès-Gonesse", slug: "garges-les-gonesse", postalCode: "95140", population: 42000 },
    { name: "Franconville", slug: "franconville", postalCode: "95130", population: 36000 },
    { name: "Goussainville", slug: "goussainville", postalCode: "95190", population: 34000 },
    { name: "Pontoise", slug: "pontoise", postalCode: "95300", population: 32000 },
    { name: "Bezons", slug: "bezons", postalCode: "95870", population: 30000 },
    { name: "Ermont", slug: "ermont", postalCode: "95120", population: 29000 },
    { name: "Villiers-le-Bel", slug: "villiers-le-bel", postalCode: "95400", population: 28000 },
    { name: "Gonesse", slug: "gonesse", postalCode: "95500", population: 28000 },
    { name: "Taverny", slug: "taverny", postalCode: "95150", population: 26000 },
    { name: "Herblay-sur-Seine", slug: "herblay-sur-seine", postalCode: "95220", population: 29000 },
    { name: "Sannois", slug: "sannois", postalCode: "95110", population: 27000 },
    { name: "Eaubonne", slug: "eaubonne", postalCode: "95600", population: 25000 },
    { name: "Saint-Gratien", slug: "saint-gratien", postalCode: "95210", population: 20000 },
    { name: "Deuil-la-Barre", slug: "deuil-la-barre", postalCode: "95170", population: 22000 },
  ]
};

// Export all departments
export const allDepartments: Department[] = [
  paris75,
  seineEtMarne77,
  yvelines78,
  essonne91,
  hautsDeSeine92,
  seineSaintDenis93,
  valDeMarne94,
  valDOise95,
];

// Helper functions
export function getAllCities(): City[] {
  return allDepartments.flatMap(dept => dept.cities);
}

export function getDepartmentBySlug(slug: string): Department | undefined {
  return allDepartments.find(dept => dept.slug === slug);
}

export function getCityBySlug(citySlug: string): { city: City; department: Department } | undefined {
  for (const dept of allDepartments) {
    const city = dept.cities.find(c => c.slug === citySlug);
    if (city) {
      return { city, department: dept };
    }
  }
  return undefined;
}

// Get all possible URL combinations for sitemap
export function getAllLocationUrls(baseUrl: string): string[] {
  const urls: string[] = [];
  
  // Department pages for épaviste
  allDepartments.forEach(dept => {
    urls.push(`${baseUrl}/epaviste/${dept.slug}`);
    urls.push(`${baseUrl}/rachat-voiture/${dept.slug}`);
  });
  
  // City pages for épaviste
  allDepartments.forEach(dept => {
    dept.cities.forEach(city => {
      urls.push(`${baseUrl}/epaviste/${dept.slug}/${city.slug}`);
      urls.push(`${baseUrl}/rachat-voiture/${dept.slug}/${city.slug}`);
    });
  });
  
  return urls;
}
