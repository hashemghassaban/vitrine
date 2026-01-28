import { Row, Col } from "antd";
import type { JSX } from "react";
import "./BrandRow.less";
import { useIndexContext } from "../../../../contexts/indexContext";
import { useTranslate } from "../../../../i18n/useTranslate";

export function BrandRow(): JSX.Element {
  const { indexData } = useIndexContext();
  const { t } = useTranslate();

  return (
    <section className="brand-section">
      <Row className="brand-title" justify="center" align="middle">
        <p>
          {t("site.indexbrands")}
        </p>
      </Row>
      <div className="brand-scale-container">
        <Row className="brand-scale-row" gutter={0} wrap={false}>
          {indexData?.brands.map((brand, index) => (
            <Col key={index} className="brand-col">
              <img
                src={brand.image}
                alt={brand.title}
                className={`${ false ? "brand6-img" : "brand-img"}`}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
