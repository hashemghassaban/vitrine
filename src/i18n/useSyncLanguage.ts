import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { LANGUAGES, type Language } from "./languageType";
import { useLanguage } from "../contexts/useLanguage";
import useNavigation from "../hooks/useHistory";

const APP_LANGUAGE_KEY = "app-language";

export function useSyncLanguage() {
  const { lang } = useParams<{ lang: string }>();
  const { currentLang, setCurrentLang } = useLanguage();
  const location = useLocation();
  const { push, replace } = useNavigation();

  useEffect(() => {
    if (!lang || !LANGUAGES.includes(lang as any)) {
      push(`/${currentLang}`);
      return;
    }

    document.documentElement.lang = lang;
    setCurrentLang(lang as Language);

    const previousLang = localStorage.getItem(APP_LANGUAGE_KEY);

    if (!previousLang) {
      // اولین ورود، زبان را ذخیره کن و پارامترها را حفظ کن
      localStorage.setItem(APP_LANGUAGE_KEY, lang);
      return;
    }

    if (previousLang !== lang) {
      // زبان تغییر کرد → پارامترهای URL حذف شوند
      localStorage.setItem(APP_LANGUAGE_KEY, lang);

      // حذف پارامترهای query از URL و به‌روزرسانی مسیر
      const cleanPath = location.pathname.split("?")[0];
      const parts = cleanPath.split("/");
      parts[1] = lang;
      const newUrl = parts.join("/");
      setTimeout(() => {
        if (replace) {
          replace(newUrl);
        } else {
          push(newUrl);
        }
      }, 100)

      return;
    }
    // زبان تغییر نکرد، پارامترها دست‌نخورده باقی بمانند
  }, [lang, location.pathname, currentLang, push, replace]);
}
