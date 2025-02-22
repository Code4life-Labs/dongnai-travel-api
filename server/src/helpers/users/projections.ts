// Import helpers
import { transformExcludedFieldsToStr } from "../other/field-transformers";

// Import types
import type { Query } from "mongoose";

export const UserProjectionFields = {
  ExcludedFields: ["updatedAt", "createdAt"],
};

export function buildUserProjection(query: Query<any, any>) {
  // Populate role
  query.populate("role", "_id name value");

  query.select(
    transformExcludedFieldsToStr(UserProjectionFields.ExcludedFields)
  );

  return query;
}
