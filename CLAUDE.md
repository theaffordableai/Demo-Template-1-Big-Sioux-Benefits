# CLAUDE.md — Big Sioux Benefits (Demo Template 1)

Guidance for Claude Code working in this repo. Read this first, then `BRAND.md`.

## What this is
A premium, multi-page **Astro 5** insurance-agency website for **Big Sioux Benefits**, a
**fictional demo** independent Medicare agency. Deploys to Cloudflare Pages (Vercel-compatible).
Ships with the full Ambrose Insurance skill suite under `.claude/skills/`.

- **Brand:** Big Sioux Benefits · **Niche:** Medicare (Parts A/B/C/D, Medigap, Part D)
- **Advisor (visible byline):** Dale Hofer · **Domain:** https://bigsiouxbenefits.com
- **Market:** Sioux Falls metro & Siouxland (eastern SD, NW Iowa, SW Minnesota)
- **GitHub:** `theaffordableai/Demo-Template-1-Big-Sioux-Benefits`

> This brand is fictional-but-realistic. Never reintroduce a real competitor's name, agent photos,
> NPN, or contact info.

## Brand source of truth (read before generating anything)
Brand facts and design tokens live in **`src/config/site.config.ts`** (the `brand` + `theme`
blocks) and **`BRAND.md`**; logo/favicon in `public/brand/`. **Never invent or hardcode** brand
names, colors, fonts, phone, address, or advisor — always pull from the config. The
`brand-design-kit` skill owns/produces this system; every writer & builder reads it in STEP 0.

**⚠️ Keep this file in sync:** whenever you change the brand (edit the `site.config.ts` brand block
or `BRAND.md` — name, advisor, domain, colors, market), **update the brand facts in this CLAUDE.md
to match** so the two never drift.

## Which skill to use (all 11 live in `.claude/skills/`)
Describe the task; the matching skill triggers. For this **Medicare** site:

| Task | Skill |
|---|---|
| Set up / reskin brand, colors, fonts, voice | **brand-design-kit** (run first) |
| Build or extend the multi-page site | **insurance-website-builder** |
| Add city/county pages (e.g. Minnehaha, Lincoln Co.) | **location-page-factory** |
| Pull real plan counts / county health / Census data | **ambrose-insurance-data** |
| Write a Medicare article (primary) | **medicare-blog-writer** |
| Write an ACA / life article (if scope expands) | **aca-blog-writer** / **life-insurance-blog-writer** |
| Write any non-insurance article | **blog-post-writer** |
| Pre-publish structural audit (pass/fail, read-only) | **aeo-website-checklist** (the audit; supersedes `seo-aeo-page-audit`) |
| Content quality score 0–100 (the ≥85 gate) | **page-quality-score** |
| Take the whole site to publish-ready (audit → score → fix → publish) | **website-quality-loop** (the orchestrator) |

Typical flow: **brand-design-kit → insurance-website-builder → (ambrose-insurance-data + a writer) → aeo-website-checklist + page-quality-score (or run them both via website-quality-loop) → publish.**

## Non-negotiables on every page (Four-Pillar AI-Citation Standard)
1. **Authorship** — `Article/WebPage` schema with Org author `"Big Sioux Benefits Data Desk"`;
   advisor (Dale Hofer) is a visible byline / `reviewedBy` (single-Person YMYL authors banned).
   `datePublished` + `dateModified` always present.
2. **FAQPage** — 3–5 real-query Q&As.
3. **Dataset** — one block per `.gov`/authoritative figure cited; `creator.url` = exact endpoint
   (e.g. `cdc.gov/places`, `cms.gov`, `census.gov`).
4. **Agentic readiness** — valid `/llms.txt` ("Tools (agent-callable)" section); AI crawlers not
   blocked (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot,
   Bingbot); WebMCP (`/.well-known/mcp.json` + `/mcp` + in-page `navigator.modelContext`).

Schema is centralized in `src/lib/schema.ts` — don't hand-roll JSON-LD in pages.

## Compliance (Medicare — mandatory)
TPMO + non-affiliation disclaimer in the footer & posts; **state "we do not offer every plan"**;
no banned superlatives ("best", "#1", "cheapest", "top-rated"); never call a $0-premium plan
"free"; no implied government/CMS endorsement; TCPA consent on call/text CTAs; education, not
advice. `aeo-website-checklist` **Part J** reads the finished copy and blocks publish on violations
(and **Part K** flags client-side HIPAA/CIPA tracking pixels on health pages).

## Content & data
- Pages are data-driven: `src/lib/content.ts` (coverage / education / tools / services arrays) +
  `src/lib/posts.ts` (blog). Edit the array → the page appears. Blog authoring recipe in
  `BLOG-AUTHORING.md`.
- Every statistic must trace to a real `.gov`/Brain figure (value + year + exact endpoint). Never
  fabricate; if you can't source it, cut it.

## Build & deploy
```bash
npm install
npm run dev                         # http://localhost:4321
DEPLOY_TARGET=cloudflare npm run build   # use npm run build (runs the image-optimizer prebuild)
grep -rEl "pages\.dev|netlify\.app|vercel\.app|workers\.dev|localhost" dist | wc -l   # must be 0
```
Canonical must be the production domain, never `*.pages.dev`. Test desktop + mobile, then run
`aeo-website-checklist` (resolve every 🔴, incl. Four-Pillar + Parts J/K) and `page-quality-score`
(≥85) before publish — or run both gates plus the fix loop via `website-quality-loop`.
