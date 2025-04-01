// Import helpers
import { transformExcludedFieldsToStr } from "../other/field-transformers";

// Import types
import type { Query } from "mongoose";

export const PlaceProjectionFields = {
  ExcludedFields: [
    "website",
    "phoneNumber",
    "content",
    "plusCode",
    "updatedAt",
    "createdAt",
  ],
};

export function buildProjection(query: Query<any, any>) {
  // Populate types
  query.populate("types", "_id name value");
  query.populate("reviews");
  query.populate("favorites");
  query.populate("visits");

  // Exclude some fields
  query.select("-content");

  return query;
}

export function buildFullProjection(query: Query<any, any>) {
  // Populate types
  query.populate("types", "_id name value");
  query.populate("reviews");
  query.populate("favorites");
  query.populate("visits");

  return query;
}

export function buildBriefProjection(query: Query<any, any>) {
  // Populate types
  query.populate("types", "_id name value");
  query.populate("reviews");
  query.populate("favorites");
  query.populate("visits");

  // Exclude some fields
  query.select(
    transformExcludedFieldsToStr(PlaceProjectionFields.ExcludedFields)
  );

  return query;
}
