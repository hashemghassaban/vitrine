import { default as express } from "express";
import type { Express, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const API_TARGET = (
  process.env.API_TARGET || "https://admin.vitrine.gallery"
).replace(/\/$/, "");

type EntryServerModule = {
  render: (
    url: string,
    context: Record<string, unknown>,
  ) => Promise<{
    appHtml: string;
    metaTags: string;
    htmlLang: string;
    htmlDir: string;
    statusCode: number;
  }>;
  injectSSRIntoTemplate: (
    template: string,
    options: {
      appHtml: string;
      metaTagsHtml: string;
      htmlLang: string;
      htmlDir: string;
    },
  ) => string;
};

let entryServerModule: EntryServerModule | null = null;

async function getEntryServer(): Promise<EntryServerModule> {
  if (entryServerModule) return entryServerModule;

  const entryServerPath = path.resolve(__dirname, "./entry-server.js");
  entryServerModule = (await import(pathToFileURL(entryServerPath).href)) as EntryServerModule;
  return entryServerModule;
}

function createProxy(prefix: string) {
  return async (req: Request, res: Response) => {
    const targetUrl = `${API_TARGET}${prefix}${req.url}`;

    try {
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (key === "host" || key === "connection") continue;
        if (typeof value === "string") headers.set(key, value);
        else if (Array.isArray(value)) headers.set(key, value.join(", "));
      }

      const hasBody = req.method !== "GET" && req.method !== "HEAD";
      const requestOptions = {
        method: req.method,
        headers,
        body: hasBody && req.body?.length ? new Uint8Array(req.body) : undefined,
        duplex: hasBody ? "half" : undefined,
      } as RequestInit;

      const response = await fetch(targetUrl, requestOptions);

      res.status(response.status);
      response.headers.forEach((value, key) => {
        // Node fetch decompresses upstream responses. Do not forward stale
        // encoding/length headers for the already-decoded response body.
        if (
          key.toLowerCase() !== "transfer-encoding" &&
          key.toLowerCase() !== "content-encoding" &&
          key.toLowerCase() !== "content-length"
        ) {
          res.setHeader(key, value);
        }
      });

      const body = Buffer.from(await response.arrayBuffer());
      res.send(body);
    } catch (error) {
      console.error("API proxy error:", error);
      res.status(502).json({ success: false, message: "API proxy error" });
    }
  };
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Preserve JSON, form and captcha payloads while forwarding them upstream.
app.use(express.raw({ type: "*/*", limit: "10mb" }));
app.get("/healthz", (_req, res) => {
  res.json({ ok: true, mode: "ssr", apiTarget: API_TARGET });
});
app.use("/api", createProxy("/api"));
app.use("/captcha", createProxy("/captcha"));

app.use(
  express.static(path.resolve(__dirname, "../../dist/client"), {
    index: false,
    maxAge: "1d",
  }),
);

const templatePath = path.resolve(__dirname, "../../dist/client/index.html");
let template: string;

app.get("/", (_req, res) => {
  res.redirect(302, "/fa");
});

app.get("*", async (req: Request, res: Response) => {
  try {
    if (!template) {
      template = fs.readFileSync(templatePath, "utf-8");
    }

    const { render, injectSSRIntoTemplate } = await getEntryServer();
    const context: Record<string, unknown> = {};
    const { appHtml, metaTags, htmlLang, htmlDir, statusCode } = await render(
      req.originalUrl,
      context,
    );

    const html = injectSSRIntoTemplate(template, {
      appHtml,
      metaTagsHtml: metaTags,
      htmlLang,
      htmlDir,
    });

    res.status(statusCode || 200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e: unknown) {
    console.error("SSR Error:", e);
    res.status(500).send("Internal Server Error");
  }
});

const port = process.env.PORT || 5173;

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
