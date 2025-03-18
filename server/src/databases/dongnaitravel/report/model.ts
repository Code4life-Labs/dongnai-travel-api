import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        reporterId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        reportedItem: {
          item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "reportedItem.itemType",
          },
          itemType: {
            type: String,
            enum: ["Places", "Blogs", "Users"],
            required: true,
          },
        },
        reasonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ReportReason",
          required: true,
        },
        description: {
          type: String,
          required: false,
        },
        statusId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ReportStatus",
          required: true,
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
        collection: "Reports",
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

    _schema.virtual("reporter", {
      ref: "Users",
      localField: "reporterId",
      foreignField: "_id",
    });
    _schema.virtual("reason", {
      ref: "ReportReasons",
      localField: "reasonId",
      foreignField: "_id",
    });
    _schema.virtual("status", {
      ref: "ReportStatuses",
      localField: "statusId",
      foreignField: "_id",
    });
  }
  const model = mongoose.model("Reports", _schema);
  return { model, name: "Reports" };
}
