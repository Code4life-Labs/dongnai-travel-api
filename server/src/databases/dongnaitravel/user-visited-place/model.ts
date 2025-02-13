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
        collection: "UserVisitedPlaces",
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
  const model = mongoose.model("UserVisitedPlaces", _schema);
  return { model, name: "UserVisitedPlaces" };
}
