import { Row, Col, Card, Typography } from "antd";
import "./representation.less";
import representation from "../../../helpers/representation";
import { AppHeader } from "../../../components/AppHeader/AppHeader";

const { Title } = Typography;

export default function Representation() {
  return (
    <>
      <AppHeader />
      <div className="showcase-container">
        <Title level={3} className="title-page">
          نمایندگی‌های فروش ویترین
        </Title>

        <Row gutter={[24, 24]} justify="center">
          {representation.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="showcase-card-rep "
                cover={
                  <div className="map">
                    <iframe
                      className="img-card"
                      src={item.link}
                      width="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                    />

                    <div
                      onClick={() => window.open(item.link, "_blank")}
                      className="click-layer"
                    ></div>
                  </div>
                }
              >
                <Title level={5} className="book-title">
                  {item.title}
                </Title>
                <p className="book-txt">{item.address}</p>
                <div className="cal">
                  <p> تلفن</p>
                  <a href={`tel:${item.cal}`} className="tel-link">
                    {item.cal}
                  </a>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
