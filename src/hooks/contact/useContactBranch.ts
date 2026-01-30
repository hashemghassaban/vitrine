import { useLanguage } from "../../contexts/useLanguage";
import useAxious from "../../helpers/axiosInstance";
import { useTranslate } from "../../i18n/useTranslate";
import type ContractBranchDTO from "../../models/dtos/contractBranchDTO";
import type ServerResult from "../../models/ServerResult";

const useContactBranch = () => {
  const { currentLang } = useLanguage();
  const { axiosAuthInstance } = useAxious(currentLang);
  const { t } = useTranslate();

  async function submitContractForm(dto: ContractBranchDTO) {
    let result = "";
    let success = false;
    await axiosAuthInstance
      .post<ServerResult<ContractBranchDTO>>("/contacts", dto)
      .then((res) => {
        if (res.data.success) {
          success = true;
          result = t("local_sentMessage");
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
    };
  }

  return {
    submitContractForm,
  };
};

export default useContactBranch;
