

export default interface DynamicPage {
  id: number;
  title: string;
  logo: string;
  image: string;
  description: string;
  excerpt: string;
  meta_keywords: string;
  meta_description: string;
  page_title: string;
  nofollow: number;
  collections: Collection[];
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