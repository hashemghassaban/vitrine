import React from 'react';
import { Row, Col, Input } from 'antd';
import {
  SearchOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import './AppHeaderMobile.less';
import  img from "../../assets/header/mobile.png";

const AppHeaderMobile: React.FC = () => {
  return (
    <div className="mobile-showcase">
      <Row>
        {/* Header */}
        <Col span={24} className="header">
          <CloseOutlined />
          <span className="lang">En</span>
        </Col>

        {/* Search */}
        <Col span={24} className="search">
          <Input
            prefix={<SearchOutlined />}
            placeholder="جستجو"
           
          />
        </Col>

        {/* Menu */}
        <Col span={24} className="menu">
          <ul>
            <li>محصولات</li>
            <li>شیرآلات</li>
            <li>سرویس‌ها</li>
            <li>درباره ما</li>
            <li>تماس</li>
          </ul>
        </Col>

        {/* Add */}
        <Col span={24} className="add">
          <PlusOutlined />
          <span>افزودن</span>
        </Col>

        {/* Image */}
        <Col span={24} className="image">
          <img src={img} alt="product" />
        </Col>
      </Row>
    </div>
  );
};

export default AppHeaderMobile ;
