// Import classes
import { Model } from "src/classes/Database";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";
import type { Mongo_UserRoleModel } from "../types/user-role";
import { Interchange } from "src/types/data.types";

export class UserRoleModel
  extends Model<MongoDB, Mongo_UserRoleModel>
  implements IModel<Mongo_UserRoleModel>
{
  private _localUtils!: MongoUtils;
  private _dbInfo!: Mongo_DBInformations;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(
      mongos.MAIN.db(dbInformations.users.NAME),
      dbInformations.users.OBJECTS.USER_ROLES
    );
    this._localUtils = localUtils;
    this._dbInfo = dbInformations;
  }

  private _getCollection() {
    return super.getCollection(
      this._localUtils.getCollection<Mongo_UserRoleModel>
    );
  }

  /**
   * Query a user role.
   * @param args
   * @returns
   */
  async query(...args: [string]) {
    const _collection = this._getCollection();

    return await this.handleInterchangeError<Mongo_UserRoleModel, this>(
      this,
      async function (o) {
        if (args[0]) {
          throw new Error("Role value is required");
        }

        // Find a role by _id or its value
        o.data = await _collection.findOne({
          $or: [
            { _id: this._localUtils.toObjectId(args[0]) },
            { value: args[0] },
          ],
        });
        o.message = "Query blog successfully";

        return o;
      }
    );
  }

  /**
   * Query multiple user roles.
   * @param args
   * @returns
   */
  async queryMultiply(...args: Array<any>) {
    const _collection = this._getCollection();

    return await this.handleInterchangeError<Array<Mongo_UserRoleModel>, this>(
      this,
      async function (o) {
        if (args[0]) {
          throw new Error("Role value is required");
        }

        // Find a role by _id or its value
        let cursor = _collection.find();

        o.data = await cursor.toArray();
        o.message = "Query blog successfully";

        return o;
      }
    );
  }
}
