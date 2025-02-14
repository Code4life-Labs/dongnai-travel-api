// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";
import { checkReviewOrCommentContent as checkPlaceReviewContent } from "../content-checkers";
import { checkRating } from "../number-fields-checkers";

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
  const { id, placeId } = checkUserPlaceIdInRequest(req, o);

  // Check content
  const content = checkPlaceReviewContent(req.body.content, o!);
  const rating = checkRating(req.body.rating, o!);

  // Check if user reviewed this place before
  if (
    await MC.PlaceReviews.findOne({
      $and: [{ userId: id }, { placeId }],
    }).exec()
  ) {
    o!.code = 205;
    return "You reviewed this place before or you didn't";
  }

  // Create new document (record)
  const result = await MC.PlaceReviews.create({
    placeId: placeId,
    userId: id,
    content,
    rating,
  });

  if (!result || !result._id) {
    o!.code = 500;
    throw new Error("Cannot reviewed this place");
  }

  o!.code = 201;

  return "You have just reviewed this place";
}
