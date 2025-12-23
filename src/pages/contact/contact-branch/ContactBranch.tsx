import React from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./ContactBranch.less";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import media1 from "../../../assets/footer/media1.png";
import media2 from "../../../assets/footer/media2.png";
import media3 from "../../../assets/footer/media3.png";
import media4 from "../../../assets/footer/media4.png";
import media5 from "../../../assets/footer/media5.png";
import media6 from "../../../assets/footer/media6.png";
import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ArrowLeftOutlined } from "@ant-design/icons";
const ContactBranch: React.FC = () => {
  return (
    <>
      <AppHeader noBackground title={"تماس با ویترین"}  />
      <div className="contact-branch-container">
        <div className="contact-content">
          <div className="header-section">
            <h1 className="title">/ نشانی</h1>
            <p className="description">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </p>
          </div>

          <div className="info-item contact-info">
            <p className="info-text">/تلفن</p>
            <span>۰۲۱ - ۲۲۳۳ ۴۴ ۵۵</span>
          </div>

          <div className="action-icons">
            <img src={media1} className="action-icon" />
            <img src={media2} className="action-icon" />
            <img src={media3} className="action-icon" />
            <img src={media4} className="action-icon" />
            <img src={media5} className="action-icon" />
            <img src={media6} className="action-icon" />
          </div>

          <div className="form-section">
            <div className="form-row">
              <div className="input-group half">
                <Input className=" input-text" placeholder="آدرس ایمیل" variant="underlined" />
              </div>
              <div className="input-group half">
                <Input className=" input-text"
                  placeholder="نام و نام خانوادگی *"
                  variant="underlined"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group half">
                <Input className=" input-text" placeholder="شماره تماس" variant="underlined" />
              </div>
              <div className="input-group half">
                <Select className=" input-text"
                  placeholder="انتخاب دپارتمان"
                  variant="underlined"
                  options={[
                    {
                      value: "1",
                      label: "زیرعنوان",
                    },
                    {
                      value: "2",
                      label: "زیرعنوان",
                    },
                    {
                      value: "3",
                      label: "زیرعنوان",
                    },
                  ]}
                />
              </div>
            </div>
                <div className="form-row">
              <div className="input-group" >
               <TextArea className=" input-text" rows={4}  placeholder="موضوع تماس و پیام شما *"  variant="underlined" maxLength={6} />
              </div>

            </div>
      
            
             <div  className="btn">
                 <button className="submit-btn">ارسال پیام <ArrowLeftOutlined/></button>
             </div>
           
          </div>
        </div>

        <div className="map-section">
          <iframe
            title="شعبه ۱"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.874451075304!2d51.422124684728!3d35.704974980188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0163a9b6c4b1%3A0x8f3c8b9e0c5e5f5e!2sTehran%2C%20Iran!5e0!3m2!1sen!2s!4v1698765432100"
            width="100%"
            height="100%"
            style={{ border: 0, }}
            allowFullScreen 
            loading="lazy"
          ></iframe>
          <div className="map-pin">
            <EnvironmentOutlined />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactBranch;
