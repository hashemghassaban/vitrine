import { type FC } from "react";
import { Menu, Row } from "antd";
import { Container } from "../../../../components/Container/Container";

import img from "../../../../assets/header/header.png";
import search from "../../../../assets/header/search.png";
import en from "../../../../assets/header/en.png";

import "./AppHeader.less";
export const AppHeader: FC = () => {
  return (
    <Container className="app-header_container">
      <Row>
        <img className="home__img" src={img} alt={img} />

        <img className="search__img" src={search} alt={search} />
        <p className="En_text">En</p>

        <img className="en_img" src={en} alt={en} />
      </Row>
      <Menu
        className="app-header__menu-home"
        mode="horizontal"
        triggerSubMenuAction="hover"
        selectable={false}
        overflowedIndicator={null}
      >
        <Menu.SubMenu key="products" title="محصولات">
          <Menu.Item key="products-1">عنوان اصلی</Menu.Item>
          <Menu.Item key="products-2"> زیرعنوان</Menu.Item>
          <Menu.Item key="products-3">زیرعنوان</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="b" title=" برندها">
          <Menu.Item key="b-1">عنوان اصلی</Menu.Item>
          <Menu.Item key="b-2">زیرعنوان </Menu.Item>
          <Menu.Item key="b-3">زیرعنوان </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="k" title="کاتالوگ ها">
          <Menu.Item key="k-1">عنوان اصلی</Menu.Item>
          <Menu.Item key="k-2">زیرعنوان </Menu.Item>
          <Menu.Item key="k-3">زیرعنوان </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="kh" title="خدمات">
          <Menu.Item key="kh-1">عنوان اصلی</Menu.Item>
          <Menu.Item key="kh-2">زیرعنوان</Menu.Item>
          <Menu.Item key="kh-3">زیرعنوان</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="projects" title="پروژه‌ها">
          <Menu.Item key="projects-1">عنوان اصلی</Menu.Item>
          <Menu.Item key="projects-2">زیرعنوان</Menu.Item>
          <Menu.Item key="projects-3">زیرعنوان</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="services" title="نمایندگی‌ها">
          <Menu.Item key="services-1">عنوان اصلی</Menu.Item>
          <Menu.Item key="services-2">زیرعنوان</Menu.Item>
          <Menu.Item key="services-3">زیرعنوان</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="about" title="درباره">
          <Menu.Item key="about-1">عنوان اصلی</Menu.Item>
          <Menu.Item key="about-2">زیرعنوان</Menu.Item>
          <Menu.Item key="about-3">زیرعنوان</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="home" title="تماس">
          <Menu.Item key="home-1">عنوان اصلی</Menu.Item>
          <Menu.Item key="home-2">زیرعنوان</Menu.Item>
          <Menu.Item key="home-3">زیرعنوان</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Container>
  );
};
