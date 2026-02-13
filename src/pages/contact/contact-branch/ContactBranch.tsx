import React, { useEffect, useState } from "react";
import "./ContactBranch.less";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import instagram from "../../../assets/footer/media1.png";
import Marker from "../../../assets/icon/pin.png";
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
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
import { validateEmail, validatePhone } from "../../../helpers/validation";
import Captcha from "../../../components/Captcha/Captcha";

const ContactBranch: React.FC = () => {
  useSyncLanguage();
  const { currentLang } = useLanguage();
  const { getSetting } = useSetting(currentLang);
  const { getList } = useDepartment(currentLang);
  const { submitContractForm } = useContactBranch();

  const [setting, setSetting] = useState<SettingView | null>(null);
  const [departments, setDepartments] = useState<DepartmentView[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<contractBranchDTO>(
    {} as contractBranchDTO,
  );
  const { t } = useTranslate();

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

  const mapSrc = setting?.google_map_address?.match(/src="([^"]+)"/)?.[1] || "";
  const onSubmit = async () => {
    try {
      const isEmpty =
        !formData.full_name ||
        !formData.email ||
        !formData.phone ||
        !formData.content ||
        !formData.department_id ||
        !formData.captcha;
      if (isEmpty) {
        showMessage(t("local_completeTheForm"));
        return;
      }

      if (formData.email && !validateEmail(formData.email)) {
        showMessage(t("local_invalidEmail"));
        return;
      }

      if (formData.phone && !validatePhone(formData.phone)) {
        showMessage(t("local_invalidPhone"));
        return;
      }

      setIsSubmitting(true);
      const resp = await submitContractForm(formData);
      if (resp.success) {
        showMessage(resp.result);
        setFormData({} as contractBranchDTO);
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
      <AppHeader noBackground title={t("local_contactVitrine")} />
      <div className="contact-branch-container">
        <div className="contact-content">
          <div className="header-section">
            <h1 className="title">{t("local_contactAddress")} </h1>
            <p className="description">{setting?.address}</p>
          </div>

          <div className="info-item contact-info">
            <p className="info-text">{t("local_contactPhone")} </p>
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
                  placeholder={t("local_contactFullName")}
                  variant="underlined"
                  value={formData.full_name || ""}
                  onChange={(e) =>
                    handleInputChange("full_name", e.target.value)
                  }
                />
              </div>
              <div className="input-group half">
                <Input
                  className=" input-text"
                  placeholder={t("local_contactPhoneNumber")}
                  variant="underlined"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group half">
                <Input
                  className=" input-text"
                  placeholder={t("local_contactEmail")}
                  variant="underlined"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="input-group half">
                <Select
                  className=" input-text custom-select"
                  placeholder={t("local_contactSelectDepartment")}
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
                  placeholder={t("local_contactMessageContent")}
                  variant="underlined"
                  value={formData.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                {!isSubmitting && <Captcha onVerify={handleInputChange} />}
              </div>
            </div>
            <div className="btn">
              <button
                className="submit-btn"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {t("local_contactSendMessage")} <ArrowLeftOutlined />
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
            <img src={Marker} className="action" alt="WhatsApp" />
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default ContactBranch;
