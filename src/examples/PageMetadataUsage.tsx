import usePageMetadata from '../hooks/usePageMetadata';

/**
 * مثال استفاده از SSR و Meta Tags
 * 
 * برای هر صفحه جدید:
 * 1. import usePageMetadata
 * 2. فراخوانی usePageMetadata با metadata مورد نظر
 */

export const PageMetadataExample = () => {
  // استفاده ساده - metadata پیش‌فرض route
  usePageMetadata();

  return <div>محتوا</div>;
};

export const PageMetadataCustomExample = () => {
  // استفاده با metadata سفارشی
  usePageMetadata({
    title: 'صفحه سفارشی - Vitrine Gallery',
    description: 'توضیح کامل صفحه برای SEO',
    keywords: 'کلمات کلیدی مرتبط',
    ogImage: 'https://example.com/image.jpg',
  });

  return <div>محتوا</div>;
};

/**
 * استفاده برای صفحات پویا (مثل product details)
 */
export const ProductDetailExample = () => {
  // داده محصول را از API بگیرید
  const productData = {
    title: 'نام محصول',
    description: 'توضیح محصول',
    image: 'https://example.com/product.jpg',
  };

  usePageMetadata({
    title: `${productData.title} - Vitrine Gallery`,
    description: productData.description,
    ogImage: productData.image,
  });

  return (
    <div>
      <h1>{productData.title}</h1>
      <p>{productData.description}</p>
    </div>
  );
};
