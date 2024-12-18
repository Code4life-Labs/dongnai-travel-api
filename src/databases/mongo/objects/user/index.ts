import Joi from "joi";

// Import interfaces
import { IObjectModel } from "src/databases/interfaces";

// Impot from local
// Import query
import { UserQuery } from "./query";

// Import types
import type { MongoUtils } from "../../utils";
import type { Mongo_UserModel, Mongo_User } from "../../types/user";

/**
 * Private reference of class manager
 */
let _instance: User | null = null;

/**
 * A singleton class of place manager
 * @NguyenAnhTuan1912
 */
export class User implements IObjectModel {
  query!: UserQuery;

  /**
   * Use to validate when create new.
   */
  static ModelSchema = Joi.object<Mongo_UserModel>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    hashedPassword: Joi.string().required(),
    displayName: Joi.string().default(
      (obj) => `${obj.firstName} ${obj.lastName}`
    ),
    birthday: Joi.number().required(),
    avatar: Joi.string().default(""),
    coverPhoto: Joi.string().default(""),
    createdAt: Joi.number().default(Date.now()),
    updatedAt: Joi.number().default(Date.now()),
  });

  /**
   * Use to validate when update.
   */
  static UpdateModelSchema = Joi.object<Mongo_UserModel>({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    username: Joi.string(),
    hashedPassword: Joi.string(),
    displayName: Joi.string().default(
      (obj) => `${obj.firstName} ${obj.lastName}`
    ),
    birthday: Joi.number(),
    avatar: Joi.string(),
    coverPhoto: Joi.string(),
    createdAt: Joi.number(),
    updatedAt: Joi.number().default(Date.now()),
  });

  /**
   * Use to validate when returns
   */
  static Schema = Joi.object<Mongo_User>({
    role: Joi.object(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    displayName: Joi.string().default(
      (obj) => `${obj.firstName} ${obj.lastName}`
    ),
    birthday: Joi.number(),
    avatar: Joi.string(),
    coverPhoto: Joi.string(),
    createdAt: Joi.number(),
    updatedAt: Joi.number(),
  });

  static ModelSchemaKeys = Object.keys(User.ModelSchema.describe().keys);
  static SchemaKeys = Object.keys(User.Schema.describe().keys);

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;

    this.query = new UserQuery(localUtils);

    _instance = this;
  }

  /**
   * Get expected fields of user model.
   * @returns
   */
  getModelFields(): Array<string> {
    return User.ModelSchemaKeys;
  }

  /**
   * Get expected fields of user (final result).
   * @returns
   */
  getFields(excludes?: Array<string>): Array<string> {
    if (excludes) {
      const result: { [key: string]: number } = {};

      for (const key of User.SchemaKeys) {
        result[key] = 1;
      }

      for (const key of excludes) {
        if (result[key]) delete result[key];
      }

      return Object.keys(result);
    }

    return User.SchemaKeys;
  }
}
