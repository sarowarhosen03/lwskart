export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const RESET_PASSWORD = "RESET_PAPSSWORD";
export const emailVerificationExpire = () =>
  new Date(new Date().getTime() + 15 * 3600000); //15hour
export const ACCESS_TOKEN_EXPIRE = "6h";
export const ACCESS_EXPIRE_TIME = 6 * 60 * 60 * 1000; //6hour
