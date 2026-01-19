import React, { useEffect } from "react";
import { ConfigProvider, Layout } from "antd";
import faIR from "antd/es/locale/fa_IR";
import enUS from "antd/es/locale/en_US";
import { LanguageProvider, useLanguage } from "./contexts/useLanguage";
import useTranslations from "./hooks/translation/useTranslations";
import { setTranslations } from "./i18n/translationStore";
import Pages from "./pages/Pages";
import "antd/dist/reset.css";
const { Content } = Layout;

const AppContent: React.FC = () => {
  const { currentLang } = useLanguage();
  const isRtl = currentLang === "fa";
  const { getTranslations } = useTranslations(currentLang);

  useEffect(() => {
    getTranslations().then((res) => {
      setTranslations(res.data!);
    });
  }, []);

  return (
    <ConfigProvider
      direction={isRtl ? "rtl" : "ltr"}
      locale={isRtl ? faIR : enUS}
      theme={{
        token: {
          fontFamily: "YekanBakh",
          colorPrimary: "#5e5e5e",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <Pages />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
