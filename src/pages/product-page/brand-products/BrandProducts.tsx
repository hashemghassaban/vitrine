import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import "./BrandProducts.less";
import img1 from "../../../assets/blog/img1.png";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { useParams } from "react-router-dom";
import useBrand from "../../../hooks/brand/useBrandById";
import type BrandView from "../../../models/views/brandView";
import { useLanguage } from "../../../contexts/useLanguage";
import "./BrandProducts.less";

const BrandProducts: React.FC = () => {
  const { id } = useParams();
  const { currentLang } = useLanguage();
  const { getById } = useBrand(currentLang);
  const [brand, setBrand] = useState<BrandView | null>(null);
  const [showMore, setShowMore] = useState(false);

  const isFa = currentLang === "fa";
  const fetchBrand = async () => {
    if (!id) return;
    const { success, data } = await getById(Number(id));
    if (success && data) {
      setBrand(data);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, [currentLang]);

  return (
    <>
      <AppHeader />
      <div className="showcase-container">
        <Row
          gutter={[5, 30]}
          justify="center"
          align="middle"
          className="header-row"
        >
          <Col xs={24} lg={9} className="logo-col">
            <div className="logo-box">
              <img
                src={brand?.logo ?? undefined}
                alt="brand-logo"
                className="brand-logo"
              />
            </div>
          </Col>
          <Col xs={24} lg={15}>
            <h2 className="title"> {brand?.title}</h2>
            <p className="text">{brand?.excerpt}</p>
            <div className="btn-box-brand-products">
              {!showMore ? (
                <Button
                  type="link"
                  className={`btn-more-brand-products ${
                    !isFa ? "english" : ""
                  }`}
                  onClick={() => setShowMore(true)}
                >
                  {isFa ? "بیشتر" : "More"}
                </Button>
              ) : (
                <p>{brand?.description}</p>
              )}
            </div>
          </Col>
        </Row>

        <div className="grid-box-brand-products">
          <Row gutter={[20, 30]} justify="center" className="grid-row">
            {brand?.collections.map((item, i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <div className="img-card">
                  <img src={item.main_image} alt="item" />
                  <div className="card-info">
                    <p className="card-title">{item.title}</p>
                    <span className="card-arrow">←</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <AppFooter/>
    </>
  );
};

export default BrandProducts;
