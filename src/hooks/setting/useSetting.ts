import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { SettingView } from "../../models/views/settingView";

const useSetting = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getSetting() {
    const isFa = currentLang === "fa";
    let success = false;
    let result = "";
    let data: SettingView | null = null;

    await axiosAuthInstance
      .get<ServerResult<SettingView>>("/setting")
      .then((res) => {
        if (res.data.success) {
          success = true;
          data = res.data.data;
        } else {
          result = res.data.message;
        }
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
    getSetting,
  };
};

export default useSetting;
