import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        value: Schema.Types.String,
        name: Schema.Types.String,
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
        collection: "ReportReasons",
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
  }
  const model = mongoose.model("ReportReasons", _schema);
  return { model, name: "ReportReasons" };
}
