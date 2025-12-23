import { type FC, type ReactNode } from "react";
import "./Container.less";

interface ContainerProps {
  fluid?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Container: FC<ContainerProps> = (props) => {
  const { fluid, className = "", children } = props;

  return (
    <div
      className={`container ${fluid ? "container--fluid" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
