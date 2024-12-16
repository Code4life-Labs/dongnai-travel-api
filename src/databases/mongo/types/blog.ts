// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "../../index.types";

// Use for base type of blog
type $Extendable = {
  _id: ObjectId | string;
  name: string;
  contentUrl: string;
  coverImage: string;
  type: string;
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
  author: Array<any>;
  mentionedPlaces: Array<any>;
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
