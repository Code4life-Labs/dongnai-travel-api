import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        userId: Schema.Types.ObjectId,
        placeId: Schema.Types.ObjectId,
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
        collection: "UserFavoritedPlaces",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            return ret;
          },
        },
      }
    );
  }
  const model = mongoose.model("UserFavoritedPlaces", _schema);
  return { model, name: "UserFavoritedPlaces" };
}
