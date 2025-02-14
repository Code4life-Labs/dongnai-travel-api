// Import types
import type { Query } from "mongoose";

export const BlogProjectionFields = {
  ExcludedFields: ["createdAt", "isApproved"],
};

export function buildBlogProjection(query: Query<any, any>) {
  // Populate type
  query.populate("type", "_id name value");
  query.populate(
    "mentionedPlaces",
    "mentionedPlaces._id mentionedPlaces.name mentionedPlaces.coverImage"
  );
  query.populate("author", "_id firstName lastName displayName avatar");
  query.populate("favorites");
  query.populate("comments");

  return query;
}

export function buildBriefProjection(query: Query<any, any>) {
  // Populate type
  query.populate("type", "_id name value");
  query.populate("author", "_id firstName lastName displayName avatar");
  query.populate("favorites");
  query.populate("comments");

  // Exclude some fields
  query.select(
    BlogProjectionFields.ExcludedFields.map((fields) => `-${fields}`).join(" ")
  );

  return query;
}
