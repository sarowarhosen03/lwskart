export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const emailVerificationExpire = () => new Date(new Date().getTime() + (15 * 3600000)); //15houre
