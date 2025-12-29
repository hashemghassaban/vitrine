import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { DocumentItem } from "../../models/views/catalogueView";

const useDocuments = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList() {
    const isFa = currentLang === "fa";
    let result = "";
    let success = false;
    let data: DocumentItem[] = [];

    await axiosAuthInstance
      .get<ServerResult<DocumentItem[]>>("/documents")
      .then((res) => {
        success = true;
        data = res.data.data;
      })
      .catch(() => {
        result = isFa ? "خطا در انجام عملیات" : "Operation failed";
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

export default useDocuments;
