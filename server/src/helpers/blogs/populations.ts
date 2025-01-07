// Import types
import type { Query } from "mongoose";

export function buildBlogPopulation(query: Query<any, any>) {
  // Populate type
  query.populate("type", "_id name value");

  // Populate places
  query.populate("mentionedPlaces");

  return query;
}
