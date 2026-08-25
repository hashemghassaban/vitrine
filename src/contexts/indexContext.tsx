import { createContext, useContext } from "react";
import type { IndexDataView } from "../models/views/indexView";

interface IndexContextType {
  indexData: IndexDataView | null;
}

const IndexContext = createContext<IndexContextType>({
  indexData: null,
});


export const useIndexContext = () => useContext(IndexContext);


export const IndexProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: IndexContextType;
}) => {
  return (
    <IndexContext.Provider value={value}>
      {children}
    </IndexContext.Provider>
  );
};
