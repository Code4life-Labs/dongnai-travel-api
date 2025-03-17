// Import validators
import {
  BlogCreateValidator,
  BlogUpdateValidator,
} from "src/services/validators/blog";

// Import types
import type { Model } from "mongoose";
import type { HTTPResponseDataType } from "src/utils/http";

export async function isBlogExistsWithId(model: Model<any>, id: string) {
  const blogCount = await model.countDocuments({
    _id: id,
  });

  if (blogCount === 0) return false;
  return true;
}

export async function checkBlogWhenCreate(data: any, o: HTTPResponseDataType) {
  const validationResult = BlogCreateValidator.validate(data);

  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}

export async function checkBlogWhenUpdate(data: any, o: HTTPResponseDataType) {
  const validationResult = BlogUpdateValidator.validate(data);

  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}
