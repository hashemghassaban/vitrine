import { useRef } from "react";
import type { JSX } from "react";


import "./Home.less";
import { Carousel} from "antd";

import { AppHeaderIndex } from "../header/AppHeaderIndex";

import { Button } from "antd";
import { ScrollDown } from "./scroll-down/ScrollDown";
import intro from "../../../../assets/home/intro.png";
import video from "../../../../assets/home/video.mp4";


  export  function Home(): JSX.Element {
  const carouselRef = useRef<any>(null);
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
  <source src={video}></source>
</video> 
                                     
                  </div>
                
                </Carousel>
<div className="content">
             <h1 className="home__title"> محصولات لوکس</h1>
        <p className="home__text"> شوروم ساختمانی ویترین</p>
        <Button className="home__button">اطلاعات بیشتر</Button>
                    </div>
          
                <ScrollDown targetId="home-content" />
              </div>

    </section>
  );
};
