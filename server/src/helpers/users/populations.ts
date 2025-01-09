// Import types
import type { Query } from "mongoose";

export function buildUserPopulation(query: Query<any, any>) {
  // Populate role
  query.populate("role", "_id name value");

  return query;
}
