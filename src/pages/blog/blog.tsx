import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import InteriorPage from "./interior-page/InteriorPage";


function Blog() {


  return (
    <>
      <Layout>
        <AppHeader  noBackground title={"مقالات"} text={"دسته‌بندی یک و دسته‌بندی دیگر"} />
        <Content>
            <InteriorPage />
        </Content>
      </Layout>
    </>
  );
}

export default Blog;
