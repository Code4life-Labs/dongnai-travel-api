import { Collection, Db } from "mongodb";
import type { Mongo_UserFavoritePlaceModel } from "../types/user_favorite_places";

export class UserFavoritePlaceModel {
  private collection: Collection<Mongo_UserFavoritePlaceModel>;

  constructor(db: Db) {
    this.collection = db.collection<Mongo_UserFavoritePlaceModel>("user_favorite_places");
    this.collection.createIndex({ userId: 1, placeId: 1 }, { unique: true });
  }

  getCollection() {
    return this.collection;
  }
} 