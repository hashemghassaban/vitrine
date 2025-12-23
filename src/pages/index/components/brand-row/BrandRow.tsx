import { Row, Col, } from "antd";
import type { JSX } from "react";

import "./BrandRow.less";
import brand1 from "../../../../assets/brand-row/brand1.png";
import brand2 from "../../../../assets/brand-row/brand2.png";

import brand4 from "../../../../assets/brand-row/brand4.png";
import brand5 from "../../../../assets/brand-row/brand5.png";
import brand6 from "../../../../assets/brand-row/brand6.png";
const brands = [brand1, brand2, brand6, brand4, brand5];

export function BrandRow(): JSX.Element {

  return (
<section className="brand-section">
  <Row className="brand-title" justify="center" align="middle">
    <p>برند هایی که اقتدار جهانی هستند</p>
  </Row>

  <div className="brand-scale-container">
    <Row className="brand-scale-row" gutter={0} wrap={false}>
      {brands.map((brand, index) => (
          <Col key={index} className="brand-col">
    <img
      src={brand}
      alt="brand"
      className={` ${brand == brand6 ? "brand6-img" : "brand-img"}`}
    />
  </Col>
      ))}
    </Row>
  </div>
</section>

  );
}
