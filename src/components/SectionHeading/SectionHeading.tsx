import React, { type FC } from 'react';
import "./SectionHeading.less";

interface SectionHeadingProps {
  heading: React.ReactNode;
  subHeading?: React.ReactNode;
  className?: string;
}

const defaultSubHeading = "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore.";

export const SectionHeading: FC<SectionHeadingProps> = ({ heading, subHeading = defaultSubHeading, className = "" }) => {
  return (
    <div className={`section-heading ${className}`}>
      <h1 className="section-heading__main">{heading}</h1>
      <p className="section-heading__sub">{subHeading}</p>
    </div>
  )
}
