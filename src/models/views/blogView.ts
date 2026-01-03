export interface BlogItemView {
  id: number;
  title: string;
  slug: string;
  content?: string | null;
  thumbnail?: string | null;
  category_id?: number | null;
  comments_count: number;
}
export interface BlogCategoryView {
  category_id: number;
  title: string;
  slug: string;
  image: string;
}
