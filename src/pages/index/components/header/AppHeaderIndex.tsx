import { useState, type FC } from "react";
import { Input, Menu, Row } from "antd";
import { Container } from "../../../../components/Container/Container";
import useNavigation from "../../../../hooks/useHistory";
import img from "../../../../assets/header/header.png";
import search from "../../../../assets/header/search.png";
import en from "../../../../assets/header/en.png";
import { ImageHoverModal } from "../../../../components/AppHeader/ImageHoverModal/ImageHoverModal";
import { useLanguage } from "../../../../contexts/useLanguage";
import "./AppHeaderIndex.less";

export const AppHeaderIndex: FC = () => {
  const { push } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { currentLang, setCurrentLang } = useLanguage();
  const isRtl = currentLang === "fa";
  type Language = "en" | "fa";

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  return (
    <Container className="app-header_containers">
      <Row>
        <div className="home__img">
          <img src={img} alt="vitrine" />
        </div>

        <img
          className="search__img"
          src={search}
          alt={search}
          onClick={() => setSearchOpen(true)}
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
        <Menu.Item key="products" title="محصولات">
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

        <Menu.Item key="about" title="درباره" onClick={() => push("/about")}>
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
      {searchOpen && <div className="page-overlay" />}
      {searchOpen && (
        <div className="search-box">
          <Input placeholder="جستجو" className="search-input" autoFocus />

          <button className="close-btn" onClick={() => setSearchOpen(false)}>
            ✕
          </button>
        </div>
      )}
    </Container>
  );
};
