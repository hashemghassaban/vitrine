import { Row, Col, Button, Divider, Card, Tag } from "antd";
import "./ProductDetail.less";
import reply from "../../../assets/icon/reply.svg";
import star from "../../../assets/icon/star.svg";

import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { useState, useEffect } from "react";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useIsMobile } from "../../../helpers/useIsMobile";
import HomeMobile from "../../index/components/home_mobile/HomeMobile";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../../contexts/useLanguage";
import type {
  ProductView,
  ProductDetailView,
} from "../../../models/views/productView";
import { Input, message, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import useProducts from "../../../hooks/products/useProducts";
import truncate from "truncate-html";
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
import useNavigation from "../../../hooks/useHistory";
import type { ProductCommentDTO } from "../../../models/dtos/productCommentDTO";
import { validateEmail, validatePhone } from "../../../helpers/validation";
export default function ProductDetail() {
  useSyncLanguage();
  const [mainImage, setMainImage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();
  const { currentLang } = useLanguage();
  const { getListProducts, getProductById, getCommentProductById } = useProducts(currentLang);
  const [product, setproduct] = useState<ProductDetailView | null>(null);
  const [related, setRelated] = useState<ProductView[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const openDialogComments = () => setIsOpenComments(true);
  const closeDialogomments = () => setIsOpenComments(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const [rating, setRating] = useState(0);
  const { t } = useTranslate();
  const { push } = useNavigation();

  const [commentFormSubmitting, setCommentFormSubmitting] = useState(false);
  const [commentForm, setCommentForm] = useState<ProductCommentDTO>({} as ProductCommentDTO);

  const groupedFeatures = product?.features.reduce<Record<string, string[]>>(
    (acc, feature) => {
      if (!acc[feature.feature_title]) {
        acc[feature.feature_title] = [];
      }
      acc[feature.feature_title].push(feature.value);
      return acc;
    },
    {}
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
      if (data.category.id) {
        const relatedRes = await getListProducts();
        if (relatedRes.success) {
          setRelated(
            relatedRes.data
              .filter(
                (b) => b?.category.id === data?.category.id && b.id !== data.id
              )
              .slice(0, 5)
          );
        }

        console.log(relatedRes);

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

  const handleCommentInputChange = (field: keyof ProductCommentDTO, value: any) => {
    setCommentForm((prev) => ({
      ...prev,
      [field]: value || null,
    }));
  };

  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (content: string) => {
    messageApi.open({
      icon: <></>,
      content: content,
    });
  };

  const onCommentSubmit = async () => {
    try {
      console.log('commentForm',commentForm)
      const isEmpty =
        !commentForm.content ||
        !commentForm.rate ||
        !commentForm.user_email ||
        !commentForm.user_name;
      if (isEmpty) {
        showMessage(t("local_completeTheForm"));
        return;
      }

      if (commentForm.user_email && !validateEmail(commentForm.user_email)) {
        showMessage(t("local_invalidEmail"));
        return;
      }

      if (commentForm.phone && !validatePhone(commentForm.phone)) {
        showMessage(t("local_invalidPhone"));
        return;
      }

      setCommentFormSubmitting(true);
      const resp = await getCommentProductById(Number(id),commentForm);
      if (resp.success) {
        showMessage(resp.result);
        setCommentForm({} as ProductCommentDTO);
      } else {
        showMessage(resp.result);
      }
    } catch (e: any) {
      showMessage(e?.message);
    } finally {
      setCommentFormSubmitting(false);
    }
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
                  {product?.collection && (<div className="date-box" onClick={() =>
                    push(`/${currentLang}/products?collectionId=${product?.collection?.id}`)
                  }>{product?.collection?.title} </div>)}

                  <p className="category-text" onClick={() => push(`/${currentLang}/products?category=${product?.category?.slug}`)}>
                    {t("local_category")}/ {product?.category?.title}
                  </p>
                  <p className="category-code">{t("local_code")}: {product?.code}</p>
                </div>
                <img
                  src={product?.brand?.logo}
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
                    Object.entries(groupedFeatures).map(([title, values], index) => (
                      <>
                        <h3 className="feature-title"> {t("local_productFeatures")}</h3>
                        <div className="feature-item" key={title}>
                          <span>
                            {title}: {values.join(", ")}
                          </span>
                          {index !== Object.entries(groupedFeatures).length - 1 && <Divider />}
                        </div>
                      </>
                    ))}

                </div>
                <button className="info-btn" onClick={openDialog}>{t("local_getInfo")}</button>
              </div>
            </div>
          </Col>

          <Col xs={24} md={24} lg={9} className="gallery">
            <div className="main-image">
              <img src={mainImage} alt="product" />

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
              <h2 className="description-title">{product?.title}  </h2>
              <p className="description-text" dangerouslySetInnerHTML={{
                __html: isExpanded
                  ? product?.content ?? ""
                  : truncateByWord(product?.content ?? "", 500),
              }}>

              </p>
            </div>
            <div className="align-center">
              {product?.content && product.content.length > 350 && (<Button type="link" className="btn-more-brand-products" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? t("local_less") : t("local_more")}
              </Button>)}
            </div>
            <img src={product?.image} className="description-image" />

            <div className="download-box">
              {product?.brochures.map((item) => (

                <div className="download-content">
                  <p className="download-title">
                    {
                      (item?.startsWith('https://') || item?.startsWith('http://')) ? t("local_getCatalog") : item.split('/').pop()
                    }
                  </p>

                  <a href={item}
                    download
                    target="_blank"
                    rel="noopener noreferrer" className="download-text">
                    <VerticalAlignBottomOutlined />
                    {t("local_download")}
                  </a>
                </div>
              ))}
            </div>
            <div className="comment-section">
              <div className="scoreProduct">
               
               <div>  امتیاز محصول / </div>
               <div><img src={star} alt="star" /> 0  ( 0 دیدگاه ) </div>
              </div>
              <h2 className="other-title">
                {t("local_comments")}
              </h2>
              <div className="comment-form">
                <div className="comment-form-block">
                  <div className="form-row ">
                    <div className="input-group half">
                      <Input
                        className="input-text"
                        placeholder={t("local_contactFullName")}
                        variant="underlined"
                        value={commentForm.user_name || ""}
                        onChange={(e) =>
                          handleCommentInputChange("user_name", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-group half">
                      <Input
                        className="input-text"
                        placeholder={t("local_contactEmail")}
                        variant="underlined"
                        value={commentForm.user_email || ""}
                        onChange={(e) => handleCommentInputChange("user_email", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row textarea-field">
                  <div className="input-group half" style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span>{t("local_commentRate")}</span>
                    <Rate allowHalf
                      value={commentForm.rate || 0}
                      onChange={(value) =>
                        handleCommentInputChange("rate", value)
                      } className="black-rate"/>
                  </div>
                  <div className="input-group half">
                    <TextArea
                      className="input-text"
                      rows={4}
                      placeholder={t("local_commentContent")}
                      variant="underlined"
                      value={commentForm.content || ""}
                      onChange={(e) => handleCommentInputChange("content", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row block-fill">
                  <button 
                    className="info-btn" 
                    onClick={onCommentSubmit}
                    disabled={commentFormSubmitting}>
                    {t("local_send")}
                  </button>
                </div>
              </div>

              <div className="comment-list">

                <div className="comment">
                  <div className="comment-header">
                    <div className="text-comment">
                      <strong>علی رضایی</strong> - <span>5 امتیاز</span>
                    </div>
                    <div className="date">
                      1404/09/12  12:35
                    </div>


                  </div>
                  <div className="comment-body">

                    <p> این محصول خیلی خوب بود و تجربه خرید عالی داشتم.</p>

                  </div>

                  {/* پاسخ به کامنت */}
                  <div className="comment-reply">
                    <div className="reply-icon">
                      <img src={reply} alt="reply" />
                    </div>
                    <div className="comment-header">

                      <strong>پشتیبانی</strong>
                    </div>
                    <div className="comment-body">
                      <p>          از نظر مثبت شما بسیار سپاسگزاریم! خوشحالیم رضایت داشتید.
                      </p>
                      <button className="reply-btn" onClick={openDialogComments}>
                        پاسخ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="other-box">
              <h2 className="other-title">
                {t("local_relatedProducts")}
              </h2>

              <Row className="other-box-row" gutter={[16, 24]} justify="center">
                {related.map((item, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={6} xl={5}>
                    <Card
                     onClick={() => push(`/${currentLang}/products/${item.id}`)}
                      hoverable
                      className="showcase-card-product-another"
                      cover={
                        <img
                          src={item?.image}
                          alt="product"
                          className="img-card-product"
                        />
                      }
                    >
                      <div className="selected-tags-item">
                        <Tag>
                          <div className="pulse-tag">{item?.collection?.title}</div>
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
            }}>
            <div className="dialogBlock" style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "768px",
            }}>
              <h2> دریافت اطلاعات</h2>
              <div className="form-section">
                <div className="form-row">
                  <div className="input-group half">

                    <Input
                      className=" input-text"
                      placeholder={t("local_contactFullName")}
                      variant="underlined"

                    />
                  </div>
                  <div className="input-group half">

                    <Input
                      className=" input-text"
                      placeholder={t("local_contactPhoneNumber")}
                      variant="underlined"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group half">
                    <Input
                      className=" input-text"
                      placeholder="شرکت"
                      variant="underlined"
                    />
                  </div>
                  <div className="input-group half">
                    <Input
                      className=" input-text"
                      placeholder={t("local_contactEmail")}
                      variant="underlined"
                    />
                  </div>

                </div>
                <div className="form-row">
                  <div className="input-group">
                    <TextArea
                      className=" input-text"
                      rows={4}
                      placeholder="آدرس"
                      variant="underlined"
                    />
                  </div>
                </div>


              </div>
              <div className="dialogFooter">
                <button className="info-btn" onClick={closeDialog}>تایید</button>
                <button className="info-btn  closed" onClick={closeDialog}>خروج</button>
              </div>
            </div>
          </div>
        )}


        {isOpenComments && (
          <div
            className="dialogMain"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              zIndex: 100000,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div className="dialogBlock" style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "768px",
            }}>
              <h2>  پاسخ به ...</h2>
              <div className="form-section">
                <div className="comment-form-block">
                  <div className="form-row ">
                    <div className="input-group half">
                      <Input
                        className="input-text"
                        placeholder="نام و نام خانوادگی"
                        variant="underlined"
                      />
                    </div>
                    <div className="input-group half">
                      <Input
                        className="input-text"
                        placeholder="ایمیل"
                        variant="underlined"
                      />
                    </div>
                  </div>


                </div>

                <div className="form-row textarea-field">
                  <div className="input-group half">
                    <TextArea
                      className="input-text"
                      rows={4}
                      placeholder="کامنت خود را بنویسید"
                      variant="underlined"
                    />
                  </div>
                  <div className="input-group half">
                    <Rate allowHalf onChange={setRating} value={rating} className="black-rate"
                    />

                  </div>
                </div>


              </div>
              <div className="dialogFooter">
                <button className="info-btn" onClick={closeDialogomments}>ارسال</button>
                <button className="info-btn  closed" onClick={closeDialogomments}>خروج</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AppFooter />
    </>
  );
}
