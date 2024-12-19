// Import types
import type { ObjectId } from "mongodb";
import type { BaseModel } from "../../index.types";

/**
 * Type định nghĩa cấu trúc của UserFavoriteBlog collection
 */
export type Mongo_UserFavoriteBlogModel = {
  _id: ObjectId | string;
  userId: ObjectId | string;
  blogId: ObjectId | string;
} & BaseModel;

