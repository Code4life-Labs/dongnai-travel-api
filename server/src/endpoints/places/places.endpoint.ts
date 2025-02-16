// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

import getPlaces from "src/helpers/places/endpoints/get-places";
import getPlaceTypes from "src/helpers/places/endpoints/get-place-types";
import getPlace from "src/helpers/places/endpoints/get-place";
import getPlaceReviews from "src/helpers/places/endpoints/get-place-reviews";

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
placesEndpoints.createHandler("").get(async (req, res, o) => {
  return getPlaces(DNTModels, req, res, o);
});

/**
 * Get all types of places
 */
placesEndpoints.createHandler("/types").get(async (req, res, o) => {
  return getPlaceTypes(DNTModels, req, res, o);
});

/**
 * Get details of place
 */
placesEndpoints.createHandler("/:id").get(async (req, res, o) => {
  return getPlace(DNTModels, req, res, o);
});

/**
 * Get reviews of place
 */
placesEndpoints.createHandler("/:id/reviews").get(async (req, res, o) => {
  return getPlaceReviews(DNTModels, req, res, o);
});

export default placesEndpoints;
