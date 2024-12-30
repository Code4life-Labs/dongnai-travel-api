// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";
import type { Mongo_AccountModel } from "./account";
import type { Mongo_BlogModel } from "./blog";

type $Extendable = {
  _id: ObjectId;
  content: string;
} & BaseModel;

export type Mongo_BlogCommentModel = {
  userId: ObjectId;
  blogId: ObjectId;
} & $Extendable;
export type Mongo_BlogComment = {
  user: Mongo_AccountModel;
  blog: Mongo_BlogModel;
} & $Extendable;

// Use in request
export type Mongo_BlogCommentsQuery = {
  userId?: string;
  blogId?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_BlogCommentParams = {
  id?: string;
};
