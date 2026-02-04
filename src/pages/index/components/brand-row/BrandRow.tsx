import { Row, Col } from "antd";
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
        <p>
          {t("site.indexbrands")}
        </p>
      </Row>
      <div className="brand-scale-container">
        <Row className="brand-scale-row" gutter={0} >
          {brands.map((brand, index) => (
            <Col key={index} className="brand-col">
              <img onClick={() => push(`/${currentLang}/BrandProducts/${brand.id}`)}
                src={brand.logo}
                alt={brand.title}
                className={"brand-img"}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
