import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LANGUAGES, type Language } from "./languageType";
import { useLanguage } from "../contexts/useLanguage";
import useNavigation from "../hooks/useHistory";

export function useSyncLanguage() {
  const { lang } = useParams<{ lang: string }>();
  const { currentLang, setCurrentLang } = useLanguage();
  const { push } = useNavigation();

  useEffect(() => {
    if (lang && LANGUAGES.includes(lang as any)) {
      document.documentElement.lang = lang;
      setCurrentLang(lang as Language);
    } else {
      push(`/${currentLang}`);
    }
  }, [lang]);
}
