import { useLanguage } from "../../contexts/useLanguage";
import useAxious from "../../helpers/axiosInstance";
import { useTranslate } from "../../i18n/useTranslate";
import type ServerResult from "../../models/ServerResult";

const useNewsletter = () => {
  const { currentLang } = useLanguage();
  const { axiosAuthInstance } = useAxious(currentLang);
  const { t } = useTranslate();

  async function sendEmail(email: string) {
    let result = "";
    let success = false;
    await axiosAuthInstance
      .post<ServerResult<boolean>>("/newsletter", { email })
      .then((res) => {
        if (res.data.success) {
          success = true;
          result = t("local_sentEmail");
        } else {
          result = res.data.message;
        }
      })
      .catch((ex) => {
        result = ex?.response?.data?.message;
        if (!result) result = "Operation failed";
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
