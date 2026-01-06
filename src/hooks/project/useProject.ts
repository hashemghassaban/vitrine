import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { ProjectItemView } from "../../models/views/projectView";

const useProjects = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);
  
  async function getList(perPage: number = 12) {
    const isFa = currentLang === "fa";
    let result = "";
    let success = false;
    let data: ProjectItemView[] = [];

    await axiosAuthInstance
      .get<ServerResult<ProjectItemView[]>>("/projects", {
        params: {
          per_page: perPage,
        },
      }) 
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

  return {
    getList,
  };
};

export default useProjects;
