#!/usr/bin/env ts-node
/**
 * SEARCH DEMAND RADAR - Silent Intelligence System
 * Detects opportunity before competitors
 * Run monthly: npx ts-node scripts/search-demand-radar.ts
 * 
 * DOES NOT:
 * - Affect frontend
 * - Generate pages
 * - Change existing structure
 * 
 * DOES:
 * - Analyze GSC data patterns
 * - Identify optimization opportunities
 * - Output actionable intelligence
 */

import * as fs from 'fs';
import * as path from 'path';

interface QueryData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface OpportunitySignal {
  type: 'ctr_opportunity' | 'content_reinforcement' | 'internal_linking' | 'rising_city';
  priority: 'high' | 'medium' | 'low';
  target: string;
  reason: string;
  metrics: {
    impressions?: number;
    ctr?: number;
    position?: number;
    growth?: string;
  };
  action: string;
}

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIGNAL 1: CTR Opportunity Detection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function detectCTROpportunities(queries: QueryData[]): OpportunitySignal[] {
  const opportunities: OpportunitySignal[] = [];
  
  queries.forEach(q => {
    // High impressions (>50), good position (<20), but low CTR (<2%)
    if (q.impressions > 50 && q.position < 20 && q.ctr < 2) {
      opportunities.push({
        type: 'ctr_opportunity',
        priority: 'high',
        target: q.query,
        reason: `Position ${q.position.toFixed(1)} but only ${q.ctr.toFixed(2)}% CTR`,
        metrics: {
          impressions: q.impressions,
          ctr: q.ctr,
          position: q.position,
        },
        action: 'Rewrite title/description with urgency + trust signals',
      });
    }
    
    // Medium impressions (20-50), top 10, but weak CTR (<3%)
    if (q.impressions >= 20 && q.impressions <= 50 && q.position <= 10 && q.ctr < 3) {
      opportunities.push({
        type: 'ctr_opportunity',
        priority: 'medium',
        target: q.query,
        reason: `Top 10 position but CTR below 3%`,
        metrics: {
          impressions: q.impressions,
          ctr: q.ctr,
          position: q.position,
        },
        action: 'Add postal code or department code to title',
      });
    }
  });
  
  return opportunities;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIGNAL 2: Content Reinforcement Candidates
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function detectContentOpportunities(queries: QueryData[]): OpportunitySignal[] {
  const opportunities: OpportunitySignal[] = [];
  
  queries.forEach(q => {
    // Position 11-30 with decent impressions (>30) = content depth needed
    if (q.position > 10 && q.position <= 30 && q.impressions > 30) {
      opportunities.push({
        type: 'content_reinforcement',
        priority: 'high',
        target: q.query,
        reason: `Position ${q.position.toFixed(1)} - needs semantic depth`,
        metrics: {
          impressions: q.impressions,
          position: q.position,
        },
        action: 'Add semantic variations + administrative vocabulary to target page',
      });
    }
    
    // Position 31-50 with growing impressions (>20) = rising opportunity
    if (q.position > 30 && q.position <= 50 && q.impressions > 20) {
      opportunities.push({
        type: 'content_reinforcement',
        priority: 'medium',
        target: q.query,
        reason: `Position ${q.position.toFixed(1)} - early mover advantage`,
        metrics: {
          impressions: q.impressions,
          position: q.position,
        },
        action: 'Create FAQ entry or add local data for this query',
      });
    }
  });
  
  return opportunities;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIGNAL 3: Internal Linking Boost Targets
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function detectLinkingOpportunities(queries: QueryData[]): OpportunitySignal[] {
  const opportunities: OpportunitySignal[] = [];
  
  queries.forEach(q => {
    // Position 15-40 with high impressions (>50) = needs link juice
    if (q.position >= 15 && q.position <= 40 && q.impressions > 50) {
      opportunities.push({
        type: 'internal_linking',
        priority: 'high',
        target: q.query,
        reason: `High impressions but position ${q.position.toFixed(1)}`,
        metrics: {
          impressions: q.impressions,
          position: q.position,
        },
        action: 'Add internal links from related high-authority pages',
      });
    }
  });
  
  return opportunities;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIGNAL 4: Rising City Detection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function detectRisingCities(queries: QueryData[]): OpportunitySignal[] {
  const opportunities: OpportunitySignal[] = [];
  
  // Extract city-specific queries
  const cityQueries = queries.filter(q => 
    q.query.includes('epaviste') && 
    !q.query.match(/\b(75|77|78|91|92|93|94|95)\b/) && // Not just department code
    q.query.split(' ').length >= 2 // Has city name
  );
  
  cityQueries.forEach(q => {
    // New cities gaining traction (>15 impressions, any position)
    if (q.impressions >= 15 && q.impressions < 50) {
      opportunities.push({
        type: 'rising_city',
        priority: 'medium',
        target: q.query,
        reason: `Emerging demand: ${q.impressions} impressions`,
        metrics: {
          impressions: q.impressions,
          position: q.position,
        },
        action: 'Consider adding local data (fourrière, parking) for this city',
      });
    }
    
    // High-volume cities without optimization (>50 impressions, position >40)
    if (q.impressions > 50 && q.position > 40) {
      opportunities.push({
        type: 'rising_city',
        priority: 'high',
        target: q.query,
        reason: `High demand (${q.impressions} imp) but weak position`,
        metrics: {
          impressions: q.impressions,
          position: q.position,
        },
        action: 'URGENT: Add comprehensive local data + optimize title',
      });
    }
  });
  
  return opportunities;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Parse GSC CSV Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function parseGSCData(csvPath: string): QueryData[] {
  try {
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n');
    const queries: QueryData[] = [];
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const parts = line.split(',');
      if (parts.length < 5) continue;
      
      const query = parts[0].trim();
      const clicks = parseInt(parts[1]) || 0;
      const impressions = parseInt(parts[2]) || 0;
      const ctrStr = parts[3].replace('%', '').trim();
      const ctr = parseFloat(ctrStr) || 0;
      const position = parseFloat(parts[4]) || 999;
      
      queries.push({ query, clicks, impressions, ctr, position });
    }
    
    return queries;
  } catch (error) {
    log(`⚠️  Could not read GSC data: ${error}`, colors.yellow);
    return [];
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Generate Intelligence Report
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function generateReport(opportunities: OpportunitySignal[]) {
  log('\n╔═══════════════════════════════════════════════════════════════╗', colors.cyan);
  log('║          SEARCH DEMAND RADAR - INTELLIGENCE REPORT            ║', colors.cyan);
  log('╚═══════════════════════════════════════════════════════════════╝', colors.cyan);
  
  // Sort by priority
  const high = opportunities.filter(o => o.priority === 'high');
  const medium = opportunities.filter(o => o.priority === 'medium');
  const low = opportunities.filter(o => o.priority === 'low');
  
  log(`\n📊 SUMMARY: ${opportunities.length} opportunities detected`, colors.blue);
  log(`   🔴 High Priority: ${high.length}`, colors.red);
  log(`   🟡 Medium Priority: ${medium.length}`, colors.yellow);
  log(`   🟢 Low Priority: ${low.length}`, colors.green);
  
  // High Priority Opportunities
  if (high.length > 0) {
    log('\n' + '═'.repeat(65), colors.red);
    log('🔴 HIGH PRIORITY OPPORTUNITIES (Act within 7 days)', colors.red);
    log('═'.repeat(65), colors.red);
    
    high.forEach((opp, idx) => {
      log(`\n${idx + 1}. [${opp.type.toUpperCase()}] ${opp.target}`, colors.red);
      log(`   Reason: ${opp.reason}`, colors.reset);
      if (opp.metrics.impressions) log(`   Impressions: ${opp.metrics.impressions}`, colors.reset);
      if (opp.metrics.ctr) log(`   CTR: ${opp.metrics.ctr.toFixed(2)}%`, colors.reset);
      if (opp.metrics.position) log(`   Position: ${opp.metrics.position.toFixed(1)}`, colors.reset);
      log(`   ➜ Action: ${opp.action}`, colors.green);
    });
  }
  
  // Medium Priority Opportunities
  if (medium.length > 0) {
    log('\n' + '═'.repeat(65), colors.yellow);
    log('🟡 MEDIUM PRIORITY OPPORTUNITIES (Act within 30 days)', colors.yellow);
    log('═'.repeat(65), colors.yellow);
    
    medium.slice(0, 10).forEach((opp, idx) => {
      log(`\n${idx + 1}. [${opp.type.toUpperCase()}] ${opp.target}`, colors.yellow);
      log(`   Reason: ${opp.reason}`, colors.reset);
      if (opp.metrics.impressions) log(`   Impressions: ${opp.metrics.impressions}`, colors.reset);
      if (opp.metrics.position) log(`   Position: ${opp.metrics.position.toFixed(1)}`, colors.reset);
      log(`   ➜ Action: ${opp.action}`, colors.green);
    });
    
    if (medium.length > 10) {
      log(`\n   ... and ${medium.length - 10} more medium priority opportunities`, colors.yellow);
    }
  }
  
  // Export to JSON for programmatic access
  const reportPath = path.join(process.cwd(), 'scripts/radar-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    total: opportunities.length,
    high: high.length,
    medium: medium.length,
    low: low.length,
    opportunities: opportunities,
  }, null, 2));
  
  log(`\n📄 Full report exported to: scripts/radar-report.json`, colors.blue);
  log('\n' + '═'.repeat(65), colors.cyan);
  log('NEXT STEPS', colors.cyan);
  log('═'.repeat(65), colors.cyan);
  log('1. Review high priority opportunities first', colors.reset);
  log('2. Implement quick wins (CTR opportunities)', colors.reset);
  log('3. Plan content reinforcement for medium priority', colors.reset);
  log('4. Monitor rising cities for local data expansion', colors.reset);
  log('5. Re-run this script monthly to detect new signals\n', colors.reset);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Execution
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function runRadar() {
  log('\n🔍 Initializing Search Demand Radar...', colors.cyan);
  
  // Look for GSC data in SEO DATA folder
  const gscPath = path.join(process.cwd(), 'SEO DATA/Requêtes.csv');
  
  if (!fs.existsSync(gscPath)) {
    log('\n⚠️  GSC data not found at: SEO DATA/Requêtes.csv', colors.yellow);
    log('   Please export Search Console query data and place it there.', colors.yellow);
    log('   Expected format: Query, Clicks, Impressions, CTR, Position\n', colors.yellow);
    process.exit(1);
  }
  
  log('📥 Loading GSC data...', colors.blue);
  const queries = parseGSCData(gscPath);
  
  if (queries.length === 0) {
    log('❌ No query data found or invalid format\n', colors.red);
    process.exit(1);
  }
  
  log(`✅ Loaded ${queries.length} queries`, colors.green);
  log('🔬 Analyzing patterns...', colors.blue);
  
  // Run all detection algorithms
  const ctrOpps = detectCTROpportunities(queries);
  const contentOpps = detectContentOpportunities(queries);
  const linkingOpps = detectLinkingOpportunities(queries);
  const cityOpps = detectRisingCities(queries);
  
  const allOpportunities = [
    ...ctrOpps,
    ...contentOpps,
    ...linkingOpps,
    ...cityOpps,
  ];
  
  // Generate report
  generateReport(allOpportunities);
}

// Execute
runRadar();
