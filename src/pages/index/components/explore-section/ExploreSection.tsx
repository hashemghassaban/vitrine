import { type FC } from "react";

import "./ExploreSection.less";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const ExploreSection: FC = () => {
  return (
    <section className="explore">
      <div className="explore__content">
        <p className="explore__title">لوکس‌ترین محصولات را کشف کنید</p>
        <p className="explore__subtitle">
          از پروموشن‌های منحصربه‌فرد، ایونت‌های ما و کالکشن‌های جدید مجموعه ما
          با خبر شوید
        </p>
        <p className="explore__subtitle">از پروموشن‌های منحصربه‌فرد</p>
        <a className="explore__more" href="">
          بیشتر
                    <ArrowLeftOutlined></ArrowLeftOutlined>

        </a>
      </div>
    </section>
  );
};
