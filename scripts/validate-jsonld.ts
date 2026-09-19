/**
 * validate-jsonld.ts — structural validation of the JSON-LD emitted by a set
 * of pages, along the lines of what Google's Rich Results Test enforces:
 *   - every block parses, every node has @context + @type;
 *   - required properties per type (FAQPage, BreadcrumbList, Service,
 *     AutomotiveBusiness, Organization, WebSite, WebPage, Article);
 *   - every `{ "@id": … }` reference resolves to a node defined on the page;
 *   - an @id is defined at most once per page; no null/empty/undefined values;
 *   - at most one FAQPage and one business node per page.
 *
 * Usage: npx tsx scripts/validate-jsonld.ts [baseUrl] [path ...]
 */
import * as cheerio from 'cheerio';

const argv = process.argv.slice(2);
const BASE = (argv.find(a => a.startsWith('http')) || 'http://localhost:3210').replace(/\/+$/, '');
const PATHS = argv.filter(a => a.startsWith('/'));
const DEFAULT_PATHS = ['/', '/epaviste/ile-de-france', '/epaviste/paris-75', '/rachat-voiture/hauts-de-seine-92/nanterre', '/blog/voiture-en-fourriere-paris-que-faire'];

type Node = Record<string, unknown>;
const REQUIRED: Record<string, string[]> = {
  FAQPage: ['mainEntity'],
  Question: ['name', 'acceptedAnswer'],
  Answer: ['text'],
  BreadcrumbList: ['itemListElement'],
  ListItem: ['position', 'name', 'item'],
  Service: ['name', 'serviceType', 'provider', 'areaServed'],
  AutomotiveBusiness: ['name', 'telephone', 'url', 'address'],
  Organization: ['name', 'url', 'logo'],
  WebSite: ['name', 'url'],
  WebPage: ['url'],
  Article: ['headline', 'datePublished', 'author', 'publisher', 'image'],
  ContactPoint: ['telephone', 'contactType'],
  PostalAddress: ['addressCountry'],
  Offer: [],
  ImageObject: ['url'],
};

function isRef(v: unknown): v is { '@id': string } {
  return !!v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v as object).length === 1 && '@id' in (v as object);
}

function walk(node: unknown, path: string, ctx: { defined: Map<string, number>; refs: string[]; errors: string[]; types: string[] }) {
  if (Array.isArray(node)) { node.forEach((n, i) => walk(n, `${path}[${i}]`, ctx)); return; }
  if (!node || typeof node !== 'object') return;
  const n = node as Node;
  if (isRef(n)) { ctx.refs.push(n['@id']); return; }
  const type = n['@type'];
  if (typeof type === 'string') {
    ctx.types.push(type);
    // Google only enforces required properties on the entity a page is
    // about; nested minimal nodes (an OfferCatalog item, a mainEntityOfPage
    // reference) are legitimate. Enforce on root nodes and on FAQ/breadcrumb
    // children, which rich results do validate.
    const root = !path.includes('.');
    const req = REQUIRED[type];
    const enforced = root || ['Question', 'Answer', 'ListItem'].includes(type);
    if (req && enforced) for (const k of req) if (n[k] === undefined) ctx.errors.push(`${path} (${type}) missing "${k}"`);
  } else if (Array.isArray(type)) {
    type.forEach(t => ctx.types.push(String(t)));
  } else if (path.split('.').length <= 1) {
    ctx.errors.push(`${path} has no @type`);
  }
  if (typeof n['@id'] === 'string' && Object.keys(n).length > 1) ctx.defined.set(n['@id'], (ctx.defined.get(n['@id']) || 0) + 1);
  for (const [k, v] of Object.entries(n)) {
    if (v === null || v === undefined || v === '' || v === 'undefined' || v === 'null') ctx.errors.push(`${path}.${k} is empty/undefined`);
    if (typeof v === 'string' && /undefined|NaN|\[object Object\]/.test(v)) ctx.errors.push(`${path}.${k} contains "${v.slice(0, 40)}"`);
    walk(v, `${path}.${k}`, ctx);
  }
}

async function validate(path: string) {
  const html = await (await fetch(BASE + path)).text();
  const $ = cheerio.load(html);
  const ctx = { defined: new Map<string, number>(), refs: [] as string[], errors: [] as string[], types: [] as string[] };
  let blocks = 0;
  $('script[type="application/ld+json"]').each((i, el) => {
    blocks++;
    const raw = $(el).text();
    let data: unknown;
    try { data = JSON.parse(raw); } catch (e) { ctx.errors.push(`block ${i}: JSON parse error ${(e as Error).message}`); return; }
    const arr = Array.isArray(data) ? data : [data];
    arr.forEach((node, j) => {
      const n = node as Node;
      if (!n['@context']) ctx.errors.push(`block ${i}[${j}] missing @context`);
      walk(node, `block${i}[${j}]`, ctx);
    });
  });
  for (const [id, count] of ctx.defined) if (count > 1) ctx.errors.push(`@id ${id} defined ${count}×`);
  for (const ref of ctx.refs) if (!ctx.defined.has(ref)) ctx.errors.push(`reference ${ref} is not defined on the page`);
  const faq = ctx.types.filter(t => t === 'FAQPage').length;
  const biz = ctx.types.filter(t => t === 'AutomotiveBusiness' || t === 'LocalBusiness').length;
  if (faq > 1) ctx.errors.push(`${faq} FAQPage nodes`);
  if (biz > 1) ctx.errors.push(`${biz} business nodes`);
  const summary = Array.from(new Set(ctx.types)).join(', ');
  console.log(`${ctx.errors.length === 0 ? '✅' : '❌'} ${path} — ${blocks} blocks, types: ${summary}`);
  ctx.errors.forEach(e => console.log(`     • ${e}`));
  return ctx.errors.length;
}

(async () => {
  let total = 0;
  for (const p of PATHS.length ? PATHS : DEFAULT_PATHS) total += await validate(p);
  console.log(total === 0 ? '\nJSON-LD: 0 errors' : `\nJSON-LD: ${total} errors`);
  process.exit(total === 0 ? 0 : 1);
})();
