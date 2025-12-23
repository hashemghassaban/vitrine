import React from "react";
import { Col, Row, Layout } from "antd";
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

export const AppFooter: React.FC = () => {
  const menuCompany = [
    { url: "url", text: "خدمات ما" },
    { url: "url", text: "تماس با ما" },
    { url: "/representation", text: "نمایندگی ها" },
    { url: "/blog", text: "وبلاگ" },
  ];

  const menuProduct = [
    { url: "/about", text: "درباره ما" },
    { url: "url", text: "محصولات" },
    { url: "url", text: "برند ها" },
    { url: "url", text: "پروژه ها" },
  ];

  const menuMedia = [
    { url: "url", img: media1 },
    { url: "url", img: media2 },
    { url: "url", img: media3 },
    { url: "url", img: media4 },
    { url: "url", img: media5 },
    { url: "url", img: media6 },
  ];

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout.Footer className="app-footer">
      <div className="app-footer__content">
        <Row gutter={[32, 24]} justify="center" align="top">
          {/* لوگو و متن */}
          <Col xs={24} sm={24} md={24} lg={8} className="app-footer__logo">
            <img className="app-footer__logo_img" src={img} alt="Logo" />
            <p className="app-footer_title">شوروم لوکس ویترین</p>
            <p className="app-footer_text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی.
            </p>
          </Col>

          {/* منوها */}
          <Col className="menu__col" xs={12} sm={12} md={12} lg={4}>
            <FooterMenu title="دسترسی ها" menu={menuCompany} />
          </Col>
          <Col className="menu__col" xs={12} sm={12} md={12} lg={4}>
            <FooterMenu title="خدمات" menu={menuProduct} />
          </Col>

          {/* عضویت و شبکه‌ها */}
          <Col xs={24} sm={24} md={24} lg={8} className="app-footer__col">
            <div className="app-footer__subscribe">
              <h2 className="app-footer__subscribe_title">عضویت در خبرنامه</h2>
              <p className="app-footer__email">
                Email <img src={mail} alt="mail" />
              </p>

              <p className="app-footer__subscribe_title">شبکه‌های اجتماعی </p>
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
                  En <img src={en} alt="en" />
                </p>
                <p className="footer_en_text">انتخاب زبان</p>
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
  );
};
