// Import helpers
import { checkPlaceWhenUpdate } from "../place-checkers";
import { deleteAllFilesDependOnRequest } from "src/helpers/other/delete-terminators";

// Import services
import { awsS3Service } from "src/services/aws/s3";

// Import utils
import { StringUtils } from "src/utils/string";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function patchPlace(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check content
  if (typeof req.body.typeIds === "string")
    req.body.typeIds = [req.body.typeIds];

  if (req.body.addressComponents) {
    req.body.addressComponents = req.body.addressComponents.map(
      (addressComponent: string) => {
        return JSON.parse(addressComponent);
      }
    );
  }

  console.log("Body:", req.body);

  const validData = await checkPlaceWhenUpdate(req.body, o!);

  if (req.params.id !== validData._id) {
    o!.code = 400;
    throw new Error(
      "Id in request parameters is conflict with Id in request body."
    );
  }

  // Check if place exist with name?
  const oldPlace = await MC.Places.findOne({ _id: validData._id });
  if (!oldPlace) {
    o!.code = 400;
    throw new Error("This place doesn't exist");
  }

  // Upload images to S3
  const { newPhotos } = req.files as unknown as {
    [fieldName: string]: Array<Express.Multer.File>;
  };

  const unicodeName = StringUtils.toLowerCaseNonAccentVietnamese(
    validData.name
  ).replaceAll(/\s+/g, "-");
  const prefixes = ["place-images", unicodeName];

  if (newPhotos) {
    const userId = res?.locals.tokenPayload.userId;

    if (!userId) {
      o!.code = 400;
      throw new Error("UserId isn't found in request");
    }

    const uploadResult = await awsS3Service.uploadFiles({
      userId,
      returnURLs: true,
      prefixParts: prefixes,
      fileNames: newPhotos.map((photo) => photo.filename),
    });

    // Assign URLs to data
    validData.photos = [...oldPlace.photos, ...(uploadResult.data as any)];
  }

  // Delete old photos on AWS S3
  if (validData.deletedPhotos) {
    await awsS3Service.deleteFiles({
      prefixParts: prefixes,
      fileNames: validData.deletedPhoto.map((photo: string) => {
        const urlParts = photo.split("/");
        return urlParts[urlParts.length - 1];
      }),
    });
  }

  // Create new place
  if (validData.newPhotos) delete validData.newPhotos;
  if (validData.deletedPhotos) delete validData.deletedPhotos;

  const result = await MC.Places.updateOne({ _id: validData._id }, validData);

  if (!result || !result.modifiedCount) {
    o!.code = 500;
    throw new Error("Cannot create new place");
  }

  o!.code = 201;

  return result;
}
