import { ObjectId } from "mongodb";

// Import types
import type { MongoUtils } from "../../utils";
import type { Mongo_BlogsQuery } from "../../types/blog";

/**
 * Class of place query manager
 * @NguyenAnhTuan1912
 */
export class BlogQuery {
  localUtils!: MongoUtils;

  constructor(localUtils: MongoUtils) {
    this.localUtils = localUtils;
  }

  /**
   * Return criteria of place that is used in $match.
   * This method is a central to process query of `place`.
   * @param query
   */
  get(query: Mongo_BlogsQuery) {
    const { type, name, author } = query;
    const criteria = [];

    if (!this.localUtils.utils.boolean.isEmpty(type)) {
      criteria.push({
        type: type,
      });
    }

    if (!this.localUtils.utils.boolean.isEmpty(name)) {
      criteria.push({
        name: { $regex: name, $options: "i" },
      });
    }

    if (!this.localUtils.utils.boolean.isEmpty(author)) {
      criteria.push({
        authorId: new ObjectId(author),
      });
    }

    return criteria;
  }
}
