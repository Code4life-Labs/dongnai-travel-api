import { Collection, Db } from "mongodb";
import type { Mongo_UserVisitedPlaceModel } from "../types/user_visited_places";

export class UserVisitedPlaceModel {
  private collection: Collection<Mongo_UserVisitedPlaceModel>;

  constructor(db: Db) {
    this.collection = db.collection<Mongo_UserVisitedPlaceModel>("user_visited_places");
    
    // Tạo compound index cho userId và placeId
    this.collection.createIndex(
      { userId: 1, placeId: 1 },
      { unique: true }
    );
  }

  getCollection() {
    return this.collection;
  }
} 