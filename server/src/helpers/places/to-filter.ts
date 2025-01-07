// Import types
import type { Query } from "mongoose";

/**
 * Use this function to build a type query of place
 * @param query
 * @param requestQuery
 * @returns
 */
export function buildPlaceTypeFilter(
  query: Query<any, any>,
  requestQuery: any
) {
  if (!requestQuery.query.types) return;

  // Build query
  query.where("typeIds").in(requestQuery.query.types.split(";"));

  return query;
}

/**
 * Use this function to build a name query of place
 * @param query
 * @param requestQuery
 * @returns
 */
export function buildPlaceNameFilter(
  query: Query<any, any>,
  requestQuery: any
) {
  if (!requestQuery.query.name) return;

  // Build query
  query.where("name").regex(new RegExp(requestQuery.query.name, "i"));

  return query;
}

/**
 * Use this function to build a recommendation query of place
 * @param query
 * @param requestQuery
 */
export function buildPlaceRecommendationFilter(
  query: Query<any, any>,
  requestQuery: any
) {
  if (
    requestQuery.query.isRecommended === undefined ||
    requestQuery.query.isRecommended === null
  )
    return;

  // Build query
  query.where("isRecommended").equals(requestQuery.query.isRecommended);

  return query;
}
