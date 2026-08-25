# SSR Implementation Checklist

## ✅ موارد انجام شده

- [x] Vite SSR config تنظیم شده
- [x] Entry points ایجاد شده (server + client)
- [x] Meta Tags Manager پیاده شده
- [x] Route Metadata config تنظیم شده
- [x] usePageMetadata hook ایجاد شده
- [x] useSSR hook برای data fetching
- [x] Dev server با SSR
- [x] Production server middleware
- [x] package.json آپدیت شده
- [x] Documentation نوشته شده

## 📝 مراحل مانده برای پروژه

### مرحله 1: نصب Dependencies
```bash
npm install express
```

### مرحله 2: آپدیت Index Page
افزودن `usePageMetadata` به صفحه Index:

```tsx
import usePageMetadata from '../hooks/usePageMetadata';

export default function Index() {
  usePageMetadata({
    title: 'صفحه خانه - Vitrine Gallery',
    description: 'معرض فن و تصمیم فاخر',
  });
  
  // ... بقیه کد
}
```

### مرحله 3: آپدیت تمام صفحات
هر صفحه برای اضافه کنید:
```tsx
import usePageMetadata from '../hooks/usePageMetadata';
usePageMetadata({ /* metadata */ });
```

**صفحات اولویت:**
- [ ] Index
- [ ] Blog / Blog Detail
- [ ] Products / Product Detail
- [ ] About
- [ ] Projects / Project Detail
- [ ] Services
- [ ] Brands
- [ ] Contact

### مرحله 4: تست کردن

**Development:**
```bash
npm run dev
```
بررسی کنید که صفحات درست render می‌شوند و meta tags در HTML هستند.

**Build & Run:**
```bash
npm run build:ssr
npm run start
```
تست production mode.

### مرحله 5: SEO Verification
- [ ] Google Search Console
- [ ] Open Graph tags (Facebook Sharing Debugger)
- [ ] Twitter Card Validator
- [ ] Schema.org structured data (optional)

## 🔍 بررسی Meta Tags

برای بررسی meta tags در developer tools:
1. مرورگر باز کنید
2. Developer Tools > Elements/Inspector
3. `<head>` را باز کنید
4. `<meta>` tags را چک کنید

## 🚀 Deployment

برای production deployment:

1. **Build کردن:**
```bash
npm run build:ssr
```

2. **اجرا:**
```bash
npm run start
```

یا با process manager مثل PM2:
```bash
pm2 start "npm run start" --name vitrine
```

## 📊 Performance Considerations

- Server rendering افزایش دهنده تر است، فقط برای ضروریات استفاده کنید
- Database queries را minimize کنید
- Client hydration باید سریع باشد
- از CDN برای static assets استفاده کنید

## 🐛 Common Issues & Solutions

### Hydration Mismatch
**Problem:** "Hydration mismatch" error
**Solution:** اطمینان حاصل کنید JSX server و client یکی است

### Meta Tags Not Showing
**Problem:** Meta tags در HTML نیستند
**Solution:** `usePageMetadata()` در component فراخوانی شد؟

### 404 Pages
**Problem:** Static routes 404 می‌دهند
**Solution:** تمام routes در `routeMetadata.ts` تعریف شده؟

## 📞 Support

برای سوالات یا مشکلات:
1. SSR_GUIDE.md مراجعه کنید
2. Examples در `src/examples/` ببینید
3. Routes metadata در `src/config/routeMetadata.ts` آپدیت کنید
