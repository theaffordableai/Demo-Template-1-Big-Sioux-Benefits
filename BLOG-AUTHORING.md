# BLOG-AUTHORING.md — how to add one SEO + AEO blog post

This is the deterministic recipe the auto-blogging routine (and any human) follows to add ONE
new blog post to this Astro site. Read `BRAND.md` first — all names, disclaimer, and facts come from it.

## Live URLs
- Canonical/production: `https://medicareatx.com/blog/<slug>`
- Cloudflare Pages preview (auto-deploys on push to `main`, ~4–10 min): `https://medicareatx-demo.pages.dev/blog/<slug>`

## What "one post" means — TWO files, always
1. **Create** `src/pages/blog/<slug>.astro` — the post itself.
2. **Prepend** a matching entry to the `posts` array in `src/lib/posts.ts` (newest first). The blog index
   and homepage strip read from `posts.ts`; a post not listed there is orphaned.

`<slug>` = lowercase, hyphenated, keyword-bearing, year-suffixed for time-sensitive topics, and
**unique** (check `src/pages/blog/` and `posts.ts` first — never duplicate or re-cover a topic).

## Copy the proven template
Use `src/pages/blog/turning-65-austin-texas-2026.astro` as the structural template. Keep ALL of:
- Frontmatter: `title` (50–60 chars, keyword first), `description` (140–160 chars), `published` (ISO),
  inline constants for any figures, and a `SRC` object of **real source URLs**.
- `faqs` (5–6 Q&A), `breadcrumbs`, `dataset`, and the `<BaseLayout … pageType="article" {faqs}
  {breadcrumbs} {dataset} datePublished={published} place={…}>` call — this emits Article + FAQPage +
  BreadcrumbList + Dataset JSON-LD automatically. Do not hand-roll schema.
- On-page blocks, in order: hero `<img>` with descriptive alt → `eyebrow` → `<h1>` → `dek` → `byline`
  (author = `site.brand.author`, photo `/img/atx/martin-frey.jpg`) → `tldr` "The bottom line" →
  a 2–4 sentence **direct answer** paragraph → question-shaped `<h2>` sections → at least TWO rich
  blocks (`datatable`, `stats`, ordered how-to, comparison) → `inline-cta` → `oz` data-desk note →
  `Tool` plan-finder embed → `ai-note` (WebMCP) → `faq` accordion → `sources` list → `related` (3 links)
  → final `.section.soft` CTA.

## SEO + AEO rules (non-negotiable)
- Exactly one `<h1>`; clean `h2/h3` nesting; phrase headings as the questions people ask.
- Answer first, elaborate second. Each section self-contained; define terms inline.
- **Every statistic gets a real cited source link** (Medicare.gov, CMS, SSA, Texas HICAP). Never invent
  numbers. If unsure of a figure, describe it qualitatively and link the source.
- FAQ accordion text MUST match the `faqs` array (schema == visible text).
- Descriptive alt text on every image. 2–3 internal links with descriptive anchors.
- Include the compliance disclaimer (the `oz` paragraph covers it; keep it).
- Canonical is handled by BaseLayout (`site.domain` = medicareatx.com). Never hardcode a `pages.dev` URL.

## Topic guidance — Medicare ATX = Austin & Texas Hill Country
Write for Travis / Williamson / Hays county readers. Rotate across a real content cluster, e.g.:
Annual Enrollment Period (Oct 15–Dec 7) in Austin · Medigap vs. Medicare Advantage in Central Texas ·
Part D & the $2,100 cap · IRMAA for high earners · SEP & still-working-at-65 · D-SNP / dual-eligible ·
Medicare & Ascension Seton / St. David's / Baylor Scott & White networks · Travel coverage for snowbirds ·
Dental/vision/hearing gaps · Williamson County / Round Rock / Cedar Park / Georgetown plan landscapes.
Pick a topic NOT already in `posts.ts`.

## Images
Reuse existing assets in `public/img/atx/` (`hero.jpg`, `hero2.jpg`, `square.jpg`, `portrait.jpg`) for the
hero + card `img`. Byline always uses `/img/atx/martin-frey.jpg`.

## Verify before committing
```bash
DEPLOY_TARGET=cloudflare npm run build
grep -rEl 'pages\.dev|netlify\.app|vercel\.app|workers\.dev|localhost' dist | wc -l   # must print 0
grep -o '<link rel="canonical"[^>]*>' dist/blog/<slug>/index.html                      # must be medicareatx.com
```
Build must complete clean. Then commit BOTH files and push to `main`:
```bash
git add src/pages/blog/<slug>.astro src/lib/posts.ts
git commit -m "blog: <title>"
git push origin main
```
Cloudflare Pages builds automatically and the post is live at the two URLs above in ~4–10 minutes.
