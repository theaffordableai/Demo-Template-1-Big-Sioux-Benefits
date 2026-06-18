// ---------------------------------------------------------------------------
// South Dakota & Sioux Falls Medicare — REAL data pulled from the SAA MCP brain.
// Sources: CMS PY2026 MA/Part D Landscape, CMS Medicare market stats, CMS county
// enrollment, CMS 2026 Star Ratings, CMS plan-detail (premium/LIPS/OOP/MOOP),
// CMS Hospital Compare, CDC PLACES 2023, CMS Medicaid & CHIP enrollment snapshot.
// Every blog post renders from THIS file. Never invent numbers.
// ---------------------------------------------------------------------------

export const SD_SOURCES = {
  cmsLandscape: { name: "CMS Medicare Advantage / Part D Landscape (PY2026)", url: "https://www.cms.gov/medicare/health-drug-plans/medicare-advantage-part-d-contract-directory/landscape" },
  cmsMarketStats: { name: "CMS Medicare Advantage Market Statistics (2026)", url: "https://www.cms.gov/data-research/statistics-trends-reports/medicare-advantagepart-d-contract-and-enrollment-data" },
  cmsEnrollment: { name: "CMS Medicare Monthly Enrollment by County (2026)", url: "https://www.cms.gov/data-research/statistics-trends-reports/medicare-monthly-enrollment" },
  cmsStarRatings: { name: "CMS Medicare Advantage & Part D Star Ratings (2026)", url: "https://www.cms.gov/medicare/health-drug-plans/part-c-d-performance-data" },
  cmsHospital: { name: "CMS Hospital Compare — Overall Star Ratings", url: "https://data.cms.gov/provider-data/dataset/xubh-q36u" },
  cdcPlaces: { name: "CDC PLACES: Local Data for Better Health, County 2023", url: "https://data.cdc.gov/500-Cities-Places/PLACES-County-Data/swc5-untb" },
  medicaid: { name: "Medicaid & CHIP Enrollment Snapshot (CMS, monthly)", url: "https://data.medicaid.gov/dataset/6165f45b-ca93-5bb5-9d06-db29c692a360" },
};

// 2026 federal cost rails that apply to Part D / MA plans nationwide (CMS).
export const RAILS_2026 = {
  partDoopCap: 2100,      // 2026 Part D out-of-pocket maximum
  partDdeductibleMax: 615, // standard Part D deductible ceiling
  dsnpPremium: 41.5,      // the D-SNP consolidated premium in SD (Part D basic)
  dsnpLipsCovered: 41.5,  // amount CMS's Low-Income Premium Subsidy pays for full-duals
};

// Statewide market — CMS PY2026 landscape + market stats.
export const SD_MARKET = {
  uniquePlans: 38,
  orgs: 9,
  // by plan type (statewide): count, orgs, county footprint, avg premium, max
  byType: [
    { type: "PPO (Medicare Advantage)", plans: 13, orgs: 5, counties: 51, avg: 35.56, max: 205 },
    { type: "PDP (stand-alone Part D)", plans: 11, orgs: 6, counties: "statewide", avg: 0, max: 0 },
    { type: "Cost (Medicare Cost plan)", plans: 8, orgs: 1, counties: 48, avg: 81.15, max: 334.7 },
    { type: "PPO D-SNP (Dual-Eligible)", plans: 4, orgs: 2, counties: 51, avg: 41.5, max: 41.5 },
    { type: "HMO I-SNP (Institutional)", plans: 2, orgs: 1, counties: 23, avg: 42, max: 72 },
  ],
  // by parent organization (statewide)
  byOrg: [
    { org: "Medica", plans: 12, counties: 66, avg: 80.57, max: 334.7, note: "Medicare Cost plans" },
    { org: "Aetna / CVS Health", plans: 6, counties: 35, avg: 26.84, max: 52, note: "PPO + D-SNP" },
    { org: "UnitedHealthcare", plans: 5, counties: 48, avg: 27.67, max: 41.5, note: "Highest-rated D-SNP (4.5★)" },
    { org: "Sanford Health (Align + Great Plains)", plans: 4, counties: 30, avg: 37.93, max: 72, note: "Local Sanford-backed PPO + I-SNP" },
    { org: "Wellmark / BCBS", plans: 3, counties: 43, avg: 41.28, max: 80, note: "Enhanced PPO" },
    { org: "Humana", plans: 3, counties: 1, avg: 0, max: 0, note: "Part D only" },
  ],
};

// County Medicare enrollment — CMS 2026 (top markets, full pulled list).
export const SD_ENROLLMENT = [
  { county: "Minnehaha (Sioux Falls)", n: 39532 },
  { county: "Pennington (Rapid City)", n: 21952 },
  { county: "Lincoln (Sioux Falls metro)", n: 12719 },
  { county: "Brown (Aberdeen)", n: 9008 },
  { county: "Lawrence (Spearfish)", n: 6515 },
  { county: "Yankton", n: 6242 },
  { county: "Codington (Watertown)", n: 5585 },
  { county: "Brookings", n: 5022 },
  { county: "Beadle (Huron)", n: 4558 },
  { county: "Meade (Sturgis)", n: 4526 },
  { county: "Davison (Mitchell)", n: 4043 },
  { county: "Hughes (Pierre)", n: 3534 },
];

// Plan-count extremes across SD counties (CMS landscape, county offerings).
export const SD_COUNTY_SPREAD = {
  most: [["Brookings", 14], ["Day", 14], ["Deuel", 14]] as [string, number][],
  fewest: [["Edmunds", 1], ["McPherson", 1], ["Tripp", 2]] as [string, number][],
  siouxFallsMetro: 11,
};

// ---------------------------------------------------------------------------
// MINNEHAHA COUNTY (Sioux Falls) — the complete 2026 roster of plans that carry
// Part D drug coverage. 11 Medicare Advantage (Part C) plans + 4 Medicare Cost
// plans = 15 total. Star rating = CMS Overall Star Rating (the published quality
// + stability measure). "—" = too new to be rated.
// ---------------------------------------------------------------------------

export interface SFPlan {
  name: string; carrier: string; id: string; type: "PPO" | "D-SNP" | "I-SNP" | "Cost";
  premium: number | null; stars: number | null; deductible: number; note?: string;
}

// 5 standard Medicare Advantage PPOs (open to anyone with Medicare in the county)
export const SF_MAPD: SFPlan[] = [
  { name: "Aetna Medicare Signature (PPO)", carrier: "Aetna / CVS", id: "H1608-120", type: "PPO", premium: 0, stars: 3.5, deductible: 615 },
  { name: "Align ChoicePlus (PPO)", carrier: "Sanford Health", id: "H8385-003", type: "PPO", premium: 0, stars: 3.5, deductible: 350 },
  { name: "Aetna Medicare Enhanced Extra (PPO)", carrier: "Aetna / CVS", id: "H1608-119", type: "PPO", premium: 52, stars: 3.5, deductible: 615 },
  { name: "Align ChoiceElite (PPO)", carrier: "Sanford Health", id: "H8385-001", type: "PPO", premium: 66, stars: 3.5, deductible: 300 },
  { name: "Blue Medicare Advantage Enhanced (PPO)", carrier: "Wellmark / BCBS", id: "H5900-004", type: "PPO", premium: 80, stars: 3.5, deductible: 300 },
];

// 4 Dual-Eligible Special Needs Plans (D-SNP) — for people on Medicare + Medicaid
export const SF_DSNP: SFPlan[] = [
  { name: "UHC Dual Complete SD-Q1 (PPO D-SNP)", carrier: "UnitedHealthcare", id: "H2001-046", type: "D-SNP", premium: 41.5, stars: 4.5, deductible: 615, note: "Part C 4.5★ / Part D 4.0★; $0 cost-sharing; coordination-only" },
  { name: "UHC Dual Complete SD-S2 (PPO D-SNP)", carrier: "UnitedHealthcare", id: "H2001-077", type: "D-SNP", premium: 41.5, stars: 4.5, deductible: 615, note: "Part C 4.5★ / Part D 4.0★; $0 cost-sharing; coordination-only" },
  { name: "Aetna Medicare Dual (PPO D-SNP)", carrier: "Aetna / CVS", id: "H1608-062", type: "D-SNP", premium: 41.5, stars: 3.5, deductible: 615, note: "$0 cost-sharing; coordination-only" },
  { name: "Aetna Medicare Full Dual (PPO D-SNP)", carrier: "Aetna / CVS", id: "H1608-121", type: "D-SNP", premium: 41.5, stars: 3.5, deductible: 615, note: "$0 cost-sharing; coordination-only" },
];

// 2 Institutional Special Needs Plans (I-SNP) — nursing-home residents only
export const SF_ISNP: SFPlan[] = [
  { name: "Great Plains Medicare Advantage (HMO I-SNP)", carrier: "Sanford Health", id: "H1787-001", type: "I-SNP", premium: 12, stars: null, deductible: 615, note: "New contract — not yet rated" },
  { name: "Great Plains Medicare Advantage Gold (HMO I-SNP)", carrier: "Sanford Health", id: "H1787-002", type: "I-SNP", premium: 72, stars: null, deductible: 0, note: "New contract — not yet rated" },
];

// 4 Medicare Cost plans (Medica) — drug-carrying, different animal from MA
export const SF_COST: SFPlan[] = [
  { name: "Medica Prime Solution Thrift w/Rx (Cost)", carrier: "Medica", id: "H2450-007", type: "Cost", premium: 92.8, stars: 3.5, deductible: 615 },
  { name: "Medica Prime Solution Standard w/Rx (Cost)", carrier: "Medica", id: "H2450-049", type: "Cost", premium: 58.7, stars: 3.5, deductible: 250, note: "Part D premium shown" },
  { name: "Medica Prime Solution Core w/Rx (Cost)", carrier: "Medica", id: "H2450-035", type: "Cost", premium: 221.7, stars: 3.5, deductible: 615 },
  { name: "Medica Prime Solution Premier w/Rx (Cost)", carrier: "Medica", id: "H2450-037", type: "Cost", premium: 334.7, stars: 3.5, deductible: 615 },
];

export const SF_MARKET = {
  county: "Minnehaha",
  city: "Sioux Falls",
  medicareEnroll: 39532,
  partCplans: 11,          // 5 PPO + 4 D-SNP + 2 I-SNP
  costPlans: 4,            // Medica
  totalDrugPlans: 15,
  zeroPremiumMAPD: 2,      // Aetna Signature + Align ChoicePlus
  carriersServing: 5,      // Aetna, Sanford, UHC, Wellmark, Medica (+ Humana PDP statewide)
  topStar: 4.5,
};

// Iowa side — Sioux County, IA (cross-border comparison)
export const SIOUX_COUNTY_IA = { plans: 21, zeroPremium: 6 };

// CDC PLACES 2023 — adults, Minnehaha County (model-based prevalence)
export const SF_HEALTH = [
  { label: "High blood pressure", value: 31.7 },
  { label: "Obesity", value: 37.4 },
  { label: "Arthritis", value: 22.9 },
  { label: "Depression", value: 22.3 },
  { label: "Diagnosed diabetes", value: 10.0 },
  { label: "Cancer (non-skin)", value: 8.0 },
  { label: "COPD", value: 5.6 },
  { label: "Coronary heart disease", value: 5.5 },
];
export const SF_HEALTH_POP = 206930;
export const SF_CHECKUP = 76.6;   // % adults with a routine checkup in past year
export const SF_UNINSURED = 8.8;  // % adults 18-64 uninsured

// CMS Hospital Compare — Overall Star Rating, Sioux Falls
export const SF_HOSPITALS = [
  { name: "Sanford USD Medical Center", stars: 5, system: "Sanford Health" },
  { name: "Avera McKennan Hospital & University Health Center", stars: 4, system: "Avera Health" },
  { name: "Sioux Falls VA Medical Center", stars: 5, system: "U.S. Dept. of Veterans Affairs" },
];

// CMS Medicaid & CHIP snapshot — South Dakota (early 2026)
export const SD_MEDICAID = { total: 122936, period: "February 2026", expansionState: true };

// Stability tier from CMS star rating — CMS's published measure, neutral labels.
export function stabilityTier(stars: number | null): { label: string; tone: "strong" | "average" | "watch" } {
  if (stars == null) return { label: "Unrated (too new)", tone: "watch" };
  if (stars >= 4) return { label: "Strong (4★+)", tone: "strong" };
  if (stars >= 3.5) return { label: "Average (3.5★)", tone: "average" };
  return { label: "Below average (<3.5★)", tone: "watch" };
}
