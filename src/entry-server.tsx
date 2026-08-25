import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { ROUTER_BASENAME } from "./helpers/constants.ts";
import { resolveSSRMetadata } from "./config/resolveSSRMetadata.ts";
import {
  generateMetaTagsHTML,
  getHtmlDocumentAttributes,
  resetMetaTags,
  setMetaTags,
  setSSRPathname,
} from "./utils/metaTags.ts";
import App from "./App.tsx";

interface RenderContext {
  url: string;
  statusCode?: number;
  metaTags?: string;
  htmlLang?: string;
  htmlDir?: string;
}

export { injectSSRIntoTemplate } from "./utils/metaTags.ts";

export async function render(url: string, context: RenderContext) {
  resetMetaTags();
  context.url = url;

  const path = url.split("?")[0];
  const { meta, statusCode } = await resolveSSRMetadata(url);

  setSSRPathname(path);
  setMetaTags(meta);

  const appHtml = renderToString(
    <StaticRouter location={url} basename={ROUTER_BASENAME}>
      <App />
    </StaticRouter>,
  );

  const metaTagsHtml = generateMetaTagsHTML();
  const { lang, dir } = getHtmlDocumentAttributes(meta);

  context.metaTags = metaTagsHtml;
  context.statusCode = statusCode;
  context.htmlLang = lang;
  context.htmlDir = dir;

  return {
    appHtml,
    metaTags: metaTagsHtml,
    htmlLang: lang,
    htmlDir: dir,
    statusCode,
  };
}
