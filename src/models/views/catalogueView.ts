export interface DocumentItem {
  id: number;
  title: string;
  name: string;
  link?: string;
  image?: string;
  created_at: string;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}