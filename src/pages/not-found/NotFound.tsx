import { Button } from "antd";
import "./NotFound.less";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import useNavigation from "../../hooks/useHistory";
import { useSyncLanguage } from "../../i18n/useSyncLanguage";
import { useLanguage } from "../../contexts/useLanguage";
import { useTranslate } from "../../i18n/useTranslate";

const NotFound = () => {
  useSyncLanguage();
  const { push } = useNavigation();
  const { currentLang } = useLanguage();
  const { t } = useTranslate();
  return (
    <>
      <AppHeader noBackground />
      <div className="notfound-container">
        <div className="notfound-content">
          <div className="error-number">404</div>

          <div className="error-texts">
            <p className="fa-text">{t("local_NotFoundMessage")}</p>
            <p className="en-text">Not Found</p>
            <Button type="link" onClick={() => push(`/${currentLang}`)}>
              {t("local_redirectToHome")}
            </Button>
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default NotFound;
