// Import types
import type { ObjectId } from "mongodb";
import type { BaseModel } from "../../index.types";

/**
 * Type định nghĩa cấu trúc của UserFavoritePlace collection
 */
export type Mongo_UserFavoritePlaceModel = {
  userId: ObjectId;
  placeId: ObjectId;
} & BaseModel;

export type Mongo_UserFavoritePlace = {
  user: {
    _id: ObjectId;
    firstName: string;
    lastName: string;
  };
  place: {
    _id: ObjectId;
    name: string;
    photos: string[];
  };
} & BaseModel;

