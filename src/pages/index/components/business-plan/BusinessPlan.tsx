import React from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";
import "./BusinessPlan.less";
import businessImg from "../../../../assets/business-plan/business-img.png";
import useNavigation  from "../../../../hooks/useHistory";

export const BusinessPlan: React.FC = () => {
    const { push } = useNavigation();
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
            <p className="business-plan__title">معرفی شوروم ویترین</p>

            <p className="business-plan__desc">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...
            </p>

            <p className="business-plan__text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...
            </p>

            <AppButton className="business-plan__Button" onclick={()=>push("/about")}>آشنا شوید</AppButton>
          </div>
        </Col>
      </Row>
    </section>
  );
};
