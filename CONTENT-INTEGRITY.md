# Content Integrity Log

This document tracks all fabricated/unverified data removed from the codebase.
**Do NOT reintroduce any of these items without explicit confirmation from the business owner.**

---

## Removed Items (July 2025)

### 1. Fabricated Aggregate Rating (4.9 / 500 reviews)
- **Files:** `lib/schema.ts`, `lib/structured-data.ts`
- **What:** `aggregateRating` with `ratingValue: 4.9`, `reviewCount: 500` — hardcoded in multiple places
- **Why removed:** No verifiable source. Google explicitly recommends NOT displaying review snippets based on fabricated data. Risk of manual action or algorithmic demotion.
- **Resolution:** Removed entirely. Will be replaced with dynamic Google Places API data when the business owner provides a valid Place ID.

### 2. Fabricated Individual Reviews (getDefaultReviewsSchema)
- **File:** `lib/schema.ts` (function `getDefaultReviewsSchema`)
- **What:** 5 fake review entries with invented names (Marie L., Thomas D., Sophie M., Ahmed B., Isabelle R.) and fabricated review text
- **Why removed:** Entirely invented. No corresponding real reviews exist.
- **Resolution:** Function deleted. No Review schema emitted until real reviews are available.

### 3. Fabricated IDF Testimonials (20 entries)
- **File:** `data/idf-testimonials.ts`
- **What:** 20 testimonials with invented names, locations, ratings, and quotes attributed to specific named individuals
- **Why removed:** None of these testimonials can be traced to a real client interaction.
- **Resolution:** Array emptied. Functions retained for future use with real verified testimonials.

### 4. Fabricated Homepage Testimonials
- **File:** `components/Testimonials.tsx`
- **What:** 3 fabricated testimonials (Jean D., Sarah M., Mohamed B.) with invented quotes
- **Why removed:** Not provided by real clients.
- **Resolution:** Replaced with placeholder "Nous collectons actuellement les avis" with CTA to leave real feedback.

### 5. Unverifiable IDF Statistics
- **File:** `lib/idf.ts` (`IDF_STATS`)
- **What:** "8 500+ véhicules traités", "98% Satisfaction", "12 ans d'Expérience" — none confirmed by business owner
- **Why removed:** Cannot verify these numbers. "12 ans d'expérience" contradicts `foundingDate: 2023` in Organization schema.
- **Resolution:** Replaced with verifiable facts only (8 départements, 1 286 communes, 24h/24 disponibilité, 100% gratuit).

### 6. Case Studies Reformulated
- **File:** `data/idf-extra-content.ts`
- **What:** Specific case studies presented as real events (e.g., "Peugeot 308 du 15e arrondissement", "agriculteur de Coulommiers")
- **Why reformulated:** These read as specific real events but were never confirmed by the business owner. They may be illustrative examples but were presented as factual reports.
- **Resolution:** Reformulated with "Exemple type d'intervention" prefix to clearly signal these are illustrative scenarios, not specific past events.

---

## Policy for Future Content

1. **No rating/review data** unless dynamically fetched from Google Places API or explicitly provided by the business owner with proof of authenticity.
2. **No named testimonials** unless the client has given written consent and the review can be verified.
3. **No business statistics** (vehicles processed, years of experience, satisfaction rates) unless sourced from internal records confirmed by the owner.
4. **Case studies** must be clearly labeled as "exemple type" or "cas illustratif" unless the business owner confirms the specific event occurred.
