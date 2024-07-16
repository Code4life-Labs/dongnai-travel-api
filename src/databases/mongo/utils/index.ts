// Import base
import { Base } from "src/classes/Base";

// Import orther local utils
import { PipelineUtil } from "./pipeline";

// Import types
import type { Db, Document } from "mongodb";

/**
 * Utils of mongo
 * @NguyenAnhTuan1912
 */
export class MongoUtils extends Base {
  pipeline!: PipelineUtil;

  constructor() {
    super();
    this.pipeline = new PipelineUtil();
  }

  /**
   * Get $sort expression
   * @param o
   * @returns
   */
  sort(o: { ascend?: Array<string>; descend?: Array<string> }) {
    if (
      this.utils.boolean.isEmpty(o.ascend) &&
      this.utils.boolean.isEmpty(o.descend)
    )
      return {};

    const sortExpression: { $sort: { [K: string]: number } } = { $sort: {} };

    let N = 0,
      M = 0;

    if (
      this.utils.boolean.isEmpty(o.ascend) &&
      !this.utils.boolean.isEmpty(o.descend)
    )
      N = M = o.descend.length;

    if (
      !this.utils.boolean.isEmpty(o.ascend) &&
      this.utils.boolean.isEmpty(o.descend)
    )
      N = M = o.ascend.length;

    for (let i = 0; i < N || i < M; i++) {
      if (o.ascend && o.ascend[i]) {
        sortExpression["$sort"][o.ascend[i]] = 1;
      }

      if (o.descend && o.descend[i]) {
        sortExpression["$sort"][o.descend[i]] = -1;
      }
    }

    return sortExpression;
  }

  getConnectionString(domain: string, username: string, password: string) {
    if (!domain) {
      console.error("Domain of database is required");
      return;
    }

    if (!username) {
      console.error("Username of database user is required");
      return;
    }

    if (!password) {
      console.error("Password of database user is required");
      return;
    }

    return `mongodb+srv://${username}:${password}@${domain}/?retryWrites=true&w=majority`;
  }

  /**
   * Use this method to get instance of mongo collection
   * @param db
   * @param collection
   * @returns
   */
  getCollection<T extends Document>(db: Db, collection: string) {
    return db.collection<T>(collection);
  }
}
