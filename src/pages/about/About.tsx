import { Row, Col } from "antd";

import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import play from "../../assets/about/play.png";
import { useEffect, useState } from "react";
import useAboutPage from "../../hooks/page/useAboutPage";
import { useLanguage } from "../../contexts/useLanguage";
import type { SettingView } from "../../models/views/settingView";
import useSetting from "../../hooks/setting/useSetting";
import type { PageView } from "../../models/views/pageView";
import "antd/dist/reset.css";
import "./About.less";
import { useSyncLanguage } from "../../i18n/useSyncLanguage";

export default function About() {
  useSyncLanguage();
  const { currentLang } = useLanguage();
  const [page, setPage] = useState<PageView>();
  const { getAbout } = useAboutPage(currentLang);
  const [setting, setSetting] = useState<SettingView | null>(null);
  const { getSetting } = useSetting(currentLang);

  const fetchVideo = async () => {
    const { success, data } = await getSetting();
    if (success && data) {
      setSetting(data);
    }
  };

  const fetchabout = async () => {
    const { success, data } = await getAbout();
    if (success && data) {
      setPage(data);
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchabout();
  }, [currentLang]);

  // حالت نمایش ویدیو
  const [showVideo1, setShowVideo1] = useState(false);
  const [showVideo2, setShowVideo2] = useState(false);

  return (
    <>
      <AppHeader
        noBackground
        title={currentLang == "fa" ? "درباره ویترین" : (currentLang == "en"? " About vitrine":"من نحن ویترین")}
      />

      <div className="article-content">
        <Row justify="center" gutter={[32, 32]}>
          <Col xs={24} lg={12} className="article-col">
            <div className="article-div">
              <h2 className="article-title">{page?.title}</h2>
              <p
                className="article-text"
                dangerouslySetInnerHTML={{
                  __html: page?.content ?? "",
                }}
              ></p>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <img
              className="top-image-about"
              src={page?.image ?? ""}
              alt={page?.title}
            />
          </Col>
        </Row>
      </div>

      <div className="center-video">
        <Row justify="center" gutter={[32, 32]}>
          <Col xs={24} md={12} className="box-video">
            <div className="video-div" onClick={() => setShowVideo1(true)}>
              {!showVideo1 ? (
                <>
                  <img src={page?.thumbnail ?? ""} className="main-image" />
                  <img src={play} className="overlay-image" />
                </>
              ) : (
                <iframe
                  width="800"
                  height="468"
                  src={setting?.video_url}
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </Col>

          {/* ویدیو ۲ */}
          <Col xs={24} md={12} className="box-video2">
            <div className="video-div" onClick={() => setShowVideo2(true)}>
              {!showVideo2 ? (
                <>
                  <img src={page?.thumbnail ?? ""} className="main-image" />
                  <img src={play} className="overlay-image" />
                </>
              ) : (
                <iframe
                  width="800"
                  height="468"
                  src={setting?.video_url}
                  title="Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <AppFooter />
    </>
  );
}
