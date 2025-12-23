import type { FC } from 'react';
import { Menu } from 'antd';
import useNavigation  from "../../../hooks/useHistory";
import "./FooterMenu.less";

interface MenuItem {
  url: string;
  text: string;
}

interface FooterMenuProps {
  title: string;
  menu: MenuItem[];
}

export const FooterMenu: FC<FooterMenuProps> = ({ title, menu }) => {
  const { Item } = Menu;
   const { push } = useNavigation();
  return (
    <div className="footer-menu">
      <h2 className="footer-menu__title">{title}</h2>
      <Menu>
        {menu.map((item, index) => (
          <Item  key={title + index}>
          <a  className="footer-menu__item" href={`#${item.url}`}   onClick={() => push(item.url)}> {item.text}</a>
          </Item>
        ))}
      </Menu>
    </div>
  )
}
