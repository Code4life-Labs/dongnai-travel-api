// Import types
import type { Query } from "mongoose";

export const UserProjectionFields = {
  ExcludedFields: [
    "hashedPassword",
    "email",
    "username",
    "updatedAt",
    "createdAt",
  ],
};

export function buildUserPopulation(query: Query<any, any>) {
  // Populate role
  query.populate("role", "_id name value");

  return query;
}
