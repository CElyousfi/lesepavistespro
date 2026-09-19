/**
 * check-redirect-hops.ts — proof for P2.6
 *
 * Drives proxy.ts with non-canonical URL variants and asserts each reaches its
 * canonical form in AT MOST ONE hop. Guards against the two ways this breaks:
 * re-introducing a duplicate rule in next.config.ts (chains), and mutating
 * req.nextUrl instead of building a plain URL — NextURL.toString() re-appends a
 * trailing slash its own pathname setter reports as removed, which redirects a
 * trailing-slash URL to itself forever.
 */

import { NextRequest } from 'next/server';
import { proxy } from '../proxy';

/** [start URL, expected canonical URL] */
const CASES: Array<[string, string]> = [
  ['http://lesepavistespro.com/Epaviste/', 'https://www.lesepavistespro.fr/epaviste'],
  ['http://lesepavistespro.fr/epaviste', 'https://www.lesepavistespro.fr/epaviste'],
  ['https://lesepavistespro.fr/epaviste/', 'https://www.lesepavistespro.fr/epaviste'],
  ['https://www.lesepavistespro.fr/Epaviste', 'https://www.lesepavistespro.fr/epaviste'],
  ['https://www.lesepavistespro.fr/epaviste/paris-75/', 'https://www.lesepavistespro.fr/epaviste/paris-75'],
  // Already canonical — must not redirect at all.
  ['https://www.lesepavistespro.fr/', 'https://www.lesepavistespro.fr/'],
  ['https://www.lesepavistespro.fr/epaviste', 'https://www.lesepavistespro.fr/epaviste'],
];

const MAX_HOPS = 1;

export interface RedirectHopResult {
  passed: boolean;
  checked: number;
  worstHops: number;
  failures: string[];
}

export function checkRedirectHops(): RedirectHopResult {
  const failures: string[] = [];
  let worstHops = 0;

  for (const [start, expected] of CASES) {
    let url = start;
    let hops = 0;
    for (let i = 0; i <= MAX_HOPS + 1; i++) {
      const res = proxy(new NextRequest(new Request(url)));
      const location = res.headers.get('location');
      if (!location) break;
      hops++;
      url = location;
    }
    worstHops = Math.max(worstHops, hops);

    if (hops > MAX_HOPS) {
      failures.push(`${start} → ${hops} hops (max ${MAX_HOPS}) — redirect chain or loop`);
    } else if (url !== expected) {
      failures.push(`${start} → ${url}, expected ${expected}`);
    }
  }

  return { passed: failures.length === 0, checked: CASES.length, worstHops, failures };
}

if (process.argv[1] && process.argv[1].includes('check-redirect-hops')) {
  const result = checkRedirectHops();
  console.log(`\n🔀 Redirect hops: ${result.checked} variants, worst case ${result.worstHops} hop(s)`);
  if (result.passed) {
    console.log('✅ every variant canonicalises in a single hop\n');
    process.exit(0);
  }
  console.error(`❌ ${result.failures.length} failures:`);
  result.failures.forEach((f) => console.error(`   - ${f}`));
  process.exit(1);
}
