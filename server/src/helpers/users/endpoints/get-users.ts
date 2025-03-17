// Import helpers
import { buildBriefUserProjection } from "src/helpers/users/projections";
import { computeStateOfBlog } from "src/helpers/blogs/states-computer";
import { buildUserTypeFilter, buildUserNameFilter } from "../filters";

// Import services
import { AuthService } from "src/services/auth";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getUsers(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get users from database
  const tokenPayload = res!.locals.tokenPayload;
  if (
    tokenPayload &&
    AuthService.roles["Admin"] === tokenPayload.role &&
    (req.query.type === "admin" || req.query.type === "all")
  ) {
    o!.code = 403;
    throw new Error(
      `You don't have any permission to query users with type of [${req.query.type}]`
    );
  }

  let query = MC.Users.find({})
    .sort({ createAt: "desc" })
    .skip(skip)
    .limit(limit);

  // Build filters & projections
  buildBriefUserProjection(query);
  buildUserTypeFilter(query, req);
  buildUserNameFilter(query, req);

  const users = await query.exec();

  // Return users
  return users.map((blog) => computeStateOfBlog(blog.toJSON()));
}
