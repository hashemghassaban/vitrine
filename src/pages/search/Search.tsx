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
const { Paragraph } = Typography;

const Search: React.FC = () => {
  useSyncLanguage();
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
    if (!!query) {
      fetchSearch(query);
    }
  }, [query, currentLang]);

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
                  <Row gutter={[20, 16]} className="result-item" align="middle">
                    <Col xs={24} md={8} xl={5} className="image-block">
                      <Image
                        src={item.thumbnail || img}
                        alt={item.title}
                        preview={false}
                        className="result-image"
                        onClick={() =>
                          push(`/${currentLang}/${item.type}/${item.id}`)
                        }
                      />
                    </Col>

                    <Col xs={24} md={16} xl={19}>
                      <h2
                        className="item-title"
                        onClick={() =>
                          push(`/${currentLang}/${item.type}/${item.id}`)
                        }
                      >
                        {item.title}
                      </h2>
                      <p>
                        {" "}
                        {t("local_category")}: {t(`local_type_${item.type}`)}{" "}
                      </p>
                      <Paragraph className="item-text">
                        {cleanText(item.content).slice(0, 150)}...
                      </Paragraph>

                      <Button
                        className="more-search"
                        type="link"
                        onClick={() =>
                          push(`/${currentLang}/${item.type}/${item.id}`)
                        }
                      >
                        {t("local_readMore")}
                      </Button>
                    </Col>
                  </Row>
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
