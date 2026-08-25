import React from "react";
import "./FullPageOverlay.less";
import image8 from "../../../../assets/home/slideDesktop1.jpg";
import image7 from "../../../../assets/home/slideDesktop2.jpg";
import imageMobile1 from "../../../../assets/home/slideMobile1.jpg";
import imageMobile2 from "../../../../assets/home/slideMobile2.jpg";
import video from "../../../../assets/home/sliderVideo.mp4";
import PulseCircleButton from "./components/PulsingButton";
import { useTranslate } from "../../../../i18n/useTranslate";

export const FullPageOverlay: React.FC = () => {
  const { t } = useTranslate();
const isMobile = typeof window !== "undefined"
  ? window.innerWidth < 768
  : false

  const getImages = () => {
    return [
      {
        img: isMobile  ? image8 : imageMobile1,
        buttons: [{ id: 1, x: 52, y: 40 }],
        content: [
          {
            title: t("site.indexmidslide1"),
            description: t("site.indexmidslide2"),
            x: 10,
            y: 35,
          },
        ],
      },
      {
        img: isMobile  ? image7 : imageMobile2,
        buttons: [{ id: 1, x: 40, y: 35 }],
        content: [
          {
            title: t("site.indexmidslide3"),
            description: t("site.indexmidslide4"),
            x: 11,
            y: 35,
          },
        ],
      },
      ,
      {
        video: video,
        buttons: [
          { id: 1, x: 35, y: 35 },
          { id: 1, x: 65, y: 35 },
        ],
        content: [
          {
            title: t("site.indexmidslide5"),
            description: t("site.indexmidslide6"),
            x: 10,
            y: 35,
          },
        ],
      },
      ,
    ];
  };

  return (
    <div className="overlay-container">
      {getImages().map((item, index) => (
        <div key={index} className="overlay-section">
          {index !== 3 ? (
          <img src={item?.img} alt={item?.content[0].title} />

          ):(
          <video src={item?.video} controls={false}
  autoPlay
  muted
  loop
  playsInline
  webkit-playsinline="true"> </video>

          )}
          
          <div style={{ display: "inline-block" }}>
            {item?.content.map((subject) => (
              <div
                className={`content-overlay-container ${subject?.x === 10 ? "right" : "left"}`}
            
              >
                <h4
                  style={{
                    color: index == 0 ? isMobile  ?  "#fff" : "#000": "#fff",
                  }}
                >
                  {subject.title}
                </h4>
                <p
                  style={{
                    color: index == 0 ? isMobile  ?  "#fff" : "#000" : "#fff",
                  }}
                >
                  {subject.description}
                </p>
              </div>
            ))}
            {item?.buttons.map((btn, bIndex) => (
              <PulseCircleButton
                key={bIndex}
                style={{
                  position: "absolute",
                  left: `${btn.x}%`,
                  top: `${btn.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              ></PulseCircleButton>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
