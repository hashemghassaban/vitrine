import type BrandView from "./brandView";

export interface ProductView {
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
  id: number;
  name: string;
  path: string;
  disk: string;
  url: string;
  mime_type: string;
  mediable_type: string;
  mediable_id: number;
  title: string | null;
  description: string | null;
  user_id: number;
  state: string;
  created_by: number;
  updated_by: number;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
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
  comments: ProductCommentView[];
  rate: number;
  thumbnail: string;
  image: string;
  brochures: BrochoresView[];

  seo: SEOView;
  media: MediaView[];

  category: CategoryView;
  brand: BrandView;
  collection: CollectionView;

  features: FeatureValueView[];
}

export interface BrochoresView {
  link: string;
  name: string;
  type: string;
}

export interface ProductCommentView {
  id: number;
  content: string;
  user_name: string;
  user_email: string;
  user_website: string;
  rate: string;
  parent_id: string;
  status: string;
  created_at: string;
}
