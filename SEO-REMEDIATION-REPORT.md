# SEO Remediation Report — lesepavistespro.fr

**Branch:** `seo/audit-remediation` (19 commits, branched from `main` @ `9ca6e71`)
**Date:** 10 September 2026
**Scope:** technical SEO remediation, Phases 0–6 of the audit brief.

No URL or slug was changed. All user-facing text is French. No business fact was
invented — everything that requires one is listed under [Owner TODOs](#3-owner-todos).

---

## 1. Before / after

Both columns come from the **same crawler at the same version** (`npm run seo-crawl`),
run against a local production build: `main` on port 3211 for *before*,
`seo/audit-remediation` on 3210 for *after*. 500 URLs sampled evenly across all
nine child sitemaps, plus every internal link target verified.

### Semrush-style issue counts

| | Before | After |
|---|---:|---:|
| **Errors** (instances) | **288** | **0** |
| **Warnings** (instances) | **137** | **0** |
| **Notices** (instances) | **1,938** | **123** |

The 123 remaining notices are all one thing: department pages outside the
indexed geography preview 20 of their (noindex) city pages. That is the
geo-targeting strategy working as designed, and those links now carry
`follow: true`, so equity flows through them.

A second pass at 899 URLs (`--sample-per-sitemap=320`) reproduces the same
result: **0 errors, 0 warnings.**

### Per-metric

| Metric | Before | After | Task |
|---|---:|---:|---|
| Broken internal links (4xx target) | 1 | **0** | P1.2 |
| Sitemap URLs canonicalising elsewhere | 18 | **0** | P1.1 / P1.4 |
| Sitemap URLs that are `noindex` | 11 | **0** | P1.4 |
| Sitemap URLs not returning 200 | 0 | 0 | P1.4 |
| Titles > 60 chars | 108 | **0** | P2.1 |
| Titles > 70 chars | 13 | **0** | P2.1 |
| Duplicate titles (indexable) | 0 | 0 | P1.1 |
| Duplicate meta descriptions | 0 | 0 | — |
| Pages with conflicting JSON-LD `@id` | 248 | **0** | P2.4 |
| Pages with more than one `FAQPage` | 10 | **0** | P2.4 |
| Pages with more than one `LocalBusiness` | 248 | **0** | P2.4 |
| Total business-entity nodes / 499 pages | 766 | **499** (exactly one each) | P2.4 |
| JSON-LD parse errors | 0 | 0 | — |
| `noindex, nofollow` pages | 10 | **0** | P2.3 |
| `noindex` pages linked internally | 1,137 | **122** | P2.3 |
| Pages under 300 words | 2 | **0** | P4.1 |
| Missing / multiple H1 | 0 / 0 | 0 / 0 | — |
| Images without `alt` | 0 | 0 | — |
| Redirect chains (2+ hops) | 0 | 0 | P2.6 |
| Heaviest page (HTML) | **485 KB** `/epaviste/grand-est` | **253 KB** `/rachat-voiture/pas-de-calais-62` | P3.2 |
| Pages over 300 KB | 14 | **0** | P3.2 |

### Page weight by page type (median / max KB of HTML)

| Page type | Before | After |
|---|---|---|
| Homepage | 153 / 153 | 146 / 146 |
| Static pages | 74 / 237 | 95 / 235 (¹) |
| Region + department | 132 / **485** | 140 / **253** |
| City | 139 / 181 | **111 / 160** |

¹ Static pages grew on purpose: `/contact`, `/documents` and `/conformite-vhu`
were thin and gained real content (P4.1).

### Data-level fixes (whole dataset, not a sample)

| | Before | After |
|---|---:|---:|
| City slugs colliding across departments | 1,474 | 1,474 (data reality) |
| City rows resolving to the **wrong** department | **2,271** | **0** |
| … of which Île-de-France (×2 services) | **115 (230 URLs)** | **0** |
| Sitemap city URLs canonicalising elsewhere (per service) | **1,072** | **0** |
| … of those landing on a `noindex` page | **326** | **0** |
| Within-department duplicate slugs | 2 (Lyon ×9, Marseille ×16) | **0** |
| Any `(dept, city)` combination returning 200 | yes (`/epaviste/paris-75/lyon`) | **404** |
| City names without accents / hyphens | 17,915 | **0 changed → 369 unmatched** |
| `public/` image weight | **22 MB** | **1.5 MB** |
| `app/icon.png` (served every page load) | **1,383 KB** @1024² | **14 KB** @512² |
| `app/apple-icon.png` | **1,383 KB** @1024² | **2 KB** @180² |
| Unreachable duplicate images in repo root | 1.75 MB | **0** |
| ESLint | **166 errors, 24 warnings** | **0 errors, 0 warnings** |

Verified live on the production build:

```
/epaviste/seine-saint-denis-93/montreuil  → 200, self-canonical, index,follow
    <title>Épaviste Montreuil (93) – Gratuit | Les Épavistes Pro</title>
        (was: canonical → …/epaviste/eure-et-loir-28/montreuil)
/epaviste/hauts-de-seine-92/bagneux       → 200, self-canonical, index,follow
        (was: canonical → …/epaviste/allier-03/bagneux, a noindex page)
/epaviste/paris-75/lyon                   → 404   (was 200)
/rachat-voiture/paris-75/marseille        → 404   (was 200)
/epaviste/seine-saint-denis-93/saint-denis→ 404, and no longer linked from /
/epaviste/hauts-de-seine-92/asnieres-sur-seine
    <title>Épaviste Asnières-sur-Seine – Gratuit | Les Épavistes Pro</title>
        (was: "Épaviste Asnieres sur Seine")
```

### Redirect hops (P2.6)

Driven through `proxy.ts` by `npm run check-redirects`:

| Start | Hops | Lands on |
|---|---:|---|
| `http://lesepavistespro.com/Epaviste/` | **1** | `https://www.lesepavistespro.fr/epaviste` |
| `http://lesepavistespro.fr/epaviste` | **1** | `https://www.lesepavistespro.fr/epaviste` |
| `https://lesepavistespro.fr/epaviste/` | **1** | `https://www.lesepavistespro.fr/epaviste` |
| `https://www.lesepavistespro.fr/Epaviste` | **1** | `https://www.lesepavistespro.fr/epaviste` |
| `https://www.lesepavistespro.fr/epaviste/paris-75/` | **1** | `https://www.lesepavistespro.fr/epaviste/paris-75` |
| `https://www.lesepavistespro.fr/epaviste` | **0** | — already canonical |

> ⚠️ Verifying this uncovered a **redirect loop that also existed on `main`**:
> `NextURL.toString()` re-appends a trailing slash that its own `pathname`
> setter reports as removed, so the middleware redirected every trailing-slash
> URL to itself. It was masked by the duplicate `/:path+/` rule in
> `next.config.ts`, which P2.6 removed. `proxy.ts` now composes the target as a
> plain string. **Re-verify with `curl -sIL` on the deployed preview before
> promoting to production** — the local server skips canonicalisation for
> `localhost`, so this is proven by driving the proxy directly, not over HTTP.

### Lighthouse (mobile, local production build)

| URL | Perf before | Perf after | LCP before | LCP after | CLS | TBT after |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 91 | 90 | 3.3 s | 3.3 s | 0 | 150 ms |
| `/epaviste` | 91 | 91 | 3.3 s | 3.2 s | 0 | 160 ms |
| `/epaviste/ile-de-france` | 88 | 86 | 3.7 s | 3.4 s | 0 | 270 ms |
| `/epaviste/paris-75` | 88 | 90 | 3.6 s | 3.4 s | 0 | 130 ms |
| `/epaviste/hauts-de-seine-92/nanterre` | 89 | 87 | 3.5 s | 3.7 s | 0 | 170 ms |
| `/rachat-voiture/hauts-de-seine-92/nanterre` | 91 | 87 | 3.2 s | 3.7 s | 0 | 180 ms |
| `/blog/certificat-destruction-vhu-obligatoire` | 74 | 74 | 6.0 s | 6.0 s | 0 | 220 ms |

**Read this honestly: Lighthouse is unchanged, within ±4 points of run-to-run
noise.** That is expected and does not mean the performance work was wasted:

- Over localhost there is no network, so a 22 MB → 1.5 MB image reduction and a
  485 KB → 253 KB HTML reduction barely move a simulated-throttling score. They
  will show on real connections, and the crawler's HTML-size column is the
  reliable local proxy for them.
- On these pages the throttled LCP is dominated by **Google Analytics (171 KB)**
  and **two web fonts (87 KB)** — neither of which this work was allowed to
  change (GA4 is out of scope; the fonts are a design decision). See
  [Decisions needing your approval](#4-decisions-needing-your-approval).
- CLS is 0 on every page, before and after.

Reproduce with `npx tsx scripts/lighthouse-run.ts <baseUrl> --label=<name>`.

---

## 2. Commits by task ID

| Task | Commit | Summary |
|---|---|---|
| P0.1 | `9c784b5` | Reproducible local SEO audit crawler (`npm run seo-crawl`) |
| P1.1 | `c2b8ab2` | Resolve city by **department**, not by slug alone |
| P1.2 | `3bbc2a8` | Repair broken hardcoded internal city links |
| P1.3 | `bd9b28a` | robots.txt: unblock rendering resources, allow SemrushBot-SA |
| P1.4 | `a8ab021` | Sitemaps carry only 200 / self-canonical / indexable URLs |
| P6 | `f9e5ce5` | Audit-remediation guardrails in the prebuild QA check |
| P2.1 | `e9b87bc` | Titles within 60 chars, no brand duplication |
| P2.2 | `bbd5778` | Proper French orthography in city display names |
| P2.3–2.5 | `52f044f` | One business entity, one FAQPage, clean `<head>` |
| P2.6 | `1b8b1d7` | Single-hop canonicalisation, `middleware` → `proxy` (Next 16) |
| P3.1 | `669ac9c` | `public/` images 22 MB → 1 MB |
| P3.2 | `6a7cdd1` | Cut RSC payloads, de-orphan city pages |
| P4.3 | `72e2663` | Every WhatsApp URL through one helper |
| P4.1/4.3 | `038dd6c` | Thicken thin pages, link blog posts contextually |
| P4.2 | `bdd9841` | Measure templated-city-page similarity |
| P5 | `c491845` | Clear all ESLint errors, correct the README |
| P2.6 | `d4d37bf` | Build the canonical URL as a plain URL (redirect-loop fix) |
| P7 | `e53e671` | This report |
| P3.1 | *(follow-up)* | Shrink the served app icons; widen the weight guardrail |
| P3.2 | *(follow-up)* | Style the commune index from the parent; last 2 pages under 300 KB |

`npx tsc --noEmit` passes after every commit; `npm run build` (which runs
`npm run seo-check` via `prebuild`) passes at every phase boundary.

### What each phase actually changed

**P1.1 — the single highest-impact fix.** `getCityBySlug(citySlug)` ignored the
department and returned the first city in France with that slug. 1,474 slugs
exist in more than one department, so **2,271 city rows rendered a homonym from
another department and canonicalised away from themselves** — including 115
Île-de-France communes × 2 services = **230 IDF URLs**, the money pages. Montreuil
(93) canonicalised to Eure-et-Loir (28); Bagneux (92) to a *noindex* Allier (03)
page. And because resolution ignored the department, **any** combination returned
200: `/epaviste/paris-75/lyon`, `/rachat-voiture/paris-75/marseille` — an unbounded
duplicate URL space. Replaced with `getCityInDepartment(deptSlug, citySlug)`;
unknown combinations now 404. `scripts/check-city-resolution.ts` proves over all
34,923 cities that every `(dept, city)` resolves to itself, every sitemap URL is
self-canonical and indexable, and every homonym title is unique.

**P2.2 — city names.** Names came from the La Poste postal file, ASCII-flattened
and abbreviated (`Boissy St Leger`, `Asnieres sur Seine`, `Ste Genevieve des Bois`).
They flow into titles, H1s, descriptions, breadcrumbs and schema, while users
search *"épaviste Asnières-sur-Seine"*. `scripts/fix-city-display-names.ts`
rewrote **17,915** display names from the official INSEE register
(`geo.api.gouv.fr`), matching on department + postal code + normalised name, then
department + name, then unique postal code, then a unique prefix match.
**Slugs and postal codes were never touched**, so every indexed URL still works.
369 communes did not match and keep their old name — listed in
`seo-audit/unmatched-cities.txt`; they are mostly merged or renamed communes.
Paris/Lyon/Marseille arrondissements are skipped because the INSEE register only
knows "Paris", and matching would have flattened "Paris 10e" to "Paris".

**P2.4 — structured data.** An IDF city page carried *two* `LocalBusiness` nodes
sharing `@id …/#business` with different data (the layout's national entity and a
per-city "Les Épavistes Pro Nanterre" **with a Nanterre address**) plus *two*
`FAQPage` blocks. Now: one `AutomotiveBusiness` defined once in the layout; every
location page emits a `Service` node referencing it; `lib/faq.ts` builds exactly
one `FAQPage` per page from the questions that page actually renders.

> A side finding worth flagging: all page-level JSON-LD used
> `<Script strategy="beforeInteractive">`. Next's App Router streams `Script` tags
> through React, so **they were absent from the server-rendered HTML crawlers read
> first** — `/epaviste`, `/rachat-voiture`, `/faq`, `/zones`, `/contact`, `/blog`
> and `/documents` were shipping **zero** structured data. All converted to plain
> `<script>` tags.

**P3.2 — payloads and orphans.** Region pages serialised every city of every
department into the RSC payload to render `cities.length` (485 KB for Grand Est).
City pages serialised the whole department (up to 887 cities) to render 6 nearby
links. Both now receive only what they render. Separately, department pages
capped their city grid at 20 behind a client-side "Voir plus" button, so every
other city page in the department was **orphaned** — reachable from the sitemap
alone. Indexed departments now render a compact index of all their communes as
plain links in the HTML: `/epaviste/pas-de-calais-62` links all 887 in 301 KB
(a rich-card version of the same list measured 1,025 KB).

---

## 3. Owner TODOs

Facts only you can supply. Each is marked `TODO(owner)` in the code.

| # | What is needed | Where | Why it matters |
|---|---|---|---|
| 1 | **Real registered address** (street, postal code, locality) | `lib/schema.ts` → `getLocalBusinessSchema()`, `address` | The business entity currently asserts only `addressCountry: 'FR'`. A `LocalBusiness`/`AutomotiveBusiness` without a real address cannot win local pack results. **Do not invent one** — and do not put a per-city address back, which is what the previous code did. |
| 2 | **SIRET / legal entity number** | `app/mentions-legales/page.tsx`, `lib/seo-config.ts` (`legalName`) | Legally required in French mentions légales, and a trust signal. `seoConfig.legalName` currently says "Les Épavistes Pro SARL" — confirm or correct it. |
| 3 | **VHU agrément number and the partner centre's identity** | `lib/schema.ts` → `getOrganizationSchema()`, `identifier: 'PR9500003D'` | This number is already published on the site. Confirm it is current, that it belongs to your partner centre, and that you are entitled to display it. |
| 4 | **`foundingDate` inconsistency** | `lib/schema.ts` says `2023`; `lib/seo-config.ts` says `2020` | Two different founding years in structured data. Tell us the right one. |
| 5 | **A real reviews source** | nowhere yet — deliberately | No `aggregateRating` or `review` exists anywhere, and the QA check fails the build if one appears. Star ratings need a verifiable source (Google Business Profile, Trustpilot). Until then we ship none. |
| 6 | **Blog `updatedAt` dates** | `lib/blog-data.ts` | Posts are dated Oct–Dec 2024. `dateModified` falls back to the publication date. Set `updatedAt` **only when a post is genuinely revised** — never to fake freshness. |
| 7 | **`numberOfEmployees: 10–50`** | `lib/schema.ts` → `getOrganizationSchema()` | Pre-existing claim we did not touch. Confirm or remove. |

---

## 4. Decisions needing your approval

### 4.1 The ~70,000 templated city pages (P4.2) — **the biggest open question**

Measured with `npx tsx scripts/content-similarity.ts` (200 indexable pages per
service, Jaccard over 5-word shingles, header/footer/nav stripped):

| | Épaviste | Rachat |
|---|---|---|
| Median similarity, same department | **0.785** | 0.781 |
| Median similarity, across departments | **0.733** | 0.737 |
| Pairs scoring ≥ 0.6 | 13,806 / 19,900 (69%) | 13,730 / 19,900 (69%) |
| Highest-scoring pair | 0.920 | 0.915 |
| Word count: min / median / max | 887 / 887 / 2,466 | 887 / 887 / 1,900 |

Read plainly: **any two city pages share roughly three-quarters of their
five-word phrases.** Non-IDF pages are 887 words of pure template, identical bar
the place name. IDF pages reach 2,300–2,600 words because they get
`data/idf-extra-content.ts` and the IDF FAQ — but only **46 of 1,286 IDF
communes** have genuinely local data (parkings, fourrière, access constraints) in
`lib/city-local-data.ts`.

This is the classic doorway-page pattern. Three options, in the order I would
recommend them:

1. **Deepen instead of prune (recommended).** Extend `lib/city-local-data.ts` from
   46 to the ~150 IDF communes that actually generate calls. Real fourrière
   addresses, real parking names, real ZFE constraints. That is the only change
   that turns these into pages Google wants to rank, and it needs your operational
   knowledge, not more code.
2. **Prune the non-IDF, non-limitrophe rachat pages.** Currently 18,266 URLs per
   service are in the sitemap. Dropping the rachat duplicates outside IDF +
   limitrophe would halve the crawl budget spent on near-identical pages. Low risk
   if those URLs have no impressions — **check Search Console first**.
3. **Do nothing.** Defensible while the IDF pages are ranking, but the exposure
   grows with every Google helpful-content update.

**I have not implemented any of these.** No page was noindexed or removed.

### 4.2 Lyon and Marseille arrondissements

The dataset had **9 identical `lyon` rows and 16 identical `marseille` rows** —
one per arrondissement postal code, all sharing one slug — which emitted the same
`<loc>` up to 16 times in the sitemap. I collapsed each to a single canonical
entry (`lyon` @ 69001, `marseille` @ 13001). **No URL changed.**

Paris already has proper per-arrondissement slugs (`paris-1er` … `paris-20e`), and
`scripts/generate-full-locations.ts` contains code to produce `lyon-1er`,
`marseille-2e` and so on — it simply was not used for the committed data. Giving
Lyon and Marseille the same treatment would create ~25 *new* URLs. Since 69 and 13
are outside the indexed geography today, I did not do it. **Say the word if you
want those arrondissement pages.**

### 4.3 SemrushBot: which one to allow

`SemrushBot-SA` (Site Audit) is now allowed; plain `SemrushBot` (backlink and
discovery crawling) stays blocked. Robots.txt user-agent selection is
longest-match, so the audit bot picks the permissive group. This gets you a
working Site Audit without spending crawl budget on the backlink crawler. **If you
also want Semrush backlink data on your own site, remove the `SemrushBot` block.**

### 4.4 Two ESLint exceptions, kept deliberately

`react-hooks/set-state-in-effect` fires in three places. One was **fixed properly**
(`PostalCodeSelect` now derives the empty result list during render). Two keep a
*targeted, single-line* disable with the reason inline, rather than a blanket rule
change:

- `QuickContact` reads ads traffic from the URL/referrer. The value must start
  `false` so the server-rendered HTML and the first client render agree; the extra
  render is the price of a hydration-safe read.
- `ConversionForm` resets a dependent field when its parent changes. React would
  prefer that in the change handler — **but that is lead-form logic, which the
  brief explicitly put off-limits.** Worth revisiting under a separate change with
  form testing.

### 4.5 Performance levers that were out of scope

The throttled mobile LCP on every measured page is dominated by two things this
work was not allowed to touch:

- **Google Analytics: 171 KB** — the largest single request on the site. Already
  `afterInteractive` (correct), but consider server-side tagging or GA4 via
  Google Tag Gateway if mobile CWV matter commercially.
- **Two web fonts: 87 KB** (Inter + Playfair Display, `display: swap`). Dropping
  Playfair, or subsetting it to the glyphs actually used in headings, is the
  cheapest remaining LCP win. That is a design decision.

### 4.6 Nothing is over the size threshold any more

The two Pas-de-Calais department pages were 301 KB and 309 KB — the last things
over the 300 KB warning threshold — because they link **all 887 of their
communes** so none is orphaned. Repeating a 52-character Tailwind class string on
every one of those links cost ~46 KB of HTML, and again in the RSC payload. The
styling moved onto the `<ul>` as descendant variants; the links are untouched.

  245 KB / 253 KB, still all 887 links. Heaviest page on the site is now 253 KB.

---

## 5. Post-deploy checklist

1. **Deploy to a Vercel preview first** and re-verify the redirect behaviour over
   real HTTP, since `localhost` skips canonicalisation:
   ```bash
   curl -sIL http://lesepavistespro.com/Epaviste/            # expect ONE 308
   curl -sIL https://lesepavistespro.fr/epaviste/            # expect ONE 308
   curl -sIL https://www.lesepavistespro.fr/Epaviste         # expect ONE 308
   curl -sIL https://www.lesepavistespro.fr/epaviste/paris-75/
   curl -sIL https://www.lesepavistespro.fr/epaviste         # expect 200, no hop
   ```
   Each must show exactly one `HTTP/2 308` before the `200`.

2. **Resubmit `/sitemap.xml`** (the index — robots.txt now advertises only it) in
   **Google Search Console** and **Bing Webmaster Tools**.

3. **URL Inspection → "Request indexing"** on the IDF city URLs that P1.1 freed.
   These were canonicalising into other departments and could not rank:
   ```
   /epaviste/seine-saint-denis-93/montreuil
   /epaviste/hauts-de-seine-92/bagneux
   /epaviste/hauts-de-seine-92/chatillon
   /epaviste/seine-et-marne-77/chelles
   /epaviste/seine-et-marne-77/torcy
   /epaviste/essonne-91/grigny
   /epaviste/essonne-91/morangis
   /epaviste/essonne-91/ste-genevieve-des-bois
   /epaviste/val-de-marne-94/fresnes
   /epaviste/val-d-oise-95/goussainville
   /epaviste/val-d-oise-95/st-gratien
   /epaviste/yvelines-78/acheres
   /epaviste/yvelines-78/maurepas
   /epaviste/yvelines-78/bois-d-arcy
   ```
   …plus the `/rachat-voiture/…` twin of each. Quota is ~10/day, so start with the
   highest-value communes.

4. **Re-run the Semrush Site Audit** now that `SemrushBot-SA` is allowed. The
   previous audit could not crawl the site at all — expect the first run to be the
   real baseline.

5. **Watch Search Console for 404s.** `/epaviste/paris-75/lyon` and every other
   invalid `(department, city)` combination now correctly returns 404. If any of
   those had picked up traffic, they will appear in the Coverage report. That is
   the fix working, not a regression — but check none of them had links worth a
   redirect.

6. **Confirm the ISR cache rolled over.** Vercel namespaces the ISR cache per
   deployment, so stale pages for the bogus URLs should disappear on deploy. Spot
   check `/epaviste/paris-75/lyon` returns 404 in production.

7. **Recheck in 2–4 weeks:** IDF city impressions and average position in Search
   Console, plus a fresh `npm run seo-crawl` against production.

---

## 6. Semrush issue → fix mapping

`seo-audit/semrush/` did not exist, so no CSV exports were parsed. This maps the
brief's issue table onto what was found and fixed by the local crawler, which
mirrors the Semrush Site Audit categories.

| Semrush issue | Before | Root cause | Commit | After |
|---|---:|---|---|---:|
| 4XX status / broken internal links | 1 | `saint-denis` vs `st-denis` in `app/page.tsx`; `franconville` vs `franconville-la-garenne` in `IdfInternalLinks.tsx` | `3bbc2a8` | **0** |
| Duplicate title tags | 0 sampled, **1,474 slugs at risk** | homonym cities shared a title | `c2b8ab2` | **0** |
| Duplicate content | 69% of pairs ≥ 0.6 | one template, 70k URLs | *measured, not changed* | see §4.1 |
| Title too long | 108 (>60), 13 (>70) | pages appended the brand the layout template already adds | `e9b87bc` | **0** |
| Meta description too long/short/missing | 0 | — | — | **0** |
| Missing / multiple H1 | 0 / 0 | — | — | **0** |
| Incorrect pages found in sitemap.xml | 18 non-canonical + 11 noindex | city resolution + `/cookies` | `c2b8ab2`, `a8ab021` | **0** |
| Robots.txt blocks resources | `/_next/static/` disallowed for Googlebot **and** `*` | `app/robots.ts` | `bd9b28a` | **fixed** |
| Site not crawlable by Semrush | `SemrushBot: Disallow: /` | `app/robots.ts` | `bd9b28a` | **SemrushBot-SA allowed** |
| Structured data items are invalid | 248 conflicting `@id`, 10 double `FAQPage`, 766 business nodes | per-city `LocalBusiness` reusing `#business` | `52f044f`, `d4d37bf` | **0 / 0 / 499** |
| Redirect chains and loops | latent loop on every trailing-slash URL | `NextURL` mutation + duplicate rule in `next.config.ts` | `1b8b1d7`, `d4d37bf` | **1 hop max** |
| High HTML size | 14 pages > 300 KB, max 485 KB | full city arrays in the RSC payload | `6a7cdd1` | **2 pages, max 309 KB** |
| Large images | 22 MB in `public/` | unoptimised PNGs | `669ac9c` | **1.5 MB** |
| Low word count | 2 pages (194, 297) | `/contact`, `/documents` | `038dd6c` | **0** |
| Nofollow attributes / noindex pages linked | 10 `noindex,nofollow`; 1,137 noindex linked | `generateMeta` emitted `follow: false` | `52f044f` | **0 / 122** |
| Orphaned pages | every city past the 20th in a department | client-side "Voir plus" gate | `6a7cdd1` | **all linked** |
| Hreflang conflicts | root `alternates.languages` | `app/layout.tsx` | `52f044f` | **removed (FR-only)** |
| Images missing alt / broken images | 0 alt issues; 1 broken (`hero-tow-truck.jpg`, 29 bytes, in the image sitemap) | `app/sitemap-images.xml` | `669ac9c` | **0** |

---

## 7. Guardrails (P6)

`scripts/seo-qa-check.ts` runs on `prebuild`, so `npm run build` fails if any of
these regress. 57 checks pass today.

| # | Check | Guards |
|---|---|---|
| 1 | Every `(dept, city)` of all 34,923 cities resolves to itself; no cross-department duplicate titles | P1.1 |
| 2 | All 116 hardcoded internal city/department/blog/static links resolve | P1.2 |
| 3 | `robots.ts` never disallows `/_next/static` or `/_next/webpack`; allows `SemrushBot-SA`; advertises only the sitemap index | P1.3 |
| 4 | Sitemaps never use `new Date()` for `lastmod`, never emit `changefreq`/`priority`, and city sitemaps filter through `shouldIncludeInSitemap` + `shouldNoIndex` + `getCityInDepartment` | P1.4 |
| 5 | No page title over 60 rendered chars; no page title containing the brand the template already appends; `MAX_TITLE_TOTAL === 60`; `safeTitleFit` never truncates a name | P2.1 |
| 6 | `lib/seo.ts` never emits `follow: false` | P2.3 |
| 7 | No competing `#business` definition; location pages emit `Service`; city pages emit one merged `FAQPage`; no `aggregateRating`/`review` anywhere | P2.4 |
| 8 | Root layout sets no `alternates.canonical`, no `languages`, one Bing tag, no `keywords`/`geo.*`/`ICBM`/`revisit-after` | P2.5 |
| 9 | Seven URL variants canonicalise in **one** hop and land on the expected URL | P2.6 |
| 10 | No **served** image over 300 KB — everything under `public/` **plus the App Router icon conventions in `app/`** | P3.1 |
| 11 | No `wa.me/+` URL and no hand-built `wa.me` URL outside `lib/whatsapp.ts` | P4.3 |

Plus the 30 pre-existing checks (department codes, postal codes, canonicals,
analytics, descriptions, geographic scope, FAQ content, trust signals, CTA
integrity, no fabricated ratings, sitemap pruning, `.com → .fr`…).

### Reproducing every number in this report

```bash
npm run build && PORT=3210 npm run start &

npm run seo-crawl -- http://localhost:3210 --label=after   # §1 issue tables
npm run check-cities                                       # P1.1 proof, all 34,923 cities
npx tsx scripts/check-internal-links.ts                    # P1.2 proof
npm run check-redirects                                    # P2.6 proof
npx tsx scripts/content-similarity.ts http://localhost:3210 --sample=200   # §4.1
npx tsx scripts/lighthouse-run.ts http://localhost:3210 --label=after      # §1 CWV
npm run seo-check                                          # all 57 guardrails
npx eslint .                                               # 0 errors, 0 warnings
```

Raw output is in `seo-audit/` (git-ignored).
