// Import helpers
import { checkUserPlaceIdInRequest } from "../params-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function deleteVisitedPlace(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if id and placeId are exist
  const { id, placeId } = checkUserPlaceIdInRequest(req, o);

  // Check if user marked `visited` on this place before
  if (!(await MC.UserVisitedPlaces.findOne({ userId: id, placeId }).exec())) {
    o!.code = 200;
    return "You unmark `visited` on this place before or you didn't";
  }

  const result = await MC.UserVisitedPlaces.deleteOne({
    $and: [{ userId: id }, { placeId }],
  });

  if (result.deletedCount === 0) {
    o!.code = 500;
    return "Cannot unmark `visited` on this place";
  }

  return "You have just unmark `visited` on this place";
}
