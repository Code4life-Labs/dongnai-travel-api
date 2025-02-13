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
        content: Schema.Types.String,
        rating: Schema.Types.Number,
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
  }
  const model = mongoose.model("PlaceReviews", _schema);
  return { model, name: "PlaceReviews" };
}
