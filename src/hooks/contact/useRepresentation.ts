import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type representationView from "../../models/views/representationView";

const useRepresentation = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList() {
    let result = "";
    let success = false;
    let data: representationView[] = [];

    await axiosAuthInstance
      .get<ServerResult<representationView[]>>("/representatives")
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

export default useRepresentation;
