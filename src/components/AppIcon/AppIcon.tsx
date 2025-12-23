import type { FC, ReactNode } from "react";
import { Avatar } from "antd";
import "./AppIcon.less";

interface AppIconProps {
  icon: ReactNode;
  className?: string;
}

const AppIcon: FC<AppIconProps> = ({ icon, className = "" }) => {
  return <Avatar className={`app-icon ${className}`} icon={icon} />;
};

export default AppIcon;
