// Import helpers
import { transformExcludedFields } from "src/helpers/other/field-transformers";
import { UserProjectionFields } from "src/helpers/users/projections";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getFollows(
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
  let query = MC.Follows.find({ source: req.params.id })
    .skip(skip)
    .limit(limit)
    .populate([
      {
        path: "target",
        select: transformExcludedFields(UserProjectionFields.ExcludedFields),
      },
    ])
    .select("_id target");

  const follows = await query.exec();

  return follows;
}
