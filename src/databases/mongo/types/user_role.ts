// Import types
import type { ObjectId } from "mongodb";

export type Mongo_UserRoleModel = {
  _id: ObjectId | string;
  value: string;
};
