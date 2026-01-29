import { type CSSProperties, type FC, type ReactNode } from "react";
import "./Container.less";

interface ContainerProps {
  fluid?: boolean;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export const Container: FC<ContainerProps> = (props) => {
  const { fluid, className = "", children, style } = props;

  return (
    <div
      className={`container ${fluid ? "container--fluid" : ""} ${className}`}
       style={style}
    >
      {children}
    </div>
  );
};
