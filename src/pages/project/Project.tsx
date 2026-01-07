import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import ProjectItem from "./project-item/ProjectItem";
import { useLanguage } from "../../contexts/useLanguage";

function Project() {
  const { currentLang } = useLanguage();
  const isFa = currentLang === "fa";
  return (
    <>
      <Layout>
        <AppHeader
          title={
            isFa
              ? "پروژه‌های اجرا شده با ویترین"
              : "Vitrine executed projects"
          }
        />
        <Content>
          <ProjectItem />
        </Content>
      </Layout>
    </>
  );
}

export default Project;
