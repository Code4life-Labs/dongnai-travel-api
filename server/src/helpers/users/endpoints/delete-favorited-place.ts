// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function deleteFavoritedPlace(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and placeId are exist
  const { id, placeId } = checkUserPlaceIdInRequest(req, o);

  // Check if user liked this place before
  if (
    !(await MC.UserFavoritedPlaces.findOne({
      $and: [{ userId: id }, { placeId }],
    }).exec())
  ) {
    o!.code = 200;
    return "You unliked this place or you didn't";
  }

  const result = await MC.UserFavoritedPlaces.deleteOne({
    $and: [{ userId: id }, { placeId }],
  });

  if (result.deletedCount === 0) {
    o!.code = 500;
    return "Cannot unlike this place";
  }

  return "You have just unlike this place";
}
