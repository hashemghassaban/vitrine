import useAxious from "../../helpers/axiosInstance";
import type ServerResult from "../../models/ServerResult";
import type { ProjectDetailView } from "../../models/views/projectView" ;

const useProjectDetail = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getById(id: number) {
    const isFa = currentLang === "fa";
    let success = false;
    let result = "";
    let data: ProjectDetailView | null = null;

    await axiosAuthInstance
      .get<ServerResult<ProjectDetailView>>(`/projects/${id}`)
      .then((res) => {
        success = true;
        data = res.data.data;
      })
      .catch(() => {
        result = isFa ? "خطا در دریافت پروژه" : "Failed to load project";
      });

    return { success, result, data };
  }

  return { getById };
};

export default useProjectDetail;
