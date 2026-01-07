import { useParams } from "react-router-dom";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import useNavigation from "../../../hooks/useHistory";
import { Button, Col, Row } from "antd";
import "./BlogDetailPage.less";
import { useLanguage } from "../../../contexts/useLanguage";
import type { BlogItemView } from "../../../models/views/blogView";
import useBlog from "../../../hooks/blog/useBlog";
import { useEffect, useState } from "react";
import truncate from "truncate-html";

export default function BlogDetailPage() {
  const { push } = useNavigation();
  const { id } = useParams<{ id: string }>();
  const { currentLang } = useLanguage();
  const { getPostById, getPosts } = useBlog(currentLang);
  const [blog, setBlog] = useState<BlogItemView | null>(null);
  const [related, setRelated] = useState<BlogItemView[]>([]);
  const [loading, setLoading] = useState(true);
  const isFa = currentLang === "fa";

  const fetchData = async () => {
    setLoading(true);
    const { success, data } = await getPostById(Number(id));
    if (success && data) {
      setBlog(data);
      if (data.category_id) {
        const relatedRes = await getPosts(data.category_id);
        if (relatedRes.success) {
          setRelated(
            relatedRes.data.filter((b) => b.id !== data.id).slice(0, 2)
          );
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id, currentLang]);

  return (
    <>
      <AppHeader />

      {!loading && (
        <div className="blog-details-container">
          {/* Content */}
          <Row justify="center" gutter={[0, 32]}>
            <Col xs={24} md={8} lg={7} className="sidebar">
              <div className="slider-box">
                <h3 className="sidebar-title">
                  {isFa ? " مقالات مرتبط" : "Related articles"}
                </h3>

                {related.map((item) => (
                  <div key={item.id} className="related-item">
                    <img
                      src={item.image}
                      alt={item.title}
                      onClick={() => push(`/blog/${item.id}`)}
                    />
                    <p className="title-stiler">{item.title}</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: truncate(item.content, 120, {
                          ellipsis: "...",
                        }),
                      }}
                    ></div>
                    <Button
                      type="link"
                      onClick={() => push(`/blog/${item.id}`)}
                    >
                      {isFa ? "خواندن مقاله" : "Read the article"}
                    </Button>
                  </div>
                ))}
              </div>
            </Col>

            <Col xs={24} md={16} lg={17} className="main-content">
              <div className="main-box">
                <h1 className="title">{blog?.title}</h1>
                {/* <p className="meta">{blog?.comments_count} / 10</p> */}
                {/* عکس اصلی */}
                <img src={blog?.image} className="main-image" alt="main" />
                <div
                  className="paragraph"
                  dangerouslySetInnerHTML={{
                    __html: blog?.content ?? "",
                  }}
                ></div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
