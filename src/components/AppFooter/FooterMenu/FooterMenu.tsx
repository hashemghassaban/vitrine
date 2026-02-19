import type { FC } from "react";
import { Menu } from "antd";
import useNavigation from "../../../hooks/useHistory";
import "./FooterMenu.less";
import type { MenuLinkView } from "../../../models/views/indexView";
import { useLanguage } from "../../../contexts/useLanguage";

interface FooterMenuProps {
  title: string;
  links?: MenuLinkView[];
}

export const FooterMenu: FC<FooterMenuProps> = ({ title, links }) => {
  const { Item } = Menu;
  const { push } = useNavigation();
  const { currentLang } = useLanguage();

  return (
    <div className="footer-menu">
      <div className="footer-menu__title">{title}</div>
      <Menu>
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
