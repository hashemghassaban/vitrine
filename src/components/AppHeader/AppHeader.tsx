import { useEffect, useState, type FC } from "react";
import { Input, Menu, Row } from "antd";
import { Container } from "../Container/Container";
import useNavigation from "../../hooks/useHistory";
import img from "../../assets/header/header.png";
import search from "../../assets/header/search.png";
import en from "../../assets/header/en.png";
import defaultBg from "../../assets/header/back.png";
import "./AppHeader.less";
import { ImageHoverModal } from "./ImageHoverModal/ImageHoverModal";
import { useLanguage } from "../../contexts/useLanguage";
import useBrands from "../../hooks/brand/useBrands";
import type BrandView from "../../models/views/brandView";
import type { Language } from "../../i18n/languageType";

interface AppHeaderProps {
  noBackground?: boolean;
  title?: String;
  text?: String;
  style?: boolean;
  categoryBackground?: string;
}
export const AppHeader: FC<AppHeaderProps> = ({
  noBackground,
  title,
  text,
  style = true,
  categoryBackground,
}) => {
  const { push } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentLang } = useLanguage();
  const [brands, setBrands] = useState<BrandView[]>([]);
  const { getList } = useBrands(currentLang);
  const fetchIndex = async () => {
    const { success, data } = await getList();
    if (success && data) {
      setBrands(data);
    } 
  };
  useEffect(() => {
    fetchIndex();
  }, [currentLang]);

  const handleLanguageChange = (newLang: Language) => {
    if (!currentLang) return;
    const newPath = location.pathname.replace(
      `/${currentLang}`,
      `/${newLang}`
    );
    push(newPath);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      push(`/${currentLang}/search?s=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };
  const headerBackground = {
    backgroundImage: `url(${
      categoryBackground && categoryBackground.trim()
        ? categoryBackground
        : defaultBg
    })`,
  };

  const menuItems = [
    {
      key: "menu-products",
      title: { en: "Products", fa: "محصولات", ar: "المنتجات" },
      type: "imageHover",
    },
    {
      key: "menu-brands",
      title: { en: "Brands", fa: "برندها", ar: "العلامات التجارية" },
      children:
        brands?.length > 0
          ? [
              {
                key: "menu-brands-all",
                title: { en: "All Brands", fa: "همه برندها", ar: "جميع العلامات التجارية" },
                path: "brands",
              },

              ...brands.map((brand, index) => ({
                key: `brand-${brand.title}-${index}`,
                title: {
                  en: brand.title,
                  fa: brand.title,
                  ar: brand.title,
                },
                path: `brandProducts/${brand.id}`,
                image: brand.image,
              })),
            ]
          : [
              {
                key: "menu-brands-main",
                title: { en: "Brands", fa: "برندها", ar: "العلامات التجارية" },
                path: "brands",
              },
            ],
    },
     {
      key: "menu-catalogues",
      title: { en: "Callections", fa: "کالکشن ها", ar: "الکالکشن" },
      path: "collections",
    },
    {
      key: "menu-catalogues",
      title: { en: "Catalogues", fa: "کاتالوگ‌ها", ar: "الكتالوجات" },
      path: "catalogue",
    },
    {
      key: "menu-services",
      title: { en: "Services", fa: "خدمات", ar: "الخدمات" },
      path: "services",
    },
    {
      key: "menu-projects",
      title: { en: "Projects", fa: "پروژه‌ها", ar: "المشاريع" },
      path: "project",
    },
    {
      key: "menu-representation",
      title: { en: "Representation", fa: "نمایندگی‌ها", ar: "الوكلاء" },
      path: "representation",
    },
    {
      key: "menu-about",
      title: { en: "About", fa: "درباره", ar: "من نحن" },
      path: "about",
    },
    {
      key: "menu-contact",
      title: { en: "Contact", fa: "تماس", ar: "اتصل بنا" },
      path: "contactBranch",
    },
  ];

  return (
    <>
      <div className={`header-wrapper ${searchOpen ? "blur-active" : ""}`}>
        <Container
          className={`app-header_container ${noBackground ? "no-bg" : ""}`}
          style={headerBackground}
        >
          <Row>
            <div className="home__img">
              <img src={img} alt="vitrine" onClick={() => push(`/${currentLang}`)} />
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
                title={
                  currentLang === "fa" ? "فا" : currentLang === "en" ? "En" : "عر"
                }
                className="En_text"
                popupClassName="lang-submenu-popup"
              >
                <Menu.Item key="b-1" onClick={() => handleLanguageChange("en")}>
                  En
                </Menu.Item>
                <Menu.Item key="b-2" onClick={() => handleLanguageChange("fa")}>
                  فا
                </Menu.Item>
                <Menu.Item key="b-3" onClick={() => handleLanguageChange("ar")}>
                  عر
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
                        child.path ? push(`/${currentLang}/${child.path}`) : undefined
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
                  onClick={() => (item.path ? push(`/${currentLang}/${item.path}`) : undefined)}
                >
                  {item.title[currentLang]}
                </Menu.Item>
              ),
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
          <Input
            placeholder={currentLang === "fa" ? "جستجو" : currentLang === "en" ? "Search" : "يبحث"}
            className="search-input"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch}
          />

          <button className="close-btn" onClick={() => setSearchOpen(false)}>
            ✕
          </button>
        </div>
      )}
    </>
  );
};
