import type BrandView from "./brandView";

export default interface ProductView {
  id: number;
  title: string;
  slug: string;
  code: string;
  thumbnail: string;
  image: string;
  seo: SEO;
  category: Category;
  brand: BrandView;
  collection: Collection;
  feature_values: FeatureValue[];
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  image: string;
  icon: string;
  description: string;
  excerpt: string;
  seo: SEO;
  parent_id: number;
  depth: number;
  state: string;
}

export interface SEO {
  meta_keywords: string;
  meta_description: string;
  nofollow: string;
  page_title: string;
}

export interface Collection {
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

export interface FeatureValue {
  id: number;
  feature_id: number;
  feature_title: string;
  value: string;
  order: number;
  state: number;
}
