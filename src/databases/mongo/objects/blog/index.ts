import Joi from "joi";

// Import interfaces
import { IObjectModel } from "src/databases/interfaces";

// Impot from local
// Import query
import { BlogQuery } from "./query";

// Import types
import type { MongoUtils } from "../../utils";
import type { Mongo_BlogModel } from "../../types/blog";

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

  static Schema = Joi.object<Mongo_BlogModel>({
    typeId: Joi.object(),
    authorId: Joi.string().required(),
    mentionedPlaceIds: Joi.array().items(Joi.object()).default([]),
    contentUrl: Joi.string().default(""),
    name: Joi.string().required(),
    coverImage: Joi.string().default(""),
    isApproved: Joi.boolean().default(false),
    readTime: Joi.number().required(),
    createdAt: Joi.number().default(Date.now()),
    updatedAt: Joi.number().default(Date.now()),
  });

  static SchemaKeys = Object.keys(Blog.Schema.describe().keys);

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;

    this.author = new _BlogAuthor();
    this.mentionedPlaces = new _BlogMentionedPlaces();
    this.query = new BlogQuery(localUtils);

    _instance = this;
  }

  getFields(): Array<string> {
    return Blog.SchemaKeys;
  }
}
