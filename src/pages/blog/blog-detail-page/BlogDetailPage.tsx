import { useParams } from "react-router-dom";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";

import useNavigation from "../../../hooks/useHistory";
import blogdata from "../../../helpers/blogdata";
import { Button, Col, Row } from "antd";
import "./BlogDetailPage.less";

export default function BlogDetailPage() {
  const { id } = useParams();
  const blog = blogdata.find((b) => b.id === Number(id));
  const another = blogdata.filter((b) => b.id !== Number(id));
  const { push } = useNavigation();

  return (
    <>
      <AppHeader />

      <div className="blog-details-container">
        {/* Content */}
        <Row justify="center" gutter={[0, 100]}>
           <Col xs={24} md={16} lg={17} className="main-content">
            <div className="main-box">
              <h1 className="title">{blog?.title}</h1>

              <p className="meta">
                {blog?.date} / {blog?.hour}
              </p>
              <p className="paragraph">
                {blog?.text} {blog?.text}
              </p>

              <p className="paragraph">
                {blog?.text} {blog?.text}
              </p>

      
              <div className="gray-box">
                <ul>
                  <li>فهرست مطالب</li>
                  {blog?.titles.map((title, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        const el = document.getElementById(`section-${i}`);
                        el?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className="toc-item"
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              </div>

              <p id={`section-0`} className="paragraph">
                {blog?.text} {blog?.text}
                 {blog?.text} {blog?.text}
              </p>

              {/* عکس اصلی */}
              <img src={blog?.img} className="main-image" alt="main" />
              <p  id={`section-1`} className="paragraph">
                {blog?.text} {blog?.text}
                {blog?.text} {blog?.text}
              </p>
               <p  id={`section-2`} className="paragraph">
                {blog?.text} {blog?.text}
                {blog?.text} {blog?.text}
              </p>
            </div>
          </Col>
          <Col xs={24} md={8} lg={7} className="sidebar">
            <div className="slider-box">
              <h3 className="sidebar-title">مقالات مرتبط</h3>

              <div className="related-item">
                <img src={another[0].img} alt="related" />
                <p className="title-stiler">{another[0].title}</p>
                <p>{another[0].text}</p>
                <Button
                  type="link"
                  onClick={() => push(`/blog/${another[0].id}`)}
                >
                  خواندن مقاله
                </Button>
              </div>

              <div className="related-item">
                <img  onClick={() => push(`/blog/${another[0].id}`)} src={another[0].img} alt="related" />
                <p   onClick={() => push(`/blog/${another[0].id}`)} className="title-stiler">{another[0].title}</p>
                <p>{another[0].text}</p>
                <Button
                  type="link"
                  onClick={() => push(`/blog/${another[0].id}`)}
                >
                  خواندن مقاله
                </Button>
              </div>
            </div>
          </Col>

          {/* ستون بزرگ (محتوای مقاله) */}
         
        </Row>
      </div>
      <AppFooter/>
    </>
  );
}
