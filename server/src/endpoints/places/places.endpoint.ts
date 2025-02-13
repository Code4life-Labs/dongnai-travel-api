// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import services
import { AuthService } from "src/services/auth";

// Import utils
import { DEFAULT_LANGUAGE } from "src/utils/constants";
import { RequestUtils } from "src/utils/request";

// Import helpers
import {
  buildBriefProjection,
  buildFullProjection,
  buildProjection,
} from "src/helpers/places/projections";
import {
  buildPlaceTypeFilter,
  buildPlaceRecommendationFilter,
  buildPlaceNameFilter,
} from "src/helpers/places/to-filter";
import { transformPlaceContentWithLanguage } from "src/helpers/places/transforms";
import { getLanguageFromQuery } from "src/helpers/other/get-language";
import { queryPlaceWithAggregate } from "src/helpers/places/all-in-one";
import { computeStateOfPlace } from "src/helpers/places/states-computer";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const placesEndpoints = new Endpoints("places");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

// Add your handlers here
/**
 * Get places
 */
placesEndpoints.createHandler("").get(async (req, res) => {
  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Process query
  const { userId } = req.query as any;

  // Get places from database
  let query = DNTModels.Places.find({}).skip(skip).limit(limit);

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
});

/**
 * Get all types of places
 */
placesEndpoints.createHandler("/types").get(async (req, res, o) => {
  // Get place from database
  let query = DNTModels.PlaceTypes.find();

  const place = await query.exec();

  // Return places
  return place;
});

/**
 * Get details of place
 */
placesEndpoints.createHandler("/:id").get(async (req, res, o) => {
  if (!req.params.id) {
    o.code = 400;
    throw new Error("Id of place is required");
  }

  // Process query
  const lang = getLanguageFromQuery(req);
  const { userId } = req.query as any;

  // Get place from database
  let query = DNTModels.Places.findOne({ _id: req.params.id });

  // Build populations
  buildFullProjection(query);

  // Compute user's state
  let aggregateResultPromise;
  // if (AuthService.isAuthorizedRequest(req) && userId)
  if (userId) {
    // aggregateResultPromise = queryWithAggregate(
    //   req.params.id,
    //   DNTModels,
    //   userId
    // );
  }

  const promises = [query.exec()];

  if (aggregateResultPromise) {
    promises.push(aggregateResultPromise);
  }

  const [place, aggregateResult] = await Promise.all(promises);
  const placeJSON = place.toJSON();

  // Final transform data
  const result = transformPlaceContentWithLanguage(placeJSON, lang);

  return computeStateOfPlace(result, userId);
});

export default placesEndpoints;
