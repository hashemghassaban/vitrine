export const cleanText = (text: string) => {
  if (!text) return "";

  return text
    // حذف تگ‌های HTML
    .replace(/<[^>]*>/g, "")
    // decode html entities
    .replace(/&nbsp;/g, " ")
    .replace(/&zwnj;/g, "‌")
    .replace(/&raquo;/g, "»")
    .replace(/&laquo;/g, "«")
    .replace(/&amp;/g, "&")
    
    .replace(/\s+/g, " ")
    .trim();
};
