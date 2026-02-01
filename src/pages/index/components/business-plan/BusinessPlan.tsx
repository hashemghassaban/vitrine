import React from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";
import "./BusinessPlan.less";
import businessImg from "../../../../assets/business-plan/business-img.png";
import useNavigation from "../../../../hooks/useHistory";
import { useLanguage } from "../../../../contexts/useLanguage";
import { useIndexContext } from "../../../../contexts/indexContext";

export const BusinessPlan: React.FC = () => {
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { indexData } = useIndexContext();

  const data = indexData?.sliders.find(
    (item) => item.slug == "home-first-section",
  );
  return (
    <section id="BusinessPlan" className="business-plan">
      <Row gutter={[32, 32]} align="middle">
        {/* ستون تصویر */}
        <Col xs={24} sm={24} lg={12} className="business-plan__img-col">
          <img
            src={businessImg}
            alt="business"
            className="business-plan__img"
          />
        </Col>

        {/* ستون محتوا */}
        <Col xs={24} sm={24} lg={12} className="business-plan__content">
          <div className="business-plan__content-inner">
            <p className="business-plan__title">{data?.title}</p>

            <p
              className="business-plan__desc"
              dangerouslySetInnerHTML={{
                __html: data?.description ?? "",
              }}
            ></p>

            <AppButton
              className="business-plan__Button"
              onclick={() => push(`/${currentLang}/${data?.link}`)}
            >
              {data?.link_title}
            </AppButton>
          </div>
        </Col>
      </Row>
    </section>
  );
};
