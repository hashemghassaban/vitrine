import { Row, Col } from "antd";
import type { JSX } from "react";
import "./BrandRow.less";
import { useIndexContext } from "../../../../contexts/indexContext";
import { useLanguage } from "../../../../contexts/useLanguage";

export function BrandRow(): JSX.Element {
  const { indexData } = useIndexContext();
  const { currentLang } = useLanguage();
  const isFa = currentLang === "fa";
  return (
    <section className="brand-section">
      <Row className="brand-title" justify="center" align="middle">
        <p>
          {isFa
            ? "برند هایی که اقتدار جهانی هستند "
            : " Brands that are global authorities"}
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
