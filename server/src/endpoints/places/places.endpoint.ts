// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const placesEndpoints = new Endpoints("places");
let DNTModes: DongNaiTravelModelsType;

db().then((models) => {
  DNTModes = models;
});

// Add your handlers here
/**
 * Get multiple places
 */
placesEndpoints.createHandler("").get(async (req, res) => {
  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get query from request and get criteria

  // Get user id and calculate user state

  // Get places from database
  const places = await DNTModes.Places.find({}).skip(skip).limit(limit);

  // Return places
  return places;
});

export default placesEndpoints;
