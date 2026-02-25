import React from "react";
import { useLanguage } from "../../contexts/useLanguage";
import styled, { keyframes } from "styled-components";
import videoRef from '../../assets/video-block/videoLoading.mov'

interface LoadingSpinProps {
  loading?: boolean;
}

/* انیمیشن پر شدن از پایین */
const fillUp = keyframes`
  0% { height: 0%; }
  100% { height: 100%; }
`;





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
  width: 150px;
  height: 150px;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const LoadingSpin: React.FC<LoadingSpinProps> = ({ loading = true }) => {

  return (
    <LoaderWrapper $loading={loading}>
        <LogoBox className="loadingBlock">


        <video
          controls={false}
          width="600"
          height="468"
          autoPlay
          muted
          loop
          style={{
            transform: 'scale(0.7) translate(4px, 2px)',
          }}
        >
          <source
            src={videoRef}
            type="video/mp4"
          />
        </video>
      </LogoBox>

    </LoaderWrapper>
  );
};

export default LoadingSpin;