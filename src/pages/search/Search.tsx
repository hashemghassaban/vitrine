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
const { Paragraph } = Typography;

const Search: React.FC = () => {
  const { push } = useNavigation();
  const [items, setItems] = useState<SearchItemView[]>([]);
  const { currentLang } = useLanguage();
  const { search } = useSearch(currentLang);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("s");
  const isFa = currentLang === "fa";

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      const { success, data } = await search(query);
      if (success && data) {
        setItems(data);
      }
    };

    setItems([]);
    fetchSearch();
  }, [query, currentLang]);

  if (!query) {
    return (
      <>
        <AppHeader noBackground title={isFa ? "جستجو" : "Search"} />
        <div className="search-results-container">
          <p style={{ textAlign: "center" }}>
            {isFa
              ? "عبارتی برای جستجو وارد نشده است"
              : "No search query provided"}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <AppHeader noBackground title={isFa ? "نتایج جستجو" : "Search results"} />
      <div className="search-results-container">
        <Row justify="center" align="middle">
          <Col xs={22} sm={20} md={18} lg={16} xl={17}>
            <p className="results-title">
              {" "}
              {isFa
                ? `${items.length} نتیجه در جستجوی ویترین`
                : `${items.length} results for search `}
            </p>

            {items.map((item) => (
              <React.Fragment key={item.id}>
                <Row gutter={[20, 16]} className="result-item" align="middle">
                  <Col xs={24} md={8} xl={5}>
                    <Image
                      src={item.thumbnail || img}
                      alt={item.title}
                      preview={false}
                      className="result-image"
                      onClick={() => push(`/${item.type}/${item.id}`)}
                    />
                  </Col>

                  <Col xs={24} md={16} xl={19}>
                    <h2
                      className="item-title"
                      onClick={() => push(`/${item.type}/${item.id}`)}
                    >
                      {item.title}
                    </h2>

                    <Paragraph className="item-text">
                      {cleanText(item.content).slice(0, 150)}...
                    </Paragraph>

                    <Button
                      className="more-search"
                      type="link"
                      onClick={() => push(`/${item.type}/${item.id}`)}
                    >
                      {isFa ? " ادامه مطلب" : "Read more"}
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            ))}
          </Col>
        </Row>
      </div>
      <AppFooter />
    </>
  );
};

export default Search;
