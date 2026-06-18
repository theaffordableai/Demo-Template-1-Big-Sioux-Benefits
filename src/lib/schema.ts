// Four-Pillar JSON-LD builder (per AEO-READINESS-STANDARD Part C).
// Each page passes its type + data; this returns the correct schema set.
import { site } from "../config/site.config";

const ORG_ID = `${site.domain}/#organization`;
const base = site.domain;

export interface Faq { q: string; a: string; }
export interface Crumb { name: string; url: string; }
export interface DatasetRef { name: string; description: string; sourceUrl: string; }

function organization() {
  const b = site.brand;
  return {
    "@type": ["Organization", "InsuranceAgency"],
    "@id": ORG_ID,
    name: b.name, url: base, telephone: b.phone, email: b.email,
    areaServed: b.serviceArea,
    address: { "@type": "PostalAddress", streetAddress: b.address.street, addressLocality: b.address.city, addressRegion: b.address.region, postalCode: b.address.postal, addressCountry: "US" },
    openingHours: b.hours,
  };
}
function orgAuthor() { return { "@type": "Organization", name: site.brand.author, url: `${base}/about` }; }

interface BuildArgs {
  pageType: "home" | "service" | "location" | "article" | "tool";
  url: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  faqs?: Faq[];
  breadcrumbs?: Crumb[];
  dataset?: DatasetRef;
  place?: { type: "State" | "AdministrativeArea" | "City" | "PostalCode"; name: string; region?: string };
  image?: string;
}

export function buildSchemas(a: BuildArgs): object[] {
  const out: object[] = [];
  const today = a.dateModified || a.datePublished || "2026-06-12";

  if (a.pageType === "home") {
    out.push({ "@context": "https://schema.org", "@type": "WebSite", url: base, name: site.brand.name,
      potentialAction: { "@type": "SearchAction", target: `${base}/search?q={q}`, "query-input": "required name=q" } });
    out.push({ "@context": "https://schema.org", ...organization() });
  } else {
    out.push({ "@context": "https://schema.org", "@type": "WebPage", "@id": a.url, url: a.url, name: a.name,
      description: a.description, datePublished: a.datePublished || today, dateModified: today,
      isPartOf: { "@id": `${base}/#website` }, publisher: { "@id": ORG_ID }, author: orgAuthor() });
    out.push({ "@context": "https://schema.org", ...organization() });
  }

  // Pillar-3 Dataset (the moat) — when the page cites .gov data
  if (a.dataset) {
    out.push({ "@context": "https://schema.org", "@type": "Dataset", name: a.dataset.name, description: a.dataset.description,
      creator: { "@type": "Organization", name: "Centers for Medicare & Medicaid Services", url: a.dataset.sourceUrl },
      license: "https://creativecommons.org/publicdomain/zero/1.0/", isAccessibleForFree: true });
  }

  // Location pages: GovernmentService + Place (enrollmedicare pattern)
  if (a.pageType === "location" && a.place) {
    out.push({ "@context": "https://schema.org", "@type": "GovernmentService", name: "Medicare", serviceType: "Health insurance",
      provider: { "@id": ORG_ID }, areaServed: { "@type": a.place.type, name: a.place.name, ...(a.place.region ? { containedInPlace: { "@type": "State", name: a.place.region } } : {}) } });
  }

  // Article pages
  if (a.pageType === "article") {
    out.push({ "@context": "https://schema.org", "@type": "Article", headline: a.name, description: a.description,
      datePublished: a.datePublished || today, dateModified: today, author: orgAuthor(), publisher: { "@id": ORG_ID },
      ...(a.image ? { image: { "@type": "ImageObject", url: a.image } } : {}), mainEntityOfPage: a.url });
  }

  // Tool pages: WebApplication
  if (a.pageType === "tool") {
    out.push({ "@context": "https://schema.org", "@type": "WebApplication", name: a.name, url: a.url,
      applicationCategory: "FinanceApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } });
  }

  // Pillar-2 FAQPage
  if (a.faqs && a.faqs.length) {
    out.push({ "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: a.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  }

  // BreadcrumbList
  if (a.breadcrumbs && a.breadcrumbs.length) {
    out.push({ "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: a.breadcrumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })) });
  }

  return out;
}
