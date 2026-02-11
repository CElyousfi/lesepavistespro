#!/usr/bin/env tsx
/**
 * Generate full national location data from La Poste CSV
 * Downloads the official postal codes CSV and generates lib/locations-national.ts
 * 
 * Usage: npx tsx scripts/generate-full-locations.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================
// REGION → DEPARTMENT MAPPING (Official 2024 French admin regions)
// ============================================================
const REGION_DEPARTMENT_MAP: Record<string, { name: string; slug: string; departments: string[] }> = {
  'auvergne-rhone-alpes': {
    name: 'Auvergne-Rhône-Alpes',
    slug: 'auvergne-rhone-alpes',
    departments: ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
  },
  'bourgogne-franche-comte': {
    name: 'Bourgogne-Franche-Comté',
    slug: 'bourgogne-franche-comte',
    departments: ['21', '25', '39', '58', '70', '71', '89', '90'],
  },
  'bretagne': {
    name: 'Bretagne',
    slug: 'bretagne',
    departments: ['22', '29', '35', '56'],
  },
  'centre-val-de-loire': {
    name: 'Centre-Val de Loire',
    slug: 'centre-val-de-loire',
    departments: ['18', '28', '36', '37', '41', '45'],
  },
  'corse': {
    name: 'Corse',
    slug: 'corse',
    departments: ['2A', '2B'],
  },
  'grand-est': {
    name: 'Grand Est',
    slug: 'grand-est',
    departments: ['08', '10', '51', '52', '54', '55', '57', '67', '68', '88'],
  },
  'hauts-de-france': {
    name: 'Hauts-de-France',
    slug: 'hauts-de-france',
    departments: ['02', '59', '60', '62', '80'],
  },
  'ile-de-france': {
    name: 'Île-de-France',
    slug: 'ile-de-france',
    departments: ['75', '77', '78', '91', '92', '93', '94', '95'],
  },
  'normandie': {
    name: 'Normandie',
    slug: 'normandie',
    departments: ['14', '27', '50', '61', '76'],
  },
  'nouvelle-aquitaine': {
    name: 'Nouvelle-Aquitaine',
    slug: 'nouvelle-aquitaine',
    departments: ['16', '17', '19', '23', '24', '33', '40', '47', '64', '79', '86', '87'],
  },
  'occitanie': {
    name: 'Occitanie',
    slug: 'occitanie',
    departments: ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
  },
  'pays-de-la-loire': {
    name: 'Pays de la Loire',
    slug: 'pays-de-la-loire',
    departments: ['44', '49', '53', '72', '85'],
  },
  'provence-alpes-cote-d-azur': {
    name: 'Provence-Alpes-Côte d\'Azur',
    slug: 'provence-alpes-cote-d-azur',
    departments: ['04', '05', '06', '13', '83', '84'],
  },
  'guadeloupe': {
    name: 'Guadeloupe',
    slug: 'guadeloupe',
    departments: ['971'],
  },
  'martinique': {
    name: 'Martinique',
    slug: 'martinique',
    departments: ['972'],
  },
  'guyane': {
    name: 'Guyane',
    slug: 'guyane',
    departments: ['973'],
  },
  'la-reunion': {
    name: 'La Réunion',
    slug: 'la-reunion',
    departments: ['974'],
  },
  'mayotte': {
    name: 'Mayotte',
    slug: 'mayotte',
    departments: ['976'],
  },
};

// Department names mapping
const DEPARTMENT_NAMES: Record<string, string> = {
  '01': 'Ain', '02': 'Aisne', '03': 'Allier', '04': 'Alpes-de-Haute-Provence',
  '05': 'Hautes-Alpes', '06': 'Alpes-Maritimes', '07': 'Ardèche', '08': 'Ardennes',
  '09': 'Ariège', '10': 'Aube', '11': 'Aude', '12': 'Aveyron',
  '13': 'Bouches-du-Rhône', '14': 'Calvados', '15': 'Cantal', '16': 'Charente',
  '17': 'Charente-Maritime', '18': 'Cher', '19': 'Corrèze', '21': 'Côte-d\'Or',
  '22': 'Côtes-d\'Armor', '23': 'Creuse', '24': 'Dordogne', '25': 'Doubs',
  '26': 'Drôme', '27': 'Eure', '28': 'Eure-et-Loir', '29': 'Finistère',
  '30': 'Gard', '31': 'Haute-Garonne', '32': 'Gers', '33': 'Gironde',
  '34': 'Hérault', '35': 'Ille-et-Vilaine', '36': 'Indre', '37': 'Indre-et-Loire',
  '38': 'Isère', '39': 'Jura', '40': 'Landes', '41': 'Loir-et-Cher',
  '42': 'Loire', '43': 'Haute-Loire', '44': 'Loire-Atlantique', '45': 'Loiret',
  '46': 'Lot', '47': 'Lot-et-Garonne', '48': 'Lozère', '49': 'Maine-et-Loire',
  '50': 'Manche', '51': 'Marne', '52': 'Haute-Marne', '53': 'Mayenne',
  '54': 'Meurthe-et-Moselle', '55': 'Meuse', '56': 'Morbihan', '57': 'Moselle',
  '58': 'Nièvre', '59': 'Nord', '60': 'Oise', '61': 'Orne',
  '62': 'Pas-de-Calais', '63': 'Puy-de-Dôme', '64': 'Pyrénées-Atlantiques',
  '65': 'Hautes-Pyrénées', '66': 'Pyrénées-Orientales', '67': 'Bas-Rhin',
  '68': 'Haut-Rhin', '69': 'Rhône', '70': 'Haute-Saône', '71': 'Saône-et-Loire',
  '72': 'Sarthe', '73': 'Savoie', '74': 'Haute-Savoie', '75': 'Paris',
  '76': 'Seine-Maritime', '77': 'Seine-et-Marne', '78': 'Yvelines',
  '79': 'Deux-Sèvres', '80': 'Somme', '81': 'Tarn', '82': 'Tarn-et-Garonne',
  '83': 'Var', '84': 'Vaucluse', '85': 'Vendée', '86': 'Vienne',
  '87': 'Haute-Vienne', '88': 'Vosges', '89': 'Yonne',
  '90': 'Territoire de Belfort', '91': 'Essonne', '92': 'Hauts-de-Seine',
  '93': 'Seine-Saint-Denis', '94': 'Val-de-Marne', '95': 'Val-d\'Oise',
  '2A': 'Corse-du-Sud', '2B': 'Haute-Corse',
  '971': 'Guadeloupe', '972': 'Martinique', '973': 'Guyane',
  '974': 'La Réunion', '976': 'Mayotte',
};

// ============================================================
// SLUG GENERATION HELPERS
// ============================================================
function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function toSlug(str: string): string {
  return removeAccents(str)
    .toLowerCase()
    .replace(/['']/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getDeptSlug(code: string, name: string): string {
  return `${toSlug(name)}-${code.toLowerCase()}`;
}

function getCitySlug(cityName: string, deptCode: string): string {
  // Special handling for Paris arrondissements
  if (deptCode === '75' && cityName.startsWith('Paris ')) {
    if (cityName.includes('1er')) {
      return 'paris-1er';
    }
    const arrMatch = cityName.match(/Paris (\d+)e$/);
    if (arrMatch) {
      return `paris-${arrMatch[1]}e`;
    }
  }
  
  // Special handling for Lyon arrondissements
  if (cityName.startsWith('Lyon ')) {
    if (cityName.includes('1er')) {
      return 'lyon-1er';
    }
    const arrMatch = cityName.match(/Lyon (\d+)e$/);
    if (arrMatch) {
      return `lyon-${arrMatch[1]}e`;
    }
  }
  
  // Special handling for Marseille arrondissements
  if (cityName.startsWith('Marseille ')) {
    if (cityName.includes('1er')) {
      return 'marseille-1er';
    }
    const arrMatch = cityName.match(/Marseille (\d+)e$/);
    if (arrMatch) {
      return `marseille-${arrMatch[1]}e`;
    }
  }
  
  return toSlug(cityName);
}

// Get department code from postal code
function getDeptCodeFromPostal(postalCode: string): string {
  if (!postalCode || postalCode.length < 2) return '';
  
  const prefix2 = postalCode.substring(0, 2);
  const prefix3 = postalCode.substring(0, 3);
  
  // Overseas departments
  if (prefix3 === '971') return '971';
  if (prefix3 === '972') return '972';
  if (prefix3 === '973') return '973';
  if (prefix3 === '974') return '974';
  if (prefix3 === '976') return '976';
  
  // Corsica
  if (prefix2 === '20') {
    const code3 = parseInt(postalCode.substring(0, 3));
    if (code3 >= 200 && code3 <= 201) return '2A';
    if (code3 >= 202 && code3 <= 206) return '2B';
    // Default for 20xxx
    return postalCode.charAt(2) <= '1' ? '2A' : '2B';
  }
  
  // Lyon (69)
  if (prefix2 === '69') return '69';
  
  // Paris arrondissements (750xx)
  if (prefix2 === '75') return '75';
  
  // Marseille (130xx)
  if (prefix2 === '13') return '13';
  
  return prefix2;
}

// ============================================================
// MAIN GENERATION
// ============================================================
async function main() {
  console.log('🚀 Starting national location data generation...\n');
  
  // Step 1: Download CSV
  console.log('📥 Downloading La Poste postal codes CSV...');
  const csvUrl = 'https://datanova.laposte.fr/data-fair/api/v1/datasets/laposte-hexasmal/metadata-attachments/base-officielle-codes-postaux.csv';
  
  let csvContent: string;
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    csvContent = await response.text();
    console.log(`✅ Downloaded ${(csvContent.length / 1024 / 1024).toFixed(1)} MB\n`);
  } catch (error) {
    console.error('❌ Failed to download CSV. Using fallback approach...');
    console.error(error);
    process.exit(1);
  }
  
  // Step 2: Parse CSV — standard comma-separated with quoted fields
  // The _geopoint field contains commas inside quotes, so we need proper CSV parsing
  console.log('📊 Parsing CSV data...');
  
  const rawLines = csvContent.split('\n').filter(l => l.trim().length > 0);
  
  // Proper CSV parser that handles quoted fields with commas inside
  function parseLine(raw: string): string[] {
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;
    const line = raw.trim();
    
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          // Escaped quote
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    fields.push(current.trim());
    return fields;
  }
  
  const headers = parseLine(rawLines[0]);
  console.log(`   Headers: ${headers.join(' | ')}`);
  
  // Find column indices
  const colInsee = headers.findIndex(h => h.toLowerCase().includes('code_commune_insee'));
  const colCommune = headers.findIndex(h => h.toLowerCase().includes('nom_de_la_commune') || h.toLowerCase().includes('nom_commune'));
  const colPostal = headers.findIndex(h => h.toLowerCase().includes('code_postal'));
  const colAcheminement = headers.findIndex(h => h.toLowerCase().includes('acheminement') || h.toLowerCase().includes('libelle'));
  
  console.log(`   Column indices: INSEE=${colInsee}, Commune=${colCommune}, Postal=${colPostal}, Acheminement=${colAcheminement}`);
  
  if (colCommune < 0 || colPostal < 0) {
    console.error('❌ Could not find required columns. Headers:', headers);
    process.exit(1);
  }
  
  const dataLines = rawLines.slice(1);
  console.log(`✅ Found ${dataLines.length} data rows\n`);
  
  // Step 3: Group by department and city
  console.log('🗂️ Grouping cities by department...');
  
  // Map: deptCode -> Map<cityName, { postalCodes: Set, insee: string }>
  const deptCities = new Map<string, Map<string, { postalCodes: Set<string>; insee: string; name: string }>>();
  
  let skipped = 0;
  for (const rawLine of dataLines) {
    const fields = parseLine(rawLine);
    
    const inseeCode = colInsee >= 0 ? (fields[colInsee] || '') : '';
    const communeName = colCommune >= 0 ? (fields[colCommune] || '') : '';
    const postalCode = colPostal >= 0 ? (fields[colPostal] || '') : '';
    const acheminement = colAcheminement >= 0 ? (fields[colAcheminement] || '') : '';
    
    if (!communeName || !postalCode) { skipped++; continue; }
    
    const deptCode = getDeptCodeFromPostal(postalCode);
    if (!deptCode || !DEPARTMENT_NAMES[deptCode]) { skipped++; continue; }
    
    if (!deptCities.has(deptCode)) {
      deptCities.set(deptCode, new Map());
    }
    
    const cities = deptCities.get(deptCode)!;
    // Use acheminement name if available (cleaner), fallback to commune name
    const rawName = acheminement || communeName;
    
    // Title-case: split on spaces and hyphens, preserving separators
    const titleCased = rawName.split(/(\s+|-)/g).map((part: string) => {
      if (part === ' ' || part === '-' || part.trim() === '') return part;
      const upper = part.toUpperCase();
      if (['DE', 'DU', 'DES', 'LE', 'LA', 'LES', 'EN', 'SUR', 'SOUS', 'ET', 'AUX', 'LÈS', 'LEZ', 'D'].includes(upper)) {
        return part.toLowerCase();
      }
      // Handle L' and D' prefixes
      if (upper.length > 2 && (upper.startsWith("L'") || upper.startsWith("D'"))) {
        return part.charAt(0).toUpperCase() + "'" + part.charAt(2).toUpperCase() + part.slice(3).toLowerCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join('');
    
    const key = communeName.toUpperCase();
    
    if (!cities.has(key)) {
      cities.set(key, {
        postalCodes: new Set([postalCode]),
        insee: inseeCode,
        name: titleCased,
      });
    } else {
      cities.get(key)!.postalCodes.add(postalCode);
    }
  }
  
  console.log(`   Skipped ${skipped} invalid rows`);
  
  // Step 4: Handle Paris/Lyon/Marseille arrondissements
  console.log('🏙️ Processing arrondissements (Paris, Lyon, Marseille)...');
  
  // Paris: Replace single "PARIS" entry with 20 arrondissements
  if (deptCities.has('75')) {
    const parisCities = new Map<string, { postalCodes: Set<string>; insee: string; name: string }>();
    parisCities.set('PARIS 1ER', { postalCodes: new Set(['75001']), insee: '75101', name: 'Paris 1er' });
    for (let i = 2; i <= 20; i++) {
      const postalCode = `750${i.toString().padStart(2, '0')}`;
      parisCities.set(`PARIS ${i}E`, {
        postalCodes: new Set([postalCode]),
        insee: `751${i.toString().padStart(2, '0')}`,
        name: `Paris ${i}e`,
      });
    }
    deptCities.set('75', parisCities);
  }
  
  // Lyon: Add arrondissements
  if (deptCities.has('69')) {
    const lyonCities = deptCities.get('69')!;
    // Remove generic LYON entry if exists
    lyonCities.delete('LYON');
    // Add arrondissements
    lyonCities.set('LYON 1ER', { postalCodes: new Set(['69001']), insee: '69381', name: 'Lyon 1er' });
    for (let i = 2; i <= 9; i++) {
      lyonCities.set(`LYON ${i}E`, {
        postalCodes: new Set([`6900${i}`]),
        insee: `6938${i}`,
        name: `Lyon ${i}e`,
      });
    }
  }
  
  // Marseille: Add arrondissements
  if (deptCities.has('13')) {
    const marseilleCities = deptCities.get('13')!;
    // Remove generic MARSEILLE entry if exists
    marseilleCities.delete('MARSEILLE');
    // Add arrondissements
    marseilleCities.set('MARSEILLE 1ER', { postalCodes: new Set(['13001']), insee: '13201', name: 'Marseille 1er' });
    for (let i = 2; i <= 16; i++) {
      marseilleCities.set(`MARSEILLE ${i}E`, {
        postalCodes: new Set([`130${i.toString().padStart(2, '0')}`]),
        insee: `132${i.toString().padStart(2, '0')}`,
        name: `Marseille ${i}e`,
      });
    }
  }
  
  // Step 5: Build the output structure
  console.log('🏗️ Building region → department → city structure...\n');
  
  // Build reverse map: deptCode -> regionSlug
  const deptToRegion = new Map<string, string>();
  for (const [regionSlug, regionData] of Object.entries(REGION_DEPARTMENT_MAP)) {
    for (const deptCode of regionData.departments) {
      deptToRegion.set(deptCode, regionSlug);
    }
  }
  
  // Stats
  let totalDepts = 0;
  let totalCities = 0;
  
  // Build regions array
  const regionsOutput: string[] = [];
  
  for (const [regionSlug, regionData] of Object.entries(REGION_DEPARTMENT_MAP)) {
    const deptsOutput: string[] = [];
    
    for (const deptCode of regionData.departments) {
      const deptName = DEPARTMENT_NAMES[deptCode];
      if (!deptName) continue;
      
      const deptSlug = getDeptSlug(deptCode, deptName);
      const cities = deptCities.get(deptCode);
      
      if (!cities || cities.size === 0) {
        console.warn(`⚠️ No cities found for department ${deptCode} (${deptName})`);
        continue;
      }
      
      // Sort cities by name
      const sortedCities = Array.from(cities.values())
        .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
      
      const citiesOutput: string[] = [];
      for (const city of sortedCities) {
        const citySlug = getCitySlug(city.name, deptCode);
        const primaryPostal = Array.from(city.postalCodes).sort()[0];
        
        citiesOutput.push(`      { name: ${JSON.stringify(city.name)}, slug: ${JSON.stringify(citySlug)}, postalCode: ${JSON.stringify(primaryPostal)} }`);
        totalCities++;
      }
      
      deptsOutput.push(`    {
      name: ${JSON.stringify(deptName)},
      code: ${JSON.stringify(deptCode)},
      slug: ${JSON.stringify(deptSlug)},
      regionSlug: ${JSON.stringify(regionSlug)},
      cities: [
${citiesOutput.join(',\n')}
      ]
    }`);
      totalDepts++;
    }
    
    regionsOutput.push(`  {
    name: ${JSON.stringify(regionData.name)},
    slug: ${JSON.stringify(regionData.slug)},
    departments: [
${deptsOutput.join(',\n')}
    ]
  }`);
  }
  
  // Step 6: Write output file
  console.log(`📝 Writing output file...`);
  console.log(`   Regions: ${Object.keys(REGION_DEPARTMENT_MAP).length}`);
  console.log(`   Departments: ${totalDepts}`);
  console.log(`   Cities: ${totalCities}\n`);
  
  const outputContent = `// AUTO-GENERATED FILE - Do not edit manually
// Generated by scripts/generate-full-locations.ts
// Source: La Poste official postal codes CSV
// Generated: ${new Date().toISOString()}
//
// ${Object.keys(REGION_DEPARTMENT_MAP).length} regions, ${totalDepts} departments, ${totalCities} cities

export interface City {
  name: string;
  slug: string;
  postalCode: string;
  population?: number;
  arrondissement?: string;
}

export interface Department {
  name: string;
  code: string;
  slug: string;
  regionSlug: string;
  cities: City[];
}

export interface Region {
  name: string;
  slug: string;
  departments: Department[];
}

// ============================================================
// FULL NATIONAL DATA
// ============================================================
export const regions: Region[] = [
${regionsOutput.join(',\n')}
];

// ============================================================
// FLAT ACCESS HELPERS
// ============================================================

/** All departments across all regions */
export const allDepartments: Department[] = regions.flatMap(r => r.departments);

/** All cities across all departments */
export function getAllCities(): City[] {
  return allDepartments.flatMap(dept => dept.cities);
}

// ============================================================
// LOOKUP FUNCTIONS
// ============================================================

/** Find a region by its slug */
export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find(r => r.slug === slug);
}

/** Find a department by its slug */
export function getDepartmentBySlug(slug: string): Department | undefined {
  return allDepartments.find(d => d.slug === slug);
}

/** Find a city by its slug (searches all departments) */
export function getCityBySlug(citySlug: string): { city: City; department: Department } | undefined {
  for (const dept of allDepartments) {
    const city = dept.cities.find(c => c.slug === citySlug);
    if (city) {
      return { city, department: dept };
    }
  }
  return undefined;
}

/** Find the parent region for a department */
export function getRegionForDepartment(deptSlug: string): Region | undefined {
  const dept = getDepartmentBySlug(deptSlug);
  if (!dept) return undefined;
  return regions.find(r => r.slug === dept.regionSlug);
}

/** Get all department slugs */
export function getAllDepartmentSlugs(): string[] {
  return allDepartments.map(d => d.slug);
}

/** Get all region slugs */
export function getAllRegionSlugs(): string[] {
  return regions.map(r => r.slug);
}

/** Get all location URLs for sitemap */
export function getAllLocationUrls(baseUrl: string): string[] {
  const urls: string[] = [];
  
  // Region pages
  regions.forEach(region => {
    urls.push(\`\${baseUrl}/epaviste/\${region.slug}\`);
  });
  
  // Department pages
  allDepartments.forEach(dept => {
    urls.push(\`\${baseUrl}/epaviste/\${dept.slug}\`);
    urls.push(\`\${baseUrl}/rachat-voiture/\${dept.slug}\`);
  });
  
  // City pages
  allDepartments.forEach(dept => {
    dept.cities.forEach(city => {
      urls.push(\`\${baseUrl}/epaviste/\${dept.slug}/\${city.slug}\`);
      urls.push(\`\${baseUrl}/rachat-voiture/\${dept.slug}/\${city.slug}\`);
    });
  });
  
  return urls;
}
`;

  const outputPath = path.join(__dirname, '..', 'lib', 'locations-national.ts');
  fs.writeFileSync(outputPath, outputContent, 'utf-8');
  
  console.log(`✅ Generated ${outputPath}`);
  console.log(`   File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(1)} MB`);
  console.log('\n🎉 Done! National location data generated successfully.');
}

main().catch(console.error);
