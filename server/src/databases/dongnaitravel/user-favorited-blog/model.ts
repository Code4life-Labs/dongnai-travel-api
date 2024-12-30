import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        userId: Schema.Types.ObjectId,
        blogId: Schema.Types.ObjectId,
        createdAt: {
          type: Schema.Types.Number,
          default: Date.now(),
        },
        updatedAt: {
          type: Schema.Types.Number,
          default: Date.now(),
        },
      },
      {
        collection: "UserFavoritedBlogs",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            return ret;
          },
        },
      }
    );
  }
  const model = mongoose.model("UserFavoritedBlogs", _schema);
  return { model, name: "UserFavoritedBlogs" };
}