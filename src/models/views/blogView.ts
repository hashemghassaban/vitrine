export interface BlogCategoryView {
  id: number;
  title: string;
  slug: string;
  image: string;
}

export interface BlogItemView {
  id: number;
  title: string;
  slug: string;
  content: string;
  category_id: number;
  comments_count: number;
  image: string;
  thumbnail: string;
  seo: BlogItemSEOView;
  published_at: string;
}

export interface BlogItemSEOView {
  meta_keywords: null;
  meta_description: string;
  nofollow: number;
  page_title: string;
}
