// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";
import type { Mongo_AccountModel } from "./account";
import type { Mongo_PlaceModel } from "./place";

type $Extendable = {
  _id: ObjectId;
} & BaseModel;

export type Mongo_UserVisitedPlaceModel = {
  userId: ObjectId;
  placeId: ObjectId;
} & $Extendable;
export type Mongo_UserVisitedPlace = {
  user: Mongo_AccountModel;
  place: Mongo_PlaceModel;
} & $Extendable;

// Use in request
export type Mongo_UserVisitedPlacesQuery = {
  userId?: string;
  placeId?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_UserVisitedPlaceParams = {
  id?: string;
};
