import type { MetaTags } from '../utils/metaTags';

type RouteMetaTags = MetaTags & {
  keywords?: string;
};

export interface RouteConfig {
  path: string;
  meta: RouteMetaTags;
}

const defaultImages = {
  og: 'https://vitrinegallery.ir/og-image.jpg',
};

// ======================================================================
// Metadata by Language
// ======================================================================

export const metadataByLang: Record<string, Record<string, RouteMetaTags>> = {
  fa: {
    '/': {
      title: 'ویترین گالری | خانه',
      description: 'ویترین گالری، مجموعه‌ای از محصولات لوکس و پروژه‌های طراحی داخلی.',
      keywords: 'ویترین گالری، طراحی داخلی، محصولات لوکس',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/products': {
      title: 'محصولات | ویترین گالری',
      description: 'مشاهده و خرید محصولات لوکس ویترین گالری.',
      keywords: 'محصولات، طراحی، دکوراسیون',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
       '/agents': {
      title: 'نمایندگی ها | ویترین گالری',
      description: 'مشاهده و خرید نمایندگی ها لوکس ویترین گالری.',
      keywords: 'نمایندگی ها طراحی، دکوراسیون',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/project': {
      title: 'پروژه‌ها | ویترین گالری',
      description: 'نمونه پروژه‌های طراحی و اجرا شده توسط ویترین گالری.',
      keywords: 'پروژه، طراحی داخلی، اجرا',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/blog': {
      title: 'بلاگ | ویترین گالری',
      description: 'مطالب تخصصی طراحی داخلی و نکات دکوراسیون.',
      keywords: 'بلاگ، طراحی داخلی، دکور',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/brands': {
      title: 'برندها | ویترین گالری',
      description: 'معرفی برندهای معتبر جهانی در ویترین گالری.',
      keywords: 'برند، طراحی، محصولات لوکس',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/services': {
      title: 'خدمات | ویترین گالری',
      description: 'طراحی داخلی، مشاوره و اجرای پروژه‌های لوکس.',
      keywords: 'خدمات، طراحی، اجرا',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/gallery': {
      title: 'گالری تصاویر | ویترین گالری',
      description: 'مشاهده تصاویر پروژه‌ها و محصولات ویترین گالری.',
      keywords: 'گالری، تصاویر، پروژه',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/showroom': {
      title: 'شوروم | ویترین گالری',
      description: 'بازدید از شوروم ویترین گالری و محصولات لوکس.',
      keywords: 'شوروم، ویترین، طراحی دکور',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/team': {
      title: 'تیم ما | ویترین گالری',
      description: 'معرفی اعضای تیم طراحی و مدیریت ویترین گالری.',
      keywords: 'تیم طراحی، متخصصان، گالری',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/partners': {
      title: 'همکاران | ویترین گالری',
      description: 'معرفی همکاران و شرکت‌های مرتبط با ویترین گالری.',
      keywords: 'شرکای تجاری، همکاران، برند',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/catalogue': {
      title: 'کاتالوگ | ویترین گالری',
      description: 'دانلود و مشاهده کاتالوگ محصولات ویترین گالری.',
      keywords: 'کاتالوگ، دانلود، محصولات',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/careers': {
      title: 'فرصت‌های شغلی | ویترین گالری',
      description: 'پیوستن به تیم ویترین گالری و فرصت‌های همکاری.',
      keywords: 'شغل، استخدام، طراحی داخلی',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/about': {
      title: 'درباره ما | ویترین گالری',
      description: 'درباره ویترین گالری، اهداف و تاریخچه آن.',
      keywords: 'درباره ویترین گالری، تاریخچه، هدف',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/contact': {
      title: 'تماس با ما | ویترین گالری',
      description: 'راه‌های ارتباطی با ویترین گالری.',
      keywords: 'تماس، ارتباط، ویترین',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
    '/faq': {
      title: 'سوالات متداول | ویترین گالری',
      description: 'پاسخ به سوالات پرتکرار مشتریان.',
      keywords: 'سوالات، پاسخ، مشتری',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
        '/search': {
      title: 'جستجو | ویترین گالری',
      description: 'جستجوی محصول ُ پروژه ُ مقاله',
      keywords: 'مقاله محصول جستوجو',
      ogLocale: 'fa_IR',
      htmlLang: 'fa',
      ogImage: defaultImages.og,
    },
  },

  // ======================================================================
  // English Metadata
  // ======================================================================
  en: {
    '/': {
      title: 'Vitrine Gallery | Home',
      description: 'Luxury products and interior design projects.',
      keywords: 'Vitrine Gallery, interior design, luxury products',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/products': {
      title: 'Products | Vitrine Gallery',
      description: 'Explore and shop our luxury collection.',
      keywords: 'products, furniture, design',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
        '/agents': {
      title: 'Agents | Vitrine Gallery',
      description: 'Explore and shop our luxury collection.',
      keywords: 'Agents, furniture, design',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/project': {
      title: 'Projects | Vitrine Gallery',
      description: 'Discover interior design projects we’ve completed.',
      keywords: 'projects, design, architecture',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/blog': {
      title: 'Blog | Vitrine Gallery',
      description: 'Articles and insights on design and architecture.',
      keywords: 'blog, design, interior',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/brands': {
      title: 'Brands | Vitrine Gallery',
      description: 'Worldwide brands available at Vitrine Gallery.',
      keywords: 'brands, luxury, design',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/services': {
      title: 'Services | Vitrine Gallery',
      description: 'Interior design and project execution services.',
      keywords: 'services, design, decoration',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/gallery': {
      title: 'Gallery | Vitrine Gallery',
      description: 'Browse photos of products and completed projects.',
      keywords: 'gallery, images, design',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/showroom': {
      title: 'Showroom | Vitrine Gallery',
      description: 'Visit our showroom and experience luxury collections.',
      keywords: 'showroom, vitrine gallery, design',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/team': {
      title: 'Our Team | Vitrine Gallery',
      description: 'Meet our design and management team.',
      keywords: 'team, designers, vitrine',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/partners': {
      title: 'Partners | Vitrine Gallery',
      description: 'Our corporate and brand partners.',
      keywords: 'partners, collaborators, design',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/catalogue': {
      title: 'catalogue | Vitrine Gallery',
      description: 'Download our product catalog.',
      keywords: 'catalogue, products, download',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/careers': {
      title: 'Careers | Vitrine Gallery',
      description: 'Join Vitrine Gallery’s creative team.',
      keywords: 'careers, jobs, design',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/about': {
      title: 'About Us | Vitrine Gallery',
      description: 'Learn more about our story and vision.',
      keywords: 'about, vitrine gallery, design',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/contact': {
      title: 'Contact | Vitrine Gallery',
      description: 'Reach out to us for any inquiries.',
      keywords: 'contact, address, vitrine',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/faq': {
      title: 'FAQ | Vitrine Gallery',
      description: 'Answers to frequent customer questions.',
      keywords: 'faq, questions, support',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
    '/search': {
      title: 'Search | Vitrine Gallery',
      description: 'Search product , product and blog.',
      keywords: 'search, product, product',
      ogLocale: 'en_US',
      htmlLang: 'en',
      ogImage: defaultImages.og,
    },
  },

  // ======================================================================
  // Arabic Metadata
  // ======================================================================
  ar: {
    '/': {
      title: 'Vitrine Gallery | الصفحة الرئيسية',
      description: 'منتجات فاخرة ومشاريع تصميم داخلي.',
      keywords: 'معرض, تصميم داخلي, منتجات فاخرة',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/products': {
      title: 'المنتجات | Vitrine Gallery',
      description: 'اكتشف مجموعتنا من المنتجات الفاخرة.',
      keywords: 'منتجات, تصميم, ديكور',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
        '/agents': {
      title: 'الوكلاء | Vitrine Gallery',
      description: 'اكتشف مجموعتنا من الوكلاء الفاخرة.',
      keywords: 'منتجات, تصميم, ديكور',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/project': {
      title: 'المشاريع | Vitrine Gallery',
      description: 'مشاريع التصميم الداخلي التي أنجزناها.',
      keywords: 'مشاريع, تصميم, هندسة معمارية',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/blog': {
      title: 'المدونة | Vitrine Gallery',
      description: 'مقالات ونصائح عن التصميم والديكور.',
      keywords: 'مدونة, تصميم, ديكور',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/brands': {
      title: 'العلامات التجارية | Vitrine Gallery',
      description: 'أبرز العلامات التجارية العالمية.',
      keywords: 'علامات تجارية, ماركات, تصميم',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/services': {
      title: 'الخدمات | Vitrine Gallery',
      description: 'خدمات التصميم الداخلي وتنفيذ المشاريع.',
      keywords: 'خدمات, تصميم, ديكور',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/gallery': {
      title: 'المعرض | Vitrine Gallery',
      description: 'تصفح صور المشاريع والمنتجات.',
      keywords: 'صور, معرض, منتجات',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/showroom': {
      title: 'المعرض الرئيسي | Vitrine Gallery',
      description: 'قم بزيارة معرضنا لرؤية المجموعات الفاخرة.',
      keywords: 'معرض, تصميم, ديكور',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/team': {
      title: 'فريقنا | Vitrine Gallery',
      description: 'تعرف على فريق العمل والمصممين.',
      keywords: 'فريق, مصممين, موظفين',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/partners': {
      title: 'الشركاء | Vitrine Gallery',
      description: 'شركاؤنا التجاريون والمصممون المعتمدون.',
      keywords: 'شركاء, تعاون, شركات',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/catalogue': {
      title: 'الكتالوج | Vitrine Gallery',
      description: 'تحميل كتالوج المنتجات.',
      keywords: 'كتالوج, تحميل, منتجات',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/careers': {
      title: 'الوظائف | Vitrine Gallery',
      description: 'انضم إلى فريق العمل لدينا.',
      keywords: 'وظائف, عمل, تصميم داخلي',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/about': {
      title: 'من نحن | Vitrine Gallery',
      description: 'معلومات عن معرض فيترين ورؤيتنا المستقبلية.',
      keywords: 'من نحن, معرض, أهداف',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/contact': {
      title: 'اتصل بنا | Vitrine Gallery',
      description: 'طرق التواصل مع معرض فيترين.',
      keywords: 'اتصال, تواصل, معرض',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
    '/faq': {
      title: 'الأسئلة الشائعة | Vitrine Gallery',
      description: 'إجابات على الأسئلة الأكثر شيوعاً.',
      keywords: 'أسئلة, إجابات, عملاء',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
       '/search': {
      title: ' البحث | Vitrine Gallery',
      description: 'إجابات على الأسئلة البحث شيوعاً.',
      keywords: 'أسئلة, إجابات, البحث',
      ogLocale: 'ar_AR',
      htmlLang: 'ar',
      ogImage: defaultImages.og,
    },
  },

};

// ======================================================================
// Dynamic Metadata
// ======================================================================

export const getRouteMetadata = (path: string): RouteMetaTags => {
  const langMatch = path.match(/^\/(fa|en|ar)(\/|$)/);
  const lang = (langMatch?.[1] ?? 'fa') as 'fa' | 'en' | 'ar';

  const cleanPath = path.replace(/^\/(fa|en|ar)/, '') || '/';
  const langMeta = metadataByLang[lang];

  if (langMeta?.[cleanPath]) {
    return langMeta[cleanPath];
  }

  // Router uses /Contact (capital C) but metadata key is /contact
  if (cleanPath === '/Contact') {
    return langMeta['/contact'];
  }

  const detailSuffix: Record<'fa' | 'en' | 'ar', string> = {
    fa: ' | جزئیات',
    en: ' | Details',
    ar: ' | التفاصيل',
  };

  if (cleanPath.startsWith('/products/')) {
    const base = langMeta['/products'];
    return {
      title: base.title + detailSuffix[lang],
      description: base.description,
      keywords: base.keywords,
      ogLocale: base.ogLocale,
      htmlLang: base.htmlLang,
      ogImage: defaultImages.og,
    };
  }

  if (cleanPath.startsWith('/products/category/')) {
    const base = langMeta['/products'];
    return {
      title: base.title + detailSuffix[lang],
      description: base.description,
      keywords: base.keywords,
      ogLocale: base.ogLocale,
      htmlLang: base.htmlLang,
      ogImage: defaultImages.og,
    };
  }

  if (cleanPath.startsWith('/project/')) {
    const base = langMeta['/project'];
    return {
      title: base.title + detailSuffix[lang],
      description: base.description,
      keywords: base.keywords,
      ogLocale: base.ogLocale,
      htmlLang: base.htmlLang,
      ogImage: defaultImages.og,
    };
  }

  if (cleanPath.startsWith('/brand-detail/')) {
    const base = langMeta['/brands'];
    return {
      title: base.title + detailSuffix[lang],
      description: base.description,
      keywords: base.keywords,
      ogLocale: base.ogLocale,
      htmlLang: base.htmlLang,
      ogImage: defaultImages.og,
    };
  }

  if (cleanPath.startsWith('/pages/')) {
    const pageName = cleanPath.split('/')[2]?.toLowerCase();
    const aliasMap: Record<string, string> = {
      gallery: '/gallery',
      showroom: '/showroom',
      team: '/team',
      partners: '/partners',
      careers: '/careers',
    };
    const aliasPath = pageName ? aliasMap[pageName] : undefined;
    if (aliasPath && langMeta[aliasPath]) {
      return langMeta[aliasPath];
    }
  }

  if (cleanPath.startsWith('/blog/')) {
    const base = langMeta['/blog'];
    const articleSuffix: Record<'fa' | 'en' | 'ar', string> = {
      fa: ' | مقاله',
      en: ' | Article',
      ar: ' | مقال',
    };
    return {
      title: base.title + articleSuffix[lang],
      description: base.description,
      keywords: base.keywords,
      ogLocale: base.ogLocale,
      htmlLang: base.htmlLang,
      ogImage: defaultImages.og,
    };
  }

  return langMeta['/'];
};
