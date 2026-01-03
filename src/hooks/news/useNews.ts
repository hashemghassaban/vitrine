import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { NewsView } from "../../models/views/newsView";

const useNews = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList(perPage = 15) {
    const isFa = currentLang === "fa";
    let result = "";
    let success = false;
    let data: NewsView[] = [];

    await axiosAuthInstance
      .get<ServerResult<NewsView[]>>(`/news?per_page=${perPage}`)
      .then((res) => {
        success = true;
        data = res.data.data;
      })
      .catch(() => {
        result = isFa ? "خطا در دریافت اخبار" : "Failed to load news";
      });

    return {
      success,
      result,
      data,
    };
  }

  return {
    getList,
  };
};

export default useNews;
