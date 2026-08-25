import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type DynamicPage from "../../models/views/dynamicPageView";

const useDynamicPage = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList(pageName: string) {
    let success = false;
    let data: DynamicPage | null = null;
    let result = "";
    try {
      const res = await axiosAuthInstance.get<ServerResult<DynamicPage>>(
        `/page/${pageName}`,
      );
      success = true;
      data = res.data.data;
    } catch {
      result = "Operation failed";
    }

    return { success, data, result };
  }

  return { getList };
};

export default useDynamicPage;
