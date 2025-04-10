import fs from "fs";
import jwt from "jsonwebtoken";

// Import helpers
import { SimpleMemoryStore } from "src/helpers/other/memory-store";

// Import utils
import { StringUtils } from "src/utils/string";
import { ErrorUtils } from "src/utils/error";
import { DatetimeUtils } from "src/utils/datetime";

import { PolicyCheker } from "./policyChecker";
import { AuthSettings } from "./settings";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

let DNTModels: DongNaiTravelModelsType;

type AccessTokenPayloadType = {
  userId: string;
  role: string;
  expire: number;
  issuer: string;
};

export class AuthService {
  policyCheker!: PolicyCheker;
  static roles: any = {};

  private _signature!: string;
  private _canCreateToken!: boolean;

  constructor() {
    try {
      this.policyCheker = new PolicyCheker();
      this._signature = fs
        .readFileSync(
          StringUtils.getRootDirTo("secrets/jwt_signature"),
          "utf-8"
        )
        .toString();

      // Get role
      AuthService.roles = {};
      const userRoles = SimpleMemoryStore.get("user-roles");

      for (const role of userRoles) {
        AuthService.roles[role.name] = role.value;
      }

      if (this._signature) {
        this._canCreateToken = true;
      }
    } catch (error: any) {
      // Just print error's message
      console.error(error.message);
    }
  }

  /**
   * Use to check if a request is from an authorized user
   * @param req
   * @returns
   */
  static isAuthorizedRequest(res: any) {
    if (res.locals.isAuthorized) {
      return true;
    }
    return false;
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

  /**
   * Use this method to create a token from `role` and `credential` of user.
   * @param role
   * @param credential
   * @returns
   */
  createToken(userId: string, role: string) {
    if (!this._canCreateToken) {
      console.warn(
        "The signature must be assigned before the service creates token or User Roles must be loaded"
      );
      return null;
    }

    let periodAsJWTFormat =
      AuthSettings.EXPIRATION.ACCESS_TOKEN.value +
      AuthSettings.EXPIRATION.ACCESS_TOKEN.postfix;
    let period = DatetimeUtils.getTime(periodAsJWTFormat);

    if (!AuthService.roles[role]) throw new Error("Invalid role");

    let tokenPayload: AccessTokenPayloadType = {
      userId,
      role: AuthService.roles[role],
      expire: period,
      issuer: AuthSettings.ISSUER,
    };

    let token = jwt.sign(tokenPayload, this._signature, {
      algorithm: "HS256",
      expiresIn: periodAsJWTFormat,
    } as any);

    return token;
  }
}

export const authService = new AuthService();
