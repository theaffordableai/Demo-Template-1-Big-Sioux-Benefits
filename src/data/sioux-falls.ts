// ---------------------------------------------------------------------------
// Sioux Falls / Minnehaha County, SD — REAL brain data, pulled from the SAA
// MCP brain (CMS PY2026 Landscape, CMS Hospital Compare, CDC PLACES 2023,
// NPPES). Every figure here is sourced; the source URLs feed the Dataset schema.
// Location pages and blog posts render from THIS file — never invented numbers.
// ---------------------------------------------------------------------------

export const SOURCES = {
  cmsLandscape: { name: "CMS Medicare Advantage/Part D Landscape (PY2026)", url: "https://www.cms.gov/medicare/health-drug-plans/medicare-advantage-part-d-contract-directory/landscape" },
  cmsEnrollment: { name: "CMS Medicare Monthly Enrollment by County", url: "https://www.cms.gov/data-research/statistics-trends-reports/medicare-monthly-enrollment" },
  cmsHospital: { name: "CMS Hospital Compare — Overall Star Ratings", url: "https://data.cms.gov/provider-data/dataset/xubh-q36u" },
  cdcPlaces: { name: "CDC PLACES: Local Data for Better Health, County 2023", url: "https://data.cdc.gov/500-Cities-Places/PLACES-County-Data/swc5-untb" },
  nppes: { name: "NPPES NPI Registry (provider counts)", url: "https://npiregistry.cms.hhs.gov/" },
  cmsStarRatings: { name: "CMS Medicare Advantage & Part D Star Ratings (2026)", url: "https://www.cms.gov/medicare/health-drug-plans/part-c-d-performance-data" },
  medicaid: { name: "Medicaid & CHIP Enrollment Snapshot (CMS, monthly)", url: "https://data.medicaid.gov/dataset/6165f45b-ca93-5bb5-9d06-db29c692a360" },
};

export const siouxFalls = {
  county: "Minnehaha",
  cityName: "Sioux Falls",
  metroCounties: ["Minnehaha", "Lincoln"],
  state: "SD",
  // CMS enrollment (county)
  enrollment: { primary: 39532, minnehaha: 39532, lincoln: 12719, note: "the largest Medicare market in South Dakota", sdRankNote: "the largest Medicare market in South Dakota" },
  // CMS PY2026 landscape — Sioux Falls metro
  market: {
    stateTotalPlans: 38,
    stateCarriers: 9,
    zeroPremiumCount: 2,           // $0 MA-PD plans in Minnehaha
    avgMaPremium: 40.73,
    topRatedStars: 4.5,            // UHC Dual Complete D-SNP
    standardStars: 3.5,            // most MA-PD plans
  },
  // Carriers serving the Sioux Falls metro (CMS PY2026)
  carriers: [
    { name: "Aetna Medicare (CVS Health)", plans: 4, note: "PPO + Dual-eligible D-SNP" },
    { name: "Align powered by Sanford Health Plan", plans: 2, note: "Local Sanford-backed PPO" },
    { name: "UnitedHealthcare", plans: 2, note: "Highest-rated in county (4.5★ D-SNP)" },
    { name: "Wellmark / BCBS", plans: 1, note: "Enhanced PPO" },
    { name: "Great Plains Medicare Advantage (Sanford)", plans: 2, note: "Institutional SNP" },
    { name: "Medica", plans: 5, note: "Medicare Cost plans" },
  ],
  // Representative MA-PD plans in Minnehaha County (CMS PY2026). Stability = the
  // plan's CMS Overall Star Rating tier (CMS's quality measure, not our opinion).
  plans: [
    { name: "Aetna Medicare Signature (PPO)", carrier: "Aetna", premium: 0, stars: 3.5, drugDeductible: 615, type: "PPO" },
    { name: "Align ChoicePlus (PPO)", carrier: "Sanford", premium: 0, stars: 3.5, drugDeductible: 350, type: "PPO" },
    { name: "UHC Dual Complete SD-Q1 (PPO D-SNP)", carrier: "UnitedHealthcare", premium: 41.5, stars: 4.5, drugDeductible: 615, type: "D-SNP" },
    { name: "Aetna Medicare Enhanced Extra (PPO)", carrier: "Aetna", premium: 52, stars: 3.5, drugDeductible: 615, type: "PPO" },
    { name: "Align ChoiceElite (PPO)", carrier: "Sanford", premium: 66, stars: 3.5, drugDeductible: 300, type: "PPO" },
    { name: "Wellmark Blue Medicare Advantage Enhanced (PPO)", carrier: "Wellmark", premium: 80, stars: 3.5, drugDeductible: 300, type: "PPO" },
  ],
  // CDC PLACES 2023 (adults, Minnehaha County) — model-based prevalence
  health: [
    { label: "High blood pressure", value: 31.7, measure: "BPHIGH" },
    { label: "Obesity", value: 37.4, measure: "OBESITY" },
    { label: "Arthritis", value: 22.9, measure: "ARTHRITIS" },
    { label: "Diagnosed diabetes", value: 10.0, measure: "DIABETES" },
    { label: "Coronary heart disease", value: 5.5, measure: "CHD" },
    { label: "Uninsured (18–64)", value: 8.8, measure: "ACCESS2" },
  ],
  healthPopulation: 206930,
  // Providers (NPPES, Sioux Falls)
  providers: { familyMedicine: "200+", internalMedicine: "200+", pharmacies: 126 },
  // Hospitals serving Sioux Falls (CMS Hospital Compare overall star rating)
  hospitals: [
    { name: "Sanford USD Medical Center", city: "Sioux Falls", stars: 5, address: "1305 W 18th St" },
    { name: "Avera McKennan Hospital & University Health Center", city: "Sioux Falls", stars: 4, address: "1325 S Cliff Ave" },
    { name: "Sioux Falls VA Medical Center", city: "Sioux Falls", stars: 5, address: "2501 W 22nd St" },
  ],
};

// Stability tier from CMS star rating — facts only, CMS's measure (compliant:
// never "best/worst", we present the published rating and a neutral label).
export function stabilityTier(stars: number | null): { label: string; tone: "strong" | "average" | "watch" } {
  if (stars == null) return { label: "Too new to rate", tone: "watch" };
  if (stars >= 4) return { label: "Strong (CMS 4★+)", tone: "strong" };
  if (stars >= 3.5) return { label: "Average (CMS 3.5★)", tone: "average" };
  return { label: "Below average (CMS <3.5★)", tone: "watch" };
}
