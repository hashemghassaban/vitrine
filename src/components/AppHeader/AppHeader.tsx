import { useState, type FC } from "react";
import { Input, Menu, Row } from "antd";
import { Container } from "../Container/Container";
import useNavigation from "../../hooks/useHistory";
import img from "../../assets/header/header.png";
import search from "../../assets/header/search.png";
import en from "../../assets/header/en.png";

import "./AppHeader.less";
import { ImageHoverModal } from "./ImageHoverModal/ImageHoverModal";
import { useLanguage } from "../../contexts/useLanguage";

interface AppHeaderProps {
  noBackground?: boolean;
  title?: String;
  text?: String;
  style?: boolean;
}
export const AppHeader: FC<AppHeaderProps> = ({
  noBackground,
  title,
  text,
  style = true,
}) => {
  const { push } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);

  const { currentLang, setCurrentLang } = useLanguage();
  const isRtl = currentLang === "fa";
  type Language = "en" | "fa";

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  return (
    <>
      <div className={`header-wrapper ${searchOpen ? "blur-active" : ""}`}>
        <Container
          className={`app-header_container ${noBackground ? "no-bg" : ""}`}
        >
          <Row>
            <div className="home__img">
              <img src={img} alt="vitrine" />
            </div>
            <img
              className="search__img"
              onClick={() => setSearchOpen(true)}
              src={search}
              alt={search}
            />
            <Menu
              className="app-header__menu-Text"
              mode="horizontal"
              triggerSubMenuAction="hover"
              selectable={false}
              overflowedIndicator={null}
            >
              <Menu.SubMenu key="b" title={isRtl ? "فا" : "En"} className="En_text" popupClassName="lang-submenu-popup">
                <Menu.Item key="b-1"  onClick={() => handleLanguageChange("en")}> En</Menu.Item>
                <Menu.Item key="b-2"  onClick={() => handleLanguageChange("fa")}>فا </Menu.Item>
              </Menu.SubMenu>
            </Menu>

            <img className="en_img" src={en} alt={en} />
          </Row>
          <Menu
            className="app-header__menu-home"
            mode="horizontal"
            triggerSubMenuAction="hover"
            selectable={false}
            overflowedIndicator={null}
          >
            <Menu.Item key="products" title="محصولات" >
              <ImageHoverModal triggerImg="محصولات" />
              
            </Menu.Item>
            <Menu.SubMenu key="b" title=" برندها">
              <Menu.Item key="b-1">عنوان اصلی</Menu.Item>
              <Menu.Item key="b-2">زیرعنوان </Menu.Item>
              <Menu.Item key="b-3">زیرعنوان </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="k" title="کاتالوگ ها">
              کاتالوگ ها
            </Menu.Item>

            <Menu.Item key="kh" title="خدمات">
              خدمات
            </Menu.Item>

            <Menu.Item key="projects" title="پروژه‌ها">
              پروژه ها
            </Menu.Item>

            <Menu.Item
              key="services"
              title="نمایندگی‌ها"
              onClick={() => push(`/representation`)}
            >
              نمایندگی‌ها
            </Menu.Item>

            <Menu.Item
              key="about"
              title="درباره"
              onClick={() => push("/about")}
            >
              درباره
            </Menu.Item>

            <Menu.Item
              key="home"
              title="تماس"
              onClick={() => push("/contactBranch")}
            >
              تماس
            </Menu.Item>
          </Menu>
          {style ? (
            <div className="box-page">
              <p className="title-page">{title}</p>
              <p className="text-page">{text}</p>
            </div>
          ) : (
            <div className="box-page2">
              <p className="text-page2">{title}</p>
              <p className="title-page2">{text}</p>
            </div>
          )}
        </Container>
      </div>
      {searchOpen && <div className="page-overlay" />}
      {searchOpen && (
        <div className="search-box">
          <Input placeholder="جستجو" className="search-input" autoFocus />

          <button className="close-btn" onClick={() => setSearchOpen(false)}>
            ✕
          </button>
        </div>
      )}
    </>
  );
};
