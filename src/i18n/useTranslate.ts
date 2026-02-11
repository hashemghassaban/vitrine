import { getTranslations } from "./translationStore";
import { useLanguage } from "../contexts/useLanguage";
import type { TranslationKey } from "./translationKeys";
import type { Language } from "./languageType";

export const useTranslate = () => {
  const { currentLang } = useLanguage();

  const t = (key: TranslationKey): string => {
    const translations = getTranslations();
    const item = translations[key];

    if (!item) {
      //console.warn(`Missing translation key: ${key}`);
      return key;
    }

    return item[currentLang as Language] || key;
  };

  return { t };
};
