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

export default async function patchBanner(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check content
  const validData = await checkBannerWhenCreate(req.body, o!);

  // Check if banner exist with _id?
  if (!(await MC.Banners.findOne({ _id: validData._id }))) {
    o!.code = 400;
    throw new Error("This banner doesn't exist");
  }

  // Upload images to S3
  const image = req.file as unknown as Express.Multer.File;
  if (image) {
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
  }

  // Update banner
  const result = await MC.Banners.updateOne({ _id: validData._id }, validData);

  if (!result || result.modifiedCount === 0) {
    o!.code = 500;
    throw new Error("Cannot update banner");
  }

  o!.code = 201;

  return result;
}
