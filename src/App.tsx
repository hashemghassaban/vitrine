import React, { useEffect, useState } from "react";
import { ConfigProvider, Layout } from "antd";
import faIR from "antd/es/locale/fa_IR";
import enUS from "antd/es/locale/en_US";
import arEG from "antd/es/locale/ar_EG";
import { LanguageProvider, useLanguage } from "./contexts/useLanguage";
import useTranslations from "./hooks/translation/useTranslations";
import { setTranslations } from "./i18n/translationStore";
import Pages from "./pages/Pages";
import "antd/dist/reset.css";
import { localTranslations } from "./i18n/localTranslations";
const { Content } = Layout;

const AppContent: React.FC = () => {
  const { currentLang, isRtl } = useLanguage();
  const { getTranslations } = useTranslations(currentLang);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTranslations().then((res) => {
      const local = localTranslations.filter((c) => !res.data!.some((d) => c.key == d.key));
      setTranslations([...local, ...res.data!]);
      setLoading(false);
    });
  }, []);

  return (
    <ConfigProvider
      direction={isRtl ? "rtl" : "ltr"}
      locale={currentLang === "fa" ? faIR : currentLang === "en" ? enUS : arEG}
      theme={{
        token: {
          fontFamily: "YekanBakh",
          colorPrimary: "#5e5e5e",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        {!loading && (
          <Content>
            <Pages />
          </Content>
        )}
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
