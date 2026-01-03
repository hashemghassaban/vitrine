import React from "react";
import { Row, Col, Button } from "antd";
import "./BrandProducts.less";
import img1 from "../../../assets/blog/img1.png";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import brands from "../../../helpers/brannds";
import { useParams } from "react-router-dom";

const BrandProducts: React.FC = () => {
  const items = [img1, img1, img1, img1, img1, img1];
  const { id } = useParams();
  const brand = brands.find((b) => b.id === Number(id));
  return (
    <>
      <AppHeader />
      <div className="showcase-container">
        <Row
          gutter={[5, 30]}
          justify="center"
          align="middle"
          className="header-row"
        >
          <Col xs={24} lg={9} className="logo-col">
            <div className="logo-box">
              <img src={brand?.logo} alt="brand logo" className="brand-logo" />
            </div>
          </Col>
          <Col xs={24} lg={15}>
            <h2 className="title">معرفی شوروم ویتـرین</h2>
            <p className="text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطر آنچنان که لازم است. لورم ایپسوم متن ساختگی با تولید
              سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم
              است.
            </p>
            <p className="text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطر آنچنان که لازم است.
            </p>
            <div className="btn-box-brand-products">
              <Button type="link" className="btn-more-brand-products">
                بیشتر
              </Button>
            </div>
          </Col>
        </Row>

        <div className="grid-box-brand-products">
          <Row gutter={[20, 30]} justify="center" className="grid-row">
            {items.map((img, i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <div className="img-card">
                  <img src={img} alt="item" />
                  <div className="card-info">
                    <p className="card-title">معرفی شوروم ویتـرین</p>
                    <span className="card-arrow">←</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <AppFooter/>
    </>
  );
};

export default BrandProducts;
