// Import helpers
import { buildBlogProjection } from "src/helpers/blogs/projections";
import { computeStateOfBlog } from "src/helpers/blogs/states-computer";

// Impor services
import { AuthService } from "src/services/auth";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getBlog(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of blog is required");
  }

  // Process query
  const { userId } = req.query as any;

  // Get blog from database
  let query = MC.Blogs.findOne({ _id: req.params.id });

  // Build populations
  buildBlogProjection(query);

  const blog = await query.exec();

  if (!blog) {
    o!.code = 404;
    throw new Error(`Blog isn't found`);
  }

  if (AuthService.isAuthorizedRequest(res!)) {
    return computeStateOfBlog(blog.toJSON(), res!.locals.tokenPayload.userId);
  }

  // Return blog
  return computeStateOfBlog(blog.toJSON());
}
