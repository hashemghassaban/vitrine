import type { FC } from "react";
import "./ScrollDown.less";
import { useTranslate } from "../../../../../i18n/useTranslate";
import { useIsMobile } from "../../../../../helpers/useIsMobile";

interface ScrollDownProps {
  scrollAmount?: number; // اختیاری، می‌تونی مقدار px هم بدی
}

export const ScrollDown: FC<ScrollDownProps> = ({
  scrollAmount,
}) => {
  const { t } = useTranslate();
    const isMobile = useIsMobile();


  const scrollToContent = () => {
    window.scrollBy({
      top: scrollAmount ?? window.innerHeight - (isMobile ? 200 : 130), // اگر scrollAmount داده نشده، از 100vh استفاده می‌کنه
      behavior: "smooth",
    });
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
