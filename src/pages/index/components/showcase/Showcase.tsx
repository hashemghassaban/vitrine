import React, { useState } from "react";
import "./Showcase.less";

import img01 from "../../../../assets/showcase/img1.png";
import img02 from "../../../../assets/showcase/img2.png";
import img03 from "../../../../assets/showcase/img3.png";
import img04 from "../../../../assets/showcase/img4.png";
import img05 from "../../../../assets/showcase/img5.png";
import img06 from "../../../../assets/showcase/img6.png";
import img07 from "../../../../assets/showcase/img7.png";
import img08 from "../../../../assets/showcase/img8.png";
import img09 from "../../../../assets/showcase/img9.png";
import imgh1 from "../../../../assets/showcase/imgh1.png";
import imgh2 from "../../../../assets/showcase/imgh2.png";
import imgh3 from "../../../../assets/showcase/imgh3.png";
import imgh4 from "../../../../assets/showcase/imgh4.png";
import imgh5 from "../../../../assets/showcase/imgh5.png";
import imgh6 from "../../../../assets/showcase/imgh6.png";
import imgh7 from "../../../../assets/showcase/imgh7.png";
import imgh8 from "../../../../assets/showcase/imgh8.png";
import imgh9 from "../../../../assets/showcase/imgh9.png";

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

  return (
    <section className="showcase">
      <h2 className="showcase__title">دسته‌بندی محصولات</h2>
      <p className="showcase__subtitle">محصولات آشپزخانه و حمام</p>

      <div className="infinite-slider">
        <div className="slider-track">
          {projectList.map((item, i) => (
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
