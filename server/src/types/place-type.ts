// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";

type $Extendable = {
  _id: ObjectId;
  name: string;
  value: string;
} & BaseModel;

export type Mongo_PlaceTypeModel = $Extendable;
export type Mongo_PlaceType = $Extendable;

// Use in request
export type Mongo_PlaceTypesQuery = {
  value?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_PlaceTypeParams = {
  id?: string;
};
