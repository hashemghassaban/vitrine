import { useRef, useEffect, useState } from "react";
import type { JSX } from "react";
import "./Home.less";
import { Carousel } from "antd";
import { AppHeaderIndex } from "../header/AppHeaderIndex";
import { ScrollDown } from "./scroll-down/ScrollDown";
import videoSlider from '../../../../assets/video-block/videoSlider.mov'
import useIndex from "../../../../hooks/index/useIndex";
import { useLanguage } from "../../../../contexts/useLanguage";
import type { IndexDataView } from "../../../../models/views/indexView";


export function Home(): JSX.Element {
  const carouselRef = useRef<any>(null);
  const { currentLang } = useLanguage();
  const [indexData, setIndexData] = useState<IndexDataView | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliders = indexData?.sliders?.filter((c) => c.slug === "test-hero") || []  

  const { getIndex } = useIndex(currentLang);
  
  const fetchIndex = async () => {
    const { success, data } = await getIndex();
    if (success && data) {
      setIndexData(data);
    }
  };

  useEffect(() => {
    setIndexData(null);
    fetchIndex();
  }, [currentLang]);
  return (
    <section id="home" className="home">
      <AppHeaderIndex />
      <div className="home-main desktop">
  <Carousel
  arrows={false}
  ref={carouselRef}
  infinite={true}
  dots={false}
  autoplay={true}
  waitForAnimate={true}
  afterChange={(current) => setActiveIndex(current)}
>
  {sliders.map((item, i) => (
    <div className="home__content" key={i} id={`home-content${i}`}>
      {item?.video ? (
         <video
          controls={false}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
        >
          <source src={item?.video || videoSlider} type="video/mp4" />
        </video>
      ) : (
      <img className="imgs-detail" src={item?.image || ""} alt={item.title} />

      )}
    </div>
  ))}
</Carousel>
<div className="content">
  <h2 className="home__title">{sliders[activeIndex]?.title}</h2>
                     <p
                className="home__text"
                dangerouslySetInnerHTML={{
                  __html: sliders[activeIndex]?.description ?? "",
                }}
              ></p>
  <a  href={`/${currentLang}${sliders[activeIndex]?.link}`} className="home__button">
    {sliders[activeIndex]?.link_title}
  </a>
</div>
   
        <ScrollDown />
      </div>


      <div className="home-main mobile">
        <Carousel
          arrows={false}
          ref={carouselRef}
          infinite={true}
          dots={false}
          autoplay={true}
          waitForAnimate={true}
        >
          {indexData?.sliders
            ?.filter((c) => c.slug === "test-hero")
            .map((item, i) => (
              <div className="home__content" key={i} id={`home-content${i}`}>
                {item?.mobile_video ? (
                  <video
                  controls={false}
                  autoPlay
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                >
                  <source src={item?.mobile_video || videoSlider} type="video/mp4" />
                </video>
                  
                ) : (  <img className="imgs-detail" src={item?.responsive_image || ""} alt={item.title} />)}

              </div>
            ))}

        </Carousel>
      <div className="content">
  <h2 className="home__title">{sliders[activeIndex]?.title}</h2>
                     <p
                className="home__text"
                dangerouslySetInnerHTML={{
                  __html: sliders[activeIndex]?.description ?? "",
                }}
              ></p>
  <a  href={`/${currentLang}${sliders[activeIndex]?.link}`} className="home__button">
    {sliders[activeIndex]?.link_title}
  </a>
</div>

        <ScrollDown />
      </div>
    </section>
  );
}
