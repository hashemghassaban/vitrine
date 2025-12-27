
import { Row, Col, Card, Typography, } from "antd";
import "./Catalogue.less";
import catalogue from "../../../helpers/catalogue";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import download from "../../../assets/icon/download.png";
const { Title,} = Typography;


export default function Catalogue() {
  return (
    <>
    <AppHeader />
    <div className="showcase-container">
      <Row justify="center">
      <h2 className="title">
       نمایندگی‌های فروش ویترین
      </h2>
      </Row>
      <Row gutter={[24, 24]} justify="center">
        {catalogue.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
  
            <Card
              hoverable
              className="showcase-card"
              cover={<img className="img-card" src={item.image} alt={item.title} />}
            >
              <Title level={5} className="book-title">
                {item.title}
              </Title>

             <p  className="btn">
                      <img src={download} alt="download" />

              دانلود  
              </p>
        
            </Card>
    
          </Col>
        ))}
      </Row>
    </div>

    </>
  );
}
