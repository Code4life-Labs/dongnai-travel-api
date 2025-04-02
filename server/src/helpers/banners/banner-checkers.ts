// Import validators
import {
  BannerCreateValidator,
  BannerUpdateValidator,
} from "src/services/validators/banner";

// Import types
import type { Model } from "mongoose";
import type { HTTPResponseDataType } from "src/utils/http";

export async function isBannerExistsWithId(model: Model<any>, id: string) {
  const blogCount = await model.countDocuments({
    _id: id,
  });

  if (blogCount === 0) return false;
  return true;
}

export async function checkBannerWhenCreate(
  data: any,
  o: HTTPResponseDataType
) {
  const validationResult = BannerCreateValidator.validate(data);

  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}

export async function checkBannerWhenUpdate(
  data: any,
  o: HTTPResponseDataType
) {
  const validationResult = BannerUpdateValidator.validate(data);

  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}
