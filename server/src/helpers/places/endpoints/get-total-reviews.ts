// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getTotalReviewsOfPlace(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of place is required");
  }

  // Get place from database
  let query = MC.PlaceReviews.countDocuments({ placeId: req.params.id });

  const result = await query.exec();

  return { count: result };
}
