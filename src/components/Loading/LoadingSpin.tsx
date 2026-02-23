import React from "react";
import { useLanguage } from "../../contexts/useLanguage";
import styled, { keyframes } from "styled-components";

interface LoadingSpinProps {
  loading?: boolean;
}

/* انیمیشن پر شدن از پایین */
const fillUp = keyframes`
  0% { height: 0%; }
  100% { height: 100%; }
`;

/* فول اسکرین */
const LoaderWrapper = styled.div<{ $loading: boolean }>`
  position: fixed;
  inset: 0;
  background: #111111c9;
  display: ${({ $loading }) => ($loading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

/* مربع اصلی */
const LogoBox = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

/* لایه پر شونده */
const FillLayer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #777; /* رنگ طوسی */
  animation: ${fillUp} 2.5s ease-in-out infinite alternate;
  z-index: 1;
`;

/* متن */
const LogoText = styled.div`
  position: relative;
  color: #fff;
  font-size: 20px;
  font-family: sans-serif;
  z-index: 2;
  direction:ltr;
  font-style:italic;
`;

const LoadingSpin: React.FC<LoadingSpinProps> = ({ loading = true }) => {

  return (
    <LoaderWrapper $loading={loading}>
      <LogoBox>
        <FillLayer />
        <LogoText>vitrine.</LogoText>
      </LogoBox>
    </LoaderWrapper>
  );
};

export default LoadingSpin;