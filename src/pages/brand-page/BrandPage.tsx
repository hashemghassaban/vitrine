import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "antd";
import "./BrandPage.less";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import useNavigation from "../../hooks/useHistory";
import useBrands from "../../hooks/brand/useBrands";
import type BrandView from "../../models/views/brandView";
import { useLanguage } from "../../contexts/useLanguage";
const BrandPage: React.FC = () => {
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { getList } = useBrands(currentLang);
  const [brands, setBrands] = useState<BrandView[]>([]);

  const isFa = currentLang === "fa";

  useEffect(() => {
    const fetchBrands = async () => {
      const { success, data } = await getList();
      if (success && data) {
        setBrands(data);
      }
    };
    fetchBrands();
  }, [currentLang]);

  return (
    <>
      <AppHeader
        title={"معرفی پروژه"}
        text={"لوکس‌ترین کامران کامرانیه"}
        style={false}
      />
      <div className="brands-page">
        <h2 className="brands-title">معرفی شوروم ویترین</h2>

        <p className="brands-subtitle">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی.
        </p>

        <Row gutter={[0, 48]} className="brands-grid">
          {brands.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.id}>
              <Card className="brand-card">
                <div brand-box>
                  <img
                    onClick={() => push(`/BrandProducts/${item.id}`)}
                    src={item.logo}
                    alt={item.title}
                    className="brand-logo"
                  />
                </div>
                <p
                  onClick={() => push(`/BrandProducts/${item.id}`)}
                  className="brand-title"
                >
                  {item.title}
                </p>
                <p className="brand-text">{item.excerpt}</p>
                <Button
                  onClick={() => push(`/BrandProducts/${item.id}`)}
                  type="link"
                  className={`brand-more ${!isFa ? "english" : ""}`}
                >
                  {isFa ? "مشاهده" : "View"}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default BrandPage;
