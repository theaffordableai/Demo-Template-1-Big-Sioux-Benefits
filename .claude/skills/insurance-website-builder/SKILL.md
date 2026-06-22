---
name: insurance-website-builder
description: >-
  Self-contained skill to build a complete, multi-page insurance/Medicare agency website on Astro 5 (+ Tailwind), with all FOUR PILLARS of the SAA AI Citation Standard baked into every page template. Builds the premium "$25k look" agency site — hero, trust bar, data band, services grid, how-it-works, testimonials, CTA bands, multi-column footer — plus the full content architecture (coverage pages, Medicare 101 / education, free tools, services, locations, FAQ, reviews, meet-the-team) driven by a single config + content data module. Wires in accessibility widget, tracking-consent gate, TPMO + non-affiliation disclaimers, llms.txt, AI-friendly robots, and WebMCP (/mcp + /.well-known/mcp.json). Use to scaffold a NEW agency site or reskin the gold-standard Big Sioux Benefits template for a new client. Trigger on: "build an insurance website", "build a Medicare agency site", "scaffold the agency site", "reskin the template for <client>", "new <city> Medicare site".
---

# Insurance Website Builder (Astro · Four-Pillar) — self-contained

Builds ONE complete, premium, compliant multi-page insurance/Medicare agency website with the **Four-Pillar AI Citation Standard baked into every page template**. Ported from the gold-standard Big Sioux Benefits build system. Everything is driven by one config + one content data module, so the same skill scaffolds a fresh site or reskins for a new client.

> **The factory move:** copy the site folder, swap `site.config.ts` + the logo/advisor assets, edit `content.ts` (service area + location + coverage + education + tools + services arrays), redeploy. Pages appear from the arrays — you edit data, not page files.

---

## The SAA Four-Pillar AI Citation Standard — baked into EVERY page template

Every generated page MUST inject, in `<head>`:
1. **Article / WebPage / NewsArticle** with an **Org-level author** — `author = {"@type":"Organization","name":"<Site> Data Desk","url":"https://<site>/about"}`. **Single-Person authors are BANNED for YMYL** (Medicare, ACA, life, health, finance). Keep the named human as a visible byline / `reviewedBy`. `datePublished` + `dateModified` always present.
2. **FAQPage** — 3–5 Q&A pairs phrased as real search queries.
3. **Dataset (the moat)** — wraps ANY .gov/authoritative data the page cites: `{"@context":"https://schema.org","@type":"Dataset","name":"<source dataset name>","description":"<1 sentence on what was pulled>","creator":{"@type":"Organization","name":"<source name>","url":"<EXACT scrape/endpoint URL — NOT homepage>"},"license":"https://creativecommons.org/publicdomain/zero/1.0/","isAccessibleForFree":true}`. `creator.url` MUST be the exact endpoint (e.g. `cdc.gov/places`, `census.gov`, `healthcare.gov`, `cms.gov`). Skip ONLY if no external data is cited.
4. **Agentic Readiness (site-level)** — valid `/llms.txt` (with a **"Tools (agent-callable)"** section), AI crawlers **NOT blocked** (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot, Bingbot), and for data-driven sites **WebMCP**: `/.well-known/mcp.json` + a `/mcp` proxy + in-page `navigator.modelContext`.

Centralize schema injection in `src/lib/schema.ts` so every layout emits the right pillar stack by page type.

---

## Workflow (in order)

### STEP 0 — Intake & brand
- Capture brand: name, tagline, service area, voice; logo (minimal symbolic mark, never letters-only); **advisor photo** (chest-up portrait, plain shirt, no logo).
- Put everything in `src/config/site.config.ts` (brand, theme tokens, GHL IDs, domain, WebMCP) — never hardcode hex in components.

### STEP 1 — Design tokens & the "$25k look"
- **Palette** (ink / primary / accent / soft / line / muted), **fonts** (display serif + body sans + mono eyebrow), depth (soft shadows, rounded 14–22px), generous whitespace. Not flat, not busy.
- **Hero:** gradient + texture, display headline, **advisor photo in-context** with a floating "Live data" stat card + a reviews chip; primary CTA + ghost call button + trust microcopy.
- Sections: trust bar (carriers + rating) · dark data band (stat numbers) · services grid · 3-step how-it-works · testimonial · CTA band · premium multi-column footer with TPMO disclaimer.
- **Animations:** scroll-reveal fade-ups (IntersectionObserver), count-up on stats, hover lifts — all respect `prefers-reduced-motion` + an a11y "pause motion" toggle.

### STEP 2 — Content architecture (data-driven)
- `src/lib/content.ts` holds arrays: `coverage`, `education` (Medicare 101), `tools` (free tools), `services`, plus location pages. Edit the array → the page appears.
- Routes: `src/pages/[slug].astro` renders coverage + education + tools (flat URLs); `services/[slug].astro`; hub pages (`medicare-101`, `free-tools`, `services`, `locations`, `faq`, `reviews`, `meet-the-team`). Location pages use REAL CMS/Brain data.

### STEP 3 — Four Pillars on every template
- Wire `src/lib/schema.ts`: WebPage/Article + Org "Data Desk" author + FAQPage + Dataset (per cited source) + GovernmentService + Place on geo pages.
- Ship `/llms.txt` (with a "Tools (agent-callable)" section), AI-friendly `robots.txt`, and WebMCP (`/mcp` + `/.well-known/mcp.json` + in-page `navigator.modelContext`).

### STEP 4 — Imagery (advisor hero + unique per page)
- Every hero/feature image **features the advisor in-context** — no anonymous stock b-roll. **Unique image per page** — never reuse across pages. Real landmark = composite the advisor over a REAL licensed/CC photo (never AI-generate the landmark). Generate at ≥2k, descriptive filename + real alt text; let the build's image-optimizer downscale.

### STEP 5 — Compliance (built-in, required)
- **Accessibility widget** (real controls, localStorage-persistent, privacy-first — no third-party overlay), WCAG (skip link, focus rings, ARIA, landmarks).
- **Tracking-consent gate** — pixels off until accept.
- **TPMO + non-government disclaimers** auto-built in the footer. No banned superlatives, no implied government affiliation, no "free" misuse, no "every/all plans" overclaims.

### STEP 6 — Build, audit, deploy
- `npm install && npm run build` (use `npm run build`, not raw astro build, so the image-optimizer + prebuild hooks run).
- Run `seo-aeo-page-audit` on representative pages per type — resolve every 🔴, pass **Part H (Four Pillars)** and **Part J (compliance)**.
- Deploy (Vercel default / Cloudflare via `DEPLOY_TARGET`).

---

## Four-Pillar build checklist (embedded — every page template)
- [ ] 🔴 Pillar 1: Article/WebPage schema with Org "Data Desk" author (NOT a single Person for YMYL); reviewedBy Person (visible byline); datePublished + dateModified present
- [ ] 🔴 Pillar 2: FAQPage schema, 3–5 real-query Q&As
- [ ] 🔴 Pillar 3: Dataset schema for every .gov/authoritative source cited; creator.url = exact endpoint (skip only if no external data cited)
- [ ] 🔴 Pillar 4 (site-level): valid /llms.txt with a "Tools (agent-callable)" section; AI crawlers NOT blocked (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot, Bingbot); data-driven sites expose WebMCP (/.well-known/mcp.json + /mcp proxy + in-page navigator.modelContext)
- [ ] 🔴 Geo/location pages: LocalBusiness + GovernmentService + Place + BreadcrumbList + FAQPage
- [ ] 🔴 Every hero/feature image features the advisor in-context (no anonymous stock); unique image per page (never reused); real landmark = composite over a real photo
- [ ] 🔴 TPMO + non-affiliation disclaimers in footer; accessibility widget + consent gate present; no banned superlatives / "every-plan" overclaims / "free" misuse
- [ ] 🟡 Brand tokens (no hardcoded hex); scroll/count-up animations respect reduced-motion; mobile-tested
- [ ] 🟡 Built green; `seo-aeo-page-audit` run per page type — Part H + Part J pass

## Related
Pairs with `brand-design-kit` (the brand system the writers read in STEP 0), `location-page-factory` (programmatic geo pages), the 4 blog writers, `ambrose-insurance-data` (real figures), and `seo-aeo-page-audit` (the pre-publish gate).
