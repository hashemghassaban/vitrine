import { Row, Col, Card, Typography } from "antd";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { useEffect, useState } from "react";
import type representationView from "../../../models/views/representationView";
import { useLanguage } from "../../../contexts/useLanguage";
import useRepresentation from "../../../hooks/contact/useRepresentation";
import "./representation.less";

const { Title } = Typography;

export default function Representation() {
  const [repres, setRepresentations] = useState<representationView[]>([]);
  const { currentLang } = useLanguage();
  const { getList } = useRepresentation(currentLang);
  const isFa = currentLang === "fa";

  const fetchRepresentations = async () => {
    const { success, data } = await getList();
    if (success && data) {
      setRepresentations(data);
    }
  };

  useEffect(() => {
    setRepresentations([]);
    fetchRepresentations();
  }, [currentLang]);

  return (
    <>
      <AppHeader />
      <div className="showcase-container">
        <Title level={3} className="title-page">
          {isFa ? "نمایندگی‌های فروش ویترین" : "Vitrin Sales Representatives"}
        </Title>

        <Row gutter={[24, 24]} justify="center">
          {repres.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="showcase-card-rep "
                cover={
                  <div className="map">
                    {(() => {
                      const lat = item.latitude || "35.6892";
                      const lng = item.longitude || "51.3890";
                      const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
                        `${lat},${lng}`
                      )}&z=15&output=embed`;
                      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${lat},${lng}`
                      )}`;
                      return (
                        <>
                          <iframe
                            className="img-card"
                            src={embedSrc}
                            width="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                          />

                          <div
                            onClick={() => window.open(mapsLink, "_blank")}
                            className="click-layer"
                          ></div>
                        </>
                      );
                    })()}
                  </div>
                }
              >
                <Title level={5} className="book-title" style={{ marginBottom:'35px', fontSize:'21px'}}>
                  {item.title}
                </Title>
                <Row>
                  <Col span={24}>
                    <p className="book-txt">{item.address}</p>
                  </Col>
                </Row>
                <Row justify={"space-between"} style={{marginInline:"10px" ,  marginBottom:'10px'}}>
                  <Col >{isFa ? "تلفن" : "Phone"}</Col>
                  <Col >
                    <a href={`tel:${item.phone}`} className="tel-link">
                      {item.phone}
                    </a>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
