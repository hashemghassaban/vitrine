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
import { LANGUAGES, type Language } from "../../i18n/languageType";
import type { IndexDataView } from "../../models/views/indexView";
import { useTranslate } from "../../i18n/useTranslate";
import useIndex from "../../hooks/index/useIndex";

interface AppHeaderProps {
  noBackground?: boolean;
  title?: String;
  text?: String;
  style?: boolean;
  categoryBackground?: string;
  noBackgroundProducts?: boolean;
}

interface MenuItem {
  key: string;
  label: string;
}
const langLabels: Record<Language, string> = {
  en: "En",
  fa: "فا",
  ar: "عر",
};
export const AppHeader: FC<AppHeaderProps> = ({
  noBackground,
  noBackgroundProducts,
  title,
  text,
  style = true,
  categoryBackground,
}) => {
  const { currentLang } = useLanguage();

  const { getIndex } = useIndex(currentLang);

  const { push } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setIndexData] = useState<IndexDataView | null>(null);
  const { t } = useTranslate();
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [brands, setBrands] = useState<BrandView[]>([]);
  const { getList } = useBrands(currentLang);
  const fetchIndex = async () => {
    const { success, data } = await getIndex();
    if (success && data) {
      setIndexData(data);
    }
  };
  useEffect(() => {
    fetchIndex();
  }, [currentLang]);
  useEffect(() => {
    // تابعی که هنگام اسکرول اجرا می‌شود
    const handleScroll = () => {
      // اگر اسکرول عمودی بیشتر از ۵۰ پیکسل بود، وضعیت را true کن
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsMenuOpen(false)
      }
    };

    // اضافه کردن رویداد اسکرول به پنجره
    window.addEventListener('scroll', handleScroll);

    // حذف رویداد هنگام unmount شدن کامپوننت برای جلوگیری از نشت حافظه
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const renderMenuItems = (items: any[]) => {
    return items.map((item) => {
      // ✅ اگر type برابر imageHover بود
      if (item.type === "imageHover") {
        const productChildren = buildProductChildren(data);

        return (
          <Menu.SubMenu
            key={item.key}
            title={item.title[currentLang]}
          >
            {productChildren.map((child) => (
              <Menu.Item
                key={child.key}
                onClick={() =>
                  push(`/${currentLang}/${child.key}`)
                }
              >
                {child.label}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        );
      }

      // ✅ حالت معمولی SubMenu
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={item.title[currentLang]}
          >
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }

      // ✅ آیتم ساده
      return (
        <Menu.Item
          key={item.key}
          onClick={() =>
            item.path
              ? push(`/${currentLang}/${item.path}`)
              : undefined
          }
        >
          {item.title[currentLang]}
        </Menu.Item>
      );
    });
  };
  const handleLanguageChange = (newLang: Language) => {
    if (!currentLang) return;
    const newPath = location.pathname.replace(`/${currentLang}`, `/${newLang}`);
    window.location.href = newPath;
  };
  const buildProductChildren = (
    data: IndexDataView | null,
  ): MenuItem[] => {
    if (!data?.product_categories) return [];

    return data.product_categories.map((cat) => ({
      key: `products?category=${cat.slug}`,
      label: cat.title,
    }));
  };
  const handleSearch = () => {
    const urlFriendlyTitle = searchQuery.replace(/ /g, '-');

    if (searchQuery.trim()) {
      push(`/${currentLang}/search?s=${encodeURIComponent(urlFriendlyTitle)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };
  const headerBackground = {
    backgroundImage: `url(${categoryBackground && categoryBackground.trim()
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
              title: {
                en: "All Brands",
                fa: "همه برندها",
                ar: "جميع العلامات التجارية",
              },
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
      title: { en: "Catalogues", fa: "کاتالوگ‌ها", ar: "الكتالوجات" },
      path: "catalogue",
    },
    {
      key: "menu-projects",
      title: { en: "Projects", fa: "پروژه‌ها", ar: "المشاريع" },
      path: "project",
    },
    {
      key: "menu-services",
      title: { en: "Services", fa: "خدمات", ar: "الخدمات" },
      path: "services",
    },

    {
      key: "menu-representation",
      title: { en: "Representation", fa: "نمایندگی‌ها", ar: "الوكلاء" },
      path: "representation",
    },
    {
      key: "menu-about",
      title: { en: "About", fa: "درباره ما", ar: "من نحن" },
      path: "about",
    },
    {
      key: "menu-contact",
      title: { en: "Contact", fa: "تماس با ما", ar: "اتصل بنا" },
      path: "contactBranch",
    },
  ];

  return (
    <>
      <div className={`header-wrapper ${searchOpen ? "blur-active" : ""}`}>
        <Container
          className={`app-header_container ${isScrolled ? 'freez' : ''} ${noBackground ? "no-bg" : noBackgroundProducts ? "backgroundColor" : ""}`}
          style={headerBackground}
        >
          <Row>
            <div className="home__img">
              <img
                src={img}
                alt="vitrine"
                onClick={() => push(`/${currentLang}`)}
              />
            </div>
            <img
              className="search__img"
              onClick={() => setSearchOpen(true)}
              src={search}
              alt={search}
            />
            <Menu
              className={`app-header__menu-Text ${isMenuOpen ? 'active' : ''}`}
              mode="horizontal"
              triggerSubMenuAction="hover"
              selectable={false}
              overflowedIndicator={null}
            >
              <Menu.SubMenu
                key="b"
                title={langLabels[currentLang]} // نمایش label زبان فعلی
                className="En_text"
                popupClassName="lang-submenu-popup"
              >
                {LANGUAGES.filter((lang) => lang !== currentLang) // حذف زبان فعلی از گزینه‌ها
                  .map((lang) => (
                    <Menu.Item
                      key={`lang-${lang}`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {langLabels[lang]}
                    </Menu.Item>
                  ))}
              </Menu.SubMenu>
            </Menu>

            <img className={`en_img ${isMenuOpen ? 'active' : ''}`} src={en} alt={en} />
            <div className="burgerMenu">
              <button
                className={`menu-toggle-btn ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

            </div>
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
                        child.path
                          ? push(`/${currentLang}/${child.path}`)
                          : undefined
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
                  onClick={() =>
                    item.path ? push(`/${currentLang}/${item.path}`) : undefined
                  }
                >
                  {item.title[currentLang]}
                </Menu.Item>
              ),
            )}
          </Menu>
          {style ? (
            <div className="box-page">
              <h1 className="title-page">{title}</h1>
              <p className="text-page">{text}</p>
            </div>
          ) : (
            <div className="box-page2">
              <p className="text-page2">{title}</p>
              <h1 className="title-page2">{text}</h1>
            </div>
          )}

              {searchOpen && <div className="page-overlay" />}
      {searchOpen && (
        <div className="search-box">
          <Input
            placeholder={
              currentLang === "fa"
                ? "جستجو"
                : currentLang === "en"
                  ? "Search"
                  : "يبحث"
            }
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
      <div className={`side-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>

        <div className="side-menu-search">
          <Input
            className="search_box_mobile"
            placeholder={t("local_search")}
            suffix={<img onClick={handleSearch} src={search} alt={search} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch}

          />


        </div>
        <Menu
          className="app-header__menu-slide"
          mode="inline"
          selectable={false}
        >
          {renderMenuItems(menuItems)}
        </Menu>
      </div>
        </Container>
      </div>
  
    </>
  );
};
