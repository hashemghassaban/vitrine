import { escapeHtml } from "./escapeHtml";

export type Lang = "fa" | "en" | "ar";

export type HreflangAlternates = {
  fa: string;
  en: string;
  ar: string;
  default: string;
};

export interface CanonicalData {
  canonical: string;
  alternates: HreflangAlternates;
}

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  htmlLang: Lang;
  ogLocale?: string;
  canonical?: string;
  alternates?: HreflangAlternates;
  schema?: object;
}

const BASE_URL = "https://vitrinegallery.ir";

let currentMeta: MetaTags | null = null;
let currentPathname = "/";

export function setMetaTags(meta: MetaTags) {
  currentMeta = meta;
}

export function resetMetaTags() {
  currentMeta = null;
  currentPathname = "/";
}

export function setSSRPathname(pathname: string) {
  currentPathname = pathname.split("?")[0] || "/";
}

export function mergeMetaTags(
  defaultMetadata: MetaTags,
  customMetadata?: Partial<MetaTags>,
): MetaTags {
  const merged = { ...defaultMetadata, ...customMetadata };

  return {
    ...merged,
    ogTitle: merged.ogTitle || merged.title,
    ogDescription: merged.ogDescription || merged.description,
  };
}

export function generateCanonicalAndAlternates(
  pathname?: string,
  currentLang: Lang = "fa",
): CanonicalData {
  const currentPath =
    pathname ||
    currentMeta?.canonical ||
    currentPathname ||
    (typeof window !== "undefined" ? window.location.pathname : "/");

  const cleanPath = currentPath.replace(/^\/(fa|en|ar)/, "") || "/";

  return {
    canonical: `${BASE_URL}/${currentLang}${cleanPath}`,
    alternates: {
      fa: `${BASE_URL}/fa${cleanPath}`,
      en: `${BASE_URL}/en${cleanPath}`,
      ar: `${BASE_URL}/ar${cleanPath}`,
      default: `${BASE_URL}${cleanPath}`,
    },
  };
}

function appendMetaTag(html: string, tag: string): string {
  return `${html}${tag}\n`;
}

export function generateMetaTagsHTML(): string {
  if (!currentMeta) return "";

  const meta = currentMeta;
  let html = "";

  html = appendMetaTag(html, `<title>${escapeHtml(meta.title)}</title>`);
  html = appendMetaTag(
    html,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
  );

  if (meta.keywords) {
    html = appendMetaTag(
      html,
      `<meta name="keywords" content="${escapeHtml(meta.keywords)}">`,
    );
  }

  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;

  html = appendMetaTag(
    html,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}">`,
  );
  html = appendMetaTag(
    html,
    `<meta property="og:description" content="${escapeHtml(ogDescription)}">`,
  );
  html = appendMetaTag(html, `<meta property="og:site_name" content="Vitrine Gallery">`);
  html = appendMetaTag(
    html,
    `<meta name="twitter:card" content="${meta.ogImage ? "summary_large_image" : "summary"}">`,
  );
  html = appendMetaTag(html, `<meta name="twitter:title" content="${escapeHtml(ogTitle)}">`);
  html = appendMetaTag(
    html,
    `<meta name="twitter:description" content="${escapeHtml(ogDescription)}">`,
  );

  if (meta.ogImage) {
    html = appendMetaTag(
      html,
      `<meta property="og:image" content="${escapeHtml(meta.ogImage)}">`,
    );
    html = appendMetaTag(
      html,
      `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}">`,
    );
  }

  if (meta.ogType) {
    html = appendMetaTag(
      html,
      `<meta property="og:type" content="${escapeHtml(meta.ogType)}">`,
    );
  }

  if (meta.ogLocale) {
    html = appendMetaTag(
      html,
      `<meta property="og:locale" content="${escapeHtml(meta.ogLocale)}">`,
    );
  }

  const canonicalData = generateCanonicalAndAlternates(currentPathname, meta.htmlLang);

  html = appendMetaTag(html, `<link rel="canonical" href="${escapeHtml(canonicalData.canonical)}">`);
  html = appendMetaTag(
    html,
    `<link rel="alternate" hreflang="fa" href="${escapeHtml(canonicalData.alternates.fa)}">`,
  );
  html = appendMetaTag(
    html,
    `<link rel="alternate" hreflang="en" href="${escapeHtml(canonicalData.alternates.en)}">`,
  );
  html = appendMetaTag(
    html,
    `<link rel="alternate" hreflang="ar" href="${escapeHtml(canonicalData.alternates.ar)}">`,
  );
  html = appendMetaTag(
    html,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalData.alternates.default)}">`,
  );

  if (meta.schema) {
    html = appendMetaTag(
      html,
      `<script type="application/ld+json">${JSON.stringify(meta.schema)}</script>`,
    );
  }

  return html;
}

export function updateClientMetaTags(meta: MetaTags) {
  if (typeof document === "undefined") return;

  document.title = meta.title;
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.htmlLang === "en" ? "ltr" : "rtl";

  const setMeta = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (isProperty) el.setAttribute("property", name);
      else el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("description", meta.description);
  if (meta.keywords) setMeta("keywords", meta.keywords);

  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;

  setMeta("og:title", ogTitle, true);
  setMeta("og:description", ogDescription, true);
  setMeta("og:site_name", "Vitrine Gallery", true);
  setMeta("twitter:card", meta.ogImage ? "summary_large_image" : "summary");
  setMeta("twitter:title", ogTitle);
  setMeta("twitter:description", ogDescription);

  if (meta.ogImage) {
    setMeta("og:image", meta.ogImage, true);
    setMeta("twitter:image", meta.ogImage);
  }

  if (meta.ogType) setMeta("og:type", meta.ogType, true);
  if (meta.ogLocale) setMeta("og:locale", meta.ogLocale, true);

  const updateLink = (rel: string, href: string, hreflang?: string) => {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      if (hreflang) el.setAttribute("hreflang", hreflang);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  };

  const canonicalData = generateCanonicalAndAlternates(undefined, meta.htmlLang);
  updateLink("canonical", canonicalData.canonical);
  updateLink("alternate", canonicalData.alternates.fa, "fa");
  updateLink("alternate", canonicalData.alternates.en, "en");
  updateLink("alternate", canonicalData.alternates.ar, "ar");
  updateLink("alternate", canonicalData.alternates.default, "x-default");

  let schemaScript = document.querySelector('script[type="application/ld+json"]');
  if (meta.schema) {
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(meta.schema);
  } else if (schemaScript) {
    schemaScript.remove();
  }
}

export function getHtmlDocumentAttributes(meta: MetaTags) {
  return {
    lang: meta.htmlLang,
    dir: meta.htmlLang === "en" ? "ltr" : "rtl",
  };
}

export function injectSSRIntoTemplate(
  template: string,
  options: {
    appHtml: string;
    metaTagsHtml: string;
    htmlLang: string;
    htmlDir: string;
  },
): string {
  let html = template.replace(/<title>[^<]*<\/title>\s*/i, "");
  html = html.replace(/<html([^>]*)>/i, (_match, attrs: string) => {
    const cleanedAttrs = attrs
      .replace(/\slang="[^"]*"/gi, "")
      .replace(/\sdir="[^"]*"/gi, "");
    return `<html lang="${options.htmlLang}" dir="${options.htmlDir}"${cleanedAttrs}>`;
  });

  html = html.replace("<!--ssr-outlet-->", options.appHtml);

  if (options.metaTagsHtml) {
    html = html.replace("</head>", `${options.metaTagsHtml}</head>`);
  }

  return html;
}
