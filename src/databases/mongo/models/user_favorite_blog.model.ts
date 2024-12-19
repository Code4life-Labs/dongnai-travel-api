import { Collection, Db, ObjectId } from "mongodb";
import type { Mongo_UserFavoriteBlogModel } from "../types/user_favorite_blogs";

export class UserFavoriteBlogModel {
  private collection: Collection<Mongo_UserFavoriteBlogModel>;

  constructor(db: Db) {
    this.collection = db.collection<Mongo_UserFavoriteBlogModel>("user_favorite_blogs");
    
    // Tạo compound index
    this.collection.createIndex(
      { userId: 1, blogId: 1 },
      { unique: true }
    );
  }

  getCollection() {
    return this.collection;
  }
} 