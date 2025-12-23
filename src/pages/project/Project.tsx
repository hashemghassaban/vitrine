import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import ProjectItem from "./project-item/ProjectItem";



function Project() {


  return (
    <>
      <Layout>
        <AppHeader title={"پروژه‌های اجرا شده با ویترین"} />
        <Content>
         
        <ProjectItem />
        </Content>
      </Layout>
    </>
  );
}

export default Project;
