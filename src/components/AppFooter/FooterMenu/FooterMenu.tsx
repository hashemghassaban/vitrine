import type { FC } from "react";
import { Menu } from "antd";
import useNavigation from "../../../hooks/useHistory";
import "./FooterMenu.less";
import type { MenuLinkView } from "../../../models/views/indexView";
import { useLanguage } from "../../../contexts/useLanguage";

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
  return (
    <div className="footer-menu">
      <div className="footer-menu__title">{title}</div>
         <Menu
      className="app-footer__link-mobile"
          mode="inline"
              selectable={false}
    >
      {/* بخش چپ */}
      {leftLinks.length > 0 && (
        <Menu.SubMenu key="left" title="دسترسی ها">
          {leftLinks.map((item) => (
            <Menu.Item
              key={item.id}
              onClick={() => (item.url ? push(`/${currentLang}${item.url}`) : undefined)}
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      )}

      {/* بخش راست */}
      {rightLinks.length > 0 && (
        <Menu.SubMenu key="right" title="خدمات ما">
          {rightLinks.map((item) => (
            <Menu.Item
              key={item.id}
              onClick={() => (item.url ? push(`/${currentLang}${item.url}`) : undefined)}
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      )}
    </Menu>

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
