import { Row, Col, Button, Divider, Card, Tag } from "antd";
import "./ProductDetail.less";
import img1 from "../../../assets/products/img1.jpg";
import img2 from "../../../assets/products/img2.jpg";
import img3 from "../../../assets/brand-row/brand5.png";
import img4 from "../../../assets/products/image3.png";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { useState } from "react";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useIsMobile } from "../../../helpers/useIsMobile";
import HomeMobile from "../../index/components/home_mobile/HomeMobile";

type ProductItem = {
  img: string;
  title: string;
  code: string;
};

const products: ProductItem[] = [
  { img: img1, title: "عنوان تست دوش", code: "comin soon" },
  { img: img2, title: "عنوان تست دوش", code: "comin soon" },
  { img: img1, title: "عنوان تست دوش", code: "comin soon" },
  { img: img1, title: "عنوان تست دوش", code: "comin soon" },
  { img: img2, title: "عنوان تست دوش", code: "comin soon" },
];
export default function ProductDetail() {
  const thumbnails = [img1, img2];
  const [mainImage, setMainImage] = useState(img1);
 const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? <HomeMobile /> : <AppHeader /> }
      
      <div className="product-page">
        <Row gutter={[40, 40]} justify="center">
          <Col xs={24} md={12} lg={15} className="product-info">
            <div className="product-info">
              <div className="brand-section">
                <div>
                  <div className="date-box">بهار ۲۰۲۵</div>
                  <p className="category-text">دسته‌بندی / شیرآلات</p>
                  <p className="category-code">کد: ۳۳۳۹۲۲</p>
                </div>
                <img src={img3} className="brand-logo-product" />
              </div>

              <h2 className="product-title">معرفی شیرآلات ویترین</h2>

              <p className="product-desc">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطر آنچنان که لازم است. لورم ایپسوم متن ساختگی با
                تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که
                لازم است.
              </p>

              <div className="additional-info">
                <div className="feature-box">
                  <h3 className="feature-title">ویژگی‌های محصول</h3>

                  <div className="feature-item">
                    <span>جنس: استیل</span>
                    <Divider />
                  </div>

                  <div className="feature-item">
                    <span>رنگها: طلایی</span>
                    <Divider />
                  </div>

                  <div className="feature-item">
                    <span>ساخت: ایتالیا</span>
                    <Divider />
                  </div>

                  <div className="feature-item">
                    <span>گارانتی: دارد</span>
                    <Divider />
                  </div>
                </div>
                <Button className="info-btn">دریافت اطلاعات</Button>
              </div>
            </div>
          </Col>

          <Col xs={24} md={10} lg={9} className="gallery">
            <div className="main-image">
              <img src={mainImage} alt="product" />
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
              <div className="download-content">
                <p className="download-title"> دریافت کاتالوگ</p>
                <p className="download-text">
                  <VerticalAlignBottomOutlined />
                  دانلود
                </p>
              </div>
              <div className="download-content">
                <p className="download-title"> دریافت کاتالوگ</p>
                <p className="download-text">
                  <VerticalAlignBottomOutlined />
                  دانلود
                </p>
              </div>
              <div className="download-content">
                <p className="download-title"> دریافت کاتالوگ</p>
                <p className="download-text">
                  <VerticalAlignBottomOutlined />
                  دانلود
                </p>
              </div>
            </div>

          <div className="other-box">
  <h2 className="other-title">محصولات مرتبط</h2>
  
  <Row className="other-box-row" gutter={[16, 24]} justify="center">
    {products.map((item, index) => (
      <Col 
        key={index} 
        xs={24}    
        sm={12}   
        md={8}     
        lg={6}      
        xl={5}    
      >
        <Card
          hoverable
          className="showcase-card-product-another"
          cover={
            <img
              src={item.img}
              alt="product"
              className="img-card-product"
            />
          }
        >
          <div className="selected-tags-item">
            <Tag>
              <div className="pulse-tag">{item.code}</div>
            </Tag>
          </div>
          <p className="product-title-product">{item.title}</p>
        </Card>
      </Col>
    ))}
  </Row>
</div>
        
          </Col>
        </Row>
      </div>
    </>
  );
}
