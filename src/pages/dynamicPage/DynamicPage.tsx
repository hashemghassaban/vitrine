
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/useLanguage";
import type DynamicPage from "../../models/views/dynamicPageView";
import useDynamicPage from "../../hooks//dynamicPage/useDynamicPage";
import "antd/dist/reset.css";
import { useSyncLanguage } from "../../i18n/useSyncLanguage";
import LoadingSpin from "../../components/Loading/LoadingSpin";
import { useLocation } from "react-router-dom";
import "./DynamicPage.less";
import usePageMetadata from "../../hooks/usePageMetadata";
import { useSSRPageData } from "../../contexts/ssrDataContext";

export default function DynamicPage() {
  useSyncLanguage();
  
  const { currentLang } = useLanguage();
  const { pathname } = useLocation();
  const pageName = pathname.split('/')[3];
  const ssrPage = useSSRPageData<DynamicPage>("dynamic-page", pageName);
  const [dynamicPage, setDynamicPage] = useState<DynamicPage | null>(ssrPage);
  const { getList } = useDynamicPage(currentLang);
  const [loading, setLoading] = useState(!ssrPage);
  const fetchPage = async (location: string) => {

    setLoading(true);
    const { success, data } = await getList(location);
    if (success && data) {

      setDynamicPage(data);
    }
    setLoading(false);
  };


    const textMainCaption = currentLang === "fa" ? 'ویترین گالری' : 'Vitrine Gallery'
  
    const meta = dynamicPage
      ? {
        title: dynamicPage.title + ' | ' + textMainCaption,
        description:
          dynamicPage?.meta_description ||
          dynamicPage.description ,
        ogImage: dynamicPage.image,
        ogType: 'dynamicPage',
      }
      : {
        title: textMainCaption,
        description: 'Product details are loading',
      };
  
    usePageMetadata(meta);

  useEffect(() => {
    if (ssrPage) return;
    fetchPage(pageName);
  }, [currentLang, pageName, ssrPage]);

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader categoryBackground={dynamicPage?.image} title={dynamicPage?.title} />
      {!loading ? (
        <div className="dynamicPage-container">
          <div className="page-header-row">
            <p dangerouslySetInnerHTML={{ __html: dynamicPage?.description || "" }}></p>
          </div>
        </div>
      ) : (
        <div style={{ height: 500 }}></div>
      )}
      <AppFooter />
    </>
  );
}
