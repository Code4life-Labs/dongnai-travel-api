import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
        blogId: { type: Schema.Types.ObjectId, ref: "Blogs", required: true },
        content: Schema.Types.String,
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
        collection: "BlogComments",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            delete ret.id;

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
  const model = mongoose.model("BlogComments", _schema);
  return { model, name: "BlogComments" };
}
