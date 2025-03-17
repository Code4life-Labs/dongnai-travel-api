import fs from "fs";
import path from "path";
import {
  S3Client,
  paginateListObjectsV2,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  PutObjectCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";

// Import middlewars
import { RootUploadDirPath } from "src/services/upload-file/middlewares";

// Import utils
import { ErrorUtils } from "src/utils/error";
import { StringUtils } from "src/utils/string";

// Import settings
import { getAWSSettings } from "../settings";

// Import app configurations
import AppConfig from "src/app.config.json";

type ListFilesOptions = {
  prefixParts: Array<string>;
  pageSize: number;
};
type _BaseRequestOptions = {
  prefixParts: Array<string>;
};
type _WriteRequestBaseOptions = {
  userId: string;
} & _BaseRequestOptions;
type UploadFileOptions = {
  fileName: string;
  returnURL?: boolean;
} & _WriteRequestBaseOptions;
type UploadFilesOptions = {
  fileNames: Array<string>;
  returnURLs?: boolean;
} & _WriteRequestBaseOptions;
type DeleteFileOptions = {
  fileName: string;
} & _BaseRequestOptions;
type DeleteFilesOptions = {
  fileNames: Array<string>;
} & _BaseRequestOptions;

class AWSS3Service {
  private _client!: S3Client;
  private _rootBucket!: string;
  private _rootUploadsFolder!: string;

  constructor() {
    const settings = getAWSSettings();

    if (!AppConfig.cloud.aws.s3.buckets.main) {
      console.warn(
        "Main bucket settings are missing, you cannot use AWS SDK properly." +
          "Please add your AWS Configuration first"
      );
    }

    if (!AppConfig.cloud.aws.s3.buckets.main.name) {
      console.warn("Name of main bucket is missing");
    }

    if (!AppConfig.cloud.aws.s3.buckets.main.region) {
      console.warn("Region of main bucket is missing");
    }

    this._rootBucket = AppConfig.cloud.aws.s3.buckets.main.name;
    this._rootUploadsFolder = RootUploadDirPath;

    const credentials = settings.AccessKey
      ? {
          accessKeyId: settings.AccessKey.KeyId,
          secretAccessKey: settings.AccessKey.SecretKey,
        }
      : undefined;

    this._client = new S3Client({
      region: AppConfig.cloud.aws.s3.buckets.main.region,
      credentials,
    });
  }

  /**
   * Use to get public URL of object
   * @param bucket
   * @param key
   * @param region
   * @returns
   */
  static getPublicUrl(
    bucket: string,
    key: string,
    region: string = AppConfig.cloud.aws.s3.buckets.main.region
  ) {
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }

  /**
   * Use to get full key of object (include prefix)
   * @param prefix
   * @param name
   */
  static getObjectKey(prefix: string, name: string) {
    const reg = /^\/+/g;

    let key = StringUtils.getPath(prefix, name).replaceAll(reg, "");

    return key;
  }

  /**
   * Use to list file in S3 Bucket (support prefix)
   * @param options
   * @returns
   */
  async listFiles(options: ListFilesOptions) {
    return ErrorUtils.handleInterchangeError(this, async function (o) {
      const completePath = options.prefixParts
        ? StringUtils.getPath(...options.prefixParts) + "/"
        : this._rootBucket + "/";
      const files = [];

      const paginator = paginateListObjectsV2(
        { client: this._client, pageSize: options.pageSize },
        {
          Bucket: this._rootBucket,
          Prefix: completePath,
        }
      );

      for await (const page of paginator) {
        if (page && page.Contents) files.push(page.Contents.map((o) => o.Key));
      }

      return files;
    });
  }

  /**
   * Use to upload a file to S3 (support prefix)
   * @param options
   * @returns
   */
  async uploadFile(options: UploadFileOptions) {
    return ErrorUtils.handleInterchangeError(
      this,
      async function (o) {
        const completePath = options.prefixParts
          ? StringUtils.getPath(...options.prefixParts)
          : this._rootBucket;

        await this._client.send(
          new PutObjectCommand({
            Bucket: this._rootBucket,
            Key: AWSS3Service.getObjectKey(completePath, options.fileName),
            Body: fs.readFileSync(
              path.resolve(
                this._rootUploadsFolder,
                options.userId,
                options.fileName
              )
            ),
          })
        );

        o.message = "Upload File Successfully";

        if (options.returnURL) {
          return AWSS3Service.getPublicUrl(
            this._rootBucket,
            AWSS3Service.getObjectKey(completePath, options.fileName)
          );
        }

        return;
      },
      function (error) {
        console.log("Error:", error);
      }
    );
  }

  /**
   * Use to upload multiple file to S3
   * @param options
   * @returns
   */
  async uploadFiles(options: UploadFilesOptions) {
    return ErrorUtils.handleInterchangeError(this, async function (o) {
      const completePath = options.prefixParts
        ? StringUtils.getPath(...options.prefixParts)
        : this._rootBucket;

      await Promise.all(
        options.fileNames.map((fileName) => {
          return this._client.send(
            new PutObjectCommand({
              Bucket: this._rootBucket,
              Key: AWSS3Service.getObjectKey(completePath, fileName),
              Body: fs.readFileSync(
                path.resolve(this._rootUploadsFolder, options.userId, fileName)
              ),
            })
          );
        })
      );

      o.message = "Upload Files Successfully";

      if (options.returnURLs) {
        return options.fileNames.map((fileName) =>
          AWSS3Service.getPublicUrl(
            this._rootBucket,
            AWSS3Service.getObjectKey(completePath, fileName)
          )
        );
      }

      return;
    });
  }

  /**
   * Use to delete a file to S3 (support prefix)
   * @param options
   * @returns
   */
  async deleteFile(options: DeleteFileOptions) {
    return ErrorUtils.handleInterchangeError(
      this,
      async function (o) {
        const completePath = options.prefixParts
          ? StringUtils.getPath(...options.prefixParts)
          : this._rootBucket;

        await this._client.send(
          new DeleteObjectCommand({
            Bucket: this._rootBucket,
            Key: AWSS3Service.getObjectKey(completePath, options.fileName),
          })
        );

        o.message = "Delete File Successfully";

        return;
      },
      function (error) {
        console.log("Error:", error);
      }
    );
  }

  /**
   * Use to delete multiple file to S3
   * @param options
   * @returns
   */
  async deleteFiles(options: DeleteFilesOptions) {
    return ErrorUtils.handleInterchangeError(this, async function (o) {
      const completePath = options.prefixParts
        ? StringUtils.getPath(...options.prefixParts)
        : this._rootBucket;

      await this._client.send(
        new DeleteObjectsCommand({
          Bucket: this._rootBucket,
          Delete: {
            Objects: options.fileNames.map((fileName) => ({
              Key: AWSS3Service.getObjectKey(completePath, fileName),
            })),
          },
        })
      );

      o.message = "Delete Files Successfully";

      return;
    });
  }
}

export const awsS3Service = new AWSS3Service();
