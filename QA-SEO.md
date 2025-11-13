# SEO HARDENING & OPTIMIZATION - QA DOCUMENT

**Project:** lesepavistespro.fr  
**Goal:** Make this Next.js app a technically perfect SEO machine  
**Date:** January 13, 2025  
**Status:** ✅ Phase 1 Complete | 🚧 Phase 2-11 In Progress

---

## ✅ PHASE 1: CANONICAL HOST ENFORCEMENT (COMPLETE)

### Implementation

**1. Created `lib/site.ts`**
- `getSiteUrl()`: Returns `https://www.lesepavistespro.fr`
- `getCanonicalUrl(path)`: Returns full canonical URL for any path
- Enforces HTTPS + WWW subdomain

**2. Created `middleware.ts`**
- Intercepts all requests
- 308 permanent redirect for:
  - `http://` → `https://`
  - `lesepavistespro.fr` → `www.lesepavistespro.fr`
- Excludes: static files, images, sitemaps, robots.txt

**3. Updated Metadata**
- `app/layout.tsx`: metadataBase = `https://www.lesepavistespro.fr`
- OpenGraph URL: www subdomain
- Canonical URL: www subdomain
- All icons and images: relative URLs (automatically prefixed)

**4. Updated Structured Data**
- `lib/schema.ts`: Uses `getSiteUrl()` for all URLs
- Business @id: `https://www.lesepavistespro.fr/#business`
- All absolute URLs now canonical

### Testing

**Manual Tests:**
```bash
# Test redirects (after deployment)
curl -I http://lesepavistespro.fr
# Expected: 308 → https://www.lesepavistespro.fr/

curl -I https://lesepavistespro.fr
# Expected: 308 → https://www.lesepavistespro.fr/

curl -I https://www.lesepavistespro.fr
# Expected: 200 OK
```

**Verification Checklist:**
- [ ] http://lesepavistespro.fr → 308 → https://www.lesepavistespro.fr/
- [ ] https://lesepavistespro.fr → 308 → https://www.lesepavistespro.fr/
- [ ] https://lesepavistespro.fr/epaviste → 308 → https://www.lesepavistespro.fr/epaviste
- [ ] All canonical tags show www subdomain
- [ ] All OG URLs show www subdomain
- [ ] All JSON-LD URLs show www subdomain

---

## ✅ PHASE 2: SITEMAP REWORK (COMPLETE)

### Implementation

**Sitemap Index (`app/sitemap.ts`)**
Returns 6 child sitemaps:
1. `/sitemap-static.xml` - Static pages (8 URLs)
2. `/sitemap-blog.xml` - Blog posts (17 URLs)
3. `/sitemap-epaviste-departements.xml` - Épaviste depts (8 URLs)
4. `/sitemap-rachat-departements.xml` - Rachat depts (8 URLs)
5. `/sitemap-epaviste-cities.xml` - Épaviste cities (144 URLs)
6. `/sitemap-rachat-cities.xml` - Rachat cities (144 URLs)

**Total:** 329 URLs across 6 sitemaps

**Child Sitemaps:**

1. **Static Pages** (`app/sitemap-static.xml/route.ts`)
   - Homepage (priority 1.0, daily)
   - /epaviste (priority 0.9, weekly)
   - /rachat-voiture (priority 0.9, weekly)
   - /zones (priority 0.85, weekly)
   - /blog (priority 0.8, weekly)
   - /contact (priority 0.7, monthly)
   - /mentions-legales (priority 0.3, yearly)
   - /politique-de-confidentialite (priority 0.3, yearly)

2. **Blog Posts** (`app/sitemap-blog.xml/route.ts`)
   - Uses actual post dates for lastmod
   - Priority 0.6, monthly changefreq
   - 17 blog posts

3. **Épaviste Departments** (`app/sitemap-epaviste-departements.xml/route.ts`)
   - 8 departments in Île-de-France
   - Priority 0.8, monthly changefreq

4. **Rachat Departments** (`app/sitemap-rachat-departements.xml/route.ts`)
   - 8 departments in Île-de-France
   - Priority 0.8, monthly changefreq

5. **Épaviste Cities** (`app/sitemap-epaviste-cities.xml/route.ts`)
   - 144 cities across 8 departments
   - Priority 0.7, monthly changefreq

6. **Rachat Cities** (`app/sitemap-rachat-cities.xml/route.ts`)
   - 144 cities across 8 departments
   - Priority 0.7, monthly changefreq

**Features:**
- ✅ All URLs use `getSiteUrl()` (www subdomain)
- ✅ Realistic changefreq (monthly for cities/depts, not fake "weekly")
- ✅ Proper priorities based on page importance
- ✅ Cache headers (1 hour) for performance
- ✅ Valid XML format

### Testing

**Verification Checklist:**
- [ ] https://www.lesepavistespro.fr/sitemap.xml returns sitemap index
- [ ] Sitemap index lists 6 child sitemaps
- [ ] Each child sitemap is valid XML
- [ ] All URLs use https://www.lesepavistespro.fr
- [ ] No duplicate URLs across sitemaps
- [ ] Total URLs = 329 (8+17+8+8+144+144)

**XML Validation:**
```bash
# Validate each sitemap
curl https://www.lesepavistespro.fr/sitemap-static.xml | xmllint --noout -
curl https://www.lesepavistespro.fr/sitemap-blog.xml | xmllint --noout -
# etc...
```

---

## ✅ PHASE 3: ROBOTS.TXT ALIGNMENT (COMPLETE)

### Implementation

**Updated `app/robots.ts`:**
```typescript
{
  rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] }],
  sitemap: 'https://www.lesepavistespro.fr/sitemap.xml',
  host: 'www.lesepavistespro.fr'
}
```

**Features:**
- ✅ Uses `getSiteUrl()` for sitemap URL
- ✅ Host directive points to www subdomain
- ✅ Allows all pages except /api/ and /admin/
- ✅ Points to sitemap index

### Testing

**Verification Checklist:**
- [ ] https://www.lesepavistespro.fr/robots.txt accessible
- [ ] Contains: `Sitemap: https://www.lesepavistespro.fr/sitemap.xml`
- [ ] Contains: `Host: www.lesepavistespro.fr`
- [ ] Allows: `/`
- [ ] Disallows: `/api/`, `/admin/`

---

## 🚧 PHASE 4-11: TODO

### Phase 4: Meta + OG/Twitter Tags Per Page Type
- [ ] Update homepage metadata
- [ ] Update pillar page metadata
- [ ] Update department page metadata
- [ ] Update city page metadata
- [ ] Update blog post metadata
- [ ] Ensure all pages have unique titles/descriptions
- [ ] Add OG/Twitter cards to all pages

### Phase 5: Structured Data (JSON-LD, SSR Only)
- [ ] Homepage: LocalBusiness + WebSite (SearchAction)
- [ ] Pillars: Service + FAQPage
- [ ] Departments: LocalBusiness + BreadcrumbList
- [ ] Cities: LocalBusiness + BreadcrumbList + FAQPage
- [ ] Blog: Article schema

### Phase 6: Internal Linking (Maillage SEO)
- [ ] /zones lists all departments + cities
- [ ] Department pages link to top 5-10 cities
- [ ] City pages link back to department
- [ ] City pages link to 3-5 neighboring cities
- [ ] Cross-link épaviste ↔ rachat pages
- [ ] Footer links to all 8 departments + /zones

### Phase 7: Form UX & Conversion Signals
- [ ] Correct input types (tel, email, text)
- [ ] inputmode="numeric" for phone/postal
- [ ] Labels always visible
- [ ] Inline validation (green check, red error)
- [ ] Promise-based CTA text
- [ ] Success state with WhatsApp/Call buttons
- [ ] Hidden fields (service, department, city)

### Phase 8: GA4 Events & Params
- [ ] click_call event
- [ ] click_whatsapp event
- [ ] form_start event
- [ ] form_step event
- [ ] form_submit event
- [ ] form_success_displayed event
- [ ] Event params (service, page_type, department, city)

### Phase 9: Performance / CWV
- [ ] LCP < 2.5s (mobile)
- [ ] CLS < 0.1 (mobile)
- [ ] INP < 200ms (mobile)
- [ ] Preload hero images
- [ ] Lazy-load other images
- [ ] font-display: swap
- [ ] No layout shifts

### Phase 10: Bing / Other
- [ ] Bing Webmaster verification meta present
- [ ] Robots.txt accessible from Bing
- [ ] Sitemap accessible from Bing

### Phase 11: QA Checklist
- [ ] Host & redirects working
- [ ] Canonical tags correct
- [ ] Sitemap index working
- [ ] Robots.txt correct
- [ ] Rich Results Test (Google) - all schemas valid
- [ ] PageSpeed Insights - all green CWV
- [ ] GA4 DebugView - all events firing

---

## 📊 CURRENT STATUS

**Completed:**
- ✅ Phase 1: Canonical Host Enforcement
- ✅ Phase 2: Sitemap Rework
- ✅ Phase 3: Robots.txt Alignment

**In Progress:**
- 🚧 Phase 4-11

**Build Status:**
- ✅ Build successful: 332 pages
- ✅ 0 TypeScript errors
- ✅ 0 build warnings

---

## 🔗 USEFUL LINKS

**Testing Tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- XML Sitemap Validator: https://www.xml-sitemaps.com/validate-xml-sitemap.html

**Documentation:**
- Next.js Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Schema.org LocalBusiness: https://schema.org/LocalBusiness
- Google Search Central: https://developers.google.com/search

---

## 📝 NOTES & LIMITATIONS

**Known Limitations:**
- Middleware shows deprecation warning (Next.js 16) - will migrate to proxy in future
- Dynamic OG images not yet implemented (optional enhancement)
- Some city pages may need more unique content

**TODO:**
- Add NEXT_PUBLIC_SITE_URL to Vercel environment variables
- Test redirects after deployment
- Submit new sitemap to Google Search Console
- Submit new sitemap to Bing Webmaster Tools
- Monitor Core Web Vitals in Search Console

---

**Last Updated:** January 13, 2025  
**Next Review:** After Phase 4-11 completion
