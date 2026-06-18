// WebMCP execution surface (WEBMCP-SPEC §2B / §3).
// A thin, MCP-compliant JSON-RPC 2.0 HTTP endpoint. Supports:
//   - initialize
//   - tools/list
//   - tools/call
// It calls the SAME shared logic the human widget uses. Read/estimate only —
// no writes, no PII storage (spec §3 guardrails).

import type { APIRoute } from "astro";
import { TOOLS, callTool } from "../lib/tools";

export const prerender = false;

const SERVER_INFO = {
  name: "medicare-webmcp-demo",
  version: "1.0.0",
  title: "EnrollMedicare-style Plan Finder WebMCP (demo)",
};
const PROTOCOL_VERSION = "2025-06-18";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id",
};

function rpc(id: unknown, result?: unknown, error?: { code: number; message: string }) {
  const body: Record<string, unknown> = { jsonrpc: "2.0", id: id ?? null };
  if (error) body.error = error;
  else body.result = result;
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

// Human-friendly GET: explain what this endpoint is.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        what: "This is a WebMCP endpoint. POST JSON-RPC 2.0 to call tools.",
        protocol: "Model Context Protocol over HTTP (JSON-RPC 2.0)",
        try: {
          method: "POST",
          body: { jsonrpc: "2.0", id: 1, method: "tools/list" },
        },
        tools: TOOLS.map((t) => t.name),
        discovery: "/.well-known/mcp.json",
      },
      null,
      2
    ),
    { headers: { "Content-Type": "application/json", ...CORS } }
  );

export const OPTIONS: APIRoute = () => new Response(null, { status: 204, headers: CORS });

export const POST: APIRoute = async ({ request }) => {
  let msg: any;
  try {
    msg = await request.json();
  } catch {
    return rpc(null, undefined, { code: -32700, message: "Parse error" });
  }

  const { id, method, params } = msg ?? {};

  switch (method) {
    case "initialize":
      return rpc(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions:
          "Medicare Advantage plan finder for selected demo ZIPs. Call medicare_search_plans " +
          "with a 5-digit ZIP. Outputs are CMS PY2026 estimates — advise verifying with a licensed agent.",
      });

    case "notifications/initialized":
      return new Response(null, { status: 204, headers: CORS });

    case "tools/list":
      return rpc(id, {
        tools: TOOLS.map((t) => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema,
        })),
      });

    case "tools/call": {
      const name = params?.name;
      const args = params?.arguments ?? {};
      if (!name) return rpc(id, undefined, { code: -32602, message: "Missing params.name" });
      const r = callTool(name, args);
      if (!r.ok) {
        return rpc(id, {
          content: [{ type: "text", text: r.error ?? "Tool error" }],
          isError: true,
        });
      }
      return rpc(id, {
        content: [{ type: "text", text: JSON.stringify(r.result, null, 2) }],
        structuredContent: r.result,
      });
    }

    default:
      return rpc(id, undefined, { code: -32601, message: `Method not found: ${method}` });
  }
};
