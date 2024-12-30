import fs from "fs";
import jwt from "jsonwebtoken";

// Import utils
import { StringUtils } from "src/utils/string";
import { ErrorUtils } from "src/utils/error";
import { DatetimeUtils } from "src/utils/datetime";

import { PolicyCheker } from "./policyChecker";
import { AuthSettings } from "./settings";

type AccessTokenPayloadType = {
  role: string;
  expire: number;
  issuer: string;
};

class AuthService {
  policyCheker!: PolicyCheker;

  private _signature!: string;

  constructor() {
    try {
      this.policyCheker = new PolicyCheker();
      this._signature = fs
        .readFileSync(
          StringUtils.getRootDirTo("secrets/jwt_signature"),
          "utf-8"
        )
        .toString();
    } catch (error: any) {
      // Just print error's message
      console.error(error.message);
    }
  }

  /**
   * Check policy of a request
   * @param role
   * @param resource
   * @param action
   * @returns
   */
  checkPolicy(role: string, resource: string, action: string) {
    return this.policyCheker.checkPermission(role, resource, action);
  }

  /**
   * Use this method to verify token
   * @param tokenInHeaders
   * @returns
   */
  async verifyToken(token: string) {
    return ErrorUtils.handleInterchangeError(this, async function (o) {
      if (!token) throw new Error("Token isn't found");

      // 1. Is token valid?
      if (!jwt.verify(token, this._signature))
        throw new Error("Token is invalid");

      let tokenPayload = jwt.decode(token) as AccessTokenPayloadType;
      let expire = tokenPayload.expire;
      let now = Date.now();

      // 2. Check provider
      if (tokenPayload.issuer !== AuthSettings.ISSUER)
        throw new Error("The token provider isn't valid");

      // 3. Check expiration
      if (expire <= now) throw new Error("The token is expired");

      o.message = "Token is valid";

      return tokenPayload;
    });
  }
}

export const authService = new AuthService();
