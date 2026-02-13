import React from "react";
import { Spin } from "antd";
import { useLanguage } from "../../contexts/useLanguage";
import styled from "styled-components";

const SpinCustom = styled(Spin)`
  .ant-spin-text {
    margin: 10px;
  }
`;

interface LoadingSpinProps {
  loading?: boolean;
}

const LoadingSpin: React.FC<LoadingSpinProps> = ({ loading = true }) => {
  const { currentLang } = useLanguage();
  const loadingStr = {
    fa: "در حال بارگذاری داده‌ها...",
    en: "Loading data...",
    ar: "جاري تحميل البيانات...",
  };

  return (
    <SpinCustom
      spinning={loading}
      size="large"
      tip={loadingStr[currentLang]}
      fullscreen={true}
      style={{ zIndex: 10000 }}
    ></SpinCustom>
  );
};

export default LoadingSpin;
