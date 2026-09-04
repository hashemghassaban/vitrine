import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const templatePath = path.join(projectRoot, "dist/server/index.html");
const entryServerPath = path.join(projectRoot, "dist/server/entry-server.js");

let template;
let entryServer;

function getRequestUrl(req) {
  const rawPath = req.query.__ssr_path;
  const pathname = `/${Array.isArray(rawPath) ? rawPath.join("/") : rawPath || "fa"}`
    .replace(/\/+/g, "/");

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (key === "__ssr_path" || value == null) continue;
    if (Array.isArray(value)) {
      value.forEach((item) => search.append(key, String(item)));
    } else {
      search.append(key, String(value));
    }
  }

  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}

async function getRenderer() {
  if (!template) template = fs.readFileSync(templatePath, "utf8");
  if (!entryServer) {
    entryServer = await import(pathToFileURL(entryServerPath).href);
  }
  return entryServer;
}

export default async function handler(req, res) {
  const url = getRequestUrl(req);

  if (url === "/healthz") {
    return res.status(200).json({
      ok: true,
      mode: "vercel-ssr",
      apiTarget: process.env.API_TARGET || "https://admin.vitrine.gallery",
    });
  }

  try {
    const { render, injectSSRIntoTemplate } = await getRenderer();
    const context = {};
    const { appHtml, metaTags, htmlLang, htmlDir, statusCode } = await render(
      url,
      context,
    );

    const html = injectSSRIntoTemplate(template, {
      appHtml,
      metaTagsHtml: metaTags,
      htmlLang,
      htmlDir,
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.status(statusCode || 200).send(html);
  } catch (error) {
    console.error("Vercel SSR error:", error);
    return res.status(500).send("Internal Server Error");
  }
}
