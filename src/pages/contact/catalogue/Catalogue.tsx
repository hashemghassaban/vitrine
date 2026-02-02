import { Row, Col, Card, Typography } from "antd";
import "./Catalogue.less";

import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";

import download from "../../../assets/icon/download.png";
import type { DocumentItem } from "../../../models/views/catalogueView";
import { useLanguage } from "../../../contexts/useLanguage";
import useDocuments from "../../../hooks/contact/useCatalogue";
import { useTranslate } from "../../../i18n/useTranslate";
import { useEffect, useState } from "react";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
const { Title } = Typography;

export default function Catalogue() {
  useSyncLanguage();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const { currentLang } = useLanguage();
  const { getList } = useDocuments(currentLang);
  const { t } = useTranslate();

  const fetchDocuments = async () => {
    const { success, data } = await getList();
    if (success && data) {
      setDocuments(data);
    }
  };

  useEffect(() => {
    setDocuments([]);
    fetchDocuments();
  }, [currentLang]);

  return (
    <>
      <AppHeader />
      <div className="showcase-container">
        <Row justify="center">
          <h2 className="title">{t("site.catalog1")}</h2>
        </Row>
        <Row gutter={[24, 24]} justify="center">
          {documents.map((item) => (
            <Col
              className="showcase-col"
              key={item.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Card
                hoverable
                className="showcase-card"
                cover={
                  <img className="img-card" src={item.image} alt={item.title} />
                }
              >
                <Title level={5} className="book-title">
                  {item.title}
                </Title>

                <Row justify={"end"}>
                  <a
                    href={item.link}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn download-link"
                  >
                    <img src={download} alt="download" />
                    {t("local_download")}
                  </a>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <AppFooter />
    </>
  );
}
