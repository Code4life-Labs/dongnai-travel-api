import { ObjectId } from "mongodb";

// Import classes
import { Model } from "src/classes/Database";

// Import objects
import { Blog } from "../objects/blog";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";
import type {
  Mongo_Blog,
  Mongo_BlogModel,
  Mongo_BlogParams,
  Mongo_BlogQuery,
  Mongo_BlogsQuery,
} from "../types/blog";
import type { Interchange } from "src/types/data.types";

export class BlogModel
  extends Model<MongoDB, Mongo_BlogModel>
  implements IModel<Mongo_Blog>
{
  private _localUtils!: MongoUtils;
  private _dbInfo!: Mongo_DBInformations;
  private _blog!: Blog;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(
      mongos.MAIN.db(dbInformations.dongnaitravelapp.NAME),
      dbInformations.dongnaitravelapp.OBJECTS.BLOGS
    );
    this._blog = new Blog(localUtils);
    this._localUtils = localUtils;
    this._dbInfo = dbInformations;
  }

  private _getCollection() {
    return super.getCollection(this._localUtils.getCollection<Mongo_BlogModel>);
  }

  async query(...args: [Mongo_BlogQuery, Mongo_BlogParams]) {
    const _collection = this._getCollection();

    return await this.handleInterchangeError<Mongo_Blog, this>(
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
            this._dbInfo.dongnaitravelapp.OBJECTS.USERS,
            "authorId",
            "_id",
            "author",
            [
              this._localUtils.pipeline.getProjectStage(
                this._blog.author.getFields()
              ),
            ]
          ),
          // Look-up Stage
          // Get all related documents in `blog` collection and merge
          this._localUtils.pipeline.getLookupStage(
            this._dbInfo.dongnaitravelapp.OBJECTS.PLACES,
            "mentionedPlaceIds",
            "_id",
            "mentionedPlaces",
            [
              this._localUtils.pipeline.getProjectStage(
                this._blog.mentionedPlaces.getFields()
              ),
            ]
          ),
          this._localUtils.pipeline.getUnwindStage("author"),
          this._localUtils.pipeline.getUnwindStage("content"),
          this._localUtils.pipeline.getProjectStage(this._blog.getFields()),
          { $limit: 1 },
          { $skip: 0 },
        ];

        const result = _collection.aggregate<Mongo_Blog>(pipeline);

        if (!result) throw new Error(`Blog isn't found`);

        o.data = (await result.toArray())[0];
        o.message = "Query blog successfully";

        return o;
      }
    );
  }

  async queryMultiply(...args: [Mongo_BlogsQuery]) {
    const _collection = this._getCollection();

    return await this.handleInterchangeError<Array<Mongo_Blog>, this>(
      this,
      async function (o) {
        let pipeline: Array<any> = [];

        // If request has queries
        if (args[0]) {
          const criteria = this._blog.query.get(args[0]);

          const matchStage = {
            $match:
              criteria.length < 2
                ? criteria[0] || {}
                : this._localUtils.pipeline.and(criteria),
          };

          pipeline.push(
            this._localUtils.pipeline.getProjectStage(this._blog.getFields()),
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

        const cursor = _collection.aggregate<Mongo_Blog>(pipeline);

        o.data = await cursor.toArray();
        o.message = "Query blogs successfully";

        return o;
      }
    );
  }

  /**
   * Create a blog.
   * @param args
   * @returns
   */
  async create(...args: Array<any>): Promise<Interchange<any | null>> {
    const _collection = this._getCollection();

    return await this.handleInterchangeError(this, async function (o) {
      const [blogData] = args;

      // Validate data
      const validationResult = Blog.ModelSchema.validate(blogData);

      // If there is an error
      if (validationResult.error)
        throw new Error(validationResult.error.message);

      // Add new blog to database
      const createResult = _collection.insertOne(validationResult.value);

      o.message = "Create blog successfully";
      o.data = createResult;
      return o;
    });
  }

  /**
   * Update a blog.
   * @param args
   * @returns
   */
  async update(...args: Array<any>): Promise<Interchange<any | null>> {
    const _collection = this._getCollection();

    return await this.handleInterchangeError(this, async function (o) {
      const [blogData] = args;

      // Delete updatedAt
      delete blogData.updatedAt;

      // Validate data
      const validationResult = Blog.UpdateModelSchema.validate(blogData);

      // If there is an error
      if (validationResult.error)
        throw new Error(validationResult.error.message);

      // Add new blog to database
      const updateResult = _collection.updateOne(
        { _id: new ObjectId(validationResult.value._id) },
        validationResult.value
      );

      o.message = `Update blog ${blogData._id} successfully`;
      o.data = updateResult;
      return o;
    });
  }

  /**
   * Delete a blog.
   * @param args
   * @returns
   */
  async delete(...args: Array<any>): Promise<Interchange<any | null>> {
    const _collection = this._getCollection();

    return await this.handleInterchangeError(this, async function (o) {
      const [blogId] = args;

      // Delete blog by id
      const deleteResult = _collection.deleteOne({
        _id: new ObjectId(blogId),
      });

      o.message = `Delete blog ${blogId} successfully`;
      o.data = deleteResult;
      return o;
    });
  }
}
