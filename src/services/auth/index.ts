import fs from "fs";
import jwt from "jsonwebtoken";

// Import classes
import { Service } from "src/classes/Service";

// Import settings
import { AuthSettings } from "src/auth.settings";

// Import from local
import { AuthChecker } from "./checker";

// Import types
import type { Policy, Policies } from "src/types/auth.types";
import type { Databases } from "src/databases";
import type { TokenPayload } from "./type";

export class AuthService extends Service {
  private _signature!: string;
  private _policies!: Policies;
  private _canCreateToken!: boolean;

  checker!: AuthChecker;

  constructor(dbs: Databases) {
    super(dbs);
    try {
      console.log(process.cwd());
      this._signature = fs
        .readFileSync(this.utils.path.getRootDirTo("secret/jwt_signature"))
        .toString();

      // Read roles to load policy
      this._policies = {};
      for (const role in AuthSettings.ROLES) {
        if (role === "GUEST") continue;
        this._policies[
          AuthSettings.ROLES[role as keyof typeof AuthSettings.ROLES]
        ] = JSON.parse(
          fs
            .readFileSync(
              `secret/${
                AuthSettings.ROLES[role as keyof typeof AuthSettings.ROLES]
              }_policy_v1.json`
            )
            .toString()
        );
      }
      console.log("Policy:", this._policies);
      this._canCreateToken = true;
    } catch (error: any) {
      // Just print error's message
      console.error(error.message);
      this._canCreateToken = false;
    }
  }

  /**
   * Use this method to verify token
   * @param tokenInHeaders
   * @returns
   */
  async verifyToken(tokenInHeaders?: string) {
    return await this.handleInterchangeError<TokenPayload, this>(
      this,
      async function (o) {
        if (!tokenInHeaders) throw new Error("Toke is required");

        const [, token] = tokenInHeaders?.split(" ");

        if (!token) throw new Error("Token isn't found");

        let tokenPayload: TokenPayload = JSON.parse(
          this.utils.crypto.decrypt(token)
        );
        let expire = tokenPayload.expire;
        let now = Date.now();

        // 1. Check provider
        if (tokenPayload.provider !== AuthSettings.PROVIDER)
          throw new Error("The token provider isn't valid");

        // 2. Check expiration
        if (expire <= now || jwt.verify(token, this._signature)) {
          throw new Error("The token is expired");
        }

        o.data = tokenPayload;
        o.message = "Token is valid";

        return o;
      }
    );
  }

  /**
   * Use this method to create a token from `role` and `credential` of user.
   * @param role
   * @param credential
   * @returns
   */
  async createToken(role: string) {
    if (!this._canCreateToken) {
      console.warn(
        "The signature must be assigned before the service creates token"
      );
      return null;
    }

    let period = this.utils.datetime.getTime(
      AuthSettings.EXPIRATION._DEFAULT.value +
        AuthSettings.EXPIRATION._DEFAULT.postfix
    );
    let roleResult = await this.dbs.mongo.userRole.query(role);

    if (!roleResult.code) throw new Error("Invalid role");

    let tokenPayload: TokenPayload = {
      role: roleResult.data?.value!,
      expire: period,
      provider: AuthSettings.PROVIDER!,
    };

    let token = jwt.sign(tokenPayload, this._signature, {
      algorithm: "ES256",
      expiresIn: period,
    });

    return token;
  }
}
