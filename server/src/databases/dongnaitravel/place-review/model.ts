import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        placeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Places",
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        content: {
          type: Schema.Types.String,
          required: true,
        },
        rating: {
          type: Schema.Types.Number,
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
        collection: "PlaceReviews",
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

    _schema.virtual("place", {
      ref: "Places",
      localField: "placeId",
      foreignField: "_id",
      justOne: true,
    });
  }
  const model = mongoose.model("PlaceReviews", _schema);
  return { model, name: "PlaceReviews" };
}
