import type { FC } from "react";

import "./Home.less";

import { AppHeaderIndex } from "../header/AppHeaderIndex";

import { Button } from "antd";
import { ScrollDown } from "./scroll-down/ScrollDown";

export const Home: FC = () => {

  return (
    <section id="home" className="home">
      <AppHeaderIndex />
    
      <div className="home__content" id="home-content">
        <h1 className="home__title"> محصولات لوکس</h1>
        <p className="home__text"> شوروم ساختمانی ویترین</p>
        <Button className="home__button">اطلاعات بیشتر</Button>
      </div>
        <ScrollDown targetId="home-content" />
    </section>
  );
};
