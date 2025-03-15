// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import database
import db from "src/databases/dongnaitravel";

// Import helpers
import getPlaces from "src/helpers/places/endpoints/get-places";
import getPlaceTypes from "src/helpers/places/endpoints/get-place-types";
import getPlace from "src/helpers/places/endpoints/get-place";
import getPlaceReviews from "src/helpers/places/endpoints/get-place-reviews";
import getTotalReviewsOfPlace from "src/helpers/places/endpoints/get-total-reviews";
import postPlace from "src/helpers/places/endpoints/post-place";
import patchPlace from "src/helpers/places/endpoints/patch-place";

// Import services
import { AuthMiddlewares } from "src/services/auth/middlewares";
import { UploadMediaFileMiddlewares } from "src/services/upload-file/middlewares";

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
placesEndpoints
  .createHandler("")
  .use(AuthMiddlewares.allowGuest)
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:getPlaces"))
  .get(async (req, res, o) => {
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
placesEndpoints
  .createHandler("/:id")
  .use(AuthMiddlewares.allowGuest)
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:getPlace"))
  .get(async (req, res, o) => {
    return getPlace(DNTModels, req, res, o);
  });

/**
 * Update a place
 */
placesEndpoints
  .createHandler("/:id")
  .use(AuthMiddlewares.allowGuest)
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:updatePlace"))
  .use(UploadMediaFileMiddlewares.preProcessUploadFiles)
  .use(
    UploadMediaFileMiddlewares.uploadMultiplyByFields([
      { name: "newPhotos", maxCount: 20 },
    ])
  )
  .patch(
    async (req, res, o) => {
      return patchPlace(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Error - Update place:", error);
    }
  );

/**
 * Get reviews of place
 */
placesEndpoints
  .createHandler("/:id/reviews")
  .use(AuthMiddlewares.allowGuest)
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:getPlaceReviews"))
  .get(async (req, res, o) => {
    return getPlaceReviews(DNTModels, req, res, o);
  });

/**
 * Get total reviews of a place
 */
placesEndpoints.createHandler("/:id/total-reviews").get(async (req, res, o) => {
  return getTotalReviewsOfPlace(DNTModels, req, res, o);
});

export default placesEndpoints;
