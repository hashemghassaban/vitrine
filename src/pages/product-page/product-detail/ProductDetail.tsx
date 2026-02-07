import { Row, Col, Button, Divider, Card, Tag } from "antd";
import "./ProductDetail.less";
import img1 from "../../../assets/products/img1.jpg";
import img4 from "../../../assets/products/image3.png";
import reply from "../../../assets/icon/reply.svg";
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
import { Input, Select , Rate} from "antd";
import TextArea from "antd/es/input/TextArea";
import useProducts from "../../../hooks/products/useProducts";
import truncate from "truncate-html";
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";

export default function ProductDetail() {
  useSyncLanguage();
  const [mainImage, setMainImage] = useState(img1);
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();
  const { currentLang } = useLanguage();
  const { getListProducts, getProductById } = useProducts(currentLang);
  const [product, setproduct] = useState<ProductDetailView | null>(null);
  const [related, setRelated] = useState<ProductView[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const openDialogComments = () => setIsOpenComments(true);
  const closeDialogomments = () => setIsOpenComments(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
const [rating, setRating] = useState(0);
  const thumbnails = [product?.image ?? "", product?.thumbnail ?? ""];
  const { t } = useTranslate();
  
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
  return (
    <>
      {isMobile ? <HomeMobile /> : <AppHeader noBackgroundProducts/>}

      <div className="product-page">
        <Row gutter={[40, 40]} justify="center">
          <Col xs={24} md={24} lg={15} className="product-info">
            <div className="product-info">
              <div className="brand-section" id="sectionDown">
                <div>
                  <div className="date-box">بهار ۲۰۲۵</div>
                  <p className="category-text">
                    دسته‌بندی / {product?.category?.title}
                  </p>
                  <p className="category-code">کد: {product?.code}</p>
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
                  <h3 className="feature-title">ویژگی‌های محصول</h3>

                  {product?.features.map((item, index) => (
                    <div className="feature-item">
                      <span>
                        {item?.feature_title}: {item?.value}
                      </span>
                      {index !== product?.features.length - 1 && <Divider />}
                    </div>
                  ))}
                </div>
                <button className="info-btn"  onClick={openDialog}>دریافت اطلاعات</button>
              </div>
            </div>
          </Col>

          <Col xs={24} md={24} lg={9} className="gallery">
            <div className="main-image">
              <img src={product?.thumbnail} alt="product" />
            </div>

            <div className="thumbs">
              {thumbnails.map((t, i) => (
                <img
                  key={i}
                  src={t}
                  className={`thumb ${mainImage === t ? "active" : ""}`}
                  onClick={() => setMainImage(t)}
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
              <h2 className="description-title">معرفی شوروم ویترین</h2>
              <p className="description-text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطر آنچنان که لازم است. لورم ایپسوم متن ساختگی با
                تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که
                لازم است.
              </p>
            </div>

            <img src={img4} className="description-image" />

            <div>
              <h2 className="description-title">معرفی شوروم ویترین</h2>
              <p className="description-text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطر آنچنان که لازم است. لورم ایپسوم متن ساختگی با
                تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که
                لازم است.
              </p>
            </div>
            <div className="align-center">
              <Button type="link" className="btn-more-brand-products">
                بیشتر
              </Button>
            </div>
            <div className="download-box">
              {product?.brochures.map((item) => (
                <div className="download-content">
                  <p className="download-title">
                    {t("local_getCatalog")}
                  </p>
                  <a href={item} className="download-text">
                    <VerticalAlignBottomOutlined />
                    {t("local_download")}
                  </a>
                </div>
              ))}
            </div>
        <div className="comment-section">
      <h2 className="other-title">
نظرات
              </h2>
  <div className="comment-form">
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
      <div className="input-group half" style={{    display: 'flex',
    alignItems: 'center'}}>
       <span> امتیاز دهید</span>
<Rate allowHalf onChange={setRating} value={rating}  className="black-rate"
 />

      </div>
      <div className="input-group half">
        <TextArea
          className="input-text"
          rows={4}
          placeholder="کامنت خود را بنویسید"
          variant="underlined"
        />
      </div>
       
    </div>

    <div className="form-row block-fill">
      <button className="info-btn" onClick={() => alert("کامنت ارسال شد!")}>
        ارسال
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
          <div   className="dialogBlock"  style={{
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
             <button  className="info-btn" onClick={closeDialog}>تایید</button>
            <button  className="info-btn  closed" onClick={closeDialog}>خروج</button>
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
          <div   className="dialogBlock"  style={{
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
<Rate allowHalf onChange={setRating} value={rating}  className="black-rate"
 />

      </div>
    </div>

          
          </div>
           <div className="dialogFooter">
             <button  className="info-btn" onClick={closeDialogomments}>ارسال</button>
            <button  className="info-btn  closed" onClick={closeDialogomments}>خروج</button>
           </div>
          </div>
        </div>
      )}
      </div>

      <AppFooter />
    </>
  );
}
