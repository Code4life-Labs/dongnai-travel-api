import fs from "fs/promises";

// Import helpers
import { buildBriefProjection } from "src/helpers/blogs/projections";
import {
  buildBlogTypeFilter,
  buildBlogNameFilter,
} from "src/helpers/blogs/filters";
import { computeStateOfBlog } from "src/helpers/blogs/states-computer";
import { deleteAllFilesDependOnRequest } from "src/helpers/other/delete-terminators";

// Impor services
import { AuthService } from "src/services/auth";
import { awsS3Service } from "src/services/aws/s3";

// Import validators
import { BlogCreateValidator } from "src/services/validators/blog";

// Import utils
import { RequestUtils } from "src/utils/request";
import { StringUtils } from "src/utils/string";

// Import types
import type { Request, Response, Express } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postBlog(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Transform some array fields in req.body
  if (req.body.mentionedPlaces && typeof req.body.mentionedPlaces === "string")
    req.body.mentionedPlaceIds = JSON.parse(req.body.mentionedPlaces);

  const { images, coverImage } = req.files as unknown as {
    [fieldName: string]: Array<Express.Multer.File>;
  };
  const unicodeName = StringUtils.toLowerCaseNonAccentVietnamese(
    req.body.name
  ).replaceAll(/\s+/g, "-");
  const prefixes = ["blog-images", req.body.authorId, unicodeName];

  // Upload images to Storage Provider
  // If there is any error, create an Interval to upload files
  // and notify to user later.
  const [coverImageResult, imagesResult] = await Promise.all([
    awsS3Service.uploadFile({
      userId: req.body.authorId,
      fileName: coverImage[0].filename,
      prefixParts: prefixes,
      returnURL: true,
    }),
    awsS3Service.uploadFiles({
      userId: req.body.authorId,
      fileNames: images.map((image) => image.filename),
      prefixParts: prefixes,
      returnURLs: true,
    }),
  ]);

  // Delete files
  if (req.files) await deleteAllFilesDependOnRequest(req.files);

  // Save blog content to database
  const createResult = await MC.Blogs.create({
    ...req.body,
    coverImage: coverImageResult.data,
    images: imagesResult.data,
  });

  // Return blogs
  return createResult;
}
