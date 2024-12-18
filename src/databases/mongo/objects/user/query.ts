import { ObjectId } from "mongodb";

// Import types
import type { MongoUtils } from "../../utils";
import type { Mongo_UsersQuery } from "../../types/user";

/**
 * Class of user query manager
 * @NguyenAnhTuan1912
 */
export class UserQuery {
  localUtils!: MongoUtils;

  constructor(localUtils: MongoUtils) {
    this.localUtils = localUtils;
  }

  /**
   * Return criteria of user that is used in $match.
   * This method is a central to process query of `user`.
   * @param query
   */
  get(query: Mongo_UsersQuery) {
    const { email, username } = query;
    const criteria = [];

    if (!this.localUtils.utils.boolean.isEmpty(email)) {
      criteria.push({
        email: email,
      });
    }

    if (!this.localUtils.utils.boolean.isEmpty(username)) {
      criteria.push({
        username: username,
      });
    }

    return criteria;
  }
}
