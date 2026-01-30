import type BrandView from "./brandView";

export  interface ProductView {
  id: number;
  title: string;
  slug: string;
  code: string;
  thumbnail: string;
  image: string;
  seo: SEOView;
  category: CategoryView;
  brand: BrandView;
  collection: CollectionView;
  feature_values: FeatureValueView[];
}

export interface CategoryView {
  id: number;
  title: string;
  slug: string;
  image: string;
  icon: string;
  description: string;
  excerpt: string;
  seo: SEOView;
  parent_id: number;
  depth: number;
  state: string;
}

export interface SEOView {
  meta_keywords: string;
  meta_description: string;
  nofollow: string;
  page_title: string;
}

export interface CollectionView {
  id: number;
  title: string;
  main_image: string;
  secondary_image: string;
  brand_id: number;
  description: string;
  excerpt: string;
  meta_keywords: string;
  meta_description: string;
  page_title: string;
}

export interface FeatureValueView {
  id: number;
  feature_id: number;
  feature_title: string;
  value: string;
  order: number;
  state: number;
}

export interface MediaView {
  id?: number;
  url?: string;
  type?: string;
}
export interface ProductDetailView {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  price: string;
  code: string;
  call_us: boolean;
  category_path: string;
  comments_count: number;
  thumbnail: string;
  image: string;
  brochures: string[];

  seo: SEOView;
  media: MediaView[];

  category: CategoryView;
  brand: BrandView;
  collection: CollectionView;

  features: FeatureValueView[];
}
