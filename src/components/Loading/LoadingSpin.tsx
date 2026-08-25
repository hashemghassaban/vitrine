import React from "react";
import styled from "styled-components";
import { useLottie } from "lottie-react";
import animationData from "./VI.json";

interface LoadingSpinProps {
  loading?: boolean;
}

const LoaderWrapper = styled.div<{ $loading: boolean }>`
  position: fixed;
  inset: 0;
  background: #111111c9;
  display: ${({ $loading }) => ($loading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const LogoBox = styled.div`
  width: 140px;
  height: 140px;
`;

const LoadingSpin: React.FC<LoadingSpinProps> = ({ loading = true }) => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <LoaderWrapper $loading={loading}>
      <LogoBox>{View}</LogoBox>
    </LoaderWrapper>
  );
};

export default LoadingSpin;
