import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import ProjectItem from "./project-item/ProjectItem";
import { useTranslate } from "../../i18n/useTranslate";
import { useSyncLanguage } from "../../i18n/useSyncLanguage";

function Project() {
  useSyncLanguage();
  const { t } = useTranslate();
  return (
    <>
      <Layout>
        <AppHeader title={t("site.projectlist1")} />
        <Content>
          <ProjectItem />
        </Content>
      </Layout>
    </>
  );
}

export default Project;
