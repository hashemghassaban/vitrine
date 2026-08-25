import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { FeatureView } from "../../models/views/productFeaturesView";

const useProductFeatures = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getProductFeatures(categoryId?: number) {
    let success = false;
    let data: FeatureView[] = [];
    let result = "";

    try {
      const config = categoryId
        ? {
            params: {
              category_id: categoryId,
            },
          }
        : undefined;

      const res = await axiosAuthInstance.get<ServerResult<FeatureView[]>>(
        "/product-features",
        config
      );

      success = true;
      data = res.data.data;
    } catch {
      result = "Failed to load product features";
    }

    return {
      success,
      result,
      data,
    };
  }

  return {
    getProductFeatures,
  };
};

export default useProductFeatures;
