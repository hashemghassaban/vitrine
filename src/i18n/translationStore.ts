import type TranslationView from "../models/views/translationView";
import type { TranslationValue } from "../models/views/translationView";

let translations: Record<string, TranslationValue> = {};

export const setTranslations = (data: TranslationView[]) => {
  translations = data.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {} as Record<string, TranslationValue>);
};

export const getTranslations = () => translations;
