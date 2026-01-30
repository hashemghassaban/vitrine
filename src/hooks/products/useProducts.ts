import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { ProductView, ProductDetailView,  } from "../../models/views/productView";

const useProducts = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);
  const isFa = currentLang === "fa";
  async function getListProducts(perPage = 15) {
    let success = false;
    let result = "";
    let data: ProductView[] = [];
    let total = 0;
    await axiosAuthInstance
      .get<ServerResult<ProductView[]>>(`/products?per_page=${perPage}`)
      .then((res) => {
        if (res.data.success) {
          success = true;
          data = res.data.data;
          total = res.data.meta.pagination.total;
        } else {
          result = res.data.message ?? "";
        }
      })
      .catch(() => {
        result =
          currentLang === "fa"
            ? "خطا در دریافت محصولات"
            : "Failed to fetch products";
      });

    return {
      success,
      result,
      data,
      total,
    };
  }
  async function getProductById(id: number) {
    let success = false;
    let data: ProductDetailView | null = null;
    let result = "";

    try {
      const res = await axiosAuthInstance.get<ServerResult<ProductDetailView>>(
        `/products/${id}`
      );

      success = true;
      data = res.data.data;
    } catch {
      result = isFa ? "خطا در دریافت مقاله" : "Failed to load blog post";
    }
      return {
      success,
      result,
      data,
    };
  }

    
  return {
    getListProducts,
    getProductById,

  };
};

export default useProducts;