// Import types
import type { Query } from "mongoose";

/**
 * Use this function to build a type query of place
 * @param query
 * @param req
 * @returns
 */
export function buildPlaceTypeFilter(query: Query<any, any>, req: any) {
  if (!req.query.types) return query;
  if (req.query.types === "all") return query;

  // Build query
  query.where("typeIds").in(req.query.types.split(";"));

  return query;
}

/**
 * Use this function to build a name query of place
 * @param query
 * @param req
 * @returns
 */
export function buildPlaceNameFilter(query: Query<any, any>, req: any) {
  if (!req.query.name) return;

  // Build query
  query.where("name").regex(new RegExp(req.query.name, "i"));

  return query;
}

/**
 * Use this function to build a recommendation query of place
 * @param query
 * @param req
 */
export function buildPlaceRecommendationFilter(
  query: Query<any, any>,
  req: any
) {
  if (req.query.isRecommended === undefined || req.query.isRecommended === null)
    return;

  // Build query
  query.where("isRecommended").equals(req.query.isRecommended);

  return query;
}
