import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { useParams } from "react-router-dom";
import useBrand from "../../../hooks/brand/useBrandById";
import type BrandView from "../../../models/views/brandView";
import { useLanguage } from "../../../contexts/useLanguage";
import "./BrandProducts.less";
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";

const BrandProducts: React.FC = () => {
  useSyncLanguage();
  const { id } = useParams();
  const { currentLang } = useLanguage();
  const { getById } = useBrand(currentLang);
  const [brand, setBrand] = useState<BrandView | null>(null);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();

  const fetchBrand = async () => {
    if (!id) return;
    setLoading(true);
    const { success, data } = await getById(Number(id));
    if (success && data) {
      setBrand(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBrand();
  }, [currentLang, id]);

  return (
    <>
      <AppHeader />
      {!loading ? (
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
              {showMore&&(
                <p className="text">{brand?.excerpt}</p>
              )}
              <div className="btn-box-brand-products">
               {!showMore && (
                  <p>{brand?.description}</p>
                )}
                 <Button
                    type="link"
                    className={`btn-more-brand-products ${
                      currentLang == "en" ? "english" : ""
                    }`}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? t("local_more") : t("local_less")}
                  </Button>
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
      ) : (
        <div style={{ height: 500 }}></div>
      )}
      <AppFooter />
    </>
  );
};

export default BrandProducts;
