import { type FC } from "react";

import "./ExploreSection.less";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslate } from "../../../../i18n/useTranslate";

export const ExploreSection: FC = () => {
  const { t } = useTranslate();
  return (
    <section className="explore">
      <div className="explore__content">
        <h2 className="explore__title">{t("site.footerblock1")}</h2>
        <p className="explore__subtitle">{t("site.footerblock2")}</p>
        <a className="explore__more" href="">
          بیشتر
                    <ArrowLeftOutlined></ArrowLeftOutlined>

        </a>
      </div>
    </section>
  );
};
