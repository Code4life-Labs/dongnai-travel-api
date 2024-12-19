import { Collection, Db, Filter, ObjectId } from "mongodb";
import { UserFavoriteBlogModel } from "../../models/user_favorite_blog.model";
import type { MongoUtils } from "../../utils";
import type { Mongo_UserFavoriteBlogModel, Mongo_UserFavoriteBlog } from "../../types/user_favorite_blogs";

export class UserFavoriteBlogQuery {
  private readonly utils: MongoUtils;
  private readonly collection: Collection<Mongo_UserFavoriteBlogModel>;
  private readonly db: Db;

  constructor(utils: MongoUtils) {
    this.utils = utils;
    this.db = utils.db;
    this.collection = new UserFavoriteBlogModel(this.db).getCollection();
  }

  async create(data: Omit<Mongo_UserFavoriteBlogModel, "createdAt" | "updatedAt">) {
    const now = Date.now();
    const result = await this.collection.insertOne({
      ...data,
      createdAt: now,
      updatedAt: now
    });

    return result.acknowledged;
  }

  async delete(userId: ObjectId, blogId: ObjectId) {
    const result = await this.collection.deleteOne({
      userId: { $eq: userId },
      blogId: { $eq: blogId }
    });

    return result.acknowledged;
  }

  async query(userId: ObjectId, blogId: ObjectId): Promise<Mongo_UserFavoriteBlog | null> {
    const result = await this.collection.aggregate<Mongo_UserFavoriteBlog>([
      {
        $match: { 
          userId: { $eq: userId },
          blogId: { $eq: blogId }
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
          from: "blogs",
          localField: "blogId",
          foreignField: "_id",
          as: "blog"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $unwind: "$blog"
      },
      {
        $project: {
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName"
          },
          blog: {
            _id: "$blog._id",
            name: "$blog.name",
            coverImage: "$blog.coverImage"
          },
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).toArray();

    return result[0] || null;
  }

  async queryMultiple(
    filter: Filter<Mongo_UserFavoriteBlogModel>,
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
          from: "blogs",
          localField: "blogId",
          foreignField: "_id",
          as: "blog"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $unwind: "$blog"
      },
      {
        $project: {
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName"
          },
          blog: {
            _id: "$blog._id",
            name: "$blog.name",
            coverImage: "$blog.coverImage"
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
      this.collection.aggregate<Mongo_UserFavoriteBlog>(pipeline).toArray(),
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
    blogId: ObjectId,
    data: Partial<Omit<Mongo_UserFavoriteBlogModel, "userId" | "blogId">>
  ) {
    const result = await this.collection.findOneAndUpdate(
      { 
        userId: { $eq: userId },
        blogId: { $eq: blogId }
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

    return this.query(userId, blogId);
  }
} 