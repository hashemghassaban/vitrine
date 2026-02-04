import React from "react";
import { Col, Row } from "antd";
import useNavigation from "../../../../hooks/useHistory";
import "./Blog.less";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AppButton } from "../../../../components/AppButton/AppButton";
import { useLanguage } from "../../../../contexts/useLanguage";
import { useIndexContext } from "../../../../contexts/indexContext";

export const Blog: React.FC = () => {
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { indexData } = useIndexContext();
  const truncateHtml = (html: string, limit: number) => {
    const div = document.createElement("div");
    div.innerHTML = html;

    const text = div.textContent || div.innerText || "";

    if (text.length <= limit) return html;

    return text.substring(0, limit).trim() + "…";
  };
  return (
    <section id="blog" className="blog">
      <Row justify="center" className="first__title">
        <p>آخرین نوشته‌های ویترین</p>
      </Row>
      {indexData?.blog_items.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <Row
            key={item.id}
            className={`blog__Row ${!isEven ? "reverse" : ""}`}
            align="middle"
            gutter={[24, 24]}
          >
            <Col xs={24} lg={13} className="blog__image">
              <a>
                <img src={item.image} alt="blog" />
              </a>
            </Col>

            <Col
              xs={24}
              lg={11}
              className={isEven ? "blog__content" : "blog__content2"}
            >
              <div className={isEven ? "blog__box1" : "blog__box2"}>
                <a className="blog__title">{item.title}</a>

                <p
                  className="blog__text"
                  dangerouslySetInnerHTML={{
                    __html: truncateHtml(item.content, 200),
                  }}
                />

                <a
                  className="blog__more"
                  onClick={() => push(`/${currentLang}/blog/${item.id}`)}
                >
                  خواندن مقاله <ArrowLeftOutlined />
                </a>
              </div>
            </Col>
          </Row>
        );
      })}

      <Row justify="center">
        <AppButton
          className="blog__Button"
          onclick={() => push(`/${currentLang}/blog`)}
        >
          مقاله‌های بعدی
        </AppButton>
      </Row>
    </section>
  );
};
