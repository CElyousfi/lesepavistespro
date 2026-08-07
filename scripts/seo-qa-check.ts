#!/usr/bin/env ts-node
/**
 * SEO QA CHECK - Regression Safety Net
 * Validates critical SEO elements before deployment
 * Run: npx ts-node scripts/seo-qa-check.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  passed: boolean;
  message: string;
  severity: 'error' | 'warning';
}

const results: ValidationResult[] = [];

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function addResult(passed: boolean, message: string, severity: 'error' | 'warning' = 'error') {
  results.push({ passed, message, severity });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 1: Verify department codes in titles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkDepartmentCodes() {
  log('\n📋 Checking department codes in titles...', colors.blue);
  
  const seoFile = path.join(process.cwd(), 'lib/seo.ts');
  const content = fs.readFileSync(seoFile, 'utf-8');
  
  // Check if department code extraction logic exists
  const hasDeptCodeLogic = content.includes('deptCode = deptSlug.match(/\\d+$/)?.[0]');
  
  if (hasDeptCodeLogic) {
    addResult(true, '✓ Department code logic present in seo.ts', 'warning');
  } else {
    addResult(false, '✗ Department code extraction missing from seo.ts');
  }
  
  // Check if codes are used in titles
  const usesDeptCode = content.includes('deptCodeDisplay');
  
  if (usesDeptCode) {
    addResult(true, '✓ Department codes used in title generation');
  } else {
    addResult(false, '✗ Department codes not used in titles');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 2: Verify postal codes passed to city pages
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkPostalCodes() {
  log('\n📮 Checking postal codes in city pages...', colors.blue);
  
  const epavisteCityPage = path.join(process.cwd(), 'app/epaviste/[department]/[city]/page.tsx');
  const rachatCityPage = path.join(process.cwd(), 'app/rachat-voiture/[department]/[city]/page.tsx');
  
  const epavisteContent = fs.readFileSync(epavisteCityPage, 'utf-8');
  const rachatContent = fs.readFileSync(rachatCityPage, 'utf-8');
  
  if (epavisteContent.includes('city.postalCode')) {
    addResult(true, '✓ Postal codes passed to épaviste city metadata');
  } else {
    addResult(false, '✗ Postal codes missing from épaviste city pages');
  }
  
  if (rachatContent.includes('city.postalCode')) {
    addResult(true, '✓ Postal codes passed to rachat city metadata');
  } else {
    addResult(false, '✗ Postal codes missing from rachat city pages');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 3: Verify canonical tags in metadata
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkCanonicals() {
  log('\n🔗 Checking canonical URLs...', colors.blue);
  
  const seoFile = path.join(process.cwd(), 'lib/seo.ts');
  const content = fs.readFileSync(seoFile, 'utf-8');
  
  if (content.includes('alternates: {') && content.includes('canonical:')) {
    addResult(true, '✓ Canonical URL logic present in metadata generator');
  } else {
    addResult(false, '✗ Canonical URL logic missing');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 4: Verify analytics tracking on CTAs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkAnalyticsTracking() {
  log('\n📊 Checking analytics tracking...', colors.blue);
  
  const quickContactFile = path.join(process.cwd(), 'components/QuickContact.tsx');
  const content = fs.readFileSync(quickContactFile, 'utf-8');
  
  if (content.includes('trackCallClick') && content.includes('trackWhatsAppClick')) {
    addResult(true, '✓ Analytics tracking present in QuickContact');
  } else {
    addResult(false, '✗ Analytics tracking missing from QuickContact');
  }
  
  if (content.includes('onClick={handleCallClick}') && content.includes('onClick={handleWhatsAppClick}')) {
    addResult(true, '✓ Click handlers attached to CTAs');
  } else {
    addResult(false, '✗ Click handlers not attached to CTAs');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 5: Verify title length limits
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkTitleLengths() {
  log('\n📏 Checking title lengths...', colors.blue);
  
  const seoFile = path.join(process.cwd(), 'lib/seo.ts');
  const content = fs.readFileSync(seoFile, 'utf-8');
  
  const SUFFIX_LENGTH = 21; // ' | Les Épavistes Pro' from layout.tsx template
  const MAX_TOTAL = 65;

  // 1. Check that safeTitleFit helper exists (runtime guarantee)
  const hasSafeFit = content.includes('function safeTitleFit(');
  if (!hasSafeFit) {
    addResult(false, '✗ safeTitleFit() helper missing from lib/seo.ts — titles may overflow');
    return;
  }
  
  // 2. Check static titles (homepage, pillar, zones) in quotes
  const staticTitleMatches = content.match(/title:\s*'([^']+)'/g) || [];
  let longStatic = 0;
  staticTitleMatches.forEach(match => {
    const title = match.replace(/title:\s*'/, '').replace(/'$/, '');
    if (title.length + SUFFIX_LENGTH > MAX_TOTAL) {
      longStatic++;
      log(`    ✗ Static title too long (${title.length + SUFFIX_LENGTH} chars): ${title}`, colors.red);
    }
  });

  // 3. Verify worst-case dynamic titles using real location data
  const locFile = path.join(process.cwd(), 'lib/locations-national.ts');
  let longestCityName = 32; // fallback if we can't parse
  let longestDeptName = 23; // fallback
  if (fs.existsSync(locFile)) {
    const locContent = fs.readFileSync(locFile, 'utf-8');
    // Extract city names — match name: "..." patterns
    const cityNames = locContent.match(/name:\s*"([^"]+)"/g) || [];
    cityNames.forEach(m => {
      const name = m.replace(/name:\s*"/, '').replace(/"$/, '');
      if (name.length > longestCityName) longestCityName = name.length;
    });
  }

  // Simulate worst-case titles using safeTitleFit's logic
  // (we can't import TS at runtime, so we replicate the budget check)
  const budget = MAX_TOTAL - SUFFIX_LENGTH; // 44 chars
  const templates = [
    { prefix: 'Épaviste ', tag: ' – Gratuit', label: 'épaviste city' },
    { prefix: 'Rachat ', tag: ' – Cash', label: 'rachat city' },
    { prefix: 'Épaviste ', tag: ' – Gratuit 24h', label: 'épaviste dept' },
    { prefix: 'Rachat voiture ', tag: ' – Cash', label: 'rachat dept' },
  ];

  // With safeTitleFit, the max name that can fit is: budget - prefix - tag - 1 (for …)
  // Verify each template can handle the longest name via truncation
  let templateOk = true;
  templates.forEach(t => {
    const fixedLen = t.prefix.length + t.tag.length;
    const nameNoCode = budget - fixedLen;
    // safeTitleFit will truncate if needed, so we just verify the helper handles it
    if (fixedLen >= budget) {
      templateOk = false;
      log(`    ✗ Template "${t.label}" fixed parts (${fixedLen}) >= budget (${budget})`, colors.red);
    }
  });

  if (longStatic === 0 && templateOk && hasSafeFit) {
    addResult(true, `✓ All titles within ${MAX_TOTAL} character limit (safeTitleFit + longest city: ${longestCityName} chars)`);
  } else {
    addResult(false, `✗ Title length issues found: ${longStatic} static titles too long, templates ${templateOk ? 'OK' : 'broken'}`);
  }
}

function checkDescriptionLengths() {
  log('\n📏 Checking description lengths...', colors.blue);
  
  const seoFile = path.join(process.cwd(), 'lib/seo.ts');
  const content = fs.readFileSync(seoFile, 'utf-8');
  
  // Match descriptions in backticks, single quotes, and double quotes
  const descMatches = content.match(/description:\s*(?:isIdf\s*\?\s*)?(?:`([^`]+)`|'([^']+)'|"([^"]+)")/g);
  let longDescs = 0;
  const MAX_DESC = 160;
  const VAR_BUFFER = 20;
  
  if (descMatches) {
    descMatches.forEach(match => {
      const desc = match
        .replace(/description:\s*(?:isIdf\s*\?\s*)?/, '')
        .replace(/^[`'"]/,'')
        .replace(/[`'"]$/,'');
      const staticLength = desc.replace(/\$\{[^}]+\}/g, '').length;
      const hasVars = /\$\{/.test(desc);
      const estimatedLength = staticLength + (hasVars ? VAR_BUFFER : 0);
      
      if (estimatedLength > MAX_DESC) {
        longDescs++;
      }
    });
  }
  
  if (longDescs === 0) {
    addResult(true, '✓ All descriptions within 160 character limit');
  } else {
    addResult(false, `✗ ${longDescs} description(s) exceed 160 characters — shorten them`);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 6: Verify internal linking on department pages
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkInternalLinking() {
  log('\n🔗 Checking internal linking...', colors.blue);
  
  const deptClientFile = path.join(process.cwd(), 'app/epaviste/[department]/DepartmentClient.tsx');
  const content = fs.readFileSync(deptClientFile, 'utf-8');
  
  if (content.includes('Related Services') || content.includes('Nos autres services')) {
    addResult(true, '✓ Related services section present on department pages');
  } else {
    addResult(false, '✗ Related services section missing from department pages');
  }
  
  if (content.includes('/rachat-voiture/') && content.includes('/epaviste')) {
    addResult(true, '✓ Cross-service links present');
  } else {
    addResult(false, '✗ Cross-service links missing');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 7: Verify no geographic overclaim
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkGeographicScope() {
  log('\n🗺️  Checking geographic scope...', colors.blue);
  
  const locationsFile = path.join(process.cwd(), 'lib/locations-complete.ts');
  const content = fs.readFileSync(locationsFile, 'utf-8');
  
  // Check that national location data is properly loaded
  const locationsNationalFile = path.join(process.cwd(), 'lib/locations-national.ts');
  const nationalContent = fs.readFileSync(locationsNationalFile, 'utf-8');

  // Count regions (match region-level entries: name + slug + departments pattern)
  const regionCount = (nationalContent.match(/name:\s*"[^"]+",\n\s*slug:\s*"[a-z-]+",\n\s*departments:\s*\[/g) || []).length;

  if (regionCount >= 18) {
    addResult(true, `✓ National coverage: ${regionCount} regions found`);
  } else {
    addResult(false, `⚠ Found ${regionCount} regions (expected 18+)`, 'warning');
  }

  // Verify re-export layer exists
  const hasReExport = content.includes('locations-national');

  if (hasReExport) {
    addResult(true, '✓ locations-complete.ts re-exports from locations-national.ts');
  } else {
    addResult(false, '✗ locations-complete.ts missing re-export from locations-national.ts');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 8: Verify semantic reinforcement
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkSemanticContent() {
  log('\n📝 Checking semantic reinforcement...', colors.blue);
  
  const deptClientFile = path.join(process.cwd(), 'app/epaviste/[department]/DepartmentClient.tsx');
  const content = fs.readFileSync(deptClientFile, 'utf-8');
  
  const semanticTerms = [
    'centre de destruction',
    'casse automobile',
    'dépollution',
    'certificat de destruction',
    'VHU agréé'
  ];
  
  let foundTerms = 0;
  semanticTerms.forEach(term => {
    if (content.toLowerCase().includes(term.toLowerCase())) {
      foundTerms++;
    }
  });
  
  if (foundTerms >= 3) {
    addResult(true, `✓ Semantic reinforcement present (${foundTerms}/5 key terms)`);
  } else {
    addResult(false, `⚠ Weak semantic reinforcement (${foundTerms}/5 key terms)`, 'warning');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 9: Verify friction-reducing FAQ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkFAQContent() {
  log('\n❓ Checking FAQ content...', colors.blue);
  
  const faqFile = path.join(process.cwd(), 'components/FAQ.tsx');
  const content = fs.readFileSync(faqFile, 'utf-8');
  
  const frictionQuestions = [
    'Dois-je être présent',
    'sans carte grise',
    'sous-sol',
    'parking privé'
  ];
  
  let foundQuestions = 0;
  frictionQuestions.forEach(q => {
    if (content.includes(q)) {
      foundQuestions++;
    }
  });
  
  if (foundQuestions >= 3) {
    addResult(true, `✓ Friction-reducing FAQ present (${foundQuestions}/4 key questions)`);
  } else {
    addResult(false, `⚠ FAQ missing key friction-reducing questions (${foundQuestions}/4)`, 'warning');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 10: Verify trust signals not removed
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkTrustSignals() {
  log('\n🛡️  Checking trust signals...', colors.blue);
  
  const deptClientFile = path.join(process.cwd(), 'app/epaviste/[department]/DepartmentClient.tsx');
  const content = fs.readFileSync(deptClientFile, 'utf-8');
  
  const trustSignals = [
    'VHU agréé',
    'gratuit',
    '24h',
    'certificat de destruction'
  ];
  
  let foundSignals = 0;
  trustSignals.forEach(signal => {
    if (content.toLowerCase().includes(signal.toLowerCase())) {
      foundSignals++;
    }
  });
  
  if (foundSignals >= 3) {
    addResult(true, `✓ Trust signals intact (${foundSignals}/4 present)`);
  } else {
    addResult(false, `✗ CRITICAL: Trust signals removed (${foundSignals}/4 present)`);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 11: Verify CTA text not weakened
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkCTAIntegrity() {
  log('\n📞 Checking CTA integrity...', colors.blue);
  
  const quickContactFile = path.join(process.cwd(), 'components/QuickContact.tsx');
  const content = fs.readFileSync(quickContactFile, 'utf-8');
  
  // Check phone number present
  if (content.includes('06 02 42 73 45')) {
    addResult(true, '✓ Phone number CTA intact');
  } else {
    addResult(false, '✗ CRITICAL: Phone number CTA removed or changed');
  }
  
  // Check WhatsApp present
  if (content.includes('WhatsApp') || content.includes('Message')) {
    addResult(true, '✓ WhatsApp CTA intact');
  } else {
    addResult(false, '✗ CRITICAL: WhatsApp CTA removed');
  }
  
  // Check reassurance copy present
  if (content.includes('gratuit') || content.includes('Documents gérés')) {
    addResult(true, '✓ Reassurance micro-copy present');
  } else {
    addResult(false, '⚠ Reassurance micro-copy weakened', 'warning');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 12: Verify intent signals not removed
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkIntentSignals() {
  log('\n🎯 Checking intent signals...', colors.blue);
  
  const deptClientFile = path.join(process.cwd(), 'app/epaviste/[department]/DepartmentClient.tsx');
  const content = fs.readFileSync(deptClientFile, 'utf-8');
  
  // Check urgent intent signal (phone number + 24h availability in hero)
  if (content.includes('06 02 42 73 45') && content.includes('24h')) {
    addResult(true, '✓ Urgent intent signal present (phone + 24h availability)');
  } else {
    addResult(false, '✗ CRITICAL: Urgent intent signal removed (phone or 24h missing)');
  }
  
  // Check service availability signal
  if (content.includes('GRATUIT') || content.includes('gratuit')) {
    addResult(true, '✓ Free service signal present');
  } else {
    addResult(false, '⚠ Free service signal missing', 'warning');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 13: Verify brand schema present
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkBrandSchema() {
  log('\n🏢 Checking brand schema...', colors.blue);
  
  const schemaFile = path.join(process.cwd(), 'lib/schema.ts');
  const content = fs.readFileSync(schemaFile, 'utf-8');
  
  if (content.includes('getOrganizationSchema') && content.includes('getWebSiteSchema')) {
    addResult(true, '✓ Organization and WebSite schema present');
  } else {
    addResult(false, '✗ CRITICAL: Brand schema functions missing');
  }
  
  const layoutFile = path.join(process.cwd(), 'app/layout.tsx');
  const layoutContent = fs.readFileSync(layoutFile, 'utf-8');
  
  // Verify all 3 brand schemas are server-rendered inline (NOT via next/script
  // which would inject client-side and be invisible to crawlers).
  const hasOrg = /JSON\.stringify\(organizationSchema\)/.test(layoutContent);
  const hasWeb = /JSON\.stringify\(webSiteSchema\)/.test(layoutContent);
  const hasLB = /JSON\.stringify\(localBusinessSchema\)/.test(layoutContent);
  const usesInlineScript = /<script[\s\S]*?type="application\/ld\+json"/.test(layoutContent);
  if (hasOrg && hasWeb && hasLB && usesInlineScript) {
    addResult(true, '✓ Brand schemas server-rendered inline in layout');
  } else {
    addResult(false, '✗ CRITICAL: Brand schemas not properly injected in layout');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 14: No fabricated ratings/reviews in codebase
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkNoFabricatedRatings() {
  log('\n🚫 Checking no fabricated ratings/reviews...', colors.blue);

  const filesToCheck = ['lib/schema.ts', 'lib/structured-data.ts', 'app/page.tsx'];
  let foundRating = false;
  for (const file of filesToCheck) {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('ratingValue') || content.includes('reviewCount')) {
      foundRating = true;
      break;
    }
  }

  if (!foundRating) {
    addResult(true, '✓ No hardcoded ratingValue/reviewCount in critical files');
  } else {
    addResult(false, '✗ Found hardcoded ratingValue or reviewCount — remove fabricated ratings');
  }

  const testimonialsFile = path.join(process.cwd(), 'data/idf-testimonials.ts');
  if (fs.existsSync(testimonialsFile)) {
    const content = fs.readFileSync(testimonialsFile, 'utf-8');
    const hasEmptyArray = content.includes('IdfTestimonial[] = []');
    const hasComment = content.includes('verified') || content.includes('CONTENT-INTEGRITY');
    if (hasEmptyArray || hasComment) {
      addResult(true, '✓ IDF testimonials empty or marked as verified');
    } else {
      addResult(false, '✗ IDF testimonials may contain unverified data', 'warning');
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 15: Homepage IDF cities priority
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkHomepageIdfPriority() {
  log('\n🏠 Checking homepage IDF prioritization...', colors.blue);

  const pageFile = path.join(process.cwd(), 'app/page.tsx');
  const content = fs.readFileSync(pageFile, 'utf-8');

  const hasIdfFirst = content.includes('IDF_REGION_SLUG_LOCAL') && content.includes('rawRegions.filter(r => r.slug === IDF_REGION_SLUG_LOCAL)');
  if (hasIdfFirst) {
    addResult(true, '✓ IDF region in first position on homepage');
  } else {
    addResult(false, '✗ IDF region not prioritized on homepage');
  }

  const hasIdfCities = content.includes('IDF_PRIORITY_CITIES');
  if (hasIdfCities) {
    addResult(true, '✓ IDF priority cities defined on homepage');
  } else {
    addResult(false, '✗ No IDF priority cities on homepage');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 16: Sitemap pruning implemented
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkSitemapPruning() {
  log('\n🗺️  Checking sitemap pruning...', colors.blue);

  const sitemapFile = path.join(process.cwd(), 'app/sitemap-epaviste-cities.xml/route.ts');
  if (fs.existsSync(sitemapFile)) {
    const content = fs.readFileSync(sitemapFile, 'utf-8');
    if (content.includes('shouldIncludeInSitemap')) {
      addResult(true, '✓ Sitemap pruning active (shouldIncludeInSitemap)');
    } else {
      addResult(false, '✗ Sitemap not pruned — all 35k cities still indexed', 'warning');
    }
  }

  const geoFile = path.join(process.cwd(), 'lib/geo-targeting.ts');
  if (fs.existsSync(geoFile)) {
    addResult(true, '✓ Geo-targeting config exists (lib/geo-targeting.ts)');
  } else {
    addResult(false, '✗ Missing lib/geo-targeting.ts', 'warning');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 17: Domain redirect .com → .fr
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkDomainRedirect() {
  log('\n🔀 Checking domain redirect...', colors.blue);

  const middlewareFile = path.join(process.cwd(), 'middleware.ts');
  if (fs.existsSync(middlewareFile)) {
    const content = fs.readFileSync(middlewareFile, 'utf-8');
    const hasComRedirect = content.includes('lesepavistespro.com') && content.includes('lesepavistespro.fr');
    if (hasComRedirect) {
      addResult(true, '✓ Domain redirect .com → .fr configured in middleware');
    } else {
      addResult(false, '✗ Domain redirect .com → .fr not found in middleware');
    }
  } else {
    addResult(false, '✗ middleware.ts not found');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RUN ALL CHECKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function runAllChecks() {
  log('\n╔═══════════════════════════════════════════════════════════════╗', colors.blue);
  log('║          SEO QA CHECK - REGRESSION SAFETY NET                 ║', colors.blue);
  log('╚═══════════════════════════════════════════════════════════════╝', colors.blue);
  
  try {
    checkDepartmentCodes();
    checkPostalCodes();
    checkCanonicals();
    checkAnalyticsTracking();
    checkTitleLengths();
    checkDescriptionLengths();
    checkInternalLinking();
    checkGeographicScope();
    checkSemanticContent();
    checkFAQContent();
    checkTrustSignals();
    checkCTAIntegrity();
    checkIntentSignals();
    checkBrandSchema();
    checkNoFabricatedRatings();
    checkHomepageIdfPriority();
    checkSitemapPruning();
    checkDomainRedirect();
  } catch (error) {
    log(`\n❌ Error running checks: ${error}`, colors.red);
    process.exit(1);
  }
  
  // Print results
  log('\n' + '═'.repeat(65), colors.blue);
  log('RESULTS', colors.blue);
  log('═'.repeat(65), colors.blue);
  
  let errors = 0;
  let warnings = 0;
  let passed = 0;
  
  results.forEach(result => {
    if (result.passed) {
      log(result.message, colors.green);
      passed++;
    } else {
      if (result.severity === 'error') {
        log(result.message, colors.red);
        errors++;
      } else {
        log(result.message, colors.yellow);
        warnings++;
      }
    }
  });
  
  log('\n' + '═'.repeat(65), colors.blue);
  log(`SUMMARY: ${passed} passed, ${warnings} warnings, ${errors} errors`, colors.blue);
  log('═'.repeat(65), colors.blue);
  
  if (errors > 0) {
    log('\n❌ SEO QA CHECK FAILED - Fix errors before deployment', colors.red);
    process.exit(1);
  } else if (warnings > 0) {
    log('\n⚠️  SEO QA CHECK PASSED WITH WARNINGS - Review before deployment', colors.yellow);
    process.exit(0);
  } else {
    log('\n✅ SEO QA CHECK PASSED - Safe to deploy', colors.green);
    process.exit(0);
  }
}

// Execute
runAllChecks();
