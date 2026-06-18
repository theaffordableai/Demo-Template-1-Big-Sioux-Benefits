// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// Adapter auto-detects the host so the same repo deploys to either with zero config:
//  - Cloudflare Pages sets CF_PAGES=1  → Cloudflare adapter (outputs dist/ + _worker.js)
//  - Vercel sets VERCEL=1              → Vercel adapter (outputs .vercel/output)
//  - Local default                    → Cloudflare (our production target)
// Override anywhere with DEPLOY_TARGET=cloudflare|vercel.
const target =
  process.env.DEPLOY_TARGET ||
  (process.env.CF_PAGES ? "cloudflare" : process.env.VERCEL ? "vercel" : "cloudflare");
const adapter = target === "vercel" ? vercel() : cloudflare({ platformProxy: { enabled: true } });

export default defineConfig({
  site: "https://medicareatx.com",
  output: "static",
  adapter,
  integrations: [sitemap()],
});
