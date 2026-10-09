import "./polyfills.js";
import { render, injectSSRIntoTemplate } from "../dist/server/entry-server.js";
import template from "../dist/server/index.html";

const PROXY_PREFIXES = ["/api", "/captcha"];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (
      PROXY_PREFIXES.some(
        (p) => url.pathname === p || url.pathname.startsWith(p + "/"),
      )
    ) {
      const target = env.API_TARGET.replace(/\/$/, "") + url.pathname + url.search;
      return fetch(new Request(target, request));
    }

    try {
      const context = {};
      const { appHtml, metaTags, htmlLang, htmlDir, statusCode } = await render(
        url.pathname + url.search,
        context,
      );

      const html = injectSSRIntoTemplate(template, {
        appHtml,
        metaTagsHtml: metaTags,
        htmlLang,
        htmlDir,
      });

      return new Response(html, {
        status: statusCode || 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=0, must-revalidate",
        },
      });
    } catch (error) {
      console.error("Worker SSR error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
