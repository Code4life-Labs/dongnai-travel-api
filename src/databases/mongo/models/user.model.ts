import { ObjectId } from "mongodb";

// Import classes
import { Model } from "src/classes/Database";

// Import objects
import { User } from "../objects/user";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";
import type {
  Mongo_User,
  Mongo_UserModel,
  Mongo_UserParams,
  Mongo_UserQuery,
  Mongo_UsersQuery,
} from "../types/user";
import type { Interchange } from "src/types/data.types";

export class UserModel
  extends Model<MongoDB, Mongo_UserModel>
  implements IModel<Mongo_User>
{
  private _localUtils!: MongoUtils;
  private _dbInfo!: Mongo_DBInformations;
  private _user!: User;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(
      mongos.MAIN.db(dbInformations.dongnaitravelapp.NAME),
      dbInformations.dongnaitravelapp.OBJECTS.BLOGS
    );
    this._user = new User(localUtils);
    this._localUtils = localUtils;
    this._dbInfo = dbInformations;
  }

  private _getCollection() {
    return super.getCollection(this._localUtils.getCollection<Mongo_UserModel>);
  }

  /**
   * Query a user.
   * @param args
   * @returns
   */
  async query(...args: [Mongo_UserQuery, Mongo_UserParams]) {
    const _collection = this._getCollection();

    return await this.handleInterchangeError<Mongo_User, this>(
      this,
      async function (o) {
        // If request has params
        if (
          this.utils.boolean.isEmpty(args[1]) ||
          this.utils.boolean.isEmpty(args[1].id)
        )
          throw new Error("The [id] is required");

        const pipeline = [
          {
            $match: this._localUtils.pipeline.getMatchIdQuery(args[1].id),
          },
          // Look-up Stage
          // Get all related documents in `photos` collection and merge
          this._localUtils.pipeline.getLookupStage(
            this._dbInfo.dongnaitravelapp.OBJECTS.USER_ROLES,
            "roleId",
            "_id",
            "role"
          ),
          this._localUtils.pipeline.getUnwindStage("role"),
          this._localUtils.pipeline.getProjectStage(this._user.getFields()),
          { $limit: 1 },
          { $skip: 0 },
        ];

        const result = _collection.aggregate<Mongo_User>(pipeline);

        if (!result) throw new Error(`User isn't found`);

        o.data = (await result.toArray())[0];
        o.message = "Query user successfully";

        return o;
      }
    );
  }

  /**
   * Query multiple users.
   * @param args
   * @returns
   */
  async queryMultiply(...args: [Mongo_UsersQuery]) {
    const _collection = this._getCollection();

    return await this.handleInterchangeError<Array<Mongo_User>, this>(
      this,
      async function (o) {
        let pipeline: Array<any> = [];

        // If request has queries
        if (args[0]) {
          const criteria = this._user.query.get(args[0]);

          const matchStage = {
            $match:
              criteria.length < 2
                ? criteria[0] || {}
                : this._localUtils.pipeline.and(criteria),
          };

          pipeline.push(
            this._localUtils.pipeline.getProjectStage(this._user.getFields()),
            // Match
            // Depend on
            matchStage
          );
        }

        pipeline = pipeline.concat(
          this._localUtils.pipeline.getLimitnSkipStage(
            parseInt(args[0].limit || "10"),
            parseInt(args[0].skip || "0")
          )
        );

        const cursor = _collection.aggregate<Mongo_User>(pipeline);

        o.data = await cursor.toArray();
        o.message = "Query users successfully";

        return o;
      }
    );
  }

  /**
   * Create a user.
   * @param args
   * @returns
   */
  async create(...args: Array<any>): Promise<Interchange<any | null>> {
    const _collection = this._getCollection();

    return await this.handleInterchangeError(this, async function (o) {
      const [userData] = args;

      // Validate data
      const validationResult = User.ModelSchema.validate(userData);

      // If there is an error
      if (validationResult.error)
        throw new Error(validationResult.error.message);

      // Add new user to database
      const createResult = _collection.insertOne(validationResult.value);

      o.message = "Create user successfully";
      o.data = createResult;
      return o;
    });
  }

  /**
   * Create multiple users.
   * @param args
   * @returns
   */
  async createMultiply(...args: Array<any>): Promise<Interchange<any | null>> {
    const _collection = this._getCollection();
    return await this.handleInterchangeError(this, async function (o) {
      const [usersData] = args;
      const finalResult = [];

      // Validate data
      for (const userData of usersData) {
        const validationResult = User.ModelSchema.validate(userData);

        // If there is an error
        if (validationResult.error)
          throw new Error(validationResult.error.message);

        finalResult.push(validationResult.value);
      }

      // Add new user to database
      const createManyResult = _collection.insertMany(finalResult);

      o.message = "Create multiple users successfully";
      o.data = createManyResult;
      return o;
    });
  }

  /**
   * Update a user.
   * @param args
   * @returns
   */
  async update(...args: Array<any>): Promise<Interchange<any | null>> {
    const _collection = this._getCollection();

    return await this.handleInterchangeError(this, async function (o) {
      const [userData] = args;

      // Delete updatedAt
      delete userData.updatedAt;

      // Validate data
      const validationResult = User.UpdateModelSchema.validate(userData);

      // If there is an error
      if (validationResult.error)
        throw new Error(validationResult.error.message);

      // Add new user to database
      const updateResult = _collection.updateOne(
        { _id: new ObjectId(validationResult.value._id) },
        validationResult.value
      );

      o.message = `Update user ${userData._id} successfully`;
      o.data = updateResult;
      return o;
    });
  }

  /**
   * Delete a user.
   * @param args
   * @returns
   */
  async delete(...args: Array<any>): Promise<Interchange<any | null>> {
    const _collection = this._getCollection();

    return await this.handleInterchangeError(this, async function (o) {
      const [userId] = args;

      // Delete user by id
      const deleteResult = _collection.deleteOne({
        _id: new ObjectId(userId),
      });

      o.message = `Delete user ${userId} successfully`;
      o.data = deleteResult;
      return o;
    });
  }
}
