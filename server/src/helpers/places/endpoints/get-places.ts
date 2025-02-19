// Import helpers
import { buildBriefProjection } from "src/helpers/places/projections";
import {
  buildPlaceTypeFilter,
  buildPlaceNameFilter,
} from "src/helpers/places/filters";
import { computeStateOfPlace } from "src/helpers/places/states-computer";

// Impor services
import { AuthService } from "src/services/auth";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getPlaces(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get places from database
  let query = MC.Places.find({}).skip(skip).limit(limit);

  // Build filters
  buildPlaceTypeFilter(query, req);
  buildPlaceNameFilter(query, req);
  buildBriefProjection(query);

  const places = await query.exec();

  if (AuthService.isAuthorizedRequest(req)) {
    return places.map((place) =>
      computeStateOfPlace(place.toJSON(), req.locals.tokenPayload.userId)
    );
  }

  // Return places
  return places.map((place) => computeStateOfPlace(place.toJSON()));
}
