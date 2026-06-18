// Single source of truth for blog posts — consumed by the blog index AND the
// homepage "Latest from the blog" strip so they can never drift. Newest first.
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  img: string;
}

export const posts: Post[] = [
  {
    slug: "part-d-drug-cost-cap-sioux-falls-2026",
    title: "The 2026 Part D $2,100 Drug Cost Cap Explained for Sioux Falls Medicare Beneficiaries",
    excerpt: "The first annual ceiling in Part D history: how the new $2,100 out-of-pocket cap works, who benefits most among Sioux Falls beneficiaries, and how formulary tiers — not premiums — become the deciding factor when choosing among the 15 drug-carrying plans in Minnehaha County.",
    date: "June 18, 2026",
    img: "/img/blog/mike-part-d-drug-cost-2026.png",
  },
  {
    slug: "medigap-vs-medicare-advantage-sioux-falls-2026",
    title: "Medigap vs. Medicare Advantage in Sioux Falls for 2026: Which Track Fits Your Situation?",
    excerpt: "Two paths through Medicare, one critical decision — and the clock runs from the day you turn 65. We compare Medigap and Medicare Advantage for Sioux Falls using real 2026 CMS data: 5 local PPOs (2 at $0 premium), the Sanford-vs-Avera network question, the new $2,100 Part D cap, and the one-time guaranteed-issue window that makes the choice time-sensitive.",
    date: "June 17, 2026",
    img: "/img/blog/mike-medigap-vs-advantage-2026.png",
  },
  {
    slug: "medicare-aep-sioux-falls-2026",
    title: "Medicare Annual Enrollment Period in Sioux Falls 2026: Your Oct 15–Dec 7 Action Plan",
    excerpt: "AEP runs Oct 15–Dec 7 — the one window to rethink your whole Medicare picture. Here's what Sioux Falls beneficiaries need to review: 11 local plans, the new Part D $2,100 cap, Sanford-vs-Avera network changes, and how to read your Annual Notice of Change.",
    date: "June 16, 2026",
    img: "/img/blog/mike-aep-client-review.png",
  },
  {
    slug: "turning-65-sioux-falls-2026",
    title: "Turning 65 in Sioux Falls: your 2026 Medicare enrollment roadmap",
    excerpt: "One 7-month enrollment window, the four parts of Medicare, the local plan landscape (11 Medicare Advantage plans, 2 at $0), the 2026 Part D $2,100 cap, and the Sanford-vs-Avera network choice that decides your costs.",
    date: "June 15, 2026",
    img: "/img/blog/mike-turning65-couple.png",
  },
  {
    slug: "dsnp-sioux-falls-2026-plan-changes",
    title: "D-SNP plans in Sioux Falls for 2026: which are stable, which carry risk",
    excerpt: "Four Dual-Eligible plans, two carriers, star ratings from 4.5 down to 3.5 — plus the cancellation, network, and 'coordination-only' risks DSNP members should watch.",
    date: "June 12, 2026",
    img: "/img/blog/mike-dsnp-couple.png",
  },
  {
    slug: "medicare-advantage-sioux-falls-2026",
    title: "Medicare Advantage in Sioux Falls for 2026: all 15 plans, ranked",
    excerpt: "Every drug plan in Minnehaha County — 11 Medicare Advantage plans plus 4 Medica Cost plans — with every premium, deductible, and star rating, plus the Sanford-vs-Avera fork.",
    date: "June 12, 2026",
    img: "/img/blog/mike-plan-comparison.png",
  },
  {
    slug: "2026-medicare-advantage-south-dakota",
    title: "2026 Medicare Advantage in South Dakota: 38 plans, 9 carriers",
    excerpt: "A data-driven look at South Dakota's 2026 market — county plan counts from 14 down to 1, real CMS enrollment, carrier premiums, and the Medica Cost-plan wrinkle.",
    date: "June 12, 2026",
    img: "/img/blog/sd-rushmore-superhero.png",
  },
];
