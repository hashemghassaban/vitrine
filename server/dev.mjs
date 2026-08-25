import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5173;

async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("src/entry-server.tsx");

      const context = {};
      const { appHtml, metaTags } = await render(url, context);

      let html = template.replace(`<!--ssr-outlet-->`, appHtml);
      
      // Insert meta tags in head
      if (metaTags) {
        html = html.replace("</head>", `${metaTags}</head>`);
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error("SSR Error:", e);
      res.status(500).send(`<pre>${e.stack}</pre>`);
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Dev server running at http://localhost:${port}`);
  });
}

createServer();
