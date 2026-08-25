import { useParams } from "react-router-dom";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { Card, Carousel, Col, Row, Typography } from "antd";
import "./ProjectItemDetail.less";
import icon from "../../../assets/products/icon.png";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../contexts/useLanguage";
import useProjectDetail from "../../../hooks/project/useProjectById";
import type { ProjectDetailView } from "../../../models/views/projectView";
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import useNavigation from "../../../hooks/useHistory";
import LoadingSpin from "../../../components/Loading/LoadingSpin";
import { useIsMobile } from "../../../helpers/useIsMobile";
import usePageMetadata from "../../../hooks/usePageMetadata";

const { Title } = Typography;

export default function ProjectItemDetail() {
  useSyncLanguage();
  const { id } = useParams<{ id: string }>();
  const { currentLang } = useLanguage();
  const { getById } = useProjectDetail(currentLang);
  const [project, setProject] = useState<ProjectDetailView | null>(null);
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const { t } = useTranslate();
  const { push } = useNavigation();
  const carouselRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

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

  const onplay = () =>{
         setShowVideo(true)

     setTimeout(() => {
    videoRef.current?.play();
  }, 0);

  }
  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      if (!id) return;
      const { success, data } = await getById(Number(id));
      if (success && data && isMounted) {
        setProject(data);
      }
      setLoading(false);
    };


    

    setProject(null);
    fetchProject();

    return () => {
      isMounted = false;
    };
  }, [id, currentLang]);


      const textMainCaption = currentLang === "fa" ? 'ویترین گالری' : 'Vitrine Gallery'
      const meta = project
      ? {
          title: (project.title) + ' | ' + textMainCaption ,
          description:
            project.meta_description ||
            project.excerpt ||
            project.title,
          ogImage: project.image_link,
          ogType: 'project',
        }
      : {
          title: textMainCaption,
          description: 'project details are loading',
        };
    
    usePageMetadata(meta);
  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader
        title={t("site.proje1")}
        text={project?.title}
        style={false}
        categoryBackground={project?.image_link ? project?.image_link : ""}/>

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
                  <p className="title-text-detail">{t("local_architect")}</p>
                  <a href={project?.architect?.link} className="dec-text-detail">{project?.architect?.name}</a>
                </div>
                <div className="item-box-detail-detail">
                  <p className="title-text-detail">{t("local_constructor")}</p>
                  <a href={project?.developer?.link} className="dec-text-detail">
                    {project?.developer?.name ?? ""}
                  </a>
                </div>
                <div className="item-box-detail-detail">
                  <p className="title-text-detail">{t("local_location")}</p>
                  <p className="dec-text-detail">
                    {project?.place_address}
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
                  {project?.media.map((item)=>(
                      <div>
                    <img
                      className="imgs-detail"
                      src={item.url ?? undefined}
                      alt="img"
                    />
                  </div>
                  ))}
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
            {t("site.proje2")}
          </Title>
          <p className="two-lines-detail">{t("site.proje3")}</p>
          
            { isMobile||project?.products && project?.products?.length > 6 ? (
  <Carousel
    dots={false}
    draggable
    style={{ paddingInline: 20 }}
                    slidesToShow={2.5}
    responsive={[
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2.5 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1.55555 },
      },
    ]}
  >
    {project?.products.map((item) => (
      <div key={item.id}>
        <Card
          onClick={() => push(`/${currentLang}/products/${item.id}`)}
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
      </div>
    ))}
  </Carousel>
) : (
  <Row gutter={[24, 24]} justify="center">
    {project?.products.map((item) => (
      <Col key={item.id} xs={24} sm={12} md={8} lg={4}>
        <Card
          onClick={() => push(`/${currentLang}/products/${item.id}`)}
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
)}

        
          <div className="product-card-detail">
            <Title level={3} className="title-detail">
              {t("site.proje4")}
            </Title>
            <p className="two-lines-detail">{t("site.proje5")}</p>
          </div>
        </div>
      </div>
      {project?.video_link ?
        <Row style={{ width: "100%" }}>
          <Col span={24} style={{ padding: 0 }}>
            <div className="image-container">
              {!showVideo && (
                <>
                  <img
                    src={project?.video_cover_link ?? undefined}
                    alt="project"
                    className="responsive-img"
                  />

                  <img
                    src={icon}
                    alt="vector"
                    className="center-img"
                    onClick={() => onplay()}
                    style={{ cursor: "pointer" }}
                  />
                </>
              )}

              {showVideo && (
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
                     <video
  ref={videoRef}
  controls
  playsInline
  width="100%"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
  }}
>
  <source src={project.video_link} type="video/mp4" />
</video>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
        : null}

      <AppFooter />
    </>
  );
}
