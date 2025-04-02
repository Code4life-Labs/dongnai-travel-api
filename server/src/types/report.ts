// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";
import type { Mongo_Blog } from "./blog";
import type { Mongo_Place } from "./place";
import type { Mongo_Account } from "./account";

// Use for base type of report
type $Extendable = {
  _id: ObjectId | string;
  description: string;
} & BaseModel;

// The complete Report data structure (Report Document)
export type Mongo_ReportModel = {
  reporterId: ObjectId | string;
  userId?: ObjectId | string;
  placeId?: ObjectId | string;
  statusId?: ObjectId | string;
  blogId?: ObjectId | string;
  reasonId?: ObjectId | string;
} & $Extendable;

// The actual report data structure (A data that is joined from multiple documents)
export type Mongo_Report = {
  reporter: Mongo_Account;
  user?: Mongo_Account;
  place?: Mongo_Place;
  blog?: Mongo_Blog;
  reason: any;
  status: any;
} & $Extendable;

export type Mongo_ReportQuery = {};

export type Mongo_ReportsQuery = {
  reporter?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_ReportParams = {
  id?: string;
};
