import React, { useState } from "react";
import "./Showcase.less";
import { useIndexContext } from "../../../../contexts/indexContext";
import { useTranslate } from "../../../../i18n/useTranslate";

export const Showcase: React.FC = () => {
  const projectList = [
    { img: img01, img2: imgh1, name: "وان" },
    { img: img02, img2: imgh2, name: "حوله خشک‌کن" },
    { img: img03, img2: imgh3, name: "توالت" },
    { img: img04, img2: imgh4, name: "روشویی" },
    { img: img05, img2: imgh5, name: "شیرآلات" },
    { img: img06, img2: imgh6, name: "زیردوشی" },
    { img: img07, img2: imgh7, name: "اکسسوری" },
    { img: img08, img2: imgh8, name: "سردوش" },
    { img: img09, img2: imgh9, name: "کابینت" },
    
  ];

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
                <a href="#" > 
 <img
                  src={hoverIndex === i ? item.img2 : item.img}
                  alt={item.name}
                  className={hoverIndex === i ? "hovered" : ""}
                />
                <p className={hoverIndex === i ? "show-text" : ""}>{item.name}</p>

                </a>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
