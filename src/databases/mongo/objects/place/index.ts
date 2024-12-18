import Joi from "joi";

// Import interfaces
import { IObjectModel } from "src/databases/interfaces";

// Impot from local
// Import query
import { PlaceQuery } from "./query";

// Import types
import type { ObjectId } from "mongodb";
import type { MongoUtils } from "../../utils";
import type { Mongo_PlaceModel, Mongo_Place } from "../../types/place";

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

  /**
   * Use to validate when create new.
   */
  static ModelSchema = Joi.object<Mongo_PlaceModel>({
    placeId: Joi.string().default("place_id_from_google"),
    typeIds: Joi.array().items(Joi.string()).default([]),
    addressComponents: Joi.array().items(Joi.object()).required(),
    openHours: Joi.array()
      .items(Joi.object())
      .default([
        {
          weekDay: 0,
          from: "09:00:00",
          to: "17:00:00",
        },
        {
          weekDay: 1,
          from: "09:00:00",
          to: "17:00:00",
        },
        {
          weekDay: 2,
          from: "09:00:00",
          to: "17:00:00",
        },
        {
          weekDay: 3,
          from: "09:00:00",
          to: "17:00:00",
        },
        {
          weekDay: 4,
          from: "09:00:00",
          to: "17:00:00",
        },
        {
          weekDay: 5,
          from: "09:00:00",
          to: "17:00:00",
        },
        {
          weekDay: 6,
          from: "09:00:00",
          to: "17:00:00",
        },
      ]),
    geometry: Joi.object().default({
      location: {
        lat: 0,
        lng: 0,
      },
      viewport: {
        northeast: {
          lat: 0,
          lng: 0,
        },
        southwest: {
          lat: 0,
          lng: 0,
        },
      },
    }),
    description: Joi.string().required(),
    phoneNumber: Joi.string().default(""),
    name: Joi.string().required(),
    plusCode: Joi.string().default(""),
    url: Joi.string().default(""),
    website: Joi.string().default(""),
    isRecommended: Joi.boolean().default(false),
    photos: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.number().default(Date.now()),
    updatedAt: Joi.number().default(Date.now()),
  });

  /**
   * Use to validate when update.
   */
  static UpdateModelSchema = Joi.object<Mongo_PlaceModel>({
    placeId: Joi.string(),
    typeIds: Joi.array().items(Joi.string()),
    addressComponents: Joi.array().items(Joi.object()),
    openHours: Joi.array().items(Joi.object()),
    geometry: Joi.object(),
    description: Joi.string(),
    phoneNumber: Joi.string(),
    name: Joi.string(),
    plusCode: Joi.string(),
    url: Joi.string(),
    website: Joi.string(),
    isRecommended: Joi.boolean(),
    photos: Joi.array().items(Joi.string()),
    createdAt: Joi.number(),
    updatedAt: Joi.number().default(Date.now()),
  });

  /**
   * Use to validate when returns
   */
  static Schema = Joi.object<Mongo_Place>({
    placeId: Joi.string(),
    types: Joi.array().items(Joi.object()),
    addressComponents: Joi.array().items(Joi.object()),
    businessStatus: Joi.string(),
    geometry: Joi.object(),
    phoneNumber: Joi.string(),
    name: Joi.string(),
    plusCode: Joi.string(),
    description: Joi.string().required(),
    url: Joi.string(),
    website: Joi.string(),
    isRecommended: Joi.boolean(),
    totalFavorites: Joi.number(),
    totalVisits: Joi.number(),
    totalReviews: Joi.number(),
    rating: Joi.number(),
    isLiked: Joi.boolean(),
    isVisited: Joi.boolean(),
    photos: Joi.array().items(Joi.string()),
    createdAt: Joi.number(),
    updatedAt: Joi.number(),
  });

  /**
   * Keys of schema
   */
  static ModelSchemaKeys = Object.keys(Place.ModelSchema.describe().keys);
  static SchemaKeys = Object.keys(Place.Schema.describe().keys);

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;

    this.query = new PlaceQuery(localUtils);

    _instance = this;
  }

  /**
   * Get expected fields of place model.
   * @returns
   */
  getModelFields(): Array<string> {
    return Place.ModelSchemaKeys;
  }

  /**
   * Get expected fields of place.
   * @returns
   */
  getFields(excludes?: Array<string>): Array<string> {
    if (excludes) {
      const result: { [key: string]: number } = {};

      for (const key of Place.SchemaKeys) {
        result[key] = 1;
      }

      for (const key of excludes) {
        if (result[key]) delete result[key];
      }

      return Object.keys(result);
    }

    return Place.SchemaKeys;
  }
}
