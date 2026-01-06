import { useLanguage } from "../../contexts/useLanguage";
import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";

const useNewsletter = () => {
  const { currentLang } = useLanguage();
  const { axiosAuthInstance } = useAxious(currentLang);
  const isFa = currentLang === "fa";

  async function sendEmail(email: string) {
    let result = "";
    let success = false;
    await axiosAuthInstance
      .post<ServerResult<boolean>>("/newsletter", { email })
      .then((res) => {
        if (res.data.success) {
          success = true;
          result = isFa
            ? "ایمیل شما با موفقیت ارسال شد."
            : "Your email was sent successfully.";
        } else {
          result = res.data.message;
        }
      })
      .catch((ex) => {
        result = ex?.response?.data?.message;
        if (!result) result = isFa ? "خطا در انجام عمیات" : "Operation failed";
      });
    return {
      success,
      result,
    };
  }

  return {
    sendEmail,
  };
};

export default useNewsletter;
