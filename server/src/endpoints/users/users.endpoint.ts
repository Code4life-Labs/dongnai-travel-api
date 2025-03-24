// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import services
import { AuthService } from "src/services/auth";
import { AuthMiddlewares } from "src/services/auth/middlewares";
import { UploadMediaFileMiddlewares } from "src/services/upload-file/middlewares";
import { BlogMiddlewares } from "src/helpers/blogs/middlewares";

// Import helpers
import getUsers from "src/helpers/users/endpoints/get-users";
import getFavoritedPlaces from "src/helpers/users/endpoints/get-favorited-places";
import getVisitedPlaces from "src/helpers/users/endpoints/get-visited-places";
import getLikedBlogs from "src/helpers/users/endpoints/get-liked-blogs";
import getFollows from "src/helpers/users/endpoints/get-follows";
import getFollowers from "src/helpers/users/endpoints/get-followers";
import getUser from "src/helpers/users/endpoints/get-user";
import getReports from "src/helpers/users/endpoints/get-reports";
import patchUser from "src/helpers/users/endpoints/patch-user";
import postPlace from "src/helpers/users/endpoints/post-place";
import postFavoritedPlace from "src/helpers/users/endpoints/post-favorited-place";
import postPlaceReview from "src/helpers/users/endpoints/post-place-review";
import postVisitedPlace from "src/helpers/users/endpoints/post-visited-place";
import postBlog from "src/helpers/users/endpoints/post-blog";
import postBlogComment from "src/helpers/users/endpoints/post-blog-comment";
import postFavoritedBlog from "src/helpers/users/endpoints/post-liked-blog";
import postFollow from "src/helpers/users/endpoints/post-follow";
import postReport from "src/helpers/users/endpoints/post-report";
import patchBlog from "src/helpers/users/endpoints/patch-blog";
import patchBlogComment from "src/helpers/users/endpoints/patch-blog-comment";
import patchBlogMetadata from "src/helpers/users/endpoints/patch-blog-metadata";
import patchPlaceReview from "src/helpers/users/endpoints/patch-place-review";
import patchReport from "src/helpers/users/endpoints/patch-report";
import createAdminUser from "src/helpers/users/endpoints/post-admin-user";
import deleteFavoritedPlace from "src/helpers/users/endpoints/delete-favorited-place";
import deletePlaceReview from "src/helpers/users/endpoints/delete-place-review";
import deleteVisitedPlace from "src/helpers/users/endpoints/delete-visited-place";
import deleteBlogComment from "src/helpers/users/endpoints/delete-blog-comment";
import deleteFavoritedBlog from "src/helpers/users/endpoints/delete-liked-blog";
import deleteFollow from "src/helpers/users/endpoints/delete-follow";

// Import utils
import { HTTPUtils } from "src/utils/http";

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
usersEndpoints.createHandler("").get((req, res, o) => {
  return getUsers(DNTModels, req, res, o);
});

/**
 * Get user by id
 */
usersEndpoints
  .createHandler("/:id")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("user", "user:getUserInformation"))
  .get(async (req, res, o) => {
    return getUser(DNTModels, req, res, o);
  });

/**
 * Update user information by id
 */
usersEndpoints
  .createHandler("/:id/admin-user")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("admin", "admin:createAdminUser"))
  .patch(async (req, res, o) => {
    return createAdminUser(DNTModels, req, res, o);
  });

/**
 * Update user information by id
 */
usersEndpoints
  .createHandler("/:id")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(
    AuthMiddlewares.createPolicyChecker("user", "user:updateUserInformation")
  )
  .use(UploadMediaFileMiddlewares.preProcessUploadFiles)
  .use(
    UploadMediaFileMiddlewares.uploadMultiplyByFields([
      { name: "newAvatar", maxCount: 1 },
      { name: "newCoverImage", maxCount: 1 },
    ])
  )
  .patch(async (req, res, o) => {
    return patchUser(DNTModels, req, res, o);
  });

/**
 * Get favorited places
 */
usersEndpoints
  .createHandler("/:id/favorites/places")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:getFavoritedPlaced"))
  .get(async (req, res, o) => {
    return getFavoritedPlaces(DNTModels, req, res, o);
  });

/**
 * Get favorited places
 */
usersEndpoints
  .createHandler("/:id/visits/places")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:getvisitedPlaced"))
  .get(async (req, res, o) => {
    return getVisitedPlaces(DNTModels, req, res, o);
  });

/**
 * Create favorited place (like place)
 */
usersEndpoints
  .createHandler("/:id/favorites/places/:placeId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:favoritePlace"))
  .post(async (req, res, o) => {
    return postFavoritedPlace(DNTModels, req, res, o);
  });

/**
 * Delete favorited place (like place)
 */
usersEndpoints
  .createHandler("/:id/favorites/places/:placeId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:unfavoritePlace"))
  .delete(async (req, res, o) => {
    return deleteFavoritedPlace(DNTModels, req, res, o);
  });

/**
 * Create visited place (visit place)
 */
usersEndpoints
  .createHandler("/:id/visits/places/:placeId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:visitPlace"))
  .post(async (req, res, o) => {
    return postVisitedPlace(DNTModels, req, res, o);
  });

/**
 * Delete visited place (visit place)
 */
usersEndpoints
  .createHandler("/:id/visits/places/:placeId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:unvisitPlace"))
  .delete(async (req, res, o) => {
    return deleteVisitedPlace(DNTModels, req, res, o);
  });

/**
 * Create place
 */
usersEndpoints
  .createHandler("/:id/place")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:createPlace"))
  .post(
    async (req, res, o) => {
      return postPlace(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Create Place Error:", error);
    }
  );

/**
 * Create place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:createReview"))
  .post(
    async (req, res, o) => {
      return postPlaceReview(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Create Place Review Error:", error);
    }
  );

/**
 * Update place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:updateReview"))
  .patch(async (req, res, o) => {
    return patchPlaceReview(DNTModels, req, res, o);
  });

/**
 * Delete place review
 */
usersEndpoints
  .createHandler("/:id/reviews/places/:placeId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:deleteReview"))
  .delete(async (req, res, o) => {
    return deletePlaceReview(DNTModels, req, res, o);
  });

/**
 * Create blog
 */
usersEndpoints
  .createHandler("/:id/blog")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:createBlog"))
  .use(UploadMediaFileMiddlewares.preProcessUploadFiles)
  .use(
    UploadMediaFileMiddlewares.uploadMultiplyByFields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ])
  )
  .post(
    async (req, res, o) => {
      return postBlog(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Post blog Error:", error);
    }
  );

usersEndpoints
  .createHandler("/:id/blogs/:blogId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:updateBlog"))
  .use(UploadMediaFileMiddlewares.preProcessUploadFiles)
  .use(
    UploadMediaFileMiddlewares.uploadMultiplyByFields([
      { name: "newCoverImage", maxCount: 1 },
      { name: "newImages", maxCount: 10 },
    ])
  )
  .patch(
    async (req, res, o) => {
      return patchBlog(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Update blog Error:", error);
    }
  );

/**
 * Get liked blogs
 */
usersEndpoints
  .createHandler("/:id/blogs/:blogId/metadata")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  // Restrict update
  .use(function (req, res, next) {
    // Check some specific fields
    if (req.body.isApproved !== undefined) {
      const tokenPayload = res.locals.tokenPayload;
      if (tokenPayload.role !== AuthService.roles["Admin"]) {
        const responsePayload = HTTPUtils.generateHTTPResponseData(
          403,
          "You don't have any permission to update `isApproved` field"
        );
        return res.status(responsePayload.code).json(responsePayload);
      }
    }
    return next();
  })
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:updateBlog"))
  .patch(async (req, res, o) => {
    return patchBlogMetadata(DNTModels, req, res, o);
  });

/**
 * Get liked blogs
 */
usersEndpoints
  .createHandler("/:id/likes/blogs")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:getLikedBlogs"))
  .get(async (req, res, o) => {
    return getLikedBlogs(DNTModels, req, res, o);
  });

/**
 * Create liked blog (like blog)
 */
usersEndpoints
  .createHandler("/:id/likes/blogs/:blogId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:likeBlog"))
  .post(async (req, res, o) => {
    return postFavoritedBlog(DNTModels, req, res, o);
  });

/**
 * Delete liked blog (like blog)
 */
usersEndpoints
  .createHandler("/:id/likes/blogs/:blogId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:unlikeBlog"))
  .delete(async (req, res, o) => {
    return deleteFavoritedBlog(DNTModels, req, res, o);
  });

/**
 * Create blog comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:createBlogComment"))
  .post(
    async (req, res, o) => {
      return postBlogComment(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Create Blog Comment Error:", error);
    }
  );

/**
 * Update blog comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:updateBlogComment"))
  .patch(async (req, res, o) => {
    return patchBlogComment(DNTModels, req, res, o);
  });

/**
 * Delete blog comment
 */
usersEndpoints
  .createHandler("/:id/comments/blogs/:blogId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("blog", "blog:deleteBlogComment"))
  .delete(async (req, res, o) => {
    return deleteBlogComment(DNTModels, req, res, o);
  });

/**
 * Follow a user
 */
usersEndpoints
  .createHandler("/:id/follows/:userId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("user", "user:followUser"))
  .post(async (req, res, o) => {
    return postFollow(DNTModels, req, res, o);
  });

/**
 * Unfollow a user
 */
usersEndpoints
  .createHandler("/:id/follows/:userId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("user", "user:unfollowUser"))
  .delete(async (req, res, o) => {
    return deleteFollow(DNTModels, req, res, o);
  });

/**
 * Get followers of users
 */
usersEndpoints
  .createHandler("/:id/followers")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("user", "user:getFollowers"))
  .get(async (req, res, o) => {
    return getFollowers(DNTModels, req, res, o);
  });

/**
 * Get following of user
 */
usersEndpoints
  .createHandler("/:id/follows")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("user", "user:getFollowing"))
  .get(async (req, res, o) => {
    return getFollows(DNTModels, req, res, o);
  });

/**
 * Get reports of user
 */
usersEndpoints
  .createHandler("/:id/reports")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("report", "report:getReports"))
  .get(async (req, res, o) => {
    return getReports(DNTModels, req, res, o);
  });

/**
 * Create a report
 */
usersEndpoints
  .createHandler("/:id/report")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("report", "report:createReport"))
  .post(
    async (req, res, o) => {
      return postReport(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Create Report Error:", error);
    }
  );

/**
 * Update a report
 */
usersEndpoints
  .createHandler("/:id/reports/:reportId")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("report", "report:updateReport"))
  .patch(async (req, res, o) => {
    return patchReport(DNTModels, req, res, o);
  });

export default usersEndpoints;
