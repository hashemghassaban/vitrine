import { Row, Col, Typography, Collapse } from "antd";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import faqData from "../../../helpers/faq";
import "./FAQ.less";
import min from "../../../assets/faq/min.png";
import plus from "../../../assets/faq/plus.png";
const { Title } = Typography;
const { Panel } = Collapse;

export default function FAQ() {
  return (
    <>
      <AppHeader noBackground title={""} />
      <Row justify="center" align="middle" className="faq-row">
        <Col xs={24} sm={20} md={16} lg={12} className="faq-col">
          <Title level={3} className="faq-title">
            پرسش‌های متداول
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
            {faqData.map((item, idx) => (
              <Panel
                header={<span style={{ color: "#767676 " }}>{item.title}</span>}
                key={idx}
                className="faq-panel"
              >
                <p className="faq-text">{item.text}</p>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    </>
  );
}
