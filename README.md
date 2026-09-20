# Les Épavistes Pro - Website

Professional website for épaviste (scrap vehicle removal) and vehicle buyback services in Île-de-France.

## 🚀 Features

- **Modern Design**: Clean, professional UI inspired by Artea Audit with navy blue theme
- **SEO Optimized**: Complete Schema.org JSON-LD, meta tags, sitemap, and robots.txt
- **Dynamic Location Pages**: Automated pages for all 8 Île-de-France departments and major cities
- **Mobile-First**: Fully responsive with sticky CTA and optimized forms
- **Analytics Ready**: Google Analytics 4 integration with event tracking
- **Performance**: Optimized for Core Web Vitals (LCP < 2s, CLS < 0.05)

## 📋 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 3.4
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
lesepavistespro/
├── app/
│   ├── epaviste/[slug]/     # Dynamic department pages
│   ├── rachat-voiture/      # Vehicle buyback pages
│   ├── blog/                # Blog system
│   ├── layout.tsx           # Root layout with Schema.org
│   ├── page.tsx             # Homepage
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── Header.tsx           # Navigation
│   ├── Hero.tsx             # Hero section
│   ├── Services.tsx         # Services cards
│   ├── Process.tsx          # 3-step process
│   ├── Coverage.tsx         # Department coverage
│   ├── Stats.tsx            # Statistics
│   ├── Testimonials.tsx     # Client reviews
│   ├── FAQ.tsx              # FAQ accordion
│   ├── CTASection.tsx       # Call-to-action
│   ├── ContactForm.tsx      # Lead form
│   └── Footer.tsx           # Footer
├── lib/
│   ├── locations.ts         # Department/city data
│   ├── schema.ts            # Schema.org helpers
│   ├── analytics.ts         # GA4 tracking
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## 🎨 Design System

### Colors
- **Navy Primary**: `#2D3250`
- **Navy Secondary**: `#424769`
- **Lavender**: `#9B9FE8`
- **Lavender Light**: `#B8BCFF`
- **Cream**: `#F6F4EB`

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, 2xl-5xl
- **Body**: Regular, base-lg

## 📊 SEO Features

### Schema.org Markup
- LocalBusiness
- Service
- FAQPage
- BreadcrumbList
- Article (blog)

### Meta Tags
- Title, description, keywords
- Open Graph (Facebook/LinkedIn)
- Twitter Cards
- Canonical URLs

### Dynamic Sitemap
- Homepage
- Service pages
- All department pages (8 × 2 = 16)
- Blog articles

## 🎯 Keywords Targeted

### Primary
- épaviste, enlèvement épave gratuit
- rachat voiture, rachat épave
- épaviste Paris, VHU agréé

### Location-Based
- épaviste [department]
- enlèvement épave [city]
- rachat voiture [department]

### Long-Tail
- certificat de destruction
- prime à la conversion
- ZFE Grand Paris
- Crit'Air vignette

## 📱 Mobile Optimization

- Sticky CTA bar
- Click-to-call buttons
- Short forms (name/phone/postal code)
- Touch-friendly UI elements

## 🔧 Configuration

### Google Analytics
Replace `G-XXXXXXXXXX` in `app/layout.tsx` with your GA4 ID.

### Contact Information
Update phone number and email in:
- `components/Hero.tsx`
- `components/CTASection.tsx`
- `components/Footer.tsx`

### Domain
Update base URL in:
- `app/sitemap.ts`
- `app/robots.ts`
- `lib/schema.ts`

## 📈 Performance

- **LCP**: < 2s (Largest Contentful Paint)
- **CLS**: < 0.05 (Cumulative Layout Shift)
- **INP**: < 200ms (Interaction to Next Paint)
- **Lighthouse Score**: 95+

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Manual
```bash
npm run build
npm start
```

## 📝 Content Management

### Locations
`lib/locations-national.ts` is generated (`npm run generate-locations`): 18 regions,
101 departments, 34 923 communes with INSEE code, population and coordinates
(`npm run enrich-geo` refreshes them from geo.api.gouv.fr). Never edit it by hand;
resolve a city with `getCityInDepartment(deptSlug, citySlug)`, never by slug alone.
The department of a commune is the one of its INSEE code (a postal code can straddle two).
`data/prefectures.generated.ts` (`npm run generate-prefectures`, INSEE COG chef-lieux) lists
the 101 préfectures and 233 sous-préfectures: `lib/geo-targeting.ts` indexes them and lists
them in the sitemaps whatever their department.

### Île-de-France content model
Île-de-France is the priority market; the rest of France stays indexed.
- **Tiers** (`lib/idf-cities.ts`): A = Paris arrondissements + communes ≥ 20 000 hab.,
  B = 5 000–20 000, C = the rest, computed from INSEE population.
- **Tier A** pages are hand-written in `data/idf-cities/<dept>.ts`
  (`IdfCityContent`: intro, situations, fourrière, accès/ZFE, FAQ, rachat).
  Tier B/C pages are generated by `lib/idf-city-generated.ts` from public facts
  in `data/idf-facts.generated.ts` (EPCI, surface, ZFE flag) and
  `data/idf-transport.generated.ts` (rail lines and stations per commune,
  Île-de-France Mobilités open data — `npm run generate-idf-transport`).
- **Hubs**: `data/idf-extra-content.ts` (`idfDeptHubs`) feeds the 8 department pages
  and the region page (`components/IdfDepartmentPage.tsx`, `IdfRegionPage.tsx`).
- **Quality gates** run in `npm run seo-check` (prebuild): Tier A ≥ 800 unique
  words/service and pairwise similarity < 0.40, Tier B ≥ 500 / < 0.60
  (`npx tsx scripts/idf-content-similarity.ts` prints the report).
- **Business facts** that only the owner can vouch for live behind
  `lib/business-claims.ts` (`verified: false` hides them); open `TODO(owner)`
  markers are listed in `IDF-DOMINATION-REPORT.md`.

### Adding a Blog Post
Add an entry to `lib/blog-data.ts` (`region: 'idf'` for Île-de-France topics —
it is then listed in `sitemap-idf.xml`). Dates must be real.

### Auditing
- `npm run seo-check` — static guardrails (fails the build).
- `npm run seo-crawl -- --idf-only` — crawls every Île-de-France URL from the sitemaps
  (titles, links, schema, leaked `TODO(owner)`); reports in `seo-audit/`.
- `npx tsx scripts/lighthouse-run.ts <baseUrl> --label=<label>` — mobile Core Web Vitals.
- `npx tsx scripts/validate-jsonld.ts <baseUrl> [/path …]` — structural JSON-LD validation (required properties, @id references, one FAQPage / business node per page).
- `npm run verify-ga4 -- --base=<baseUrl>` — headless Chrome proves the GA4 conversion events
  (`click_call`, `click_whatsapp`, `form_start`, `lead_form_submit`) fire with their geo/intent params.
- `npm run seo-monitor -- <baseUrl>` — the weekly production check (crawl, JSON-LD, redirect hops,
  robots/sitemap, Lighthouse budgets); run by `.github/workflows/seo-monitor.yml` every Monday
  06:00 Paris, which opens a « SEO regression » issue on error-level findings.
  `.github/workflows/pr-check.yml` runs tsc + seo-check + build on every PR to `main`.

## 🤝 Support

For questions or issues, contact: contact@lesepavistespro.fr

## 📄 License

© 2025 Les Épavistes Pro - All rights reserved
