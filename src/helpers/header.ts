export const header = () => {
  let lang = "fa";
  try {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app-language");
      if (saved === "fa" || saved === "en") {
        lang = saved;
      }
    }
  } catch (error) {}

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": lang,
  };
};
