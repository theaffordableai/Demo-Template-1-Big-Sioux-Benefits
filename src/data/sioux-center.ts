// ---------------------------------------------------------------------------
// Sioux Center / Sioux County, IA (NW Iowa) — REAL brain data (CMS PY2026
// Landscape, CMS enrollment, CDC PLACES 2023, NPPES). Same shape as
// sioux-falls.ts so <CountyData> renders it. Never invented numbers.
// ---------------------------------------------------------------------------
export const siouxCenter = {
  county: "Sioux",
  cityName: "Sioux Center",
  metroCounties: ["Sioux"],
  state: "IA",
  enrollment: { primary: 5891, note: "a smaller market — but with more plan choice than across the border" },
  market: {
    stateTotalPlans: 22,
    stateCarriers: 9,
    zeroPremiumCount: 6,    // $0 MA-PD plans in Sioux County
    avgMaPremium: 33.5,
    topRatedStars: 4.5,     // Aetna Value Care + Iowa Health Advantage
    standardStars: 3.5,
  },
  // Carriers serving Sioux County, IA (CMS PY2026) — NW Iowa has more competition
  carriers: [
    { name: "Humana", plans: 7, note: "PPO, HMO, PFFS + SNPs — the widest local lineup" },
    { name: "Aetna Medicare (CVS Health)", plans: 2, note: "Includes a 4.5★ HMO-POS" },
    { name: "Align powered by Sanford Health Plan", plans: 2, note: "Local Sanford-backed PPO" },
    { name: "Wellcare (Centene)", plans: 4, note: "Dual-eligible D-SNPs" },
    { name: "Iowa Health Advantage", plans: 2, note: "4.5★ institutional SNP" },
    { name: "UnitedHealthcare / Molina / Wellpoint", plans: 5, note: "Dual-eligible D-SNP options" },
  ],
  // Representative MA-PD plans in Sioux County (CMS PY2026)
  plans: [
    { name: "Aetna Medicare Value Care (HMO-POS)", carrier: "Aetna", premium: 41, stars: 4.5, drugDeductible: 615, type: "HMO-POS" },
    { name: "Iowa Health Advantage (HMO I-SNP)", carrier: "Iowa Health Advantage", premium: 41.5, stars: 4.5, drugDeductible: 615, type: "I-SNP" },
    { name: "UHC Dual Complete IA-S001 (HMO-POS D-SNP)", carrier: "UnitedHealthcare", premium: 41.5, stars: 4.0, drugDeductible: 615, type: "D-SNP" },
    { name: "Align ChoicePlus (PPO)", carrier: "Sanford", premium: 0, stars: 3.5, drugDeductible: 350, type: "PPO" },
    { name: "HumanaChoice Giveback H5216-340 (PPO)", carrier: "Humana", premium: 0, stars: 3.5, drugDeductible: 600, type: "PPO" },
    { name: "Aetna Medicare Enhanced Extra (PPO)", carrier: "Aetna", premium: 57, stars: 3.5, drugDeductible: 615, type: "PPO" },
  ],
  // CDC PLACES 2023 (adults, Sioux County, IA)
  health: [
    { label: "High blood pressure", value: 32.5, measure: "BPHIGH" },
    { label: "Obesity", value: 34.5, measure: "OBESITY" },
    { label: "Arthritis", value: 23.2, measure: "ARTHRITIS" },
    { label: "Diagnosed diabetes", value: 8.9, measure: "DIABETES" },
    { label: "Coronary heart disease", value: 5.1, measure: "CHD" },
    { label: "Uninsured (18–64)", value: 8.3, measure: "ACCESS2" },
  ],
  healthPopulation: 36246,
  providers: { familyMedicine: "17", pharmacies: 3 },
  // Regional referral hospitals serving NW Iowa (CMS Hospital Compare, verified).
  // Sioux Falls is ~40 minutes away and is where most NW Iowa Medicare patients
  // get tertiary care; local critical-access hospitals (Sioux Center Health,
  // Orange City Area Health System) handle primary/ER care.
  hospitals: [
    { name: "Sanford USD Medical Center (Sioux Falls)", city: "Sioux Falls, SD — ~40 min", stars: 5, address: "1305 W 18th St" },
    { name: "Avera McKennan Hospital (Sioux Falls)", city: "Sioux Falls, SD — ~40 min", stars: 4, address: "1325 S Cliff Ave" },
  ],
};
