// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postFavoritedPlace(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and placeId are exist
  const validData = checkUserPlaceIdInRequest(req, o);

  // Check if user liked this place before
  if (
    await MC.UserFavoritedPlaces.findOne({
      $and: [{ userId: validData.userId }, { placeId: validData.placeId }],
    }).exec()
  ) {
    o!.code = 200;
    return "You liked this place before or you didn't";
  }

  // Create new document (record)
  const result = await MC.UserFavoritedPlaces.create(validData);

  if (!result || !result._id) {
    o!.code = 500;
    throw new Error("Cannot marked `favorited` on this place");
  }

  o!.code = 201;

  return "You have just liked this place";
}
