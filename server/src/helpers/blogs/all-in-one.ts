import mongoose from "mongoose";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

export function queryBlogWithAggregate(
  blogId: string,
  MC: DongNaiTravelModelsType,
  userId: string
) {
  // To do: compute state of user (guest or member)
  // Count totalFavorites, totalVisits, totalReviews
  // Calculate average of ratings
  // Check if user is liked, visited place or not
  const aggregate = MC.Blogs.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(blogId) },
    },
    // Count and lookups
    {
      $lookup: {
        from: "BlogTypes",
        localField: "_id",
        foreignField: "blogId",
        as: "types",
        pipeline: [
          {
            $project: { _id: 1, value: 1, name: 1 },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "BlogReviews",
        localField: "_id",
        foreignField: "blogId",
        as: "reviews",
      },
    },
    {
      $lookup: {
        from: "UserFavoritedBlogs",
        localField: "_id",
        foreignField: "blogId",
        as: "favorites",
      },
    },
    {
      $lookup: {
        from: "UserVisitedBlogs",
        localField: "_id",
        foreignField: "blogId",
        as: "visits",
      },
    },
    {
      $addFields: {
        totalReviews: { $size: "$reviews" },
        ratings: {
          $cond: {
            if: { $gt: [{ $size: "$reviews" }, 0] },
            then: { $avg: "$reviews.rating" },
            else: 0,
          },
        },
      },
    },
    {
      $addFields: {
        totalFavorites: { $size: "$favorites" },
        isLiked: {
          $cond: {
            if: {
              $eq: ["$favorites.userId", new mongoose.Types.ObjectId(userId)],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $addFields: {
        totalVisits: { $size: "$visits" },
        isVisited: {
          $cond: {
            if: {
              $eq: ["$visits.userId", new mongoose.Types.ObjectId(userId)],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    // Get some fields
    { $project: { reviews: 0, visits: 0, favorites: 0 } },
  ]);

  return aggregate.exec();
}
