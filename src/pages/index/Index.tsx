import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Home } from "./components/home/Home";
import { BrandRow } from "./components/brand-row/BrandRow";
import { Blog } from "./components/blog/Blog";
import { BusinessPlan } from "./components/business-plan/BusinessPlan";
import { ExploreSection } from "./components/explore-section/ExploreSection";
import { Service } from "./components/service/Service";
import { Showcase } from "./components/showcase/Showcase";
import { VideoBlock } from "./components/video-block/VideoBlock";
import { AppFooter } from "../../components/AppFooter/AppFooter";
import { FullPageOverlay } from "./components/full-page-overlay/FullPageOverlay";

import { useIsMobile } from "../../helpers/useIsMobile";
import HomeMobile from "./components/home_mobile/HomeMobile";
function Index() {
  const isMobile = useIsMobile();
  return (
    <>
      <Layout>
        <Content>
          {isMobile ? <HomeMobile /> : <Home />  }
          <BrandRow />
          <BusinessPlan />
          <VideoBlock />
          <Showcase />
          {!isMobile && <FullPageOverlay />}
          <Service />
          <Blog />
          <ExploreSection />
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
}

export default Index;
