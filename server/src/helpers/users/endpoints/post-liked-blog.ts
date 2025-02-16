// Import helpers
import { checkUserBlogIdInRequest } from "../params-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postFavoritedBlog(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and blogId are exist
  const validData = checkUserBlogIdInRequest(req, o);

  // Check if user liked this blog before
  if (
    await MC.UserFavoritedBlogs.findOne({
      $and: [{ userId: validData.userId }, { blogId: validData.blogId }],
    }).exec()
  ) {
    o!.code = 200;
    return "You liked this blog before or you didn't";
  }

  // Create new document (record)
  const result = await MC.UserFavoritedBlogs.create(validData);

  if (!result || !result._id) {
    o!.code = 500;
    throw new Error("Cannot marked `favorited` on this blog");
  }

  o!.code = 201;

  return "You have just liked this blog";
}
