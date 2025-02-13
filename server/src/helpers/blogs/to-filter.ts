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
 * @param requestQuery
 * @returns
 */
export function buildBlogTypeFilter(query: Query<any, any>, requestQuery: any) {
  query = buildBlogBaseFilter(query);

  if (!requestQuery.query.type) return query;

  // Build query
  query.where("typeId").equals(requestQuery.query.type);

  return query;
}

/**
 * Use this function to build a name query of blog
 * @param query
 * @param requestQuery
 * @returns
 */
export function buildBlogNameFilter(query: Query<any, any>, requestQuery: any) {
  query = buildBlogBaseFilter(query);

  if (!requestQuery.query.name) return query;

  // Build query
  query.where("name").regex(new RegExp(requestQuery.query.name, "i"));

  return query;
}
