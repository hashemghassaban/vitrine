import React from "react";
import { Row, Col, Button, Card } from "antd";
import "./BrandPage.less";
import brands from "../../helpers/brannds";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import useNavigation from "../../hooks/useHistory";
const BrandPage: React.FC = () => {

  const { push } = useNavigation();

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
                <img onClick={()=>(push(`/BrandProducts/${item.id}`))} src={item.logo} alt={item.title} className="brand-logo" />
                </div>
                <p onClick={()=>(push(`/BrandProducts/${item.id}`))} className="brand-title">{item.title}</p>

                <p className="brand-text">{item.text}</p>

                <Button onClick={()=>(push(`/BrandProducts/${item.id}`))} type="link" className="brand-more">
                  مشاهده
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
