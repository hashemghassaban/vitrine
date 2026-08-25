import { useEffect, useState, type FC } from "react";
import { Row, Input, Menu } from "antd";
import { Container } from "../../../../components/Container/Container";
import useNavigation from "../../../../hooks/useHistory";
import img from "../../../../assets/header/header.png";
import search from "../../../../assets/header/search.png";
import en from "../../../../assets/header/en.png";
import { useLanguage } from "../../../../contexts/useLanguage";
import "./AppHeaderIndex.less";

import useIndex from "../../../../hooks/index/useIndex";
import type { IndexDataView } from "../../../../models/views/indexView";
import { LANGUAGES, type Language } from "../../../../i18n/languageType";
import { useTranslate } from "../../../../i18n/useTranslate";

export const AppHeaderIndex: FC = () => {
  const { push } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { currentLang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setIndexData] = useState<IndexDataView | null>(null);
  const { t } = useTranslate();
  const [isScrolled, setIsScrolled] = useState(false);
  interface MenuItem {
    key: string;
    label: string;
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const langLabels: Record<Language, string> = {
    en: "En",
    fa: "FA",
    ar: "AR",
  };

  const languageMenuItems = [
    {
      key: "b",
      label: langLabels[currentLang],
      className: "En_text",
      popupClassName: "lang-submenu-popup",
      children: LANGUAGES.filter((lang) => lang !== currentLang).map((lang) => ({
        key: `lang-${lang}`,
        label: langLabels[lang],
        onClick: () => handleLanguageChange(lang),
      })),
    },
  ];

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

  const { getIndex } = useIndex(currentLang);
  const fetchIndex = async () => {
    const { success, data } = await getIndex();
    if (success && data) {
      setIndexData(data);
    }
  };
  useEffect(() => {
    setIndexData(null);
    fetchIndex();
  }, [currentLang]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (lang: Language) => {
    push(`/${lang}`);
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      push(`/${currentLang}/search?s=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
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
      children: data?.brands?.length
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

          ...data.brands.map((brand, index) => ({
            key: `brand-${brand.title}-${index}`,
            title: {
              en: brand.title,
              fa: brand.title,
              ar: brand.title,
            },
            path: `brand-detail/${encodeURIComponent(brand?.id)}`,
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
      title: { en: "Agents", fa: "نمایندگی‌ها", ar: "الوكلاء" },
      path: "agents",
    },
    {
      key: "menu-about",
      title: { en: "About", fa: "درباره ما", ar: "من نحن" },
      path: "about",
    },
    {
      key: "menu-contact",
      title: { en: "Contact", fa: "تماس با ما", ar: "اتصل بنا" },
      path: "contact",
    },
  ];

  const buildProductChildren = (
    data: IndexDataView | null,
  ): MenuItem[] => {
    if (!data?.product_categories) return [];

    return data.product_categories.map((cat) => ({
      key: `products/category/${cat.id}`,
      label: cat.title,
    }));
  };

  const renderMenuItems = (items: any[]) => {
    return items.flatMap((item) => {
      // ✅ اگر type برابر imageHover بود
      if (item.type === "imageHover") {
        const productChildren = buildProductChildren(data);
        return {
          key: item.key,
          label: item.title[currentLang],
          children: productChildren.map((child) => ({
            key: child.key,
            label: child.label,
            onClick: () => push(`/${currentLang}/${child.key}`),
          })),
        };
      }

      // ✅ حالت معمولی SubMenu
      if (item.children && item.children.length > 0) {
        return {
          key: item.key,
          label: item.title[currentLang],
          children: item.children.map((child: any) => ({
            key: child.key,
            label: child.title[currentLang],
            onClick: () =>
              child.path ? push(`/${currentLang}/${child.path}`) : undefined,
          })),
        };
      }

      // ✅ آیتم ساده
      return {
        key: item.key,
        label: item.title[currentLang],
        onClick: () =>
          item.path ? push(`/${currentLang}/${item.path}`) : undefined,
      };
    });
  };



  return (
    <Container className={`app-header_containers ${isScrolled ? 'freez' : ''}`}>
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
          src={search}
          alt={search}
          onClick={() => setSearchOpen(true)}
        />
        <Menu
          className={`app-header__menu-Text ${isMenuOpen ? 'active' : ''}`}
          mode="horizontal"
          triggerSubMenuAction="hover"
          selectable={false}
          overflowedIndicator={null}
          items={languageMenuItems}
        />
        <img className={`en_img ${isMenuOpen ? 'active' : ''}`} src={en} alt={en} />
        <div className={`header_en_content ${isMenuOpen ? 'active' : ''}`} >
          <p className="header_en_text">
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


        </div>
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
        items={renderMenuItems(menuItems)}
      />
      {searchOpen && <div className="page-overlay" />}
      {searchOpen && (
        <div className="search-box">
          <Input
            placeholder={t("local_search")}
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
          items={renderMenuItems(menuItems)}
        />
      </div>
    </Container>
  );
};
