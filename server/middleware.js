import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// Serve static files
app.use(express.static(path.resolve(__dirname, "../dist/client"), { maxAge: "1d" }));
// Template
const templatePath = path.resolve(__dirname, "../dist/client/index.html");
let template;
// SSR render function
async function ssrRender(url) {
    // Dynamic import for SSR entry
    const { render } = await import("../dist/entry-server.js");
    const context = {};
    const { appHtml, metaTags } = await render(url, context);
    return { appHtml, metaTags };
}
// HTML template function
function renderHtml(appHtml, metaTags) {
    if (!template) {
        template = fs.readFileSync(templatePath, "utf-8");
    }
    let html = template.replace(`<!--ssr-outlet-->`, appHtml);
    // Insert meta tags in head
    if (metaTags) {
        html = html.replace("</head>", `${metaTags}</head>`);
    }
    return html;
}
// SSR handler
app.get("*", async (req, res) => {
    try {
        const { appHtml, metaTags } = await ssrRender(req.originalUrl);
        const html = renderHtml(appHtml, metaTags);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
    }
    catch (e) {
        console.error("SSR Error:", e);
        res.status(500).send("Internal Server Error");
    }
});
const port = process.env.PORT || 5173;
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
