import React, { useEffect, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./ContactBranch.less";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";

import media1 from "../../../assets/footer/media1.png";
import media2 from "../../../assets/footer/media2.png";
import media3 from "../../../assets/footer/media3.png";
import media4 from "../../../assets/footer/media4.png";
import media5 from "../../../assets/footer/media5.png";
import media6 from "../../../assets/footer/media6.png";
import { Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ArrowLeftOutlined } from "@ant-design/icons";
import useDepartment from "../../../hooks/department/useDepartment";
import type DepartmentView from "../../../models/views/departmentView";
import type contractBranchDTO from "../../../models/dtos/contractBranchDTO";
import useContactBranch from "../../../hooks/contact/useContactBranch";
import { useLanguage } from "../../../contexts/useLanguage";
const ContactBranch: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentView[]>([]);
  const { submitContractForm } = useContactBranch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<contractBranchDTO>({
    full_name: null,
    email: null,
    phone: null,
    content: null,
    department_id: null,
  });
  const { currentLang } = useLanguage();
  const { getList } = useDepartment(currentLang);
  const isFa = currentLang === "fa";

  const fetchDepartments = async () => {
    const { success, data } = await getList();
    if (success && data) {
      setDepartments(data);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [currentLang]);

  const handleInputChange = (field: keyof contractBranchDTO, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value || null,
    }));
  };

  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (content: string) => {
    messageApi.open({
      icon: <></>,
      content: content,
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\u06F0-\u06F9\s\-\+]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const onSubmit = async () => {
    try {
      const isEmpty =
        !formData.full_name ||
        !formData.email ||
        !formData.phone ||
        !formData.content ||
        !formData.department_id;
      if (isEmpty) {
        showMessage(
          isFa ? "لطفا فرم را تکمیل کنید." : "Please complete the form."
        );
        return;
      }

      if (formData.email && !validateEmail(formData.email)) {
        showMessage(
          isFa ? "ایمیل وارد شده نامعتبر است." : "Invalid email address."
        );
        return;
      }

      if (formData.phone && !validatePhone(formData.phone)) {
        showMessage(
          isFa ? "شماره تماس وارد شده نامعتبر است" : "Invalid phone number."
        );
        return;
      }

      setIsSubmitting(true);
      const resp = await submitContractForm(formData);
      if (resp.success) {
        showMessage(resp.result);
        setFormData({
          full_name: null,
          email: null,
          phone: null,
          content: null,
          department_id: null,
        });
      } else {
        showMessage(resp.result);
      }
    } catch (e: any) {
      showMessage(e?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}
      <AppHeader
        noBackground
        title={isFa ? "تماس با ویترین" : "Contact Vitrine"}
      />
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
                <Input
                  className=" input-text"
                  placeholder={isFa ? "آدرس ایمیل" : "email"}
                  variant="underlined"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="input-group half">
                <Input
                  className=" input-text"
                  placeholder={isFa ? "نام و نام خانوادگی *" : "Full Name *"}
                  variant="underlined"
                  value={formData.full_name || ""}
                  onChange={(e) =>
                    handleInputChange("full_name", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group half">
                <Input
                  className=" input-text"
                  placeholder={isFa ? "شماره تماس" : "Phone Number"}
                  variant="underlined"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="input-group half">
                <Select
                  className=" input-text"
                  placeholder={isFa ? "انتخاب دپارتمان" : "Select Department"}
                  variant="underlined"
                  value={formData.department_id}
                  onChange={(value) =>
                    handleInputChange("department_id", value)
                  }
                  options={departments.map((dept) => ({
                    value: dept.id,
                    label: dept.title,
                  }))}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <TextArea
                  className=" input-text"
                  rows={4}
                  placeholder={isFa ? "موضوع تماس و پیام شما *" : "Message *"}
                  variant="underlined"
                  value={formData.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </div>

            <div className="btn">
              <button
                className="submit-btn"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {isFa ? "ارسال پیام" : "Send Message"} <ArrowLeftOutlined />
              </button>
            </div>
          </div>
        </div>

        <div className="map-section">
          <iframe
            title="شعبه ۱"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.874451075304!2d51.422124684728!3d35.704974980188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0163a9b6c4b1%3A0x8f3c8b9e0c5e5f5e!2sTehran%2C%20Iran!5e0!3m2!1sen!2s!4v1698765432100"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="map-pin">
            <EnvironmentOutlined />
          </div>
        </div>
      </div>
      <AppFooter/>
    </>
  );
};

export default ContactBranch;
