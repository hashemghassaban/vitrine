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
import useNavigation from "../../../hooks/useHistory";
import LoadingSpin from "../../../components/Loading/LoadingSpin";
import usePageMetadata from "../../../hooks/usePageMetadata";

const BrandProducts: React.FC = () => {
  useSyncLanguage();
  
  const { id } = useParams();
  const { currentLang } = useLanguage();
  const { getById } = useBrand(currentLang);
  const [brand, setBrand] = useState<BrandView | null>(null);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const { push } = useNavigation();
  const fetchBrand = async () => {
    if (!id) return;
    setLoading(true);
    const { success, data } = await getById(Number(id));
    if (success && data) {
      setBrand(data);
    }
    setLoading(false);
  };

    const textMainCaption = currentLang === "fa" ? 'ویترین گالری' : 'Vitrine Gallery'
    const meta = brand
    ? {
        title: brand.title + ' | ' + textMainCaption ,
        description:
          brand.meta_description ||
          brand.excerpt ||
          brand.title, 
        ogImage: brand.logo,
        ogType: 'brand',
      }
    : {
        title: textMainCaption,
        description: 'brand details are loading',
      };
  
  usePageMetadata(meta);

  useEffect(() => {
    fetchBrand();
  }, [currentLang, id]);

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader categoryBackground={brand?.image}/>
      {!loading ? (
        <div className="showcase-container">
          <Row
            gutter={[5, 30]}
            justify="center"
            align="middle"
            className="header-row"
          >
            <Col xs={24} lg={7} className="logo-col">
                          <h1 className="title mobile" > {brand?.title}</h1>

              <div className="logo-box">
                <img
                  src={brand?.logo ?? undefined}
                  alt={brand?.title}
                  className="brand-logo"
                />
              </div>
            </Col>
            <Col xs={24} lg={15}>
              <h1 className="title desktop"> {brand?.title}</h1>
              {showMore && <p className="text" dangerouslySetInnerHTML={{ __html: brand?.excerpt || "" }}></p>}
              <div className="btn-box-brand-products">
                {!showMore && <p dangerouslySetInnerHTML={{ __html: brand?.description || "" }}></p>
                }
                <Button
                  type="link"
                  className={`btn-more-brand-products ${currentLang == "en" ? "english" : ""
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
                  <div className="img-card"
                    onClick={() => {

                      const urlFriendlyId= item?.id;
                      push(`/${currentLang}/products?collection=${urlFriendlyId}`);
                    }}
                  >
                    <img src={item.main_image} alt={item.title} />
                    <div className="card-info">
                      <h2 className="card-title">{item.title}</h2>
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
