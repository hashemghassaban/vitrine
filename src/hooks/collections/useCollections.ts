import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { CollectionView } from "../../models/views/productView";

const useCollections = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getCollection() {
    let success = false;
    let data: CollectionView[] = [];
    let result = "";

    try {
      const res =
        await axiosAuthInstance.get<ServerResult<CollectionView[]>>(
          `/collections`,
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

  return {
    getCollection,
  };
};

export default useCollections;
