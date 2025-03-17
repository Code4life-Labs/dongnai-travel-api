// Import helpers
import { checkPlaceWhenCreate } from "src/helpers/places/place-checkers";

// Import services
import { awsS3Service } from "src/services/aws/s3";

// Import utils
import { StringUtils } from "src/utils/string";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postPlace(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check content
  const validData = await checkPlaceWhenCreate(req.body, o!);

  // Check if place exist with name?
  if (await MC.Places.findOne({ name: validData.name })) {
    o!.code = 400;
    throw new Error("This place already exists");
  }

  // Upload images to S3
  const { photos } = req.files as unknown as {
    [fieldName: string]: Array<Express.Multer.File>;
  };
  const unicodeName = StringUtils.toLowerCaseNonAccentVietnamese(
    validData.name
  ).replaceAll(/\s+/g, "-");
  const prefixes = ["place-images", unicodeName];
  const userId = res?.locals.tokenPayload.userId;

  if (!userId) {
    o!.code = 400;
    throw new Error("UserId isn't found in request");
  }

  const uploadResult = await awsS3Service.uploadFiles({
    userId,
    returnURLs: true,
    prefixParts: prefixes,
    fileNames: photos.map((photo) => photo.filename),
  });

  // Assign URLs to data
  validData.photos = uploadResult.data;

  // Create new place
  const result = await MC.Places.create(validData);

  if (!result || !result._id) {
    o!.code = 500;
    throw new Error("Cannot create new place");
  }

  o!.code = 201;

  return result;
}
