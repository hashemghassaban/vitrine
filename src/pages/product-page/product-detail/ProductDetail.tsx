import { Row, Col, Button, Divider, Card, Tag } from "antd";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { useState, useEffect } from "react";
import { PlusOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useIsMobile } from "../../../helpers/useIsMobile";
import HomeMobile from "../../index/components/home_mobile/HomeMobile";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../../contexts/useLanguage";
import type {
  ProductView,
  ProductDetailView,
} from "../../../models/views/productView";
import { Input, message } from "antd";
import useProducts from "../../../hooks/products/useProducts";
import truncate from "truncate-html";
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
import useNavigation from "../../../hooks/useHistory";
import { validateEmail, validatePhone } from "../../../helpers/validation";
import type { orderProductDTO } from "../../../models/dtos/orderProductDTO";
import "./ProductDetail.less";
import CommentForm from "./components/CommentForm";

export default function ProductDetail() {
  useSyncLanguage();
  const [mainImage, setMainImage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();
  const { currentLang } = useLanguage();
  const { getListProducts, getProductById, getOrderProduct } =
    useProducts(currentLang);
  const [product, setproduct] = useState<ProductDetailView | null>(null);
  const [related, setRelated] = useState<ProductView[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const { t } = useTranslate();
  const { push } = useNavigation();
  const [orderFormSubmitting, setOrderFormSubmitting] = useState(false);
  const [orderForm, setOrderForm] = useState<orderProductDTO>(
    {} as orderProductDTO,
  );

  const [orderProducts, setOrderProducts] = useState<string[]>([""]);
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

  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (content: string) => {
    messageApi.open({
      icon: <></>,
      content: content,
    });
  };

  const handleOrderInputChange = (field: keyof orderProductDTO, value: any) => {
    setOrderForm((prev) => ({
      ...prev,
      [field]: value || null,
    }));
  };

  const onOrderSubmit = async () => {
    try {
      const productsString = orderProducts.filter(Boolean);

      const payload: orderProductDTO = {
        ...orderForm,
        products: productsString,
      };
      const isEmpty =
        !payload.full_name ||
        !payload.email ||
        !payload.company ||
        !payload.telephone ||
        !payload.address ||
        !payload.products;

      if (isEmpty) {
        showMessage(t("local_completeTheForm"));
        return;
      }

      if (payload.email && !validateEmail(payload.email)) {
        showMessage(t("local_invalidEmail"));
        return;
      }

      if (payload.telephone && !validatePhone(payload.telephone)) {
        showMessage(t("local_invalidPhone"));
        return;
      }

      setOrderFormSubmitting(true);

      const resp = await getOrderProduct(payload);

      if (resp.success) {
        showMessage(resp.result);
        setOrderForm({} as orderProductDTO);
        setOrderProducts([""]);
        closeDialog();
      } else {
        showMessage(resp.result);
      }
    } catch (e: any) {
      showMessage(e?.message);
    } finally {
      setOrderFormSubmitting(false);
    }
    closeDialog();
  };

  return (
    <>
      {contextHolder}
      {isMobile ? <HomeMobile /> : <AppHeader noBackgroundProducts />}
      <div className="product-page">
        <Row gutter={[40, 40]} justify="center">
          <Col xs={24} md={24} lg={15} className="product-info">
            <div className="product-info">
              <div className="brand-section" id="sectionDown">
                <div>
                  {product?.collection && (
                    <div
                      className="date-box"
                      onClick={() =>
                        push(
                          `/${currentLang}/products?collection=${product?.collection?.title}`,
                        )
                      }
                    >
                      {product?.collection?.title}{" "}
                    </div>
                  )}

                  <p
                    className="category-text"
                    onClick={() =>
                      push(
                        `/${currentLang}/products?category=${product?.category?.slug}`,
                      )
                    }
                  >
                    {t("local_category")}/ {product?.category?.title}
                  </p>
                  <p className="category-code">
                    {t("local_code")}: {product?.code}
                  </p>
                </div>
                <img
                  src={product?.brand?.logo ?? undefined}
                  className="brand-logo-product"
                />
              </div>

              <h2 className="product-title">{product?.title}</h2>

              <p
                className="product-desc"
                dangerouslySetInnerHTML={{
                  __html: truncate(product?.excerpt ?? ""),
                }}
              ></p>

              <div className="additional-info">
                <div className="feature-box">

                  {groupedFeatures &&
                    Object.entries(groupedFeatures).map(
                      ([title, values], index) => (
                        <div key={index}>
                          <h3 className="feature-title">
                            {t("local_productFeatures")}
                          </h3>
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
                <button className="info-btn" onClick={openDialog}>
                  {t("local_getInfo")}
                </button>
              </div>
            </div>
          </Col>

          <Col xs={24} md={24} lg={9} className="gallery">
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
          <Col span={17}>
            <div>
              <h2 className="description-title">{product?.title} </h2>
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
            
            <CommentForm id={id} />

            <div className="other-box">
              <h2 className="other-title">{t("local_relatedProducts")}</h2>
              <Row className="other-box-row" gutter={[16, 24]} justify="center">
                {related.map((item, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={6} xl={5}>
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
        {isOpen && (
          <div
            className="dialogMain"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 100000,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="dialogBlock"
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                minWidth: "768px",
              }}
            >
              <h2> دریافت اطلاعات</h2>
              <div className="form-section">
                <div className="form-row">
                  <div className="input-group half">
                    <Input
                      className=" input-text"
                      placeholder={t("local_contactFullName")}
                      variant="underlined"
                      value={orderForm.full_name || ""}
                      onChange={(e) =>
                        handleOrderInputChange("full_name", e.target.value)
                      }
                    />
                  </div>
                  <div className="input-group half">
                    <Input
                      className=" input-text"
                      placeholder={t("local_contactPhoneNumber")}
                      variant="underlined"
                      value={orderForm.telephone || ""}
                      onChange={(e) =>
                        handleOrderInputChange("telephone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group half">
                    <Input
                      className=" input-text"
                      placeholder={t("local_company")}
                      variant="underlined"
                      value={orderForm.company || ""}
                      onChange={(e) =>
                        handleOrderInputChange("company", e.target.value)
                      }
                    />
                  </div>
                  <div className="input-group half">
                    <Input
                      className=" input-text"
                      placeholder={t("local_contactEmail")}
                      variant="underlined"
                      value={orderForm.email || ""}
                      onChange={(e) =>
                        handleOrderInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <Input
                      className=" input-text"
                      placeholder={t("local_address")}
                      variant="underlined"
                      value={orderForm.address || ""}
                      onChange={(e) =>
                        handleOrderInputChange("address", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <p className="text">{t("local_orderFormProducts")}</p>

                    {orderProducts.map((pro, index) => (
                      <Input
                        key={index}
                        className="input-product"
                        placeholder={product?.title}
                        value={pro}
                        onChange={(e) => {
                          const newProducts = [...orderProducts];
                          newProducts[index] = e.target.value;
                          setOrderProducts(newProducts);
                        }}
                        style={{ marginBottom: 15 }}
                      />
                    ))}

                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => setOrderProducts([...orderProducts, ""])}
                      style={{
                        borderRadius: 20,
                        padding: "20px 20px",
                      }}
                    >
                      {t("local_orderFormAddProduct")}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="dialogFooter">
                <button
                  className="info-btn"
                  onClick={onOrderSubmit}
                  disabled={orderFormSubmitting}
                >
                  {t("local_orderFormSendOrder")}
                </button>
                <button className="info-btn closed" onClick={closeDialog}>
                  {t("local_orderFormClose")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AppFooter />
    </>
  );
}
