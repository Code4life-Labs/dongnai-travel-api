import { Collection, Db, Filter, ObjectId } from "mongodb";
import type { MongoUtils } from "../../utils";
import type { Mongo_UserFavoritePlaceModel } from "../../types/user_favorite_places";
import { UserFavoritePlaceModel } from "../../models/user_favorite_place.model";

export class UserFavoritePlaceQuery {
  private readonly utils: MongoUtils;
  private readonly collection: Collection<Mongo_UserFavoritePlaceModel>;
  private readonly db: Db;

  constructor(utils: MongoUtils) {
    this.utils = utils;
    this.db = utils.db;
    this.collection = new UserFavoritePlaceModel(this.db).getCollection();
  }

  async create(data: Omit<Mongo_UserFavoritePlaceModel, "createdAt" | "updatedAt">) {
    const now = Date.now();
    const result = await this.collection.insertOne({
      ...data,
      createdAt: now,
      updatedAt: now
    });

    return result.acknowledged;
  }

  async delete(userId: ObjectId, placeId: ObjectId) {
    const result = await this.collection.deleteOne({
      userId: { $eq: userId },
      placeId: { $eq: placeId }
    });

    return result.acknowledged;
  }

  async query(userId: ObjectId, placeId: ObjectId) {
    const result = await this.collection.aggregate([
      {
        $match: {
          userId: { $eq: userId },
          placeId: { $eq: placeId }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "places", 
          localField: "placeId",
          foreignField: "_id",
          as: "place"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $unwind: "$place"
      },
      {
        $project: {
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName"
          },
          place: {
            _id: "$place._id",
            name: "$place.name",
            photos: "$place.photos"
          },
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).toArray();

    return result[0] || null;
  }

  async queryMultiple(
    filter: Filter<Mongo_UserFavoritePlaceModel>,
    options: {
      page?: number;
      limit?: number;
      sort?: { [key: string]: 1 | -1 };
      select?: string[];
    } = {}
  ) {
    const {
      page = 1,
      limit = 10,
      sort = { createdAt: -1 },
      select
    } = options;

    const pipeline: any[] = [
      {
        $match: filter
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "places",
          localField: "placeId",
          foreignField: "_id",
          as: "place"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $unwind: "$place"
      },
      {
        $project: {
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName"
          },
          place: {
            _id: "$place._id",
            name: "$place.name",
            photos: "$place.photos"
          },
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $sort: sort
      },
      {
        $skip: (page - 1) * limit
      },
      {
        $limit: limit
      }
    ];

    if (select) {
      pipeline.push({
        $project: select.reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
      });
    }

    const [data, totalDocs] = await Promise.all([
      this.collection.aggregate(pipeline).toArray(),
      this.collection.countDocuments(filter)
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total: totalDocs,
        totalPages: Math.ceil(totalDocs / limit)
      }
    };
  }

  async update(
    userId: ObjectId,
    placeId: ObjectId,
    data: Partial<Omit<Mongo_UserFavoritePlaceModel, "userId" | "placeId">>
  ) {
    const result = await this.collection.findOneAndUpdate(
      {
        userId: { $eq: userId },
        placeId: { $eq: placeId }
      },
      {
        $set: {
          ...data,
          updatedAt: Date.now()
        }
      },
      {
        returnDocument: "after"
      }
    );

    if (!result.value) return null;

    return this.query(userId, placeId);
  }
} 