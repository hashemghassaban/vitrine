import { Row, Carousel } from "antd";
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
const isMobile = typeof window !== "undefined"
  ? window.innerWidth < 768
  : false

  const { getList } = useBrands(currentLang);
  const [brands, setBrands] = useState<BrandView[]>([]);
  const { t } = useTranslate();

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
  {brands.length > (isMobile ? 5 : 3 )? (
 <Carousel
  autoplay
  dots={false}
  infinite
  draggable
  speed={600}
  autoplaySpeed={2500}
  cssEase="linear"
  slidesToShow={5}
  slidesToScroll={1}
  responsive={[
    {
      breakpoint: 1200,
      settings: { slidesToShow: 6.5 },
    },
    {
      breakpoint: 992,
      settings: { slidesToShow: 5.5 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 4.5 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 3.5 },
    },
  ]}
>
  {brands.map((brand) => (
    <div key={brand.id} className="brand-slide">
      <img
        onClick={() => push(`/${currentLang}/brand-detail/${brand.id}`)}
        src={brand.logo}
        alt={brand.title}
        className="brand-img"
      />
    </div>
  ))}
 

</Carousel>

  ) : (
    <div className="brand-center">
      {brands.map((brand) => (
        <div key={brand.id} className="brand-slide static">
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
    
    </div>
  )}
</div>

    </section>
  );
}
