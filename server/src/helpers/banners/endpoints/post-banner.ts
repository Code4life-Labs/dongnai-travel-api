// Import constants
import { MAX_BANNER_COUNT } from "src/utils/constants";

// Import helpers
import { checkBannerWhenCreate } from "../banner-checkers";

// Import services
import { awsS3Service } from "src/services/aws/s3";

// Import utils
import { StringUtils } from "src/utils/string";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postBanner(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check content
  const validData = await checkBannerWhenCreate(req.body, o!);

  // Check if banner exist with name?
  if (await MC.Banners.findOne({ name: validData.name })) {
    o!.code = 400;
    throw new Error("This banner already exists");
  }

  // Count all of activated banners
  if (
    (await MC.Banners.countDocuments({ isActive: true })) >= MAX_BANNER_COUNT
  ) {
    o!.code = 400;
    throw new Error(`Number of banners reach limit [${MAX_BANNER_COUNT}]`);
  }

  // Upload images to S3
  const image = req.file as unknown as Express.Multer.File;
  const unicodeName = StringUtils.toLowerCaseNonAccentVietnamese(
    validData.brand.name
  ).replaceAll(/\s+/g, "-");
  const prefixes = ["banner-images", unicodeName];
  const userId = res?.locals.tokenPayload.userId;

  if (!userId) {
    o!.code = 400;
    throw new Error("UserId isn't found in request");
  }

  const uploadResult = await awsS3Service.uploadFile({
    userId,
    returnURL: true,
    prefixParts: prefixes,
    fileName: image.filename,
  });

  // Assign URLs to data
  validData.image = uploadResult.data;

  // Create new banner
  const result = await MC.Banners.create(validData);

  if (!result || !result._id) {
    o!.code = 500;
    throw new Error("Cannot create new banner");
  }

  o!.code = 201;

  return result;
}
