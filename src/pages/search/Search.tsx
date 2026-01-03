import React from "react";
import { Row, Col, Typography, Image, Button , Divider } from "antd";
import "./Search.less";
import img from "../../assets/video-block/video-block.png";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import useNavigation from "../../hooks/useHistory";
import projects from "../../helpers/project";
const {  Paragraph } = Typography;

const Search: React.FC = () => {
  const items = [1, 2];
  const { push } = useNavigation();
  return (
    <>
      <AppHeader noBackground title={"نتایج جستجو"} />
      <div className="search-results-container">
        <Row justify="center"   align="middle" >
          <Col xs={22} sm={20} md={18} lg={16} xl={17}>
            <p  className="results-title">
            ۳ نتیجه در جستجوی ویترین
            </p>
            {items.map((item , index) => (
              <>
              <Row
             
                key={item}
                gutter={[20, 16]}
                className="result-item"
                align="middle"
              >
                 <Col xs={24} md={8}  lg={8} xl={5} className="image-col">
                  <Image onClick={() => push(`/project/${projects[0].id}`)}
                    src={img}
                    alt="thumbnail"
                    preview={false}
                    className="result-image"
                  />
                </Col>
                <Col xs={24} md={16}  lg={16} xl={19}>
                  <h2  className="item-title" onClick={() => push(`/project/${projects[0].id}`)}>
                    معرفی شهروند ویترین
                  </h2>

                  <Paragraph className="item-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطر آنچنان که لازم است.
                  </Paragraph>
                <Button  className="more-search" type="link" onClick={() => push(`/project/${projects[0].id}`)} >
                 ادامه مطلب
                </Button>
                </Col>

               
              </Row>
              {(index + 1) !== items?.length && (
                  <Divider className="modal-divider" />
 
              )}
             
              </>
            ))}
          </Col>
        </Row>
      </div>
      <AppFooter/>
    </>
  );
};

export default Search;


