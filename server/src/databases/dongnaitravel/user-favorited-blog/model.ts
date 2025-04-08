import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        blogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blogs",
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        createdAt: {
          type: Schema.Types.Number,
          default: Date.now,
        },
        updatedAt: {
          type: Schema.Types.Number,
          default: Date.now,
        },
      },
      {
        collection: "UserFavoritedBlogs",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            delete ret.id;
            delete ret.__v;

            return ret;
          },
        },
      }
    );

    _schema.virtual("user", {
      ref: "Users",
      localField: "userId",
      foreignField: "_id",
      justOne: true,
    });

    _schema.virtual("blog", {
      ref: "Blogs",
      localField: "blogId",
      foreignField: "_id",
      justOne: true,
    });
  }
  const model = mongoose.model("UserFavoritedBlogs", _schema);
  return { model, name: "UserFavoritedBlogs" };
}
