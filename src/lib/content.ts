// The full content library (greenins-modeled depth). One data file → dynamic
// routes render every page. Add entries here and pages appear automatically.
// kind drives the schema pageType + which hub lists it.

export interface Section { h: string; body: string; }
export interface Faq { q: string; a: string; }
export interface Entry {
  slug: string;
  kind: "coverage" | "education" | "tool" | "service";
  title: string;        // SEO <title>
  h1: string;
  summary: string;      // meta description + card blurb
  intro: string;        // answer-first opening
  sections: Section[];
  faqs: Faq[];
}

const CTA = "Big Sioux Benefits helps Medicare-eligible residents across the Sioux Falls area and Siouxland compare options — free, with no pressure.";

// ───────────────────────── PLANS & COVERAGE ─────────────────────────
export const coverage: Entry[] = [
  { slug: "medicare-advantage-plans", kind: "coverage",
    title: "Medicare Advantage Plans in the Sioux Falls Area (2026) | Big Sioux Benefits",
    h1: "Medicare Advantage (Part C) Plans",
    summary: "Compare 2026 Medicare Advantage plans around Sioux Falls — HMO vs PPO, premiums, drug coverage, and max out-of-pocket — with free local help.",
    intro: "Medicare Advantage (Part C) is an all-in-one alternative to Original Medicare offered by private insurers approved by Medicare. Plans bundle Part A, Part B, and usually Part D drug coverage, often adding dental, vision, and hearing — with a provider network and a yearly out-of-pocket maximum. Around Sioux Falls there are about 11 plans; the right one depends on your doctors and prescriptions.",
    sections: [
      { h: "What's included", body: "Hospital (Part A) and medical (Part B), usually Part D drug coverage, and extras many plans add: dental, vision, hearing, OTC allowance, fitness, and transportation. Every plan has a maximum out-of-pocket that caps your yearly costs." },
      { h: "HMO vs PPO", body: "An HMO keeps costs lower but uses a provider network and referrals. A PPO lets you go out-of-network at a higher cost without referrals. In the Sioux Falls market, confirm whether Sanford or Avera (and your doctors) are in-network before you choose." },
    ],
    faqs: [
      { q: "Is a $0 premium Medicare Advantage plan really free?", a: "No. A $0 plan premium means no extra monthly premium beyond your Part B premium, but you still have copays, a possible drug deductible, and a max out-of-pocket. Two $0 plans can differ by thousands in real cost." },
      { q: "Will my Sanford or Avera doctors be covered?", a: "It depends on the plan's network. We check each plan against your specific doctors and hospital before you enroll." },
    ] },
  { slug: "medicare-supplement-plans", kind: "coverage",
    title: "Medicare Supplement (Medigap) Plans — Sioux Falls Area | Big Sioux Benefits",
    h1: "Medicare Supplement (Medigap) Plans",
    summary: "Medigap pays your share of Original Medicare costs with broad provider freedom. Compare Plan G, Plan N, and more with local guidance.",
    intro: "Medicare Supplement (Medigap) works alongside Original Medicare to pay your share of costs — deductibles, copays, and coinsurance. Unlike Medicare Advantage, Medigap has no networks: you can see any provider in the U.S. that accepts Medicare. It does not include drug coverage, so most people pair it with a standalone Part D plan.",
    sections: [
      { h: "Popular plans", body: "Plan G is the most comprehensive widely-available plan (you pay only the small Part B deductible). Plan N trades slightly lower premiums for small copays. We compare every standardized plan and carrier price in your area." },
      { h: "Medigap vs Medicare Advantage", body: "Medigap = higher monthly premium, near-total freedom of providers, no drug coverage. Advantage = lower or $0 premium, networks and copays, usually includes drugs and extras. The right path depends on your health, travel, and budget." },
    ],
    faqs: [
      { q: "Can I switch to Medigap later?", a: "You get a 6-month Medigap Open Enrollment Period when you first enroll in Part B at 65, with guaranteed acceptance. After that, switching may require health underwriting. We'll tell you your window." },
      { q: "Does Medigap cover prescriptions?", a: "No. Medigap doesn't include drug coverage — you add a standalone Part D plan. We set both up together." },
    ] },
  { slug: "part-d-prescription-drug-plans", kind: "coverage",
    title: "Medicare Part D Prescription Drug Plans (2026) | Big Sioux Benefits",
    h1: "Part D Prescription Drug Plans",
    summary: "Find the best Part D drug plan for your prescriptions, with the 2026 $2,100 out-of-pocket cap. Free local comparison.",
    intro: "Medicare Part D covers prescription drugs. You can get it as a standalone plan (with Original Medicare or Medigap) or built into a Medicare Advantage plan. For 2026, Part D includes an annual out-of-pocket cap of about $2,100 — once you reach it, covered drugs cost you $0 for the rest of the year.",
    sections: [
      { h: "How to choose", body: "The cheapest premium is rarely the cheapest plan. What matters is whether your specific drugs are on the plan's formulary, what tier they're on, and the deductible. We run your prescription list against every plan to find your lowest total cost." },
      { h: "The 2026 $2,100 cap", body: "The old 'donut hole' is gone. Once your out-of-pocket drug costs hit roughly $2,100 in 2026, you pay nothing more for covered drugs that year — major protection if you take expensive medications." },
    ],
    faqs: [
      { q: "What is the Part D late enrollment penalty?", a: "If you go without creditable drug coverage after you're first eligible, a permanent penalty is added to your premium. Enroll on time or keep creditable coverage to avoid it — we'll check your dates." },
      { q: "Can I change Part D plans every year?", a: "Yes. During the Annual Enrollment Period (Oct 15–Dec 7) you can switch Part D plans for the next year. We review yours each fall." },
    ] },
  { slug: "hmo-plans", kind: "coverage",
    title: "Medicare HMO Plans Explained | Big Sioux Benefits",
    h1: "Medicare HMO Plans",
    summary: "How Medicare Advantage HMO plans work — networks, referrals, and when an HMO is the right fit.",
    intro: "An HMO (Health Maintenance Organization) is a type of Medicare Advantage plan that keeps premiums and copays low by using a defined provider network and, usually, requiring referrals to see specialists. If your doctors are in the network and you don't travel often, an HMO can be the best value.",
    sections: [
      { h: "Pros and cons", body: "Pros: low or $0 premiums, predictable copays, often strong extra benefits. Cons: you generally must use in-network providers (except emergencies) and may need referrals. Always confirm your Sioux Falls-area providers are in-network." },
    ],
    faqs: [
      { q: "What happens if I see an out-of-network doctor on an HMO?", a: "Except for emergencies and urgent care, out-of-network care usually isn't covered on an HMO — you'd pay full cost. That's why network checks matter." },
    ] },
  { slug: "ppo-plans", kind: "coverage",
    title: "Medicare PPO Plans Explained | Big Sioux Benefits",
    h1: "Medicare PPO Plans",
    summary: "How Medicare Advantage PPO plans work — out-of-network flexibility, no referrals, and who they suit.",
    intro: "A PPO (Preferred Provider Organization) is a Medicare Advantage plan that lets you see out-of-network providers at a higher cost and usually skips referrals. PPOs suit people who travel, split time between states, or want maximum flexibility while still getting Advantage extras.",
    sections: [
      { h: "Is a PPO right for you?", body: "If you spend winters away, see specialists across the SD/IA/MN region, or simply want freedom without referrals, a PPO's flexibility can be worth the slightly higher cost. We compare PPO and HMO options side by side." },
    ],
    faqs: [
      { q: "Do PPO plans cost more than HMOs?", a: "Often slightly, in premium or copays, in exchange for out-of-network flexibility. The right trade-off depends on how you use care." },
    ] },
  { slug: "special-needs-plans", kind: "coverage",
    title: "Medicare Special Needs Plans (D-SNP / C-SNP) | Big Sioux Benefits",
    h1: "Special Needs Plans (SNPs)",
    summary: "Special Needs Plans for people with both Medicare and Medicaid (D-SNP) or specific chronic conditions (C-SNP). Extra benefits, low cost.",
    intro: "A Special Needs Plan (SNP) is a Medicare Advantage plan tailored to a specific group. A D-SNP serves people who have both Medicare and Medicaid (dual-eligible) and often includes very low costs and extra benefits. A C-SNP serves people with certain chronic conditions like diabetes or heart disease.",
    sections: [
      { h: "Dual-eligible (D-SNP)", body: "If you qualify for both Medicare and Medicaid, a D-SNP can offer $0 premiums, low or no copays, extra allowances for groceries and OTC, transportation, and care coordination. We'll check your eligibility." },
    ],
    faqs: [
      { q: "How do I know if I qualify for a D-SNP?", a: "You qualify if you have both Medicare and Medicaid (or your state's Medicare Savings Program). We can verify your status and enroll you in a SNP if you're eligible." },
    ] },
  { slug: "dental-vision-insurance", kind: "coverage",
    title: "Dental & Vision Insurance for Medicare | Big Sioux Benefits",
    h1: "Dental & Vision Insurance",
    summary: "Original Medicare doesn't cover routine dental or vision. See your options — plan extras and standalone coverage.",
    intro: "Original Medicare doesn't cover routine dental cleanings, fillings, dentures, eye exams, or glasses. Many Medicare Advantage plans include dental and vision benefits, and standalone dental/vision policies can fill the gaps. We compare what's bundled vs. what's worth adding.",
    sections: [
      { h: "Your options", body: "Some Advantage plans include generous dental/vision allowances; others are thin. A standalone dental plan can offer broader coverage for major work. We weigh both against your needs." },
    ],
    faqs: [
      { q: "Does Medicare cover dentures or implants?", a: "Original Medicare generally doesn't. Some Advantage plans and standalone dental policies help — coverage and limits vary widely, so compare carefully." },
    ] },
  { slug: "hearing-insurance", kind: "coverage",
    title: "Hearing Insurance & Medicare | Big Sioux Benefits",
    h1: "Hearing Coverage",
    summary: "Hearing exams and aids aren't covered by Original Medicare. See plan extras and standalone options.",
    intro: "Original Medicare doesn't cover routine hearing exams or hearing aids. Many Medicare Advantage plans include a hearing benefit with allowances toward aids, and standalone options exist. We help you find coverage that fits your hearing needs and budget.",
    sections: [
      { h: "What to look for", body: "Compare the hearing-aid allowance, brand/fitting network, and battery or maintenance coverage. A plan's hearing benefit can save you thousands over paying out of pocket." },
    ],
    faqs: [
      { q: "Does Medicare pay for hearing aids?", a: "Original Medicare doesn't. Some Advantage plans include a hearing-aid allowance — amounts and networks vary, so we compare them for you." },
    ] },
  { slug: "hospital-indemnity-insurance", kind: "coverage",
    title: "Hospital Indemnity Insurance | Big Sioux Benefits",
    h1: "Hospital Indemnity Insurance",
    summary: "Cash benefits that help cover the copays and gaps of a hospital stay on a Medicare Advantage plan.",
    intro: "Hospital indemnity insurance pays you a fixed cash benefit for covered hospital stays, which you can use for the daily copays a Medicare Advantage plan charges, plus travel, meals, or anything else. It's a popular way to soften the out-of-pocket exposure of an Advantage plan.",
    sections: [
      { h: "Who it's for", body: "If your Advantage plan charges per-day hospital copays, a hospital indemnity policy can offset them with cash paid directly to you. We help decide if it makes sense for your plan." },
    ],
    faqs: [
      { q: "How is hospital indemnity different from Medigap?", a: "Medigap pays providers for Original Medicare's gaps. Hospital indemnity pays YOU a set cash amount for covered stays — often paired with a Medicare Advantage plan." },
    ] },
  { slug: "life-insurance", kind: "coverage",
    title: "Life Insurance | Big Sioux Benefits",
    h1: "Life Insurance",
    summary: "Term and whole life options to protect your family and cover final expenses.",
    intro: "Life insurance protects the people who depend on you. Term life covers a set period at a low cost; whole life builds cash value and lasts your lifetime. We help Sioux Falls-area families find right-sized coverage without overpaying.",
    sections: [
      { h: "Term vs whole life", body: "Term is affordable protection for a span of years (great for income replacement). Whole life is permanent with cash value (often used for legacy and final expenses). We match the type to your goal." },
    ],
    faqs: [
      { q: "Can I get life insurance after 65?", a: "Yes. Options exist for most ages and health situations, including simplified and guaranteed-issue final expense policies. We'll find what you qualify for." },
    ] },
  { slug: "final-expense-insurance", kind: "coverage",
    title: "Final Expense (Burial) Insurance | Big Sioux Benefits",
    h1: "Final Expense Insurance",
    summary: "Small whole-life policies that cover funeral and end-of-life costs so your family isn't left with the bill.",
    intro: "Final expense insurance is a small whole-life policy (typically $5,000–$25,000) designed to cover funeral, burial, and end-of-life costs. Acceptance is easy — often no medical exam — and the rate is locked for life. It keeps your family from facing those bills during a hard time.",
    sections: [
      { h: "How it works", body: "You choose a coverage amount, premiums stay level, and the benefit is paid quickly to your beneficiary. Many policies offer guaranteed or simplified acceptance regardless of health." },
    ],
    faqs: [
      { q: "Do I need a medical exam for final expense insurance?", a: "Usually no. Most final expense policies use a few health questions or guaranteed acceptance — we'll match you to the best rate you qualify for." },
    ] },
  { slug: "long-term-care-insurance", kind: "coverage",
    title: "Long-Term Care Insurance | Big Sioux Benefits",
    h1: "Long-Term Care Planning",
    summary: "Medicare doesn't pay for most long-term care. Plan ahead for in-home help, assisted living, or nursing care.",
    intro: "Medicare and Medicare Advantage generally don't pay for long-term custodial care — help with daily activities, assisted living, or extended nursing-home stays. Long-term care insurance (and hybrid life/LTC policies) protect your savings from those costs. Planning early keeps premiums affordable.",
    sections: [
      { h: "Your options", body: "Traditional LTC insurance, hybrid life-with-LTC policies, and annuity-based options each fit different situations. We walk through what protects your assets without overpaying." },
    ],
    faqs: [
      { q: "Doesn't Medicare cover nursing homes?", a: "Only short, skilled-care stays after a hospitalization — not long-term custodial care. That's the gap long-term care planning fills." },
    ] },
  { slug: "annuities", kind: "coverage",
    title: "Annuities & Retirement Income | Big Sioux Benefits",
    h1: "Annuities",
    summary: "Turn savings into guaranteed retirement income that you can't outlive.",
    intro: "An annuity is a contract with an insurance company that can provide guaranteed income for life, protect principal, or grow savings tax-deferred. For retirees worried about outliving their money, the right annuity can be a stable foundation alongside Social Security.",
    sections: [
      { h: "Types", body: "Fixed annuities offer a guaranteed rate; fixed-indexed annuities link growth to a market index with downside protection; income annuities turn a lump sum into a paycheck for life. We explain the trade-offs plainly." },
    ],
    faqs: [
      { q: "Are annuities safe?", a: "Fixed and fixed-indexed annuities protect your principal and are backed by the issuing insurer. We only recommend products that fit your goals and risk comfort." },
    ] },
];

// ───────────────────────── MEDICARE 101 ─────────────────────────
export const education: Entry[] = [
  { slug: "what-is-medicare", kind: "education",
    title: "What Is Medicare? A Plain-English Guide | Big Sioux Benefits",
    h1: "What Is Medicare?",
    summary: "Medicare is federal health insurance for people 65+ and some younger people with disabilities. Here's how the four parts fit together.",
    intro: "Medicare is the federal health insurance program for people age 65 and older, and for some younger people with disabilities or specific conditions. It has four parts — A, B, C, and D. Parts A and B are 'Original Medicare' from the government; Part C (Medicare Advantage) and Part D (drugs) are private plans that fill the gaps.",
    sections: [
      { h: "The four parts", body: "Part A covers hospital care (usually premium-free if you worked 10+ years). Part B covers doctors and outpatient care (monthly premium by income). Part C bundles A, B, and usually D into one private plan. Part D covers prescriptions." },
      { h: "Where to start", body: "Most people enroll around their 65th birthday, then choose between Original Medicare (often with a Medigap + Part D plan) or a Medicare Advantage plan. We help you compare both for your situation." },
    ],
    faqs: [
      { q: "Is Medicare free?", a: "Part A is usually premium-free if you or your spouse paid Medicare taxes 10+ years. Part B has a monthly premium. Advantage and Part D plans vary — some are $0 premium." },
      { q: "Is Medicare the same as Medicaid?", a: "No. Medicare is federal health insurance based mainly on age. Medicaid is a state/federal program based on income. Some people qualify for both (dual-eligible)." },
    ] },
  { slug: "medicare-vs-medicaid", kind: "education",
    title: "Medicare vs Medicaid: What's the Difference? | Big Sioux Benefits",
    h1: "Medicare vs Medicaid",
    summary: "Medicare is age-based federal insurance; Medicaid is income-based. Some people qualify for both. Here's how they differ.",
    intro: "Medicare and Medicaid sound alike but are different programs. Medicare is federal health insurance mainly for people 65+ (and some with disabilities), regardless of income. Medicaid is a joint federal-state program for people with limited income and resources. If you qualify for both, you're 'dual-eligible' and may get extra help.",
    sections: [
      { h: "Dual eligibility", body: "People with both Medicare and Medicaid often qualify for a D-SNP plan with $0 premiums, very low costs, and extra benefits like grocery and OTC allowances. We can check your eligibility and enroll you." },
    ],
    faqs: [
      { q: "Can I have Medicare and Medicaid at the same time?", a: "Yes — that's called being dual-eligible, and it usually unlocks lower costs and extra benefits through a D-SNP plan." },
    ] },
  { slug: "medicare-eligibility", kind: "education",
    title: "Medicare Eligibility: Who Qualifies and When | Big Sioux Benefits",
    h1: "Medicare Eligibility",
    summary: "Most people qualify for Medicare at 65. Some younger people with disabilities qualify earlier. Here's how to know.",
    intro: "Most people become eligible for Medicare at age 65. You also qualify before 65 if you've received Social Security Disability for 24 months, or have ALS or End-Stage Renal Disease. You're eligible for premium-free Part A if you or your spouse paid Medicare taxes for at least 10 years (40 quarters).",
    sections: [
      { h: "Working past 65", body: "If you or your spouse are still working with employer coverage, you may be able to delay Part B without penalty. The rules depend on employer size — we'll tell you whether to enroll now or wait." },
    ],
    faqs: [
      { q: "Do I have to take Medicare at 65?", a: "Not always. If you have creditable employer coverage you may delay Part B penalty-free. Without creditable coverage, delaying causes lifelong penalties. We check your situation." },
    ] },
  { slug: "medicare-enrollment", kind: "education",
    title: "Medicare Enrollment Periods Explained | Big Sioux Benefits",
    h1: "Medicare Enrollment Periods",
    summary: "IEP, AEP, and SEPs — the windows to enroll in or change Medicare, and how to avoid penalties.",
    intro: "There are a few key windows to enroll in or change Medicare. Your Initial Enrollment Period (IEP) is the 7 months around your 65th birthday. The Annual Enrollment Period (AEP) runs Oct 15–Dec 7 each year for plan changes. Special Enrollment Periods (SEPs) open for qualifying life events like moving or losing coverage.",
    sections: [
      { h: "Avoiding penalties", body: "Missing your IEP without creditable coverage can add lifelong Part B and Part D penalties. We track your dates so you enroll in the right window." },
    ],
    faqs: [
      { q: "When is Medicare's Annual Enrollment Period?", a: "October 15 to December 7 each year. Changes you make take effect January 1. We review your plan every fall to make sure it's still your best fit." },
    ] },
  { slug: "how-to-enroll-in-medicare", kind: "education",
    title: "How to Enroll in Medicare: Step by Step | Big Sioux Benefits",
    h1: "How to Enroll in Medicare",
    summary: "A simple step-by-step for enrolling in Medicare at 65 — and how a local agent makes it painless.",
    intro: "Enrolling in Medicare has two parts: signing up for Original Medicare (Parts A and B) through Social Security, and then choosing your coverage (a Medicare Advantage plan, or a Medigap + Part D plan). If you're already getting Social Security, Parts A and B may start automatically. Otherwise you enroll online, by phone, or in person.",
    sections: [
      { h: "The steps", body: "1) Enroll in Parts A and B (or confirm auto-enrollment). 2) Decide between Original Medicare + Medigap + Part D, or a Medicare Advantage plan. 3) Compare and pick the plan that fits your doctors and drugs. We handle steps 2 and 3 with you at no cost." },
    ],
    faqs: [
      { q: "Where do I sign up for Medicare?", a: "Parts A and B are through Social Security (online, phone, or local office). For your plan choice, a local agent like us compares your options and enrolls you — free." },
    ] },
  { slug: "medicare-part-d", kind: "education",
    title: "Medicare Part D: How Drug Coverage Works | Big Sioux Benefits",
    h1: "Understanding Medicare Part D",
    summary: "How Part D drug coverage works, the 2026 $2,100 cap, formularies, and the late-enrollment penalty.",
    intro: "Medicare Part D covers prescription drugs through private plans. You can get it standalone (with Original Medicare or Medigap) or inside a Medicare Advantage plan. Each plan has a formulary (its covered-drug list) with tiers that set your cost. For 2026, there's a roughly $2,100 annual out-of-pocket cap.",
    sections: [
      { h: "Choosing the right plan", body: "Match your exact medications to each plan's formulary and tiers — not just the premium. The right plan can save hundreds a year. We run your drug list for you." },
    ],
    faqs: [
      { q: "What is the Part D donut hole in 2026?", a: "The coverage-gap 'donut hole' is effectively gone, replaced by a ~$2,100 annual out-of-pocket cap. After you hit it, covered drugs cost $0 the rest of the year." },
    ] },
  { slug: "medicare-for-veterans", kind: "education",
    title: "Medicare for Veterans: VA + Medicare Together | Big Sioux Benefits",
    h1: "Medicare for Veterans",
    summary: "How VA benefits and Medicare work together, and why many veterans still enroll in Part B.",
    intro: "Many veterans have VA health benefits and wonder if they need Medicare too. VA coverage and Medicare don't coordinate the way two insurance plans do — VA covers care at VA facilities, while Medicare covers care in the community. Most veterans enroll in Part B to keep access to non-VA doctors and hospitals and avoid late penalties.",
    sections: [
      { h: "Why add Medicare", body: "Enrolling in Part B (and considering a plan) gives you coverage outside the VA system, more provider choice near home, and avoids permanent late-enrollment penalties. We help veterans weigh the options." },
    ],
    faqs: [
      { q: "Do veterans need Medicare if they have VA benefits?", a: "Often yes — Part B protects access to non-VA care and avoids penalties. VA and Medicare cover different settings, so together they give you the most flexibility." },
    ] },
  { slug: "medicare-breakdown", kind: "education",
    title: "Medicare Costs Breakdown for 2026 | Big Sioux Benefits",
    h1: "Medicare Costs Breakdown",
    summary: "Premiums, deductibles, and out-of-pocket numbers that matter for 2026 — in plain English.",
    intro: "Understanding what Medicare actually costs helps you plan. Part A is usually premium-free. Part B has a standard monthly premium (higher for high incomes via IRMAA). Part D and Medicare Advantage premiums vary by plan. For 2026, Part D includes a ~$2,100 out-of-pocket cap. Here's how the pieces add up.",
    sections: [
      { h: "What you'll pay", body: "Budget for the Part B premium, any plan premium, deductibles, and copays up to your plan's max out-of-pocket. Higher earners pay an IRMAA surcharge on Parts B and D. We map your expected costs before you enroll." },
    ],
    faqs: [
      { q: "What is IRMAA?", a: "IRMAA is an income-related surcharge added to your Part B and Part D premiums if your income is above set thresholds. We can estimate whether it applies to you." },
    ] },
];

// ───────────────────────── FREE TOOLS ─────────────────────────
export const tools: Entry[] = [
  { slug: "eligibility-calculator", kind: "tool",
    title: "Medicare Eligibility Checker | Big Sioux Benefits",
    h1: "Medicare Eligibility Checker",
    summary: "Find out when you're eligible for Medicare and which enrollment window applies to you.",
    intro: "Not sure when you can enroll? Your Initial Enrollment Period is the 7 months around your 65th birthday (3 months before, your birthday month, and 3 months after). Tell us your birthdate and situation and we'll pinpoint your exact window — and whether you can delay penalty-free.",
    sections: [{ h: "Check your timing", body: "Call or message us with your birth month and whether you have employer coverage, and we'll tell you exactly when to enroll and how to avoid penalties." }],
    faqs: [{ q: "When does my Medicare eligibility start?", a: "Usually the first day of the month you turn 65. If your birthday is on the 1st, it starts the month before. Your enrollment window spans 7 months around that date." }] },
  { slug: "part-b-penalty", kind: "tool",
    title: "Part B Late Enrollment Penalty Estimator | Big Sioux Benefits",
    h1: "Part B Penalty Estimator",
    summary: "Estimate the lifelong cost of enrolling in Medicare Part B late — and how to avoid it.",
    intro: "If you don't sign up for Part B when first eligible and don't have creditable coverage, a permanent penalty is added to your premium — 10% for each full 12-month period you could have had it. The penalty lasts as long as you have Part B. We'll estimate yours and show you how to avoid it.",
    sections: [{ h: "How it adds up", body: "Example: delaying 3 years without creditable coverage adds about 30% to your Part B premium for life. Enrolling on time, or keeping creditable employer coverage, avoids it entirely." }],
    faqs: [{ q: "How do I avoid the Part B penalty?", a: "Enroll during your Initial Enrollment Period, or keep creditable employer coverage and use a Special Enrollment Period when it ends. We track your dates." }] },
  { slug: "part-d-penalty", kind: "tool",
    title: "Part D Late Enrollment Penalty Estimator | Big Sioux Benefits",
    h1: "Part D Penalty Estimator",
    summary: "Estimate the Part D late-enrollment penalty and learn how to avoid this lifelong cost.",
    intro: "Going without creditable drug coverage after you're first eligible adds a permanent Part D penalty — roughly 1% of the national base premium for each month you went without. Like the Part B penalty, it lasts for life. We'll estimate yours and help you stay penalty-free.",
    sections: [{ h: "Stay protected", body: "Keep creditable drug coverage (from an employer or a Part D plan) and enroll on time. Even if you take no medications, a $0 or low-cost Part D plan can prevent a future penalty." }],
    faqs: [{ q: "I don't take any drugs — do I still need Part D?", a: "Often yes, to avoid a lifelong penalty later. A low-cost Part D plan now can be cheaper than the penalty you'd pay if you enroll later." }] },
  { slug: "premium-calculator", kind: "tool",
    title: "Medicare Premium Estimator (incl. IRMAA) | Big Sioux Benefits",
    h1: "Premium Estimator",
    summary: "Estimate your Medicare Part B and Part D premiums, including any income-related IRMAA surcharge.",
    intro: "Your Medicare premiums depend on the standard Part B amount plus any income-related surcharge (IRMAA) if your income is above certain thresholds, plus any plan premium you choose. Share your income range and we'll estimate your monthly cost so there are no surprises.",
    sections: [{ h: "What drives your premium", body: "The standard Part B premium, your IRMAA bracket (based on your tax return from two years ago), and your plan choice. We map it all out before you enroll." }],
    faqs: [{ q: "Why is my Part B premium higher than the standard amount?", a: "Likely IRMAA — an income-related surcharge based on your modified adjusted gross income from two years ago. We can estimate your bracket." }] },
  { slug: "enrollment-timeline", kind: "tool",
    title: "Medicare Enrollment Timeline | Big Sioux Benefits",
    h1: "Enrollment Timeline",
    summary: "A clear timeline of when to take each Medicare step around your 65th birthday.",
    intro: "Turning 65 comes with a sequence of deadlines. Roughly: 3 months before your birthday month, start comparing and enroll in Parts A and B; during your 7-month Initial Enrollment Period, choose your plan; then review every fall during the Oct 15–Dec 7 Annual Enrollment Period. We keep you on schedule.",
    sections: [{ h: "Your personal timeline", body: "Give us your birth month and we'll build a simple checklist of exactly what to do and when — so you never miss a window or a penalty deadline." }],
    faqs: [{ q: "How early should I start the Medicare process?", a: "About 3 months before your 65th birthday month. That gives time to compare plans and have coverage ready the day you're eligible." }] },
  { slug: "provider-directory", kind: "tool",
    title: "Find Your Doctor in a Medicare Plan | Big Sioux Benefits",
    h1: "Provider & Drug Check",
    summary: "Make sure your Sanford or Avera doctors and your prescriptions are covered before you enroll.",
    intro: "Before you pick a plan, the two most important checks are: are your doctors in the network, and are your prescriptions on the formulary? We do both for you — matching every Sioux Falls-area plan against your specific Sanford or Avera providers and your medication list, so there are no surprises after you enroll.",
    sections: [{ h: "We check it for you", body: "Send us your doctors and your prescription list. We'll tell you which plans keep your providers in-network and cover your drugs at the lowest tier." }],
    faqs: [{ q: "How do I know if my doctor takes a Medicare plan?", a: "Networks change yearly. Rather than guessing, we verify your exact providers against each plan before you enroll — free." }] },
];

// ───────────────────────── SERVICES ─────────────────────────
export const services: Entry[] = [
  { slug: "medicare-enrollment-assistance", kind: "service", title: "Medicare Enrollment Assistance | Big Sioux Benefits", h1: "Medicare Enrollment Assistance",
    summary: "Free, step-by-step help enrolling in the right Medicare plan for your needs.", intro: "New to Medicare or turning 65? We guide you through every step — comparing Original Medicare vs. Advantage, checking your doctors and drugs, and handling the enrollment paperwork — at no cost to you.",
    sections: [{ h: "What we handle", body: "Eligibility and timing, plan comparison against your providers and prescriptions, the application itself, and confirmation your coverage is active. You're never on hold with the government alone." }],
    faqs: [{ q: "Does enrollment help cost anything?", a: "No. Licensed agents are paid by the carriers, not by you. Our help is completely free." }] },
  { slug: "turning-65-consultations", kind: "service", title: "Turning 65 Medicare Consultations | Big Sioux Benefits", h1: "Turning 65 Consultations",
    summary: "A clear roadmap for your Initial Enrollment Period so you start Medicare with confidence.", intro: "Turning 65 is the biggest Medicare decision you'll make. In a free consultation we map your Initial Enrollment Period, explain Original Medicare vs. Advantage in plain English, and build a plan around your doctors, drugs, and budget.",
    sections: [{ h: "Your roadmap", body: "We cover what to do and when, how to avoid Part B and Part D penalties, and which path fits your health and travel. No pressure — just a clear plan." }],
    faqs: [{ q: "When should I schedule my turning-65 consult?", a: "About 3 months before your birthday month, so your coverage is ready the day you're eligible." }] },
  { slug: "plan-comparison", kind: "service", title: "Medicare Plan Comparison | Big Sioux Benefits", h1: "Insurance Plan Comparison",
    summary: "We compare every plan in your county against your doctors and prescriptions.", intro: "With about 11 Medicare Advantage plans around Sioux Falls (and roughly twice as many across the border in Iowa), comparison is everything. We line up every option against your specific providers, drugs, and budget and bring you the two or three that truly fit.",
    sections: [{ h: "Apples to apples", body: "We compare premiums, drug deductibles, max out-of-pocket, networks, and extra benefits — both sides of the Big Sioux — so you choose with confidence." }],
    faqs: [{ q: "How many plans do you compare?", a: "Every Medicare Advantage, Medigap, and Part D plan available where you live, across SD and the nearby IA/MN markets." }] },
  { slug: "annual-coverage-review", kind: "service", title: "Annual Medicare Coverage Review | Big Sioux Benefits", h1: "Annual Coverage Review",
    summary: "Plans change every year. We re-check yours each fall so you never overpay.", intro: "Your Medicare plan can change its costs, drug formulary, and network every year — and so can your health. Each fall during the Annual Enrollment Period (Oct 15–Dec 7), we review your plan against the new options to make sure it's still your best fit.",
    sections: [{ h: "Why it matters", body: "A plan that was perfect last year may drop your drug or raise a copay. A 15-minute review can save real money and headaches. We do it for you, free, every year." }],
    faqs: [{ q: "Do I need to review my plan every year?", a: "Yes — plans and your needs change. We review yours every fall during AEP so you're never stuck with a worse plan by default." }] },
  { slug: "claims-support-appeals", kind: "service", title: "Claims Support & Appeals | Big Sioux Benefits", h1: "Claims Support & Appeals",
    summary: "A real local advocate when a claim is denied or something goes wrong.", intro: "When a claim is denied or a bill looks wrong, you shouldn't have to fight it alone. As your local agent, we help you understand the decision, gather what's needed, and file an appeal — so you get the coverage you're owed.",
    sections: [{ h: "We're in your corner", body: "From a surprise bill to a denied service, we help you navigate the carrier, the paperwork, and the appeal. That ongoing support is why people stay with a local agent." }],
    faqs: [{ q: "Can you help after I've enrolled?", a: "Absolutely. We stay your advisor year-round for claims, appeals, plan changes, and questions — at no cost." }] },
  { slug: "drug-cost-review", kind: "service", title: "Prescription Drug Cost Review | Big Sioux Benefits", h1: "Drug Cost Review",
    summary: "We make sure your prescriptions are covered at the lowest tier and price.", intro: "Drug costs are where Medicare plans differ most. We run your full prescription list against every plan's formulary to find the one that covers your medications at the lowest tier — often saving hundreds of dollars a year.",
    sections: [{ h: "How we save you money", body: "We check each drug's tier, the deductible, and the 2026 $2,100 out-of-pocket cap across plans, then recommend the lowest total-cost option for your prescriptions." }],
    faqs: [{ q: "Will you check my specific medications?", a: "Yes — send us your list and we'll find the plan that covers them best. It's the single biggest way to save on Medicare." }] },
  { slug: "retirement-income-planning", kind: "service", title: "Retirement Income Planning | Big Sioux Benefits", h1: "Retirement Income Planning",
    summary: "Protect your savings and create income you can't outlive, alongside the right Medicare coverage.", intro: "Medicare is one piece of retirement security. We also help you think about protecting savings from long-term care costs and creating guaranteed income through annuities — so your healthcare and your finances work together.",
    sections: [{ h: "The full picture", body: "From IRMAA-aware income planning to long-term care and annuity options, we help Sioux Falls-area retirees build a plan that lasts." }],
    faqs: [{ q: "Do you only do Medicare?", a: "Medicare is our focus, but we also help with life, final expense, long-term care, and annuities so your whole retirement is covered." }] },
];

export const allEntries: Entry[] = [...coverage, ...education, ...tools];
