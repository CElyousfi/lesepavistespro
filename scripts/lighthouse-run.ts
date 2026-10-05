/**
 * lighthouse-run.ts — mobile Core Web Vitals for the pages that matter (P3.2).
 *
 * Usage:
 *   npx tsx scripts/lighthouse-run.ts [baseUrl] [--label=before|after]
 *
 * Writes seo-audit/lighthouse-<label>.json and prints a table of
 * Performance / LCP / CLS / TBT / FCP / Speed Index per URL.
 * Mobile emulation is Lighthouse's default (no --preset needed).
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

/** S3.5: marks our runs so lib/bot-guard.ts drops them from Vercel Analytics / GA4. */
const MONITOR_LH_UA = 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse LesEpavistesPro-SEO-Monitor/1.0';

const argv = process.argv.slice(2);
const BASE = (argv.find((a) => !a.startsWith('--')) || 'http://localhost:3210').replace(/\/+$/, '');
const LABEL = (argv.find((a) => a.startsWith('--label=')) || '--label=run').split('=')[1];

const PATHS = [
  '/',
  '/epaviste',
  '/epaviste/ile-de-france',
  '/epaviste/paris-75',
  '/epaviste/hauts-de-seine-92/nanterre',
  '/rachat-voiture/hauts-de-seine-92/nanterre',
  '/blog/certificat-destruction-vhu-obligatoire',
  // S3.6: one centre VHU page and one data guide
  '/centre-vhu-agree/val-de-marne-94',
  '/guides/fourrieres-ile-de-france',
];

interface Row {
  path: string;
  performance: number | null;
  lcp: string;
  cls: string;
  tbt: string;
  fcp: string;
  si: string;
  error?: string;
}

function run(url: string): Row['performance'] extends never ? never : Row {
  const out = path.join(os.tmpdir(), `lh-${Date.now()}.json`);
  try {
    execFileSync(
      'npx',
      [
        'lighthouse',
        url,
        '--only-categories=performance',
        '--quiet',
        '--output=json',
        `--output-path=${out}`,
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage',
        `--emulatedUserAgent=${MONITOR_LH_UA}`,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'], env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH || '/usr/bin/chromium' } }
    );
    const report = JSON.parse(fs.readFileSync(out, 'utf8'));
    fs.unlinkSync(out);
    const a = report.audits;
    return {
      path: new URL(url).pathname,
      performance: Math.round((report.categories.performance.score ?? 0) * 100),
      lcp: a['largest-contentful-paint'].displayValue,
      cls: a['cumulative-layout-shift'].displayValue,
      tbt: a['total-blocking-time'].displayValue,
      fcp: a['first-contentful-paint'].displayValue,
      si: a['speed-index'].displayValue,
    };
  } catch (e) {
    return {
      path: new URL(url).pathname,
      performance: null,
      lcp: '-',
      cls: '-',
      tbt: '-',
      fcp: '-',
      si: '-',
      error: (e as Error).message.split('\n')[0],
    };
  }
}

const rows: Row[] = [];
console.log(`\n🔦 Lighthouse (mobile) against ${BASE}\n`);
console.log(
  'perf'.padStart(5),
  'LCP'.padStart(9),
  'CLS'.padStart(6),
  'TBT'.padStart(9),
  'FCP'.padStart(9),
  'SI'.padStart(9),
  ' path'
);
for (const p of PATHS) {
  const row = run(`${BASE}${p}`);
  rows.push(row);
  console.log(
    String(row.performance ?? 'ERR').padStart(5),
    row.lcp.padStart(9),
    row.cls.padStart(6),
    row.tbt.padStart(9),
    row.fcp.padStart(9),
    row.si.padStart(9),
    ` ${row.path}`,
    row.error ? `  (${row.error})` : ''
  );
}

fs.mkdirSync(path.join(process.cwd(), 'seo-audit'), { recursive: true });
const file = path.join(process.cwd(), 'seo-audit', `lighthouse-${LABEL}.json`);
fs.writeFileSync(file, JSON.stringify({ baseUrl: BASE, label: LABEL, at: new Date().toISOString(), rows }, null, 2));
console.log(`\nWritten to ${path.relative(process.cwd(), file)}\n`);
