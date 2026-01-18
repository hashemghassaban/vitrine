import React from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";
import "./BusinessPlan.less";
import useNavigation from "../../../../hooks/useHistory";
import { useIndexContext } from "../../../../contexts/indexContext";

export const BusinessPlan: React.FC = () => {
  const { push } = useNavigation();
  const { indexData } = useIndexContext();
  const data = indexData?.sliders[1];
  return (
    <section id="BusinessPlan" className="business-plan">
      <Row gutter={[32, 32]} align="middle">
        {/* ستون تصویر */}
        <Col xs={24} sm={24} lg={12} className="business-plan__img-col">
          <img
            src={data?.image ?? undefined}
            alt="business"
            className="business-plan__img"
          />
        </Col>

        {/* ستون محتوا */}
        <Col xs={24} sm={24} lg={12} className="business-plan__content">
          <div className="business-plan__content-inner">
            <p className="business-plan__title">{data?.title}</p>

            <p className="business-plan__desc">{data?.content}</p>

            <p className="business-plan__text">{data?.description}</p>

            <AppButton
              className="business-plan__Button"
              onclick={() => push(`${data?.link}`)}
            >
              {data?.link_title}
            </AppButton>
          </div>
        </Col>
      </Row>
    </section>
  );
};
