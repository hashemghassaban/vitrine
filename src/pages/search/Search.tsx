import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Image, Button } from "antd";
import "./Search.less";
import img from "../../assets/video-block/video-block.png";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import useNavigation from "../../hooks/useHistory";
import type { SearchItemView } from "../../models/views/searchView";
import useSearch from "../../hooks/search/useSearch";
import { useLanguage } from "../../contexts/useLanguage";
import { useSearchParams } from "react-router-dom";
import { cleanText } from "../../helpers/cleanText";
import { useTranslate } from "../../i18n/useTranslate";
import { useSyncLanguage } from "../../i18n/useSyncLanguage";
import LoadingSpin from "../../components/Loading/LoadingSpin";
import usePageMetadata from "../../hooks/usePageMetadata";

const { Paragraph } = Typography;

const Search: React.FC = () => {
  useSyncLanguage();
            usePageMetadata();
  
  const { push } = useNavigation();
  const [items, setItems] = useState<SearchItemView[]>([]);
  const { currentLang } = useLanguage();
  const { search } = useSearch(currentLang);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("s");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const fetchSearch = async (query: string) => {
    setLoading(true);
    const { success, data } = await search(query);
    if (success) {
      setItems(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    const queryTitle = query?.replace(/-/g, ' ');
    if (!!queryTitle) {
      fetchSearch(queryTitle);
    }
  }, [query, currentLang]);

  const getItemUrl = (item: SearchItemView) => {
    if (item.type === "pages") {
      switch (item.slug) {
        case t("local_Services"):
          return `/${currentLang}/services`;
        case t("local_Projects"):
          return `/${currentLang}/project`;
        case t("local_Catalogues"):
          return `/${currentLang}/catalogue`;
        case t("local_Representation"):
          return `/${currentLang}/agents`;
        case t("local_About"):
          return `/${currentLang}/about`;
        case t("local_Contact"):
          return `/${currentLang}/contact`;
        case t("local_Brands"):
          return `/${currentLang}/brands`;
      }
    }
    return `/${currentLang}/${item.type}/${item.type === "pages" ? item.slug : item.id}`;
  };

  if (!query) {
    return (
      <>
        <AppHeader noBackground title={t("local_search")} />
        <div className="search-results-container">
          <p style={{ textAlign: "center" }}>{t("local_noSearchQuery")}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader noBackground title={t("local_searchResults1")} />
      {!loading ? (
        <div className="search-results-container">
          <Row justify="center" align="middle">
            <Col xs={22} sm={20} md={18} lg={16} xl={17}>
              <p className="results-title">
                {`${items.length} ${t("local_searchResults2")}`}
              </p>

              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="result-item-Block">
                  <Row gutter={[20, 16]} className="result-item" align="middle">
                    <Col xs={24} md={8} xl={5} className="image-block">
                      <Image
                        src={item.thumbnail || img}
                        alt={item.title}
                        preview={false}
                        className="result-image"
                        onClick={() =>
                          push(getItemUrl(item))
                        }
                      />
                    </Col>

                    <Col xs={24} md={16} xl={19} className="item-info">
                      <h2
                        className="item-title"
                        onClick={() =>
                          push(getItemUrl(item))
                        }
                      >
                        {item.title}
                      </h2>
                      <p className="item-category">
                        {t("local_category")}: {t(`local_type_${item.type}`)}
                      </p>
                      <Paragraph className="item-text">
                        {cleanText(item.content).slice(0, 150)}...
                      </Paragraph>

                      <Button
                        className="more-search"
                        type="link"
                        onClick={() =>
                          push(getItemUrl(item))
                        }
                      >
                        {t("local_readMore")}
                      </Button>
                    </Col>
                  </Row>
                  </div>
                </React.Fragment>
              ))}
            </Col>
          </Row>
        </div>
      ) : (
        <div style={{ height: 500 }}></div>
      )}
      <AppFooter />
    </>
  );
};

export default Search;
