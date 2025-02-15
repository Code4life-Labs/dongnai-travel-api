// Import validators
import {
  PlaceIdValidator,
  BlogIdValidator,
  UserIdValidator,
} from "src/services/validators/sensitive-data";

/**
 * Use to check userId and placeId in Request Params
 * @param req
 * @param o
 * @returns
 */
export function checkUserPlaceIdInRequest(req: any, o: any) {
  // Check if id and placeId are exist
  const userIdCheckResult = UserIdValidator.validate(req.params.id);
  if (userIdCheckResult.error) {
    o!.code = 400;
    throw new Error(userIdCheckResult.error.message);
  }

  const placeIdCheckResult = PlaceIdValidator.validate(req.params.placeId);
  if (placeIdCheckResult.error) {
    o!.code = 400;
    throw new Error(placeIdCheckResult.error.message);
  }

  return { id: req.params.id, placeId: req.params.placeId };
}

/**
 * Use to check userId and blogId in Request Params
 * @param req
 * @param o
 * @returns
 */
export function checkUserBlogIdInRequest(req: any, o: any) {
  // Check if id and blogId are exist
  const userIdCheckResult = UserIdValidator.validate(req.params.id);
  if (userIdCheckResult.error) {
    o!.code = 400;
    throw new Error(userIdCheckResult.error.message);
  }

  const placeIdCheckResult = BlogIdValidator.validate(req.params.placeId);
  if (placeIdCheckResult.error) {
    o!.code = 400;
    throw new Error(placeIdCheckResult.error.message);
  }

  return { id: req.params.id, blogId: req.params.blogId };
}
