import React from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";
import "./Service.less";
import { useIndexContext } from "../../../../contexts/indexContext";
import useNavigation from "../../../../hooks/useHistory";
import { useLanguage } from "../../../../contexts/useLanguage";
import { useTranslate } from "../../../../i18n/useTranslate";
export const Service: React.FC = () => {
  const { indexData } = useIndexContext();
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { t } = useTranslate();
  const data = indexData?.sliders.find(
    (item) => item.slug == "home-service-section",
  );
  return (
    <section id="Service" className="service">
      <Row className="first__title" justify="center">
        <h2>{t("local_ourServices")}</h2>
      </Row>
      <Row align="middle" justify="center" className="service__row">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={7}
          className="service__content fade-in"
        >
          <a href={`/${currentLang}${data?.link}`} className="service__title"><h3>{data?.title}</h3></a>
          <p className="service__text" dangerouslySetInnerHTML={{
            __html: data?.description ?? "",
          }}>
          </p>
          <AppButton onclick={() => push(`/${currentLang}/${data?.link}`)} className="service__Button"> {data?.link_title} </AppButton>
        </Col>

        <Col xs={24} sm={24} md={24} lg={14} xl={17} className="service__image">
          <a href={`/${currentLang}${data?.link}`}>
            <img src={data?.image ?? undefined} alt="service" className="service-img" />
          </a>
        </Col>
      </Row>
    </section>
  );
};
