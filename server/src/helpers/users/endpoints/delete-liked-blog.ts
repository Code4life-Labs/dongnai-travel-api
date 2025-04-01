// Import helpers
import { checkUserBlogIdInRequest } from "../params-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function deleteFavoritedBlog(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and blogId are exist
  const validData = checkUserBlogIdInRequest(req, o);

  // Check if user liked this blog before
  if (
    !(await MC.UserFavoritedBlogs.findOne({
      $and: [{ userId: validData.userId }, { blogId: validData.blogId }],
    }).exec())
  ) {
    o!.code = 200;
    return "You unliked this blog or you didn't";
  }

  const result = await MC.UserFavoritedBlogs.deleteOne({
    $and: [{ userId: validData.userId }, { blogId: validData.blogId }],
  });

  if (result.deletedCount === 0) {
    o!.code = 500;
    return "Cannot unlike this blog";
  }

  return "You have just unlike this blog";
}
