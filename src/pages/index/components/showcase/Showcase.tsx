import React, { useEffect, useState } from "react";
import "./Showcase.less";
import { useIndexContext } from "../../../../contexts/indexContext";
import { useTranslate } from "../../../../i18n/useTranslate";
import { useLanguage } from "../../../../contexts/useLanguage";
import { Carousel } from "antd";

export const Showcase: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { indexData } = useIndexContext();
  const { t } = useTranslate();
  const { currentLang } = useLanguage();
  const categories = indexData?.categories || [];

  const [isCarouselNeeded, setIsCarouselNeeded] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const totalContentWidth = categories.length * 200;
      setIsCarouselNeeded(window.innerWidth < totalContentWidth + 40);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [categories.length]);
  
  return (
    <section className="showcase">
      <h2 className="showcase__title">{t("site.categoriesindex1")}</h2>
      <p className="showcase__subtitle">{t("site.categoriesindex2")}</p>

      <div>
        {isCarouselNeeded ? (
          <Carousel
            autoplay
            dots={false}
            infinite
            draggable
            speed={1000}
            autoplaySpeed={2000}
            style={{ paddingInline: 20 }}
            slidesToShow={7}
            responsive={[
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 6,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4.5,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2.5,
                },
              },
            ]}
          >
            {categories.map((item, i) => (
              <div
                key={i}
                className="showcase-slide-item"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className="showcase-img-wrapper">
                  <a
                    href={`/${currentLang}/products?category=${encodeURIComponent(item.slug)}`}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className={hoverIndex == i ? "hovered" : ""}
                    />
                    <p className={hoverIndex == i ? "show-text" : ""}>
                      {item.title}
                    </p>
                  </a>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="showcase-slider-track">
            {categories.map((item, i) => (
              <div
                key={i}
                className="showcase-slide-item"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className="showcase-img-wrapper">
                  <a
                    href={`/${currentLang}/products?category=${encodeURIComponent(item.slug)}`}
                  >
                    <img
                      src={item.icon}
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
        )}
      </div>
    </section>
  );
};
