// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";
import type { Mongo_AccountModel } from "./account";
import type { Mongo_BlogModel } from "./blog";

type $Extendable = {
  _id: ObjectId;
} & BaseModel;

export type Mongo_UserFavoritedBlogModel = {
  userId: ObjectId;
  blogId: ObjectId;
} & $Extendable;
export type Mongo_UserFavoritedBlog = {
  user: Mongo_AccountModel;
  blog: Mongo_BlogModel;
} & $Extendable;

// Use in request
export type Mongo_UserFavoritedBlogsQuery = {
  userId?: string;
  blogId?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_UserFavoritedBlogParams = {
  id?: string;
};
