/**
 * Use to check userId and placeId in Request Params
 * @param req
 * @param o
 * @returns
 */
export function checkUserPlaceIdInRequest(req: any, o: any) {
  // Check if id and placeId are exist
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of user is required");
  }

  if (!req.params.placeId) {
    o!.code = 400;
    throw new Error("Id of user is required");
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
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of user is required");
  }

  if (!req.params.blogId) {
    o!.code = 400;
    throw new Error("Id of user is required");
  }

  return { id: req.params.id, blogId: req.params.blogId };
}
