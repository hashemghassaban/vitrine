import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { AimItemView } from "../../models/views/aimView";

const useAim = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList() {
    let success = false;
    let result = "";
    let data: AimItemView[] = [];

    await axiosAuthInstance
      .get<ServerResult<AimItemView[]>>("/aim")
      .then((res) => {
        if (res.data.success) {
          success = true;
          data = res.data.data ?? [];
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
    getList,
  };
};

export default useAim;
