import mongoose from "mongoose";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

export function computeStateWithPlaces(
  plainPlace: any,
  MC: DongNaiTravelModelsType,
  userId: string,
  limit: number,
  skip: number
) {}

export function queryOneWithAggregate(
  placeId: string,
  MC: DongNaiTravelModelsType,
  userId: string
) {
  // To do: compute state of user (guest or member)
  // Count totalFavorites, totalVisits, totalReviews
  // Calculate average of ratings
  // Check if user is liked, visited place or not
  const aggregate = MC.Places.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(placeId) },
    },
    // Count and lookups
    {
      $lookup: {
        from: "PlaceTypes",
        localField: "_id",
        foreignField: "placeId",
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
        from: "PlaceReviews",
        localField: "_id",
        foreignField: "placeId",
        as: "reviews",
      },
    },
    {
      $lookup: {
        from: "UserFavoritedPlaces",
        localField: "_id",
        foreignField: "placeId",
        as: "favorites",
      },
    },
    {
      $lookup: {
        from: "UserVisitedPlaces",
        localField: "_id",
        foreignField: "placeId",
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
