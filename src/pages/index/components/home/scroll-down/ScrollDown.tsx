import type { FC } from "react";
import "./ScrollDown.less";

interface ScrollDownProps {
  targetId?: string; // id بخشی که میخوای اسکرول بشه
}

export const ScrollDown: FC<ScrollDownProps> = ({ targetId = "home-content" }) => {
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
  <span className="scroll-down-text">ویترین ۲۰ سال است در کنار شماست</span>
</div>
  );
};
