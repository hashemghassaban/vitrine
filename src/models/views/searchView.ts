
export interface SearchItemView {
  id: number;
  title: string;
  slug: string;
  content: string;
  type: "products" | "blog" | "news" | "pages";
  thumbnail: string;
  related_id: number;
  price: string;
  point: number;
}

