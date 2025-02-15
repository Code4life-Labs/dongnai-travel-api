// Import helpers
import { checkUserBlogIdInRequest } from "../params-checkers";
import { checkBlogCommentWhenUpdate } from "../content-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function patchBlogComment(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and blogId are exist
  const { id, blogId } = checkUserBlogIdInRequest(req, o);

  // Check content
  const { content } = checkBlogCommentWhenUpdate(req.body, o!);

  // Check if user commented this blog before
  if (!(await MC.BlogComments.findOne({ userId: id, blogId }).exec())) {
    o!.code = 404;
    throw new Error("Cannot find this comment");
  }

  // Create new document (record)
  const result = await MC.BlogComments.updateOne(
    { blogId: blogId, userId: id },
    {
      content,
    }
  );

  if (!result || result.modifiedCount === 0) {
    o!.code = 500;
    throw new Error("Cannot update this blog comment");
  }

  o!.code = 201;

  return "You have just updated comment of this blog";
}
