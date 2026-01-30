import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type TranslationView from "../../models/views/translationView";

const CACHE_PREFIX = "translation_data_";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const useTranslations = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getTranslations() {
    let success = false;
    let result = "";
    let data: TranslationView[] | null = null;

    const cachedData = localStorage.getItem(CACHE_PREFIX);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_TTL) {
        return {
          success: true,
          result: "",
          data: data as TranslationView[],
        };
      }
    }

    await axiosAuthInstance
      .get<ServerResult<TranslationView[]>>("/translations")
      .then((res) => {
        if (res.data.success) {
          success = true;
          data = res.data.data;
          localStorage.setItem(
            CACHE_PREFIX,
            JSON.stringify({
              data,
              timestamp: Date.now(),
            }),
          );
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
    getTranslations,
  };
};

export default useTranslations;
