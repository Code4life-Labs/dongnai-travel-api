// Import utils
import { RequestUtils } from "src/utils/request";

// Import helpers
import { buildBriefProjection } from "src/helpers/blogs/projections";
import {
  buildBlogTypeFilter,
  buildBlogNameFilter,
} from "src/helpers/blogs/filters";
import { computeStateOfBlog } from "src/helpers/blogs/states-computer";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getBlogs(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Process query
  const { userId } = req.query as any;

  // Get blogs from database
  let query = MC.Blogs.find({}).skip(skip).limit(limit);

  // Build filters & projections
  [buildBlogTypeFilter, buildBlogNameFilter, buildBriefProjection].forEach(
    (fn) => fn(query, req)
  );

  const blogs = await query.exec();

  // Return blogs
  return blogs.map((blog) => computeStateOfBlog(blog.toJSON(), userId));
}
