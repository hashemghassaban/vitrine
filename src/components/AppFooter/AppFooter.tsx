import React, { useEffect, useState } from "react";
import { Col, Row, Layout, Input, message } from "antd";
import { FooterMenu } from "./FooterMenu/FooterMenu";
import img from "../../assets/footer/img1.png";
import mail from "../../assets/footer/mail.png";
import ico_instagram from "../../assets/footer/media1.png";
import ico_whatsapp from "../../assets/footer/media2.png";
import ico_linkedin from "../../assets/footer/media3.png";
import ico_telegram from "../../assets/footer/media4.png";
import ico_facebook from "../../assets/footer/media5.png";
import ico_youtube from "../../assets/footer/media6.png";
import media7 from "../../assets/icon/whatsapp.svg";

import "./AppFooter.less";
import { useLanguage } from "../../contexts/useLanguage";
import type { IndexDataView } from "../../models/views/indexView";
import useIndex from "../../hooks/index/useIndex";
import useNewsletter from "../../hooks/newsletter/useNewsletter";
import { useTranslate } from "../../i18n/useTranslate";
import { LANGUAGES, type Language } from "../../i18n/languageType";
import useNavigation from "../../hooks/useHistory";

export const AppFooter: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setIndexData] = useState<IndexDataView | null>(null);
  const [email, setEmail] = useState("");
  const { sendEmail } = useNewsletter();
  const { push } = useNavigation();

  const langLabels: Record<Language, string> = {
    en: "En",
    fa: "Fa",
    ar: "Ar",
  };

  const { currentLang } = useLanguage();

  const { t } = useTranslate();

  const handleLanguageChange = (newLang: Language) => {
    if (!currentLang) return;
    const newPath = location.pathname.replace(`/${currentLang}`, `/${newLang}`);
    push(newPath);
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
      showMessage(t("local_invalidEmailAddress"));
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
    { url: data?.settings.instagram_url, img: ico_instagram },
    { url: data?.settings.whatsapp_url, img: ico_whatsapp },
    { url: data?.settings.linkedin_url, img: ico_linkedin },
    { url: data?.settings.telegram_url, img: ico_telegram },
    { url: data?.settings.facebook_url, img: ico_facebook },
    { url: data?.settings.youtube_url, img: ico_youtube },
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
              <h1 className="app-footer_title">{t("site.footerblock6")}</h1>
              <p className="app-footer_text">{t("site.footerblock7")}</p>
            </Col>

            {/* منوها */}
            <Col className="menu__col" xs={12} sm={12} md={12} lg={4}>
              <FooterMenu
                links={data?.links.filter((c) => c.type == "left")}
                title={t("site.footerblock4")}
              />
            </Col>
            <Col className="menu__col" xs={12} sm={12} md={12} lg={4}>
              <FooterMenu
                links={data?.links.filter((c) => c.type == "right")}
                title={t("site.footerblock5")}
              />
            </Col>
            {/* عضویت و شبکه‌ها */}
            <Col xs={24} sm={24} md={24} lg={8} className="app-footer__col">
              <div className="app-footer__subscribe">
                <h2 className="app-footer__subscribe_title">
                  {t("local_newsletterSubscribtion")}
                </h2>
                <div className="blockEmail">
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
                  {t("local_socialMedia")}
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
                  <p className="footer_en_text">
                    {LANGUAGES
                      .filter((lang) => lang !== currentLang)
                      .map((lang, index, arr) => (
                        <span
                          key={lang}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleLanguageChange(lang)}
                        >
                          {langLabels[lang]}
                          {index < arr.length - 1 && " | "}{" "}
                          {/* pipe بین آیتم‌ها */}
                        </span>
                      ))}
                  </p>

                  <p className="footer_en_text">
                    {t("local_languageSelection")}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* آیکون‌های رسانه و تماس */}
        <Row justify="end" className="contact">
          <a href={data?.settings.whatsapp_url}>
            <img src={media7} alt="media7" />
          </a>
        </Row>

        {/* کپی رایت و Back-to-top */}
        <div className="app-footer__copyright">
          <div className="back-to-top" onClick={handleBackToTop}>
            ↑
          </div>
          <span>
            <a className="app-footer__copyright_text" href="#">
              {t("site.footerblock8")}
            </a>
          </span>
        </div>
      </Layout.Footer>
    </>
  );
};
