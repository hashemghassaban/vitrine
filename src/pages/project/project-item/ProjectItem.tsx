import { useEffect, useMemo, useState } from "react";
import { Tabs, Button, Row, Col } from "antd";
import "./ProjectItem.less";
import { AppButton } from "../../../components/AppButton/AppButton";
import useNavigation from "../../../hooks/useHistory";
import useProjects from "../../../hooks/project/useProject";
import type {
  ProjectCategoryView,
  ProjectItemView,
} from "../../../models/views/projectView";
import { useLanguage } from "../../../contexts/useLanguage";
import { useTranslate } from "../../../i18n/useTranslate";
import { AppHeader } from "../../../components/AppHeader/AppHeader";

export default function ProjectItem() {
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { getList, getCategories } = useProjects(currentLang);
  const { t } = useTranslate();
  const [projects, setProjects] = useState<ProjectItemView[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [categories, setCategories] = useState<ProjectCategoryView[]>([]);
  const [loadingCategory, setLoadingCategory] = useState(true);

  const fetchPost = async () => {
    const { success, data } = await getList(+activeTab);
    if (success && data) {
      setProjects(data);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategory(true);
    const { success: catSuccess, data: catData } = await getCategories();
    if (catSuccess && catData) {
      setCategories(catData);
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentLang]);

  useEffect(() => {
    fetchPost();
  }, [activeTab, currentLang]);
  
   const activeCategory = useMemo<ProjectCategoryView | null>(() => {
      if (activeTab === "all") return null;
  
      return categories.find(
        (cat) => cat?.id == Number(activeTab)
      ) || null;
    }, [activeTab, categories]);

  const filteredContent =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category?.id === +activeTab);

  const visibleProjects = filteredContent.slice(0, visibleCount);
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
     <AppHeader categoryBackground={ activeCategory?.image ?? undefined} title={t("site.projectlist1")} />
      {!loadingCategory ? (
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
          {visibleProjects.map((block, index) => (
            <div
              className={`content-block-project ${
                animatedItems.includes(block.id) ? "ease-in-item" : ""
              }`}
              key={block.id}
            >
              <Row align="middle" gutter={[24, 24]}>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={14}
                  xl={12}
                  className="blog__image-project "
                  order={index % 2 === 0 ? 2 : 1}
                >
                  <div
                    className="img-box-project"
                    onClick={() => push(`/${currentLang}/project/${block.id}`)}
                  >
                    <img src={block.thumbnail_link} alt={block.title} />
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={10}
                  xl={10}
                  className="blog__content-project "
                  order={index % 2 === 0 ? 1 : 2}
                >
                  <div
                    className={` ${
                      index % 2 === 1
                        ? "even-text-box-project "
                        : "text-box-project  "
                    }`}
                  >
                    <h2
                      onClick={() => push(`/${currentLang}/project/${block.id}`)}
                      className="title-text-box-project"
                    >
                      {block.title}
                    </h2>
                    <div className="item-box-project ">
                      <p className="title-text-project ">
                        {t("local_architect")}
                      </p>
                      <p className="dec-text-project ">
                        {block.architect?.name}
                      </p>
                    </div>
                    <div className="item-box-project ">
                      <p className="title-text-project ">
                        {t("local_constructor")}
                      </p>
                      <p className="dec-text-project ">
                        {block.developer?.name}
                      </p>
                    </div>
                    <div className="item-box-project ">
                      <p className="title-text-project ">
                        {t("local_location")}
                      </p>
                      <p className="dec-text-project ">{block?.place_address}</p>
                    </div>
                    <div className="dec-text-project-box">
                      <p
                        className="text-project"
                        dangerouslySetInnerHTML={{
                          __html: block.excerpt ?? "",
                        }}
                      ></p>
                    </div>
                    <Button
                      className={` ${currentLang == "en" ? "english" : ""}`}
                      type="link"
                      onClick={() => push(`/${currentLang}/project/${block.id}`)}
                    >
                      {t("local_view")}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          ))}

          {hasMore && (
            <Row justify="center">
              <AppButton className="blog__Button-project" onclick={loadMore}>
                {t("local_nextArticles")}
              </AppButton>
            </Row>
          )}
        </div>
      ) : (
        <div style={{ height: 500 }}></div>
      )}
    </>
  );
}
