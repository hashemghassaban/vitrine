import { useState } from "react";
import { Tabs, Button, Row, Col } from "antd";

import "./InteriorPage.less";
import img1 from "../../../assets/blog/img1.png";
import img2 from "../../../assets/blog/img2.png";
import { AppButton } from "../../../components/AppButton/AppButton";
import useNavigation from "../../../hooks/useHistory";

interface TabItem {
  key: string;
  label: string;
}

interface ContentBlock {
  id: number;
  category: string;
  title: string;
  text: string;
  img: string;
}

export default function InteriorPage() {
  const [activeTab, setActiveTab] = useState<string>("1");
  const { push } = useNavigation();

  const tabItems: TabItem[] = [
    { key: "1", label: "طراحی داخلی" },
    { key: "2", label: "دسته بندی یک" },
    { key: "3", label: "دسته بندی دو" },
  ];

  const contentBlocks: ContentBlock[] = [
    {
      id: 1,
      category: "2",
      title: "معرفی شوروم ویترین",
      text: "لورم ایپسوم متن ساختگی برای صنعت چاپ و صفحه‌آرایی. استفاده شده برای تکمیل گرافیک در صفحات وب.",
      img: img1,
    },
    {
      id: 2,
      category: "3",
      title: "معرفی شوروم ویترین",
      text: "لورم ایپسوم متن ساختگی برای صنعت چاپ و صفحه‌آرایی. استفاده شده برای تکمیل گرافیک در صفحات وب.",
      img: img2,
    },
  ];

  // فیلتر محتوا بر اساس تب فعال
  const filteredContent =
    activeTab === "1"
      ? contentBlocks
      : contentBlocks.filter((block) => block.category === activeTab);

  return (
    <div className="interior-page-container">
      <Row justify="center" align="middle" style={{overflow:"auto"}}>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={tabItems.map((tab) => ({ key: tab.key, label: tab.label }))}
          className="interior-tabs"
        />
      </Row>

      {filteredContent.map((block, index) => (
        <div className="content-block" key={block.id}>
          <Row align="middle" gutter={[12,50]}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              className="blog__image"
              order={index % 2 === 0 ? 1 : 2} 
            >
              <div className="img-box">
                <img src={block.img} alt={`pic${block.id}`}  onClick={() => push(`/blog/${block.id}`)}/>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              className={` ${index % 2 === 1 ? "even-content" : "blog__content"}` }
              order={index % 2 === 0 ? 2 : 1}
            >
              <div className="text-box">
                <h2  onClick={() => push(`/blog/${block.id}`)} className="h2-box">{block.title}  </h2>
                <p  className="p-box"> {block.text} {block.text}</p>
                <Button type="link" onClick={() => push(`/blog/${block.id}`)}>
                  خواندن مقاله 
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      ))}

      <Row justify="center">
        <AppButton className="blog__Button">مقاله‌های بعدی</AppButton>
      </Row>
    </div>
  );
}
