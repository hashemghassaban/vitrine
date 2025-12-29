import { useLanguage } from "../../contexts/useLanguage";
import useAxious from "../../helpers/axiosInstance";
import type ContractBranchDTO from "../../models/dtos/contractBranchDTO";
import type ServerResult from "../../models/ServerResult";

const useContactBranch = () => {
  const { axiosAuthInstance } = useAxious();
  const { currentLang } = useLanguage();
  const isFa = currentLang === "fa";

  async function submitContractForm(dto: ContractBranchDTO) {
    let result = "";
    let success = false;
    await axiosAuthInstance
      .post<ServerResult<ContractBranchDTO>>("/contacts", dto)
      .then((res) => {
        if (res.data.success) {
          success = true;
          result = isFa
            ? "پیام شما با موفقیت ارسال شد."
            : "Your message was sent successfully.";
        } else {
          result = res.data.message;
        }
      })
      .catch(() => {
        result = isFa ? "خطا در انجام عمیات" : "Operation failed";
      });
    return {
      success,
      result,
    };
  }

  return {
    submitContractForm,
  };
};

export default useContactBranch;
