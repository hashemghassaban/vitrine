import React from "react";
import { ConfigProvider, Layout } from "antd";
import faIR from "antd/es/locale/fa_IR";
import enUS from "antd/es/locale/en_US";
import { LanguageProvider, useLanguage } from "./contexts/useLanguage";
import Pages from "./pages/Pages";
import "antd/dist/reset.css";
import "./styles/main.less";
const { Content } = Layout;

const AppContent: React.FC = () => {
  const { currentLang } = useLanguage();
  const isRtl = currentLang === "fa";
  return (
    <ConfigProvider
      direction={isRtl ? "rtl" : "ltr"}
      locale={isRtl ? faIR : enUS}
      theme={{
        token: {
          fontFamily: 'Yekan Bakh',
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
