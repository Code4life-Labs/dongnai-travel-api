// Import types
import type { Query } from "mongoose";

function buildBlogBaseFilter(query: Query<any, any>) {
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
  query = buildBlogBaseFilter(query);

  if (!req.query.type) return query;
  if (req.query.types === "all") return query;

  // Build query
  query.where("typeId").equals(req.query.type);

  return query;
}

/**
 * Use this function to build a name query of blog
 * @param query
 * @param req
 * @returns
 */
export function buildBlogNameFilter(query: Query<any, any>, req: any) {
  query = buildBlogBaseFilter(query);

  if (!req.query.name) return query;

  // Build query
  query.where("name").regex(new RegExp(req.query.name, "i"));

  return query;
}
