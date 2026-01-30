import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { PageView } from "../../models/views/pageView";

const useServicePage = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getService() {
    let result = "";
    let success = false;
    let data: PageView | null = null;
    const slug = currentLang === "fa" ? "خدمات" : "خدمات";
    await axiosAuthInstance
      .get<ServerResult<PageView>>(`/page/${slug}`)
      .then((res) => {
        if (res.data.success) {
          success = true;
          data = res.data.data;
        } else {
          result = res.data.message;
        }
      })
      .catch(() => {
        result = "Operation failed";
      });

    return {
      success,
      result,
      data,
    };
  }

  return {
    getService,
  };
};

export default useServicePage;
