// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import helpers
import { buildPlacePopulation } from "src/helpers/places/populations";
import {
  buildPlaceTypeFilter,
  buildPlaceRecommendationFilter,
} from "src/helpers/places/to-filter";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const placesEndpoints = new Endpoints("places");
let DNTModes: DongNaiTravelModelsType;

db().then((models) => {
  DNTModes = models;
});

// Add your handlers here
/**
 * Get places
 */
placesEndpoints.createHandler("").get(async (req, res) => {
  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get places from database
  let query = DNTModes.Places.find({}).skip(skip).limit(limit);

  // Build filters
  [buildPlaceTypeFilter, buildPlaceRecommendationFilter].forEach((fn) =>
    fn(query, req)
  );

  const places = await query.exec();

  // Compute user's state

  // Return places
  return places;
});

/**
 * Get details of place
 */
placesEndpoints.createHandler("/:id").get(async (req, res, o) => {
  if (req.params.id) {
    o.code = 400;
    throw new Error("Id of place is required");
  }

  // Get place from database
  let query = DNTModes.Places.findOne({ _id: req.params.id });

  // Build populations
  buildPlacePopulation(query);

  const place = await query.exec();

  // Compute user's state

  // Return places
  return place;
});

export default placesEndpoints;
