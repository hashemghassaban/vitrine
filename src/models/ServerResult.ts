export default interface ServerResult<T> {
  success: boolean;
  message: string;
  data: T;
  meta: Meta;
}

export interface Meta {
  locale: string;
  available_locales: string[];
}
