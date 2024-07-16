// Import classes
import { Controller } from "../classes/Controller";

// Import types
import type { Request, Response } from "express";
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";
import type {
  Mongo_Place,
  Mongo_PlaceModel,
  Mongo_PlaceParams,
  Mongo_PlaceQuery,
  Mongo_PlacesQuery,
} from "src/databases/mongo/types/place";

export class PlaceController extends Controller {
  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super(dbs, serv, midws);

    // Add middlewares
    // this.buildWithMiddlewares("get::", this.midws.authorization.guest);
    // this.buildWithMiddlewares("get::/authors", this.midws.authorization.guest);
    // this.buildWithMiddlewares("get::/types", this.midws.authorization.guest);
    // this.buildWithMiddlewares("get::/:id", this.midws.authorization.guest);
    // this.buildWithMiddlewares("get::/authors/:id", this.midws.authorization.guest);
    // this.buildWithMiddlewares("get::/types/:id", this.midws.authorization.guest);
  }

  async ["get::"](req: Request, res: Response) {
    return await this.handleResponseError<Mongo_Place[], this>(
      this,
      res,
      async function (o) {
        let query = req.query as Mongo_PlacesQuery;
        let result = await this.dbs.mongo.place.queryMultiply(query);

        if (!result.code) throw new Error(result.message!);

        o.data = result.data;
        o.success!.message = result.message!;

        return o;
      }
    );
  }

  ///
  /// ALL THE ROUTE HAS /: WILDCARD WILL BE DEFINED HERE
  ///
  async ["get::/:id"](req: Request, res: Response) {
    return await this.handleResponseError<Mongo_Place, this>(
      this,
      res,
      async function (o) {
        let query = req.query as Mongo_PlaceQuery;
        let params = req.params as Mongo_PlaceParams;
        let result = await this.dbs.mongo.place.query(query, params);

        if (!result.code) throw new Error(result.message!);

        o.data = result.data;
        o.success!.message = result.message!;

        return o;
      }
    );
  }
}
