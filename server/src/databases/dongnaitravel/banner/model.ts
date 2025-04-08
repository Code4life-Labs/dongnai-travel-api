import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        title: {
          type: Schema.Types.String,
        },
        image: {
          type: Schema.Types.String,
        },
        target: {
          type: Schema.Types.String,
        },
        brand: {
          name: {
            type: Schema.Types.String,
          },
          logoUrl: {
            type: Schema.Types.String,
          },
          website: {
            type: Schema.Types.String,
          },
        },
        isActive: {
          type: Schema.Types.Boolean,
          default: true,
        },
        startDate: {
          type: Schema.Types.Number,
        },
        endDate: {
          type: Schema.Types.Number,
        },
        createdAt: {
          type: Schema.Types.Number,
          default: Date.now,
        },
      },
      {
        collection: "Banners",
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
  const model = mongoose.model("Banners", _schema);
  return { model, name: "Banners" };
}
