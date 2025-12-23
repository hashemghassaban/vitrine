import React from "react";
import "./FullPageOverlay.less";
import image8 from "../../../../assets/full-page-overlay/image8.jpg";
import image7 from "../../../../assets/full-page-overlay/image7.jpg";
import image9 from "../../../../assets/full-page-overlay/image9.jpg";
import PulseCircleButton from "./components/PulsingButton";

export const FullPageOverlay: React.FC = () => {
  const images = [
    {
      img: image8,
      buttons: [{ id: 1, x: 52, y: 40 }],
    },
    {
      img: image7,
      buttons: [{ id: 1, x: 40, y: 35 }],
    },
    ,
    {
      img: image9,
      buttons: [
        { id: 1, x: 35, y: 35 },
        { id: 1, x: 65, y: 35 },
      ],
    },
    ,
  ];

  return (
    <div className="overlay-container">
      {images.map((item, index) => (
        <div key={index} className="overlay-section">
          <img src={item?.img} alt={`overlay-${index}`} />
          <div style={{ display: "inline-block" }}>
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
