// Import settings
import { AppSettings } from "./settings";

export const AuthSettings = {
  ISSUER: AppSettings.SERCURITY.AUTH_ISSUER,
  ROLES: {
    USER: "user",
    GUEST: "guest",
    ADMIN: "admin",
  },
  EXPIRATION: {
    _DEFAULT: { value: "1", postfix: "m" }, // 1 Minutes
  },
  RIGHTS: AppSettings.SERCURITY.RESOURCE_ACCESS_RIGHTS,
};
