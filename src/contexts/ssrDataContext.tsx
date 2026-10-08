import { createContext, useContext, type ReactNode } from "react";

export interface SSRPageData {
  type: string;
  id?: string;
  data: unknown;
}

const SSRDataContext = createContext<SSRPageData | null>(null);

export function SSRDataProvider({
  value,
  children,
}: {
  value: SSRPageData | null;
  children: ReactNode;
}) {
  return <SSRDataContext.Provider value={value}>{children}</SSRDataContext.Provider>;
}

export function useSSRPageData<T>(type: string, id?: string): T | null {
  const value = useContext(SSRDataContext);
  if (!value || value.type !== type || (id != null && value.id !== id)) return null;
  return value.data as T;
}

