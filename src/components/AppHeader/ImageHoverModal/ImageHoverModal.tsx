import { type FC, useState } from "react";
import { Divider, Modal, Row } from "antd";
import { useTranslate } from "../../../i18n/useTranslate";

import "./ImageHoverModal.less";
import img from "../../../assets/header/hoverm-modal/img.png";
import img1 from "../../../assets/header/hoverm-modal/img1.png";

import img2 from "../../../assets/header/hoverm-modal/img2.png";

import img3 from "../../../assets/header/hoverm-modal/img3.png";

import img4 from "../../../assets/header/hoverm-modal/img4.png";

import img5 from "../../../assets/header/hoverm-modal/img5.png";

import img6 from "../../../assets/header/hoverm-modal/img6.png";

import img7 from "../../../assets/header/hoverm-modal/img7.png";
import img8 from "../../../assets/header/hoverm-modal/img8.png";

interface Props {
  triggerImg: string;
}

export const ImageHoverModal: FC<Props> = ({ triggerImg }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslate();

  const menuCategories = [
    {
      icon: img1,
      title: "شیرآلات",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img4,
      title: "زیردوشی",
      items: ["زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img2,
      title: "روشویی",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img5,
      title: "حوله خشک‌کن",
      items: ["زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img3,
      title: "وان",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img6,
      title: " دوش",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img,
      title: "مبلمان سرویس",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },

    {
      icon: img7,
      title: " اکسسوری",
      items: ["زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img8,
      title: "توالت",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
  ];

  return (
    <div
      className="img-hover-trigger"
      onClick={() => setOpen(!open)}
      onMouseEnter={() => setOpen(true)}
    >
      <p> {triggerImg} </p>

      <Modal
        open={open}
        footer={null}
        closable={false}
        maskClosable
        width={"100%"}
        onCancel={() => setOpen(false)}
        className="image-hover-modal"
        styles={{
          content: {
            borderRadius: 0,
            margin: -16,
          },
        }}
      >
        <div className="img-hover-modal-box">
          <Row className="modal-title">
            <p>{t("site.menuhead")}</p>
          </Row>

          <Divider className="modal-divider" />

          <div className="menu-grid">
            {menuCategories.map((category, index) => (
              <div key={index} className="menu-column">
                <h3 className="menu-column-title">
                  <img src={category.icon} alt="icon" />
                  {category.title}
                </h3>

                <ul className="menu-items">
                  {category.items.map((item, i) => (
                    <li key={i}>
                      <a href="#" className="menu-item-link">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
