import bcrypt from "bcrypt";

// Import helpers
import {
  checkUserById,
  checkUserByUsername,
  checkUserDataWhenUpdate,
} from "../user-checkers";

// Impor services
import { awsS3Service } from "src/services/aws/s3";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";
import { valid } from "joi";

export default async function patchUser(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if request data is valid
  const validData = checkUserDataWhenUpdate(req.body, o!);

  // Check if user exists
  if (!(await checkUserById(MC.Users, req.params.id))) {
    o!.code = 400;
    throw new Error("This user isn't found");
  }

  let promises = [];
  const { newAvatar, newCoverPhoto } = req.files as unknown as {
    [fieldName: string]: Array<Express.Multer.File>;
  };
  const prefixes = ["user-images", "profile", req.params.id];

  // Delete images
  if (validData.deletedAvatar) {
    const urlParts = req.body.deletedAvatar.split("/");
    promises.push(
      awsS3Service.deleteFile({
        prefixParts: prefixes,
        fileName: urlParts[urlParts.length - 1],
      })
    );
  }

  if (validData.deletedCoverPhoto) {
    const urlParts = req.body.deletedCoverPhoto.split("/");
    promises.push(
      awsS3Service.deleteFile({
        prefixParts: prefixes,
        fileName: urlParts[urlParts.length - 1],
      })
    );
  }

  if (promises.length > 0) {
    await Promise.all(promises);
    // Clear
    promises = [];
  }

  // Upload images
  if (newAvatar) {
    console.log('Processing avatar file:', newAvatar[0]);
    const avatarResult = await awsS3Service.uploadFile({
      userId: req.params.id,
      fileName: newAvatar[0].filename,
      prefixParts: prefixes,
      returnURL: true,
    });

    console.log('Avatar upload result:', avatarResult);
    validData.avatar = avatarResult.data;
  }
  if (newCoverPhoto) {
    const coverPhotoResult = await awsS3Service.uploadFile({
      userId: req.params.id,
      fileName: newCoverPhoto[0].filename,
      prefixParts: prefixes,
      returnURL: true,
    });

    validData.coverPhoto = coverPhotoResult.data;
  }

  // Prepare data
  validData.updatedAt = Date.now();

  if (validData.deletedAvatar) delete validData.deletedAvatar;
  if (validData.deletedCoverPhoto) delete validData.deletedCoverPhoto;

  const updateResult = await MC.Users.updateOne(
    { _id: req.params.id },
    validData
  ).exec();

  if (updateResult.modifiedCount === 0) {
    o!.code = 400;
    throw new Error("Cannot update this user's information");
  }

  const updatedUser = await MC.Users.findById(req.params.id).exec();
  return updatedUser;
}
