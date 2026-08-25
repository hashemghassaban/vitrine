import type { Lang } from "../utils/metaTags";
import { fetchApiData } from "../utils/apiFetch";
import { getRouteMetadata, metadataByLang } from "./routeMetadata";
import type { MetaTags } from "../utils/metaTags";
import type { IndexDataView, ProductCategoryView } from "../models/views/indexView";

const STATIC_SEGMENTS = new Set([
  "blog",
  "about",
  "agents",
  "catalogue",
  "faq",
  "Contact",
  "search",
  "project",
  "brands",
  "services",
  "products",
]);

const PAGE_METADATA_ALIASES: Record<string, string> = {
  gallery: "/gallery",
  showroom: "/showroom",
  team: "/team",
  partners: "/partners",
  careers: "/careers",
};

const NOT_FOUND_META: Record<Lang, MetaTags> = {
  fa: {
    title: "صفحه یافت نشد | ویترین گالری",
    description: "صفحه مورد نظر شما یافت نشد.",
    htmlLang: "fa",
    ogLocale: "fa_IR",
  },
  en: {
    title: "Page Not Found | Vitrine Gallery",
    description: "The page you are looking for does not exist.",
    htmlLang: "en",
    ogLocale: "en_US",
  },
  ar: {
    title: "الصفحة غير موجودة | Vitrine Gallery",
    description: "الصفحة التي تبحث عنها غير موجودة.",
    htmlLang: "ar",
    ogLocale: "ar_AR",
  },
};

export type ParsedRoute =
  | { type: "redirect-root" }
  | { type: "home"; lang: Lang }
  | { type: "static"; lang: Lang; segment: string }
  | { type: "product-detail"; lang: Lang; id: string }
  | { type: "blog-detail"; lang: Lang; id: string }
  | { type: "project-detail"; lang: Lang; id: string }
  | { type: "brand-detail"; lang: Lang; id: string }
  | { type: "dynamic-page"; lang: Lang; pageName: string }
  | { type: "products-category"; lang: Lang; categoryId: string }
  | { type: "not-found"; lang: Lang };

export function parseRoute(path: string): ParsedRoute {
  const pathOnly = path.split("?")[0].replace(/\/$/, "") || "/";

  if (pathOnly === "/") {
    return { type: "redirect-root" };
  }

  const match = pathOnly.match(/^\/(fa|en|ar)(?:\/(.*))?$/);
  if (!match) {
    return { type: "not-found", lang: "fa" };
  }

  const lang = match[1] as Lang;
  const rest = match[2] || "";

  if (!rest) {
    return { type: "home", lang };
  }

  const parts = rest.split("/");
  const first = parts[0];

  if (first === "pages" && parts[1]) {
    return { type: "dynamic-page", lang, pageName: parts[1] };
  }

  if (first === "products" && parts[1] === "category" && parts[2]) {
    return { type: "products-category", lang, categoryId: parts[2] };
  }

  if (first === "products" && parts[1] && parts[1] !== "category") {
    return { type: "product-detail", lang, id: parts[1] };
  }

  if (first === "blog" && parts[1]) {
    return { type: "blog-detail", lang, id: parts[1] };
  }

  if (first === "project" && parts[1]) {
    return { type: "project-detail", lang, id: parts[1] };
  }

  if (first === "brand-detail" && parts[1]) {
    return { type: "brand-detail", lang, id: parts[1] };
  }

  if (parts.length === 1 && STATIC_SEGMENTS.has(first)) {
    return { type: "static", lang, segment: first };
  }

  return { type: "not-found", lang };
}

function siteName(lang: Lang): string {
  return lang === "fa" ? "ویترین گالری" : "Vitrine Gallery";
}

function enrichMeta(meta: MetaTags, pathname: string): MetaTags {
  const defaultOgImage = metadataByLang[meta.htmlLang]?.["/"]?.ogImage;

  return {
    ...meta,
    ogTitle: meta.ogTitle || meta.title,
    ogDescription: meta.ogDescription || meta.description,
    ogImage: meta.ogImage || defaultOgImage,
    canonical: pathname,
  };
}

function findCategoryById(
  categories: ProductCategoryView[] | undefined,
  id: number,
): ProductCategoryView | null {
  if (!categories) return null;

  for (const category of categories) {
    if (category.id === id) return category;
    const nested = findCategoryById(category.children, id);
    if (nested) return nested;
  }

  return null;
}

async function resolveCategoryMeta(lang: Lang, categoryId: string): Promise<MetaTags | null> {
  const indexData = await fetchApiData<IndexDataView>("", lang);
  const category = findCategoryById(indexData?.product_categories, Number(categoryId));

  if (!category) return null;

  return enrichMeta(
    {
      title: `${category.title} | ${siteName(lang)}`,
      description: category.meta_description || category.title,
      htmlLang: lang,
      ogLocale: metadataByLang[lang]["/products"].ogLocale,
      ogImage: category.image_link,
      ogType: "website",
    },
    `/${lang}/products/category/${categoryId}`,
  );
}

async function resolveDynamicMeta(
  lang: Lang,
  pageName: string,
  pathname: string,
): Promise<MetaTags> {
  const aliasPath = PAGE_METADATA_ALIASES[pageName.toLowerCase()];
  if (aliasPath && metadataByLang[lang]?.[aliasPath]) {
    return enrichMeta(metadataByLang[lang][aliasPath], pathname);
  }

  const page = await fetchApiData<{
    title?: string;
    meta_description?: string;
    description?: string;
    image?: string;
  }>(`/page/${pageName}`, lang);

  if (page?.title) {
    return enrichMeta(
      {
        title: `${page.title} | ${siteName(lang)}`,
        description: page.meta_description || page.description || page.title,
        htmlLang: lang,
        ogLocale: metadataByLang[lang]["/"].ogLocale,
        ogImage: page.image,
        ogType: "website",
      },
      pathname,
    );
  }

  return enrichMeta(getRouteMetadata(pathname), pathname);
}

export async function resolveSSRMetadata(
  url: string,
): Promise<{ meta: MetaTags; statusCode: number }> {
  const path = url.split("?")[0];
  const searchParams = new URL(url, "http://localhost").searchParams;
  const parsed = parseRoute(path);

  if (parsed.type === "redirect-root") {
    return { meta: enrichMeta(getRouteMetadata("/fa"), "/fa"), statusCode: 200 };
  }

  if (parsed.type === "not-found") {
    return { meta: enrichMeta(NOT_FOUND_META[parsed.lang], path), statusCode: 404 };
  }

  if (parsed.type === "home") {
    return { meta: enrichMeta(getRouteMetadata(path), path), statusCode: 200 };
  }

  if (parsed.type === "static") {
    let meta = enrichMeta(getRouteMetadata(path), path);

    if (parsed.segment === "search") {
      const query = searchParams.get("s");
      if (query) {
        meta = {
          ...meta,
          title: `${query} | ${meta.title}`,
          description:
            parsed.lang === "fa"
              ? `نتایج جستجو برای «${query}» در ویترین گالری`
              : parsed.lang === "ar"
                ? `نتائج البحث عن «${query}» في Vitrine Gallery`
                : `Search results for "${query}" on Vitrine Gallery`,
        };
      }
    }

    return { meta, statusCode: 200 };
  }

  if (parsed.type === "products-category") {
    const categoryMeta = await resolveCategoryMeta(parsed.lang, parsed.categoryId);
    return {
      meta: categoryMeta ?? enrichMeta(getRouteMetadata(path), path),
      statusCode: 200,
    };
  }

  if (parsed.type === "dynamic-page") {
    return {
      meta: await resolveDynamicMeta(parsed.lang, parsed.pageName, path),
      statusCode: 200,
    };
  }

  if (parsed.type === "product-detail") {
    const product = await fetchApiData<{
      title?: string;
      summary?: string;
      excerpt?: string;
      seo?: { page_title?: string; meta_description?: string };
      media?: Array<{ url?: string }>;
    }>(`/products/${parsed.id}`, parsed.lang);

    if (product?.title) {
      return {
        meta: enrichMeta(
          {
            title: `${product.seo?.page_title || product.title} | ${siteName(parsed.lang)}`,
            description:
              product.seo?.meta_description ||
              product.summary ||
              product.excerpt ||
              product.title,
            htmlLang: parsed.lang,
            ogLocale: metadataByLang[parsed.lang]["/products"].ogLocale,
            ogImage: product.media?.[0]?.url,
            ogType: "product",
          },
          path,
        ),
        statusCode: 200,
      };
    }
  }

  if (parsed.type === "blog-detail") {
    const blog = await fetchApiData<{
      title?: string;
      image?: string;
      seo?: { page_title?: string; meta_description?: string };
    }>(`/blog/${parsed.id}`, parsed.lang);

    if (blog?.title) {
      return {
        meta: enrichMeta(
          {
            title: `${blog.seo?.page_title || blog.title} | ${siteName(parsed.lang)}`,
            description: blog.seo?.meta_description || blog.title,
            htmlLang: parsed.lang,
            ogLocale: metadataByLang[parsed.lang]["/blog"].ogLocale,
            ogImage: blog.image,
            ogType: "article",
          },
          path,
        ),
        statusCode: 200,
      };
    }
  }

  if (parsed.type === "project-detail") {
    const project = await fetchApiData<{
      title?: string;
      meta_description?: string;
      excerpt?: string;
      image_link?: string;
    }>(`/projects/${parsed.id}`, parsed.lang);

    if (project?.title) {
      return {
        meta: enrichMeta(
          {
            title: `${project.title} | ${siteName(parsed.lang)}`,
            description: project.meta_description || project.excerpt || project.title,
            htmlLang: parsed.lang,
            ogLocale: metadataByLang[parsed.lang]["/project"].ogLocale,
            ogImage: project.image_link,
            ogType: "website",
          },
          path,
        ),
        statusCode: 200,
      };
    }
  }

  if (parsed.type === "brand-detail") {
    const brand = await fetchApiData<{
      title?: string;
      meta_description?: string;
      excerpt?: string;
      logo?: string;
    }>(`/brands/${parsed.id}`, parsed.lang);

    if (brand?.title) {
      return {
        meta: enrichMeta(
          {
            title: `${brand.title} | ${siteName(parsed.lang)}`,
            description: brand.meta_description || brand.excerpt || brand.title,
            htmlLang: parsed.lang,
            ogLocale: metadataByLang[parsed.lang]["/brands"].ogLocale,
            ogImage: brand.logo,
            ogType: "website",
          },
          path,
        ),
        statusCode: 200,
      };
    }
  }

  return { meta: enrichMeta(getRouteMetadata(path), path), statusCode: 200 };
}

export { enrichMeta, siteName, NOT_FOUND_META };
