// Import helpers
import { isBlogExistsWithId } from "src/helpers/blogs/blog-checkers";
import { deleteAllFilesDependOnRequest } from "src/helpers/other/delete-terminators";

// Impor services
import { awsS3Service } from "src/services/aws/s3";

// Import validators
import { BlogCreateValidator } from "src/services/validators/blog";

// Import utils
import { StringUtils } from "src/utils/string";

// Import types
import type { Request, Response, Express } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function patchBlog(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Transform some array fields in req.body
  if (req.body.mentionedPlaces && typeof req.body.mentionedPlaces === "string")
    req.body.mentionedPlaces = JSON.parse(req.body.mentionedPlaces);

  const oldBlog = await MC.Blogs.findOne({ _id: req.params.blogId });
  if (!oldBlog) {
    // Delete all images if error
    if (req.files) {
      await deleteAllFilesDependOnRequest(req.files);
    }

    o!.code = 400;
    throw new Error(`Blog with id "${req.params.blogId}" is not found`);
  }

  const { newImages, newCoverImage } = req.files as unknown as {
    [fieldName: string]: Array<Express.Multer.File>;
  };
  const unicodeName = StringUtils.toLowerCaseNonAccentVietnamese(
    req.body.name
  ).replaceAll(/\s+/g, "-");
  const prefixes = ["blog-images", req.body.authorId, unicodeName];

  // Delete images
  if (req.body.deletedImages) {
    await awsS3Service.deleteFiles({
      prefixParts: prefixes,
      fileNames: req.body.deletedImages.map((image: string) => {
        const urlParts = image.split("/");
        return urlParts[urlParts.length - 1];
      }),
    });
  }

  if (req.body.deletedCoverImage) {
    const urlParts = req.body.deletedCoverImage.split("/");

    await awsS3Service.deleteFile({
      prefixParts: prefixes,
      fileName: urlParts[urlParts.length - 1],
    });
  }

  // Upload images to Storage Provider
  // If there is any error, create an Interval to upload files
  // and notify to user later.
  const promises = [];
  let coverImageUrl = "";
  let imageUrls: string[] = [];

  if (newCoverImage) {
    promises.push(
      awsS3Service.uploadFile({
        userId: req.body.authorId,
        fileName: newCoverImage[0].filename,
        prefixParts: prefixes,
        returnURL: true,
      })
    );
  }

  if (newImages) {
    promises.push(
      awsS3Service.uploadFiles({
        userId: req.body.authorId,
        fileNames: newImages.map((image) => image.filename),
        prefixParts: prefixes,
        returnURLs: true,
      })
    );
  }

  // Xử lý kết quả upload
  if (promises.length > 0) {
    const results = await Promise.all(promises);
    
    // Xử lý kết quả tùy theo số lượng promises
    if (newCoverImage && newImages) {
      // Nếu upload cả cover và images
      coverImageUrl = results[0]?.data || "";
      imageUrls = results[1]?.data || [];
    } else if (newCoverImage) {
      // Nếu chỉ upload cover
      coverImageUrl = results[0]?.data || "";
    } else if (newImages) {
      // Nếu chỉ upload images
      imageUrls = results[0]?.data || [];
    }
  }

  // Delete files
  if (req.files) await deleteAllFilesDependOnRequest(req.files);

  if (req.body.deletedCoverImage) delete req.body.deletedCoverImage;
  if (req.body.deletedImages) delete req.body.deletedImages;

  // Save blog content to database
  const updateResult = await MC.Blogs.updateOne(
    {
      _id: req.params.blogId,
    },
    {
      ...req.body,
      // Sử dụng giá trị đã xử lý
      coverImage: coverImageUrl || oldBlog.coverImage,
      images: imageUrls.length > 0 
        ? imageUrls 
        : (oldBlog.images || []),
    }
  );

  // Return blogs
  return updateResult;
}
