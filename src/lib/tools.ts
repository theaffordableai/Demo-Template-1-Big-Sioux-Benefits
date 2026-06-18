// Canonical WebMCP tool definitions for this site.
// Imported by BOTH the executable endpoint (src/pages/mcp.ts) and the discovery
// manifest (src/pages/.well-known/mcp.json.ts) so tools/list and the published
// manifest can never drift apart.
//
// TOOL CONTRACT (every tool): the user (or an AI agent) passes inputs and gets an
// instant PREVIEW. The FULL report is gated behind an `email`. Pass `email` to
// unlock the full result. This is the same logic the on-page widgets call, so a
// browsing agent and a human get identical tools. No PII is stored here (spec §3);
// the page's GHL form captures the lead separately.

import { searchPlans, comparePlans } from "./plans";
import { irmaa, eligibility, partBPenalty, partDPenalty, drugEstimate } from "./calc";

export interface ToolDef {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  run: (args: any) => unknown;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const gated = (email: unknown) => typeof email === "string" && EMAIL_RE.test(email);
const lock = (preview: unknown) => ({
  ...(preview as object),
  full_report_locked: true,
  unlock: "Enter your email to get the full personalized report (and we'll send a copy you can keep).",
});

export const TOOLS: ToolDef[] = [
  {
    name: "medicare_plan_finder",
    description:
      "Find and rank Medicare Advantage (Part C) plans with drug coverage by ZIP. Instant preview " +
      "shows how many plans serve the ZIP, the lowest premium, and the top-rated plan. Pass `email` " +
      "to unlock the full ranked table. Real CMS PY2026 Landscape data.",
    inputSchema: {
      type: "object",
      properties: {
        zip: { type: "string", description: "5-digit ZIP code" },
        email: { type: "string", description: "Email to unlock the full ranked report" },
      },
      required: ["zip"],
    },
    run: (a) => {
      const full = searchPlans(a ?? {}) as any;
      const plans = full.plans ?? [];
      const cheapest = plans[0];
      const topRated = [...plans].sort((x, y) => (y.stars ?? 0) - (x.stars ?? 0))[0];
      const preview = {
        zip: full.zip ?? a?.zip,
        county: full.county,
        plans_available: plans.length,
        lowest_premium: cheapest ? `$${cheapest.premium}/mo` : "—",
        top_rated: topRated ? `${topRated.name} (${topRated.stars}★)` : "—",
        zero_premium_plans: plans.filter((p: any) => Number(p.premium) === 0).length,
      };
      return gated(a?.email) ? { ...preview, plans, full_report_unlocked: true } : lock(preview);
    },
  },
  {
    name: "medicare_compare_plans",
    description:
      "Compare 2–5 Medicare Advantage plans side by side by ContractPlanID (from medicare_plan_finder).",
    inputSchema: {
      type: "object",
      properties: { plan_ids: { type: "array", items: { type: "string" } } },
      required: ["plan_ids"],
    },
    run: (a) => comparePlans(a?.plan_ids ?? []),
  },
  {
    name: "irmaa_calculator",
    description:
      "Estimate your Medicare IRMAA — the income-related surcharge on Part B & Part D. Preview shows " +
      "your tier and Part B monthly premium; pass `email` for the full surcharge + annual breakdown.",
    inputSchema: {
      type: "object",
      properties: {
        income: { type: "number", description: "Modified adjusted gross income (MAGI), USD" },
        filing: { type: "string", enum: ["single", "married"], description: "Tax filing status" },
        email: { type: "string", description: "Email to unlock the full report" },
      },
      required: ["income"],
    },
    run: (a) => {
      const r = irmaa(Number(a?.income) || 0, a?.filing === "married" ? "married" : "single") as any;
      const preview = {
        tier: r.tier,
        has_surcharge: r.has_surcharge,
        part_b_monthly: `$${r.part_b_monthly}`,
        headline: r.has_surcharge
          ? `You're in IRMAA tier ${r.tier} — expect surcharges on Part B and Part D.`
          : "Good news — at this income you pay the standard premium, no IRMAA surcharge.",
        source_year: r.source_year,
      };
      return gated(a?.email) ? { ...r, full_report_unlocked: true } : lock(preview);
    },
  },
  {
    name: "medicare_eligibility",
    description:
      "Find your Medicare Initial Enrollment Period (IEP) from your birth month/year. Preview shows when " +
      "you turn 65 and your enrollment window; pass `email` for the full timing + penalty-avoidance plan.",
    inputSchema: {
      type: "object",
      properties: {
        birth_month: { type: "integer", description: "1-12" },
        birth_year: { type: "integer", description: "e.g. 1961" },
        email: { type: "string", description: "Email to unlock the full report" },
      },
      required: ["birth_month", "birth_year"],
    },
    run: (a) => {
      const r = eligibility(Number(a?.birth_month) || 1, Number(a?.birth_year) || 1960) as any;
      const preview = { turns_65: r.turns_65, iep_start: r.iep_start, iep_end: r.iep_end, iep_window_months: 7 };
      return gated(a?.email) ? { ...r, full_report_unlocked: true } : lock(preview);
    },
  },
  {
    name: "part_b_penalty",
    description:
      "Estimate the lifetime Part B late-enrollment penalty for enrolling late. Preview shows your penalty " +
      "percentage; pass `email` for the monthly + lifetime dollar impact.",
    inputSchema: {
      type: "object",
      properties: {
        months_late: { type: "integer", description: "Months you were eligible but not enrolled" },
        email: { type: "string", description: "Email to unlock the full report" },
      },
      required: ["months_late"],
    },
    run: (a) => {
      const r = partBPenalty(Number(a?.months_late) || 0) as any;
      const preview = { penalty_percent: `${r.penalty_percent}%`, full_12mo_periods: r.full_12mo_periods,
        headline: r.penalty_percent > 0 ? `A ${r.penalty_percent}% Part B penalty would be added to your premium for life.` : "No Part B penalty at this timing." };
      return gated(a?.email) ? { ...r, full_report_unlocked: true } : lock(preview);
    },
  },
  {
    name: "part_d_penalty",
    description:
      "Estimate the Part D (drug coverage) late-enrollment penalty. Preview shows the monthly penalty; pass " +
      "`email` for the annual impact and how to avoid it.",
    inputSchema: {
      type: "object",
      properties: {
        months_late: { type: "integer", description: "Months without creditable drug coverage" },
        email: { type: "string", description: "Email to unlock the full report" },
      },
      required: ["months_late"],
    },
    run: (a) => {
      const r = partDPenalty(Number(a?.months_late) || 0) as any;
      const preview = { penalty_monthly: `$${r.penalty_monthly}/mo`, months_late: r.months_late };
      return gated(a?.email) ? { ...r, full_report_unlocked: true } : lock(preview);
    },
  },
  {
    name: "drug_cost_estimate",
    description:
      "Estimate your annual out-of-pocket drug spend under the 2025 $2,000 Part D cap. Preview shows whether " +
      "you'll hit the cap; pass `email` for the full breakdown.",
    inputSchema: {
      type: "object",
      properties: {
        monthly_retail: { type: "number", description: "Approx. retail cost of your monthly prescriptions, USD" },
        email: { type: "string", description: "Email to unlock the full report" },
      },
      required: ["monthly_retail"],
    },
    run: (a) => {
      const r = drugEstimate(Number(a?.monthly_retail) || 0) as any;
      const preview = { you_pay_estimate: `$${r.you_pay_estimate}/yr`, capped: r.capped, cap: `$${r.cap}` };
      return gated(a?.email) ? { ...r, full_report_unlocked: true } : lock(preview);
    },
  },
];

export function callTool(name: string, args: any): { ok: boolean; result?: unknown; error?: string } {
  const tool = TOOLS.find((t) => t.name === name);
  if (!tool) return { ok: false, error: `Unknown tool: ${name}` };
  try {
    return { ok: true, result: tool.run(args) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
