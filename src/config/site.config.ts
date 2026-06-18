// Single source of truth for this site: brand, GHL, WebMCP, AEO identity.
// To spin a new client: copy this site folder and swap this file.
// Branding + business info sourced from medicareatx.com (Medicare ATX, Lakeway TX).

export const site = {
  domain: "https://medicareatx.com",
  brand: {
    name: "Medicare ATX",
    short: "Medicare ATX",
    tagline: "Medicare made easy — plus expert advice at no cost",
    // Org-level author for YMYL (Pillar 1 — never a single person)
    author: "Medicare ATX Data Desk",
    advisorName: "Martin Frey",
    advisorTitle: "Your personal Medicare & insurance consultant",
    foundedCity: "Lakeway",
    state: "TX",
    serviceArea: "Greater Austin & the Texas Hill Country — Lakeway, Bee Cave, Austin, Cedar Park, Round Rock & surrounding communities",
    phone: "(512) 674-5001",
    phoneHref: "+15126745001",
    email: "info@medicareatx.com",
    address: { street: "Lakeway", city: "Lakeway", region: "TX", postal: "78734" },
    hours: "Mon–Fri 9am–5pm CT",
    npn: "DEMO-NPN-00000000",
    social: ["https://www.linkedin.com/company/medicare-atx"] as string[],
  },
  // Brand design tokens (kept in sync with src/styles/ds/tokens/colors.css)
  theme: {
    ink: "#0f2233", primary: "#1d5082", primaryDark: "#143b6b",
    accent: "#e5b322", accentDark: "#b78c10",
    cta: "#f2592b", teal: "#327c6a",
    paper: "#ffffff", soft: "#eaf1f8", line: "#e1e9f1", muted: "#46586d",
    headingFont: "'Lexend', system-ui, sans-serif",
    bodyFont: "'Source Sans 3', system-ui, sans-serif",
    monoFont: "'Source Sans 3', monospace",
  },
  // GHL (demo IDs — replace with the client's real sub-account values)
  ghl: {
    locationId: "DEMO_LOCATION_ID",
    calendarId: "DEMO_CALENDAR_ID",
    chatWidgetId: "",
    voiceWidgetId: "",
    trackingDomain: "link.medicareatx.com",
    trackingId: "tk_DEMO000000000000000000000000000",
    enableChat: true,
    enableVoice: false,
  },
  // WebMCP (Pillar 4) — tools this site exposes to AI agents
  webmcp: {
    name: "Medicare ATX WebMCP",
    description: "Live Medicare plan + cost tools for browsing AI agents.",
  },
} as const;

export type Site = typeof site;
