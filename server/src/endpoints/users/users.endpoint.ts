// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import helpers
import getFavoritedPlaces from "src/helpers/users/endpoints/get-favorited-places";
import getVisitedPlaces from "src/helpers/users/endpoints/get-visited-places";
import getLikedBlogs from "src/helpers/users/endpoints/get-liked-blogs";
import getUser from "src/helpers/users/endpoints/get-user";
import patchUser from "src/helpers/users/endpoints/patch-user";
import postFavoritedPlace from "src/helpers/users/endpoints/post-favorited-place";
import postPlaceReview from "src/helpers/users/endpoints/post-place-review";
import postVisitedPlace from "src/helpers/users/endpoints/post-visited-place";
import patchPlaceReview from "src/helpers/users/endpoints/patch-place-review";
import deleteFavoritedPlace from "src/helpers/users/endpoints/delete-favorited-place";
import deletePlaceReview from "src/helpers/users/endpoints/delete-place-review";
import deleteVisitedPlace from "src/helpers/users/endpoints/delete-visited-place";
import postBlogComment from "src/helpers/users/endpoints/post-blog-comment";
import postFavoritedBlog from "src/helpers/users/endpoints/post-liked-blog";
import patchBlogComment from "src/helpers/users/endpoints/patch-blog-comment";
import deleteBlogComment from "src/helpers/users/endpoints/delete-blog-comment";
import deleteFavoritedBlog from "src/helpers/users/endpoints/delete-liked-blog";
import postFollow from "src/helpers/users/endpoints/post-follow";
import deleteFollow from "src/helpers/users/endpoints/delete-follow";

const usersEndpoints = new Endpoints("users");
let DNTModels: DongNaiTravelModelsType;

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

db().then((models) => {
  DNTModels = models;
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
  return getUser(DNTModels, req, res, o);
});

/**
 * Update user information by id
 */
usersEndpoints.createHandler("/:id").patch(async (req, res, o) => {
  return patchUser(DNTModels, req, res, o);
});

/**
 * Get favorited places
 */
usersEndpoints
  .createHandler("/:id/favorites/places")
  .get(async (req, res, o) => {
    return getFavoritedPlaces(DNTModels, req, res, o);
  });

/**
 * Get favorited places
 */
usersEndpoints.createHandler("/:id/visits/places").get(async (req, res, o) => {
  return getVisitedPlaces(DNTModels, req, res, o);
});

/**
 * Create favorited place (like place)
 */
usersEndpoints
  .createHandler("/:id/favorites/places/:placeId")
  .post(async (req, res, o) => {
    return postFavoritedPlace(DNTModels, req, res, o);
  });

/**
 * Delete favorited place (like place)
 */
usersEndpoints
  .createHandler("/:id/favorites/places/:placeId")
  .delete(async (req, res, o) => {
    return deleteFavoritedPlace(DNTModels, req, res, o);
  });

/**
 * Create visited place (visit place)
 */
usersEndpoints
  .createHandler("/:id/visits/places/:placeId")
  .post(async (req, res, o) => {
    return postVisitedPlace(DNTModels, req, res, o);
  });

/**
 * Delete visited place (visit place)
 */
usersEndpoints
  .createHandler("/:id/visits/places/:placeId")
  .delete(async (req, res, o) => {
    return deleteVisitedPlace(DNTModels, req, res, o);
  });

/**
 * Create place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .post(async (req, res, o) => {
    return postPlaceReview(DNTModels, req, res, o);
  });

/**
 * Update place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .patch(async (req, res, o) => {
    return patchPlaceReview(DNTModels, req, res, o);
  });

/**
 * Delete place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .delete(async (req, res, o) => {
    return deletePlaceReview(DNTModels, req, res, o);
  });

/**
 * Get liked blogs
 */
usersEndpoints.createHandler("/:id/likes/blogs").get(async (req, res, o) => {
  return getLikedBlogs(DNTModels, req, res, o);
});

/**
 * Create liked blog (like blog)
 */
usersEndpoints
  .createHandler("/:id/likes/blogs/:blogId")
  .post(async (req, res, o) => {
    return postFavoritedBlog(DNTModels, req, res, o);
  });

/**
 * Delete liked blog (like blog)
 */
usersEndpoints
  .createHandler("/:id/likes/blogs/:blogId")
  .delete(async (req, res, o) => {
    return deleteFavoritedBlog(DNTModels, req, res, o);
  });

/**
 * Create blog comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .post(async (req, res, o) => {
    return postBlogComment(DNTModels, req, res, o);
  });

/**
 * Update blog comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .patch(async (req, res, o) => {
    return patchBlogComment(DNTModels, req, res, o);
  });

/**
 * Delete blog comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .delete(async (req, res, o) => {
    return deleteBlogComment(DNTModels, req, res, o);
  });

/**
 * Follow a user
 */
usersEndpoints
  .createHandler("/:id/follows/:userId")
  .post(async (req, res, o) => {
    return postFollow(DNTModels, req, res, o);
  });

/**
 * Unfollow a user
 */
usersEndpoints
  .createHandler("/:id/follows/:userId")
  .delete(async (req, res, o) => {
    return deleteFollow(DNTModels, req, res, o);
  });

/**
 * Get followers of users
 */
usersEndpoints.createHandler("/:id/followers").get(async (req, res, o) => {
  return postFollow(DNTModels, req, res, o);
});

/**
 * Get followers of users
 */
usersEndpoints.createHandler("/:id/follows").get(async (req, res, o) => {
  return postFollow(DNTModels, req, res, o);
});

export default usersEndpoints;
