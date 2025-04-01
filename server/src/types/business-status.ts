// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";

type $Extendable = {
  _id: ObjectId;
  name: string;
  value: string;
} & BaseModel;

export type Mongo_BusinessStatusModel = $Extendable;
export type Mongo_BusinessStatus = $Extendable;

// Use in request
export type Mongo_BusinessStatusesQuery = {
  value?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_BusinessStatusParams = {
  id?: string;
};
