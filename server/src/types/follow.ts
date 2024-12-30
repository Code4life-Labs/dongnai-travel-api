// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";
import type { Mongo_AccountModel } from "./account";
import type { Mongo_BlogModel } from "./blog";

type $Extendable = {
  _id: ObjectId;
} & BaseModel;

export type Mongo_FollowModel = {
  source: ObjectId;
  target: ObjectId;
} & $Extendable;
export type Mongo_Follow = {
  sourceUser: Mongo_AccountModel;
  targetUser: Mongo_BlogModel;
} & $Extendable;

// Use in request
export type Mongo_FollowsQuery = {
  source?: string;
  target?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_FollowParams = {
  id?: string;
};
