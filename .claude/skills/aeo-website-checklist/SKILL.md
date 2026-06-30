---
name: aeo-website-checklist
description: THE AEO Website Checklist — the page/site readiness AUDIT (pass/fail, READ-ONLY). Scores a page against Mike's AI SEO Pre-Publish Checklist PLUS Four-Pillar AI Citation, insurance compliance, and the HIPAA pixel gate, and returns READY / NEAR / NOT-READY with findings. Checks everything important (count is whatever results, not rigidly "20"). Two depths — QUICK = checklist summary; FULL = Quick + search-result rankings (local rank map, SERP, AI-citation visibility, competitor benchmark, reviews). Page-level checks per page; site-level surfaces (llms.txt, robots/AI-bots, WebMCP, sitemap) once. Bakes in the HIPAA/CIPA TRACKING FLIP for Medicare/ACA/health/life/finance: a client-side GA4/GTM/Meta Pixel = liability/FAIL; server-side + consent-gated = pass. This is the AUDIT only — the 0–100 content score lives in `page-quality-score`, and the fix→re-score→publish loop lives in `website-quality-loop`. Use INSTEAD of the generic insurance-agency-audit. Trigger: "AEO website checklist", "website checklist", "the checklist", "audit this page", "is this page ready to publish", "quick/full audit", "pre-publish check".
---

# AEO Website Checklist (audit — read-only)

The **readiness audit**. Answers *"is this page structurally ready to publish?"* — pass/fail with findings. It does **not** grade content quality (that's `page-quality-score`) and does **not** fix or publish (that's `website-quality-loop`). Read-only.

> Spine = the **AI SEO Pre-Publish Checklist** (AI Ranking FREE / Nicolas Gorrono). It's the *spine*, not a fixed count — the audit also runs Four-Pillar, insurance compliance, and the HIPAA pixel gate. **Check everything important.**

## Two depths
- **QUICK (default):** the checklist summary — per-page verdict + the gates + top fixes. Fast, no ranking APIs.
- **FULL = Quick + search-result rankings:** local rank map, organic SERP positions, AI-citation visibility (ChatGPT/Perplexity/AI Overview/Bing), competitor benchmark, Google reviews, Cost of Inaction. Branded report. (Internally the VPS `aeo-audit` supplies the rankings layer; degrade gracefully — never fabricate.)

## Scope — page-level vs site-level
- **Page-level (every page):** schema-done-right, one H1, answer-first intro, content capsules (Q-as-H2), internal links, image SEO, insurance compliance (below), HIPAA pixel (below).
- **Site-level (ONCE):** `/llms.txt` (+ Tools section), robots/WAF not blocking AI bots, WebMCP (`/.well-known/mcp.json` + `/mcp` executes), XML sitemap.

## The checks (score ✅ / ⚠️ / ❌; 🔴 = blocks publish)
**Phase 0 — Agentic readiness:** WebMCP exposed & callable · llms.txt present · schema done right for the page type (validated, zero errors).
**Phase 1 — Architecture:** one page/one intent · service-per-page · content capsules (Q-as-H2, answered immediately) · front-loaded answer · real first-hand experience.
**Phase 2 — Trust & sourcing (E-E-A-T):** every claim backed (ideally a number) · sources linked inline · author bio + schema (YMYL: author = Org "Data Desk", NOT a single Person; the human is byline/`reviewedBy`).
**Phase 3 — Technical pre-flight:** loads fast (CWV) · image SEO (WebP/AVIF, alt, lazy) · bots not blocked · indexable (no stray noindex; **self-referencing canonical** — a canonical pointing at a parked/placeholder domain = 🔴) · human title/meta · internal links in & out.
**Phase 4 — Submit & measure:** Google Search Console submitted · Bing Webmaster submitted (feeds ChatGPT). *(Off-page — mark "could not verify" if unknown.)*
**Phase 5 — Freshness:** flag content 10–16 months old / outdated stats / old `dateModified` for refresh.

**Four-Pillar AI Citation (P0 — any miss = NOT READY):** Pillar 1 Article/WebPage + Org "Data Desk" author + dates · Pillar 2 FAQPage (3–5 real-query Q&A) · Pillar 3 Dataset per .gov source (`creator.url` = exact endpoint) · Pillar 4 site-level llms.txt + AI-bots-allowed + WebMCP.

**Insurance compliance (Part J — reason about the words, P0 if FIX-REQUIRED):** flag exact banned superlatives ("the best", "#1", "cheapest", "top-rated", "best rate"), "every/all plans" overclaims (CMS TPMO), implied government affiliation, "$0 = free", guaranteed savings/returns, missing TPMO/HealthCare.gov/no-guarantee disclaimers, TCPA. Do NOT flag legitimate product terms ("guaranteed issue/level/acceptance"). Also flag demo placeholders (fake phone, `DEMO-NPN`). Return offending phrase + rule + rewrite.

**★ HIPAA / pixel gate (Part K — P0 for health/Medicare/ACA/life/finance):** detect REAL client-side trackers — `fbq(`, `connect.facebook.net`, `fbevents`, `gtag(`, `googletagmanager`, GA4 id `G-ABC1234` (UPPERCASE). **Ignore CSS classes like `g-bottom`.** On a health vertical, ANY firing client-side = **❌ LIABILITY (HIPAA/CIPA) — DEDUCT + WARN, never credit**; worse pre-consent. PASS = no client-side pixels + server-side + consent-gated (+ BAA). Non-health verticals (P&C): client-side analytics is fine. Cross-check `pixel-liability-audit` for PHI-capturing pages.

## Verdict
**NOT READY** if any 🔴 / any Four-Pillar miss / Part J FIX-REQUIRED / Part K LIABILITY. **NEAR** = only should-fixes. **READY** = all page-level + site-level clean.

## Output (per page)
```
AEO CHECKLIST — <url>  | type: <type> | tier: quick|full
Verdict: READY ✅ | NEAR ⚠️ | NOT READY ❌
Four Pillars: P1 <p/f> · P2 <p/f> · P3 <p/f> · P4 <p/f>
Compliance (J): PASS | FIX REQUIRED — "<phrase>" (<where>) breaks <rule> → "<rewrite>"
HIPAA/pixel (K): PASS | LIABILITY (<tracker>, <pre/post>-consent)
🔴 / 🟡 / 🟢 findings — <one-line fix each>
```
Site-level block once: `llms.txt <p/f> · AI-bots <p/f> · WebMCP <p/f> · sitemap <p/f>`.

## Guardrails
- Read-only. Quote real evidence (actual title length, the `@type` found, the exact tracker). Never "add schema" — say which type, which page, why.
- Never fabricate a tick; if a surface can't be fetched, say "could not verify."
- For the content quality score, call **`page-quality-score`**. To fix→re-score→publish in a loop, call **`website-quality-loop`**. To implement fixes directly, hand findings to `aeo-readiness`.
