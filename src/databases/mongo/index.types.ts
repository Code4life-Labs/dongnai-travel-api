///
/// DEFINE DATA STRUCTURE OF OBJECT
///
import type { Db } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseParams } from "../index.types";

export type MongoDB = Db;

export type LookupStage = {
  from: string;
  localField: string;
  foreignField: string;
  as: string;
  pipeline?: Array<any>;
};
