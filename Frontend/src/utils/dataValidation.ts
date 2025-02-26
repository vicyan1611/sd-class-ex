import { validationConfig } from "../config/validation";

export const validateEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  if (!validationConfig.email.pattern.test(email)) {
    return false;
  }
  const domain = email.substring(email.indexOf("@"));
  for (const allowedDomain of validationConfig.email.allowedDomains) {
    if (domain === allowedDomain) return true;
  }
  return false;
};

export const validatePhone = (
    phone: string | undefined,
    countriesPattern = Object.values(validationConfig.phone),
): boolean => {
  for (const countryPattern of countriesPattern) {
    if (countryPattern.test(phone)) return true;
  }
  return false;
};
