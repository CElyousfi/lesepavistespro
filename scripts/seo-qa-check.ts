#!/usr/bin/env ts-node
/**
 * SEO QA CHECK - Regression Safety Net
 * Validates critical SEO elements before deployment
 * Run: npx ts-node scripts/seo-qa-check.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { checkCityResolution } from './check-city-resolution';
import { checkHardcodedInternalLinks } from './check-internal-links';
import { checkRedirectHops } from './check-redirect-hops';
import { analyseIdfContent, TIER_MIN_WORDS, TIER_MAX_SIMILARITY } from './idf-content-similarity';

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
  
  const SUFFIX_LENGTH = ' | Les Épavistes Pro'.length; // layout.tsx template
  const MAX_TOTAL = 60; // must match MAX_TITLE_TOTAL in lib/seo.ts

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

  // safeTitleFit never truncates the city name: it drops the postal code, then
  // the tag, then the brand suffix. All that must hold here is that the fixed
  // parts alone still leave room for a name.
  let templateOk = true;
  templates.forEach(t => {
    const fixedLen = t.prefix.length + t.tag.length;
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
  
  // The FAQ item lists moved to lib/faq.ts so server code can build the
  // matching FAQPage without importing the client component.
  const faqFile = path.join(process.cwd(), 'lib/faq.ts');
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

  // IDF hero + IDF coverage must render before the national <Coverage>.
  const heroAt = content.indexOf('<IdfHero');
  const idfCoverageAt = content.indexOf('<IdfCoverage');
  const nationalAt = content.indexOf('<Coverage ');
  const idfFirst = heroAt !== -1 && idfCoverageAt !== -1 && nationalAt !== -1 && heroAt < idfCoverageAt && idfCoverageAt < nationalAt;
  addResult(idfFirst, idfFirst ? '✓ Homepage: IDF hero and IDF coverage render before national coverage' : '✗ Homepage must render IdfHero, then IdfCoverage, then the national Coverage');

  // Top cities come from the dataset (population), never a hardcoded slug list.
  const derived = content.includes('getTopIdfCities(') && content.includes('getIdfDepartments()') && !content.includes('IDF_PRIORITY_CITIES');
  addResult(derived, derived ? '✓ Homepage IDF departments and top cities derived from data' : '✗ Homepage must derive IDF departments/cities from lib/idf-cities, not hardcode slugs');

  // National links are kept, only moved below.
  const keepsNational = content.includes('<Coverage ') && content.includes('coverageRegions');
  addResult(keepsNational, keepsNational ? '✓ Homepage keeps the national coverage section' : '✗ Homepage must keep national coverage links (moved below IDF, not removed)');

  const homeTitle = fs.readFileSync(path.join(process.cwd(), 'lib/seo.ts'), 'utf-8').match(/absolute: '(Épaviste Île-de-France(?:[^'\\]|\\.)*)'/)?.[1]?.replace(/\\'/g, "'") ?? '';
  addResult(homeTitle.length > 0 && homeTitle.length <= 60, homeTitle ? `✓ Homepage title is IDF-first (${homeTitle.length} chars)` : '✗ Homepage title must start with "Épaviste Île-de-France"');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK (P2.2): IDF hubs — 8 department hubs of 400+ unique words, wired
// into both services' routes; non-IDF departments keep the national template
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkIdfHubs() {
  log('\n🏛️  Checking Île-de-France hubs...', colors.blue);
  const src = fs.readFileSync(path.join(process.cwd(), 'data/idf-extra-content.ts'), 'utf-8');
  const codes = ['75', '77', '78', '91', '92', '93', '94', '95'];
  const hubCodes = [...src.matchAll(/^    deptCode: '(\d{2})',\n    prefecture:/gm)].map(m => m[1]);
  const allHubs = codes.every(c => hubCodes.includes(c));
  addResult(allHubs, allHubs ? '✓ 8 IDF department hubs defined' : `✗ Missing IDF hubs for ${codes.filter(c => !hubCodes.includes(c)).join(', ')}`);

  // Word count per hub (prose fields only), from the source text.
  const hubBlocks = src.split(/^  \{\n    deptCode: '/m).slice(1).filter(b => /^\d{2}',\n    prefecture: '/.test(b));
  for (const block of hubBlocks) {
    const code = block.slice(0, 2);
    const prose = [...block.matchAll(/`([^`]*)`/g)].map(m => m[1]).join(' ');
    const words = prose.split(/\s+/).filter(Boolean).length;
    addResult(words >= 400, `${words >= 400 ? '✓' : '✗'} IDF hub ${code}: ${words} words (min 400)`);
  }

  for (const route of ['app/epaviste/[department]/page.tsx', 'app/rachat-voiture/[department]/page.tsx']) {
    const content = fs.readFileSync(path.join(process.cwd(), route), 'utf-8');
    const wired = content.includes('<IdfDepartmentPage') && content.includes('<IdfRegionPage') && content.includes('isIdf');
    addResult(wired, wired ? `✓ ${route} renders IdfDepartmentPage / IdfRegionPage for IDF only` : `✗ ${route} must render the IDF hubs for IDF departments/region`);
  }
  const index = fs.readFileSync(path.join(process.cwd(), 'components/IdfCommuneIndex.tsx'), 'utf-8');
  const linksInHtml = index.includes('<details') && !index.includes("'use client'");
  addResult(linksInHtml, linksInHtml ? '✓ Commune index is server-rendered with <details> (all links in HTML)' : '✗ Commune index must be a server component using <details>, never a client-side "Voir plus"');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK: IDF city content quality (P3.2 guardrail #9)
//   Tier A: every commune hand-written, ≥ 800 unique words per service,
//           pairwise similarity < 0.40 within the tier.
//   Tier B: ≥ 500 unique words, pairwise similarity < 0.60.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkIdfContentQuality() {
  log('\n📝 Checking Île-de-France city content (words + similarity)...', colors.blue);
  const { reports, tierCounts } = analyseIdfContent();
  addResult(tierCounts.A > 0 && tierCounts.B > 0, `✓ IDF tiers computed: A=${tierCounts.A} B=${tierCounts.B} C=${tierCounts.C}`);
  for (const r of reports) {
    const label = `${r.service} tier ${r.tier}`;
    if (r.tier === 'A') {
      const covered = r.handwritten === r.pages;
      addResult(covered, covered ? `✓ ${label}: ${r.handwritten}/${r.pages} communes hand-written` : `✗ ${label}: only ${r.handwritten}/${r.pages} communes hand-written (Tier A must not fall back to generated text)`);
    }
    addResult(r.words.below === 0, `${r.words.below === 0 ? '✓' : '✗'} ${label}: min ${r.words.min} unique words (threshold ${TIER_MIN_WORDS[r.tier]}, ${r.words.below} below)`);
    addResult(r.similarity.over === 0, `${r.similarity.over === 0 ? '✓' : '✗'} ${label}: max similarity ${r.similarity.max.toFixed(3)} (threshold ${TIER_MAX_SIMILARITY[r.tier]}, ${r.similarity.over}/${r.similarity.pairs} pairs over)${r.similarity.worst.length ? ' — ' + r.similarity.worst.join('; ') : ''}`);
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

  // Next 16 renamed the "middleware" convention to "proxy".
  const proxyFile = path.join(process.cwd(), 'proxy.ts');
  if (!fs.existsSync(proxyFile)) {
    addResult(false, '✗ proxy.ts not found');
    return;
  }
  const content = fs.readFileSync(proxyFile, 'utf-8');

  const hasComRedirect = content.includes('lesepavistespro.com') && content.includes('lesepavistespro.fr');
  addResult(
    hasComRedirect,
    hasComRedirect
      ? '✓ Domain redirect .com → .fr configured in proxy.ts'
      : '✗ Domain redirect .com → .fr not found in proxy.ts'
  );

  // Canonicalisation must resolve in a single hop, so exactly one redirect call.
  const redirectCalls = (content.match(/NextResponse\.redirect\(/g) || []).length;
  addResult(
    redirectCalls === 1,
    redirectCalls === 1
      ? '✓ proxy.ts canonicalises in a single redirect (no chains)'
      : `✗ proxy.ts issues ${redirectCalls} separate redirects — canonicalisation must be one hop`
  );

  // Every non-canonical variant must reach its canonical form in ONE hop.
  const hops = checkRedirectHops();
  if (hops.passed) {
    addResult(true, `✓ ${hops.checked} URL variants canonicalise in a single hop`);
  } else {
    hops.failures.forEach(f => addResult(false, `✗ Redirect: ${f}`));
  }

  // The trailing-slash rule must not be duplicated in next.config.ts.
  const nextConfig = fs.readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf-8');
  const duplicatesTrailingSlash = /source:\s*'\/:path\+\/'/.test(nextConfig);
  addResult(
    !duplicatesTrailingSlash,
    duplicatesTrailingSlash
      ? '✗ next.config.ts duplicates the trailing-slash redirect handled by proxy.ts (creates chains)'
      : '✓ Trailing-slash canonicalisation lives only in proxy.ts'
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 18 (P1.1): every (department, city) resolves to itself
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkCityResolutionGuard() {
  log('\n🏙️  Checking city resolution (department + slug)...', colors.blue);

  const result = checkCityResolution();
  if (result.passed) {
    addResult(
      true,
      `✓ All ${result.stats.cities} cities resolve to their own department; ` +
        `${result.stats.sitemapUrlsPerService} sitemap URLs per service are self-canonical and indexable; ` +
        `${result.stats.homonymSlugs} homonym slugs have unique titles`
    );
  } else {
    result.failures.slice(0, 10).forEach(f => addResult(false, `✗ City resolution: ${f}`));
    if (result.failures.length > 10) {
      addResult(false, `✗ …and ${result.failures.length - 10} more city resolution failures`);
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 19 (P1.2): every hardcoded internal link resolves
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkHardcodedLinks() {
  log('\n🔗 Checking hardcoded internal links...', colors.blue);

  const result = checkHardcodedInternalLinks();
  if (result.passed) {
    addResult(true, `✓ All ${result.checked} hardcoded internal links resolve`);
  } else {
    result.failures.forEach(f => addResult(false, `✗ Broken internal link: ${f}`));
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 20 (P1.3): robots.txt must not block rendering resources or Semrush SA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkRobotsRules() {
  log('\n🤖 Checking robots.ts rules...', colors.blue);

  const file = path.join(process.cwd(), 'app/robots.ts');
  if (!fs.existsSync(file)) {
    addResult(false, '✗ app/robots.ts not found');
    return;
  }
  const content = fs.readFileSync(file, 'utf-8');

  // Rendering resources: Google needs the CSS/JS to render the page.
  const blocksRenderResources = /disallow[\s\S]{0,400}?['"`]\/_next\/(static|webpack)\//i.test(content);
  addResult(
    !blocksRenderResources,
    blocksRenderResources
      ? '✗ robots.ts disallows /_next/static or /_next/webpack — blocks rendering resources'
      : '✓ robots.ts does not block rendering resources (/_next/static, /_next/webpack)'
  );

  // Semrush Site Audit must be able to crawl the site.
  const allowsSemrushSA = /userAgent:\s*['"`]SemrushBot-SA['"`][\s\S]{0,200}?allow:\s*['"`]\//.test(content);
  addResult(
    allowsSemrushSA,
    allowsSemrushSA
      ? '✓ robots.ts allows SemrushBot-SA (Site Audit)'
      : '✗ robots.ts blocks SemrushBot-SA — Semrush Site Audit cannot crawl the site'
  );

  // Only the sitemap index should be advertised.
  const childSitemapListed = /sitemap:[\s\S]{0,400}?sitemap-(static|blog|epaviste|rachat|images)/.test(content);
  addResult(
    !childSitemapListed,
    childSitemapListed
      ? '✗ robots.ts lists child sitemaps — list only /sitemap.xml (the index)'
      : '✓ robots.ts advertises only the sitemap index'
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 21 (P1.4): sitemaps use real lastmod and the shared indexation rules
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkSitemapIntegrity() {
  log('\n🗺️  Checking sitemap generators...', colors.blue);

  const dir = path.join(process.cwd(), 'app');
  const sitemapRoutes = fs
    .readdirSync(dir)
    .filter(name => name.startsWith('sitemap') && name.endsWith('.xml'))
    .map(name => path.join(dir, name, 'route.ts'))
    .filter(fs.existsSync);

  addResult(sitemapRoutes.length >= 10, `✓ ${sitemapRoutes.length} sitemap routes found`);

  // Île-de-France sitemap: exists, and is the FIRST child of the index.
  const idfRoute = path.join(dir, 'sitemap-idf.xml', 'route.ts');
  const indexRoute = fs.readFileSync(path.join(dir, 'sitemap.xml', 'route.ts'), 'utf-8');
  const firstChild = indexRoute.match(/const sitemaps = \[\s*`\$\{base\}\/(sitemap-[a-z-]+\.xml)`/)?.[1];
  addResult(fs.existsSync(idfRoute), fs.existsSync(idfRoute) ? '✓ sitemap-idf.xml exists' : '✗ sitemap-idf.xml is missing');
  addResult(
    firstChild === 'sitemap-idf.xml',
    firstChild === 'sitemap-idf.xml'
      ? '✓ sitemap-idf.xml is listed first in the sitemap index'
      : `✗ sitemap index must list sitemap-idf.xml first (found ${firstChild ?? 'nothing'})`
  );
  if (fs.existsSync(idfRoute)) {
    const idfSrc = fs.readFileSync(idfRoute, 'utf-8');
    const idfOk = ['getIdfCityUpdatedAt', 'shouldIncludeInSitemap', 'shouldNoIndex', 'getCityInDepartment', "region !== 'idf'"].every(t => idfSrc.includes(t));
    addResult(idfOk, idfOk ? '✓ sitemap-idf.xml validates URLs and uses per-city lastmod' : '✗ sitemap-idf.xml must validate every URL and use per-city lastmod');
  }

  for (const route of sitemapRoutes) {
    const rel = path.relative(process.cwd(), route);
    const content = fs.readFileSync(route, 'utf-8');

    // <lastmod> must never be the request timestamp.
    if (/lastmod/.test(content) && /new Date\(\)\.toISOString\(\)/.test(content)) {
      addResult(false, `✗ ${rel}: <lastmod> uses new Date() — Google ignores an always-now lastmod`);
    }

    // changefreq / priority are ignored by Google and add noise.
    if (/<changefreq>|<priority>/.test(content)) {
      addResult(false, `✗ ${rel}: emits <changefreq>/<priority> (ignored by Google)`, 'warning');
    }

    // City sitemaps must reuse the page's own indexation functions.
    if (/cities\.xml/.test(rel)) {
      const usesRules =
        content.includes('shouldIncludeInSitemap') &&
        content.includes('shouldNoIndex') &&
        content.includes('getCityInDepartment');
      addResult(
        usesRules,
        usesRules
          ? `✓ ${rel}: filters on shouldIncludeInSitemap + shouldNoIndex + getCityInDepartment`
          : `✗ ${rel}: must reuse shouldIncludeInSitemap, shouldNoIndex and getCityInDepartment`
      );
    }
  }
}

/**
 * Return only the source of the `metadata` export and `generateMetadata`
 * function — the places that actually declare a page's SERP title.
 */
function extractMetadataRegions(source: string): string {
  const regions: string[] = [];
  const starts = [
    /export const metadata\s*:?[^=]*=\s*\{/g,
    /export async function generateMetadata[\s\S]*?\{/g,
  ];
  for (const re of starts) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(source)) !== null) {
      let depth = 0;
      let i = source.indexOf('{', m.index);
      const start = i;
      for (; i < source.length; i++) {
        if (source[i] === '{') depth++;
        else if (source[i] === '}') {
          depth--;
          if (depth === 0) break;
        }
      }
      regions.push(source.slice(start, i + 1));
    }
  }
  return regions.join('\n');
}

/** Remove `openGraph: { … }` / `twitter: { … }` blocks (brace-matched). */
function stripSocialBlocks(source: string): string {
  let out = source;
  for (const key of ['openGraph', 'twitter']) {
    let index = out.indexOf(`${key}: {`);
    while (index !== -1) {
      let depth = 0;
      let i = out.indexOf('{', index);
      const start = i;
      for (; i < out.length; i++) {
        if (out[i] === '{') depth++;
        else if (out[i] === '}') {
          depth--;
          if (depth === 0) break;
        }
      }
      out = out.slice(0, start) + out.slice(i + 1);
      index = out.indexOf(`${key}: {`);
    }
  }
  return out;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 22 (P2.1): no brand duplication, no title over the SERP budget
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkTitleBudget() {
  log('\n📏 Checking title budget and brand duplication...', colors.blue);

  const BRAND = 'Les Épavistes Pro';
  const SUFFIX_LEN = ' | Les Épavistes Pro'.length;
  const MAX = 60;

  // Static page titles declared inline in app/**/page.tsx
  const pageFiles: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === 'page.tsx') pageFiles.push(full);
    }
  };
  walk(path.join(process.cwd(), 'app'));

  let violations = 0;
  let checked = 0;

  for (const file of pageFiles) {
    const rel = path.relative(process.cwd(), file);
    const raw = fs.readFileSync(file, 'utf-8');
    // Only the metadata export declares SERP titles. openGraph/twitter titles
    // are not run through the layout template (so the brand belongs there), and
    // a `title:` inside a schema helper call is a schema headline, not a title.
    const content = stripSocialBlocks(extractMetadataRegions(raw));

    // title: 'X'  |  title: "X"  |  title: { absolute: 'X' }
    const absoluteRe = /title:\s*\{\s*absolute:\s*['"`]([^'"`]+)['"`]/g;
    const plainRe = /(?<!absolute:\s)title:\s*['"`]([^'"`\n]{5,})['"`]/g;

    let m: RegExpExecArray | null;
    while ((m = absoluteRe.exec(content)) !== null) {
      checked++;
      const title = m[1];
      if (title.length > MAX) {
        addResult(false, `✗ ${rel}: absolute title is ${title.length} chars (max ${MAX}): "${title}"`);
        violations++;
      }
    }
    while ((m = plainRe.exec(content)) !== null) {
      const title = m[1];
      if (title === 'Page non trouvée') continue;
      checked++;
      if (title.includes(BRAND)) {
        addResult(
          false,
          `✗ ${rel}: title repeats the brand while the layout template already appends it: "${title}"`
        );
        violations++;
        continue;
      }
      const rendered = title.length + SUFFIX_LEN;
      if (rendered > MAX) {
        addResult(false, `✗ ${rel}: title renders at ${rendered} chars (max ${MAX}): "${title}"`);
        violations++;
      }
    }
  }

  // Generated titles: sample real city/department data through lib/seo.ts.
  const seoSrc = fs.readFileSync(path.join(process.cwd(), 'lib/seo.ts'), 'utf-8');
  const hasBudget = /MAX_TITLE_TOTAL\s*=\s*60/.test(seoSrc);
  addResult(
    hasBudget,
    hasBudget ? '✓ lib/seo.ts MAX_TITLE_TOTAL is 60' : '✗ lib/seo.ts MAX_TITLE_TOTAL must be 60'
  );
  const neverTruncates = !/name\.substring/.test(seoSrc);
  addResult(
    neverTruncates,
    neverTruncates
      ? '✓ safeTitleFit never truncates a city name'
      : '✗ safeTitleFit still truncates the city name with "…"'
  );

  if (violations === 0) {
    addResult(true, `✓ ${checked} static page titles within ${MAX} chars, no brand duplication`);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 23 (P2.3): noindex pages must still follow
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkNoNofollow() {
  log('\n🔓 Checking robots meta never emits nofollow...', colors.blue);

  const seoSrc = fs.readFileSync(path.join(process.cwd(), 'lib/seo.ts'), 'utf-8');
  const hasNofollow = /follow:\s*false/.test(seoSrc);
  addResult(
    !hasNofollow,
    hasNofollow
      ? '✗ lib/seo.ts emits follow: false — noindex pages must still pass link equity'
      : '✓ lib/seo.ts never emits follow: false'
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 24 (P2.4): one business entity, one FAQPage, no conflicting @id
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkStructuredDataEntities() {
  log('\n🧩 Checking structured data entities...', colors.blue);

  const sdSrc = fs.readFileSync(path.join(process.cwd(), 'lib/structured-data.ts'), 'utf-8');

  // Only the layout may define the business entity; page-level schemas must
  // reference it, not redefine it with different data.
  const businessDefinitions = (sdSrc.match(/'@id':\s*BUSINESS_ID,\s*\n\s*name:/g) || []).length;
  addResult(
    businessDefinitions === 0,
    businessDefinitions === 0
      ? '✓ lib/structured-data.ts defines no competing business entity (references only)'
      : `✗ lib/structured-data.ts redefines the #business entity ${businessDefinitions}× with page-specific data`
  );

  // Page-level city/department/region schemas should be Service nodes.
  const usesService = /'@type':\s*'Service'/.test(sdSrc);
  addResult(
    usesService,
    usesService
      ? '✓ Location pages emit Service nodes'
      : '✗ Location pages must emit Service (not LocalBusiness) nodes'
  );

  // No fabricated ratings anywhere in schema.
  const schemaSrc = fs.readFileSync(path.join(process.cwd(), 'lib/schema.ts'), 'utf-8');
  const hasRating = /aggregateRating|ratingValue|reviewCount/.test(sdSrc + schemaSrc);
  addResult(
    !hasRating,
    hasRating
      ? '✗ aggregateRating/review found in schema — only real, verifiable reviews are allowed'
      : '✓ No aggregateRating/review in schema'
  );

  // City pages must emit exactly one FAQPage.
  for (const service of ['epaviste', 'rachat-voiture']) {
    const file = path.join(process.cwd(), `app/${service}/[department]/[city]/page.tsx`);
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const mergesFaq = content.includes('mergeFaqPages') || content.includes('buildFaqPage');
    addResult(
      mergesFaq,
      mergesFaq
        ? `✓ ${service} city page emits a single merged FAQPage`
        : `✗ ${service} city page can emit more than one FAQPage block`
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 25 (P2.5): the root layout must not set a canonical
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkRootLayoutHead() {
  log('\n🧭 Checking root layout head hygiene...', colors.blue);

  const content = fs.readFileSync(path.join(process.cwd(), 'app/layout.tsx'), 'utf-8');

  const hasCanonical = /alternates:\s*\{[\s\S]{0,300}?canonical:/.test(content);
  addResult(
    !hasCanonical,
    hasCanonical
      ? '✗ app/layout.tsx sets alternates.canonical — pages that forget their own canonical silently point at the homepage'
      : '✓ app/layout.tsx sets no root canonical'
  );

  const hasHreflang = /languages:\s*\{/.test(content);
  addResult(
    !hasHreflang,
    hasHreflang
      ? '✗ app/layout.tsx declares alternates.languages — the site is FR-only, no hreflang needed'
      : '✓ app/layout.tsx declares no hreflang'
  );

  const bingTags = (content.match(/msvalidate\.01/g) || []).length;
  addResult(
    bingTags <= 1,
    bingTags <= 1
      ? '✓ Bing verification tag emitted once'
      : `✗ app/layout.tsx emits msvalidate.01 ${bingTags}× (duplicate meta tag)`
  );

  for (const junk of ['revisit-after', 'ICBM', 'geo.region', 'geo.placename']) {
    if (content.includes(junk)) {
      addResult(false, `✗ app/layout.tsx still emits the ignored meta "${junk}"`, 'warning');
    }
  }
  const hasKeywords = /^\s*keywords:\s*\[/m.test(content);
  addResult(
    !hasKeywords,
    hasKeywords
      ? '✗ app/layout.tsx still declares a keywords meta (ignored by Google)'
      : '✓ No keywords meta in the root layout'
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 26 (P3.1): no oversized asset in public/
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkPublicAssetWeight() {
  log('\n🖼️  Checking public/ asset weight...', colors.blue);

  const MAX_BYTES = 300 * 1024;
  const heavy: string[] = [];
  const IMAGE = /\.(png|jpe?g|gif|webp|avif|bmp|tiff?)$/i;

  // Scan every TRACKED image, not just public/: 1.4 MB copies of logo.png and
  // logo_name.png sat unreferenced in the repo root, invisible to a public/-only
  // check, because Next only ever serves the public/ copies.
  let tracked: string[] = [];
  try {
    tracked = execSync('git ls-files -z', { encoding: 'utf-8', maxBuffer: 32 * 1024 * 1024 })
      .split('\0')
      .filter(Boolean);
  } catch {
    // Not a git checkout — fall back to walking public/.
    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else tracked.push(path.relative(process.cwd(), full));
      }
    };
    walk(path.join(process.cwd(), 'public'));
  }

  // Only images the BROWSER can download: everything under public/, plus the
  // App Router icon file conventions. inspiration/ holds design references that
  // are never served, so their weight is not a site problem.
  const isServed = (rel: string) =>
    rel.startsWith('public/') ||
    /^app\/(icon|apple-icon|opengraph-image|twitter-image|favicon)[^/]*$/.test(rel);

  for (const rel of tracked) {
    if (!IMAGE.test(rel) || !isServed(rel)) continue;
    const full = path.join(process.cwd(), rel);
    if (!fs.existsSync(full)) continue;
    const size = fs.statSync(full).size;
    if (size > MAX_BYTES) heavy.push(`${rel} (${Math.round(size / 1024)} KB)`);
  }

  if (heavy.length === 0) {
    addResult(true, `✓ No served image over ${MAX_BYTES / 1024} KB (public/ + app icons)`);
  } else {
    heavy.forEach(f => addResult(false, `✗ Oversized image: ${f}`));
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECK 27 (P4.3): WhatsApp URLs must never contain wa.me/+
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkWhatsAppUrls() {
  log('\n💬 Checking WhatsApp URLs...', colors.blue);

  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
        walk(full);
      } else if (/\.(ts|tsx)$/.test(entry.name)) {
        // The helper itself documents the invalid form it exists to prevent.
        if (full.endsWith(`lib${path.sep}whatsapp.ts`)) continue;
        const content = fs.readFileSync(full, 'utf-8');
        // A literal wa.me/+ or a template that interpolates a +-prefixed number.
        if (/wa\.me\/\+/.test(content)) {
          offenders.push(`${path.relative(process.cwd(), full)} (wa.me/+)`);
        } else if (/wa\.me\//.test(content)) {
          offenders.push(`${path.relative(process.cwd(), full)} (hand-built wa.me URL — use whatsappUrl())`);
        }
      }
    }
  };
  ['app', 'components', 'lib', 'data'].forEach(d => walk(path.join(process.cwd(), d)));

  // The single helper must be the only place a wa.me URL is built by hand.
  const helperExists = fs.existsSync(path.join(process.cwd(), 'lib/whatsapp.ts'));
  addResult(
    helperExists,
    helperExists
      ? '✓ lib/whatsapp.ts helper exists'
      : '✗ Missing lib/whatsapp.ts — all WhatsApp URLs must go through one helper'
  );

  if (offenders.length === 0) {
    addResult(true, '✓ No wa.me/+ URLs (the + is invalid for wa.me)');
  } else {
    offenders.forEach(f => addResult(false, `✗ Invalid WhatsApp URL (wa.me/+) in ${f}`));
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
    checkIdfHubs();
    checkIdfContentQuality();     // P3.2
    checkSitemapPruning();
    checkDomainRedirect();
    // ── Audit remediation guardrails (see SEO-REMEDIATION-REPORT.md) ──
    checkCityResolutionGuard();   // P1.1
    checkHardcodedLinks();        // P1.2
    checkRobotsRules();           // P1.3
    checkSitemapIntegrity();      // P1.4
    checkTitleBudget();           // P2.1
    checkNoNofollow();            // P2.3
    checkStructuredDataEntities();// P2.4
    checkRootLayoutHead();        // P2.5
    checkPublicAssetWeight();     // P3.1
    checkWhatsAppUrls();          // P4.3
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
