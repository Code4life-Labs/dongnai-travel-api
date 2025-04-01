import fs from "fs";
import path from "path";
import multer from "multer";

// Import utils
import {
  MEDIA_FILE_SIZE_LIMIT,
  ALLOW_MEDIA_FILE_TYPES,
} from "src/utils/constants";
import { StringUtils } from "src/utils/string";
import { ErrorUtils } from "src/utils/error";

// Import app configurations
import AppConfig from "src/app.config.json";

// Import types
import type { Request, Response, NextFunction } from "express";

const srcPath = StringUtils.getSrcPath();
// Expected: dongnai-travel-api/uploads
export const RootUploadDirPath = path.resolve(
  srcPath,
  // Back to root
  "..",
  // Go outside root
  "..",
  AppConfig.folders.uploads
);

// Create uploads folder if it doesn't exist
if (!fs.existsSync(RootUploadDirPath)) {
  fs.mkdirSync(RootUploadDirPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, fn) {
    if (!req.locals || !req.locals.userId) {
      console.warn(
        "Developer - preProcessBlogImages middleware should be placed before any other UploadFile Middlewares"
      );
      return;
    }
    return fn(null, path.resolve(RootUploadDirPath, req.locals.userId));
  },
  filename: function (req, file, fn) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const [fileName, extension] = file.originalname.split(".");
    const fullFileName =
      fileName.toLowerCase() +
      "-" +
      uniqueSuffix +
      "." +
      extension.toLowerCase();
    return fn(null, fullFileName);
  },
});

const mediaUploader = multer({
  limits: {
    fileSize: MEDIA_FILE_SIZE_LIMIT,
  },
  dest: RootUploadDirPath,
  fileFilter(req, file, fn) {
    if (!ALLOW_MEDIA_FILE_TYPES.includes(file.mimetype)) {
      return fn(null, false);
    }
    return fn(null, true);
  },
  storage,
});

export class UploadMediaFileMiddlewares {
  private constructor() {}

  /**
   * Use to process some thing before upload image
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static preProcessUploadFiles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return ErrorUtils.handleError(this, req, res, async function ($, $$, o) {
      req.locals = { userId: res.locals.tokenPayload.userId };

      // Create folder if not exist
      const userBlogImagesDirPath = path.resolve(
        RootUploadDirPath,
        res.locals.tokenPayload.userId
      );
      if (!fs.existsSync(userBlogImagesDirPath)) {
        fs.mkdirSync(userBlogImagesDirPath, { recursive: true });
      }

      return next();
    });
  }

  static uploadMultiplyByArray(fieldName: string, maxCount?: number) {
    return mediaUploader.array(fieldName, maxCount);
  }

  static uploadMultiplyByFields(fields: readonly multer.Field[]) {
    return mediaUploader.fields(fields);
  }

  static uploadOne(fieldName: string) {
    return mediaUploader.single(fieldName);
  }
}
