import Joi from "joi";

// Import interfaces
import { IObjectModel } from "src/databases/interfaces";

// Impot from local
// Import query
import { BlogQuery } from "./query";

// Import types
import type { MongoUtils } from "../../utils";
import type { Mongo_BlogModel, Mongo_Blog } from "../../types/blog";

/**
 * Private reference of class manager
 */
let _instance: Blog | null = null;

/**
 * Class of blog's author manager
 * @NguyenAnhTuan1912
 */
class _BlogAuthor implements IObjectModel {
  getFields(): Array<string> {
    return ["_id", "firstName", "lastName", "avatar"];
  }
}

/**
 * Class of blog's mentioned places manager
 * @NguyenAnhTuan1912
 */
class _BlogMentionedPlaces implements IObjectModel {
  getFields(): Array<string> {
    return ["_id", "name"];
  }
}

/**
 * A singleton class of place manager
 * @NguyenAnhTuan1912
 */
export class Blog implements IObjectModel {
  author!: _BlogAuthor;
  mentionedPlaces!: _BlogMentionedPlaces;
  query!: BlogQuery;

  /**
   * Use to validate when create new.
   */
  static ModelSchema = Joi.object<Mongo_BlogModel>({
    typeId: Joi.object().required(),
    authorId: Joi.string().required(),
    mentionedPlaceIds: Joi.array().items(Joi.object()).default([]),
    name: Joi.string().required(),
    contentUrl: Joi.string().required(),
    coverImage: Joi.string().required(),
    readTime: Joi.number().required(),
    isApproved: Joi.boolean().default(false),
    createdAt: Joi.number().default(Date.now()),
    updatedAt: Joi.number().default(Date.now()),
  });

  /**
   * Use to validate when update.
   */
  static UpdateModelSchema = Joi.object<Mongo_BlogModel>({
    typeId: Joi.object(),
    authorId: Joi.string(),
    mentionedPlaceIds: Joi.array().items(Joi.object()),
    name: Joi.string(),
    contentUrl: Joi.string(),
    coverImage: Joi.string(),
    readTime: Joi.number(),
    isApproved: Joi.boolean(),
    createdAt: Joi.number(),
    updatedAt: Joi.number().default(Date.now()),
  });

  /**
   * Use to validate when returns
   */
  static Schema = Joi.object<Mongo_Blog>({
    type: Joi.object(),
    author: Joi.object(),
    mentionedPlaces: Joi.array().items(Joi.object()),
    contentUrl: Joi.string(),
    name: Joi.string(),
    coverImage: Joi.string(),
    isApproved: Joi.boolean(),
    isLiked: Joi.boolean(),
    readTime: Joi.number(),
    createdAt: Joi.number(),
    updatedAt: Joi.number(),
  });

  static ModelSchemaKeys = Object.keys(Blog.ModelSchema.describe().keys);
  static SchemaKeys = Object.keys(Blog.Schema.describe().keys);

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;

    this.author = new _BlogAuthor();
    this.mentionedPlaces = new _BlogMentionedPlaces();
    this.query = new BlogQuery(localUtils);

    _instance = this;
  }

  /**
   * Get expected fields of blog model.
   * @returns
   */
  getModelFields(): Array<string> {
    return Blog.ModelSchemaKeys;
  }

  /**
   * Get expected fields of blog (final result).
   * @returns
   */
  getFields(excludes?: Array<string>): Array<string> {
    if (excludes) {
      const result: { [key: string]: number } = {};

      for (const key of Blog.SchemaKeys) {
        result[key] = 1;
      }

      for (const key of excludes) {
        if (result[key]) delete result[key];
      }

      return Object.keys(result);
    }

    return Blog.SchemaKeys;
  }
}
