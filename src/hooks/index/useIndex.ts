import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { IndexDataView } from "../../models/views/indexView";

const CACHE_PREFIX = "index_data_";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const useIndex = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getIndex() {
    const cacheKey = `${CACHE_PREFIX}${currentLang}`;

    let result = "";
    let success = false;
    let data: IndexDataView | null = null;

    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_TTL) {
        return {
          success: true,
          result: "",
          data: data as IndexDataView,
        };
      }
    }

    try {
      const res = await axiosAuthInstance.get<ServerResult<IndexDataView>>("");
      data = res.data.data;
      success = true;

      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        }),
      );
    } catch {
      result = "Failed to load index data";
    }

    return {
      success,
      result,
      data,
    };
  }

  return {
    getIndex,
  };
};

export default useIndex;
