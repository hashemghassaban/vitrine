import React, { useState } from "react";
import "./Showcase.less";
import { useIndexContext } from "../../../../contexts/indexContext";
import { useLanguage } from "../../../../contexts/useLanguage";

export const Showcase: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { indexData } = useIndexContext();
  const { currentLang } = useLanguage();
  const isFa = currentLang === "fa";

  return (
    <section className="showcase">
      <h2 className="showcase__title">
        {isFa ? " دسته‌بندی محصولات" : "Product categories"}
      </h2>
      <p className="showcase__subtitle">
        {isFa ? "محصولات آشپزخانه و حمام" : "Kitchen and Bathroom Products"}
      </p>

      <div className="infinite-slider">
        <div className="slider-track">
          {indexData?.categories.map((item, i) => (
            <div
              className="slide-item"
              key={i}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="img-wrapper">
                <a href="#">
                  <img
                    src={hoverIndex === i ? item.image : item.image}
                    alt={item.title}
                    className={hoverIndex === i ? "hovered" : ""}
                  />
                  <p className={hoverIndex === i ? "show-text" : ""}>
                    {item.title}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
