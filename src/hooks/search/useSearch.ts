
import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { SearchItemView } from "../../models/views/searchView";

const useSearch = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

async function search(query: string) {
  let success = false;
  let data: SearchItemView[] = [];

  const res = await axiosAuthInstance.get<ServerResult<any>>(
    `/search?s=${query}`
  );

  if (res.data?.data?.data) {
    success = true;
    data = res.data.data.data; 
  }

  return { success, data };
}

  return { search };
};

export default useSearch;
