// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postVisitedPlace(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and placeId are exist
  const { id, placeId } = checkUserPlaceIdInRequest(req, o);

  // Check if user marked `visited` on this place before
  if (
    await MC.UserVisitedPlaces.findOne({
      $and: [{ userId: id }, { placeId }],
    }).exec()
  ) {
    o!.code = 200;
    return "You marked `visited` on this place before or you didn't";
  }

  // Create new document (record)
  const result = await MC.UserVisitedPlaces.create({
    placeId: placeId,
    userId: id,
  });

  if (!result || !result._id) {
    o!.code = 500;
    throw new Error("Cannot marked `visited` on this place");
  }

  o!.code = 201;

  return "You have just marked `visited` on this place";
}
