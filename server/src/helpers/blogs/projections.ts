// Import helpers
import { transformExcludedFieldsToStr } from "../other/field-transformers";

// Import types
import type { Query } from "mongoose";

export const BlogProjectionFields = {
  ExcludedFields: ["content", "images"],
};

export function buildBlogProjection(query: Query<any, any>) {
  // Populate type
  query.populate("type", "_id name value");
  query.populate("mentionedPlaces", "_id name photos");
  query.populate("author", "_id firstName lastName displayName avatar");
  query.populate("favorites");

  return query;
}

export function buildBriefProjection(query: Query<any, any>) {
  // Populate type
  query.populate("type", "_id name value");
  query.populate("author", "_id firstName lastName displayName avatar");
  query.populate("favorites");

  // Exclude some fields
  query.select(
    transformExcludedFieldsToStr(BlogProjectionFields.ExcludedFields)
  );

  return query;
}
