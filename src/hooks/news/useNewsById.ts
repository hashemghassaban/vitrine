import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { NewsView } from "../../models/views/newsView";

const useNewsById = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);
  const isFa = currentLang === "fa";

  async function getById(id: number) {
    let success = false;
    let data: NewsView | null = null;
    let result = "";
    try {
      const res = await axiosAuthInstance.get<ServerResult<NewsView>>(
        `/news/${id}`
      );
      success = true;
      data = res.data.data;
    } catch {
      result = isFa ? "خطا در انجام عملیات" : "Operation failed";
    }

    return { success, data, result };
  }

  return { getById };
};

export default useNewsById;
