// Import config
import AppConfig from "src/app.config.json";

export const AuthSettings = {
  ISSUER: AppConfig.rootIssuer,
  EXPIRATION: {
    ACCESS_TOKEN: AppConfig.tokenExpiration.accessToken, // 1 Minutes
  },
};
