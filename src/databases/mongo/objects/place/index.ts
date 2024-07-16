import Joi from "joi";

// Import interfaces
import { IObjectModel } from "src/databases/interfaces";

// Impot from local
// Import query
import { PlaceQuery } from "./query";

// Import types
import type { MongoUtils } from "../../utils";
import type {
  Mongo_Place,
  Mongo_PlaceModel,
  Mongo_Place_ContentModel,
  Mongo_Place_PhotoModel,
} from "../../types/place";

/**
 * Class of place's content manager
 * @NguyenAnhTuan1912
 */
class _PlaceContent implements IObjectModel {
  getFields(): Array<keyof Mongo_Place_ContentModel> {
    return [
      "_id",
      "plainText",
      "formattedText",
      "speech",
      "createdAt",
      "updatedAt",
    ];
  }
}

/**
 * Class of place's photo manager
 * @NguyenAnhTuan1912
 */
class _PlacePhotos implements IObjectModel {
  getFields(): Array<keyof Mongo_Place_PhotoModel> {
    return ["_id", "photos", "createdAt", "updatedAt"];
  }
}

/**
 * Class of place manager
 * @NguyenAnhTuan1912
 */
export class Place implements IObjectModel {
  content!: _PlaceContent;
  photos!: _PlacePhotos;
  query!: PlaceQuery;

  static Schemas = {
    Model: Joi.object<Mongo_PlaceModel>({
      addressComponents: Joi.array().items(Joi.object()),
      businessStatus: Joi.string(),
      geometry: Joi.object(),
      phoneNumber: Joi.string(),
      name: Joi.string(),
      plusCode: Joi.string(),
      rating: Joi.number(),
      types: Joi.array().items(Joi.string()),
      url: Joi.string(),
      website: Joi.string(),
      userRatingsTotal: Joi.number(),
      userFavoritesTotal: Joi.number().default(0),
      visitsTotal: Joi.number().default(0),
      isRecommended: Joi.boolean(),
      placeId: Joi.string(),
      contentId: Joi.string().required(),
      photosId: Joi.string().required(),
      createdAt: Joi.number().default(Date.now()),
      updatedAt: Joi.number().default(Date.now()),
    }),
    Complete: Joi.object<Mongo_Place>({
      _id: Joi.string().required(),
      addressComponents: Joi.array().items(Joi.object()),
      businessStatus: Joi.string(),
      geometry: Joi.object(),
      phoneNumber: Joi.string(),
      name: Joi.string(),
      plusCode: Joi.string(),
      rating: Joi.number(),
      types: Joi.array().items(Joi.string()),
      url: Joi.string(),
      website: Joi.string(),
      userRatingsTotal: Joi.number(),
      userFavoritesTotal: Joi.number().default(0),
      visitsTotal: Joi.number().default(0),
      isRecommended: Joi.boolean(),
      photos: Joi.object(),
      content: Joi.object(),
      createdAt: Joi.number().default(Date.now()),
      updatedAt: Joi.number().default(Date.now()),
    }),
    Reduction: Joi.object<Mongo_Place>({
      _id: Joi.string().required(),
      addressComponents: Joi.array().items(Joi.object()),
      businessStatus: Joi.string(),
      geometry: Joi.object(),
      phoneNumber: Joi.string(),
      name: Joi.string(),
      plusCode: Joi.string(),
      rating: Joi.number(),
      types: Joi.array().items(Joi.string()),
      url: Joi.string(),
      website: Joi.string(),
      userRatingsTotal: Joi.number(),
      userFavoritesTotal: Joi.number().default(0),
      visitsTotal: Joi.number().default(0),
      isRecommended: Joi.boolean(),
      createdAt: Joi.number().default(Date.now()),
      updatedAt: Joi.number().default(Date.now()),
    }),
  };

  static SchemaKeys = {
    Model: Object.keys(Place.Schemas.Model.describe().keys),
    Complete: Object.keys(Place.Schemas.Complete.describe().keys),
    Reduction: Object.keys(Place.Schemas.Reduction.describe().keys),
  };

  constructor(localUtils: MongoUtils) {
    this.content = new _PlaceContent();
    this.photos = new _PlacePhotos();
    this.query = new PlaceQuery(localUtils);
  }

  getReducedFields(): Array<string> {
    return Place.SchemaKeys.Reduction;
  }

  getCompleteFields(): Array<string> {
    return Place.SchemaKeys.Complete;
  }

  getFields(): Array<string> {
    return Place.SchemaKeys.Model;
  }
}
