// Import helpers
import { checkUserBlogIdInRequest } from "../params-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function deleteBlogComment(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and blogId are exist
  const validData = checkUserBlogIdInRequest(req, o);

  // Check if user commented this blog before
  if (
    !(await MC.BlogComments.findOne({
      $and: [{ userId: validData.userId }, { blogId: validData.blogId }],
    }).exec())
  ) {
    o!.code = 200;
    return "You removed this blog before or you didn't";
  }

  const result = await MC.BlogComments.deleteOne({
    $and: [{ userId: validData.userId }, { blogId: validData.blogId }],
  });

  if (result.deletedCount === 0) {
    o!.code = 500;
    return "Cannot remove this blog";
  }

  return "You have just removed comment in this blog";
}
