// Import helpers
import {
  isBlogExistsWithId,
  checkBlogWhenUpdate,
} from "src/helpers/blogs/blog-checkers";

// Import types
import type { Request, Response, Express } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function patchBlogMetadata(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!isBlogExistsWithId(MC.Blogs, req.params.blogId)) {
    throw new Error(`Blog with ID [${req.params.blogId}] doesn't exist`);
  }

  const validData = await checkBlogWhenUpdate(req.body, o!);

  // Save blog content to database
  const updateResult = await MC.Blogs.updateOne(
    {
      _id: req.params.blogId,
    },
    validData
  );

  // Return blogs
  return updateResult;
}
