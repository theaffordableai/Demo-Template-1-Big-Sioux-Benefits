---
name: page-quality-score
description: Score the CONTENT QUALITY of a single web page 0–100 (the ≥85 publish gate), separate from the structural checklist audit. Grades depth & completeness, first-hand E-E-A-T / originality, accuracy & sourcing, FRESHNESS (outdated stats / old dateModified / deprecated rules = deduction → routes the page to a rewrite), and readability & helpfulness — each on an explicit 0–20 band. Runs the score 2–3 times and takes the MEDIAN to kill inter-scorer variance, and flags low-confidence pages (spread >10). Returns the composite score, a per-dimension breakdown, the weakest dimension (the improvement lever), and a freshness verdict. Use for "quality score", "score this page", "is the content good enough", "rate page quality", "content quality", or as the ≥85 gate inside `website-quality-loop`. Pairs with `aeo-website-checklist` (structural pass/fail) — together they form the two publish gates.
---

# Page Quality Score (0–100, ≥85 gate)

Answers a different question than the checklist: not *"is it structurally ready?"* but ***"is the content actually good?"*** A page can pass the checklist (right schema) and still be thin, generic, or stale. Graded, not pass/fail. The **≥85 gate** is the publish bar.

> Why this is its own skill: graded quality is subjective and **noisy** if a single agent scores it (we measured a 47-vs-90 spread on one page). This skill makes the rubric explicit AND scores multiple times to converge. Keep it separate from the binary `aeo-website-checklist`.

## The banded rubric — 5 dimensions × 0–20 = 100
Score each dimension on its band; **always quote the evidence** for the number.

**1. Depth & completeness (0–20)** — does it fully answer the page's intent + the sub-questions a reader has?
- 17–20 comprehensive, covers edge cases · 12–16 solid but gaps · 7–11 thin/one-dimensional · 0–6 stub/placeholder.

**2. First-hand E-E-A-T / originality (0–20)** — real experience, specific local detail, a named credentialed advisor, original framing (not generic rephrasing).
- 17–20 clear first-hand "we did X, here's what happened" + named expert · 12–16 some originality · 7–11 generic · 0–6 boilerplate.

**3. Accuracy & sourcing (0–20)** — claims backed (ideally a number), sources linked inline, no fabrication, YMYL disclaimers correct.
- 17–20 every claim supported + sourced · 12–16 mostly · 7–11 naked claims · 0–6 unsupported/risky.

**4. Freshness (0–20)** — current data, recent `dateModified`, no deprecated years/rules. **Stale = deduction → flag for rewrite** (this is how "old info pushes the AI to update it").
- 17–20 current (≤3 mo or evergreen-correct) · 12–16 ≤12 mo · 7–11 **10–16 mo (refresh due)** · 0–6 outdated stats/old plan-year/deprecated.

**5. Readability & helpfulness (0–20)** — scannable, right reading level (senior/YMYL → plain), jargon defined, momentum, feels written by a person.
- 17–20 effortless + scannable · 12–16 fine · 7–11 dense/templated · 0–6 AI-slop/unscannable.

**Composite = sum (0–100). Gate: ≥85 = publish-quality.**

## Multi-scorer (kills the variance — REQUIRED)
1. Fetch the page once (browser UA).
2. Score the 5 dimensions **independently 3 times** (e.g., 3 sub-agent passes, or 3 deliberate independent passes), each producing a composite.
3. Report the **MEDIAN** composite as the score.
4. **Confidence:** if the spread (max−min) across the 3 is **>10**, mark `confidence: low` and widen review — don't let a noisy score gate a publish/fix decision.
5. Per-dimension: report the median of each dimension so the **weakest dimension** (the improvement lever) is stable.

## Output
```
QUALITY — <url>
Score: <median>/100   (gate ≥85: PASS/UNDER)   confidence: high|low (spread <n>)
  Depth <n>/20 · E-E-A-T <n>/20 · Accuracy <n>/20 · Freshness <n>/20 · Readability <n>/20
Weakest: <dimension> — <why> → <what to add/rewrite>
Freshness: CURRENT | REFRESH-DUE (10–16 mo) | STALE → <action>
```

## Guardrails
- Quote evidence for every dimension number (word count, the missing source, the stale year, the jargon term) — no vibes-only scores.
- Freshness deduction must name the stale element (the old stat/year/`dateModified`).
- This skill does NOT change the page. It pairs with `aeo-website-checklist` (structural). The fix→re-score loop is `website-quality-loop`; improvers are `blog-rewrite` / `blog-page-factory` / `location-page-factory`.
