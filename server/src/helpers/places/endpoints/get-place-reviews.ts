// Import helpers
import { isPlaceExistsWithId } from "../place-checkers";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getPlaceReviews(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if place exists
  if (!(await isPlaceExistsWithId(MC.Places, req.params.id))) {
    o!.code = 400;
    throw new Error("This place doesn't exist");
  }

  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get place reviews from database
  let query = MC.PlaceReviews.find({ placeId: req.params.id })
    .sort({ createdAt: "desc" })
    .populate("place", "_id name types")
    .populate("user", "_id firstName lastName displayName avatar")
    .skip(skip)
    .limit(limit);

  const placeReviews = await query.exec();

  // Return place reviews
  return placeReviews;
}
