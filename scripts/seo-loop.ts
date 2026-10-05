/**
 * seo-loop.ts — the Search Console loop (S3.1.b): import → report → top 20.
 *
 *   npm run seo:loop                  # CSV: latest seo-audit/gsc/<date>/
 *   npm run seo:loop -- --api         # API (GSC_SERVICE_ACCOUNT_JSON + GSC_SITE_URL)
 *
 * API mode is chosen automatically when both env vars are set (CI). Also
 * writes seo-audit/gsc-loop-issue.md, the body of the monthly GitHub issue
 * "SEO loop <YYYY-MM>" opened/updated by .github/workflows/seo-monitor.yml.
 */

import * as fs from 'fs';
import * as path from 'path';
import { runImport } from './gsc-import';
import { runStrikingDistance } from './striking-distance';
import { pct } from './gsc-lib';

const ISSUE_MD = path.join(process.cwd(), 'seo-audit', 'gsc-loop-issue.md');
const CTR_TEST = path.join(process.cwd(), 'seo-audit', 'ctr-test.json');

interface CtrTest {
  startedAt: string;
  readAfter: string;
  cohorts: Record<string, string[]>;
}

/** Reads the running CTR test (S3.2) against the snapshot, when one exists. */
function ctrTestSummary(pages: Array<{ path: string; clicks: number; impressions: number; position: number }>): string[] {
  if (!fs.existsSync(CTR_TEST)) return [];
  const test = JSON.parse(fs.readFileSync(CTR_TEST, 'utf8')) as CtrTest;
  const byPath = new Map(pages.map((p) => [p.path, p]));
  const lines = [`Test CTR démarré le ${test.startedAt}, lecture prévue à partir du ${test.readAfter} :`];
  Object.entries(test.cohorts).forEach(([name, paths]) => {
    const rows = paths.map((p) => byPath.get(p)).filter((r): r is NonNullable<typeof r> => Boolean(r));
    const impr = rows.reduce((s, r) => s + r.impressions, 0);
    const clicks = rows.reduce((s, r) => s + r.clicks, 0);
    lines.push(`- **${name}** : ${rows.length}/${paths.length} pages présentes, ${impr} impr., ${clicks} clics, CTR ${pct(impr ? clicks / impr : 0)}`);
  });
  return lines;
}

async function main() {
  const argv = process.argv.slice(2);
  const api = argv.includes('--api') || Boolean(process.env.GSC_SERVICE_ACCOUNT_JSON && process.env.GSC_SITE_URL);
  const snapshot = await runImport(api ? [...argv.filter((a) => a !== '--api'), '--api'] : argv);
  const report = await runStrikingDistance(argv, snapshot);

  const body = [
    `Import Search Console **${snapshot.source.toUpperCase()} ${snapshot.date}** (${snapshot.period}).`,
    '',
    ...snapshot.warnings.map((w) => `> ${w}`),
    '',
    `T1 ${report.t1.length} · T2 ${report.t2.length} · T3 ${report.t3.length} · cannibalisation ${report.cannibalisation.length} · baisses ${report.decliners.length} (vs ${report.previous ?? '—'})`,
    '',
    '### Top 20 actions',
    '',
    ...report.actions.slice(0, 20).map((a, i) => `${i + 1}. **${a.kind}** \`${a.target}\` — ${a.action}`),
    '',
    ...ctrTestSummary(snapshot.pages),
    '',
    'Rapport complet : `seo-audit/striking-distance.md` (artefact du run).',
  ].join('\n');
  fs.writeFileSync(ISSUE_MD, body);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
