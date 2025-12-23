import React from "react";
import { Row, Col,} from "antd";
import "./ServicePageSec.less";
import img1 from "../../../assets/service-page/img1.png";
import img2 from "../../../assets/service-page/img2.png";
import img3 from "../../../assets/service-page/img3.png";

import { AppHeader } from "../../../components/AppHeader/AppHeader";
const items = [
  {
    id: 1,
    image: img2,
    title: "معرفی شوروم",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی.",
  },
  {
    id: 2,
    image: img3,
    title: "معرفی شوروم",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی.",
  },
  {
    id: 3,
    image: img2,
    title: "معرفی شوروم",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی.",
  },
  {
    id: 4,
    image: img2,
    title: "معرفی شوروم",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی.",
  },
  {
    id: 5,
    image: img2,
    title: "معرفی شوروم",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی.",
  },
];

const ServicePageSec: React.FC = () => {
  return (
    <>
      <AppHeader title={"خدمات مشاوره و طراحی ویترین"} />
      <div className="showroom-page">
        <Row gutter={[40, 40]} align="middle" className="top-section">
          <Col className="txt-col" xs={24} lg={12}>
            <div className="top-text-box">
              <h2 className="top-title">معرفی شوروم ویترین</h2>
              <p className="top-text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                طراحی. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                و طراحی. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                چاپ و طراحی. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                صنعت چاپ و طراحی.
              </p>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <img src={img1} className="top-image" alt="showroom" />
          </Col>
        </Row>


        {/*section3*/}
   

        <div className="grid-box">
          <Row gutter={[0, 10]} className="grid-section">
            <Col xs={24} sm={12} lg={8}>
              <div className="grid-card">
                <img
                  src={items[0].image}
                  alt={items[0].title}
                  className="card-img"
                />
                <p className="card-title">{items[0].title}</p>
                <p className="card-text">{items[0].text}</p>
              </div>

              <div className="stack-space" />

              <div className="grid-card">
                <img
                  src={items[3].image}
                  alt={items[3].title}
                  className="card-img"
                />
                <p className="card-title">{items[3].title}</p>
                <p className="card-text">{items[3].text}</p>
              </div>
            </Col>

            {/* ستون 2 → آیتم 2 */}
            <Col xs={24} sm={12} lg={8}>
              <div className="grid-card">
                <img
                  src={items[1].image}
                  alt={items[1].title}
                  className="card-img"
                />
                <p className="card-title">{items[1].title}</p>
                <p className="card-text">{items[1].text}</p>
              </div>
            </Col>

            {/* ستون 3 → آیتم 3 و 5 */}
            <Col xs={24} sm={12} lg={8}>
              <div className="grid-card">
                <img
                  src={items[0].image}
                  alt={items[0].title}
                  className="card-img"
                />
                <p className="card-title">{items[0].title}</p>
                <p className="card-text">{items[0].text}</p>
              </div>
              <div className="stack-space" />
              <div className="grid-card">
                <img
                  src={items[3].image}
                  alt={items[3].title}
                  className="card-img"
                />
                <p className="card-title">{items[3].title}</p>
                <p className="card-text">{items[3].text}</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ServicePageSec;

