export const header = (currentLang: string) => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": currentLang,
  };
};
