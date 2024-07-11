import { MongoClient } from "mongodb";

// Import classes
import { Database } from "../../classes/Database";

// Import local utils
import { MongoUtils } from "./utils";

// Import models
import { BookModel } from "./models/book.model";
import { BookAuthorModel } from "./models/book_author.model";
import { BookTypeModel } from "./models/book_type.model";
import { TokenModel } from "./models/token.model";
import { UserRoleModel } from "./models/user_role.model";

// Import settings
import { AppSettings } from "src/settings";

const __settings = AppSettings.MONGO;

export type Mongo_Instances = {
  [K in keyof typeof __settings]: MongoClient;
}

export type Mongo_DBInformations = {
  [K in keyof typeof __settings.SIMPLE_API.DBS]: typeof __settings.SIMPLE_API.DBS[K];
}

export class MongoDatabase extends Database<Mongo_Instances, MongoUtils> {
  book!: BookModel;
  bookAuthor!: BookAuthorModel;
  bookType!: BookTypeModel;

  userRole!: UserRoleModel;
  token!: TokenModel;

  constructor() {
    super(new MongoUtils());

    let clusterNames = Object.keys(__settings);

    for(let clusterName of clusterNames) {
      this.instances[clusterName as keyof typeof __settings] = new MongoClient(
        this.localUtils.getConnectionString(
          __settings[clusterName as keyof typeof __settings].DOMAIN!,
          __settings[clusterName as keyof typeof __settings].USERNAME!,
          __settings[clusterName as keyof typeof __settings].PASSWORD!
        )!
      )
    }

    this.book = new BookModel(this.instances, this.localUtils, __settings.SIMPLE_API.DBS);
    this.bookAuthor = new BookAuthorModel(this.instances, this.localUtils, __settings.SIMPLE_API.DBS);
    this.bookType = new BookTypeModel(this.instances, this.localUtils, __settings.SIMPLE_API.DBS);
    this.userRole = new UserRoleModel(this.instances, this.localUtils, __settings.SIMPLE_API.DBS);
    this.token = new TokenModel(this.instances, this.localUtils, __settings.SIMPLE_API.DBS);
  }

  async connect() {
    try {
      let dbNames = Object.keys(this.instances);

      for(let dbName of dbNames) {
        console.log(`  ${dbName} DB - status:`, this.utils.logger.yellow("connecting..."));
        await this.instances[dbName as keyof typeof this.instances].connect();
        console.log(`  ${dbName} DB - status:`, this.utils.logger.green("connected"));
      }
      

    } catch (error: any) {
      console.error(error.message);
    }
  }
}