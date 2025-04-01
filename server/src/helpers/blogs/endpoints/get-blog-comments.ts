// Import helpers
import { isBlogExistsWithId } from "../blog-checkers";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getBlogComments(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if blog exists
  if (!(await isBlogExistsWithId(MC.Blogs, req.params.id))) {
    o!.code = 400;
    throw new Error("This blog doesn't exist");
  }

  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get blog comments from database
  let query = MC.BlogComments.find({ blogId: req.params.id })
    .sort({ createdAt: "desc" })
    .populate("blog", "_id name type")
    .populate("user", "_id firstName lastName displayName avatar")
    .skip(skip)
    .limit(limit);

  const blogComments = await query.exec();

  // Return blog comments
  return blogComments;
}
