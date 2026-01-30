import React, { useState } from "react";
import "./Showcase.less";
import { useIndexContext } from "../../../../contexts/indexContext";
import { useTranslate } from "../../../../i18n/useTranslate";

export const Showcase: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { indexData } = useIndexContext();
  const { t } = useTranslate();

  return (
    <section className="showcase">
      <h2 className="showcase__title">
        {t("site.categoriesindex1")}
      </h2>
      <p className="showcase__subtitle">
        {t("site.categoriesindex2")}
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
