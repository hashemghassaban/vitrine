

export interface IndexDataView {
  settings: SiteSettingsView;
  sliders: SliderItemView[];
  blog_items: any[];
  product_categories: ProductCategoryView[];
  pages: PageItemView[];
  brands: BrandItemView[];
  links: MenuLinkView[];
  categories: SimpleCategoryView[];
}

export interface BrandItemView {
  title: string;
  image: string;
  id: number;
}

export interface SimpleCategoryView {
  id: number;
  title: string;
  slug: string;
  image: string;
  icon: string;
}

export interface MenuLinkView {
  id: number;
  title: string;
  type: string;
  url: string;
}

export interface PageItemView {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: null | string;
  thumbnail: null | string;
  keywords: null | string;
  description: null | string;
  page_title: null | string;
  nofollow: number;
  page_name: null | string;
  excerpt: string;
}

export interface ProductCategoryView {
  id: number;
  title: string;
  slug: string;
  image_link: string;
  icon_link: string;
  meta_keywords: null | string;
  meta_description: null | string;
  page_title: null | string;
  nofollow: number;
  children: ProductCategoryView[];
}

export interface SiteSettingsView {
  site_title: string;
  site_keywords: string;
  site_description: string;
  logo: string;
  secondary_logo: string;
  bright_logo: string;
  bright_secondary_logo: string;
  favicon: string;
  abstract_about: string;
  video_url: string;
  city: string;
  address: string;
  postalCode: string;
  email: string;
  tel: string;
  tel2: string;
  tel3: string;
  google_map_address: string;
  facebook_url: string;
  telegram_url: string;
  instagram_url: string;
  twitter_url: string;
  whatsapp_url: string;
  linkedin_url: string;
  youtube_url: string;
  aparat_url: string;
}

export interface SliderItemView {
  [x: string]: any;
  id: number;
  title: string;
  subtitle: null | string;
  link: string;
  link_title: null | string;
  second_title: null | string;
  second_link: null | string;
  third_title: null | string;
  third_link: null | string;
  content: null | string;
  image: null | string;
  thumbnail: null | string;
  responsive_image: null | string;
  video: null | string;
  description: null | string;
  slug: null | string;
  published_at: Date;
}
