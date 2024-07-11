import { Base } from "src/classes/Base";

import { MongoDatabase } from "./mongo";
import { MySQLDatabase } from "./mysql";

export class Databases extends Base {
  mongo!: MongoDatabase;
  mysql!: MySQLDatabase;

  constructor() {
    super();
    this.mongo = new MongoDatabase();
    this.mysql = new MySQLDatabase();
  }

  async connect() {
    console.log("Databases - status:", this.utils.logger.yellow("connecting..."));
    await Promise.all([this.mongo.connect(), /* this.mysql.connect()*/])
    console.log("Databases - status:", this.utils.logger.green("connected"));
  }
}