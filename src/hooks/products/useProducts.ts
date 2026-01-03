import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type ProductView from "../../models/views/productView";

const useProducts = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  const isFa = currentLang === "fa";

  async function getList(perPage = 20) {
    let success = false;
    let data: ProductView[] = [];
    let total = 0;
    let result = "";

    try {
      const res = await axiosAuthInstance.get<ServerResult<ProductView[]>>(
        "/products",
        {
          params: {
            per_page: perPage,
          },
        }
      );

      success = true;
      data = res.data.data;
      total = res.data.meta?.pagination?.total ?? 0;
    } catch {
      result = isFa ? "خطا در انجام عملیات" : "Operation failed";
    }

    return { success, data, total, result };
  }

  function filterByBrand(products: ProductView[], brandId: number) {
    return products.filter((item) => item.brand?.id === brandId);
  }

  return {
    getList,
    filterByBrand,
  };
};

export default useProducts;
