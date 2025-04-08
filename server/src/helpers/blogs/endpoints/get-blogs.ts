// Import helpers
import { buildBriefProjection } from "src/helpers/blogs/projections";
import {
  buildBlogTypeFilter,
  buildBlogNameFilter,
  buildApproveFilter,
} from "src/helpers/blogs/filters";
import { computeStateOfBlog } from "src/helpers/blogs/states-computer";
import { SimpleMemoryStore } from "src/helpers/other/memory-store";

// Impor services
import { AuthService } from "src/services/auth";

// Import utils
import { RequestUtils } from "src/utils/request";

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

  // Get blogs from database
  let query = MC.Blogs.find({})
    .sort({ createAt: "desc" })
    .skip(skip)
    .limit(limit);

  const userRoles = SimpleMemoryStore.get("user-roles");
  const role = userRoles.find((t: any) => t.value === "admin");

  // Build filters & projections
  buildBlogTypeFilter(query, req);
  buildBlogNameFilter(query, req);
  buildBriefProjection(query);
  if (res?.locals.tokenPayload.role !== "admin") buildApproveFilter(query);

  const blogs = await query.exec();

  if (AuthService.isAuthorizedRequest(res!)) {
    return blogs.map((blog) =>
      computeStateOfBlog(blog.toJSON(), res!.locals.tokenPayload.userId)
    );
  }

  // Return blogs
  return blogs.map((blog) => computeStateOfBlog(blog.toJSON()));
}
