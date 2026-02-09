export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\u06F0-\u06F9\s\-\+]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};
