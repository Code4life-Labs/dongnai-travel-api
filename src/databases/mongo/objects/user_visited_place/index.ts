import Joi from "joi";
import { IObjectModel } from "src/databases/interfaces";
import type { MongoUtils } from "../../utils";
import type { Mongo_UserVisitedPlaceModel } from "../../types/user_visited_places";
import { UserVisitedPlaceQuery } from "./query";

let _instance: UserVisitedPlace | null = null;

export class UserVisitedPlace implements IObjectModel {
  query!: UserVisitedPlaceQuery;

  static ModelSchema = Joi.object<Mongo_UserVisitedPlaceModel>({
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

  static ModelSchemaKeys = Object.keys(UserVisitedPlace.ModelSchema.describe().keys);
  static SchemaKeys = Object.keys(UserVisitedPlace.Schema.describe().keys);

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;
    this.query = new UserVisitedPlaceQuery(localUtils);
    _instance = this;
  }

  getModelFields(): Array<string> {
    return UserVisitedPlace.ModelSchemaKeys;
  }

  getFields(excludes?: Array<string>): Array<string> {
    if (excludes) {
      const result: { [key: string]: number } = {};
      
      for (const key of UserVisitedPlace.SchemaKeys) {
        result[key] = 1;
      }

      for (const key of excludes) {
        if (result[key]) delete result[key];
      }

      return Object.keys(result);
    }

    return UserVisitedPlace.SchemaKeys;
  }
} 