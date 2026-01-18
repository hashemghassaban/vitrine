import React from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";

import "./Service.less";
import { useIndexContext } from "../../../../contexts/indexContext";
import { useLanguage } from "../../../../contexts/useLanguage";

export const Service: React.FC = () => {
    const { indexData } = useIndexContext();
  const { currentLang } = useLanguage();
  const isFa = currentLang === "fa";
  const servicePage = indexData?.pages[2];

  return (
    <section id="Service" className="service">
      <Row className="first__title" justify="center">
        <p>{servicePage?.page_title}</p>
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
          <a href="#" className="service__title"> {servicePage?.title}</a>

          <p className="service__text">
             {servicePage?.excerpt}
          </p>

          <AppButton className="service__Button">مشاوره و طراحی</AppButton>
        </Col>

        <Col xs={24} sm={24} md={12} lg={14} xl={17} className="service__image">
        <a href="#" >
          <img src={servicePage?.image ?? undefined} alt="service" className="service-img" />


        </a>
        </Col>
      </Row>
    </section>
  );
};
