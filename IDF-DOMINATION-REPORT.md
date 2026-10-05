# Île-de-France domination — rapport final

**Branche** : `seo/idf-domination` (PR #1, fusionnée sur `main` le 20/09/2026 — 56 commits, un par tâche) · **Date** : 19 septembre 2026
> **Sprint 3 (5 octobre 2026)** : boucle Search Console, système de titres/descriptions, autorité des hubs, centres VHU, guides, marques et pages pro — voir **§11** ; la liste des actions du propriétaire est en **§11.0**.

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

> **À faire en premier :** `lesepavistespro.com` doit être ajouté au projet Vercel (domaine + `www`) pour que la redirection `.com → .fr` fonctionne — aujourd'hui le `.com` pointe encore vers l'ancien hébergeur et le proxy ne le voit jamais.

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

---

## 8. Revue indépendante, décisions closes et mise en production (19–20 septembre 2026)

### 8.1 Revue de la PR #1 (`fix(review)`, commit `a090a20`)
- **Sitemaps `main` → branche** (builds locaux comparés loc par loc, 36 792 → 36 797 URLs avant D3) : −`/cookies` (noindex, P1.4), −`vendee-85/montreuil` ×2 (P1.1), +8 articles IDF. 400 URLs nationales tirées au sort + les 3 retirées : toutes en 200 sur les deux builds ; les seuls canonicals modifiés sont les 32 pages à slug homonyme qui pointaient vers un autre département sur `main` et sont désormais auto-canoniques (P1.1).
- **Contenu Tier A/B** : aucun placeholder, anglais ou chiffre invérifiable. La relecture de 15 fiches a révélé de vraies erreurs, corrigées : six communes présentées comme membres de la Métropole du Grand Paris (Bezons, Massy, Chilly-Mazarin, Morsang-sur-Orge, Vigneux-sur-Seine, Vélizy) ne le sont pas ; Épinay-sur-Seine, Villeneuve-Saint-Georges et Limeil-Brévannes étaient placées dans la ZFE alors qu'elles sont au-delà de l'A86 ; plusieurs détails routiers non vérifiables retirés (« pont de Villeneuve », A14 « sous » Sartrouville, « tunnel » A86 à Versailles/Vitry, pont de Chatou pour Nanterre, fermetures de quais parisiens, fourrière de Bonneuil pour le 94) ; 5 superficies alignées sur l'INSEE. Les 195 couples population/superficie des intros sont maintenant vérifiés programmatiquement contre le jeu de données.
- **`proxy.ts`** : les 6 variantes (http, apex, majuscules, slash final, .com, combinées) donnent exactement **un** 308 vers l'URL canonique (test unitaire du proxy ; `next start` local n'honore pas l'en-tête Host).
- **JSON-LD** : `scripts/validate-jsonld.ts` (propriétés requises des nœuds de résultats enrichis, références `@id` résolues, une seule `FAQPage` et une seule entité business par page) — **0 erreur** sur 5 pages ; l'accueil émettait un second nœud `WebPage` anonyme pour le `speakable`, fusionné dans `#webpage`.

### 8.2 Décisions closes
| | Décision | Commit |
|---|---|---|
| D1 | Bloc `IdfExtraContent` retiré des pages Tier A uniquement (il ne contenait ni lien ni FAQ) ; conservé en Tier B/C | `9b96ca3` |
| D2 | Paray-Vieille-Poste (INSEE 91479) existe une seule fois, en Essonne ; **301** depuis `/epaviste/val-de-marne-94/paray-vieille-poste` et `/rachat-voiture/val-de-marne-94/paray-vieille-poste`. Audit INSEE ↔ département des 34 923 communes : c'était la **seule** commune IDF mal classée (les deux autres cas, Saint-Barthélemy et Saint-Martin sous 971, sont des COM et restent en l'état). Le générateur dérive désormais le département du code INSEE et non du code postal | `e20c195` |
| D3 | `PREFECTURE_SLUGS` (`lib/geo-targeting.ts`) construit depuis le COG INSEE 2025 (101 préfectures + 233 sous-préfectures, `scripts/generate-prefectures.ts` → `data/prefectures.generated.ts`), utilisé par `shouldNoIndex` et `shouldIncludeInSitemap` sans autre changement de stratégie. **+209 pages indexables par service (418 au total)** ; 18 473 URLs par service dans les sitemaps ; `lastmod` des familles static/régions/départements/villes fixé au 19/09/2026, date réelle des changements de gabarit | `d1f7091` |
| Hubs 77 | Index des 507 communes en `<a>` simples (plus de frontière client `next/link`, une classe par lettre, nom + slug seulement) : 355 → **336 Ko** (épaviste) et 321 Ko (rachat). Toujours > 200 Ko : le payload RSC de Next (≈ 188 Ko) reflète l'arbre complet de la page, et le brief impose les 507 liens dans le HTML — laissé tel quel | `93f3d14` |

### 8.3 Mise en production
- Pré-fusion : `npm run build` (2 857 pages), `seo-check` 94/94, crawl IDF exhaustif 2 598 URLs — 0 erreur, 2 avertissements (poids des hubs 77).
- PR #1 fusionnée sur `main` par **merge commit** `b548048` (56 commits, historique conservé). Déploiement Vercel production `READY` (statut GitHub `success`, ~5 min).

### 8.4 Vérification de la production (`https://www.lesepavistespro.fr`)
Crawl production : **2 598 URLs IDF (exhaustif) + 301 URLs nationales** — 0 erreur ; 2 avertissements (hubs 77 > 300 Ko) ; 2 598/2 598 pages IDF en 200, indexables, auto-canoniques ; 0 titre > 60 car., 0 lien cassé, 0 `FAQPage` multiple, 0 `TODO(owner)` rendu ; mots médians 2 848.

| Vérification | Résultat |
|---|---|
| `/robots.txt` | aucun `Disallow: /_next/static` ; `Sitemap: https://www.lesepavistespro.fr/sitemap.xml` seul ; **`SemrushBot-SA` (Site Audit) autorisé**, `SemrushBot` (crawler générique) bloqué — choix de P1.3 (remédiation) ; à lever si le crawler Semrush générique doit passer |
| `/sitemap.xml` | `sitemap-idf.xml` en première position |
| `/sitemap-idf.xml` | 200, 2 598 URLs ; toutes les URLs échantillonnées 200 + auto-canoniques + sans noindex ; `lastmod` = date de contenu fixe (2026-09-19 pour les pages modifiées par ce chantier, dates de publication pour le blog), pas l'heure de la requête |
| `/epaviste/seine-saint-denis-93/montreuil` | 200, H1 « Épaviste à Montreuil (93100) … », canonical = URL, `index, follow`, contenu rédigé (`handwritten`) |
| `/epaviste/hauts-de-seine-92/bagneux` | idem, Bagneux (92220) |
| `/rachat-voiture/seine-et-marne-77/chelles` | idem, « Rachat de voiture à Chelles (77500) … » |
| `/epaviste/paris-75/lyon` | **404** |
| `…/val-de-marne-94/paray-vieille-poste` (×2) | **301** → `…/essonne-91/paray-vieille-poste` |
| `https://www.lesepavistespro.fr/Epaviste` | 308 → `/epaviste` (1 saut) |
| `https://www.lesepavistespro.fr/epaviste/` | 308 → `/epaviste` (1 saut) |
| `http://www.lesepavistespro.fr/epaviste` | 308 → `https://www.lesepavistespro.fr/epaviste` (1 saut) |
| `https://lesepavistespro.fr/epaviste` (apex) | 307 → `https://www.lesepavistespro.fr/epaviste` (1 saut, redirection de domaine Vercel). ⚠️ Depuis le réseau de test, la plage `64.29.17.0/24` (enregistrement A de l'apex) ne répondait pas ; vérifié via une IP edge Vercel (`216.198.79.1`). À re-tester depuis un autre réseau. |
| `https://www.lesepavistespro.com/epaviste`, `http://lesepavistespro.com/…` | ⚠️ **Le `.com` n'est pas hébergé sur Vercel** : `lesepavistespro.com` et `www` pointent vers `195.35.49.218` (ancien site, 301 vers une URL `/epaviste-gratuit-en-france-…/`). La consolidation `.com → .fr` de `proxy.ts` ne peut agir que si le domaine est rattaché au projet Vercel — **action propriétaire** : ajouter `lesepavistespro.com` + `www` au projet Vercel (ou une redirection 301 vers `https://www.lesepavistespro.fr/$1` chez l'hébergeur actuel). |
| Accueil | `<title>` « Épaviste Île-de-France – Enlèvement d'épave gratuit 24h/24 », H1 « Épaviste en Île-de-France : enlèvement d'épave gratuit » |
| `/rachat-voiture/martinique` | 200, URL, canonical, `index, follow`, H1 et contenu inchangés ; le titre a perdu le suffixe « – Cash immédiat » (61 car. > budget de 60, règle P2.1) |

**Lighthouse mobile (production, depuis le poste de test)** — à lire avec précaution : TTFB mesuré 0,6–0,7 s dont ~0,5 s de DNS + connexion depuis ce réseau, et Chromium a échoué (`NO_FCP` / `PROTOCOL_TIMEOUT`) sur `/epaviste` et `/epaviste/paris-75` ; les scores locaux du même build restent la référence (100 / 96 / 95 / 96 / 95 / 96 / 100). Utiliser PageSpeed Insights (lab Google) pour la mesure officielle.

| Page | Perf | LCP | TBT | CLS |
|---|---|---|---|---|
| `/` | 72 | 5,2 s | 140 ms | 0 |
| `/epaviste` | non mesuré (NO_FCP) | | | |
| `/epaviste/ile-de-france` | 72 | 5,1 s | 130 ms | 0 |
| `/epaviste/paris-75` | non mesuré (NO_FCP) | | | |
| `/epaviste/hauts-de-seine-92/nanterre` | 69 | 5,9 s | 160 ms | 0 |
| `/rachat-voiture/hauts-de-seine-92/nanterre` | 73 | 4,9 s | 140 ms | 0 |
| `/blog/certificat-destruction-vhu-obligatoire` | 82 | 4,6 s | 140 ms | 0 |

---

## 9. Search Console — à faire (propriétaire)

1. **Sitemaps** → ajouter :
   - `https://www.lesepavistespro.fr/sitemap.xml`
   - `https://www.lesepavistespro.fr/sitemap-idf.xml`
2. **Inspection d'URL → Demander une indexation**, dans cet ordre :

   Hubs Île-de-France
   ```
   https://www.lesepavistespro.fr/epaviste/ile-de-france
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france
   ```
   16 pages départementales
   ```
   https://www.lesepavistespro.fr/epaviste/paris-75
   https://www.lesepavistespro.fr/epaviste/seine-et-marne-77
   https://www.lesepavistespro.fr/epaviste/yvelines-78
   https://www.lesepavistespro.fr/epaviste/essonne-91
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93
   https://www.lesepavistespro.fr/epaviste/val-de-marne-94
   https://www.lesepavistespro.fr/epaviste/val-d-oise-95
   https://www.lesepavistespro.fr/rachat-voiture/paris-75
   https://www.lesepavistespro.fr/rachat-voiture/seine-et-marne-77
   https://www.lesepavistespro.fr/rachat-voiture/yvelines-78
   https://www.lesepavistespro.fr/rachat-voiture/essonne-91
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93
   https://www.lesepavistespro.fr/rachat-voiture/val-de-marne-94
   https://www.lesepavistespro.fr/rachat-voiture/val-d-oise-95
   ```
   20 arrondissements de Paris (épaviste)
   ```
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-1er
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-2e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-3e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-4e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-5e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-6e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-7e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-8e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-9e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-10e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-11e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-12e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-13e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-14e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-15e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-16e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-17e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-18e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-19e
   https://www.lesepavistespro.fr/epaviste/paris-75/paris-20e
   ```
   30 premières communes Tier A hors Paris, par population (épaviste)
   ```
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93/st-denis
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/boulogne-billancourt
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93/montreuil
   https://www.lesepavistespro.fr/epaviste/val-d-oise-95/argenteuil
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/nanterre
   https://www.lesepavistespro.fr/epaviste/val-de-marne-94/vitry-sur-seine
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/asnieres-sur-seine
   https://www.lesepavistespro.fr/epaviste/val-de-marne-94/creteil
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/colombes
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93/aubervilliers
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93/aulnay-sous-bois
   https://www.lesepavistespro.fr/epaviste/yvelines-78/versailles
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/courbevoie
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/rueil-malmaison
   https://www.lesepavistespro.fr/epaviste/val-de-marne-94/champigny-sur-marne
   https://www.lesepavistespro.fr/epaviste/val-de-marne-94/st-maur-des-fosses
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93/noisy-le-grand
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93/drancy
   https://www.lesepavistespro.fr/epaviste/val-d-oise-95/cergy
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/levallois-perret
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/issy-les-moulineaux
   https://www.lesepavistespro.fr/epaviste/essonne-91/evry-courcouronnes
   https://www.lesepavistespro.fr/epaviste/val-de-marne-94/ivry-sur-seine
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/clichy
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/antony
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93/le-blanc-mesnil
   https://www.lesepavistespro.fr/epaviste/seine-saint-denis-93/pantin
   https://www.lesepavistespro.fr/epaviste/val-de-marne-94/villejuif
   https://www.lesepavistespro.fr/epaviste/hauts-de-seine-92/neuilly-sur-seine
   https://www.lesepavistespro.fr/epaviste/val-d-oise-95/sarcelles
   ```
   Les mêmes 30 en rachat
   ```
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93/st-denis
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/boulogne-billancourt
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93/montreuil
   https://www.lesepavistespro.fr/rachat-voiture/val-d-oise-95/argenteuil
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/nanterre
   https://www.lesepavistespro.fr/rachat-voiture/val-de-marne-94/vitry-sur-seine
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/asnieres-sur-seine
   https://www.lesepavistespro.fr/rachat-voiture/val-de-marne-94/creteil
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/colombes
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93/aubervilliers
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93/aulnay-sous-bois
   https://www.lesepavistespro.fr/rachat-voiture/yvelines-78/versailles
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/courbevoie
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/rueil-malmaison
   https://www.lesepavistespro.fr/rachat-voiture/val-de-marne-94/champigny-sur-marne
   https://www.lesepavistespro.fr/rachat-voiture/val-de-marne-94/st-maur-des-fosses
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93/noisy-le-grand
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93/drancy
   https://www.lesepavistespro.fr/rachat-voiture/val-d-oise-95/cergy
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/levallois-perret
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/issy-les-moulineaux
   https://www.lesepavistespro.fr/rachat-voiture/essonne-91/evry-courcouronnes
   https://www.lesepavistespro.fr/rachat-voiture/val-de-marne-94/ivry-sur-seine
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/clichy
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/antony
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93/le-blanc-mesnil
   https://www.lesepavistespro.fr/rachat-voiture/seine-saint-denis-93/pantin
   https://www.lesepavistespro.fr/rachat-voiture/val-de-marne-94/villejuif
   https://www.lesepavistespro.fr/rachat-voiture/hauts-de-seine-92/neuilly-sur-seine
   https://www.lesepavistespro.fr/rachat-voiture/val-d-oise-95/sarcelles
   ```
3. **Domaines** : rattacher `lesepavistespro.com` (+ `www`) au projet Vercel pour que la consolidation `.com → .fr` s'applique ; vérifier l'apex `lesepavistespro.fr` depuis un autre réseau (§8.4).
4. **Google Business Profile** : suivre le §6 — catégorie « Service d'enlèvement d'épaves », zone de service = Paris + les 8 départements, téléphone `06 02 42 73 45`, lien `https://www.lesepavistespro.fr/epaviste/ile-de-france`, horaires et adresse une fois les `TODO(owner)` fournis, description reprise de `getLocalBusinessSchema()`, photos réelles, avis réels uniquement.
5. À J+7 : contrôler dans Search Console « Pages » que les 418 pages de préfectures/sous-préfectures et les 195 communes Tier A passent en « Indexée » ; relancer `npm run seo-crawl -- https://www.lesepavistespro.fr --idf-only`.

---

## 10. Sprint 2 — intentions IDF, signaux de confiance, monitoring (20 septembre 2026, branche `seo/idf-sprint-2`)

### 10.1 Ce qui a été ajouté

| Tâche | Commit | Résultat |
|---|---|---|
| S2.0 | `f2f4a53` | `robots.txt` : `SemrushBot` (générique) autorisé en plus de `SemrushBot-SA` ; AhrefsBot / MJ12bot / DotBot toujours bloqués. Ligne « .com → Vercel » en tête du §5. |
| — | `fcc7195` | **Correction factuelle ZFE 2026** (99 phrases, 7 fichiers) : la suppression des ZFE votée au printemps 2026 a été **censurée par le Conseil constitutionnel** (décision n° 2026-903 DC du 21 mai 2026) ; période pédagogique sans verbalisation jusqu'au 31 décembre 2026 ; liste officielle des 77 communes (Paris + 59 entières + 17 partielles, dont Clamart et Villeneuve-la-Garenne ajoutées). Sources dans `scripts/generate-idf-facts.ts`. |
| S2.1 | `65fe718`, `cb400ef` | **23 pages « situation » Île-de-France** : 13 épaviste (`/epaviste/ile-de-france/<slug>`) + 10 rachat (`/rachat-voiture/ile-de-france/<slug>`), 1 181 à 1 400 mots rendus, 6 FAQ, `Service` + `FAQPage` + `BreadcrumbList`, liens vers les 2 hubs, les 8 départements, le service frère, 3 communes Tier A et les autres situations. Ajoutées à `sitemap-idf.xml`, aux hubs (« Situations particulières »), aux pages départementales et au footer (6 épaviste). Chaque affirmation juridique cite sa source (service-public.gouv.fr, Légifrance, MGP, Conseil constitutionnel) dans `data/idf-intents.ts` (`INTENT_SOURCES`). Aucun prix hors « gratuit ». Garde-fou : `checkIdfIntents()` dans `seo-check`. |
| S2.2 | `b88923e`, `44c0861` | **Profondeur Tier B** — audit avant : 0 page sous 500 mots, 4–6 faits locaux par page. Ajout d'un fait vérifiable supplémentaire : la **desserte ferroviaire** (Île-de-France Mobilités, open data ODbL, 1 240 gares → 343 communes via geo.api.gouv.fr), `data/idf-transport.generated.ts`, une phrase par service. 107 des 201 communes Tier B portent ce fait (les 94 autres n'ont pas de gare). |
| S2.3 | `727d2a4`, `e6c3fb6` | **`/avis`** : ce que le client peut attendre, comment ça se passe, CTA « Laisser un avis » **caché tant que `GBP_REVIEW_URL` est vide** (`lib/reviews.ts`, `TODO(owner)`) — la page explique que les avis sont recueillis via Google. Liste « Avis vérifiés » alimentée par `data/idf-testimonials.ts` (`verified: true` uniquement ; vide aujourd'hui, texte honnête). Aucune note, aucun compteur, aucun avis inventé. Variante `/avis?src=sms` et `?src=whatsapp`. Événement GA4 `review_cta_click`. Lien depuis le footer et la barre de confiance des heros IDF. |
| S2.4 | `d749070` | **Attribution** : paramètre `intent` + `page_type: 'intent'` sur tous les événements des pages situation ; `form_start` passe par `trackFormStart()` et porte les mêmes paramètres que les autres conversions ; champs cachés `pagePath` / `landingPath` / `intent` dans le formulaire (`lib/lead-attribution.ts`) → bloc **« Provenance »** dans l'e-mail Resend (HTML + texte). Destinataires et fournisseur inchangés. Script `npm run verify-ga4` (Chrome headless, `gtag` remplacé par un enregistreur). |
| S2.5 | `a645c38` | **Monitoring** : `scripts/seo-monitor.ts` + `.github/workflows/seo-monitor.yml` (lundi 06:00 Europe/Paris + déclenchement manuel) et `pr-check.yml` (tsc + seo-check + build sur chaque PR vers `main`). |

### 10.2 Tier B — avant / après (201 communes, `npx tsx scripts/idf-content-similarity.ts`)

| Service | Mots uniques min · p50 · max — avant | — après | Jaccard max — avant | — après | Pages < 500 mots |
|---|---|---|---|---|---|
| épaviste B | 576 · 623 · 674 | 576 · 642 · 714 | 0,560 | **0,542** | 0 → 0 |
| rachat B | 514 · 558 · 608 | 521 · 580 · 659 | 0,516 | **0,516** | 0 → 0 |

Objectif tenu : 100 % des Tier B ≥ 500 mots, similarité max < 0,60. Tier A non touché (hors correction ZFE).

### 10.3 Événements GA4 — noms réels et paramètres (vérifiés sur le build de production, `npm run verify-ga4`)

Le brief nomme `call_click` / `whatsapp_click` / `form_submit` ; les noms **déjà en production** (et conservés pour ne pas casser l'historique GA4) sont :

| Brief | Nom réel de l'événement | Paramètres vérifiés |
|---|---|---|
| `call_click` | `click_call` | `service`, `department_slug`, `city_slug`, `is_idf`, `intent`, `page_type`, `traffic_source` |
| `whatsapp_click` | `click_whatsapp` | idem |
| `form_start` | `form_start` | idem + `form_service`, `page_path` |
| `form_submit` | `lead_form_submit` | idem |

Vérification : 5 pages (2 situations, 1 commune IDF, 1 département IDF, 1 commune hors IDF) × 4 événements = 20/20 ✅, et les champs `pagePath` / `landingPath` / `intent` arrivent bien dans le POST `/api/contact` (5/5) — d'abord sur le build de production local, puis **sur `https://www.lesepavistespro.fr` après la mise en production de la PR #3 (merge `81e5cd1`, 20 septembre 2026) : 20/20 + 5/5** ✅. La même vérification tourne chaque semaine contre la production dans le workflow (étape informative).

### 10.4 Flux d'avis — message prêt à envoyer (SMS / WhatsApp)

À envoyer après l'enlèvement ou le paiement, une fois `GBP_REVIEW_URL` renseigné (tant qu'il est vide, la page explique la démarche sans bouton) :

> Bonjour [Prénom], merci d'avoir fait appel aux Épavistes Pro pour votre [véhicule] à [commune]. Si tout s'est bien passé, un avis Google nous aide vraiment : https://www.lesepavistespro.fr/avis?src=sms — ça prend une minute. Bonne journée, l'équipe Les Épavistes Pro · 06 02 42 73 45

Variante WhatsApp : même texte avec `?src=whatsapp`. Le paramètre `src` alimente `review_src` dans l'événement `review_cta_click`.

### 10.5 Monitoring hebdomadaire — ce que fait le job

1. Crawl production : **toutes** les URL Île-de-France + échantillon national de 300 URL (`seo-crawl --idf-only --limit=300`).
2. `validate-jsonld` sur 10 pages de référence.
3. Test de redirection sur 6 variantes (http, apex, majuscules, slash final, `.com`) : exactement un saut vers l'URL canonique.
4. `robots.txt` (Googlebot autorisé, `/_next/static` jamais bloqué, `/api/` bloqué, Semrush autorisé, index de sitemaps listé) + index de sitemaps (200, nombre d'enfants stable).
5. Lighthouse mobile sur 6 pages : budgets perf ≥ 90, LCP ≤ 2,5 s, CLS ≤ 0,1 — un dépassement est un avertissement, une **erreur au 2ᵉ run consécutif**.

Toute erreur fait échouer le job et ouvre (ou met à jour) l'issue **« SEO regression <date> »** (label `seo-regression`) ; le run vert suivant la ferme. Seul le résumé `seo-audit/monitor/<date>.json` est commité sur `main` ; le rapport de crawl complet part en artefact (90 jours). Les variantes `.com` restent des **avertissements** tant que le domaine n'est pas rattaché à Vercel (aujourd'hui `www.lesepavistespro.com` répond 301 → `https://lesepavistespro.com/` servi par un **LiteSpeed** — l'ancien hébergeur — et `/rachat-voiture/` y renvoie 404).

Répétition locale (build de production, sans CDN) : crawl 2 922 pages, 0 erreur ; JSON-LD 10/10 ; robots 7/7 ; Lighthouse local LCP 3,1–3,6 s sous throttling simulé 4G — la valeur qui compte est celle mesurée sur Vercel par le premier run (voir §8.4 pour les mesures antérieures).

### 10.6 Liste propriétaire mise à jour

| # | À faire | Où |
|---|---|---|
| 1 | **Rattacher `lesepavistespro.com` (+ `www`) au projet Vercel** — le `.com` pointe encore vers l'ancien hébergeur (LiteSpeed) ; sans cela la consolidation `.com → .fr` n'existe pas | Vercel → Domains |
| 2 | **URL d'avis Google Business Profile** (bouton « Laisser un avis » sur `/avis`) | `lib/reviews.ts` → `GBP_REVIEW_URL` |
| 3 | Faits métier toujours vides (adresse, SIRET, année de création, horaires, effectif, délai de rappel, clients servis, validité de l'agrément VHU) — tous les garde-fous et textes de repli restent en place | §5 |
| 4 | Recommandation : dans GitHub → Settings → Branches, exiger le check **« PR check »** sur `main` | GitHub |
| 5 | **Search Console → Inspection d'URL → Demander une indexation** pour les 24 nouvelles pages ci-dessous (le sitemap `sitemap-idf.xml` les contient déjà) | Search Console |

```
   https://www.lesepavistespro.fr/epaviste/ile-de-france/sans-carte-grise
   https://www.lesepavistespro.fr/epaviste/ile-de-france/parking-souterrain
   https://www.lesepavistespro.fr/epaviste/ile-de-france/voiture-brulee
   https://www.lesepavistespro.fr/epaviste/ile-de-france/vehicule-gage
   https://www.lesepavistespro.fr/epaviste/ile-de-france/succession-deces
   https://www.lesepavistespro.fr/epaviste/ile-de-france/voiture-abandonnee-voie-publique
   https://www.lesepavistespro.fr/epaviste/ile-de-france/fourriere
   https://www.lesepavistespro.fr/epaviste/ile-de-france/utilitaire-camionnette
   https://www.lesepavistespro.fr/epaviste/ile-de-france/moto-scooter
   https://www.lesepavistespro.fr/epaviste/ile-de-france/camping-car
   https://www.lesepavistespro.fr/epaviste/ile-de-france/vehicule-accidente
   https://www.lesepavistespro.fr/epaviste/ile-de-france/epave-entreprise-flotte
   https://www.lesepavistespro.fr/epaviste/ile-de-france/zfe-vieux-vehicule
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/sans-controle-technique
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/voiture-accidentee
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/moteur-hs
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/boite-de-vitesses-hs
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/voiture-en-panne
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/fort-kilometrage
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/utilitaire
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/voiture-non-roulante
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/succession
   https://www.lesepavistespro.fr/rachat-voiture/ile-de-france/vehicule-gage
   https://www.lesepavistespro.fr/avis
```


---

## 11. Sprint 3 — transformer les impressions Île-de-France en clics (5 octobre 2026, branche `seo/idf-sprint-3`)

### 11.0 À faire par le propriétaire (en premier)

| # | Action | Où | Effet |
|---|---|---|---|
| 1 | **URL publique de la fiche Google Business Profile** + **lien « Laisser un avis »** + **NAP exact de la fiche** (nom, adresse ou zone de service, téléphone) | `lib/nap.ts` → `GBP_PROFILE_URL`, `streetAddress`… ; `lib/reviews.ts` → `GBP_REVIEW_URL` | `sameAs` + `hasMap` dans le schéma, bouton d'avis sur `/avis`, NAP identique au caractère près sur `/contact`, le pied de page et le schéma |
| 2 | Dans la fiche GBP, champ « Site web » : `https://www.lesepavistespro.fr/?utm_source=google&utm_medium=gbp` | Google Business Profile | Trafic GBP isolé dans GA4 |
| 3 | **Ré-export Search Console propre** : Performances → Résultats de recherche, 3 mois, **aucun filtre** autre que Pays = France, puis « Exporter » ; déposer les 7 CSV dans `seo-audit/gsc/<date>/` et lancer `npm run seo:loop`. Mieux : créer le compte de service (§11.3) | Search Console | L'export du 5 octobre est un **échantillon** : 83 clics dans les pages contre 2 761 dans le graphique |
| 4 | **Rattacher `lesepavistespro.com` (+ `www`) au projet Vercel** (toujours sur l'ancien hébergeur) | Vercel → Domains | Consolidation `.com → .fr` |
| 5 | Soumettre les **25 annuaires** de `seo-audit/citations.csv` avec le NAP indiqué, puis les 10 prises de contact (modèles dans `seo-audit/outreach-templates.md`) | Annuaires | Autorité locale (citations + liens) |
| 6 | Faits métier : numéro d'agrément et nom du **centre VHU partenaire** (les pages `/centre-vhu-agree/*` disent « centre VHU agréé partenaire » sans numéro), politique de prix des **caravanes**, adresse, SIRET, horaires réels, délai de rappel réel | `data/centre-vhu.ts`, `data/idf-intents.ts` (caravane), §5 | Remplacer les textes de repli honnêtes |
| 7 | Demander l'indexation des URL listées en §11.9 | Search Console → Inspection d'URL | |
| 8 | Lire le test CTR **à partir du 26 octobre 2026** (3 semaines après la mise en production ; repousser d'autant si le déploiement est plus tardif) | `npm run seo:loop` | Garder ou retirer le ☎ des descriptions |

### 11.1 Ce que disent les données (import du 5 octobre 2026)

- `npm run gsc-import` retrouve les chiffres du brief : Île-de-France (hors accueil) = **8 957 impressions (44 %) et 11 clics (13 %)** des pages exportées.
- ⚠️ **Échantillon** : les pages exportées totalisent 83 clics pour 2 761 dans le graphique quotidien (écart 97 %). Le script l'affiche en rouge à chaque import ; les tendances sont exploitables, pas les valeurs absolues.
- L'export de l'interface ne contient **pas** les couples page × requête : en mode CSV, la page d'atterrissage d'une requête est **inférée** (page « naturelle » si elle a des impressions, sinon son parent le plus proche). Le mode API (§11.3) donne les couples exacts. L'import du 2 janvier 2026 (même dossier de téléchargements) a été versé dans `seo-audit/gsc-history/` pour mesurer les baisses.
- Clusters (requêtes) : « autour de moi » 45 requêtes, marque (« epaviste pro », « l'epaviste pro », « avis sur l'epaviste-pro »…), **centre VHU 921 impressions** (le brief annonçait 918), moto/scooter/caravane 294.

### 11.2 Striking distance — avant (T1, 34 pages IDF, ≥ 20 impressions, position 4–20)

Score = impressions × (CTR attendu à (position − 3) − CTR actuel). « Titre » / « H2 » : la requête apparaît-elle telle quelle (HTML de production du 5 octobre) ? Rapport complet : `seo-audit/striking-distance.md`.

| # | Page | Impr. | Pos. | CTR | CTR attendu | Score | Requête principale | Titre | H2 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `/epaviste/seine-et-marne-77/annet-sur-marne` | 93 | 4,1 | 0,0 % | 7,9 % | 25.1 | épaviste annet-sur-marne | ✅ | — |
| 2 | `/epaviste/paris-75` | 1651 | 15,8 | 0,2 % | 1,0 % | 18.8 | epaviste paris | ✅ | — |
| 3 | `/epaviste/seine-et-marne-77/quincy-voisins` | 48 | 4,2 | 0,0 % | 7,8 % | 12.0 | épaviste quincy-voisins | ✅ | — |
| 4 | `/epaviste/seine-et-marne-77/trilport` | 69 | 5,4 | 0,0 % | 5,7 % | 9.2 | épaviste trilport | ✅ | — |
| 5 | `/epaviste/seine-et-marne-77/esbly` | 44 | 4,6 | 0,0 % | 7,4 % | 8.8 | épaviste esbly | ✅ | — |
| 6 | `/epaviste/seine-et-marne-77/champagne-sur-seine` | 40 | 4,8 | 0,0 % | 7,2 % | 6.8 | épaviste champagne-sur-seine | ✅ | — |
| 7 | `/epaviste/ile-de-france` | 474 | 15,7 | 0,0 % | 1,0 % | 6.3 | epaviste idf | — | — |
| 8 | `/rachat-voiture/seine-et-marne-77/brou-sur-chantereine` | 126 | 9,0 | 0,0 % | 2,9 % | 5.0 | — | ? | ? |
| 9 | `/rachat-voiture/seine-saint-denis-93` | 43 | 6,0 | 2,3 % | 4,0 % | 3.7 | — | ? | ? |
| 10 | `/epaviste/seine-et-marne-77/mareuil-les-meaux` | 53 | 8,1 | 0,0 % | 3,2 % | 3.5 | épaviste mareuil-lès-meaux | ✅ | — |
| 11 | `/rachat-voiture/yvelines-78/le-chesnay-rocquencourt` | 97 | 11,1 | 0,0 % | 1,5 % | 3.1 | — | ? | ? |
| 12 | `/epaviste/seine-saint-denis-93/bagnolet` | 85 | 11,7 | 0,0 % | 1,4 % | 2.5 | épaviste bagnolet | ✅ | — |
| 13 | `/epaviste/seine-et-marne-77/serris` | 58 | 9,1 | 0,0 % | 2,8 % | 2.3 | épaviste serris | ✅ | — |
| 14 | `/epaviste/seine-et-marne-77/isles-les-villenoy` | 26 | 7,2 | 0,0 % | 3,6 % | 2.0 | — | ? | ? |
| 15 | `/rachat-voiture/seine-et-marne-77/varennes-sur-seine` | 53 | 9,9 | 0,0 % | 2,5 % | 1.9 | — | ? | ? |
| 16 | `/epaviste/seine-saint-denis-93/la-courneuve` | 57 | 10,7 | 0,0 % | 1,8 % | 1.9 | épaviste la courneuve | ✅ | — |
| 17 | `/epaviste/val-de-marne-94/l-hay-les-roses` | 68 | 12,5 | 0,0 % | 1,4 % | 1.8 | épaviste l'haÿ-les-roses | ✅ | — |
| 18 | `/rachat-voiture/seine-et-marne-77/coulommiers` | 70 | 13,0 | 0,0 % | 1,3 % | 1.7 | — | ? | ? |
| 19 | `/epaviste/seine-saint-denis-93/villemomble` | 49 | 10,4 | 0,0 % | 2,1 % | 1.7 | épaviste villemomble | ✅ | — |
| 20 | `/epaviste/seine-et-marne-77/souppes-sur-loing` | 45 | 9,6 | 0,0 % | 2,7 % | 1.7 | épaviste souppes-sur-loing | ✅ | — |
| 21 | `/rachat-voiture/seine-et-marne-77/le-chatelet-en-brie` | 57 | 12,9 | 0,0 % | 1,3 % | 1.4 | — | ? | ? |
| 22 | `/epaviste/yvelines-78/sartrouville` | 65 | 15,9 | 0,0 % | 1,0 % | 0.8 | épaviste sartrouville | ✅ | — |
| 23 | `/epaviste/seine-et-marne-77/nangis` | 21 | 10,8 | 0,0 % | 1,7 % | 0.7 | épaviste nangis | ✅ | — |
| 24 | `/epaviste/val-de-marne-94/alfortville` | 40 | 15,5 | 0,0 % | 1,1 % | 0.5 | épaviste alfortville | ✅ | — |
| 25 | `/epaviste/val-d-oise-95` | 47 | 17,8 | 0,0 % | 0,8 % | 0.5 | épaviste bezons | — | — |
| 26 | `/epaviste/seine-et-marne-77/lagny-sur-marne` | 36 | 16,1 | 0,0 % | 1,0 % | 0.5 | épaviste lagny-sur-marne | ✅ | — |
| 27 | `/epaviste/val-de-marne-94/valenton` | 40 | 17,4 | 0,0 % | 0,9 % | 0.5 | epaviste valenton | ✅ | — |
| 28 | `/epaviste/yvelines-78/poissy` | 45 | 19,2 | 0,0 % | 0,7 % | 0.4 | épaviste poissy | ✅ | — |
| 29 | `/epaviste/val-de-marne-94/maisons-alfort` | 30 | 14,5 | 0,0 % | 1,2 % | 0.4 | épaviste maisons-alfort | ✅ | — |
| 30 | `/epaviste/seine-saint-denis-93/livry-gargan` | 34 | 16,3 | 0,0 % | 1,0 % | 0.4 | épaviste livry-gargan | ✅ | — |
| 31 | `/epaviste/seine-saint-denis-93/le-blanc-mesnil` | 40 | 19,1 | 0,0 % | 0,7 % | 0.4 | épaviste le blanc-mesnil | ✅ | — |
| 32 | `/epaviste/paris-75/paris-10e` | 27 | 14,4 | 0,0 % | 1,2 % | 0.4 | — | ? | ? |
| 33 | `/epaviste/seine-et-marne-77/champs-sur-marne` | 21 | 14,3 | 0,0 % | 1,2 % | 0.3 | épaviste champs-sur-marne | ✅ | — |
| 34 | `/epaviste/hauts-de-seine-92/chatenay-malabry` | 21 | 18,7 | 0,0 % | 0,7 % | 0.2 | épaviste châtenay-malabry | ✅ | — |

T2 (snippet à corriger) : 20 pages, dont 10 hors IDF — toutes reprises par le nouveau système de titres/descriptions (S3.2) et réparties dans le test CTR. T3 (requête sans la bonne page) : 43 requêtes, les 15 premières :

| Requête | Impr. | Pos. | Page qui reçoit les impressions (inférée) | Page recommandée |
|---|---|---|---|---|
| enlevement vhu contes | 147 | 53,0 | `/epaviste/provence-alpes-cote-d-azur` | `/epaviste/alpes-maritimes-06/contes` |
| épaviste saint-germain-en-laye | 135 | 17,0 | `/epaviste/yvelines-78` | `/epaviste/yvelines-78/st-germain-en-laye` |
| épaviste bezons | 130 | 48,6 | `/epaviste/val-d-oise-95` | `/epaviste/val-d-oise-95/bezons` |
| épaviste le chesnay-rocquencourt | 120 | 17,2 | `/epaviste/yvelines-78` | `/epaviste/yvelines-78/le-chesnay-rocquencourt` |
| épaviste brou-sur-chantereine | 119 | 5,9 | `/epaviste/ile-de-france` | `/epaviste/seine-et-marne-77/brou-sur-chantereine` |
| épaviste vincennes | 117 | 41,7 | `/epaviste/val-de-marne-94` | `/epaviste/val-de-marne-94/vincennes` |
| épaviste avignon | 114 | 50,7 | `/epaviste/vaucluse-84` | `/epaviste/vaucluse-84/avignon` |
| destruction véhicules quincieux | 109 | 7,2 | `/epaviste/auvergne-rhone-alpes` | `/epaviste/rhone-69/quincieux` |
| voitures à la casse quincieux | 95 | 8,0 | `/epaviste/auvergne-rhone-alpes` | `/epaviste/rhone-69/quincieux` |
| épaviste saint-mammès | 93 | 5,3 | `/epaviste/ile-de-france` | `/epaviste/seine-et-marne-77/st-mammes` |
| vendre sa voiture courchevel | 92 | 66,8 | `/rachat-voiture/savoie-73` | `/rachat-voiture/savoie-73/courchevel` |
| centre vhu 972 | 85 | 29,4 | `/epaviste/martinique-972` | `/centre-vhu-agree/martinique-972` |
| épaviste avon | 82 | 13,2 | `/epaviste/ile-de-france` | `/epaviste/seine-et-marne-77/avon` |
| épaviste ivry-sur-seine | 78 | 43,0 | `/epaviste/val-de-marne-94` | `/epaviste/val-de-marne-94/ivry-sur-seine` |
| épaviste cergy | 73 | 50,7 | `/epaviste/val-d-oise-95` | `/epaviste/val-d-oise-95/cergy` |

Les 5 requêtes « centre vhu {département} » de T3 ont désormais leur page (S3.4). Les autres T3 (communes dont la page n'a pas d'impressions : Bezons, Saint-Germain-en-Laye, Le Chesnay, Vincennes…) sont des pages existantes, désormais liées depuis la première phrase de chaque commune vers son département et réciproquement ; à relire au prochain import.

### 11.3 La boucle Search Console (S3.1)

- `npm run gsc-import` (CSV : en-têtes FR/EN, BOM, UTF-16 ; `Filtres.csv` gardé comme métadonnées ; fichiers GA4 ignorés) → `seo-audit/gsc-latest.json` (par page : clics, impressions, CTR, position, requêtes principales, `is_idf`, `service`, `page_type`, `tier` ; par requête : `is_idf_intent`, `cluster`, page naturelle, page d'atterrissage).
- `npm run striking-distance` → `seo-audit/striking-distance.md` + `.json` (T1, T2, T3, cannibalisation, baisses vs l'import précédent).
- `npm run seo:loop` = import → rapport → top 20 actions. Le workflow hebdomadaire `seo-monitor.yml` le lance en **mode API** dès que les secrets existent, commite `seo-audit/gsc-history/<date>.json` et ouvre/met à jour l'issue **« SEO loop <AAAA-MM> »** (label `seo-loop`), avec la lecture du test CTR.
- **Mode API — 5 étapes** :
  1. Google Cloud Console → créer un projet, activer l'API **Google Search Console API**.
  2. IAM → Comptes de service → créer un compte, puis « Clés » → ajouter une clé **JSON** (téléchargée une seule fois).
  3. Search Console → Paramètres → Utilisateurs et autorisations → ajouter l'e-mail du compte de service avec le droit **Restreint** (lecture).
  4. GitHub → Settings → Secrets and variables → Actions : `GSC_SERVICE_ACCOUNT_JSON` = contenu du fichier JSON ; `GSC_SITE_URL` = `sc-domain:lesepavistespro.fr` (propriété domaine) ou `https://www.lesepavistespro.fr/`.
  5. Actions → « SEO monitor » → *Run workflow* : l'issue « SEO loop » doit apparaître. En local : `GSC_SERVICE_ACCOUNT_JSON=./cle.json GSC_SITE_URL=… npm run seo:loop`.
- Le dépôt étant **public**, les exports bruts et `gsc-latest.json` restent ignorés par git ; seuls l'historique compact, le rapport, le test CTR et le plan de citations sont versionnés.

### 11.4 Titres et descriptions (S3.2, S3.1.c)

Les générateurs de `lib/seo.ts` ont été reconstruits pour un mobile : la commune d'abord, le service, « gratuit » / « cash », la disponibilité, une preuve, le téléphone.
- Titres ≤ 60 (marque seulement si elle tient, nom de commune jamais tronqué) : `Épaviste {Ville} – Enlèvement d'épave gratuit 24h/24` (repli sans « 24h/24 », puis plus court), `Rachat voiture {Ville} – Cash, sans CT, en 24h` (« en 24h » seulement en IDF, où le site annonce ce délai), `Épaviste {Département} ({code}) – Gratuit, agréé VHU`, `Épaviste Paris – Enlèvement d'épave gratuit 24h/24`, hubs IDF selon le brief ; accueil `Les Épavistes Pro – Épaviste gratuit en Île-de-France 24h/24`.
- Descriptions 130–155 caractères (**37 199 / 37 200** pages générées ; la dernière à 129), commune en tête, preuve en rotation par département × tier, délai par département (2 h en petite couronne, 24 h ailleurs — la production promettait « sous 2h » à des villages de Seine-et-Marne dont la page disait 24 h).
- Homonymes : le code département est ajouté quand le **nom affiché** est partagé (le slug `franconville-la-garenne` s'affiche « Franconville », comme Franconville 54) — 5 doublons de titres évités.
- Marque : `alternateName` = « Les Epavistes Pro », « Épavistes Pro » (le générique « Épaviste France » retiré) ; `/avis` → « Avis Les Épavistes Pro – Témoignages clients » ; phrase neutre sur `/avis` et `/mentions-legales` : « Les Épavistes Pro (lesepavistespro.fr) est une société indépendante, à ne pas confondre avec d'autres enseignes au nom proche. »
- Garde-fou `scripts/check-metadata.ts` (dans `seo-check`) : 37 200 pages — titre ≤ 60, description 110–160, aucun doublon, nom de lieu en tête, aucun ☎ dans un titre.
- T1 (34 pages) : seule `/epaviste/ile-de-france` avait besoin d'un titre spécifique (« Épaviste IDF (Île-de-France) – Enlèvement gratuit 24h/24 ») ; chaque page reçoit un H2 qui répond à sa requête (104–138 mots, faits publics uniquement), 3 liens internes avec la requête en ancre depuis les 3 communes les plus proches (hubs : hubs voisins), et un `lastmod` au 5 octobre.

**Journal des changements (T1 + T2, 44 pages ; « ancien » = production du 5 octobre, « nouveau » = build de la branche)** :

| Page | Tâche | Cohorte CTR | Ancien titre | Nouveau titre | Ancienne description | Nouvelle description |
|---|---|---|---|---|---|---|
| `/epaviste/seine-et-marne-77/annet-sur-marne` | T1+T2 | Tél. | Épaviste Annet-sur-Marne (77410) \| Les Épavistes Pro | Épaviste Annet-sur-Marne – Enlèvement d'épave gratuit 24h/24 (60) | Épaviste agréé VHU à Annet-sur-Marne (77410). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Annet-sur-Marne (77410). Enlèvement d'épave gratuit, intervention sous 24 h, cession faite pour vous. Tél. 06 02 42 73 45 (142) |
| `/epaviste/paris-75` | T1 | — | Épaviste Paris (75) – Gratuit 24h \| Les Épavistes Pro | Épaviste Paris – Enlèvement d'épave gratuit 24h/24 (50) | Épaviste agréé VHU Paris (75). Enlèvement d'épave GRATUIT 24h/24, intervention sous 2h. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Paris (75) : enlèvement d'épave gratuit, intervention sous 2 h, certificat de destruction remis. ☎ 06 02 42 73 45 (134) |
| `/epaviste/seine-et-marne-77/quincy-voisins` | T1+T2 | Tél. | Épaviste Quincy-Voisins – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Quincy-Voisins – Enlèvement d'épave gratuit 24h/24 (59) | Épaviste agréé VHU à Quincy-Voisins (77860). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Quincy-Voisins (77860). Enlèvement d'épave gratuit, intervention sous 24 h, sous-sol et fourrière compris. Tél. 06 02 42 73 45 (147) |
| `/epaviste/seine-et-marne-77/trilport` | T1+T2 | ☎ | Épaviste Trilport – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Trilport – Enlèvement d'épave gratuit 24h/24 (53) | Épaviste agréé VHU à Trilport (77470). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Trilport (77470). Enlèvement d'épave gratuit, intervention sous 24 h, sous-sol et fourrière compris. ☎ 06 02 42 73 45 (138) |
| `/epaviste/seine-et-marne-77/esbly` | T1+T2 | Tél. | Épaviste Esbly (77450) – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Esbly – Enlèvement d'épave gratuit 24h/24 (50) | Épaviste agréé VHU à Esbly (77450). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Esbly (77450). Enlèvement d'épave gratuit, intervention sous 24 h, sous-sol et fourrière compris. Tél. 06 02 42 73 45 (138) |
| `/epaviste/seine-et-marne-77/champagne-sur-seine` | T1+T2 | Tél. | Épaviste Champagne-sur-Seine (77430) \| Les Épavistes Pro | Épaviste Champagne-sur-Seine – Enlèvement d'épave gratuit (57) | Épaviste agréé VHU à Champagne-sur-Seine (77430). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Champagne-sur-Seine (77430). Enlèvement d'épave gratuit, intervention sous 24 h, sous-sol et fourrière compris. Tél. 06 02 42 73 45 (152) |
| `/epaviste/ile-de-france` | T1 | — | Épaviste Île-de-France – Gratuit 24/7 \| Les Épavistes Pro | Épaviste IDF (Île-de-France) – Enlèvement gratuit 24h/24 (56) | Épaviste agréé VHU en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Enlèvement GRATUIT 24h/24, intervention sous 2h. ☎ 06 02 42 73 45 | Épaviste agréé VHU en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95) : enlèvement d'épave gratuit 24h/24, sous 2 h en petite couronne. ☎ 06 02 42 73 45 (151) |
| `/rachat-voiture/seine-et-marne-77/brou-sur-chantereine` | T1+T2 | ☎ | Rachat voiture Brou-sur-Chantereine \| Les Épavistes Pro | Rachat voiture Brou-sur-Chantereine – Cash, sans CT, en 24h (59) | Rachat voiture à Brou-sur-Chantereine (77177). Paiement cash le jour de l'enlèvement, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture à Brou-sur-Chantereine (77177) : paiement cash le jour de l'enlèvement, avec ou sans CT, offre ferme sur photos. ☎ 06 02 42 73 45 (144) |
| `/rachat-voiture/seine-saint-denis-93` | T1 | — | Rachat voiture Seine-Saint-Denis – Cash \| Les Épavistes Pro | Rachat voiture Seine-Saint-Denis (93) – Cash (44) | Rachat voiture Seine-Saint-Denis (93). Cash immédiat, sans CT, tous véhicules acceptés. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture en Seine-Saint-Denis (93) : paiement cash le jour de l'enlèvement, avec ou sans CT, estimation gratuite. ☎ 06 02 42 73 45 (136) |
| `/epaviste/seine-et-marne-77/mareuil-les-meaux` | T1+T2 | ☎ | Épaviste Mareuil-lès-Meaux (77100) \| Les Épavistes Pro | Épaviste Mareuil-lès-Meaux – Enlèvement d'épave gratuit (55) | Épaviste agréé VHU à Mareuil-lès-Meaux (77100). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Mareuil-lès-Meaux (77100). Enlèvement d'épave gratuit, intervention sous 24 h, cession faite pour vous. ☎ 06 02 42 73 45 (141) |
| `/rachat-voiture/yvelines-78/le-chesnay-rocquencourt` | T1 | — | Rachat voiture Le Chesnay-Rocquencourt \| Les Épavistes Pro | Rachat voiture Le Chesnay-Rocquencourt – Cash, sans CT (54) | Rachat voiture à Le Chesnay-Rocquencourt (78150). Paiement cash le jour de l'enlèvement, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture au Chesnay-Rocquencourt (78150) : paiement cash le jour de l'enlèvement, avec ou sans CT, offre ferme sur photos. ☎ 06 02 42 73 45 (145) |
| `/epaviste/seine-saint-denis-93/bagnolet` | T1 | — | Épaviste Bagnolet – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Bagnolet – Enlèvement d'épave gratuit 24h/24 (53) | Épaviste agréé VHU à Bagnolet (93170). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Bagnolet (93170). Enlèvement d'épave gratuit, intervention sous 2 h, déclaration de cession faite pour vous. ☎ 06 02 42 73 45 (146) |
| `/epaviste/seine-et-marne-77/serris` | T1+T2 | Tél. | Épaviste Serris (77700) – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Serris – Enlèvement d'épave gratuit 24h/24 (51) | Épaviste agréé VHU à Serris (77700). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Serris (77700). Enlèvement d'épave gratuit, intervention sous 24 h, sous-sol et fourrière compris. Tél. 06 02 42 73 45 (139) |
| `/epaviste/seine-et-marne-77/isles-les-villenoy` | T1 | — | Épaviste Isles-lès-Villenoy (77450) \| Les Épavistes Pro | Épaviste Isles-lès-Villenoy – Enlèvement d'épave gratuit (56) | Épaviste agréé VHU à Isles-lès-Villenoy (77450). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Isles-lès-Villenoy (77450). Enlèvement d'épave gratuit, intervention sous 24 h, cession faite pour vous. ☎ 06 02 42 73 45 (142) |
| `/rachat-voiture/seine-et-marne-77/varennes-sur-seine` | T1+T2 | Tél. | Rachat voiture Varennes-sur-Seine – Cash \| Les Épavistes Pro | Rachat voiture Varennes-sur-Seine – Cash, sans CT, en 24h (57) | Rachat voiture à Varennes-sur-Seine (77130). Paiement cash le jour de l'enlèvement, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture à Varennes-sur-Seine (77130) : paiement cash le jour de l'enlèvement, avec ou sans CT, cession déclarée pour vous. Tél. 06 02 42 73 45 (149) |
| `/epaviste/seine-saint-denis-93/la-courneuve` | T1 | — | Épaviste La Courneuve – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste La Courneuve – Enlèvement d'épave gratuit 24h/24 (57) | Épaviste agréé VHU à La Courneuve (93120). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à La Courneuve (93120). Enlèvement d'épave gratuit, intervention sous 2 h, déclaration de cession faite pour vous. ☎ 06 02 42 73 45 (150) |
| `/epaviste/val-de-marne-94/l-hay-les-roses` | T1 | — | Épaviste L'Haÿ-les-Roses (94240) \| Les Épavistes Pro | Épaviste L'Haÿ-les-Roses – Enlèvement d'épave gratuit 24h/24 (60) | Épaviste agréé VHU à L'Haÿ-les-Roses (94240). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à L'Haÿ-les-Roses (94240). Enlèvement d'épave gratuit, intervention sous 2 h, véhicule roulant ou non. ☎ 06 02 42 73 45 (138) |
| `/rachat-voiture/seine-et-marne-77/coulommiers` | T1 | — | Rachat voiture Coulommiers – Cash \| Les Épavistes Pro | Rachat voiture Coulommiers – Cash, sans CT, en 24h (50) | Rachat voiture à Coulommiers (77120). Paiement cash le jour de l'enlèvement, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture à Coulommiers (77120) : paiement cash le jour de l'enlèvement, avec ou sans CT, offre ferme sur photos. ☎ 06 02 42 73 45 (135) |
| `/epaviste/seine-saint-denis-93/villemomble` | T1 | — | Épaviste Villemomble – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Villemomble – Enlèvement d'épave gratuit 24h/24 (56) | Épaviste agréé VHU à Villemomble (93250). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Villemomble (93250). Enlèvement d'épave gratuit, intervention sous 2 h, déclaration de cession faite pour vous. ☎ 06 02 42 73 45 (149) |
| `/epaviste/seine-et-marne-77/souppes-sur-loing` | T1+T2 | ☎ | Épaviste Souppes-sur-Loing (77460) \| Les Épavistes Pro | Épaviste Souppes-sur-Loing – Enlèvement d'épave gratuit (55) | Épaviste agréé VHU à Souppes-sur-Loing (77460). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Souppes-sur-Loing (77460). Enlèvement d'épave gratuit, intervention sous 24 h, cession faite pour vous. ☎ 06 02 42 73 45 (141) |
| `/rachat-voiture/seine-et-marne-77/le-chatelet-en-brie` | T1 | — | Rachat voiture Le Châtelet-en-Brie \| Les Épavistes Pro | Rachat voiture Le Châtelet-en-Brie – Cash, sans CT, en 24h (58) | Rachat voiture à Le Châtelet-en-Brie (77820). Paiement cash le jour de l'enlèvement, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture au Châtelet-en-Brie (77820) : paiement cash le jour de l'enlèvement, avec ou sans CT, cession déclarée pour vous. ☎ 06 02 42 73 45 (145) |
| `/epaviste/yvelines-78/sartrouville` | T1 | — | Épaviste Sartrouville – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Sartrouville – Enlèvement d'épave gratuit 24h/24 (57) | Épaviste agréé VHU à Sartrouville (78500). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Sartrouville (78500). Enlèvement d'épave gratuit, intervention sous 24 h, sous-sol et fourrière compris. ☎ 06 02 42 73 45 (142) |
| `/epaviste/seine-et-marne-77/nangis` | T1 | — | Épaviste Nangis (77370) – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Nangis – Enlèvement d'épave gratuit 24h/24 (51) | Épaviste agréé VHU à Nangis (77370). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Nangis (77370). Enlèvement d'épave gratuit, intervention sous 24 h, sous-sol et fourrière compris. ☎ 06 02 42 73 45 (136) |
| `/epaviste/val-de-marne-94/alfortville` | T1 | — | Épaviste Alfortville – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Alfortville – Enlèvement d'épave gratuit 24h/24 (56) | Épaviste agréé VHU à Alfortville (94140). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Alfortville (94140). Enlèvement d'épave gratuit, intervention sous 2 h, véhicule roulant ou non. ☎ 06 02 42 73 45 (134) |
| `/epaviste/val-d-oise-95` | T1 | — | Épaviste Val-d'Oise (95) – Gratuit 24h \| Les Épavistes Pro | Épaviste Val-d'Oise (95) – Gratuit, agréé VHU (45) | Épaviste agréé VHU Val-d'Oise (95). Enlèvement d'épave GRATUIT 24h/24, intervention sous 2h. ☎ 06 02 42 73 45 | Épaviste agréé VHU dans le Val-d'Oise (95) : enlèvement d'épave gratuit, intervention sous 24 h, déclaration de cession faite pour vous. ☎ 06 02 42 73 45 (153) |
| `/epaviste/seine-et-marne-77/lagny-sur-marne` | T1 | — | Épaviste Lagny-sur-Marne (77400) \| Les Épavistes Pro | Épaviste Lagny-sur-Marne – Enlèvement d'épave gratuit 24h/24 (60) | Épaviste agréé VHU à Lagny-sur-Marne (77400). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Lagny-sur-Marne (77400). Enlèvement d'épave gratuit, intervention sous 24 h, certificat de destruction remis. ☎ 06 02 42 73 45 (147) |
| `/epaviste/val-de-marne-94/valenton` | T1 | — | Épaviste Valenton – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Valenton – Enlèvement d'épave gratuit 24h/24 (53) | Épaviste agréé VHU à Valenton (94460). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Valenton (94460). Enlèvement d'épave gratuit, intervention sous 2 h, certificat de destruction remis. ☎ 06 02 42 73 45 (139) |
| `/epaviste/yvelines-78/poissy` | T1 | — | Épaviste Poissy (78300) – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Poissy – Enlèvement d'épave gratuit 24h/24 (51) | Épaviste agréé VHU à Poissy (78300). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Poissy (78300). Enlèvement d'épave gratuit, intervention sous 24 h, sous-sol et fourrière compris. ☎ 06 02 42 73 45 (136) |
| `/epaviste/val-de-marne-94/maisons-alfort` | T1 | — | Épaviste Maisons-Alfort – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Maisons-Alfort – Enlèvement d'épave gratuit 24h/24 (59) | Épaviste agréé VHU à Maisons-Alfort (94700). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Maisons-Alfort (94700). Enlèvement d'épave gratuit, intervention sous 2 h, véhicule roulant ou non. ☎ 06 02 42 73 45 (137) |
| `/epaviste/seine-saint-denis-93/livry-gargan` | T1 | — | Épaviste Livry-Gargan – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Livry-Gargan – Enlèvement d'épave gratuit 24h/24 (57) | Épaviste agréé VHU à Livry-Gargan (93190). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Livry-Gargan (93190). Enlèvement d'épave gratuit, intervention sous 2 h, déclaration de cession faite pour vous. ☎ 06 02 42 73 45 (150) |
| `/epaviste/seine-saint-denis-93/le-blanc-mesnil` | T1 | — | Épaviste Le Blanc-Mesnil (93150) \| Les Épavistes Pro | Épaviste Le Blanc-Mesnil – Enlèvement d'épave gratuit 24h/24 (60) | Épaviste agréé VHU à Le Blanc-Mesnil (93150). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU au Blanc-Mesnil (93150). Enlèvement d'épave gratuit, intervention sous 2 h, déclaration de cession faite pour vous. ☎ 06 02 42 73 45 (151) |
| `/epaviste/paris-75/paris-10e` | T1 | — | Épaviste Paris 10e – Gratuit 24h/24 \| Les Épavistes Pro | Épaviste Paris 10e – Enlèvement d'épave gratuit 24h/24 (54) | Épaviste agréé VHU à Paris 10e (75010). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Paris 10e (75010). Enlèvement d'épave gratuit, intervention sous 2 h, déclaration de cession faite pour vous. ☎ 06 02 42 73 45 (147) |
| `/epaviste/seine-et-marne-77/champs-sur-marne` | T1 | — | Épaviste Champs-sur-Marne (77420) \| Les Épavistes Pro | Épaviste Champs-sur-Marne – Enlèvement d'épave gratuit (54) | Épaviste agréé VHU à Champs-sur-Marne (77420). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Champs-sur-Marne (77420). Enlèvement d'épave gratuit, intervention sous 24 h, certificat de destruction remis. ☎ 06 02 42 73 45 (148) |
| `/epaviste/hauts-de-seine-92/chatenay-malabry` | T1 | — | Épaviste Châtenay-Malabry (92290) \| Les Épavistes Pro | Épaviste Châtenay-Malabry – Enlèvement d'épave gratuit (54) | Épaviste agréé VHU à Châtenay-Malabry (92290). Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Châtenay-Malabry (92290). Enlèvement d'épave gratuit, intervention sous 2 h, sous-sol et fourrière compris. ☎ 06 02 42 73 45 (145) |
| `/epaviste/doubs-25/pouilley-francais` | T2 | ☎ | Épaviste Pouilley-Français – Gratuit \| Les Épavistes Pro | Épaviste Pouilley-Français – Enlèvement d'épave gratuit (55) | Épaviste agréé à Pouilley-Français (25410). Enlèvement d'épave GRATUIT 24h/24, certificat fourni. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Pouilley-Français (25410). Enlèvement d'épave gratuit 24h/24, sous-sol et fourrière compris. ☎ 06 02 42 73 45 (130) |
| `/rachat-voiture/rhone-69/quincieux` | T2 | ☎ | Rachat Quincieux (69650) – Cash \| Les Épavistes Pro | Rachat voiture Quincieux – Cash, sans CT \| Les Épavistes Pro (60) | Rachat voiture à Quincieux (69650). Cash immédiat, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture à Quincieux (69650) : paiement cash le jour de l'enlèvement, avec ou sans CT, offre ferme sur photos. ☎ 06 02 42 73 45 (133) |
| `/epaviste/eure-et-loir-28/donnemain-st-mames` | T2 | Tél. | Épaviste Donnemain-Saint-Mamès – Gratuit \| Les Épavistes Pro | Épaviste Donnemain-Saint-Mamès – Enlèvement d'épave gratuit (59) | Épaviste agréé à Donnemain-Saint-Mamès (28200). Enlèvement d'épave GRATUIT 24h/24, certificat fourni. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Donnemain-Saint-Mamès (28200). Enlèvement d'épave gratuit 24h/24, certificat de destruction remis. Tél. 06 02 42 73 45 (139) |
| `/epaviste/eure-et-loir-28/auneau-bleury-st-symphorien` | T2 | ☎ | Épaviste Auneau-Bleury-Saint-Symphorien \| Les Épavistes Pro | Épaviste Auneau-Bleury-Saint-Symphorien – Enlèvement gratuit (60) | Épaviste agréé à Auneau-Bleury-Saint-Symphorien (28700). Enlèvement d'épave GRATUIT 24h/24, certificat fourni. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Auneau-Bleury-Saint-Symphorien (28700). Enlèvement d'épave gratuit 24h/24, véhicule roulant ou non. ☎ 06 02 42 73 45 (137) |
| `/rachat-voiture/bas-rhin-67/ostwald` | T2 | Tél. | Rachat Ostwald (67540) – Cash \| Les Épavistes Pro | Rachat voiture Ostwald – Cash, sans CT \| Les Épavistes Pro (58) | Rachat voiture à Ostwald (67540). Cash immédiat, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture à Ostwald (67540) : paiement cash le jour de l'enlèvement, avec ou sans CT, cession déclarée pour vous. Tél. 06 02 42 73 45 (138) |
| `/rachat-voiture/isere-38/st-egreve` | T2 | ☎ | Rachat Saint-Égrève (38120) – Cash \| Les Épavistes Pro | Rachat voiture Saint-Égrève – Cash, sans CT (43) | Rachat voiture à Saint-Égrève (38120). Cash immédiat, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture à Saint-Égrève (38120) : paiement cash le jour de l'enlèvement, avec ou sans CT, cession déclarée pour vous. ☎ 06 02 42 73 45 (140) |
| `/epaviste/morbihan-56/la-trinite-surzur` | T2 | Tél. | Épaviste La Trinité-Surzur – Gratuit \| Les Épavistes Pro | Épaviste La Trinité-Surzur – Enlèvement d'épave gratuit (55) | Épaviste agréé à La Trinité-Surzur (56190). Enlèvement d'épave GRATUIT 24h/24, certificat fourni. ☎ 06 02 42 73 45 | Épaviste agréé VHU à La Trinité-Surzur (56190). Enlèvement d'épave gratuit 24h/24, véhicule roulant ou non, certificat remis. Tél. 06 02 42 73 45 (145) |
| `/rachat-voiture/gers-32/condom` | T2 | ☎ | Rachat Condom (32100) – Cash \| Les Épavistes Pro | Rachat voiture Condom – Cash, sans CT \| Les Épavistes Pro (57) | Rachat voiture à Condom (32100). Cash immédiat, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45 | Rachat voiture à Condom (32100) : paiement cash le jour de l'enlèvement, avec ou sans CT, estimation gratuite, offre sur photos. ☎ 06 02 42 73 45 (145) |
| `/epaviste/var-83/le-luc` | T2 | ☎ | Épaviste Le Luc (83340) – Gratuit \| Les Épavistes Pro | Épaviste Le Luc – Enlèvement d'épave gratuit 24h/24 (51) | Épaviste agréé à Le Luc (83340). Enlèvement d'épave GRATUIT 24h/24, certificat fourni. ☎ 06 02 42 73 45 | Épaviste agréé VHU au Luc (83340). Enlèvement d'épave gratuit 24h/24, certificat de destruction remis, sous-sol compris. ☎ 06 02 42 73 45 (137) |
| `/epaviste/indre-et-loire-37/avon-les-roches` | T2 | Tél. | Épaviste Avon-les-Roches – Gratuit \| Les Épavistes Pro | Épaviste Avon-les-Roches – Enlèvement d'épave gratuit 24h/24 (60) | Épaviste agréé à Avon-les-Roches (37220). Enlèvement d'épave GRATUIT 24h/24, certificat fourni. ☎ 06 02 42 73 45 | Épaviste agréé VHU à Avon-les-Roches (37220). Enlèvement d'épave gratuit 24h/24, déclaration de cession faite pour vous. Tél. 06 02 42 73 45 (140) |

### 11.5 Test CTR (☎ ou non)

- Hypothèse : sur mobile, le pictogramme ☎ en fin de description attire l'œil et augmente le CTR à position égale.
- Plan : les 20 pages T2, réparties en alternance par rang d'opportunité — 10 avec « ☎ 06 02 42 73 45 », 10 avec « Tél. 06 02 42 73 45 » ; titres et descriptions identiques par ailleurs. Source unique : `seo-audit/ctr-test.json` (lu par `lib/seo.ts` et par `npm run seo:loop`).
- Lecture : CTR des deux cohortes sur les 3 semaines suivant la mise en production vs les 3 semaines précédentes, **à partir du 26 octobre 2026**. Les volumes étant faibles, ne conclure qu'avec un écart net et répété sur deux imports.

### 11.6 Autorité des hubs (S3.3)

| Hub | Pages qui le lient — avant (crawl du 20/09, 2 922 pages) | Après (crawl final, 2 948 pages) |
|---|---|---|
| `/epaviste/paris-75` | 2 921 | **2 947** (objectif ≥ 2 600 ✓) |
| `/epaviste/ile-de-france` | 2 921 | **2 947** (≥ 2 500 ✓) |
| `/rachat-voiture/ile-de-france` | 2 921 | **2 947** (≥ 2 500 ✓) |

Le menu déroulant « Île-de-France » de l'en-tête liait déjà les trois hubs sur toutes les pages ; « Paris » devient en plus une entrée de premier niveau. Chaque commune IDF lie son département dans le premier paragraphe ; chaque article de blog lie un hub en contexte (rachat / Paris / épaviste IDF selon le sujet). Le crawler mesure désormais ces trois compteurs (`hubInbound`).

Méga-hub Paris (`/epaviste/paris-75` et `/rachat-voiture/paris-75`) : 20 cartes d'arrondissements (code postal, population INSEE, une ligne locale), tableau des 8 fourrières/préfourrières de la Ville de Paris (adresses, 3975, horaires, tarifs — paris.fr, page du 31/08/2026), paragraphe « ZFE Grand Paris 2026 ».

GBP ↔ site : un seul NAP (`lib/nap.ts`) pour `/contact`, le pied de page et le schéma ; l'e-mail du pied de page (`contact@lesepavistes.pro`) **n'avait ni enregistrement MX ni A** — corrigé en `lesepavistespro@gmail.com`.

**Plan de citations** (`seo-audit/citations.csv`) : 25 annuaires/profils (priorité 1 : GBP, Bing Places, Apple Business Connect, PagesJaunes, 118712, Facebook, Instagram, Annuaire des Entreprises ; priorité 2–3 : Yelp, Hoodspot, Kompass, Cylex, Justacoté, Tiugo, StarOfService, Europages, Trustpilot, LinkedIn, Waze, Societe.com, Infogreffe, CMA Île-de-France, Mobilians, annuaires de mairies ; SYDEREP marqué « ne pas s'inscrire » — réservé aux centres VHU agréés), NAP à coller ; 10 cibles de prise de contact en IDF (ARC, CLCV IDF, FNAIM Grand Paris, UNIS, Paris Habitat, Seine-Saint-Denis Habitat, 40 millions d'automobilistes, Caradisiac, L'argus, garages partenaires à nommer) ; 3 modèles d'e-mails.

### 11.7 Nouvelles pages

| Page(s) | Nombre | Pourquoi |
|---|---|---|
| `/guides/fourrieres-ile-de-france` | 1 | Actif « données » : sites de Paris, tarifs 2026 (Paris + plafonds nationaux de l'arrêté du 13/09/2026), procédure et liste officielle par département (`Dataset` + `Article`) |
| `/guides/zfe-grand-paris` | 1 | Règles, périmètre commune par commune (liens), Crit'Air, calendrier, que faire du véhicule (`Article`) |
| `/centre-vhu-agree/{75,77,78,91,92,93,94,95,971,972,973,974}` | 12 | 921 impressions « centre vhu {département} » sans réponse. Nous ne nous présentons **jamais** comme centre VHU |
| `/epaviste/ile-de-france/caravane` | 1 | « épaviste caravane gratuit », « enlèvement caravane gratuit » — aucun prix promis (TODO(owner)) |
| `/rachat-voiture/ile-de-france/marque-{renault,peugeot,citroen,volkswagen,toyota,dacia,ford,opel,fiat,mercedes}` | 10 | Rachat × marque, sans prix |
| `/epaviste/ile-de-france/pro-{syndic-copropriete,bailleur-social,garage-carrossier,concession-negociant,notaire-agence-immobiliere}` | 5 | Pages B2B (cadre légal : R325-47 s., loi du 31 décembre 1903, VEI, successions) |
| `/api/nearest` | — | Bloc « Près de chez vous » (géolocalisation sur demande, rien n'est enregistré ni envoyé aux statistiques) |

Pages enrichies : La Trinité (972) épaviste + rachat (contenu rédigé, faits INSEE ; aucune autre page DOM ≥ 50 impressions) ; rachat des 20 arrondissements (situations propres au rachat) ; lien « Scooter ou moto à enlever ? » sur les arrondissements et les Tier A 92/93/94 ; « Mis à jour le » visible sur les pages communes, départements et régions, lu dans la même source que le `lastmod` (`lib/lastmod.ts`).

Le cahier des charges « v1 » des pages marque et pro n'étant pas dans le dépôt, elles réutilisent le système de pages « situation » (même gabarit, mêmes garde-fous) avec un champ `kind` ; à ajuster si la v1 prévoyait d'autres URL.

### 11.8 Vérification

| Contrôle | Résultat |
|---|---|
| `npx tsc --noEmit` | 0 erreur |
| `npm run seo-check` | **105 / 105** (nouveaux : système de métadonnées, marque, actions GSC, NAP, garde analytics ; 39 pages intent) |
| `npm run build` | OK, 2 911 pages statiques |
| Crawl `--idf-only --limit=300` | **2 647 URL IDF (exhaustif) + 301 nationales, 0 erreur** ; 2 avertissements préexistants (hubs 77 > 300 Ko) ; 0 titre > 60, 0 doublon titre/description, 0 lien cassé, 0 `TODO(owner)` rendu |
| JSON-LD (`validate-jsonld`, 14 pages dont chaque nouveau type) | 0 erreur |
| GA4 (`verify-ga4`, build local) | tous les événements vérifiés (le pilote de test sait désormais que le code postal est pré-rempli sur les communes IDF) |

Lighthouse mobile, build local (même machine, throttling simulé), `main` → branche :

| Page | Perf | LCP | TBT | CLS |
|---|---|---|---|---|
| `/` | 91 → **95** | 3.3 s → 2.8 s | 160 ms → 120 ms | 0 |
| `/epaviste` | 95 → **92** | 2.9 s → 3.3 s | 100 ms → 90 ms | 0 |
| `/epaviste/ile-de-france` | 89 → **90** | 3.6 s → 3.6 s | 160 ms → 100 ms | 0 |
| `/epaviste/paris-75` | 92 → **90** | 3.0 s → 3.6 s | 160 ms → 100 ms | 0 |
| `/epaviste/hauts-de-seine-92/nanterre` | 89 → **90** | 3.6 s → 3.6 s | 160 ms → 100 ms | 0 |
| `/rachat-voiture/hauts-de-seine-92/nanterre` | 90 → **91** | 3.4 s → 3.4 s | 150 ms → 120 ms | 0 |
| `/blog/certificat-destruction-vhu-obligatoire` | 84 → **92** | 4.3 s → 3.3 s | 110 ms → 80 ms | 0 |
| `/centre-vhu-agree/val-de-marne-94` | — → **93** | — → 3.1 s | — → 90 ms | 0 |
| `/guides/fourrieres-ile-de-france` | — → **94** | — → 3.0 s | — → 90 ms | 0 |

Budget « perf ≥ 90 » tenu partout ; `/epaviste/paris-75` (méga-hub : cartes, tableau, ZFE) et `/epaviste` perdent 2 à 3 points, à surveiller au premier run du monitor sur Vercel (une mesure locale varie de ± 2 points d'un run à l'autre). Le LCP local reste > 2,5 s sous throttling comme aux sprints précédents : la mesure de référence est celle du monitor sur Vercel. Analytics : les visites HeadlessChrome / Lighthouse / PageSpeed / `LesEpavistesPro-SEO-Monitor` / webdriver ne sont plus comptées (Vercel `beforeSend`, GA4 désactivé pour ces agents) ; `page_tier` ajouté aux pages vues et événements GA4. IndexNow : clé `2be00167ac82eb36a32045c27b0f0e4c`, soumission automatique après chaque déploiement Production (`.github/workflows/indexnow.yml`).

### 11.9 URL à soumettre pour indexation (dans cet ordre)

```
https://www.lesepavistespro.fr/epaviste/paris-75
https://www.lesepavistespro.fr/epaviste/ile-de-france
https://www.lesepavistespro.fr/rachat-voiture/ile-de-france
https://www.lesepavistespro.fr/rachat-voiture/paris-75
https://www.lesepavistespro.fr/centre-vhu-agree/paris-75
https://www.lesepavistespro.fr/centre-vhu-agree/seine-et-marne-77
https://www.lesepavistespro.fr/centre-vhu-agree/yvelines-78
https://www.lesepavistespro.fr/centre-vhu-agree/essonne-91
https://www.lesepavistespro.fr/centre-vhu-agree/hauts-de-seine-92
https://www.lesepavistespro.fr/centre-vhu-agree/seine-saint-denis-93
https://www.lesepavistespro.fr/centre-vhu-agree/val-de-marne-94
https://www.lesepavistespro.fr/centre-vhu-agree/val-d-oise-95
https://www.lesepavistespro.fr/centre-vhu-agree/guadeloupe-971
https://www.lesepavistespro.fr/centre-vhu-agree/martinique-972
https://www.lesepavistespro.fr/centre-vhu-agree/guyane-973
https://www.lesepavistespro.fr/centre-vhu-agree/la-reunion-974
https://www.lesepavistespro.fr/guides/fourrieres-ile-de-france
https://www.lesepavistespro.fr/guides/zfe-grand-paris
https://www.lesepavistespro.fr/epaviste/martinique-972/la-trinite
https://www.lesepavistespro.fr/rachat-voiture/martinique-972/la-trinite
https://www.lesepavistespro.fr/epaviste/ile-de-france/caravane
```

### 11.10 Commits

Un commit par tâche, sur `seo/idf-sprint-3` : S3.1.a `bedf25f` · S3.1.b `031cc8c` · S3.2 `302c71c` (+ `7350309`) · S3.1.c `06ad8c9` · S3.3.1 `de7fae0` · S3.3.2 `9330259` · S3.3.3 `354fcc5` · S3.3.4 `8042654` · S3.3.5 `4115242` · S3.4.1 `f7b6a22` · S3.4.2 `95851f1` · S3.4.3 `57074ec` · S3.4.4 `9dd5cf6` · S3.5.1 `814b5a2` · S3.5.2 `61a5cca` · S3.5.3 `7024a6e` · S3.5.4 `55b4ade` · S3.5.5 `9b89755` · S3.6 `7008473`, `14c3d95` et ce rapport.

### 11.11 Points à valider

| Point | Décision prise | À valider |
|---|---|---|
| Ordre S3.1.c / S3.2 | Le système de titres (S3.2) a été construit avant d'appliquer T1/T2, pour que le journal compare la production au résultat final | — |
| Données GSC dans un dépôt public | Exports bruts ignorés ; historique compact, rapport et test versionnés | Rendre le dépôt privé ou retirer l'historique si ces chiffres ne doivent pas être publics |
| Page camping-car (Sprint 2) | Elle affirme qu'une caravane immatriculée reçoit « son propre certificat de destruction » ; la nouvelle page caravane ne le promet pas (les caravanes ne relèvent pas de la section VHU des voitures) | Faire confirmer par le centre VHU partenaire, puis aligner l'une ou l'autre page |
| Formulaire | Le message de succès promettait un rappel « dans les 15 prochaines minutes » (allégation non vérifiée, masquée partout ailleurs) : désormais soumis au même drapeau `BUSINESS_CLAIMS` | Activer quand le délai réel est confirmé |
