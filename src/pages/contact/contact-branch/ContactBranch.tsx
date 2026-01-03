import React, { useEffect, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./ContactBranch.less";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import instagram from "../../../assets/footer/media1.png";
import whatsapp from "../../../assets/footer/media2.png";
import linkedin from "../../../assets/footer/media3.png";
import telegram from "../../../assets/footer/media4.png";
import facebook from "../../../assets/footer/media5.png";
import youtube from "../../../assets/footer/media6.png";
import { Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ArrowLeftOutlined } from "@ant-design/icons";
import useDepartment from "../../../hooks/department/useDepartment";
import type DepartmentView from "../../../models/views/departmentView";
import type contractBranchDTO from "../../../models/dtos/contractBranchDTO";
import useContactBranch from "../../../hooks/contact/useContactBranch";
import { useLanguage } from "../../../contexts/useLanguage";
import useSetting from "../../../hooks/setting/useSetting";
import type { SettingView } from "../../../models/views/settingView";

const ContactBranch: React.FC = () => {
  const { currentLang } = useLanguage();
  const { getSetting } = useSetting(currentLang);
  const { getList } = useDepartment(currentLang);
  const { submitContractForm } = useContactBranch();

  const [setting, setSetting] = useState<SettingView | null>(null);
  const [departments, setDepartments] = useState<DepartmentView[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<contractBranchDTO>({
    full_name: null,
    email: null,
    phone: null,
    content: null,
    department_id: null,
  });

  const isFa = currentLang === "fa";

  const fetchDepartments = async () => {
    const { success, data } = await getList();
    if (success && data) {
      setDepartments(data);
    }
  };

  const fetchSettings = async () => {
    const { success, data } = await getSetting();
    if (success && data) {
      setSetting(data);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchSettings();
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
  const mapSrc = setting?.google_map_address?.match(/src="([^"]+)"/)?.[1] || "";
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
            <h1 className="title">{isFa ? " نشانی/" : "/Address"} </h1>
            <p className="description">{setting?.address}</p>
          </div>

          <div className="info-item contact-info">
            <p className="info-text">{isFa ? "تلفن/" : "/phone"} </p>
            <span> {setting?.tel}</span>
          </div>

          <div className="action-icons">
            <a href={setting?.instagram_url} target="_blank">
              <img src={instagram} className="action-icon" alt="Instagram" />
            </a>
            <a href={setting?.whatsapp_url} target="_blank">
              <img src={whatsapp} className="action-icon" alt="WhatsApp" />
            </a>
            <a href={setting?.linkedin_url} target="_blank">
              <img src={linkedin} className="action-icon" alt="linkedin" />
            </a>
            <a href={setting?.telegram_url} target="_blank">
              <img src={telegram} className="action-icon" alt="telegram" />
            </a>
            <a href={setting?.facebook_url} target="_blank">
              <img src={facebook} className="action-icon" alt="facebook" />
            </a>
            {/* <a href={setting?.twitter_url} target="_blank">
              <img src={twitter} className="action-icon" alt="twitter" />
            </a> */}
            <a href={setting?.youtube_url} target="_blank">
              <img src={youtube} className="action-icon" alt="youtube" />
            </a>
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
            title={setting?.city}
            src={mapSrc}
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
