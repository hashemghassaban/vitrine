import { type FC, useEffect, useState } from "react";
import { Divider, Modal, Row } from "antd";
import { useTranslate } from "../../../i18n/useTranslate";
import useNavigation from "../../../hooks/useHistory";
import "./ImageHoverModal.less";
import type { IndexDataView } from "../../../models/views/indexView";
import useIndex from "../../../hooks/index/useIndex";
import { useLanguage } from "../../../contexts/useLanguage";
interface Props {
  triggerImg: string;
}

export const ImageHoverModal: FC<Props> = ({ triggerImg }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslate();
  const [data, setIndexData] = useState<IndexDataView | null>(null);
  const { currentLang } = useLanguage();
  const { push } = useNavigation();
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
            {data?.product_categories.map((category, index) => (
              <div key={index} className="menu-column">
                <h3 className="menu-column-title"
                  onClick={() => push(`/${currentLang}/products/category/${category.id}`)}
                >
                  <img src={category?.icon_link} alt="icon" />
                  {category.title}
                </h3>

                <ul className="menu-items">
                  {category.children.map((item, i) => (
                    <li key={i}>
                      <a className="menu-item-link" onClick={() =>
                        push(`/${currentLang}/products/category/${item.id}`)
                      }>
                        {item?.title}
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
