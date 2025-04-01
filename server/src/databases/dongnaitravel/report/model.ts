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
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        placeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Places",
        },
        blogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blogs",
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

            if (!ret.place) {
              delete ret.place;
            }

            if (!ret.blog) {
              delete ret.blog;
            }

            if (!ret.user) {
              delete ret.user;
            }

            delete ret.placeId;
            delete ret.blogId;
            delete ret.userId;
            delete ret.reporterId;
            delete ret.reasonId;
            delete ret.statusId;

            return ret;
          },
        },
      }
    );

    _schema.virtual("reporter", {
      ref: "Users",
      localField: "reporterId",
      foreignField: "_id",
      justOne: true,
    });
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
    _schema.virtual("place", {
      ref: "Places",
      localField: "placeId",
      foreignField: "_id",
      justOne: true,
    });
    _schema.virtual("reason", {
      ref: "ReportReasons",
      localField: "reasonId",
      foreignField: "_id",
      justOne: true,
    });
    _schema.virtual("status", {
      ref: "ReportStatuses",
      localField: "statusId",
      foreignField: "_id",
      justOne: true,
    });
  }
  const model = mongoose.model("Reports", _schema);
  return { model, name: "Reports" };
}
