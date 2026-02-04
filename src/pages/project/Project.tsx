import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import ProjectItem from "./project-item/ProjectItem";

import { useSyncLanguage } from "../../i18n/useSyncLanguage";
import { AppFooter } from "../../components/AppFooter/AppFooter";

function Project() {
  useSyncLanguage();

  return (
    <>
      <Layout>
        <Content>
          <ProjectItem />
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
}

export default Project;
