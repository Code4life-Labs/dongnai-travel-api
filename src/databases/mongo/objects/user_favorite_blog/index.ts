import Joi from "joi";
import { IObjectModel } from "src/databases/interfaces";
import { UserFavoriteBlogQuery } from "./query";
import type { MongoUtils } from "../../utils";
import type { Mongo_UserFavoriteBlogModel, Mongo_UserFavoriteBlog } from "../../types/user_favorite_blogs";

let _instance: UserFavoriteBlog | null = null;

export class UserFavoriteBlog implements IObjectModel {
  query!: UserFavoriteBlogQuery;

  static ModelSchema = Joi.object<Mongo_UserFavoriteBlogModel>({
    userId: Joi.object().required(),
    blogId: Joi.object().required(),
    createdAt: Joi.number().default(Date.now()),
    updatedAt: Joi.number().default(Date.now())
  });

  static Schema = Joi.object<Mongo_UserFavoriteBlog>({
    user: Joi.object({
      _id: Joi.object().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required()
    }).required(),
    blog: Joi.object({
      _id: Joi.object().required(),
      name: Joi.string().required(),
      coverImage: Joi.string().required()
    }).required(),
    createdAt: Joi.number().required(),
    updatedAt: Joi.number().required()
  });

  static ModelSchemaKeys = Object.keys(UserFavoriteBlog.ModelSchema.describe().keys);
  static SchemaKeys = Object.keys(UserFavoriteBlog.Schema.describe().keys);

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;
    this.query = new UserFavoriteBlogQuery(localUtils);
    _instance = this;
  }

  getModelFields(): Array<string> {
    return UserFavoriteBlog.ModelSchemaKeys;
  }

  getFields(excludes?: Array<string>): Array<string> {
    if (excludes) {
      const result: { [key: string]: number } = {};
      
      for (const key of UserFavoriteBlog.SchemaKeys) {
        result[key] = 1;
      }

      for (const key of excludes) {
        if (result[key]) delete result[key];
      }

      return Object.keys(result);
    }

    return UserFavoriteBlog.SchemaKeys;
  }
} 