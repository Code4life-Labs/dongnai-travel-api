// Import helpers
import { transformExcludedFields } from "src/helpers/other/field-transformers";
import { computeStateOfPlace } from "src/helpers/places/states-computer";
import { PlaceProjectionFields } from "src/helpers/places/projections";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getVisitedPlaces(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of user is required");
  }

  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get user from database
  let query = MC.UserVisitedPlaces.find({ userId: req.params.id })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "place",
      populate: [
        {
          path: "types",
          select: "_id name value",
        },
        "reviews",
        "favorites",
        "visits",
      ],
      select: transformExcludedFields(PlaceProjectionFields.ExcludedFields),
    });

  const visitedPlaces = await query.exec();

  return visitedPlaces.map((favoritedPlace) =>
    computeStateOfPlace(favoritedPlace.toJSON().place, req.params.id)
  );
}
