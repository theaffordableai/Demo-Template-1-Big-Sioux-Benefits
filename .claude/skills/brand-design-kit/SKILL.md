---
name: brand-design-kit
description: >-
  Self-contained skill to generate the complete BRAND SYSTEM for an insurance/Medicare agency site — color palette + theme tokens, font pairing, logo system, advisor photo direction, component patterns, animation language, and brand voice — and emit it as the design tokens + config the website builder and blog writers read in STEP 0. Ported from the Big Sioux Benefits design DNA. Produces a portable brand kit (design-tokens.css + site.config.ts brand block + voice profile) so every page and article looks premium, on-brand, and consistent. Use to create a brand from scratch, reskin for a new client, or document an existing brand. Trigger on: "create the brand kit", "brand system", "design tokens", "pick fonts/colors for <client>", "brand voice", "reskin the brand", "logo system".
---

# Brand Design Kit (insurance agency) — self-contained

Generates ONE complete, premium brand system and emits it as the **design tokens + config the website builder and blog writers consume in their STEP 0**. Ported from the Big Sioux Benefits design DNA — the "$25k look": premium, trustworthy, depth, generous whitespace; not flat, not busy.

The output is portable: `reference/design-tokens.css` + the brand block of `src/config/site.config.ts` + a short `voice-profile`. Swap these to reskin a site without touching page templates.

---

## What the brand kit defines

### 1. Palette (theme tokens)
- **ink** (deep navy), **primary** (brand color), **primary-dark**, **accent** (CTA, e.g. gold), **soft** (tint bg), **line** (borders), **muted** (secondary text).
- Emit as CSS custom properties in `design-tokens.css` AND mirror in `site.config.ts`. **Never hardcode hex in components** — everything references the tokens. WCAG AA contrast on all text/CTA pairs.

### 2. Fonts (pairing)
- **Display/headings** — an elegant serif (e.g. Fraunces) for trust + warmth.
- **Body** — a clean sans (e.g. Inter) for readability (senior audience).
- **Eyebrows/labels** — a mono (e.g. IBM Plex Mono).
- Self-host or use a performant font strategy; set explicit fallbacks; avoid CLS.

### 3. Logo system
- A **minimal symbolic mark** tied to the locale/brand meaning (e.g. flowing water for a river city). **NEVER a letters-only mark.** Provide light/dark variants + favicon + a clear-space rule. Asset in `assets/logo.*`.

### 4. Advisor photo direction
- **Chest-up portrait, plain shirt, no logo**, friendly/approachable. This is the recurring human across the site. Define how to generate consistent variants (same person, in-context scenes). The advisor — not anonymous stock — is the hero of every page/post.

### 5. Component patterns
- Hero (gradient + texture + advisor + floating stat card), trust bar, dark data band (stat numbers), services grid (icon cards), 3-step how-it-works, testimonial, CTA band, premium multi-column footer. Rounded 14–22px, soft shadows.

### 6. Animation language
- Scroll-reveal fade-ups, hero entrance, **count-up** on stats, hover lifts. **Always respect `prefers-reduced-motion`** + an a11y "pause motion" toggle.

### 7. Brand voice (`voice-profile`)
- Tone (e.g. warm, local, plain-spoken, no-pressure, independent), reading level (senior audience → ~6th–8th grade), do/don't word lists, banned terms (no superlatives, no "free" for $0 plans, no implied government affiliation). The blog writers read this in their STEP 0.

---

## Compliance note (the brand can't break the rules)
The brand system must support, never undermine, insurance-marketing compliance: footer space for TPMO + non-affiliation disclaimers, no imagery implying government endorsement (no Medicare card / federal seal motifs), voice rules that ban superlatives and "every/all plans" overclaims. Flag any brand request that would create a compliance risk.

## Note on AI-citation pillars (brand serves the moat)
The brand kit doesn't emit schema, but it MUST leave room for it: the article template needs a **visible human byline** (the brand's advisor) even though the **schema author is the Organization "<Site> Data Desk"** (Pillar 1, YMYL). Provide a byline component spec (advisor photo + name + "reviewed by" + Org "Data Desk" line) so the writers render it consistently.

---

## Brand-kit checklist (embedded)
- [ ] 🔴 Palette as theme tokens (ink/primary/accent/soft/line/muted); WCAG AA contrast; mirrored in design-tokens.css + site.config.ts; no hardcoded hex
- [ ] 🔴 Font pairing (display serif + body sans + mono eyebrow) with fallbacks; CLS-safe
- [ ] 🔴 Logo system — symbolic mark (NOT letters-only), light/dark + favicon + clear-space
- [ ] 🔴 Advisor photo direction (chest-up, plain shirt, no logo) — the recurring human; never anonymous stock; unique-image-per-page rule documented for the builder/writers
- [ ] 🔴 Byline component spec: visible advisor byline + reviewedBy, with schema author = Org "<Site> Data Desk" (YMYL Pillar 1)
- [ ] 🔴 Voice profile (tone, reading level, banned terms: no superlatives / "free"-misuse / government-affiliation / "every-plan")
- [ ] 🟡 Component patterns (hero/trust bar/data band/services/how-it-works/testimonial/CTA/footer) + animation language (reduced-motion safe)
- [ ] 🟡 Footer leaves room for TPMO + non-affiliation disclaimers

## Related
Feeds `insurance-website-builder` (reads tokens + config) and the 4 blog writers (read brand colors/fonts/voice + byline spec in STEP 0). Pairs with `location-page-factory` and `seo-aeo-page-audit`.
