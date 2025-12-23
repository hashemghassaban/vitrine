import { type FC, useState } from "react";
import { Col, Divider, Modal, Row } from "antd";
import "./ImageHoverModal.less";
import img from "../../../assets/header/hoverm-modal/img.png";
interface Props {
  triggerImg: string;
}

export const ImageHoverModal: FC<Props> = ({ triggerImg }) => {
  const [open, setOpen] = useState(false);

  const menuCategories = [
    {
      icon: img,
      title: "عنوان",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img,
      title: "عنوان",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img,
      title: "عنوان",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img,
      title: "عنوان",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img,
      title: "عنوان",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img,
      title: "عنوان",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
    {
      icon: img,
      title: "عنوان",
      items: ["زیرعنوان", "زیرعنوان", "زیرعنوان", "زیرعنوان"],
    },
  ];

  return (
    <div
      className="img-hover-trigger"
      onClick={() => setOpen(!open)}
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
            <p> محصول را انتخاب کنید</p>
          </Row>

          <Divider className="modal-divider" />

          <Row className="menu-grid">
            {menuCategories.map((category, index) => (
              <Col span={24} key={index} className="menu-column">
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
              </Col>
            ))}
          </Row>
        </div>
      </Modal>
    </div>
  );
};
