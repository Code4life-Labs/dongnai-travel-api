// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function deletePlaceReview(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and placeId are exist
  const validData = checkUserPlaceIdInRequest(req, o);

  // Check if user reviewed this place before
  if (
    !(await MC.PlaceReviews.findOne({
      $and: [{ userId: validData.userId }, { placeId: validData.placeId }],
    }).exec())
  ) {
    o!.code = 200;
    return "You removed this place before or you didn't";
  }

  const result = await MC.PlaceReviews.deleteOne({
    $and: [{ userId: validData.userId }, { placeId: validData.placeId }],
  });

  if (result.deletedCount === 0) {
    o!.code = 500;
    return "Cannot remove this place";
  }

  return "You have just removed review in this place";
}
