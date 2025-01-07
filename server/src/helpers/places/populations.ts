// Import types
import type { Query } from "mongoose";

export function buildPlacePopulation(query: Query<any, any>) {
  // Populate types
  query.populate("types", "_id name value");

  return query;
}
