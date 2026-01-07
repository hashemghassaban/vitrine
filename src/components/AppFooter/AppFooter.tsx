import React, { useEffect, useState } from "react";
import { Col, Row, Layout, Input, message } from "antd";
import { FooterMenu } from "./FooterMenu/FooterMenu";
import img from "../../assets/footer/img1.png";
import mail from "../../assets/footer/mail.png";
import media1 from "../../assets/footer/media1.png";
import media2 from "../../assets/footer/media2.png";
import media3 from "../../assets/footer/media3.png";
import media4 from "../../assets/footer/media4.png";
import media5 from "../../assets/footer/media5.png";
import media6 from "../../assets/footer/media6.png";
import en from "../../assets/footer/en.png";
import media7 from "../../assets/footer/media7.png";
import media8 from "../../assets/footer/media8.png";

import "./AppFooter.less";
import { useLanguage } from "../../contexts/useLanguage";
import type { IndexDataView } from "../../models/views/indexView";
import useIndex from "../../hooks/index/useIndex";
import useNewsletter from "../../hooks/newsletter/useNewsletter";

export const AppFooter: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setIndexData] = useState<IndexDataView | null>(null);
  const [email, setEmail] = useState("");
  const { sendEmail } = useNewsletter();

  const { currentLang, setCurrentLang } = useLanguage();
  const isFa = currentLang === "fa";

  type Language = "en" | "fa";

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const { getIndex } = useIndex(currentLang);
  const fetchIndex = async () => {
    const { success, data } = await getIndex();
    if (success && data) {
      setIndexData(data);
    }
  };

  const showMessage = (content: string) => {
    messageApi.open({
      icon: <></>,
      content: content,
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (email && !validateEmail(email)) {
      showMessage(
        isFa ? "ایمیل وارد شده نامعتبر است." : "Invalid email address."
      );
      return;
    }
    const resp = await sendEmail(email);
    if (resp.success) {
      showMessage(resp.result);
      setEmail("");
    } else {
      showMessage(resp.result);
    }
  };

  useEffect(() => {
    setIndexData(null);
    fetchIndex();
  }, [currentLang]);
  const menuMedia = [
    { url: data?.settings.instagram_url, img: media1 },
    { url: data?.settings.twitter_url, img: media2 },
    { url: data?.settings.twitter_url, img: media3 },
    { url: data?.settings.telegram_url, img: media4 },
    { url: data?.settings.facebook_url, img: media5 },
    { url: data?.settings.twitter_url, img: media6 },
  ];

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {contextHolder}
      <Layout.Footer className="app-footer">
        <div className="app-footer__content">
          <Row gutter={[32, 24]} justify="center" align="top">
            {/* لوگو و متن */}
            <Col xs={24} sm={24} md={24} lg={8} className="app-footer__logo">
              <img className="app-footer__logo_img" src={img} alt="Logo" />
              <p className="app-footer_title">شوروم لوکس ویترین</p>
              <p className="app-footer_text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                طراحی.
              </p>
            </Col>

            {/* منوها */}
            <Col className="menu__col" xs={12} sm={12} md={12} lg={4}>
              <FooterMenu
                links={data?.links.filter((c) => c.type == "right")}
                title={isFa ? "دسترسی‌ها" : "Accesses"}
              />
            </Col>
            <Col className="menu__col" xs={12} sm={12} md={12} lg={4}>
              <FooterMenu
                links={data?.links.filter((c) => c.type == "left")}
                title={isFa ? "خدمات" : "Services"}
              />
            </Col>

            {/* عضویت و شبکه‌ها */}
            <Col xs={24} sm={24} md={24} lg={8} className="app-footer__col">
              <div className="app-footer__subscribe">
                <h2 className="app-footer__subscribe_title">
                  {" "}
                  {isFa ? "عضویت در خبرنامه" : "Subscribe to the newsletter"}
                </h2>
                <div className="">
                  <Input
                    name="email"
                    className="app-footer__email"
                    placeholder="Email"
                    variant="underlined"
                    value={email}
                    prefix={<img src={mail} alt="mail" />}
                    onChange={(e) => setEmail(e.target.value)}
                    onPressEnter={handleSendEmail}
                  />
                </div>

                <p className="app-footer__subscribe_title">
                  {" "}
                  {isFa ? "شبکه های اجتماعی" : "social media"}
                </p>
                <div className="footer_media_content">
                  {menuMedia.map((item, index) => (
                    <a key={index} href={item.url}>
                      <img
                        className="footer-media"
                        src={item.img}
                        alt={`media${index}`}
                      />
                    </a>
                  ))}
                </div>
                <div className="footer_en_content">
                  <p
                    className="footer_en_text"
                    style={{ cursor: "pointer" }}
                    onClick={
                      currentLang === "en"
                        ? () => handleLanguageChange("fa")
                        : () => handleLanguageChange("en")
                    }
                  >
                    {currentLang === "en" ? "فا" : "En"}{" "}
                    <img src={en} alt="en" />
                  </p>
                  <p className="footer_en_text">{isFa?"انتخاب زبان":"Language selection"}</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* آیکون‌های رسانه و تماس */}
        <Row justify="end" className="contact">
          <img src={media8} alt="media8" />
          <img src={media7} alt="media7" />
        </Row>

        {/* کپی رایت و Back-to-top */}
        <div className="app-footer__copyright">
          <div className="back-to-top" onClick={handleBackToTop}>
            ↑
          </div>
          <span>
            <a className="app-footer__copyright_text" href="#">
              Coppyright 2025 Vitrin Iran : All Right
            </a>
          </span>
        </div>
      </Layout.Footer>
    </>
  );
};
