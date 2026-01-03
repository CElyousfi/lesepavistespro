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
  
  // Extract title strings and check lengths
  const titleMatches = content.match(/title:\s*`([^`]+)`/g);
  let longTitles = 0;
  
  if (titleMatches) {
    titleMatches.forEach(match => {
      const title = match.replace(/title:\s*`/, '').replace(/`$/, '');
      // Remove template variables for length estimation
      const estimatedLength = title.replace(/\$\{[^}]+\}/g, '').length + 20; // Add buffer for variables
      
      if (estimatedLength > 65) {
        longTitles++;
      }
    });
  }
  
  if (longTitles === 0) {
    addResult(true, '✓ All titles within 65 character limit', 'warning');
  } else {
    addResult(false, `⚠ ${longTitles} titles may exceed 65 characters`, 'warning');
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
  
  // Check that only Île-de-France departments are present
  const validDepts = ['75', '77', '78', '91', '92', '93', '94', '95'];
  const hasFranceWide = content.includes('France entière') || content.includes('toute la France');
  
  if (!hasFranceWide) {
    addResult(true, '✓ No nationwide coverage claims');
  } else {
    addResult(false, '✗ WARNING: Nationwide coverage detected');
  }
  
  // Count departments
  const deptCount = (content.match(/code:\s*["'](\d{2,3})["']/g) || []).length;
  
  if (deptCount === 8) {
    addResult(true, `✓ Exactly 8 departments (Île-de-France only)`);
  } else {
    addResult(false, `⚠ Found ${deptCount} departments (expected 8)`, 'warning');
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
  if (content.includes('09 79 04 94 86')) {
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
  
  // Check urgent intent signal
  if (content.includes('Intervention urgente') || content.includes('urgente aujourd\'hui')) {
    addResult(true, '✓ Urgent intent signal present');
  } else {
    addResult(false, '✗ CRITICAL: Urgent intent signal removed');
  }
  
  // Check non-urgent intent signal
  if (content.includes('non urgente') || content.includes('Demande non urgente')) {
    addResult(true, '✓ Non-urgent intent signal present');
  } else {
    addResult(false, '⚠ Non-urgent intent signal missing', 'warning');
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
  
  if (layoutContent.includes('schema-organization') && layoutContent.includes('schema-website')) {
    addResult(true, '✓ Brand schemas injected in layout');
  } else {
    addResult(false, '✗ CRITICAL: Brand schemas not injected in layout');
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
    checkInternalLinking();
    checkGeographicScope();
    checkSemanticContent();
    checkFAQContent();
    checkTrustSignals();
    checkCTAIntegrity();
    checkIntentSignals();
    checkBrandSchema();
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
