import { AppFooter } from "../../components/AppFooter/AppFooter";
import { useSyncLanguage } from "../../i18n/useSyncLanguage";
import { useEffect, useMemo, useState } from "react";
import { Tabs, Button, Row, Col } from "antd";
import { AppButton } from "../../components/AppButton/AppButton";
import useNavigation from "../../hooks/useHistory";
import useBlog from "../../hooks/blog/useBlog";
import type { BlogItemView } from "../../models/views/blogView";
import type { BlogCategoryView } from "../../models/views/blogView";
import { useLanguage } from "../../contexts/useLanguage";
import truncate from "truncate-html";
import { useTranslate } from "../../i18n/useTranslate";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import LoadingSpin from "../../components/Loading/LoadingSpin";
import "./blog.less";

function Blog() {
  useSyncLanguage();
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { getPosts, getCategories } = useBlog(currentLang);
  const [categories, setCategories] = useState<BlogCategoryView[]>([]);
  const [posts, setPosts] = useState<BlogItemView[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslate();

  const fetchPost = async () => {
    const { success, data } = await getPosts(+activeTab);
    if (success && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { success: catSuccess, data: catData } = await getCategories();
    if (catSuccess && catData) {
      setCategories(catData);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentLang]);

  useEffect(() => {
    fetchPost();
  }, [activeTab, currentLang]);

  const activeCategory = useMemo<BlogCategoryView | null>(() => {
    if (activeTab === "all") return null;

    return categories.find((cat) => cat?.id == Number(activeTab)) || null;
  }, [activeTab, categories]);

  const filteredContent =
    activeTab === "all"
      ? posts
      : posts.filter((p) => p.category_id == +activeTab);
  const visibleBlog = filteredContent.slice(0, visibleCount);
  const hasMore = visibleCount < filteredContent.length;

  const loadMore = () => {
    const newItems = filteredContent.slice(visibleCount, visibleCount + 2);
    setVisibleCount((prev) => prev + 2);
    setAnimatedItems((prev) => [...prev, ...newItems.map((i) => i.id)]);
  };

  const tabItems = useMemo(() => {
    const categoriesMap = new Map<number, string>();

    categories.forEach((p) => {
      if (p) {
        categoriesMap.set(p.id, p.title);
      }
    });

    return [
      { key: "all", label: t("local_all") },
      ...Array.from(categoriesMap.entries()).map(([id, title]) => ({
        key: String(id),
        label: title,
      })),
    ];
  }, [categories]);

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader
        categoryBackground={activeCategory?.image}
        title={t("site.blog11")}
        text={t("site.blog22")}
      />
      <div className="interior-page-container">
        <Row justify="center" align="middle" style={{ overflow: "auto" }}>
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            items={tabItems.map((tab) => ({
              key: tab.key,
              label: tab.label,
            }))}
            className="interior-tabs"
          />
        </Row>

        {visibleBlog.map((block, index) => (
          <div
            className={`content-block ${
              animatedItems.includes(block.id) ? "ease-in-item" : ""
            }`}
            key={block.id}
          >
            <Row align="middle" gutter={[12, 50]}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                className="blog__image"
                order={index % 2 === 0 ? 1 : 2}
              >
                <div className="img-box">
                  <img
                    src={block.image}
                    alt={`pic${block.id}`}
                    onClick={() => push(`/${currentLang}/blog/${block.id}`)}
                  />
                </div>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                className={` ${
                  index % 2 === 1 ? "even-content" : "blog__content"
                }`}
                order={index % 2 === 0 ? 2 : 1}
              >
                <div className="text-box">
                  <h2
                    onClick={() => push(`/${currentLang}/blog/${block.id}`)}
                    className="h2-box"
                  >
                    {block.title}
                  </h2>
                  <p className="p-box">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: truncate(block.content, 120, {
                          ellipsis: "...",
                        }),
                      }}
                    ></div>
                  </p>
                  <Button
                    className={` ${currentLang == "en" ? "english" : ""}`}
                    type="link"
                    onClick={() => push(`/${currentLang}/blog/${block.id}`)}
                  >
                    {t("local_readArticle")}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        ))}
        {hasMore && (
          <Row justify="center">
            <AppButton onclick={loadMore} className="blog__Button">
              {t("local_nextArticles")}
            </AppButton>
          </Row>
        )}
      </div>
      <AppFooter />
    </>
  );
}

export default Blog;
