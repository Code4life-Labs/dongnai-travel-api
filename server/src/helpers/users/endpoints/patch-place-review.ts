// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";
import { checkPlaceReviewWhenUpdate } from "../content-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function patchPlaceReview(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and placeId are exist
  const { id, placeId } = checkUserPlaceIdInRequest(req, o);

  // Check content
  const newParts: Record<string, any> = {};
  const { content, rating } = checkPlaceReviewWhenUpdate(req.body, o!);

  if (content) {
    newParts.content = content;
  }

  if (rating) {
    newParts.rating = rating;
  }

  // Check if user reviewed this place before
  if (
    !(await MC.PlaceReviews.findOne({
      $and: [{ userId: id }, { placeId }],
    }).exec())
  ) {
    o!.code = 404;
    throw new Error("Cannot find this review");
  }

  // Create new document (record)
  const result = await MC.PlaceReviews.updateOne(
    { placeId: placeId, userId: id },
    {
      content,
      rating,
    }
  );

  if (!result || result.modifiedCount === 0) {
    o!.code = 500;
    throw new Error("Cannot update this place review");
  }

  o!.code = 201;

  return "You have just updated review of this place";
}
