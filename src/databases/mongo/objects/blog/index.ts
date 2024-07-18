import Joi from "joi";

// Import interfaces
import { IObjectModel } from "src/databases/interfaces";

// Impot from local
// Import query
import { BlogQuery } from "./query";

// Import types
import type { MongoUtils } from "../../utils";
import type {
  Mongo_Blog,
  Mongo_BlogModel,
  Mongo_Blog_ContentModel,
} from "../../types/blog";

/**
 * Private reference of class manager
 */
let _instance: Blog | null = null;

/**
 * Class of blog's content manager
 * @NguyenAnhTuan1912
 */
class _BlogContent implements IObjectModel {
  getFields(): Array<keyof Mongo_Blog_ContentModel> {
    return ["_id", "plainText", "formattedText", "speech"];
  }
}

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
  content!: _BlogContent;
  author!: _BlogAuthor;
  mentionedPlaces!: _BlogMentionedPlaces;
  query!: BlogQuery;

  static Schemas = {
    Model: Joi.object<Mongo_BlogModel>({
      authorId: Joi.string().required(),
      contentId: Joi.string().default(""),
      mentionedPlaceIds: Joi.array().items(Joi.object().default(null)),
      name: Joi.string().required(),
      avatar: Joi.string().default(""),
      type: Joi.string().required(),
      isApproved: Joi.boolean().default(false),
      readTime: Joi.number().required(),
      createdAt: Joi.number().default(Date.now()),
      updatedAt: Joi.number().default(Date.now()),
    }),
    Complete: Joi.object<Mongo_Blog>({
      author: Joi.object().default(null),
      content: Joi.object().default(null),
      mentionedPlaces: Joi.array().items(Joi.object().default(null)),
      name: Joi.string().required(),
      avatar: Joi.string().default(""),
      type: Joi.string().required(),
      isApproved: Joi.boolean().default(false),
      readTime: Joi.number().required(),
      createdAt: Joi.number().default(Date.now()),
      updatedAt: Joi.number().default(Date.now()),
    }),
    Reduction: Joi.object<Mongo_Blog>({
      name: Joi.string().required(),
      avatar: Joi.string().default(""),
      type: Joi.string().required(),
      isApproved: Joi.boolean().default(false),
      readTime: Joi.number().required(),
      createdAt: Joi.number().default(Date.now()),
      updatedAt: Joi.number().default(Date.now()),
    }),
  };

  static SchemaKeys = {
    Model: Object.keys(Blog.Schemas.Model.describe().keys),
    Complete: Object.keys(Blog.Schemas.Complete.describe().keys),
    Reduction: Object.keys(Blog.Schemas.Reduction.describe().keys),
  };

  constructor(localUtils: MongoUtils) {
    if (_instance) return _instance;

    this.content = new _BlogContent();
    this.author = new _BlogAuthor();
    this.mentionedPlaces = new _BlogMentionedPlaces();
    this.query = new BlogQuery(localUtils);

    _instance = this;
  }

  getReducedFields(): Array<string> {
    return Blog.SchemaKeys.Reduction;
  }

  getCompleteFields(): Array<string> {
    return Blog.SchemaKeys.Complete;
  }

  getFields(): Array<string> {
    return Blog.SchemaKeys.Model;
  }
}
