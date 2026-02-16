export interface BlogCategoryView {
  id: number;
  title: string;
  slug: string;
  image: string;
}

export interface BlogItemView {
  id: string;
  title: string;
  slug: string;
  content: string;
  category_id: number;
  comments_count: number;
  image: string;
  thumbnail: string;
  seo: BlogItemSEOView;
  published_at: string;
  rate: number;
  comments: BlogCommentView[];
}

export interface BlogItemSEOView {
  meta_keywords: null;
  meta_description: string;
  nofollow: number;
  page_title: string;
}

export interface BlogCommentView {
  id: number;
  content: string;
  user_name: string;
  user_email: string;
  user_website: string;
  rate: string;
  parent_id: string;
  status: string;
  created_at: string;
  is_admin: boolean;
}
