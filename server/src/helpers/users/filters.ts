// Import helpers
import { SimpleMemoryStore } from "../other/memory-store";

// Import types
import type { Query } from "mongoose";

/**
 * Use this function to build a type query of blog
 * @param query
 * @param req
 * @returns
 */
export function buildUserTypeFilter(query: Query<any, any>, req: any) {
  const userRoles = SimpleMemoryStore.get("user-roles");
  const userType = req.query.type;
  const role = userRoles.find((t: any) => t.value === userType);

  if (role) {
    // Build query
    query.where("roleId").equals(role._id);
  }

  return query;
}

/**
 * Use this function to build a name query of blog
 * @param query
 * @param req
 * @returns
 */
export function buildUserNameFilter(query: Query<any, any>, req: any) {
  if (!req.query.name) return query;

  // Build query
  query.where("displayName").regex(new RegExp(req.query.name, "i"));

  return query;
}
