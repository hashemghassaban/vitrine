# SSR Implementation Guide

## Overview
پروژه Vitrine Gallery اکنون با Server-Side Rendering (SSR) پیکربندی شده است.

## ویژگی‌های SSR

✅ **Meta Tags SEO**
- Title و Description خودکار برای هر صفحه
- Open Graph tags برای social sharing
- Twitter Card meta tags

✅ **Server-Side Data Fetching**
- دریافت داده‌ها قبل از render
- بهتری SEO و اولین بار بارگذاری

✅ **Hydration**
- React hydration برای تعامل client-side
- بدون دوباره render کردن

## دستورات اجرا

### Development
```bash
npm run dev
# Server بر روی http://localhost:5173
```

### Production Build
```bash
npm run build:ssr
# یا
npm run build && npm run build:server
```

### اجرای Production
```bash
npm run start
```

## ساختار فایل‌ها

```
src/
├── entry-server.tsx          # Server entry point
├── entry-client.tsx          # Client entry point (hydration)
├── utils/
│   └── metaTags.ts          # Meta tags management
├── config/
│   └── routeMetadata.ts     # Route-specific metadata
├── hooks/
│   ├── useSSR.ts            # SSR data fetching
│   ├── usePageMetadata.ts   # Page metadata hook
│
server/
├── dev.mjs                  # Dev server
└── middleware.ts            # Production server
```

## استفاده در صفحات

### 1. تنظیم Page Metadata

```tsx
import usePageMetadata from '../hooks/usePageMetadata';

export default function MyPage() {
  usePageMetadata({
    title: 'عنوان صفحه',
    description: 'توضیح صفحه',
    keywords: 'کلمات کلیدی',
  });

  return <div>محتوای صفحه</div>;
}
```

### 2. Server-Side Data Fetching

```tsx
import { useSSRData } from '../hooks/useSSR';
import { getProducts } from '../api/products';

export default function Products() {
  const [products, loading, error] = useSSRData(() => getProducts());

  if (loading) return <LoadingSpin />;
  if (error) return <div>Error loading</div>;

  return (
    <div>
      {products?.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

## آپدیت Route Metadata

برای افزودن metadata برای route جدید:

```typescript
// src/config/routeMetadata.ts
export const routeMetadata: Record<string, MetaTags> = {
  '/new-page': {
    title: 'عنوان صفحه جدید',
    description: 'توضیح صفحه',
    keywords: 'کلمات کلیدی',
  },
  // ...
};
```

## Performance Tips

1. **Data Prefetching**: فقط برای داده‌های ضروری استفاده کنید
2. **Caching**: از response caching در server استفاده کنید
3. **Code Splitting**: برای route‌های سنگین از lazy loading استفاده کنید

## Troubleshooting

### خطای hydration mismatch
- اطمینان حاصل کنید که همین JSX در server و client render شود
- از random ID‌ها یا dates استفاده نکنید در initial render

### Server-side errors
- بررسی console برای error details
- از try-catch برای API calls استفاده کنید

### Meta tags نمی‌روند
- اطمینان حاصل کنید که `usePageMetadata` فراخوانی شده
- برای client-side navigation، meta tags خودکار update می‌شوند
