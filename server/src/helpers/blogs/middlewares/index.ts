// Import validators
import { BlogCreateValidator } from "src/services/validators/blog";

// Import utils
import { ErrorUtils } from "src/utils/error";

// Import types
import type { Request, Response, NextFunction } from "express";

export class BlogMiddlewares {
  /**
   * Use to validate blog data before perform any heavy workload (such as upload).
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static validateBlogData(req: Request, res: Response, next: NextFunction) {
    return ErrorUtils.handleError(this, req, res, async function ($, $$, o) {
      // Validate data first
      const validationResult = BlogCreateValidator.validate({
        name: req.body.name,
        typeId: req.body.typeId,
        content: req.body.content,
        mentionedPlaces: req.body.mentionedPlaces,
        authorId: req.body.authorId,
      });

      if (validationResult.error) {
        o.code = 400;
        console.log("Data validation error:", validationResult.error);
        throw new Error(validationResult.error.message);
      }

      // Assign valid data to body
      req.body.validData = validationResult.value;

      // Check userId in params and authorId
      if (req.params.id !== req.body.validData.authorId) {
        o.code = 400;
        console.log("User Id mismatch");
        throw new Error("UserId in request params and authorId are mismatch");
      }

      return next();
    });
  }
}
