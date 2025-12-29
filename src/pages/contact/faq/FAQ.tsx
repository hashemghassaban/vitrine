import { Row, Col, Typography, Collapse } from "antd";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import "./FAQ.less";
import min from "../../../assets/faq/min.png";
import plus from "../../../assets/faq/plus.png";
import { useLanguage } from "../../../contexts/useLanguage";
import type FaqView from "../../../models/views/faqView";
import { useEffect, useState } from "react";
import useFaq from "../../../hooks/contact/useFaq";
const { Title } = Typography;
const { Panel } = Collapse;

export default function FAQ() {
  const [faq, setFaq] = useState<FaqView[]>([]);
  const { currentLang } = useLanguage();
  const { getList } = useFaq(currentLang);
  const isFa = currentLang === "fa";

  const fetchFaq = async () => {
    const { success, data } = await getList();
    if (success && data) {
      setFaq(data);
    }
  };

  useEffect(() => {
    setFaq([]);
    fetchFaq();
  }, [currentLang]);

  return (
    <>
      <AppHeader noBackground title={""} />
      <Row justify="center" align="middle" className="faq-row">
        <Col xs={24} sm={20} md={16} lg={12} className="faq-col">
          <Title level={3} className="faq-title">
            {isFa ? "پرسش‌های متداول" : "Frequently Asked Questions (FAQ)"}
          </Title>

          <Collapse
            bordered={false}
            defaultActiveKey={["0"]}
            className="faq-collapse"
            expandIconPosition="right"
            expandIcon={({ isActive }) =>
              isActive ? (
                <img
                  src={min}
                  alt="min"
                  style={{ fontSize: "24px", color: "white" }}
                />
              ) : (
                <img
                  src={plus}
                  alt="min"
                  style={{ fontSize: "30px", color: "white" }}
                />
              )
            }
          >
            {faq.map((item, idx) => (
              <Panel
                header={<span style={{ color: "#767676 " }}>{item.title}</span>}
                key={idx}
                className="faq-panel"
              >
                <p className="faq-text">{item.content}</p>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    </>
  );
}
