import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "./ServicePageSec.less";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { useLanguage } from "../../../contexts/useLanguage";
// import type { PageView } from "../../../models/views/pageView";
// import useServicePage from "../../../hooks/page/useServicePage";
import useAim from "../../../hooks/page/useAim";
import type { AimItemView } from "../../../models/views/aimView";
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";

const ServicePageSec: React.FC = () => {
  useSyncLanguage();
  const { currentLang } = useLanguage();
  // const [page, setPage] = useState<PageView>();
  // const { getService } = useServicePage(currentLang);
  const { getList } = useAim(currentLang);
  const [items, setItems] = useState<AimItemView[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslate();

  // const fetchService = async () => {
  //   const { success, data } = await getService();
  //   if (success && data) {
  //     setPage(data);
  //   }
  // };

  const fetchAim = async () => {
    const { success, data } = await getList();
    if (success) {
      setItems(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    // fetchService()
    //   .then(() => fetchAim())
    //   .finally(() => setLoading(false));
    fetchAim().finally(() => setLoading(false));
  }, [currentLang]);



  return (
    <>
      <AppHeader title={t("site.servicetitlenew")} />

      {!loading ? (
        <div className="showroom-page">
          <Row gutter={[40, 40]} align="middle" className="top-section">
            <Col xs={24} lg={12} style={{ textAlign: "center" }}>
              <img src={items[0]?.image} className="top-image" alt="showroom" />
            </Col>
            <Col className="txt-col" xs={24} lg={12}>
              <div className="top-text-box">
                <h2 className="top-title">{items[0]?.title}</h2>
             <p className="card-text" dangerouslySetInnerHTML={{
                    __html: items[0]?.excerpt ?? "",
                  }}></p>
              </div>
            </Col>
          </Row>

          {/*section3*/}
          <Row justify="center">
            <div>
              <h2 className="service-title">{t("local_completedProjects")}</h2>
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
                    src={items[1]?.image}
                    alt={items[1]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{items[1]?.title}</p>
                  <p className="card-text" dangerouslySetInnerHTML={{
                    __html: items[1]?.excerpt ?? "",
                  }}></p>
                </div>

                <div className="stack-space" />

                <div className="grid-card">
                  <img
                    src={items[2]?.image}
                    alt={items[2]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{items[2]?.title}</p>
                  <p className="card-text" dangerouslySetInnerHTML={{
                    __html: items[2]?.excerpt ?? "",
                  }}></p>
                </div>
              </Col>

              {/* ستون 2 → آیتم 2 */}
              <Col xs={24} sm={12} lg={8}>
                <div className="grid-card">
                  <img
                    src={items[3]?.image}
                    alt={items[3]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{items[3]?.title}</p>
                  <p className="card-text" dangerouslySetInnerHTML={{
                    __html: items[3]?.excerpt ?? "",
                  }}></p>
                </div>
              </Col>

              {/* ستون 3 → آیتم 3 و 5 */}
              <Col xs={24} sm={12} lg={8}>
                <div className="grid-card">
                  <img
                    src={items[4]?.image}
                    alt={items[4]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{items[4]?.title}</p>
                  <p className="card-text" dangerouslySetInnerHTML={{
                    __html: items[4]?.excerpt ?? "",
                  }}></p>
                </div>
                <div className="stack-space" />
                <div className="grid-card">
                  <img
                    src={items[5]?.image}
                    alt={items[5]?.title}
                    className="card-img"
                  />
                  <p className="card-title-sec">{items[5]?.title}</p>
                  <p className="card-text" dangerouslySetInnerHTML={{
                    __html: items[5]?.excerpt ?? "",
                  }}></p>
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
