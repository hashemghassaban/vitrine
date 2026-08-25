import React from "react";
import { Col, Row } from "antd";
import { AppButton } from "../../../../components/AppButton/AppButton";
import "./BusinessPlan.less";
import useNavigation from "../../../../hooks/useHistory";
import { useLanguage } from "../../../../contexts/useLanguage";
import { useIndexContext } from "../../../../contexts/indexContext";

export const BusinessPlan: React.FC = () => {
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { indexData } = useIndexContext();
  let slug =  "home-first-section" 
  const data = indexData?.sliders.find(
    (item) => item.slug === slug,
  );
  console.log('sss',data);
  
  return (
    <section id="BusinessPlan" className="business-plan">
      <Row gutter={[32, 32]} align="middle">
        {/* ستون تصویر */}
        {/* <h2 className="business-plan__title mobile">{data?.title}</h2> */}

        <Col xs={24} sm={24} lg={12} className="business-plan__img-col">
          <img
            src={data?.image ?? undefined}
            alt={data?.title}
            className="business-plan__img"
          />
        </Col>

        {/* ستون محتوا */}
        <Col xs={24} sm={24} lg={12} className="business-plan__content">
          <div className="business-plan__content-inner">
            <h2 className="business-plan__title desktop">{data?.title}</h2>

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
