// Import helpers
import { transformExcludedFields } from "src/helpers/other/field-transformers";
import { computeStateOfBlog } from "src/helpers/blogs/states-computer";
import { BlogProjectionFields } from "src/helpers/blogs/projections";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getLikedBlogs(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of user is required");
  }

  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get user from database
  let query = MC.UserFavoritedBlogs.find({ userId: req.params.id })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "blog",
      populate: [
        {
          path: "type",
          select: "_id name value",
        },
        {
          path: "author",
          select: "_id firstName lastName displayName avatar",
        },
        "favorites",
        "comments",
      ],
      select: transformExcludedFields(BlogProjectionFields.ExcludedFields),
    });

  const likedBlogs = await query.exec();

  return likedBlogs.map((likedBlog) =>
    computeStateOfBlog(likedBlog.toJSON().blog, req.params.id)
  );
}
