import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type {
  ProjectCategoryView,
  ProjectItemView,
} from "../../models/views/projectView";

const useProjects = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);
  const isFa = currentLang === "fa";
  async function getList(perPage: number = 12) {
    let result = "";
    let success = false;
    let data: ProjectItemView[] = [];

    await axiosAuthInstance
      .get<ServerResult<ProjectItemView[]>>(
        "/projects",
        perPage
          ? {
              params: {
                per_page: perPage,
              },
            }
          : {}
      )
      .then((res) => {
        success = true;
        data = res.data.data;
      })
      .catch(() => {
        result = isFa ? "خطا در دریافت پروژه‌ها" : "Failed to load projects";
      });

    return {
      success,
      result,
      data,
    };
  }

  async function getCategories() {
    let success = false;
    let data: ProjectCategoryView[] = [];
    let result = "";

    try {
      const res = await axiosAuthInstance.get("projects/categories");
      success = true;
      data = res.data.data;
    } catch {
      result = isFa
        ? "خطا در دریافت دسته‌بندی‌ها"
        : "Failed to load categories";
    }

    return { success, data, result };
  }

  return {
    getList,
    getCategories,
  };
};

export default useProjects;
