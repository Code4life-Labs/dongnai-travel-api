import { ObjectId } from "mongodb";
import type { BaseModel } from "../../index.types";

export type Mongo_UserFavoriteBlogModel = {
  userId: ObjectId;
  blogId: ObjectId;
} & BaseModel;

export type Mongo_UserFavoriteBlog = {
  user: {
    _id: ObjectId;
    userId: ObjectId;
    blogId: ObjectId;
  };
  blog: {
    _id: ObjectId;
    name: string;
    coverImage: string;
  };
} & BaseModel;
