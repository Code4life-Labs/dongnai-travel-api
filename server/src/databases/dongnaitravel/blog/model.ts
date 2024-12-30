import mongoose, { Schema } from "mongoose";

let _schema: Schema;

export default function () {
  if (!_schema) {
    _schema = new Schema(
      {
        authorId: Schema.Types.ObjectId,
        typeId: Schema.Types.ObjectId,
        mentionedPlaceIds: [Schema.Types.ObjectId],
        name: Schema.Types.String,
        contentUrl: Schema.Types.String,
        coverImage: Schema.Types.String,
        type: Schema.Types.String,
        readTime: Schema.Types.Number,
        isApproved: Schema.Types.Boolean,
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
        collection: "Blogs",
        toJSON: {
          virtuals: true,
          transform: function (doc, ret) {
            return ret;
          },
        },
      }
    );
  }
  const UserModel = mongoose.model("Blogs", _schema);
  return { model: UserModel, name: "Blogs" };
}
