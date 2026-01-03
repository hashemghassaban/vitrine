export interface NewsView {
  id: number;
  title: string;
  slug: string;
  content: string;
  category_id: number | null;
  comments_count: number;
  thumbnail: string | null;
}
