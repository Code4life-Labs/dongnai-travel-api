import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type {
  Mongo_Place,
  Mongo_PlaceModel,
  Mongo_PlaceQuery,
  Mongo_PlacesQuery,
  Mongo_PlaceParams,
} from "../types/place";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";
import { Interchange } from "src/types/data.types";

export class PlaceModel
  extends Model<MongoDB, Mongo_PlaceModel>
  implements IModel<Mongo_PlaceModel>
{
  private __localUtils!: MongoUtils;
  private __dbInfo!: Mongo_DBInformations;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(
      mongos.MAIN.db(dbInformations.dongnaitravelapp.NAME),
      dbInformations.dongnaitravelapp.OBJECTS.MAPS
    );
    this.schema = Joi.object<Mongo_PlaceModel>({
      addressComponents: Joi.array().items(Joi.object()),
      businessStatus: Joi.string(),
      geometry: Joi.object(),
      phoneNumber: Joi.string(),
      name: Joi.string(),
      plusCode: Joi.string(),
      rating: Joi.number(),
      types: Joi.array().items(Joi.string()),
      url: Joi.string(),
      website: Joi.string(),
      userRatingsTotal: Joi.number(),
      userFavoritesTotal: Joi.number().default(0),
      visitsTotal: Joi.number().default(0),
      isRecommended: Joi.boolean(),
      placeId: Joi.string(),
      contentId: Joi.string().required(),
      photosId: Joi.string().required(),
      createdAt: Joi.number().default(Date.now()),
      updatedAt: Joi.number().default(Date.now()),
    });
    this.__localUtils = localUtils;
    this.__dbInfo = dbInformations;
  }

  private __getCollection() {
    return super.getCollection(
      this.__localUtils.getCollection<Mongo_PlaceModel>
    );
  }

  async queryMultiply<Mongo_Place>(...args: [Mongo_PlacesQuery]) {
    const __collection = this.__getCollection();

    return await this.handleInterchangeError<Array<Mongo_Place>, this>(
      this,
      async function (o) {
        const pipeline = [];

        // If request has queries
        if (args[0]) {
          const matchStage = {
            $match: this.__localUtils.pipeline.and(),
          };

          // If query has `types`
          // if (args[0].types)
          //   matchStage.$match.$and.push(
          //     this.__localUtils.pipeline.getMatchElementArrayQuery(
          //       "types",
          //       this.__localUtils.pipeline.getMatchArrayQuery(
          //         "value",
          //         args[0].types
          //       )
          //     )
          //   );

          // If match stage is empty
          if (matchStage.$match.$and.length === 0)
            matchStage.$match = {} as any;

          pipeline.push(
            // Look-up Stage
            // Get all related documents in `photos` collection and merge
            this.__localUtils.pipeline.getLookupStage(
              this.__dbInfo.dongnaitravelapp.OBJECTS.PHOTOS,
              "photosId",
              "_id",
              "photos"
            ),
            // Look-up Stage
            // Get all related documents in `content` collection and merge
            this.__localUtils.pipeline.getLookupStage(
              this.__dbInfo.dongnaitravelapp.OBJECTS.CONTENT,
              "contentId",
              "_id",
              "content"
            ),
            // this.__localUtils.pipeline.getProjectStage(
            //   [],
            //   ["placeId", "contentId", "photosId"]
            // ),
            this.__localUtils.pipeline.getUnwindStage("photos"),
            this.__localUtils.pipeline.getUnwindStage("content"),
            // Match
            // Depend on
            matchStage
          );
        }

        pipeline.push(
          ...this.__localUtils.pipeline.getLimitnSkipStage(
            parseInt(args[0].limit || "10"),
            parseInt(args[0].skip || "0")
          )
        );

        console.log("Pipeline:", pipeline);

        const cursor = __collection.aggregate(pipeline);
        o.data = (await cursor.toArray()) as Array<Mongo_Place>;
        o.message = "Query places successfully";

        return o;
      }
    );
  }

  // async query(...args: [Mongo_PlacesQuery, Mongo_PlaceParams]) {
  //   const __collection = this.__getCollection();

  //   return await this.handleInterchangeError<Mongo_Place, this>(
  //     this,
  //     async function (o) {
  //       const pipeline = [];

  //       // If request has params
  //       if (!args[0]) throw new Error("The [token] is required");

  //       const result = await __collection.findOne({ value: args[0] });

  //       if (!result) throw new Error(`The token isn't found`);

  //       o.data = result as Mongo_Place;
  //       o.message = "Query token successfully";

  //       return o;
  //     }
  //   );
  // }
}
