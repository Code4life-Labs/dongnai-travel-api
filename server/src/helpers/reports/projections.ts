// Import helpers
import { transformExcludedFieldsToStr } from "../other/field-transformers";

// Import types
import type { Query } from "mongoose";

export const ReportProjectionFields = {
  ExcludedFields: ["reporterId", "reasonId", "statusId"],
};

export function buildProjection(query: Query<any, any>) {
  // Populate types
  query.populate("reporter", "_id firstName lastName displayName avatar");
  query.populate("reason");
  query.populate("status");

  // Exclude some fields
  query.select("-description");

  return query;
}

export function buildFullProjection(query: Query<any, any>) {
  // Populate types
  query.populate("reporter", "_id firstName lastName displayName avatar");
  query.populate("reason");
  query.populate("status");

  // Exclude some fields
  query.select(
    transformExcludedFieldsToStr(ReportProjectionFields.ExcludedFields)
  );

  return query;
}

export function buildBriefProjection(query: Query<any, any>) {
  // Populate types
  query.populate("reporter", "_id firstName lastName displayName avatar");
  query.populate("reason");
  query.populate("status");

  // Exclude some fields
  query.select("-description");

  // Exclude some fields
  query.select(
    transformExcludedFieldsToStr(ReportProjectionFields.ExcludedFields)
  );

  return query;
}
