import type { FC } from "react";
import { Menu } from "antd";
import useNavigation from "../../../hooks/useHistory";
import "./FooterMenu.less";
import type { MenuLinkView } from "../../../models/views/indexView";
import { useLanguage } from "../../../contexts/useLanguage";
import { useTranslate } from "../../../i18n/useTranslate";

interface FooterMenuProps {
  title: string;
  links?: (MenuLinkView & { type?: 'left' | 'right' })[];
}

export const FooterMenu: FC<FooterMenuProps> = ({ title, links }) => {
  const { Item } = Menu;
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  
  // تقسیم‌بندی داده‌ها به دسته‌های چپ و راست
  const leftLinks = (links ?? []).filter((item) => item?.type === 'left');
  const rightLinks = (links ?? []).filter((item) => item?.type === 'right');
    const { t } = useTranslate();

  const menuItems = [];
  if (leftLinks.length > 0) {
    menuItems.push({
      key: "left",
      label: t("local_AccessFooter"),
      children: leftLinks.map((item) => ({
        key: item.id,
        label: item.title,
        onClick: () => {
          if (item.url.indexOf(`${currentLang}/`) >= 0) {
            push(`${item.url}`);
          } else {
            push(`/${currentLang}/${item.url}`);
          }
        },
      })),
    });
  }
  if (rightLinks.length > 0) {
    menuItems.push({
      key: "right",
      label: t("local_OurServicesFooter"),
      children: rightLinks.map((item) => ({
        key: item.id,
        label: item.title,
        onClick: () => {
          if (item.url.indexOf(`${currentLang}/`) >= 0) {
            push(`${item.url}`);
          } else {
            push(`/${currentLang}/${item.url}`);
          }
        },
      })),
    });
  }
  
  return (
    <div className="footer-menu">
      <div className="footer-menu__title">{title}</div>
         <Menu
      className="app-footer__link-mobile"
          mode="inline"
              selectable={false}
              items={menuItems}
    />

      <Menu             className="app-footer__link-desktop"
>
        {links?.map((item, index) => (
          <Item key={title + index}>
            <a
              className="footer-menu__item"
              onClick={() => {
                if (item.url.indexOf(`${currentLang}/`) >= 0) {
                  push(`${item.url}`);
                } else {
                  push(`/${currentLang}/${item.url}`);
                }
              }}
            >
              {item.title}
            </a>
          </Item>
        ))}
      </Menu>
    </div>
  );
};
