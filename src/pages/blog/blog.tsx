import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import { AppFooter } from "../../components/AppFooter/AppFooter";

import InteriorPage from "./interior-page/InteriorPage";

import { useSyncLanguage } from "../../i18n/useSyncLanguage";

function Blog() {
  useSyncLanguage();


  return (
    <>
      <Layout>
        <Content>
          <InteriorPage />
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
}

export default Blog;
