import useAxious from "../../helpers/axiosInstance";
import { useTranslate } from "../../i18n/useTranslate";
import type { orderProductDTO } from "../../models/dtos/orderProductDTO";
import type { CommentDTO } from "../../models/dtos/commentDTO";
import type ServerResult from "../../models/ServerResult";
import type {
  ProductView,
  ProductDetailView,
} from "../../models/views/productView";

const useProducts = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);
  const { t } = useTranslate();

async function getListProducts(
  perPage: number = 15,
  categoryId?: number,
  brands?: number[],
  collections?: number[],
  features?: number[]
) {
  try {
    const res = await axiosAuthInstance.get<ServerResult<ProductView[]>>(
      "/products",
      {
        params: {
          per_page: perPage,
          category_id: categoryId,
          brand_ids: brands,
          collection_ids: collections,
          feature_values: features,
        },
        paramsSerializer: (params) => {
          const query: string[] = [];

          Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (Array.isArray(value)) {
              value.forEach((v) => {
                query.push(`${key}[]=${encodeURIComponent(v)}`);
              });
            } else {
              query.push(`${key}=${encodeURIComponent(value)}`);
            }
          });

          return query.join("&");
        },
      }
    );

    if (res.data.success) {
      const { data, meta } = res.data;

      return {
        success: true,
        result: "",
        data,
        total: meta?.pagination?.total ?? 0,
      };
    }

    return {
      success: false,
      result: res.data.message ?? "Unknown error",
      data: [],
      total: 0,
    };
  } catch (error: any) {
    return {
      success: false,
      result: error?.response?.data?.message || "Failed to fetch products",
      data: [],
      total: 0,
    };
  }
}






  async function getProductById(id: number) {
    let success = false;
    let data: ProductDetailView | null = null;
    let result = "";

    try {
      const res = await axiosAuthInstance.get<ServerResult<ProductDetailView>>(
        `/products/${id}`,
      );

      success = true;
      data = res.data.data;
    } catch {
      result = "Failed to load blog post";
    }
    return {
      success,
      result,
      data,
    };
  }

  async function sendCommentProductById(id: number, dto: CommentDTO) {
    let result = "";
    let success = false;
    await axiosAuthInstance
      .post<ServerResult<CommentDTO>>(`/comments/product/${id}`, dto)
      .then((res) => {
        if (res.data.success) {
          success = true;
          result = t("local_sentComment");
        } else {
          result = res.data.message;
        }
      })
      .catch((err: any) => {
        result = err.response?.data?.message || "Operation failed";
      });
    return {
      success,
      result,
    };
  }

  async function sendOrderProduct(dto: orderProductDTO) {
    let result = "";
    let success = false;
    await axiosAuthInstance
      .post<ServerResult<CommentDTO>>(`/orders`, dto)
      .then((res) => {
        if (res.data.success) {
          success = true;
          result = t("local_sentComment");
        } else {
          result = res.data.message;
        }
      })
      .catch((err: any) => {
        result = err.response?.data?.message || "Operation failed";
      });
    return {
      success,
      result,
    };
  }
  return {
    getListProducts,
    getProductById,
    sendCommentProductById,
    sendOrderProduct,
  };
};

export default useProducts;
