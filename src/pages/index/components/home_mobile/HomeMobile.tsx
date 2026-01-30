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
import type { Language } from "../../../../i18n/LanguageType";
import { useTranslate } from "../../../../i18n/useTranslate";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "محصولات",
    children: [
      { key: "1", label: "وان" },
      { key: "2", label: "اکسسوری" },
      { key: "3", label: "روشویی" },
      { key: "4", label: "سردوش" },
    ],
  },
  {
    key: "sub2",
    label: "برندها",
  },
  {
    key: "sub3",
    label: "کاتالوگ ها",
  },
  {
    key: "sub4",
    label: "خدمات",
    children: [
      { key: "1", label: "وان" },
      { key: "2", label: "اکسسوری" },
      { key: "3", label: "روشویی" },
      { key: "4", label: "سردوش" },
    ],
  },
  {
    key: "sub5",
    label: "پروژه ها",
  },
  {
    key: "sub6",
    label: "نمایندگی ها",
  },
  {
    key: "sub7",
    label: "درباره",
  },
  {
    key: "sub8",
    label: "تماس",
  },
];

const HomeMobile: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { t } = useTranslate();
  const handleLanguageChange = () => {
    const newLang: Language =
      currentLang == "en" ? "fa" : currentLang == "fa" ? "ar" : "en";
    setCurrentLang(newLang);
  };

  const { currentLang, setCurrentLang } = useLanguage();
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
            <p className="text_mobile1"> محصولات لوکس </p>
            <p className="text_mobile2">شوروم ساختمانی ویترین </p>
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
                suffix={<img src={search} alt={search} />}
              />
              <Menu
                mode="inline"
                items={items}
                openKeys={openKeys}
                inlineIndent={0}
                onOpenChange={handleOpenChange}
                expandIcon={renderExpandIcon}
                className="custom-menu-mobile"
              />
            </div>
          </Drawer>
        </Col>
      </Row>
    </div>
  );
};

export default HomeMobile;
