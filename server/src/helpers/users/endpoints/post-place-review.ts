// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";
import { checkPlaceReviewWhenCreate } from "../content-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postPlaceReview(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and placeId are exist
  const validData = checkUserPlaceIdInRequest(req, o);

  // Check content
  const { content, rating } = checkPlaceReviewWhenCreate(req.body, o!);

  // Check if user reviewed this place before
  if (
    await MC.PlaceReviews.findOne({
      $and: [{ userId: validData.id }, { placeId: validData.placeId }],
    }).exec()
  ) {
    o!.code = 205;
    return "You reviewed this place before or you didn't";
  }

  // Create new document (record)
  (validData as any).content = content;
  (validData as any).rating = content;

  const result = await MC.PlaceReviews.create(validData);

  if (!result || !result._id) {
    o!.code = 500;
    throw new Error("Cannot reviewed this place");
  }

  o!.code = 201;

  return "You have just reviewed this place";
}
