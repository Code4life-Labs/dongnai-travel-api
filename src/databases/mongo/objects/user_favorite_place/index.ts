import Joi from "joi";
import { IObjectModel } from "src/databases/interfaces";
import type { MongoUtils } from "../../utils";
import type { Mongo_UserFavoritePlaceModel } from "../../types/user_favorite_places";
import { UserFavoritePlaceQuery } from "./query";

let _instance: UserFavoritePlace | null = null;

export class UserFavoritePlace implements IObjectModel {
  query!: UserFavoritePlaceQuery;

  static ModelSchema = Joi.object<Mongo_UserFavoritePlaceModel>({
    userId: Joi.object().required(),
    placeId: Joi.object().required(),
    createdAt: Joi.number().default(Date.now()),
    updatedAt: Joi.number().default(Date.now())
  });

  static Schema = Joi.object({
    user: Joi.object({
      _id: Joi.object().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required()
    }).required(),
    place: Joi.object({
      _id: Joi.object().required(),
      name: Joi.string().required(),
      photos: Joi.array().items(Joi.string()).required()
    }).required(),
    createdAt: Joi.number().required(),
    updatedAt: Joi.number().required()
  });

  static ModelSchemaKeys = Object.keys(UserFavoritePlace.ModelSchema.describe().keys);
  static SchemaKeys = Object.keys(UserFavoritePlace.Schema.describe().keys);

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;
    this.query = new UserFavoritePlaceQuery(localUtils);
    _instance = this;
  }

  getModelFields(): Array<string> {
    return UserFavoritePlace.ModelSchemaKeys;
  }

  getFields(excludes?: Array<string>): Array<string> {
    if (excludes) {
      const result: { [key: string]: number } = {};
      
      for (const key of UserFavoritePlace.SchemaKeys) {
        result[key] = 1;
      }

      for (const key of excludes) {
        if (result[key]) delete result[key];
      }

      return Object.keys(result);
    }

    return UserFavoritePlace.SchemaKeys;
  }
} 