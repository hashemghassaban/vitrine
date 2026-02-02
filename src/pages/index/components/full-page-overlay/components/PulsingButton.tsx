import React, { useState, type CSSProperties } from "react";
import { Popover, Typography } from "antd";
import "./PulsingButton.less";
import image10 from "../../../../../assets/full-page-overlay/image10.jpg";
import { AppButton } from "../../../../../components/AppButton/AppButton";
import { useIndexContext } from "../../../../../contexts/indexContext";
import useNavigation from "../../../../../hooks/useHistory";
import { useTranslate } from "../../../../../i18n/useTranslate";

const { Title } = Typography;

interface PulsingButtonProps {
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  product_id?: number;
}

const PulsingButton: React.FC<PulsingButtonProps> = ({
  style,
  className = "",
  onClick,
  product_id,
}) => {
  const [open, setOpen] = useState(false);
  const { indexData } = useIndexContext();
  const data = indexData?.product_categories.find(
    (product) => product.id == product_id,
  );
  const { push } = useNavigation();
  const { t } = useTranslate();

  const content = (
    <div
      className="content_style"
      style={{
        backgroundImage: `url(${image10})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      />
      <Title
        level={4}
        style={{
          position: "absolute",
          top: "0px",
          left: 0,
          right: 0,
          padding: "30px",
          color: "white",
          zIndex: 2,
          margin: 0,
        }}
      >
        <a href="#" style={{ color: "#fff" }}>
          {t("local_vitrinePlus")}
        </a>
      </Title>
      <AppButton
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          backgroundColor: "transparent",
          color: "white",
        }}
        onclick={() => push(`${data?.children[0]?.icon_link}`)}
      >
        {t("local_view")}
      </AppButton>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="hover"
      open={open}
      onOpenChange={setOpen}
      placement="right"
      styles={{ body: { padding: 0 } }}
      arrow={false}
    >
      <div style={style}>
        <div className={`button-container ${className}`}>
          <button className="pulse-button" onClick={onClick}>
            <span className="plus-icon">+</span>
          </button>
          <div className="pulse-ring"></div>
        </div>
      </div>
    </Popover>
  );
};

export default PulsingButton;
