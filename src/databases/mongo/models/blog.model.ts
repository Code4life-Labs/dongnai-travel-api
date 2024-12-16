import Joi from "joi";

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
  Mongo_Blog_ContentModel,
  Mongo_BlogModel,
  Mongo_BlogParams,
  Mongo_BlogQuery,
  Mongo_BlogsQuery,
} from "../types/blog";

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
          // Get all related documents in `content` collection and merge
          this._localUtils.pipeline.getLookupStage(
            this._dbInfo.dongnaitravelapp.OBJECTS.BLOG_CONTENT,
            "contentId",
            "_id",
            "content",
            [
              this._localUtils.pipeline.getProjectStage(
                this._blog.content.getFields()
              ),
            ]
          ),
          // Look-up Stage
          // Get all related documents in `place` collection and merge
          this._localUtils.pipeline.getLookupStage(
            this._dbInfo.dongnaitravelapp.OBJECTS.MAPS,
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
          this._localUtils.pipeline.getProjectStage(
            this._blog.getCompleteFields()
          ),
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
            this._localUtils.pipeline.getProjectStage(
              this._blog.getReducedFields()
            ),
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
}
