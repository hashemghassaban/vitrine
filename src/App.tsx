import React, { useEffect } from "react";
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

/** Baseline strings before remote translations load (also used on SSR first paint). */
setTranslations(localTranslations);

const { Content } = Layout;

const AppContent: React.FC = () => {
  const { currentLang, isRtl } = useLanguage();
  const { getTranslations } = useTranslations(currentLang);

  useEffect(() => {
    let cancelled = false;

    getTranslations()
      .then((res) => {
        if (cancelled) return;
        const remote = Array.isArray(res.data) ? res.data : [];
        const local = localTranslations.filter((c) => !remote.some((d) => d.key === c.key));
        setTranslations([...local, ...remote]);
      })
      .catch(() => {
        if (!cancelled) setTranslations(localTranslations);
      });

    return () => {
      cancelled = true;
    };
  }, [currentLang]);

  return (
    <ConfigProvider
      direction={isRtl ? "rtl" : "ltr"}
      locale={currentLang === "fa" ? faIR : currentLang === "en" ? enUS : arEG}
      theme={{
        token: {
          fontFamily:isRtl ? 'YekanBakh' : "-apple-system,BlinkMacSystemFont,San Francisco,HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Segoe UI,Fira Sans,Roboto,Oxygen,Ubuntu,Droid Sans,Arial,Microsoft YaHei,sans-serif;",
          colorPrimary: "#5e5e5e",
        },
      }}
      warning={{ strict: false }}
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
