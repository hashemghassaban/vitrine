import React, { useState, useEffect } from "react";
import { Row, Col, Input, Drawer, Menu, type MenuProps } from "antd";
import {
  CloseOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import en from "../../../../assets/header/en.png";
import "./HomeMobile.less";
import img from "../../../../assets/header/mobile.png";
import logo from "../../../../assets/header/header.png";
import { useLanguage } from "../../../../contexts/useLanguage";
import search from "../../../../assets/header/search.png";
import PulseCircleButton from "../full-page-overlay/components/PulsingButton";
import type { Language } from "../../../../i18n/languageType";
import useNavigation from "../../../../hooks/useHistory";
import { useTranslate } from "../../../../i18n/useTranslate";
import useIndex from "../../../../hooks/index/useIndex";
import type { IndexDataView } from "../../../../models/views/indexView";
import useBrands from "../../../../hooks/brand/useBrands";
import type BrandView from "../../../../models/views/brandView";

type MenuItem = Required<MenuProps>["items"][number];

type TranslatedLabel = Record<Language, string>;
const buildProductChildren = (
  data: IndexDataView | null,
): MenuItem[] => {
  if (!data?.product_categories) return [];

  return data.product_categories.map((cat) => ({
    key: `products?category=${cat.slug}`,
    label: cat.title,
  }));
};
const buildBrandChildren = (
  data: BrandView[] | null,
): MenuItem[] => {
  if (!data) return [];

  return data?.map((cat) => ({
    key: `brandProducts/${cat.id}`,
    label: cat.title,
  }));
};
const itemsText: Record<string, TranslatedLabel> = {
  products: { en: "Products", fa: "محصولات", ar: "المنتجات" },
  brands: { en: "Brands", fa: "برندها", ar: "العلامات التجارية" },
  catalogues: { en: "Catalogues", fa: "کاتالوگ‌ها", ar: "الكتالوجات" },
  services: { en: "Services", fa: "خدمات", ar: "الخدمات" },
  representations: { en: "Representation", fa: "نمایندگی‌ها", ar: "الوكلاء" },
  about: { en: "About", fa: "درباره", ar: "من نحن" },
  projects: { en: "Projects", fa: "پروژه‌ها", ar: "المشاريع" },
  contact: { en: "Contact", fa: "تماس", ar: "اتصل بنا" },
};

const getMenuItems = (lang: Language, data: IndexDataView | null , brand: BrandView[] | null): MenuItem[] => [
  {
    key: "products",
    label: itemsText.products[lang],
    children: data
      ? buildProductChildren(data)
      : []
  },
  {
    key: "brands",
    label: itemsText.brands[lang],
       children: brand
      ? buildBrandChildren(brand)
      : []
  },
  {
    key: "catalogue",
    label: itemsText.catalogues[lang],
  },
  {
    key: "services",
    label: itemsText.services[lang],
  },
  {
    key: "project",
    label: itemsText.projects[lang],
  },
  {
    key: "representation",
    label: itemsText.representations[lang],
  },
  {
    key: "about",
    label: itemsText.about[lang],
  },
  {
    key: "contactBranch",
    label: itemsText.contact[lang],
  },
];

const HomeMobile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { t } = useTranslate();
  const { push } = useNavigation();
  const [data, setIndexData] = useState<IndexDataView | null>(null);
  const { currentLang, setCurrentLang } = useLanguage();
  const { getIndex } = useIndex(currentLang);
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState<BrandView[]>([]);
  const { getList } = useBrands(currentLang);
  const fetchBrand = async () => {
    const { success, data } = await getList();
    if (success && data) {
      setBrands(data);
    } 
  };
  const fetchIndex = async () => {
    const { success, data } = await getIndex();
    if (success && data) {
      setIndexData(data);
    }
  };

  useEffect(() => {
    setIndexData(null);
    fetchIndex();
    fetchBrand();
  }, [currentLang]);


  const handleSearch = () => {
    if (searchQuery.trim()) {
      push(`/${currentLang}/search?s=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };


  const handleLanguageChange = () => {
    const newLang: Language =
      currentLang == "en" ? "fa" : currentLang == "fa" ? "ar" : "en";
    setCurrentLang(newLang);
    const newPath = location.pathname.replace(
      `/${currentLang}`,
      `/${newLang}`
    );
    push(newPath);
  };


  const [openKeys, setOpenKeys] = useState<string[]>(["sub1"]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const renderExpandIcon = (props: { isOpen?: boolean }) => {
    const isOpen = props.isOpen ?? false;
    return isOpen ? (
      <MinusOutlined style={{ color: "white" }} />
    ) : (
      <PlusOutlined style={{ color: "white" }} />
    );
  };

  const imageButtons = [{ id: 1, x: 50, y: 45 }];

  if (windowWidth > 768) {
    return null;
  }

  return (
    <div className="mobile-showcase">
      <Row justify="center">
        <Col span={24} className="header_mobile">
          <img className="header_mobile_logo" src={logo} alt="logo" />
          <MenuOutlined
            className="header_mobile_icon"
            onClick={() => setOpen(true)}
          />
        </Col>

        <Col span={24} className="image_mobile">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={img}
              alt="product"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <p className="text_mobile1">{t("local_luxuryProducts")} </p>
            <p className="text_mobile2">{t("local_vitrineBuildingShowroom")} </p>
            {imageButtons.map((button) => (
              <PulseCircleButton
                key={button.id}
                style={{
                  position: "absolute",
                  left: `${button.x}%`,
                  top: `${button.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              />
            ))}
          </div>

          <Drawer
            mask={false}
            placement="left"
            open={open}
            onClose={() => setOpen(false)}
            closable={false}
            width={windowWidth > 480 ? "80%" : "85%"}
            className="mobile_drawer"
          >
            <div className="drawer_content">
              <div className="drawer_header">
                <div className="en_box">
                  <p className="en_text_mobile" onClick={handleLanguageChange}>
                    {t("local_currentLang")}
                  </p>
                  <img className="en_img_mobile" src={en} alt={en} />
                </div>
                <CloseOutlined
                  className="en_icon_mobile"
                  onClick={() => setOpen(false)}
                />
              </div>

              <Input
                className="search_box_mobile"
                placeholder={t("local_search")}
                suffix={<img  onClick={handleSearch} src={search} alt={search} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onPressEnter={handleSearch}

              />
              <Menu
                mode="inline"
                items={getMenuItems(currentLang, data, brands)}
                openKeys={openKeys}
                inlineIndent={0}
                onOpenChange={handleOpenChange}
                expandIcon={renderExpandIcon}
                className="custom-menu-mobile"
                onClick={({ key }) => {
                  push(`/${currentLang}/${key}`);
                  setOpen(false);
                }}
              />
            </div>
          </Drawer>
        </Col>
      </Row>
    </div>
  );
};

export default HomeMobile;
