import { useRef } from "react";
import type { JSX } from "react";
import "./Home.less";
import { Carousel } from "antd";
import { AppHeaderIndex } from "../header/AppHeaderIndex";
import { Button } from "antd";
import { ScrollDown } from "./scroll-down/ScrollDown";
import intro from "../../../../assets/home/intro.png";
import { useTranslate } from "../../../../i18n/useTranslate";
import { useIndexContext } from "../../../../contexts/indexContext";

export function Home(): JSX.Element {
  const carouselRef = useRef<any>(null);
  const { t } = useTranslate();
  const { indexData } = useIndexContext();
   const data = indexData?.sliders.find(
    (item) => item.id == 11,
  );
  return (
    <section id="home" className="home">
      <AppHeaderIndex />
      <div className="home-main">
        <Carousel
          arrows={false}
          ref={carouselRef}
          infinite={true}
          dots={false}
          autoplay={true}
          waitForAnimate={true}
        >
          <div className="home__content" id="home-content">
            <img className="imgs-detail" src={intro} alt="img" />
          </div>
          <div className="home__content" id="home-content2">
            <video autoPlay muted>
              <source src={data?.video ?? undefined}></source>
            </video>
          </div>
        </Carousel>
        <div className="content">
          <h1 className="home__title">{t("local_luxuryProducts")}</h1>
          <p className="home__text">{t("local_vitrineBuildingShowroom")}</p>
          <Button className="home__button">{t("local_moreInfo")}</Button>
        </div>

        <ScrollDown />
      </div>
    </section>
  );
}
