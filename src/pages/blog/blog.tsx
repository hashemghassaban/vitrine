import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import InteriorPage from "./interior-page/InteriorPage";
import { useTranslate } from "../../i18n/useTranslate";

function Blog() {
  const { t } = useTranslate();

  return (
    <>
      <Layout>
        <AppHeader
          noBackground
          title={t("site.blog11")}
          text={t("site.blog22")}
        />
        <Content>
          <InteriorPage />
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
}

export default Blog;
