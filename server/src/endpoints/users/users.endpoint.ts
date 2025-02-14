// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import helpers
import getUser from "src/helpers/users/endpoints/getUser";
import postFavoritedPlace from "src/helpers/users/endpoints/postFavoritedPlace";
import postPlaceReview from "src/helpers/users/endpoints/postPlaceReview";
import postVisitedPlace from "src/helpers/users/endpoints/postVisitedPlace";
import patchPlaceReview from "src/helpers/users/endpoints/patchPlaceReview";
import deleteFavoritedPlace from "src/helpers/users/endpoints/deleteFavoritedPlace";
import deletePlaceReview from "src/helpers/users/endpoints/deletePlaceReview";
import deleteVisitedPlace from "src/helpers/users/endpoints/deleteVisitedPlace";

const usersEndpoints = new Endpoints("users");
let DNTModes: DongNaiTravelModelsType;

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

db().then((models) => {
  DNTModes = models;
});

// Add your handlers here
/**
 * Get users
 */
usersEndpoints.createHandler("").get((req, res) => {
  return "Hello from users root endpoint";
});

/**
 * Get user by id
 */
usersEndpoints.createHandler("/:id").get(async (req, res, o) => {
  return getUser(DNTModes, req, res, o);
});

/**
 * Create favorited place (like place)
 */
usersEndpoints
  .createHandler("/:id/favorites/places/:placeId")
  .post(async (req, res, o) => {
    return postFavoritedPlace(DNTModes, req, res, o);
  });

/**
 * Delete favorited place (like place)
 */
usersEndpoints
  .createHandler("/:id/favorites/places/:placeId")
  .delete(async (req, res, o) => {
    return deleteFavoritedPlace(DNTModes, req, res, o);
  });

/**
 * Create visited place (visit place)
 */
usersEndpoints
  .createHandler("/:id/visits/places/:placeId")
  .post(async (req, res, o) => {
    return postVisitedPlace(DNTModes, req, res, o);
  });

/**
 * Delete visited place (visit place)
 */
usersEndpoints
  .createHandler("/:id/visits/places/:placeId")
  .delete(async (req, res, o) => {
    return deleteVisitedPlace(DNTModes, req, res, o);
  });

/**
 * Create place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .post(async (req, res, o) => {
    return postPlaceReview(DNTModes, req, res, o);
  });

/**
 * Update place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .patch(async (req, res, o) => {
    return patchPlaceReview(DNTModes, req, res, o);
  });

/**
 * Delete place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .delete(async (req, res, o) => {
    return deletePlaceReview(DNTModes, req, res, o);
  });

/**
 * Create liked blog (like blog)
 */
usersEndpoints
  .createHandler("/:id/likes/blogs/:blogId")
  .post(async (req, res, o) => {
    return postVisitedPlace(DNTModes, req, res, o);
  });

/**
 * Delete liked blog (like blog)
 */
usersEndpoints
  .createHandler("/:id/likes/blogs/:blogId")
  .delete(async (req, res, o) => {
    return deleteVisitedPlace(DNTModes, req, res, o);
  });

/**
 * Create place comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .post(async (req, res, o) => {
    return postPlaceReview(DNTModes, req, res, o);
  });

/**
 * Update place comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .patch(async (req, res, o) => {
    return patchPlaceReview(DNTModes, req, res, o);
  });

/**
 * Delete place comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .delete(async (req, res, o) => {
    return deletePlaceReview(DNTModes, req, res, o);
  });

export default usersEndpoints;
