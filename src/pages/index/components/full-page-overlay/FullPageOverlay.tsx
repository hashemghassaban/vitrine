import React from "react";
import "./FullPageOverlay.less";
import image8 from "../../../../assets/full-page-overlay/image8.jpg";
import image7 from "../../../../assets/full-page-overlay/image7.jpg";
import image9 from "../../../../assets/full-page-overlay/image9.jpg";
import PulseCircleButton from "./components/PulsingButton";
import { useTranslate } from "../../../../i18n/useTranslate";

export const FullPageOverlay: React.FC = () => {
  const { t } = useTranslate();

  const getImages = () => {
    return [
      {
        img: image8,
        buttons: [{ id: 1, x: 52, y: 40 }],
        content: [
          {
            title: t("site.indexmidslide1"),
            description: t("site.indexmidslide2"),
            x: 8,
            y: 35,
          },
        ],
      },
      {
        img: image7,
        buttons: [{ id: 1, x: 40, y: 35 }],
        content: [
          {
            title: t("site.indexmidslide3"),
            description: t("site.indexmidslide4"),
            x: 70,
            y: 35,
          },
        ],
      },
      ,
      {
        img: image9,
        buttons: [
          { id: 1, x: 35, y: 35 },
          { id: 1, x: 65, y: 35 },
        ],
        content: [
          {
            title: t("site.indexmidslide5"),
            description: t("site.indexmidslide6"),
            x: 8,
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
          <img src={item?.img} alt={`overlay-${index}`} />
          <div style={{ display: "inline-block" }}>
            {item?.content.map((subject) => (
              <div
                className="content"
                style={{
                  left: `${subject.x}%`,
                  top: `${subject.y}%`,
                }}
              >
                <h4
                  style={{
                    color: index == 0 ? "#000" : "#fff",
                  }}
                >
                  {subject.title}
                </h4>
                <p
                  style={{
                    color: index == 0 ? "#000" : "#fff",
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
