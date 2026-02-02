import React from "react";
import { Col, Row } from "antd";
import useNavigation from "../../../../hooks/useHistory";
import img1 from "../../../../assets/blog/img1.png";
import img2 from "../../../../assets/blog/img2.png";
import blogdata from "../../../../helpers/blogdata";
import "./Blog.less";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AppButton } from "../../../../components/AppButton/AppButton";
import { useLanguage } from "../../../../contexts/useLanguage";

export const Blog: React.FC = () => {
  const { push } = useNavigation();
  const { currentLang } = useLanguage();

  return (
    <section id="blog" className="blog">
      <Row justify="center" className="first__title">
        <p>آخرین نوشته‌های ویترین</p>
      </Row>

      <Row className="blog__Row" align="middle" gutter={[24, 24]}>
        <Col xs={24} sm={24} md={24} lg={13} xl={13} className="blog__image">
          <a href="#">
            <img src={img1} alt="blog" />
          </a>
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11} className="blog__content">
          <div className="blog__box1">
            <a href="#" className="blog__title">
              معرفی شوروم ویترین
            </a>
            <p className="blog__text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله.
            </p>
            <a
              className="blog__more"
              href=""
              onClick={() => push(`/${currentLang}/blog/${blogdata[0].id}`)}
            >
              خواندن مقاله <ArrowLeftOutlined />
            </a>
          </div>
        </Col>
      </Row>

      <Row className="blog__Row2" align="middle" gutter={[24, 24]}>
        <Col xs={24} sm={24} md={24} lg={11} xl={11} className="blog__content2">
          <div className="blog__box2">
            <a href="#" className="blog__title">
              معرفی شوروم ویترین
            </a>
            <p className="blog__text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله.
            </p>
            <a
              className="blog__more"
              href=""
              onClick={() => push(`/${currentLang}/blog/${blogdata[1].id}`)}
            >
              خواندن مقاله <ArrowLeftOutlined />
            </a>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={13} xl={13} className="blog__image">
          <a href="#">
            <img src={img2} alt="blog" />
          </a>
        </Col>
      </Row>

      <Row justify="center">
        <AppButton className="blog__Button" onclick={() => push(`/${currentLang}/blog`)}>
          مقاله‌های بعدی
        </AppButton>
      </Row>
    </section>
  );
};
