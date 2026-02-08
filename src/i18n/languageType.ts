export const LANGUAGES = ["en", "fa", "ar"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Language = "fa";
