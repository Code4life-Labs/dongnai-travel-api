import Joi from "joi";

// Import interfaces
import { IObjectModel } from "src/databases/interfaces";

// Impot from local
// Import query
import { PlaceQuery } from "./query";

// Import types
import type { ObjectId } from "mongodb";
import type { MongoUtils } from "../../utils";
import type { Mongo_PlaceModel } from "../../types/place";

/**
 * Private reference of class manager
 */
let _instance: Place | null = null;

/**
 * A singleton class of place manager
 * @NguyenAnhTuan1912
 */
export class Place implements IObjectModel {
  query!: PlaceQuery;

  static Schema = Joi.object<Mongo_PlaceModel>({
    placeId: Joi.string().required(),
    typeIds: Joi.array().items(Joi.object()),
    addressComponents: Joi.array().items(Joi.object()),
    businessStatusId: Joi.object(),
    geometry: Joi.object(),
    description: Joi.string().required(),
    phoneNumber: Joi.string(),
    name: Joi.string(),
    plusCode: Joi.string(),
    url: Joi.string(),
    website: Joi.string(),
    isRecommended: Joi.boolean(),
    photos: Joi.array().items(Joi.string()),
    createdAt: Joi.number().default(Date.now()),
    updatedAt: Joi.number().default(Date.now()),
  });

  /**
   * Keys of schema
   */
  static SchemaKeys = Object.keys(Place.Schema.describe().keys);

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;

    this.query = new PlaceQuery(localUtils);

    _instance = this;
  }

  getFields(): Array<string> {
    return Place.SchemaKeys;
  }
}
