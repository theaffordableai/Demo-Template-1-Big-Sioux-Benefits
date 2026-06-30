---
name: website-quality-loop
description: The orchestrator that takes a whole website to publish-ready — runs the AEO checklist + the 0–100 quality score on every page, then loops (fix → re-score) up to 3× per page, routing each failing page to the RIGHT builder (location-page-factory, blog-page-factory/blog-rewrite, aeo-readiness, insurance-website-builder) instead of band-aiding it, and publishes pages that pass both gates (checklist PASS + quality ≥85) or are user-WAIVED. Three parts: Part 1 audit+score (read-only), Part 2 fix-loop (mutating, max 3×/page then ask the user), Part 3 publish. Honors per-page/per-site overrides (keep a pixel, accept <85, skip an item). Stands up + runs a parallel Workflow across pages (batches to avoid rate limits). Use for "run the loop", "take the site to 85", "fix until good", "website quality loop", "audit fix and publish the site", "get every page publish-ready", or after `aeo-website-checklist` / `page-quality-score` show a site needs work. Calls `aeo-website-checklist` + `page-quality-score` as its gates.
---

# Website Quality Loop (audit → score → fix → publish)

Conducts the whole site to publish-ready. It does not re-implement the audit or the score — it **composes** `aeo-website-checklist` (structural gate) + `page-quality-score` (≥85 gate) and routes failures to the builders. Deterministic control flow → it **generates and runs a Workflow** (per-page fan-out, capped loop), the way a hand-run Workflow does it.

## Two gates (a page publishes only when both are met or WAIVED)
1. **Checklist** (`aeo-website-checklist`) = PASS (or NEAR with no 🔴).
2. **Quality** (`page-quality-score`) = **≥85**.

## Three parts
**Part 1 — Audit + Score (READ-ONLY).** Inventory pages from the sitemap; check **site-level surfaces once**; per page run the checklist + the (multi-scorer) quality score. Output the per-page matrix. Often all the user wants. Changes nothing.
**Part 2 — Fix loop (MUTATING).** **Site-level fixes first** (one llms.txt/robots/WebMCP/**canonical-domain** fix clears a P0 across every page). Then per page, if checklist FAIL or quality <85 → route to the right builder (table below) → re-run checklist + score → repeat. **Max 3 passes per page.** After 3, **STOP and ask the user**: continue looping, choose which pages to publish as-is, or waive a gate.
**Part 3 — Publish.** Deploy/post pages where **both gates PASS or are WAIVED**. Report "published N, held M, waived W (reasons)."

## Builder routing — regenerate, don't band-aid
| Failing page | Route to |
|---|---|
| thin/stale **location** page | `location-page-factory` |
| thin/stale **blog/article** | `blog-page-factory` (new) / `blog-rewrite` (refresh) |
| schema / llms.txt / WebMCP / structure gaps | `aeo-readiness` |
| missing demo/real data (phone, NPN) | fix `site.config.ts` once (propagates) |
| structural / net-new page or section | `insurance-website-builder` |
A re-generated page comes back at **builder quality**, which is how it actually clears 85 — patches rarely do.

## Gates & overrides — PASS / FAIL / **WAIVED**
The user can override any gate via a per-site/per-page waiver list (`audit.overrides` in `site.config.ts` or `audit-overrides.json`): `{page|glob, gate, reason, approvedBy, date}`. A WAIVED gate **still shows in the report** (never hidden — especially HIPAA/compliance), it just doesn't block. **Compliance/HIPAA waivers require an explicit acknowledgment line.** Publish requires every gate PASS or WAIVED.

## How it runs (the Workflow)
- **Fan out per page**, but **batch** (cap concurrency ~10) — a 49-wide burst gets API-rate-limited; on rate-limit, retry the failures in a smaller batch.
- Quality scoring uses `page-quality-score`'s **multi-scorer median**; if `confidence: low`, don't auto-fix on a noisy score — surface it.
- Loop cap = **3 passes/page**; track each page's pass count; never reset on a still-failing page.
- Pseudocode:
```
siteLevelFixes()                      // once, first
for each page (in batches):
  loop up to 3:
    c = aeo-website-checklist(page)
    q = page-quality-score(page)
    if (c.pass || c.waived) && (q>=85 || q.waived): publish(page); break
    route(page) -> builder.fix()       // regenerate via the right builder
  if still failing after 3: hold(page)
ask user about held pages
```

## Output — the per-page matrix
`page × checklist verdict × quality (median, confidence) × waivers × passes-used × published?` — sorted by what still needs work.

## Guardrails
- **Part 1 is safe** (read-only) — run it freely. **Parts 2–3 mutate/deploy** — only on explicit go; confirm the publish target (Astro→Vercel `DEPLOY_TARGET=vercel` + `vercel deploy --prebuilt --prod`, or WordPress/GHL).
- **DNS / domain connection is never automatic** — if the canonical points at a parked/placeholder domain, surface it and get the user's explicit per-change authorization (don't touch nameservers).
- Cost scales with page count × passes — `log` what's skipped/held; never silently cap.
- The gates are `aeo-website-checklist` + `page-quality-score`; this skill orchestrates, it does not redefine them.
