import { Row, Col, Card, Typography } from "antd";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";

import { useEffect, useState } from "react";
import type representationView from "../../../models/views/representationView";
import { useLanguage } from "../../../contexts/useLanguage";
import useRepresentation from "../../../hooks/contact/useRepresentation";
import { useTranslate } from "../../../i18n/useTranslate";
import "./representation.less";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
import LoadingSpin from "../../../components/Loading/LoadingSpin";
import backgroundHeader from "../../../assets/header/IMG_7060.jpg";
import MarkerPin from "../../../assets/icon/pin.png";
import usePageMetadata from "../../../hooks/usePageMetadata";

const { Title } = Typography;

export default function Representation() {
  useSyncLanguage();
  usePageMetadata();

  const [repres, setRepresentations] = useState<representationView[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentLang } = useLanguage();
  const { getList } = useRepresentation(currentLang);

  const fetchRepresentations = async () => {
    try {
      const { success, data } = await getList();
      if (success && data) {
        setRepresentations(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const { t } = useTranslate();

  useEffect(() => {
    setRepresentations([]);
    setLoading(true);
    fetchRepresentations();
  }, [currentLang]);

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader categoryBackground={backgroundHeader} />

      <div className="showcase-container">
        <h1 className="title-page">{t("site.agents1")}</h1>

        <Row
          gutter={[24, 24]}
          justify="center"
          style={{ justifyContent: "flex-start" }}
        >
          {repres.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={8}>
              <Card
                hoverable
                className="showcase-card-rep"
                cover={
                  <div
                    className="map"
                    style={{
                      position: "relative",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    {(() => {
                      const rawLat = (item as any)?.latitude ?? (item as any)?.lat;
                      const rawLng = (item as any)?.longitude ?? (item as any)?.lng;

                      const lat =
                        !isNaN(Number(rawLat)) && Number(rawLat) !== 0
                          ? Number(rawLat)
                          : 35.6892;
                      const lng =
                        !isNaN(Number(rawLng)) && Number(rawLng) !== 0
                          ? Number(rawLng)
                          : 51.389;

                      const neshanUrl = `https://neshan.org/maps/@${lat},${lng},16z`;

                      return (
                        <>
                          <iframe
                            className="img-card"
                            title={item.title || "Map"}
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.005}%2C${lng + 0.008}%2C${lat + 0.005}&layer=mapnik`}
                            width="100%"
                            style={{ border: 0, width: "100%", height: "100%" }}
                            loading="lazy"
                          />

                          {/* پین اختصاصی در مرکز نقشه */}
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -100%)",
                              pointerEvents: "none",
                              zIndex: 5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={MarkerPin}
                              alt="Pin"
                              style={{
                                width: "32px",
                                height: "auto",
                                filter:
                                  "drop-shadow(0 3px 5px rgba(0,0,0,0.35))",
                              }}
                            />
                          </div>

                          {/* لایه کلیک برای باز کردن مستقیم نقشه */}
                          <div
                            onClick={() => window.open(neshanUrl, "_blank")}
                            className="click-layer"
                            style={{
                              position: "absolute",
                              inset: 0,
                              cursor: "pointer",
                              zIndex: 6,
                            }}
                          />
                        </>
                      );
                    })()}
                  </div>
                }
              >
                <Title
                  level={5}
                  className="book-title"
                  style={{ marginBottom: "35px", fontSize: "21px" }}
                >
                  {item.title}
                </Title>
                <Row>
                  <Col span={24}>
                    <p className="book-txt">{item.address}</p>
                  </Col>
                </Row>
                <Row
                  justify={"space-between"}
                  style={{ marginInline: "15px", marginBottom: "10px" }}
                  className="phone"
                >
                  <Col className="titleKey">{t("local_phone")}</Col>
                  <Col>
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
      <AppFooter />
    </>
  );
}
