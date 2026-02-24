import { Row, Col, Button, Divider, Card, Tag } from "antd";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { useState, useEffect } from "react";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../../contexts/useLanguage";
import type {
  ProductView,
  ProductDetailView,
} from "../../../models/views/productView";
import useProducts from "../../../hooks/products/useProducts";
import truncate from "truncate-html";
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
import useNavigation from "../../../hooks/useHistory";
import "./ProductDetail.less";
import CommentForm from "./components/CommentForm";
import OrderForm from "./components/OrderForm";
import LoadingSpin from "../../../components/Loading/LoadingSpin";

export default function ProductDetail() {
  useSyncLanguage();
  const [mainImage, setMainImage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { currentLang } = useLanguage();
  const { getListProducts, getProductById } = useProducts(currentLang);
  const [product, setproduct] = useState<ProductDetailView | null>(null);
  const [related, setRelated] = useState<ProductView[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslate();
  const { push } = useNavigation();
  const groupedFeatures = product?.features.reduce<Record<string, string[]>>(
    (acc, feature) => {
      if (!acc[feature.feature_title]) {
        acc[feature.feature_title] = [];
      }
      acc[feature.feature_title].push(feature.value);
      return acc;
    },
    {},
  );
  const truncateByWord = (text: string = "", limit = 200) => {
    if (text.length <= limit) return text;

    const sliced = text.slice(0, limit);
    const lastSpaceIndex = sliced.lastIndexOf(" ");

    return sliced.slice(0, lastSpaceIndex) + "...";
  };
  const fetchData = async () => {
    const { success, data } = await getProductById(Number(id));
    if (success && data) {
      setproduct(data);
      if (data?.category?.id) {
        const relatedRes = await getListProducts();
        if (relatedRes.success) {
          setRelated(
            relatedRes.data
              .filter(
                (b) =>
                  b?.category?.id === data?.category?.id && b?.id !== data?.id,
              )
              .slice(0, 5),
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

  useEffect(() => {
    if (product?.media?.length && !mainImage) {
      setMainImage(product.media[0]?.url);
    }
  }, [product]);

  useEffect(() => {
    setIsExpanded(false);
  }, [product?.content]);

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader noBackgroundProducts />
      <div className="product-page">
        <Row gutter={[40, 40]} justify="center">
          <Col xs={24} md={24} lg={15} className="product-info">
            <div className="product-info">
              <div className="brand-section" id="sectionDown">
                <div>
                  {product?.collection && (
                    <div
                      className="date-box"
                      onClick={() => {
                       
                        const urlFriendlyTitle = product.collection.title.replace(/ /g, '-');
                        push(`/${currentLang}/products?collection=${urlFriendlyTitle}`);
                      }}
                    >
                      {product?.collection?.title}{" "}
                    </div>
                  )}

                  <p
                    className="category-text"
                    
                  >
                    {t("local_category")}/ <span onClick={() =>
                      push(
                        `/${currentLang}/products?category=${product?.category?.slug}`,
                      )
                    }>{product?.category?.title}</span>
                  </p>
                  <p className="category-code">
                    {t("local_code")}: {product?.code}
                  </p>
                </div>
                <img
                  src={product?.brand?.logo ?? undefined}
                  className="brand-logo-product"
                  onClick={() =>
                      push(
                        `/${currentLang}/brand-detail/${product?.brand?.id}`,
                      )
                    }
                />
              </div>

              <h1 className="product-title desktop">{product?.title}</h1>

              <p
                className="product-desc"
                dangerouslySetInnerHTML={{
                  __html: truncate(product?.summary ?? ""),
                }}
              ></p>

              <div className="additional-info">
                <div className="feature-box">
                  {groupedFeatures &&
                    Object.entries(groupedFeatures).map(
                      ([title, values], index) => (
                        <div key={index}>
                          <div className="feature-title">
                            {t("local_productFeatures")}
                          </div>
                          <div className="feature-item" key={index}>
                            <span>
                              {title}: {values.join(", ")}
                            </span>
                            {index !==
                              Object.entries(groupedFeatures).length - 1 && (
                                <Divider />
                              )}
                          </div>
                        </div>
                      ),
                    )}
                </div>
                <OrderForm product={product} />
              </div>
            </div>
          </Col>

          <Col xs={24} md={24} lg={9} className="gallery">
                            <h1 className="product-title mobile">{product?.title}</h1>

            <div className="main-image">
              {!!mainImage && (
                <img src={mainImage ?? undefined} alt="product" />
              )}
            </div>

            <div className="thumbs">

              {product?.media?.map((t, i) => (
                <img
                  key={i ?? 0}
                  src={t?.url ?? undefined}
                  className={`thumb ${mainImage == t?.url ? "active" : ""}`}
                  onClick={() => setMainImage(t?.url)}
                />
              ))}
            </div>
            
          </Col>
        </Row>
      </div>
      <div className="description-section">
        <Row justify="center" align="middle">
          <Col span={20}>
            <div>
              <div className="description-title">{product?.title} </div>
              <p
                className="description-text"
                dangerouslySetInnerHTML={{
                  __html: isExpanded
                    ? (product?.content ?? "")
                    : truncateByWord(product?.content ?? "", 500),
                }}
              ></p>
            </div>
            <div className="align-center">
              {product?.content && product.content.length > 350 && (
                <Button
                  type="link"
                  className="btn-more-brand-products"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? t("local_less") : t("local_more")}
                </Button>
              )}
            </div>

            <div className="download-box">
              {product?.brochures.map((item, idx) => (
                <div className="download-content" key={idx}>
                  <p className="download-title">
                    {!!item?.name ? item?.name : t("local_getCatalog")}
                  </p>

                  <a
                    href={item.link}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-text"
                  >
                    <VerticalAlignBottomOutlined />
                    {t("local_download")}
                  </a>
                </div>
              ))}
            </div>

            <CommentForm id={id} product={product} />

            <div className="other-box">
              <div className="other-title">{t("local_relatedProducts")}</div>
              <Row className="other-box-row" gutter={[16, 24]} justify="center">
                {related.map((item, index) => (

                  <Col key={index} xs={24} sm={12} md={8} lg={5} xl={4}>
                    <Card
                      onClick={() =>
                        push(`/${currentLang}/products/${item.id}`)
                      }
                      hoverable
                      className="showcase-card-product-another"
                      cover={
                        <img
                          src={item?.image ?? undefined}
                          alt="product"
                          className="img-card-product"
                        />
                      }
                    >
                      <div className="selected-tags-item">
                        <Tag>
                          <div className="pulse-tag">
                            {item?.collection?.title}
                          </div>
                        </Tag>
                      </div>
                      <p className="product-title-product">{item?.title}</p>
                    </Card>
                  </Col>
                 
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <AppFooter />
    </>
  );
}
