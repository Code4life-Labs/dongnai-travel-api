// Import helpers
import { checkUserBlogIdInRequest } from "../params-checkers";
import { checkBlogCommentWhenCreate } from "../content-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postBlogComment(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and blogId are exist
  const { id, blogId } = checkUserBlogIdInRequest(req, o);

  // Check content
  const { content } = checkBlogCommentWhenCreate(req.body, o!);

  // Check if user commented this blog before
  if (
    await MC.BlogComments.findOne({ $and: [{ userId: id }, { blogId }] }).exec()
  ) {
    o!.code = 205;
    return "You commented this blog before or you didn't";
  }

  // Create new document (record)
  const result = await MC.BlogComments.create({
    blogId: blogId,
    userId: id,
    content,
  });

  if (!result || !result._id) {
    o!.code = 500;
    throw new Error("Cannot commented this blog");
  }

  o!.code = 201;

  return "You have just commented this blog";
}
