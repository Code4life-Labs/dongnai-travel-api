// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";
import { checkReviewOrCommentContent as checkPlaceReviewContent } from "../content-checkers";
import { checkRating } from "../number-fields-checkers";

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
  let content: string | undefined = req.body.content,
    rating: number | undefined = req.body.rating;

  if (content) {
    content = checkPlaceReviewContent(content, o!);
    newParts.content = content;
  }

  if (rating) {
    rating = checkRating(rating, o!);
    newParts.rating = content;
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
