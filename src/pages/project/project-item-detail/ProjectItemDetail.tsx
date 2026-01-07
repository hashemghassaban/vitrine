import { useParams } from "react-router-dom";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { Card, Carousel, Col, Row, Typography } from "antd";
import "./ProjectItemDetail.less";
import icon from "../../../assets/products/icon.png";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../contexts/useLanguage";
import useProjectDetail from "../../../hooks/project/useProjectById";
import type { ProjectDetailView } from "../../../models/views/projectView";
import projects from "../../../helpers/project";

const { Title } = Typography;

export default function ProjectItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentLang } = useLanguage();
  const { getById } = useProjectDetail(currentLang);
  const [project, setProject] = useState<ProjectDetailView | null>(null);
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const isFa = currentLang === "fa";

  const carouselRef = useRef<any>(null);

  const prev = () => {
    if (current > 0) {
      carouselRef.current.goTo(current - 1);
      setCurrent(current - 1);
    }
  };

  const next = () => {
    if (current < 3) {
      carouselRef.current.goTo(current + 1);
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      if (!id) return;
      const { success, data } = await getById(Number(id));
      if (success && data && isMounted) {
        setProject(data);
      }
    };

    setProject(null);
    fetchProject();

    return () => {
      isMounted = false;
    };
  }, [id, currentLang]);
  return (
    <>
      <AppHeader
        title={isFa ? "معرفی پروژه" : "Project Introduction"}
        text={project?.page_title ?? "page_title مقدار دهی نشده است"}
        style={false}
      />

      <div className="blog-details-container-detail">
        <div className="content-block-detail" key={project?.id}>
          <Row justify="center" align="middle" gutter={[0, 24]}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={11}
              xl={11}
              className="blog__content-detail"
            >
              <div className="text-box-detail">
                <div className="item-box-detail-detail">
                  <p className="title-text-detail">
                    {isFa ? "معمار" : "Architect"}
                  </p>
                  <p className="dec-text-detail">{project?.architect?.name}</p>
                </div>
                <div className="item-box-detail-detail">
                  <p className="title-text-detail">
                    {isFa ? "سازنده" : "Constructor"}
                  </p>
                  <p className="dec-text-detail">
                    {project?.developer?.name ?? ""}
                  </p>
                </div>
                <div className="item-box-detail-detail">
                  <p className="title-text-detail">
                    {isFa ? "لوکیشن" : "Location"}
                  </p>
                  <p className="dec-text-detail">
                    {isFa
                      ? project?.location?.title_fa
                      : project?.location?.title_en}
                  </p>
                </div>
                <p
                  className="title-dec-box-detail"
                  dangerouslySetInnerHTML={{ __html: project?.content ?? "" }}
                ></p>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={13}
              xl={13}
              className="blog__image-detail"
            >
              <div className="img-box-detail">
                <Carousel
                  beforeChange={(to) => setCurrent(to)}
                  arrows={false}
                  ref={carouselRef}
                  infinite={false}
                  dots={{ className: "custom-dots" }}
                >
                  <div>
                    <img
                      className="imgs-detail"
                      src={project?.image_link}
                      alt="img"
                    />
                  </div>
                </Carousel>

                <div className="custom-bottom-arrows">
                  <button
                    className="icon-arrow-btn"
                    onClick={prev}
                    disabled={current === 0}
                  >
                    <span className="icon-arrow"> →</span>
                  </button>
                  <button
                    className="icon-arrow-btn"
                    onClick={next}
                    disabled={current === 3}
                  >
                    <span className="icon-arrow"> ← </span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="product-card-detail">
          <Title level={3} className="title-detail">
            معرفی شوروم ویترین
          </Title>
          <p className="two-lines-detail">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است لورم ایپسوم <br />
            متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
            طراحان گرافیک است.{" "}
          </p>
          <Row gutter={[24, 24]} justify="center">
            {project?.products.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className="showcase-card-project"
                  cover={
                    <img
                      className="img-card-project"
                      src={item.thumbnail_link}
                      alt={item.title}
                    />
                  }
                >
                  <Title level={5} className="book-title-project">
                    {item.title}
                  </Title>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="product-card-detail">
            <Title level={3} className="title-detail">
              معرفی شوروم ویترین
            </Title>
            <p className="two-lines-detail">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است لورم ایپسوم <br />
              متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
              طراحان گرافیک است.{" "}
            </p>
          </div>
        </div>
      </div>
      <Row style={{ width: "100%" }}>
        <Col span={24} style={{ padding: 0 }}>
          <div className="image-container">
            {!showVideo && (
              <>
                <img
                  src={projects[0].img}
                  alt="project"
                  className="responsive-img"
                />

                <img
                  src={icon}
                  alt="vector"
                  className="center-img"
                  onClick={() => setShowVideo(true)}
                  style={{ cursor: "pointer" }}
                />
              </>
            )}

            {project?.video_link && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "70%", maxWidth: "900px" }}>
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                    }}
                  >
                    <iframe
                      src={project.video_link}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}
