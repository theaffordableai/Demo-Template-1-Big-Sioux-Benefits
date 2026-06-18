// WebMCP in-page registration (WEBMCP-SPEC §2C).
// Registers this page's tool with a browsing agent operating the LIVE page
// (Computer Use / browser agents that implement the emerging
// navigator.modelContext / WebMCP affordance). The handler forwards to the same
// /mcp endpoint the human widget uses, so all three surfaces share one code path.
//
// Defensive: the API is still emerging, so we feature-detect and no-op gracefully.

type ToolHandler = (args: Record<string, unknown>) => Promise<unknown>;

async function callMcp(name: string, args: Record<string, unknown>) {
  const res = await fetch("/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method: "tools/call", params: { name, arguments: args } }),
  });
  const json = await res.json();
  return json?.result?.structuredContent ?? json?.result ?? json;
}

const TOOLS: { name: string; description: string; inputSchema: Record<string, unknown>; execute: ToolHandler }[] = [
  {
    name: "medicare_search_plans",
    description: "Find and rank Medicare Advantage plans by ZIP (premium, star rating, drug deductible, max out-of-pocket).",
    inputSchema: {
      type: "object",
      properties: { zip: { type: "string" }, sort: { type: "string", enum: ["premium", "stars", "moop"] } },
      required: ["zip"],
    },
    execute: (args) => callMcp("medicare_search_plans", args),
  },
];

export function registerWebMcpTools() {
  const nav = navigator as unknown as {
    modelContext?: {
      registerTool?: (t: unknown) => void;
      provideContext?: (c: unknown) => void;
    };
  };

  const mc = nav.modelContext;
  if (!mc) {
    // No agent runtime present — fine. The /mcp + /.well-known surfaces still serve agents.
    (window as any).__webmcp = { available: false, tools: TOOLS.map((t) => t.name) };
    return;
  }

  try {
    if (typeof mc.registerTool === "function") {
      for (const t of TOOLS) mc.registerTool(t);
    } else if (typeof mc.provideContext === "function") {
      mc.provideContext({ tools: TOOLS });
    }
    (window as any).__webmcp = { available: true, tools: TOOLS.map((t) => t.name) };
  } catch {
    (window as any).__webmcp = { available: false, tools: TOOLS.map((t) => t.name) };
  }
}
