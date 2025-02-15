// Import services
import { AuthService } from "src/services/auth";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import helpers
import { buildBriefProjection } from "src/helpers/places/projections";
import {
  buildPlaceTypeFilter,
  buildPlaceRecommendationFilter,
  buildPlaceNameFilter,
} from "src/helpers/places/filters";
import { computeStateOfPlace } from "src/helpers/places/states-computer";

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

  // Process query
  const { userId } = req.query as any;

  // Get places from database
  let query = MC.Places.find({}).skip(skip).limit(limit);

  // Build filters
  [
    buildPlaceTypeFilter,
    buildPlaceRecommendationFilter,
    buildPlaceNameFilter,
    buildBriefProjection,
  ].forEach((fn) => fn(query, req));

  const places = await query.exec();

  // Compute user's state
  if (AuthService.isAuthorizedRequest(req) && userId) {
    // computeStateWithPlace(placeJSON, DNTModels, userId);
  }

  // Return places
  return places.map((place) => computeStateOfPlace(place.toJSON(), userId));
}
