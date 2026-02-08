import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type BrandView from "../../models/views/brandView";

const CACHE_PREFIX = "brands_data_";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const useBrands = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList(perPage = 15) {
    let result = "";
    let success = false;
    let data: BrandView[] = [];
    let total = 0;
    const cacheKey = `${CACHE_PREFIX}${currentLang}`;

    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_TTL) {
        return {
          success: true,
          result: "",
          data: data as BrandView[],
        };
      }
    }

    try {
      const res = await axiosAuthInstance.get<ServerResult<BrandView[]>>(
        "/brands",
        { params: { per_page: perPage } },
      );

      success = true;
      data = res.data.data;
      total = res.data.meta?.pagination?.total ?? 0;
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        }),
      );
    } catch {
      result = "Operation failed";
    }

    return { success, result, data, total };
  }

  return { getList };
};

export default useBrands;
