import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        typeIds: [{ type: Schema.Types.ObjectId }],
        placeId: Schema.Types.String,
        addressComponents: [{ type: Schema.Types.Mixed }],
        geometry: Schema.Types.Mixed,
        description: Schema.Types.String,
        phoneNumber: Schema.Types.String,
        name: Schema.Types.String,
        plusCode: Schema.Types.Mixed,
        openHours: [{ type: Schema.Types.Mixed }],
        url: Schema.Types.String,
        photos: [Schema.Types.String],
        website: Schema.Types.String,
        isRecommended: Schema.Types.Boolean,
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
        collection: "Places",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            delete ret.id;
            delete ret.__v;

            // Delete some fields
            delete ret.typeIds;

            return ret;
          },
        },
      }
    );

    _schema.virtual("types", {
      ref: "PlaceTypes",
      localField: "typeIds",
      foreignField: "_id",
    });

    _schema.virtual("reviews", {
      ref: "PlaceReviews",
      localField: "_id",
      foreignField: "placeId",
    });

    _schema.virtual("favorites", {
      ref: "UserFavoritedPlaces",
      localField: "_id",
      foreignField: "placeId",
    });

    _schema.virtual("visits", {
      ref: "UserVisitedPlaces",
      localField: "_id",
      foreignField: "placeId",
    });
  }
  const model = mongoose.model("Places", _schema);
  return { model, name: "Places" };
}
