import useAxious from "../../helpers/axiosInstance";
import type DepartmentView from "../../models/views/departmentView";
import type ServerResult from "../../models/ServerResult";

const useDepartment = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);

  async function getList() {
    let result = "";
    let success = false;
    let data: DepartmentView[] = [];
    await axiosAuthInstance
      .get<ServerResult<DepartmentView[]>>("/department")
      .then((res) => {
        if (res.data.success) {
          success = true;
          data = res.data.data || [];
        } else {
          result = res.data.message;
        }
      })
      .catch(() => {
        result = "Operation failed";
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

export default useDepartment;
