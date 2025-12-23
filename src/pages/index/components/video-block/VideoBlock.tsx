import React, { useState } from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";
import vector from "../../../../assets/video-block/vector.png";
import useNavigation from "../../../../hooks/useHistory";
import "./VideoBlock.less";

export const VideoBlock: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { push } = useNavigation();

  return (
    <section id="VideoBlock" className="video-block">
      <Row gutter={[24, 24]} align="middle">
        {/* متن */}
        <Col xs={24} sm={24} lg={11} className="video-block__content fade-in">
          <div className="content-wrapper">
            <p className="video-block__title">معرفی ویدئو ویترین</p>

            <p className="video-block__desc">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
            </p>

            <p className="video-block__text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
            </p>

            <div className="Buttons">
              <AppButton className="video-block__Button"  onclick={() => push("/about")}>
                      آشنا شوید
              </AppButton>
              <AppButton className="shop__Button" >
                خرید کنید
              </AppButton>
            </div>
          </div>
        </Col>

        {/* تصویر / ویدئو */}
        <Col xs={24} sm={24} lg={13} className="video-col fade-in">
          <div className="video-wrapper">
            {!isPlaying ? (
              <div
                className="video-block__img-col"
              >
                <div className="box_icon" onClick={() => setIsPlaying(true)}>
                  <img src={vector} alt="play" />
                </div>
              </div>
            ) : (
              <div className="video-block__video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="YouTube video"
                
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </section>
  );
};
