import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const getMetaFromURL = async (url) => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const document = new DOMParser().parseFromString(html, "text/html");
    const metaTags = document.querySelectorAll('meta');
    const titleTag = document.querySelector('title');
    const documentMeta = Array.from(metaTags)
      .reduce((acc, meta) => {
        const property = meta.getAttribute('property');
        const name = meta.getAttribute('name');
        const content = meta.getAttribute('content');

        if (!property && !name) return acc;

        acc[property ?? name] = content;
        return acc;
      }, {});

    documentMeta.title = titleTag.textContent;

    return documentMeta;
  } catch (err) {
    console.error(err);
  }
}

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Welcome to meta tags API!";
  })
  .get("/api/meta", async (context) => {
    const url = context.request.url.searchParams.get('url');

    if (url) {
      context.response.body = await getMetaFromURL(url);
    } else {
      context.response.body = "Missing url";
    }
  });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
