import React, { useState } from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";
import vector from "../../../../assets/video-block/vector.png";
import useNavigation from "../../../../hooks/useHistory";
import "./VideoBlock.less";
import { useLanguage } from "../../../../contexts/useLanguage";
import { useIndexContext } from "../../../../contexts/indexContext";

export const VideoBlock: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { indexData } = useIndexContext();
  const data = indexData?.sliders.find(
    (item) => item.slug == "home-second-section",
  );
  const headerBackground = {
    backgroundImage: `url(${data?.thumbnail
      })`,
  };
  return (
    <section id="VideoBlock" className="video-block">
      <Row gutter={[24, 24]} align="middle">
        {/* متن */}
        <Col xs={24} sm={24} lg={11} className="video-block__content fade-in">
          <div className="content-wrapper">
            <p className="video-block__title">{data?.title}  </p>

            <p className="video-block__desc" dangerouslySetInnerHTML={{
              __html: data?.description ?? "",
            }}  >

            </p>



            <div className="Buttons">
              <AppButton
                className="video-block__Button"
                onclick={() => push(`/${currentLang}/${data?.link} `)}
              >
                {data?.link_title}
              </AppButton>
              <AppButton
                onclick={() => push(`/${currentLang}/${data?.second_link} `)}
                className="shop__Button">{data?.second_title}</AppButton>
            </div>
          </div>
        </Col>

        {/* تصویر / ویدئو */}
        <Col xs={24} sm={24} lg={13} className="video-col fade-in">
          <div className="video-wrapper">
            {!isPlaying ? (
              <div className="video-block__img-col" style={headerBackground}>
                <div className="box_icon" onClick={() => setIsPlaying(true)}>
                  <img src={vector} alt="play" />
                </div>
              </div>
            ) : (
              <div className="video-block__video">
                <video controls width="100%"    height="100%" style={{
                
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                >
                  <source  src={data?.vide ?? undefined} type="video/mp4" />
                </video>ّ
               
              </div>
            )}
          </div>
        </Col>
      </Row>
    </section>
  );
};
