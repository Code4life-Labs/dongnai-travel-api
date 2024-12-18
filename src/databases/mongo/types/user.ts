// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "../../index.types";
import type { Mongo_UserRoleModel } from "./user-role";

// Use for base type of User
type $Extendable = {
  _id: ObjectId | string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  hashedPassword: string;
  displayName: string;
  birthday: number;
  avatar: string;
  coverPhoto: string;
} & BaseModel;

// The complete User data structure (User Document)
export type Mongo_UserModel = {
  roleId: ObjectId | string;
} & $Extendable;

// User state in User / final query of User
export type Mongo_User = {
  role: Mongo_UserRoleModel;
} & $Extendable;

// Use in request
export type Mongo_UserQuery = {};

export type Mongo_UsersQuery = {
  email?: string;
  username?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_UserParams = {
  id?: string;
};
