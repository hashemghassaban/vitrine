import type { FC } from "react";
import "./ScrollDown.less";
import { useTranslate } from "../../../../../i18n/useTranslate";

interface ScrollDownProps {
  targetId?: string; // id بخشی که میخوای اسکرول بشه
}

export const ScrollDown: FC<ScrollDownProps> = ({
  targetId = "home-content",
}) => {
  const { t } = useTranslate();

  const scrollToContent = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="scroll-down-wrapper" onClick={scrollToContent}>
      <div className="scroll-down-circle">
        <span className="arrow-icon">.</span>
      </div>
      <span className="scroll-down-text">{t("local_vitrin20years")}</span>
    </div>
  );
};
