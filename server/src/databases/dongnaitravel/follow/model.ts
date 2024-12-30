import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        source: Schema.Types.ObjectId,
        target: Schema.Types.ObjectId,
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
        collection: "Follows",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            return ret;
          },
        },
      }
    );
  }
  const model = mongoose.model("Follows", _schema);
  return { model, name: "Follows" };
}
