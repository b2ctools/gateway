export const sanitizeEmail = (email: string) => {
  return email.toLowerCase().replace(/\s/g, "");
};
