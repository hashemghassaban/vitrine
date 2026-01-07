import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "./ServicePageSec.less";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { useLanguage } from "../../../contexts/useLanguage";
import type { PageView } from "../../../models/views/pageView";
import useServicePage from "../../../hooks/page/useServicePage";
import useAim from "../../../hooks/page/useAim";
import type { AimItemView } from "../../../models/views/aimView";

const ServicePageSec: React.FC = () => {
  const { currentLang } = useLanguage();
  const [page, setPage] = useState<PageView>();
  const { getService } = useServicePage(currentLang);
  const { getList } = useAim(currentLang);
  const [items, setItems] = useState<AimItemView[]>([]);
  const [loading, setLoading] = useState(true);

  const isFa = currentLang === "fa";

  const fetchService = async () => {
    const { success, data } = await getService();
    if (success && data) {
      setPage(data);
    }
  };

  const fetchAim = async () => {
    const { success, data } = await getList();
    if (success) {
      setItems(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchService()
      .then(() => fetchAim())
      .finally(() => setLoading(false));
  }, [currentLang]);

  const filledItems: AimItemView[] = React.useMemo(() => {
    if (!items || items.length === 0) return [];

    return Array.from({ length: 5 }, (_, index) => {
      return items[index % items.length];
    });
  }, [items]);

  return (
    <>
      <AppHeader
        title={
          isFa
            ? "خدمات مشاوره و طراحی ویترین"
            : "Vitrine consulting and design services"
        }
      />

      {!loading ? (
        <div className="showroom-page">
          <Row gutter={[40, 40]} align="middle" className="top-section">
            <Col xs={24} lg={12} style={{ textAlign: "center" }}>
              <img src={page?.image} className="top-image" alt="showroom" />
            </Col>
            <Col className="txt-col" xs={24} lg={12}>
              <div className="top-text-box">
                <h2 className="top-title">{page?.title}</h2>
                <p
                  className="top-text"
                  dangerouslySetInnerHTML={{
                    __html: page?.content ?? "",
                  }}
                ></p>
              </div>
            </Col>
          </Row>

          {/*section3*/}
          <Row justify="center">
            <div>
              <h2 className="service-title">
                {isFa ? "پروژه‌های انجام شده" : "Completed Projects"}
              </h2>
              <p className="service-subtitle">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                طراحی. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                و طراحی.
              </p>
            </div>
          </Row>

          <div className="grid-box">
            <Row gutter={[0, 10]} className="grid-section">
              <Col xs={24} sm={12} lg={8}>
                <div className="grid-card">
                  <img
                    src={filledItems[0]?.image}
                    alt={filledItems[0]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{filledItems[0]?.title}</p>
                  <p className="card-text">{filledItems[0]?.excerpt}</p>
                </div>

                <div className="stack-space" />

                <div className="grid-card">
                  <img
                    src={filledItems[1]?.image}
                    alt={filledItems[1]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{filledItems[1]?.title}</p>
                  <p className="card-text">{filledItems[1]?.excerpt}</p>
                </div>
              </Col>

              {/* ستون 2 → آیتم 2 */}
              <Col xs={24} sm={12} lg={8}>
                <div className="grid-card">
                  <img
                    src={filledItems[2]?.image}
                    alt={filledItems[2]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{filledItems[2]?.title}</p>
                  <p className="card-text">{filledItems[2]?.excerpt}</p>
                </div>
              </Col>

              {/* ستون 3 → آیتم 3 و 5 */}
              <Col xs={24} sm={12} lg={8}>
                <div className="grid-card">
                  <img
                    src={filledItems[3]?.image}
                    alt={filledItems[3]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{filledItems[3]?.title}</p>
                  <p className="card-text">{filledItems[3]?.excerpt}</p>
                </div>
                <div className="stack-space" />
                <div className="grid-card">
                  <img
                    src={filledItems[4]?.image}
                    alt={filledItems[4]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{filledItems[4]?.title}</p>
                  <p className="card-text">{filledItems[4]?.excerpt}</p>
                </div>
              </Col>
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

export default ServicePageSec;
