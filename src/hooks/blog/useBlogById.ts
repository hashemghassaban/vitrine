import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { BlogItemView } from "../../models/views/blogView";

const useBlogById = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getById(id: number) {
    let success = false;
    let data: BlogItemView | null = null;
    let result = "";
    try {
      const res = await axiosAuthInstance.get<ServerResult<BlogItemView>>(
        `/blog/${id}`,
      );
      success = true;
      data = res.data.data;
    } catch {
      result = "Operation failed";
    }

    return { success, data, result };
  }

  return { getById };
};

export default useBlogById;
