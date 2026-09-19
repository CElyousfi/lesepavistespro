# Île-de-France domination — rapport final

**Branche** : `seo/idf-domination` (27 commits, un par tâche) · **Date** : 19 septembre 2026
**Objectif** : faire de l'Île-de-France la priorité éditoriale, technique et de maillage du site sans retirer la couverture nationale (aucune URL modifiée, aucune page désindexée hors décisions listées ci-dessous).

---

## 1. Résumé

| | Avant (baseline 18/09) | Après (19/09) |
|---|---|---|
| URLs IDF crawlées (exhaustif) | 2 592 — 0 erreur, 0 avertissement | 2 592 — 0 erreur, 1 avertissement (HTML > 300 Ko sur 2 hubs 77) |
| Mots médians / page IDF | 2 107 | **2 988** |
| Communes Tier A avec contenu rédigé à la main | 0 / 195 | **195 / 195** (2 services) |
| Similarité max. Tier A (Jaccard 5-shingles) | n/a (contenu générique commun) | **0,381** épaviste · **0,389** rachat (seuil 0,40) |
| Titres > 60 car. / tronqués (IDF) | 0 / 0 | 0 / 0 |
| FAQPage multiples, entités `#business` en conflit | 0 | 0 |
| Liens internes cassés | 0 | 0 |
| `TODO(owner)` rendus dans le HTML | 0 | 0 |
| Articles de blog IDF | 2 | **10** |
| Lighthouse mobile — accueil | 91 (LCP 3,3 s, TBT 130 ms) | **100 (LCP 1,8 s, TBT 0 ms)** |
| Échantillon national (479–499 URLs) | 0 erreur, 0 avertissement | 0 erreur, 0 avertissement |
| Garde-fous `npm run seo-check` (prebuild) | 57 | **94** (0 avertissement, 0 erreur) |
| ESLint | non passé | **0 erreur, 0 avertissement** |

Le build de production passe (`npm run build`, 2 859 pages statiques) ; le `seo-check` bloque désormais tout régression sur les 12 garde-fous du brief.

---

## 2. Ce qui a changé, phase par phase

### Phase 0 — mesure
- `scripts/seo-crawl.ts --idf-only` : crawl **exhaustif** de toutes les URLs IDF (région, 8 départements, 1 286 communes × 2 services, blog IDF) + échantillon national ; section « ÎLE-DE-FRANCE » dédiée ; détection des titres tronqués, des pages > 200 liens, des `TODO(owner)` rendus. Rapports JSON dans `seo-audit/` (git-ignoré).

### Phase 1 — fondations techniques
- **P1.2** `lib/city-local-data.ts` : clés `<dept>/<commune>` (plus de collision de slug : la clé `montreuil` fuyait le contenu IDF sur `/epaviste/vendee-85/montreuil`) ; garde-fou : chaque clé résout.
- **P1.4** `app/sitemap-idf.xml` (hubs, 16 hubs départementaux, toutes les communes IDF pour les 2 services, blog IDF) listé **en premier** dans l'index ; `lastmod` réel par commune (`updatedAt` du contenu).

### Phase 2 — architecture IDF-first
- **P2.1** Accueil : H1 et titre IDF (« Épaviste Île-de-France – Enlèvement d'épave gratuit 24h/24 », 58 car.), `IdfHero` + `IdfCoverage` (8 départements, 16 communes issues des données) avant la couverture nationale (« Nous intervenons aussi partout en France »).
- **P2.2** Hubs : `IdfRegionPage` et `IdfDepartmentPage` (8 hubs de 439–596 mots : circulation, habitat, ZFE, fourrière, rachat, sources) ; `IdfCommuneIndex` liste **toutes** les communes dans le HTML (`<details>` natif, jamais de « voir plus » client).
- **P2.3** Maillage : footer serveur (8 départements × 2 services + 20 communes), menu « Île-de-France » (desktop + mobile), bloc « Aussi en Île-de-France » sur les pages hors IDF, communes les plus proches **inter-départementales** (haversine sur les centroïdes), fil d'Ariane avec le niveau région, guides IDF.
- **P2.4** Titres/descriptions IDF : « Épaviste {Ville} ({CP}) – Gratuit 24h/24 », « Rachat voiture {Ville} ({CP}) – Cash » ; 2 572 titres mesurés, 0 > 60 car., 0 tronqué.

### Phase 3 — contenu
- **P3.1** `scripts/enrich-locations-geo.ts` : code INSEE, population, latitude/longitude pour 34 872 communes (IDF 100 %) via geo.api.gouv.fr.
- **P3.2** Modèle de contenu :
  - Tiers calculés (`lib/idf-cities.ts`) : **A** = 20 arrondissements + communes ≥ 20 000 hab. (195), **B** = 5 000–20 000 (202), **C** = reste (889).
  - **Tier A** : 195 fiches rédigées dans `data/idf-cities/{75,77,78,91,92,93,94,95}.ts` — intro (population, superficie, transports, axes, habitat), 4 situations locales, accès & statut ZFE (périmètre A86, 94 communes concernées), fourrière, 7–8 FAQ épaviste, rachat (intro + 7–8 FAQ), sources. Angle distinct par commune (cheminots à Trappes/Brétigny, aéroport à Athis/Goussainville/Mitry, campus à Palaiseau/Gif/Champs, LOA à La Celle-Saint-Cloud, mariniers à Conflans, camping-cars à Ozoir, etc.).
  - **Tier B/C** : générés par `lib/idf-city-generated.ts` à partir de faits publics (`data/idf-facts.generated.ts` : EPCI, superficie, ZFE), rotation déterministe des formulations.
  - `components/IdfCityPage.tsx` (serveur) remplace le template client pour l'IDF ; bloc « estimation » en premier sur les pages rachat ; une seule `FAQPage` construite à partir des questions visibles.
  - Résultats (`npx tsx scripts/idf-content-similarity.ts`) :

    | Service / tier | Pages | Mots uniques min · p50 · max | Jaccard p50 · p90 · max | Paires ≥ seuil |
    |---|---|---|---|---|
    | épaviste A | 195 (195 rédigées) | 800 · 838 · 1 016 | 0,071 · 0,163 · **0,381** | 0 / 18 915 |
    | rachat A | 195 (195 rédigées) | 800 · 836 · 966 | 0,075 · 0,175 · **0,389** | 0 / 18 915 |
    | épaviste B | 202 | 576 · 623 · 674 | 0,243 · 0,329 · 0,560 | 0 / 20 301 |
    | rachat B | 202 | 514 · 558 · 608 | 0,186 · 0,284 · 0,516 | 0 / 20 301 |

- **P3.3** Rachat : bloc d'estimation en tête, 5 cas H2, comparatif « rachat ou enlèvement gratuit », formulaire pré-rempli (`ville`, `department`).
- **P3.4** 8 articles IDF (`region: 'idf'`, datés 19/09/2026, 3–6 liens internes, 820–960 mots) : fourrière à Paris ; ZFE Grand Paris ; épave en parking souterrain parisien ; voiture abandonnée sur la voie publique ; vendre sans contrôle technique ; voiture accidentée / VE-VEI ; que devient une épave (centre VHU) ; aides 2026 après la fin de la prime à la conversion. L'article « prime à la conversion 2025 » (URL conservée) annonçait une aide **supprimée le 2 décembre 2024** : réécrit, `updatedAt` posé.

### Phase 4 — entité, conversion, performance
- **P4.1** Une seule entité `#business` (layout) : description « basé en Île-de-France … également partout en France », `areaServed` = Île-de-France (FR-IDF) + 8 départements, puis les autres régions ; `ContactPoint` `['FR-IDF','FR']`. Les nœuds `Service` ne font que référencer `#business`.
- **P4.2** `/contact` : horaires « 08h–20h / 09h–19h » contredisaient le 24h/24 du schéma et du site → alignés sur 24h/24 avec `TODO(owner)` ; zone d'intervention IDF-first ; NAP : téléphone affiché « 06 02 42 73 45 » partout (hrefs `+33602427345`) ; numéro erroné dans `components/Hero.tsx` (inutilisé) corrigé.
- **P4.3** GA4 : chaque événement porte `service`, `department_slug`, `city_slug`, `is_idf` ; barre mobile : `click_call` (mobile_sticky), `click_whatsapp`, nouveau `click_devis_sticky`. Allégations non vérifiables (« 500+ clients », « rappel en 15 min ») rendues uniquement via `lib/business-claims.ts` (`verified: false` → texte de repli honnête). Lighthouse mobile :

    | Page | Perf | LCP | TBT | CLS |
    |---|---|---|---|---|
    | `/` | 91 → **100** | 3,3 s → **1,8 s** | 130 ms → **0 ms** | 0 → 0 |
    | `/epaviste` | 90 → **96** | 3,4 s → **2,8 s** | 150 ms → **0 ms** | 0 → 0 |
    | `/epaviste/ile-de-france` | 92 → **95** | 3,2 s → **3,0 s** | 100 ms → **0 ms** | 0 → 0 |
    | `/epaviste/paris-75` | 89 → **96** | 3,6 s → **2,9 s** | 110 ms → **0 ms** | 0 → 0 |
    | `/epaviste/hauts-de-seine-92/nanterre` | 92 → **95** | 3,2 s → **3,0 s** | 130 ms → **0 ms** | 0 → 0 |
    | `/rachat-voiture/hauts-de-seine-92/nanterre` | 89 → **96** | 3,6 s → **2,9 s** | 120 ms → **0 ms** | 0 → 0 |
    | `/blog/certificat-destruction-vhu-obligatoire` | 78 → **100** | 5,8 s → **1,8 s** | 140 ms → **0 ms** | 0 → 0 |

    (`seo-audit/lighthouse-idf-before.json` = build du commit `0d81145`, avant le chantier ; `lighthouse-idf-after.json` = HEAD.)

### Phase 5 — hygiène
- `/zones` : 197 liens internes (< 200), 269 Ko. Redirections (`next.config.ts`) et liens WhatsApp (`wa.me/33602427345`, sans `+`) vérifiés sur tout le crawl. Images : 0 sans `alt`. ESLint : 0 erreur / 0 avertissement (`.worktrees/**` ignoré). README : modèle de contenu IDF, scripts d'audit.

### Phase 6 — garde-fous (`scripts/seo-qa-check.ts`, prebuild)
1. résolution ville = `(département, slug)` — 34 923 communes ; 2. toutes les clés de `lib/city-local-data.ts` et `data/idf-cities/*` résolvent, tous les guides pointent vers un article existant ; 3. robots ; 4. `sitemap-idf.xml` premier, `lastmod` réels ; 5. budget titres ; 6. accueil IDF-first ; 7. 8 hubs ≥ 400 mots, index communes serveur ; 8. une seule entité `#business`, `areaServed` IDF-first ; 9. Tier A 195/195 rédigées, ≥ 800 mots, similarité < 0,40 ; Tier B ≥ 500 / < 0,60 ; 10. règles de maillage (composants serveur, communes proches, hub région, guides, « Aussi en IDF ») ; 11. allégations gated ; 12. aucun `TODO(owner)` hors commentaire.

---

## 3. Commits par tâche

| Tâche | Commit |
|---|---|
| P0.1 crawler `--idf-only` | `aa5828a` |
| P1.2 clés locales par département | `6618508` |
| P1.4 `sitemap-idf.xml` + lastmod | `5d28a86` |
| P3.1 INSEE / population / centroïdes | `1a3eb7c` |
| P2.1 accueil IDF-first | `8fbd59d` |
| P2.2 hubs région/départements | `4fab355` |
| P2.3 maillage interne | `b0355c6` |
| P2.4 titres/descriptions IDF | `e541a00` |
| P3.2 modèle de contenu (tiers, générateur, page serveur) | `9f21d34` |
| P3.2 Tier A Paris / 92 / 93 / 94 / 95 / 78 / 91 / 77 | `96db9b0` `7a792df` `2dc599e` `65c2a59` `812a514` `cab9fd2` `125b39a` `6cf9208` |
| P3.2 garde-fou contenu | `b402675` |
| P3.4 blog IDF + réécriture prime | `31b1600` |
| P4.1 entité / areaServed | `097237b` |
| P4.2 /contact, NAP | `009b8b7` |
| P4.3 GA4, allégations, Lighthouse | `f40ea48` |
| P5.5 ESLint | `e739e61` (+ `7bc8dc8` gitignore) |
| P6 garde-fous #2/#10/#12 | `698e082` `8e0e078` |
| README | `32d3082` |

P1.1, P1.3, P1.5, l'essentiel de P5 (images, redirections, WhatsApp) et les garde-fous #1/#3/#5 étaient déjà en place sur la branche `seo/audit-remediation` dont `seo/idf-domination` est issue (voir `SEO-REMEDIATION-REPORT.md`).

---

## 4. Ce qui n'a pas été fait / décisions à valider

| Décision | Pourquoi | Ce qu'il faudrait |
|---|---|---|
| `IdfExtraContent` (contenu départemental hérité) **conservé** sur les pages communes Tier A, sous le contenu rédigé | Règle 8 : ne pas retirer une section existante sans accord | Le retirer allégerait les pages (~150 mots redondants par département) ; à décider |
| `/epaviste/vendee-85/montreuil` n'est plus indexée (18 266 → 18 265 URLs par service dans les sitemaps) | La clé `montreuil` de `city-local-data` appliquait à tort le contenu et l'indexation de Montreuil (93) à cette commune | Rien — c'est la correction ; signalé pour transparence |
| Paray-Vieille-Poste (91) reste sous `val-de-marne-94` dans les données | Règle 2 : ne jamais changer une URL existante | Une correction impliquerait une redirection 301 ; à décider |
| 8 hubs départementaux > 200 liens internes (max 563 : Seine-et-Marne, 507 communes) et HTML > 300 Ko sur les 2 hubs 77 | Le brief impose **tous** les liens communes dans le HTML ; le poids vient de l'index + du payload RSC de Next | Accepté ; alternative = scinder l'index par lettre (nouvelles URLs) |
| Notices « page indexée → page noindex » (129) sur les pages **nationales** : les pages départements hors IDF (et l'accueil via la couverture nationale) lient des communes noindex, dont des préfectures (Aurillac) | Stratégie de géo-ciblage existante (`lib/geo-targeting.ts`) : règle 8, pas modifiée | Envisager d'indexer les préfectures/sous-préfectures nationales ou de ne lier que des communes indexées |
| Allégations « 500+ clients », « rappel en 15 min » **masquées** (texte de repli : « Certificat de destruction remis », « Réponse rapide, 7j/7 », « Être rappelé rapidement ») | Règle 4 : pas de chiffre non vérifiable | Passer `verified: true` dans `lib/business-claims.ts` une fois les chiffres sourcés |
| Lyon / Marseille : aucune page ou hub dédié n'a été créé ni supprimé | Hors périmètre IDF ; couverture nationale conservée telle quelle | — |
| ZFE : formulations prudentes (« sanctions Crit'Air 3 suspendues », « texte de suppression voté en avril 2026, en attente de promulgation ») | Réglementation mouvante | Re-vérifier `data/idf-facts.generated.ts` et l'article ZFE à chaque annonce officielle |

---

## 5. `TODO(owner)` — faits métier à fournir

| Fichier | Fait attendu |
|---|---|
| `lib/schema.ts:180` | Adresse postale du siège (rue, CP, ville) — aujourd'hui seul `addressCountry: FR` est affirmé |
| `lib/seo-config.ts:20` | Raison sociale et SIRET pour les mentions légales |
| `lib/schema.ts:42` | Année de création : `seo-config.ts` dit 2020, `schema.ts` dit 2023 |
| `lib/schema.ts:52` | Confirmer que l'agrément VHU `PR9500003D` est en cours de validité et appartient bien à l'entreprise/au partenaire |
| `lib/schema.ts:57` | Effectif (`numberOfEmployees`) ou retirer la propriété |
| `app/contact/page.tsx:163` | Horaires réels (le site affirme 24h/24, 7j/7 partout) |
| `lib/business-claims.ts:9` | Délai médian réel de rappel (avant de réactiver « 15 min ») |
| `lib/business-claims.ts:11` | Nombre réel de clients servis (source) avant de réactiver « 500+ » |
| `scripts/generate-idf-facts.ts:31` | Re-vérifier la liste des communes ZFE et le statut réglementaire |
| `lib/blog-data.ts:12` | Poser `updatedAt` seulement lors d'une vraie révision d'article |
| `data/idf-testimonials.ts` / `components/Testimonials.tsx` | Aucun témoignage, note ou nombre d'avis n'a été inventé ; les blocs restent vides tant qu'aucun avis réel n'est fourni |

---

## 6. Préparation Google Business Profile (P4.2)

À créer/vérifier par le propriétaire — rien n'a été publié :
- **Nom** : Les Épavistes Pro (identique au site, sans mot-clé ajouté).
- **Catégorie principale** : « Service d'enlèvement d'épaves » ; secondaires : « Casse automobile / centre VHU », « Service de rachat de voiture », « Service de remorquage ».
- **Adresse** : celle du siège (à fournir — `TODO(owner)`) ; si l'entreprise se déplace uniquement, déclarer une **zone de service** sans adresse visible : Paris + les 8 départements d'Île-de-France (Google limite à ~20 zones : saisir les 8 départements plutôt que des communes).
- **Téléphone** : 06 02 42 73 45 (même format que le site) ; **site** : `https://www.lesepavistespro.fr/epaviste/ile-de-france` en lien principal (ou l'accueil), lien « rendez-vous » vers `/contact`.
- **Horaires** : ceux confirmés par le `TODO(owner)` (le site dit 24h/24, 7j/7).
- **Description** (≤ 750 car.) : reprendre la description de `getLocalBusinessSchema()` (Île-de-France d'abord, France ensuite).
- **Services** : enlèvement d'épave gratuit, rachat de voiture (avec ou sans CT, accidentée), enlèvement en parking souterrain, enlèvement depuis fourrière, certificat de destruction VHU.
- **Photos** : véhicule plateau, intervention réelle en sous-sol, certificat (anonymisé) ; pas de photos de banque d'images.
- **Avis** : n'afficher sur le site que des avis réels (import GBP) — le schéma `aggregateRating` reste absent tant qu'il n'y en a pas.
- **Cohérence NAP** : même nom, téléphone et adresse sur le site (`/mentions-legales`, `/contact`, schéma), GBP, Pages Jaunes, Facebook, Instagram.

---

## 7. Checklist post-déploiement

1. Déployer la branche ; vérifier `https://www.lesepavistespro.fr/sitemap.xml` (index) → `sitemap-idf.xml` en premier, 200 sur les 16 hubs départementaux.
2. Google Search Console : soumettre `sitemap.xml` ; « Inspection d'URL » + demande d'indexation sur `/epaviste/ile-de-france`, `/rachat-voiture/ile-de-france`, les 16 hubs et 10 communes Tier A (Paris 15e, Boulogne, Argenteuil, Versailles, Évry-Courcouronnes, Meaux…).
3. Test des résultats enrichis sur une page commune Tier A (une `FAQPage`, un `Service` référençant `#business`) et sur l'accueil (`AutomotiveBusiness` unique).
4. GA4 : vérifier dans DebugView les événements `click_call` (labels `header`, `mobile_sticky`), `click_whatsapp`, `click_devis_sticky`, `lead_form_submit` avec les paramètres `service`, `department_slug`, `city_slug`, `is_idf` ; créer les dimensions personnalisées correspondantes.
5. Relancer `npm run seo-crawl -- https://www.lesepavistespro.fr --idf-only` après déploiement et comparer à `seo-audit/crawl-final-idf-*.json`.
6. Fournir les `TODO(owner)` (§5) puis passer `verified: true` là où c'est justifié ; compléter l'adresse dans `lib/schema.ts` et créer le GBP (§6).
7. Surveiller à 4 semaines : impressions/clics sur les requêtes « épaviste + commune IDF » et « rachat voiture + commune IDF » (filtre pays FR, page contient `/ile-de-france` ou un slug de département IDF) ; positions des 16 hubs.
8. Mettre à jour l'article ZFE et `data/idf-facts.generated.ts` à la promulgation (ou non) du texte sur les ZFE.
