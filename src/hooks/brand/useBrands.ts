import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type BrandView from "../../models/views/brandView";

const useBrands = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList(perPage = 15) {
    let result = "";
    let success = false;
    let data: BrandView[] = [];
    let total = 0;

    try {
      const res = await axiosAuthInstance.get<ServerResult<BrandView[]>>(
        "/brands",
        { params: { per_page: perPage } },
      );

      success = true;
      data = res.data.data;
      total = res.data.meta?.pagination?.total ?? 0;
    } catch {
      result = "Operation failed";
    }

    return { success, result, data, total };
  }

  return { getList };
};

export default useBrands;
