// Import types
import type { MongoUtils } from "../../utils";
import type { Mongo_PlacesQuery } from "../../types/place";

/**
 * Class of place query manager
 * @NguyenAnhTuan1912
 */
export class PlaceQuery {
  localUtils!: MongoUtils;

  static StringSeparator = ";";
  static QualityKeywords = {
    Popular: "popular",
    MostFavorite: "most_favorite",
    HighRating: "high_rating",
  };

  constructor(localUtils: MongoUtils) {
    this.localUtils = localUtils;
  }

  /**
   * Return `criterion` for $match or `sort` for pipeline from `query.quality`
   * @param query
   * @returns
   */
  getQualitySort(query: Mongo_PlacesQuery) {
    const { quality } = query;
    let sort;

    if (!this.localUtils.utils.boolean.isEmpty(quality)) {
      switch (quality) {
        case PlaceQuery.QualityKeywords.HighRating: {
          sort = this.localUtils.sort({ descend: ["rating"] });
          break;
        }

        case PlaceQuery.QualityKeywords.MostFavorite: {
          sort = this.localUtils.sort({ descend: ["userFavoritesTotal"] });
          break;
        }

        case PlaceQuery.QualityKeywords.Popular: {
          sort = this.localUtils.sort({
            descend: ["userFavoritesTotal", "userRatingsTotal"],
          });
          break;
        }
      }
    }

    return sort;
  }

  /**
   * Return criteria of place that is used in $match
   * @param query
   */
  get(query: Mongo_PlacesQuery) {
    const { types, name, isRecommended } = query;
    const criteria = [];

    if (!this.localUtils.utils.boolean.isEmpty(types)) {
      criteria.push({
        types: { $all: types.split(PlaceQuery.StringSeparator) },
      });
    }

    if (!this.localUtils.utils.boolean.isEmpty(name)) {
      criteria.push({
        name: { $regex: name, $options: "i" },
      });
    }

    if (!this.localUtils.utils.boolean.isEmpty(isRecommended)) {
      criteria.push({
        isRecommended: isRecommended === "true" ? true : false,
      });
    }

    console.log("Criteria:", criteria);

    return criteria;
  }
}
