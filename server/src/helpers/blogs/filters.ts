// Import helpers
import { SimpleMemoryStore } from "../other/memory-store";

// Import types
import type { Query } from "mongoose";

export function buildApproveFilter(query: Query<any, any>) {
  // Must have
  query.where("isApproved").equals(true);

  return query;
}

/**
 * Use this function to build a type query of blog
 * @param query
 * @param req
 * @returns
 */
export function buildBlogTypeFilter(query: Query<any, any>, req: any) {
  if (!req.query.type) return query;
  if (req.query.type === "all") return query;

  const blogTypes = SimpleMemoryStore.get("blog-types");
  const requestTypeId = blogTypes.find(
    (t: any) => t.value === req.query.type
  )._id;

  // Build query
  query.where("typeId").equals(requestTypeId);

  return query;
}

/**
 * Use this function to build a name query of blog
 * @param query
 * @param req
 * @returns
 */
export function buildBlogNameFilter(query: Query<any, any>, req: any) {
  if (!req.query.name) return query;

  // Build query
  query.where("name").regex(new RegExp(req.query.name, "i"));

  return query;
}
