import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        userId: Schema.Types.ObjectId,
        blogId: Schema.Types.ObjectId,
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
            return ret;
          },
        },
      }
    );
  }
  const model = mongoose.model("BlogComments", _schema);
  return { model, name: "BlogComments" };
}
