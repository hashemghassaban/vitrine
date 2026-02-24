import { Row, Col, Carousel } from "antd";
import { useEffect, useState, type JSX } from "react";
import "./BrandRow.less";
import { useTranslate } from "../../../../i18n/useTranslate";
import type BrandView from "../../../../models/views/brandView";
import { useLanguage } from "../../../../contexts/useLanguage";
import useBrands from "../../../../hooks/brand/useBrands";
import useNavigation from "../../../../hooks/useHistory";
export function BrandRow(): JSX.Element {
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
 
  const { getList } = useBrands(currentLang);
  const [brands, setBrands] = useState<BrandView[]>([]);
  const { t } = useTranslate();

  const [isCarouselNeeded, setIsCarouselNeeded] = useState(false);
  useEffect(() => {
    const checkWidth = () => {
      const totalContentWidth = brands.length * 250;
      setIsCarouselNeeded(window.innerWidth < totalContentWidth + 40);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [brands.length]);

  useEffect(() => {
    const fetchBrands = async () => {
      const { success, data } = await getList();
      if (success && data) {
        setBrands(data);
      }
    };
    fetchBrands();
  }, [currentLang]);

  return (
    <section className="brand-section">
      <Row className="brand-title" justify="center" align="middle">
        <h2>{t("site.indexbrands")}</h2>
      </Row>
      <div className="brand-scale-container">
        {isCarouselNeeded ? (
          <Carousel
            autoplay
            dots={false}
            infinite
            draggable
            speed={1000}
            autoplaySpeed={2000}
            style={{ paddingInline: 50 }}
            slidesToShow={7}
            responsive={[
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 6,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                },
              },
            ]}
          >
            {brands.map((brand) => (
              <div key={brand.id} className="brand-slide">
                <img
                  onClick={() =>
                    push(`/${currentLang}/brand-detail/${brand.id}`)
                  }
                  src={brand.logo}
                  alt={brand.title}
                  className="brand-img"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Row className="brand-scale-row">
            {brands.map((brand) => (
              <Col key={brand.id} className="brand-col">
                <img
                  onClick={() =>
                    push(`/${currentLang}/brand-detail/${brand.id}`)
                  }
                  src={brand.logo}
                  alt={brand.title}
                  className="brand-img"
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  );
}
