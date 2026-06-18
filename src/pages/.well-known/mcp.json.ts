// WebMCP discovery surface (WEBMCP-SPEC §2A): /.well-known/mcp.json
// Generated from the same TOOLS array as the executable endpoint so the
// advertised tools always match what /mcp actually serves.

import type { APIRoute } from "astro";
import { TOOLS } from "../../lib/tools";

export const prerender = false;

export const GET: APIRoute = ({ site, url }) => {
  // Prefer the live request origin so the manifest is correct wherever it's served
  // (localhost, preview, prod). Fall back to the configured canonical site.
  const base = (url?.origin ?? site?.origin ?? "https://medicare-demo.strategicaiarchitects.com").replace(/\/$/, "");
  const manifest = {
    schemaVersion: "2025-06-18",
    name: "Medicare Plan Finder WebMCP (demo)",
    description: "Live Medicare Advantage plan + cost tools for browsing AI agents. SAA Pillar-4 reference build.",
    endpoint: `${base}/mcp`,
    transport: "http",
    documentation: `${base}/`,
    tools: TOOLS.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })),
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
    },
  });
};
