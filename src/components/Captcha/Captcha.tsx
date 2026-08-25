import React, { useState, useEffect, type ChangeEvent } from "react";
import type { CAPTCHADTO } from "../../models/dtos/captchaDTO";
import { Input } from "antd";
import "./Captcha.less";
import { useTranslate } from "../../i18n/useTranslate";
interface CaptchaProps {
  onVerify: (field: "key" | "captcha", value: any) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [data, setData] = useState<CAPTCHADTO | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const { t } = useTranslate();
  
  
  const fetchCaptcha = async (): Promise<void> => {
    try {
      const response = await fetch(
        "/captcha/api/math",
      );
      
      const result: CAPTCHADTO = await response.json();
            console.log(result);

      setData(result);
      setUserInput("");
      onVerify("key", result.key);
    } catch (error) {
      console.error("Error fetching captcha:", error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setUserInput(val);
    if (data) {
      onVerify("captcha", val);
    }
  };

  if (!data) return <div></div>;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <img
          src={data.img}
          alt="captcha challenge"
          style={{ border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          className="btn-refresh-captcha"
          type="button"
          onClick={fetchCaptcha}
        >
          ↻
        </button>
      </div>
      <Input
        className="input-text-captcha"
        variant="underlined"
        value={userInput}
        onChange={handleChange}
        placeholder={t("local_captchaTextInput")}
         style={{
          display: "flex",
  
        }}
      />
    </div>
  );
};

export default Captcha;
