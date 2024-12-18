import { MongoClient } from "mongodb";

// Import classes
import { Database } from "../../classes/Database";

// Import from local
// Import models
import { PlaceModel } from "./models/place.model";
import { BlogModel } from "./models/blog.model";
import { UserRoleModel } from "./models/user-role.model";

// Import settings
import { AppSettings } from "src/settings";

// Import utils
import { MongoUtils } from "./utils";

const __settings = AppSettings.MONGO;

export type Mongo_Instances = {
  [K in keyof typeof __settings]: MongoClient;
};

export type Mongo_DBInformations = {
  [K in keyof typeof __settings.MAIN.DBS]: (typeof __settings.MAIN.DBS)[K];
};

export class MongoDatabase extends Database<Mongo_Instances, MongoUtils> {
  place!: PlaceModel;
  blog!: BlogModel;
  userRole!: UserRoleModel;

  constructor() {
    super(new MongoUtils());

    let clusterNames = Object.keys(__settings);

    for (let clusterName of clusterNames) {
      this.instances[clusterName as keyof typeof __settings] = new MongoClient(
        this.localUtils.getConnectionString(
          __settings[clusterName as keyof typeof __settings].DOMAIN!,
          __settings[clusterName as keyof typeof __settings].USERNAME!,
          __settings[clusterName as keyof typeof __settings].PASSWORD!
        )!
      );
    }

    this.place = new PlaceModel(
      this.instances,
      this.localUtils,
      __settings.MAIN.DBS
    );

    this.blog = new BlogModel(
      this.instances,
      this.localUtils,
      __settings.MAIN.DBS
    );

    this.userRole = new UserRoleModel(
      this.instances,
      this.localUtils,
      __settings.MAIN.DBS
    );
  }

  async connect() {
    try {
      let dbNames = Object.keys(this.instances);

      for (let dbName of dbNames) {
        console.log(
          `  ${dbName} DB - status:`,
          this.utils.logger.yellow("connecting...")
        );
        await this.instances[dbName as keyof typeof this.instances].connect();
        console.log(
          `  ${dbName} DB - status:`,
          this.utils.logger.green("connected")
        );
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
