import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        value: {
          type: Schema.Types.String,
          enum: ["pending", "reviewed", "resolved"],
          require: true,
        },
        name: {
          type: Schema.Types.String,
          enum: ["Pending", "Reviewed", "Resolved"],
          require: true,
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
        collection: "ReportStatuses",
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
  const model = mongoose.model("ReportStatuses", _schema);
  return { model, name: "ReportStatuses" };
}
