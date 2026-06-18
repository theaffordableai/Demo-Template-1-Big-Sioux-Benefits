// Shared Medicare plan query logic.
// ONE implementation, called by BOTH the human widget and the agent-facing /mcp
// endpoint — so the tool an AI calls and the button a human clicks run identical code.
//
// Data is a real, unmodified subset of the CMS PY2026 Medicare Advantage / Part D
// Landscape (138,263 rows total). Never fabricate: a ZIP we don't have returns a
// clear "unavailable" with the list of supported ZIPs — it does not guess.

import dataset from "../data/plans.json";

export interface Plan {
  id: string;
  name: string;
  carrier: string;
  type: string;
  snp: boolean;
  premium: number;
  drug_deductible: number | null;
  stars: number | null;
  moop: number | null;
}

export interface ZipRecord {
  zip: string;
  city: string;
  county: string;
  state: string;
  county_total_ma_pd: number;
  plans: Plan[];
}

interface Dataset {
  meta: {
    source: string;
    source_url: string;
    total_landscape_rows: number;
    note: string;
    demo_zips: { zip: string; city: string; county: string; state: string }[];
  };
  zips: Record<string, ZipRecord>;
}

const DATA = dataset as unknown as Dataset;

export const META = DATA.meta;
export const SUPPORTED_ZIPS = DATA.meta.demo_zips;

export interface SearchArgs {
  zip?: string;
  plan_type?: string;       // HMO | PPO | (substring match on type)
  max_premium?: number;
  min_star_rating?: number;
  sort?: "premium" | "stars" | "moop";
  limit?: number;
}

export interface SearchResult {
  ok: boolean;
  message?: string;
  zip?: string;
  location?: string;
  county_total_ma_pd?: number;
  returned?: number;
  source?: string;
  source_url?: string;
  disclaimer?: string;
  supported_zips?: string[];
  plans?: Plan[];
}

const DISCLAIMER =
  "Estimate from CMS PY2026 public data for demo ZIPs only. Plan availability, benefits, and costs change — verify with a licensed agent or Medicare.gov before enrolling.";

export function searchPlans(args: SearchArgs): SearchResult {
  const zip = (args.zip || "").trim();
  if (!/^\d{5}$/.test(zip)) {
    return {
      ok: false,
      message: "Provide a 5-digit ZIP code.",
      supported_zips: SUPPORTED_ZIPS.map((z) => z.zip),
    };
  }

  const rec = DATA.zips[zip];
  if (!rec) {
    return {
      ok: false,
      message: `No plan data loaded for ZIP ${zip}. This demo ships a real CMS subset for selected ZIPs only.`,
      supported_zips: SUPPORTED_ZIPS.map((z) => `${z.zip} (${z.city}, ${z.state})`),
    };
  }

  let plans = rec.plans.slice();

  if (args.plan_type) {
    const t = args.plan_type.toLowerCase();
    plans = plans.filter((p) => p.type.toLowerCase().includes(t));
  }
  if (typeof args.max_premium === "number") {
    plans = plans.filter((p) => p.premium <= args.max_premium!);
  }
  if (typeof args.min_star_rating === "number") {
    plans = plans.filter((p) => (p.stars ?? 0) >= args.min_star_rating!);
  }

  const sort = args.sort || "premium";
  plans.sort((a, b) => {
    if (sort === "stars") return (b.stars ?? 0) - (a.stars ?? 0) || a.premium - b.premium;
    if (sort === "moop") return (a.moop ?? Infinity) - (b.moop ?? Infinity) || a.premium - b.premium;
    return a.premium - b.premium || (b.stars ?? 0) - (a.stars ?? 0);
  });

  const limit = Math.min(args.limit ?? 15, 50);
  plans = plans.slice(0, limit);

  return {
    ok: true,
    zip,
    location: `${rec.city}, ${rec.county} County, ${rec.state}`,
    county_total_ma_pd: rec.county_total_ma_pd,
    returned: plans.length,
    source: META.source,
    source_url: META.source_url,
    disclaimer: DISCLAIMER,
    plans,
  };
}

export function comparePlans(ids: string[]): SearchResult {
  if (!Array.isArray(ids) || ids.length < 2 || ids.length > 5) {
    return { ok: false, message: "Provide 2–5 plan IDs (ContractPlanID) to compare." };
  }
  const all = Object.values(DATA.zips).flatMap((z) => z.plans);
  const found: Plan[] = [];
  for (const id of ids) {
    const p = all.find((x) => x.id === id);
    if (p && !found.some((f) => f.id === p.id)) found.push(p);
  }
  if (found.length < 2) {
    return {
      ok: false,
      message: "Could not find at least 2 of those plan IDs in the loaded demo data.",
    };
  }
  return {
    ok: true,
    returned: found.length,
    source: META.source,
    source_url: META.source_url,
    disclaimer: DISCLAIMER,
    plans: found,
  };
}
