// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";

// Use for base type of report
type $Extendable = {
  _id: ObjectId | string;
  title: string;
  image: string;
  target: string;
  brand: {
    name: string;
    logoUrl: string;
    website: string;
  };
  isActive: boolean;
  startDate: number;
  endDate: number;
} & Omit<BaseModel, "updatedAt">;

// The complete Banner data structure (Banner Document)
export type Mongo_BannerModel = $Extendable;

// The actual report data structure (A data that is joined from multiple documents)
export type Mongo_Banner = $Extendable;

export type Mongo_BannerQuery = {};

export type Mongo_BannersQuery = {
  name?: string;
  brand?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_BannerParams = {
  id?: string;
};
