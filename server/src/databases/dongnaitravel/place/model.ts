import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    const AddressComponentSchema = new Schema({
      shortName: Schema.Types.String,
      longName: Schema.Types.String,
      types: Array<Schema.Types.String>,
    });
    const CoordinateSchema = new Schema({
      lat: Schema.Types.Number,
      lng: Schema.Types.Number,
    });
    const ViewPortSchema = new Schema({
      northeast: CoordinateSchema,
      southwest: CoordinateSchema,
    });
    const GeometrySchema = new Schema({
      location: CoordinateSchema,
      viewport: ViewPortSchema,
    });
    const PlusCodeSchema = new Schema({
      compoundCode: Schema.Types.String,
      globalCode: Schema.Types.String,
    });
    const OpenHourSchema = new Schema({
      weekDay: Schema.Types.Number,
      from: Schema.Types.String,
      to: Schema.Types.String,
    });

    _schema = new Schema(
      {
        typeIds: Schema.Types.ObjectId,
        placeId: Schema.Types.String,
        addressComponents: [AddressComponentSchema],
        geometry: GeometrySchema,
        description: Schema.Types.String,
        phoneNumber: Schema.Types.String,
        name: Schema.Types.String,
        plusCode: PlusCodeSchema,
        openHours: [OpenHourSchema],
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
            return ret;
          },
        },
      }
    );
  }
  const model = mongoose.model("Places", _schema);
  return { model, name: "Places" };
}
