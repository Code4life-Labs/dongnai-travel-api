// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";
import type { Mongo_BlogComment } from "./blog-comment";

// Use for base type of blog
type $Extendable = {
  _id: ObjectId | string;
  name: string;
  contentUrl: string;
  coverImage: string;
  readTime: number;
  isApproved: boolean;
} & BaseModel;

// The complete Blog data structure (Blog Document)
export type Mongo_BlogModel = {
  authorId: ObjectId | string;
  typeId: ObjectId | string;
  mentionedPlaceIds: Array<ObjectId | string>;
} & $Extendable;

// The actual blog data structure (A data that is joined from multiple documents)
export type Mongo_Blog = {
  type: string;
  author: any;
  content: string;
  mentionedPlaces: Array<any>;
  comments: Array<Mongo_BlogComment>;
  isLiked: boolean;
  totalComments: number;
  totalFavorites: number;
} & $Extendable;

export type Mongo_BlogQuery = {};

export type Mongo_BlogsQuery = {
  type?: string;
  name?: string;
  author?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_BlogParams = {
  id?: string;
};
