import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type FaqView from "../../models/views/faqView";
import type faqView from "../../models/views/faqView";

const useFaq = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList() {
    let result = "";
    let success = false;
    let data: faqView[] = [];

    await axiosAuthInstance
      .get<ServerResult<FaqView[]>>("/faq")
      .then((res) => {
        success = true;
        data = res.data.data;
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
    getList,
  };
};

export default useFaq;
