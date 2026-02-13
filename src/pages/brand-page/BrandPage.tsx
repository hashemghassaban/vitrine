import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "antd";
import "./BrandPage.less";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import useNavigation from "../../hooks/useHistory";
import useBrands from "../../hooks/brand/useBrands";
import type BrandView from "../../models/views/brandView";
import { useLanguage } from "../../contexts/useLanguage";
import { useTranslate } from "../../i18n/useTranslate";
import { useSyncLanguage } from "../../i18n/useSyncLanguage";
import LoadingSpin from "../../components/Loading/LoadingSpin";

const BrandPage: React.FC = () => {
  useSyncLanguage();
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { getList } = useBrands(currentLang);
  const [brands, setBrands] = useState<BrandView[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslate();

  useEffect(() => {
    const fetchBrands = async () => {
      const { success, data } = await getList();
      if (success && data) {
        setBrands(data);
        setLoading(false);
      }
    };
    fetchBrands();
  }, [currentLang]);

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader
        title={t("site.brandpage1")}
        text={t("site.brandpage2")}
        style={false}
      />
      <div className="brands-page">
        <h2 className="brands-title">{t("site.brandpage3")}</h2>

        <p className="brands-subtitle">{t("site.brandpage4")}</p>

        <Row gutter={[0, 48]} className="brands-grid">
          {brands.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.id}>
              <Card className="brand-card">
                <div brand-box className="logos">
                  <img
                    onClick={() => push(`/${currentLang}/BrandProducts/${item.id}`)}
                    src={item.logo}
                    alt={item.title}
                    className="brand-logo"
                  />
                </div>
                <p
                  onClick={() => push(`/${currentLang}/BrandProducts/${item.id}`)}
                  className="brand-title"
                >
                  {item.title}
                </p>
                <p className="brand-text">{item.excerpt}</p>
                <Button
                  onClick={() => push(`/${currentLang}/BrandProducts/${item.id}`)}
                  type="link"
                  className={`brand-more ${currentLang == "en" ? "english" : ""}`}
                >
                  {t("local_view")}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <AppFooter />
    </>
  );
};

export default BrandPage;
