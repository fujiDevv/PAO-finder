import paoData from "./pao-db.json";

export default {
  async fetch(request, _env, _ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    // Handle Preflight Options
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === "/api/lookup") {
      const query = url.searchParams.get("q")?.trim().toLowerCase();

      if (!query) {
        return new Response(
          JSON.stringify({ success: false, error: "Missing query parameter 'q'" }),
          { status: 400, headers: corsHeaders },
        );
      }

      // Deep scan both the localized coverage strings and general regional names
      const match = paoData.find(
        (item) => item.coverage.includes(query) || item.region.toLowerCase().includes(query),
      );

      if (!match) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "No localized district found. Redirecting to central resources.",
          }),
          { status: 204, headers: corsHeaders },
        );
      }

      return new Response(JSON.stringify({ success: true, data: match }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ error: "Endpoint Not Found" }), {
      status: 404,
      headers: corsHeaders,
    });
  },
};
