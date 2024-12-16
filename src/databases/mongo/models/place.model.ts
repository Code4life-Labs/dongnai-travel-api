import { ObjectId } from "mongodb";
import Joi from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import objects
import { Place } from "../objects/place";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";
import type {
  Mongo_Place,
  Mongo_PlaceModel,
  Mongo_PlaceQuery,
  Mongo_PlacesQuery,
  Mongo_PlaceParams,
} from "../types/place";
import { Interchange } from "src/types/data.types";

export class PlaceModel
  extends Model<MongoDB, Mongo_PlaceModel>
  implements IModel<Mongo_PlaceModel>
{
  private _localUtils!: MongoUtils;
  private _dbInfo!: Mongo_DBInformations;
  private _place!: Place;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(
      mongos.MAIN.db(dbInformations.dongnaitravelapp.NAME),
      dbInformations.dongnaitravelapp.OBJECTS.MAPS
    );
    this._place = new Place(localUtils);
    this._localUtils = localUtils;
    this._dbInfo = dbInformations;
  }

  private _getCollection() {
    return super.getCollection(
      this._localUtils.getCollection<Mongo_PlaceModel>
    );
  }

  async query(...args: [Mongo_PlaceQuery, Mongo_PlaceParams]) {
    const _collection = this._getCollection();

    return await this.handleInterchangeError<Mongo_Place, this>(
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
            this._dbInfo.dongnaitravelapp.OBJECTS.PHOTOS,
            "photosId",
            "_id",
            "photos",
            [
              this._localUtils.pipeline.getProjectStage(
                this._place.photos.getFields()
              ),
            ]
          ),
          // Look-up Stage
          // Get all related documents in `content` collection and merge
          this._localUtils.pipeline.getLookupStage(
            this._dbInfo.dongnaitravelapp.OBJECTS.CONTENT,
            "contentId",
            "_id",
            "content",
            [
              this._localUtils.pipeline.getProjectStage(
                this._place.content.getFields()
              ),
            ]
          ),
          this._localUtils.pipeline.getUnwindStage("photos"),
          this._localUtils.pipeline.getUnwindStage("content"),
          this._localUtils.pipeline.getProjectStage(
            this._place.getCompleteFields()
          ),
          { $limit: 1 },
          { $skip: 0 },
        ];

        const result = _collection.aggregate<Mongo_Place>(pipeline);

        if (!result) throw new Error(`Place isn't found`);

        o.data = (await result.toArray())[0];
        o.message = "Query place successfully";

        return o;
      }
    );
  }

  async queryMultiply(...args: [Mongo_PlacesQuery]) {
    const _collection = this._getCollection();

    return await this.handleInterchangeError<Array<Mongo_Place>, this>(
      this,
      async function (o) {
        let pipeline: Array<any> = [];

        // If request has queries
        if (args[0]) {
          const criteria = this._place.query.get(args[0]);
          const sort = this._place.query.getSortByQuality(args[0]);

          const matchStage = {
            $match:
              criteria.length < 2
                ? criteria[0] || {}
                : this._localUtils.pipeline.and(criteria),
          };

          pipeline.push(
            this._localUtils.pipeline.getProjectStage(
              this._place.getReducedFields()
            ),
            // Match
            // Depend on
            matchStage
          );

          sort && pipeline.push(sort);
        }

        pipeline = pipeline.concat(
          this._localUtils.pipeline.getLimitnSkipStage(
            parseInt(args[0].limit || "10"),
            parseInt(args[0].skip || "0")
          )
        );

        const cursor = _collection.aggregate<Mongo_Place>(pipeline);
        o.data = await cursor.toArray();
        o.message = "Query places successfully";

        return o;
      }
    );
  }

  async create(...args: Array<any>): Promise<Interchange<any | null>> {
    return await this.handleInterchangeError(this, async function (o) {
      return o;
    });
  }

  async update(...args: Array<any>): Promise<Interchange<any | null>> {
    return await this.handleInterchangeError(this, async function (o) {
      return o;
    });
  }

  async delete(...args: Array<any>): Promise<Interchange<any | null>> {
    return await this.handleInterchangeError(this, async function (o) {
      return o;
    });
  }
}
