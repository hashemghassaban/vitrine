import useAxious from "../../helpers/axiosInstance";
import type { CAPTCHADTO } from "../../models/dtos/captchaDTO";
import type ServerResult from "../../models/ServerResult";

const useCaptcha = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getCaptcha() {
    let result = "";
    let success = false;
    let data: CAPTCHADTO | null = null;

    try {
      const res =
        await axiosAuthInstance.get<ServerResult<CAPTCHADTO>>(
          "captcha/api/math",
        );
      success = true;
      data = res.data.data;
    } catch {
      result = "Operation failed";
    }

    return { success, result, data };
  }

  return { getCaptcha };
};

export default useCaptcha;
