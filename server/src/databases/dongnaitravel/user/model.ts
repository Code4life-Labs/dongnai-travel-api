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
        isVerified: {
          type: Schema.Types.Boolean,
          default: false,
        },
        createdAt: {
          type: Schema.Types.Number,
          default: Date.now,
        },
        updatedAt: {
          type: Schema.Types.Number,
          default: Date.now,
        },
      },
      {
        collection: "Users",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            delete ret.id;
            delete ret.roleId;
            delete ret.__v;

            return ret;
          },
        },
      }
    );

    _schema.virtual("role", {
      ref: "UserRoles",
      localField: "roleId",
      foreignField: "_id",
      justOne: true,
    });
  }
  const model = mongoose.model("Users", _schema);
  return { model, name: "Users" };
}
