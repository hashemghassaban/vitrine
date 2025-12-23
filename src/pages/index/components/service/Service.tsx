import React from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";

import img from "../../../../assets/service/image.png";
import "./Service.less";

export const Service: React.FC = () => {
  return (
    <section id="Service" className="service">
      <Row className="first__title" justify="center">
        <p>آشنایی با خدمات</p>
      </Row>

      <Row align="middle" justify="center" className="service__row">
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={10}
          xl={7}
          className="service__content fade-in"
        >
          <p className="service__title">این پروژه سوپرلوکس با محصولات</p>

          <p className="service__text">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است.
          </p>

          <AppButton className="service__Button">مشاوره و طراحی</AppButton>
        </Col>

        <Col xs={24} sm={24} md={12} lg={14} xl={17} className="service__image">
          <img src={img} alt="service" className="service-img" />
        </Col>
      </Row>
    </section>
  );
};
