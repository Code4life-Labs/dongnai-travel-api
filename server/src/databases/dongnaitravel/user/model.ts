import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        roleId: Schema.Types.ObjectId,
        firstName: Schema.Types.String,
        lastName: Schema.Types.String,
        email: Schema.Types.String,
        username: Schema.Types.String,
        hashedPassword: Schema.Types.String,
        displayName: Schema.Types.String,
        birthday: Schema.Types.Number,
        avatar: Schema.Types.String,
        coverPhoto: Schema.Types.String,
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
        collection: "Users",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            return ret;
          },
        },
      }
    );
  }
  const model = mongoose.model("Users", _schema);
  return { model, name: "Users" };
}
