// Import database
import db from "src/databases/dongnaitravel";

// Import service
import { authService } from ".";

// Import utils
import { ErrorUtils } from "src/utils/error";

// Import types
import type { Request, Response, NextFunction } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

export class AuthMiddlewares {
  /**
   * Use this middleware to allow guest accesses endpoint
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static allowGuest(req: Request, res: Response, next: NextFunction) {
    return ErrorUtils.handleError(this, req, res, async function ($, $$, o) {
      res.locals.isGuestAllowed = true;
      return next();
    });
  }

  /**
   * Use this middleware to allow only verified user. Note: use this middleware after request is verfied
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static checkVerifiedUser(req: Request, res: Response, next: NextFunction) {
    return ErrorUtils.handleError(this, req, res, async function ($, $$, o) {
      if (
        (res.locals && res.locals.isGuestAllowed) ||
        !res.locals.tokenPayload
      ) {
        o.code = 403;
        throw new Error("You don't have permission to do this action");
      }

      const userId = res.locals.tokenPayload.userId;
      // Get user from databases
      const user = await DNTModels.Users.findOne({ _id: userId }).exec();

      if (!user) {
        o.code = 401;
        throw new Error(`User with id [${userId}] isn't found`);
      }

      if (!user.isVerified) {
        o.code = 403;
        throw new Error(
          "You don't have permission. Please verify you account first"
        );
      }

      return next();
    });
  }

  /**
   * Validate a token, is it valid?
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static checkToken(req: Request, res: Response, next: NextFunction) {
    return ErrorUtils.handleError(this, req, res, async function ($, $$, o) {
      const authorization = req.headers.authorization;

      // If allow guest, pass this middleware
      if (res.locals && res.locals.isGuestAllowed && !authorization) {
        return next();
      }
      // If not allow guest, return 401
      else if (res.locals && !res.locals.isGuestAllowed && !authorization) {
        o.code = 401;
        throw new Error("You are unauthenticated, please sign in first");
      }

      // If has userId in params, check it
      if (req.params.userId) {
        if (req.params.userId !== res.locals.tokenPayload.userId) {
          o.code = 400;
          throw new Error("UserId in request params and in token are mismatch");
        }
      }

      if (!authorization) {
        o.code = 401;
        throw new Error("Token is required");
      }

      const [, token] = authorization.split(" ");
      const result = await authService.verifyToken(token);

      console.log("Token:", authorization);
      console.log("Check token result:", result);

      if (!result.code) {
        // Add some custom properties to request
        res.locals.tokenPayload = result.data;
        res.locals.isAuthorized = true;
        // Go to next middleware
        return next();
      } else {
        o.code = 401;
        throw new Error(result.message ? result.message : "Token is invalid");
      }
    });
  }

  /**
   * Check the policy of a role
   * @param resource
   * @param action
   * @returns
   */
  static createPolicyChecker(resource: string, action: string) {
    let that = this;

    return function checkPolicy(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      return ErrorUtils.handleError(that, req, res, function ($, $$, o) {
        // If guest is allowed
        if (
          res.locals &&
          res.locals.isGuestAllowed &&
          authService.checkPolicy("guest", resource, action)
        ) {
          // Go to next middleware
          return next();
        }

        const tokenPayload = res.locals.tokenPayload;

        if (!tokenPayload) {
          o.code = 401;
          throw new Error("Authorization is required");
        }

        if (authService.checkPolicy(tokenPayload.role, resource, action)) {
          // Go to next middleware
          return next();
        } else {
          o.code = 403;
          throw new Error("You don't have permission to do this action");
        }
      });
    };
  }
}
