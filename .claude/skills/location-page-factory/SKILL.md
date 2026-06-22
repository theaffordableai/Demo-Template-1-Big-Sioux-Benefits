---
name: location-page-factory
description: >-
  Self-contained skill to generate programmatic local-SEO LOCATION / geo pages for an insurance/Medicare agency site at scale — one page per city/county service area — each backed by REAL .gov/Brain data and the full geo-schema stack: LocalBusiness + GovernmentService + Place + FAQPage + BreadcrumbList + Dataset. Builds answer-first, locally-grounded pages (real county figures: plan counts, enrollment, CDC PLACES health load, uninsured rate, hospitals with CMS stars) with the advisor in-context hero, unique image per page, and all FOUR PILLARS baked in. Ported from the location/blog page-factory pattern. Use to add or batch-generate location pages. Trigger on: "location pages", "geo pages", "add a <city> Medicare page", "service-area pages", "programmatic local SEO", "location factory", "city pages for <client>".
---

# Location Page Factory (geo · brain-connected) — self-contained

Generates programmatic **local-SEO location pages** — one per city/county the agency serves — that earn AI citations because every local claim is backed by real .gov/Brain data and wrapped in the full geo-schema stack. Ported from the page-factory pattern. Single page, a batch, or a service-area sweep.

> A location page that says "we serve the Sioux Falls area" is invisible. One that says "Minnehaha County has 38 Medicare Advantage plans across 7 carriers (CMS, 2026); 9.5% of adults have diagnosed diabetes (CDC PLACES, 2023)" gets quoted by AI answer engines and ranks locally.

---

## The geo-schema stack (REQUIRED on every location page)
**LocalBusiness + GovernmentService + Place + BreadcrumbList + FAQPage + Dataset** (one Dataset per cited .gov source). This matches the enrollmedicare geo-page recipe — NOT just `LocalBusiness`.

## The SAA Four-Pillar AI Citation Standard — on every location page
1. **WebPage/Article** with Org-level author `{"@type":"Organization","name":"<Site> Data Desk","url":"https://<site>/about"}` — **single-Person authors BANNED for YMYL**; named human is a visible byline / `reviewedBy`; `datePublished` + `dateModified` present.
2. **FAQPage** — 3–5 Q&As phrased as real local search queries ("How many Medicare plans are in <County>?").
3. **Dataset (the moat)** — one block per .gov/authoritative source cited: `{"@context":"https://schema.org","@type":"Dataset","name":"<source dataset name>","description":"<1 sentence on what was pulled>","creator":{"@type":"Organization","name":"<source name>","url":"<EXACT endpoint — e.g. cdc.gov/places, census.gov, cms.gov>"},"license":"https://creativecommons.org/publicdomain/zero/1.0/","isAccessibleForFree":true}`.
4. **Agentic Readiness (site-level)** — valid `/llms.txt` with a "Tools (agent-callable)" section; AI crawlers NOT blocked (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot, Bingbot); data-driven sites expose WebMCP (`/.well-known/mcp.json` + `/mcp` proxy + in-page `navigator.modelContext`).

---

## Workflow (in order)

### STEP 0 — Brand + service area
- Read the brand tokens/voice + advisor asset (from `brand-design-kit` / `site.config.ts`). List the cities/counties to generate; check the existing location index so you don't duplicate (no cannibalization — distinct keyword + intent per page).

### STEP 1 — Pull REAL local data (the spine)
- Use `ambrose-insurance-data` (the Brain): per county pull plan counts/carriers/enrollment (CMS), CDC PLACES health load (diabetes, BP, obesity, CHD, uninsured), census market snapshot (population, median income, uninsured rate), hospitals with CMS stars. Save every figure to `src/data/<location>.ts` with a `SOURCES` map — never inline-invent a number; if you can't source it, cut it.

### STEP 2 — Build the page
- Answer-first intro (answer the local question in the first 2 sentences) → why coverage matters *here* (local health load) → plan landscape (data table with carriers + CMS stars) → cost angle → local FAQ → CTA.
- Name **real local entities** (carriers, plans with CMS stars, hospitals, health systems) — never "local providers". Place/county named 8+ times.
- Inject the geo-schema stack + Four Pillars via `src/lib/schema.ts` (pass `place`, `faqs`, `breadcrumbs`, `dataset`, `datePublished`).

### STEP 3 — Imagery (advisor hero + unique per page)
- Hero **features the advisor in-context** (helping a local couple/family, or presenting data) — **no anonymous stock b-roll**. **Unique image per page** — never reuse across location pages (grep the location index first). **Real landmark = real photo** composited with the advisor (never AI-generate a famous landmark — it looks fake). Generate at ≥2k; descriptive filename + real alt text; let the build optimizer downscale.

### STEP 4 — Compliance
- No banned superlatives ("best/#1/cheapest"); present published CMS star ratings + a neutral stability label, never a ranking claim; no "every/all plans" overclaim (TPMO: you do NOT offer every plan); no implied government affiliation; no "free" for $0 plans; TPMO + non-affiliation disclaimers present; "education, not advice — verify with a licensed agent".

### STEP 5 — Build, audit, deploy
- Build green; run `seo-aeo-page-audit` on a representative location page — pass **Part H (Four Pillars)** and **Part J (compliance)**; verify the full geo-schema stack parses with zero errors. Batch/calendar: generate progressively.

---

## Location-page checklist (embedded — per page)
- [ ] 🔴 Geo-schema stack: LocalBusiness + GovernmentService + Place + BreadcrumbList + FAQPage (+ Dataset per cited source) — NOT just LocalBusiness
- [ ] 🔴 Pillar 1: WebPage/Article with Org "Data Desk" author (NOT a single Person for YMYL); reviewedBy Person (visible byline); datePublished + dateModified present
- [ ] 🔴 Pillar 2: FAQPage, 3–5 real local-query Q&As
- [ ] 🔴 Pillar 3: Dataset for every .gov/authoritative source cited; creator.url = exact endpoint
- [ ] 🔴 Pillar 4 (site-level): /llms.txt with "Tools (agent-callable)" section; AI crawlers not blocked; data-driven sites expose WebMCP
- [ ] 🔴 Every figure traced to a Brain/.gov pull (no fabrication); real local entities named (carriers/plans/hospitals with CMS stars)
- [ ] 🔴 Hero features the advisor in-context (no anonymous stock); unique image per page (never reused); real landmark = composite over a real photo
- [ ] 🔴 No banned superlatives / ranking claims / "every-plan" overclaim / "free" misuse / implied gov affiliation; TPMO + non-affiliation present
- [ ] 🟡 Distinct keyword + intent (no cannibalization); place/county named 8+ times; answer-first intro
- [ ] 🟡 Built green; `seo-aeo-page-audit` run — Part H + Part J pass; geo-schema validates

## Related
Pulls data via `ambrose-insurance-data`; reads brand from `brand-design-kit`; built into the site by `insurance-website-builder`; gated by `seo-aeo-page-audit` (Part H + Part J).
