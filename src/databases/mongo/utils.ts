import { Db } from "mongodb";

export interface MongoUtils {
  db: Db;
  getDatabase(): Db;
}