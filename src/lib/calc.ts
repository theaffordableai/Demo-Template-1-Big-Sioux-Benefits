// ---------------------------------------------------------------------------
// Medicare calculator engines — pure, documented formulas (NEVER fabricated).
// Figures are the published 2025 federal numbers; the 2026 figures publish each
// fall, so every result is labeled with its source year. These functions back
// the WebMCP tools AND the on-page interactive widgets (same logic, one source).
// ---------------------------------------------------------------------------

export const STD_PART_B_2025 = 185.0; // CMS standard Part B premium, 2025
export const PART_D_BASE_2025 = 36.78; // National base beneficiary premium, 2025
export const PART_D_OOP_CAP_2025 = 2000; // IRA Part D out-of-pocket cap, 2025

const money = (n: number) => Math.round(n * 100) / 100;

// ---- IRMAA (income-related monthly adjustment amount) — 2025 brackets ----
type IrmaaRow = { upTo: number; partB: number; partD: number };
const IRMAA_SINGLE: IrmaaRow[] = [
  { upTo: 106000, partB: 0, partD: 0 },
  { upTo: 133000, partB: 74.0, partD: 13.7 },
  { upTo: 167000, partB: 185.0, partD: 35.3 },
  { upTo: 200000, partB: 295.9, partD: 57.0 },
  { upTo: 500000, partB: 406.9, partD: 78.6 },
  { upTo: Infinity, partB: 443.9, partD: 85.8 },
];

export function irmaa(income: number, filing: "single" | "married" = "single") {
  const mult = filing === "married" ? 2 : 1; // MFJ thresholds are ~2× single
  const rows = IRMAA_SINGLE;
  let row = rows[rows.length - 1];
  for (const r of rows) {
    if (income <= r.upTo * (r.upTo === Infinity ? 1 : mult)) { row = r; break; }
  }
  const tier = rows.indexOf(row);
  const partB = money(STD_PART_B_2025 + row.partB);
  const partDSurcharge = money(row.partD);
  return {
    source_year: 2025,
    filing,
    income,
    tier, // 0 = standard, 1-5 = surcharge tiers
    has_surcharge: tier > 0,
    part_b_monthly: partB,
    part_b_surcharge_monthly: money(row.partB),
    part_d_surcharge_monthly: partDSurcharge,
    total_surcharge_annual: money((row.partB + row.partD) * 12),
    note: "2025 IRMAA brackets (based on your 2023 tax return). 2026 figures adjust for inflation — verify at SSA.gov.",
  };
}

// ---- Initial Enrollment Period (IEP) — pure date math, always exact ----
export function eligibility(birthMonth: number, birthYear: number) {
  // IEP = 7 months: 3 before the month you turn 65, the birthday month, + 3 after.
  const start = new Date(birthYear + 65, birthMonth - 1 - 3, 1);
  const end = new Date(birthYear + 65, birthMonth - 1 + 3 + 1, 0);
  const sixtyFive = new Date(birthYear + 65, birthMonth - 1, 1);
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return {
    turns_65: fmt(sixtyFive),
    iep_start: fmt(start),
    iep_end: fmt(end),
    iep_window_months: 7,
    best_action: "Enroll in the 3 months BEFORE your birthday month so coverage starts the 1st of your birthday month — no gap, no penalty.",
    note: "Initial Enrollment Period is a 7-month window around your 65th birthday. Miss it and Part B/Part D late penalties can apply for life.",
  };
}

// ---- Part B late-enrollment penalty (10% per full 12 months, for life) ----
export function partBPenalty(monthsLate: number) {
  const periods = Math.floor(Math.max(0, monthsLate) / 12);
  const pct = periods * 10;
  const monthly = money(STD_PART_B_2025 * (pct / 100));
  return {
    source_year: 2025,
    months_late: monthsLate,
    full_12mo_periods: periods,
    penalty_percent: pct,
    penalty_monthly: monthly,
    penalty_annual: money(monthly * 12),
    note: "Part B penalty is 10% of the standard premium for each full 12-month period you could have had Part B but didn't — and you pay it for as long as you have Part B.",
  };
}

// ---- Part D late-enrollment penalty (1% of national base × months) ----
export function partDPenalty(monthsLate: number) {
  const m = Math.max(0, Math.round(monthsLate));
  const monthly = Math.round(PART_D_BASE_2025 * 0.01 * m * 10) / 10; // rounded to $0.10
  return {
    source_year: 2025,
    months_late: m,
    penalty_monthly: monthly,
    penalty_annual: money(monthly * 12),
    note: "Part D penalty = 1% of the national base beneficiary premium ($36.78 in 2025) × the number of months you went without creditable drug coverage. Added to your premium for life.",
  };
}

// ---- Annual drug out-of-pocket estimate (2025 IRA $2,000 cap) ----
export function drugEstimate(retailMonthly: number) {
  const annualRetail = Math.max(0, retailMonthly) * 12;
  const youPay = Math.min(annualRetail, PART_D_OOP_CAP_2025);
  return {
    source_year: 2025,
    retail_annual: money(annualRetail),
    you_pay_estimate: money(youPay),
    capped: annualRetail > PART_D_OOP_CAP_2025,
    cap: PART_D_OOP_CAP_2025,
    note: "Under the Inflation Reduction Act, your 2025 out-of-pocket for covered Part D drugs is capped at $2,000. Actual cost depends on your specific drugs and plan formulary.",
  };
}
