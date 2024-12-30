// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";
import type { Mongo_UserRoleModel } from "./user-role";

// Use for base type of Account
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

// The complete Account data structure (Account Document)
export type Mongo_AccountModel = {
  roleId: ObjectId | string;
} & $Extendable;

// Account state in Account / final query of Account
export type Mongo_Account = {
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
