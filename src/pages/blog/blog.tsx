import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import InteriorPage from "./interior-page/InteriorPage";
import { useLanguage } from "../../contexts/useLanguage";

function Blog() {
  const { currentLang } = useLanguage();
  const isFa = currentLang === "fa";

  return (
    <>
      <Layout>
        <AppHeader
          noBackground
          title={isFa ? "مقالات" : "Blogs"}
          // text={"دسته‌بندی یک و دسته‌بندی دیگر"}
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
