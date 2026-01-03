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

  const menuItems = [
    {
      key: "menu-products",
      title: { en: "Products", fa: "محصولات" },
      type: "imageHover",
    },
    {
      key: "menu-brands",
      title: { en: "Brands", fa: "برندها" },
      children: [
        {
          key: "menu-brands-main",
          title: { en: "Main Title", fa: "عنوان اصلی" },
          path: "/brandPage",
        },
        { key: "menu-brands-sub1", title: { en: "Sub 1", fa: "زیرعنوان" } },
        { key: "menu-brands-sub2", title: { en: "Sub 2", fa: "زیرعنوان" } },
      ],
    },
    {
      key: "menu-catalogues",
      title: { en: "Catalogues", fa: "کاتالوگ‌ها" },
      path: "/catalogue",
    },
    {
      key: "menu-services",
      title: { en: "Services", fa: "خدمات" },
      path: "/servicePage",
    },
    {
      key: "menu-projects",
      title: { en: "Projects", fa: "پروژه‌ها" },
      path: "/project",
    },
    {
      key: "menu-representation",
      title: { en: "Representation", fa: "نمایندگی‌ها" },
      path: "/representation",
    },
    { key: "menu-about", title: { en: "About", fa: "درباره" }, path: "/about" },
    {
      key: "menu-contact",
      title: { en: "Contact", fa: "تماس" },
      path: "/contactBranch",
    },
  ];

  return (
    <>
      <div className={`header-wrapper ${searchOpen ? "blur-active" : ""}`}>
        <Container
          className={`app-header_container ${noBackground ? "no-bg" : ""}`}
        >
          <Row>
            <div className="home__img">
              <img src={img} alt="vitrine" onClick={() => push("/")} />
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
              <Menu.SubMenu
                key="b"
                title={isRtl ? "فا" : "En"}
                className="En_text"
                popupClassName="lang-submenu-popup"
              >
                <Menu.Item key="b-1" onClick={() => handleLanguageChange("en")}>
                  {" "}
                  En
                </Menu.Item>
                <Menu.Item key="b-2" onClick={() => handleLanguageChange("fa")}>
                  فا{" "}
                </Menu.Item>
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
            {menuItems.map((item) =>
              item.children ? (
                <Menu.SubMenu key={item.key} title={item.title[currentLang]}>
                  {item.children.map((child) => (
                    <Menu.Item
                      key={child.key}
                      onClick={() =>
                        child.path ? push(child.path) : undefined
                      }
                    >
                      {child.title[currentLang]}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : item.type === "imageHover" ? (
                <Menu.Item key={item.key} title={item.title[currentLang]}>
                  <ImageHoverModal triggerImg={item.title[currentLang]} />
                </Menu.Item>
              ) : (
                <Menu.Item
                  key={item.key}
                  title={item.title[currentLang]}
                  onClick={() => (item.path ? push(item.path) : undefined)}
                >
                  {item.title[currentLang]}
                </Menu.Item>
              )
            )}
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
