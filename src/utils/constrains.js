export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const RESET_PASSWORD = "RESET_PAPSSWORD";
export const emailVerificationExpire = () =>
  new Date(new Date().getTime() + 15 * 3600000); //15hour
