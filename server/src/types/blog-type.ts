// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";

type $Extendable = {
  _id: ObjectId;
  name: string;
  value: string;
} & BaseModel;

export type Mongo_BlogTypeModel = $Extendable;
export type Mongo_BlogType = $Extendable;

// Use in request
export type Mongo_BlogTypesQuery = {
  value?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_BlogTypeParams = {
  id?: string;
};
