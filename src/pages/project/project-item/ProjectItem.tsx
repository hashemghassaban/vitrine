import { useState } from "react";
import { Tabs, Button, Row, Col } from "antd";
import "./ProjectItem.less";
import { AppButton } from "../../../components/AppButton/AppButton";
import useNavigation from "../../../hooks/useHistory";
import projects from "../../../helpers/project";

interface TabItem {
  key: string;
  label: string;
}


export default function ProjectItem() { 
  const [activeTab, setActiveTab] = useState<string>("1");
  const { push } = useNavigation();
const [visibleCount, setVisibleCount] = useState(2);
const [animatedItems, setAnimatedItems] = useState<number[]>([]);

const loadMore = () => {
  const newItems = filteredContent.slice(visibleCount, visibleCount + 2);
  setVisibleCount(prev => prev + 2);

  // ثبت کردن آیتم‌هایی که باید انیمیشن بگیرن
  setAnimatedItems(prev => [...prev, ...newItems.map(item => item.id)]);
};


  const tabItems: TabItem[] = [
    { key: "1", label: "طراحی داخلی" },
    { key: "2", label: "دسته بندی یک" },
    { key: "3", label: "دسته بندی دو" },
  ];

  // فیلتر محتوا بر اساس تب فعال
  const filteredContent =
    activeTab === "1"
      ? projects
      : projects.filter((block) => block.category === activeTab);

  const visibleProjects = filteredContent.slice(0, visibleCount);
  const hasMore = visibleCount < filteredContent.length;
  return (
    <div className="interior-page-container">
      <Row justify="center" align="middle" style={{ overflow: "auto" }}>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={tabItems.map((tab) => ({ key: tab.key, label: tab.label }))}
          className="interior-tabs"
        />
      </Row>

      {visibleProjects.map((block, index) => (
        <div     className={`content-block-project ${
      animatedItems.includes(block.id) ? "ease-in-item" : ""
    }`}
          key={block.id}>
          <Row align="middle" gutter={[24, 24]}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={14}
              xl={14}
              className="blog__image-project "
              order={index % 2 === 0 ? 2 : 1} 
            >
              <div className="img-box-project" onClick={() => push(`/project/${block.id}`)}>
                <img src={block.img} alt={`pic${block.id}`} />
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={10}
              xl={10}
              className="blog__content-project "
              
              order={index % 2 === 0 ? 1 : 2}
            >
              <div 
             className={` ${index % 2 === 1 ? "even-text-box-project " : "text-box-project  "}`}
              >
            
                <h2 onClick={() => push(`/project/${block.id}`)} className="title-text-box-project">{block.title}</h2>
                <div className="item-box-project " >
                  <p className="title-text-project ">{block.data1[0]}</p>
                  <p className="dec-text-project ">{block.data1[1]}</p>
                </div>
                <div  className="item-box-project " >
                  <p className="title-text-project ">{block.data2[0]}</p>
                  <p className="dec-text-project ">{block.data2[1]}</p>
                </div>
                <div  className="item-box-project " >
                  <p className="title-text-project ">{block.data3[0]}</p>
                  <p className="dec-text-project ">{block.data3[1]}</p>
                </div>
                 <div className="dec-text-project-box">
                 <p className="text-project "> {block.text} </p>
                 </div>
                <Button type="link" onClick={() => push(`/project/${block.id}`)}>
                  مشاهده 
                </Button>
              </div>
           
            </Col>
          </Row>
        </div>
      ))}

   {hasMore && (
  <Row justify="center">
    <AppButton
      className="blog__Button-project"
      onclick={loadMore}
    >
      مقاله‌های بعدی
    </AppButton>
  </Row>
)}
    </div>
  );
}
