import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        source: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        target: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
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
            delete ret.id;
            delete ret.__v;

            if (typeof ret.source === "object") {
              ret.user = ret.source;
              delete ret.source;
            }

            if (typeof ret.target === "object") {
              ret.user = ret.target;
              delete ret.target;
            }

            return ret;
          },
        },
      }
    );
  }
  const model = mongoose.model("Follows", _schema);
  return { model, name: "Follows" };
}
