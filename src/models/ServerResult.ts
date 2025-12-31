export default interface ServerResult<T> {
  success: boolean;
  message: string;
  data: T;
  meta: Meta;
}

export interface Meta {
  locale: string;
  available_locales: string[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: string;
  current_page: number;
  total_pages: number;
}
