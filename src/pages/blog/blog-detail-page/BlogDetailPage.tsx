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
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import LoadingSpin from "../../../components/Loading/LoadingSpin";
import BlogCommentForm from "./components/BlogCommentForm";
import usePageMetadata from "../../../hooks/usePageMetadata";

export default function BlogDetailPage() {
  useSyncLanguage();
  const { push } = useNavigation();
  const { id } = useParams<{ id: string }>();
  const { currentLang } = useLanguage();
  const { getPostById, getPosts } = useBlog(currentLang);
  const [blog, setBlog] = useState<BlogItemView | null>(null);
  const [backgroundData, setBackground] = useState<string>("");

  const [related, setRelated] = useState<BlogItemView[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslate();

  const fetchData = async () => {
    setLoading(true);
    const { success, data } = await getPostById(Number(id));
    if (!success || !data) {
      setLoading(false);
      return;
    }
    setBlog(data);

    setBackground(data?.image);
    const relatedRes = await getPosts();
    if (relatedRes.success && relatedRes.data) {
      const filtered = relatedRes.data
        .filter((b) => b.category_id === data.category_id && b.id !== data.id)
        .slice(0, 2);

      setRelated(filtered);
    }

    setLoading(false);
  };

  const textMainCaption = currentLang === "fa" ? 'ویترین گالری' : 'Vitrine Gallery'
  const meta = blog
    ? {
      title: (blog.seo?.page_title || blog.title) + ' | ' + textMainCaption,
      description:
        blog.seo?.meta_description ||
        blog.title,
      ogImage: blog.image,
      ogType: 'blog',
    }
    : {
      title: textMainCaption,
      description: 'blog details are loading',
    };

  usePageMetadata(meta);

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id, currentLang]);

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader categoryBackground={backgroundData} />
      <div className="blog-details-container">
        {/* Content */}
        <Row justify="center" gutter={[0, 32]}>
          <Col xs={24} md={8} lg={7} className="sidebar">
            <div className="slider-box">
              <h3 className="sidebar-title">{t("local_relatedArticles")}</h3>
              {related.map((item) => (
                <div key={item.id} className="related-item">
                  <div className="photo">
                    <img
                      src={item.image}
                      alt={item.title}
                      onClick={() => push(`/${currentLang}/blog/${item.id}`)}
                    />
                  </div>
                  <div className="info-blog">
                    <p className="title-stiler">{item.title}</p>
                    <div
                      className="descriptions"
                      dangerouslySetInnerHTML={{
                        __html: truncate(item.content, 120, {
                          ellipsis: "...",
                        }),
                      }}
                    ></div>
                    <Button
                      type="link"
                      onClick={() => push(`/${currentLang}/blog/${item.id}`)}
                    >
                      {t("local_readArticle")}
                    </Button>
                  </div>


                </div>
              ))}
            </div>
          </Col>

          <Col xs={24} md={16} lg={17} className="main-content">
            <div className="main-box">
              <h1 className="title">{blog?.title}</h1>
              <p className="meta">
                {t("local_publishedAt")}: <span>{blog?.published_at}</span>
              </p>

              <div
                className="paragraph"
                dangerouslySetInnerHTML={{
                  __html: blog?.content ?? "",
                }}
              ></div>
              <BlogCommentForm id={id} blog={blog} />
            </div>

          </Col>
        </Row>

      </div>
      <AppFooter />
    </>
  );
}
