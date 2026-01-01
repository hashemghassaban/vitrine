import { Row, Col } from "antd";
import "antd/dist/reset.css";
import img from "../../assets/about/img.png";
import video from "../../assets/video-block/video-block.png";

import "./About.less";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import play from "../../assets/about/play.png";
import { useState } from "react";

export default function About() {
  const videos = [
    {
      thumb: video,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    },
    {
      thumb: video,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    },
  ];

  // حالت نمایش ویدیو
  const [showVideo1, setShowVideo1] = useState(false);
  const [showVideo2, setShowVideo2] = useState(false);

  return (
    <>
      <AppHeader noBackground title={"درباره ویترین"} />

      <div className="article-content">
        <Row justify="center" gutter={[32, 32]}>
           <Col xs={24} lg={12} className="article-col">
            <div className="article-div">
              <h2 className="article-title">
                عنوان مقاله اینجا قرار میگیرد و بصورت کامل
              </h2>
              <p className="article-text">
                {" "}
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.{" "}
              </p>{" "}
              <p className="article-text">
                {" "}
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.{" "}
              </p>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <img className="top-image-about" src={img} alt="img" />
          </Col>

         
        </Row>
      </div>

     <div className="center-video">
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} md={12} className="box-video">
          <div className="video-div" onClick={() => setShowVideo1(true)}>
            {!showVideo1 ? (
              <>
                <img src={videos[0].thumb} className="main-image" />
                <img src={play} className="overlay-image" />
              </>
            ) : (
              <iframe
                width="800"
                height="468"
                src={videos[0].url}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </Col>

        {/* ویدیو ۲ */}
        <Col xs={24} md={12} className="box-video2">
          <div className="video-div" onClick={() => setShowVideo2(true)}>
            {!showVideo2 ? (
              <>
                <img src={videos[1].thumb} className="main-image" />
                <img src={play} className="overlay-image" />
              </>
            ) : (
              <iframe
                width="800"
                height="468"
                src={videos[1].url}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </Col>
      </Row>
      </div>
    </>
  );
}
