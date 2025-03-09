// Import validators
import { BlogCreateValidator } from "src/services/validators/blog";

// Import types
import type { Model } from "mongoose";
import type { HTTPResponseDataType } from "src/utils/http";

export async function isBlogExistsWithId(model: Model<any>, id: string) {
  const userCount = await model.countDocuments({
    _id: id,
  });

  if (userCount === 0) return false;
  return true;
}

export async function checkBlog(data: any, o: HTTPResponseDataType) {
  const validationResult = BlogCreateValidator.validate(data);

  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}
