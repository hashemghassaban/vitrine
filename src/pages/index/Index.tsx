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
import { useEffect, useState } from "react";
import useIndex from "../../hooks/index/useIndex";
import type { IndexDataView } from "../../models/views/indexView";
import { useIsMobile } from "../../helpers/useIsMobile";
import HomeMobile from "./components/home_mobile/HomeMobile";
import { useLanguage } from "../../contexts/useLanguage";
import { IndexProvider } from "../../contexts/indexContext";
import { useSyncLanguage } from "../../i18n/useSyncLanguage";

function Index() {
  useSyncLanguage();
  const isMobile = useIsMobile();
  const [indexData, setIndexData] = useState<IndexDataView | null>(null);

  const { currentLang } = useLanguage();
  const { getIndex } = useIndex(currentLang);
  const fetchIndex = async () => {
    const { success, data } = await getIndex();
    if (success && data) {
      setIndexData(data);
    }
  };

  useEffect(() => {
    setIndexData(null);
    fetchIndex();
  }, [currentLang]);

  return (
    <>
      <IndexProvider value={{ indexData }}>
        <Layout>
          <Content>
            {isMobile ? <HomeMobile /> : <Home />}
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
      </IndexProvider>
    </>
  );
}

export default Index;
