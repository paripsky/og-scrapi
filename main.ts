import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";

const getMetaTags = async (url: string) => {
  try {
    const headers = new Headers();
    headers.set("accept", "text/html,application/xhtml+xml,application/xml");
    const res = await fetch(url, { headers });
    const html = await res.text();
    const document = new DOMParser().parseFromString(html, "text/html");
    const metaTags = document.querySelectorAll("meta");
    const titleTag = document.querySelector("title");
    const documentMeta = Array.from(metaTags)
      .reduce((acc, meta) => {
        const el = meta as Element;
        const property = el.getAttribute("property");
        const name = el.getAttribute("name");
        const content = el.getAttribute("content");

        if (!content) return acc;
        if (property) acc[property] = content;
        if (name) acc[name] = content;

        return acc;
      }, {} as Record<string, string>);

    if (titleTag) documentMeta.title = titleTag.textContent;

    return documentMeta;
  } catch (err) {
    console.error(err);
  }
};

Deno.serve({ port: 8000 }, async (request: Request): Promise<Response> => {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Content-Type", "application/json");
  const url = new URL(request.url);

  if (request.method === "GET" && url.pathname === "/api/meta") {
    const urlToFetch = url.searchParams.get("url");

    if (!urlToFetch) throw new Error(`missing url query param`);

    const metaTags = await getMetaTags(urlToFetch);
    return new Response(JSON.stringify(metaTags), { status: 200, headers });
  }

  if (request.method === "GET" && url.pathname === "/") {
    return new Response("OK", { status: 200, headers });
  }

  return new Response("not found", { status: 404, headers });
});

console.log(`HTTP server running. Access it at: http://localhost:8000/`);
