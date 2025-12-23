import React, { type CSSProperties, type ReactNode } from "react";
import { Button, type ButtonProps } from "antd";
import "./AppButton.less";

interface AppButtonProps {
  type?: ButtonProps["type"];
  className?: string;
  children?: ReactNode;
  onclick?: () => void;
  style?: CSSProperties;
}

export const AppButton: React.FC<AppButtonProps> = ({
  type,
  className = "",
  children,
  onclick,
  style,
}) => {
  return (
    <Button
      onClick={onclick}
      type={type}
      className={`app-button ${className}`}
      style={style}
    >
      {children}
    </Button>
  );
};
